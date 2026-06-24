import json
import os
import re
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.db import transaction
from wards.models import Ward, WardArea, OfficerProfile

class Command(BaseCommand):
    help = "Seeds the GVMC Wards, Areas, and Demo Officer Admin account"

    def handle(self, *args, **options):
        self.stdout.write("Starting data seeding process...")

        # Resolve paths
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
        root_dir = os.path.dirname(base_dir) # parent of gvmc_backend is gvmc 2

        demographics_path = os.path.join(root_dir, 'js', 'demographics.js')
        areas_path = os.path.join(root_dir, 'ward_areas_clean.json')

        if not os.path.exists(demographics_path):
            # Try same dir as manage.py fallback
            demographics_path = os.path.join(base_dir, '..', 'js', 'demographics.js')
        if not os.path.exists(areas_path):
            areas_path = os.path.join(base_dir, '..', 'ward_areas_clean.json')

        self.stdout.write(f"Reading demographics from: {demographics_path}")
        self.stdout.write(f"Reading areas from: {areas_path}")

        # 1. Parse Demographics JS file
        demographics = {}
        with open(demographics_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
            # Find the WARD_DEMOGRAPHICS block and parse lines like:
            # 1: { ward:1, name:"Bheemili", population:18240, male:9280, female:8960, sc:1824, st:183, secretariat:"Bheemili Municipal Office" },
            pattern = re.compile(
                r'(\d+)\s*:\s*\{\s*ward\s*:\s*(\d+)\s*,\s*'
                r'name\s*:\s*["\']([^"\']*)["\']\s*,\s*'
                r'population\s*:\s*(\d+)\s*,\s*'
                r'male\s*:\s*(\d+)\s*,\s*'
                r'female\s*:\s*(\d+)\s*,\s*'
                r'sc\s*:\s*(\d+)\s*,\s*'
                r'st\s*:\s*(\d+)\s*,\s*'
                r'secretariat\s*:\s*["\']([^"\']*)["\']\s*\}'
            )
            for match in pattern.finditer(content):
                key = int(match.group(1))
                demographics[key] = {
                    'ward': int(match.group(2)),
                    'name': match.group(3),
                    'population': int(match.group(4)),
                    'male': int(match.group(5)),
                    'female': int(match.group(6)),
                    'sc': int(match.group(7)),
                    'st': int(match.group(8)),
                    'secretariat': match.group(9)
                }

        self.stdout.write(f"Parsed {len(demographics)} ward demographics.")

        # 2. Parse Ward Areas JSON
        areas = {}
        with open(areas_path, 'r', encoding='utf-8') as f:
            areas = json.load(f)

        self.stdout.write(f"Loaded {len(areas)} ward areas mappings.")

        # 3. Save Wards and Areas in a transaction
        with transaction.atomic():
            # Clear existing data
            WardArea.objects.all().delete()
            Ward.objects.all().delete()

            wards_to_create = []
            areas_to_create = []

            # Loop through 1 to 120 wards
            for w in range(1, 121):
                # Get demographics or use defaults
                demo = demographics.get(w, {
                    'ward': w,
                    'name': '',
                    'population': 20000,
                    'male': 10000,
                    'female': 10000,
                    'sc': 2000,
                    'st': 200,
                    'secretariat': 'Ward Secretariat'
                })

                ward_instance = Ward(
                    ward=demo['ward'],
                    name=demo['name'],
                    population=demo['population'],
                    male=demo['male'],
                    female=demo['female'],
                    sc=demo['sc'],
                    st=demo['st'],
                    secretariat=demo['secretariat']
                )
                wards_to_create.append(ward_instance)

            # Bulk create wards
            Ward.objects.bulk_create(wards_to_create)
            self.stdout.write("Successfully saved all 120 wards.")

            # Create Area records
            for ward_str, area_list in areas.items():
                ward_id = int(ward_str)
                for area_name in area_list:
                    areas_to_create.append(
                        WardArea(ward_id=ward_id, name=area_name)
                    )

            # Bulk create areas
            WardArea.objects.bulk_create(areas_to_create)
            self.stdout.write(f"Successfully saved {len(areas_to_create)} ward sub-localities.")

            # 4. Create Demo Admin user
            if not User.objects.filter(username='admin').exists():
                admin_user = User.objects.create_superuser('admin', 'admin@gvmc.gov.in', 'admin123')
                OfficerProfile.objects.get_or_create(user=admin_user, role='Admin')
                self.stdout.write("Created default demo admin account (admin / admin123).")
            else:
                admin_user = User.objects.get(username='admin')
                OfficerProfile.objects.get_or_create(user=admin_user, role='Admin')
                self.stdout.write("Default demo admin account already exists.")

        self.stdout.write(self.style.SUCCESS("Database seeding completed successfully!"))
