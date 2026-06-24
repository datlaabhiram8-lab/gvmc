from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Ward, WardArea, SustainabilityFeedback, Complaint, OfficerProfile

class WardAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = WardArea
        fields = ['id', 'ward', 'name']

class WardSerializer(serializers.ModelSerializer):
    areas = serializers.SerializerMethodField()
    sustainability_score = serializers.SerializerMethodField()

    class Meta:
        model = Ward
        fields = [
            'ward', 'name', 'population', 'male', 'female', 'sc', 'st',
            'secretariat', 'areas', 'sustainability_score'
        ]

    def get_areas(self, obj):
        return [area.name for area in obj.areas.all()]

    def get_sustainability_score(self, obj):
        # We can dynamically calculate the score based on feedback.
        # If there are no reviews, fall back to the default formula.
        feedbacks = obj.sustainability_feedback.all()
        if feedbacks.exists():
            # Average out the feedbacks
            scores = [fb.score for fb in feedbacks]
            return round(sum(scores) / len(scores))
        
        # Default formula: Math.floor(60 + ((w.ward * 17) % 36))
        return int(60 + ((obj.ward * 17) % 36))

class SustainabilityFeedbackSerializer(serializers.ModelSerializer):
    ward_name = serializers.SerializerMethodField()

    class Meta:
        model = SustainabilityFeedback
        fields = [
            'id', 'ward', 'ward_name', 'score', 'cleanliness', 'water', 'transport',
            'green', 'roads', 'pollution', 'disaster', 'governance', 'date', 'created_at'
        ]
        read_only_fields = ['ward_name', 'created_at']

    def get_ward_name(self, obj):
        try:
            return obj.ward.name or f'Ward {obj.ward_id}'
        except Exception:
            return f'Ward {obj.ward_id}'

class ComplaintSerializer(serializers.ModelSerializer):
    # Expose 'description' as the canonical field name in the API
    # while the model field is 'desc'
    description = serializers.CharField(source='desc', allow_blank=True, default='')

    class Meta:
        model = Complaint
        fields = [
            'id', 'ward', 'colony', 'category', 'description', 'photo', 'status',
            'priority', 'date', 'created_at'
        ]
        read_only_fields = ['id', 'date', 'created_at']
