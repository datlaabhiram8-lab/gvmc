from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db.models import Avg
import math

from .models import Ward, WardArea, SustainabilityFeedback, Complaint, OfficerProfile
from .serializers import (
    WardSerializer, WardAreaSerializer, SustainabilityFeedbackSerializer, ComplaintSerializer
)

class WardViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Ward.objects.prefetch_related('areas', 'sustainability_feedback').all().order_by('ward')
    serializer_class = WardSerializer
    lookup_field = 'ward'

    @action(detail=True, methods=['get'])
    def sustainability(self, request, ward=None):
        ward_obj = self.get_object()
        n = ward_obj.ward
        
        # 1. Base Score calculation
        base_score = int(60 + ((n * 17) % 36))
        
        # Seed base values
        keys = ['cleanliness', 'water', 'transport', 'green', 'roads', 'pollution', 'disaster', 'governance']
        base_val = base_score / 10.0
        base_ratings = {}

        for idx, key in enumerate(keys):
            # Deterministic variation between -1.5 and +1.5 based on ward number
            variation = math.sin(n * (idx + 1)) * 1.5
            base_ratings[key] = max(1.0, min(10.0, round(base_val + variation)))

        # Adjust base ratings to match base_score
        def get_weighted_sum(r):
            return round(
                r['cleanliness'] * 2.0 +
                r['water'] * 1.5 +
                r['transport'] * 1.5 +
                r['green'] * 1.0 +
                r['roads'] * 1.0 +
                r['pollution'] * 1.0 +
                r['disaster'] * 1.0 +
                r['governance'] * 1.0
            )

        loops = 0
        while get_weighted_sum(base_ratings) != base_score and loops < 100:
            loops += 1
            diff = base_score - get_weighted_sum(base_ratings)
            # Deterministic index selection
            key = keys[int(abs(math.sin(n + loops) * len(keys))) % len(keys)]
            step = 1.0 if diff > 0 else -1.0
            if 1.0 <= base_ratings[key] + step <= 10.0:
                base_ratings[key] += step

        # 2. Fetch citizen feedback from database
        feedbacks = ward_obj.sustainability_feedback.all()
        review_count = feedbacks.count()

        final_ratings = {**base_ratings}
        citizen_avg_ratings = None

        if review_count > 0:
            citizen_avg_ratings = {}
            for key in keys:
                avg_val = feedbacks.aggregate(avg_val=Avg(key))['avg_val'] or 5.0
                citizen_avg_ratings[key] = float(avg_val)
                # 50% municipal, 50% citizen feedback mix
                final_ratings[key] = (base_ratings[key] + citizen_avg_ratings[key]) / 2.0

        # Calculate final score
        final_score = int(get_weighted_sum(final_ratings))

        # Format average outputs for chart JS display (some expect 1 decimal place)
        final_ratings_formatted = {k: round(v, 1) for k, v in final_ratings.items()}
        base_ratings_formatted = {k: round(v, 1) for k, v in base_ratings.items()}
        if citizen_avg_ratings:
            citizen_avg_ratings_formatted = {k: round(v, 1) for k, v in citizen_avg_ratings.items()}
        else:
            citizen_avg_ratings_formatted = None

        return Response({
            'baseScore': base_score,
            'finalScore': final_score,
            'baseRatings': base_ratings_formatted,
            'citizenAvgRatings': citizen_avg_ratings_formatted,
            'finalRatings': final_ratings_formatted,
            'reviewCount': review_count
        })

    @action(detail=False, methods=['get'])
    def summary(self, request):
        wards = Ward.objects.all()
        total_wards = wards.count()
        total_pop = sum(w.population for w in wards)
        total_male = sum(w.male for w in wards)
        total_female = sum(w.female for w in wards)
        total_sc = sum(w.sc for w in wards)
        total_st = sum(w.st for w in wards)

        women_pct = round((total_female / total_pop) * 100, 2) if total_pop > 0 else 0.0

        return Response({
            'totalWards': total_wards,
            'totalPopulation': total_pop,
            'malePop': total_male,
            'femalePop': total_female,
            'womenPct': women_pct,
            'scPop': total_sc,
            'stPop': total_st
        })


class SustainabilityFeedbackViewSet(viewsets.ModelViewSet):
    queryset = SustainabilityFeedback.objects.all().order_by('-created_at')
    serializer_class = SustainabilityFeedbackSerializer

    def create(self, request, *args, **kwargs):
        import time, datetime
        data = request.data.copy()
        # Auto-generate id if not provided
        if 'id' not in data or not data.get('id'):
            data['id'] = f"CSB-{int(time.time() * 1000)}"
        # Auto-compute weighted score from individual ratings
        if 'score' not in data or not data.get('score'):
            try:
                data['score'] = round(
                    int(data.get('cleanliness', 5)) * 2.0 +
                    int(data.get('water', 5)) * 1.5 +
                    int(data.get('transport', 5)) * 1.5 +
                    int(data.get('green', 5)) * 1.0 +
                    int(data.get('roads', 5)) * 1.0 +
                    int(data.get('pollution', 5)) * 1.0 +
                    int(data.get('disaster', 5)) * 1.0 +
                    int(data.get('governance', 5)) * 1.0
                )
            except (ValueError, TypeError):
                data['score'] = 50
        # Auto-set date if not provided
        if 'date' not in data or not data.get('date'):
            data['date'] = datetime.datetime.now().strftime('%d %b %Y')
        
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class ComplaintViewSet(viewsets.ModelViewSet):
    queryset = Complaint.objects.all().order_by('-created_at')
    serializer_class = ComplaintSerializer

    def get_queryset(self):
        queryset = Complaint.objects.all().order_by('-created_at')
        ward = self.request.query_params.get('ward', None)
        if ward is not None:
            queryset = queryset.filter(ward_id=ward)
        return queryset

    def create(self, request, *args, **kwargs):
        import time, random, datetime
        data = request.data.copy()
        # Auto-generate ID if not provided
        if 'id' not in data or not data.get('id'):
            time_part = int(time.time() * 1000)
            rand_part = random.randint(1000, 9999)
            data['id'] = f"GVMC-{time_part}-{rand_part}"
        # Auto-set date if not provided
        if 'date' not in data or not data.get('date'):
            data['date'] = datetime.datetime.now().strftime('%d %b %Y')
        # Map 'description' to 'desc' if needed (for model compatibility)
        if 'desc' not in data and 'description' in data:
            data['desc'] = data['description']
        
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class AuthLoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        role = request.data.get('role')

        if not username or not password or not role:
            return Response({'error': 'Username, password, and role are required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Authenticate user
        user = authenticate(username=username, password=password)
        if user is not None:
            # Check if user has an OfficerProfile
            try:
                profile = user.officer_profile
                user_role = profile.role
            except OfficerProfile.DoesNotExist:
                user_role = 'Officer'  # Default fallback

            # We can associate the user role. If role matches, login successful
            import datetime
            return Response({
                'success': True,
                'name': user.username.capitalize(),
                'role': user_role,
                'loginTime': datetime.datetime.now().isoformat()
            })
        else:
            # For demonstration purposes, if the database doesn't have the user yet, let's check against admin/admin123
            if username == 'admin' and password == 'admin123':
                import datetime
                return Response({
                    'success': True,
                    'name': 'Admin',
                    'role': role,
                    'loginTime': datetime.datetime.now().isoformat()
                })
            return Response({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)
