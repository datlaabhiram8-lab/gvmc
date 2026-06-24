from django.db import models
from django.contrib.auth.models import User

class Ward(models.Model):
    ward = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255, blank=True, default='')
    population = models.IntegerField(default=0)
    male = models.IntegerField(default=0)
    female = models.IntegerField(default=0)
    sc = models.IntegerField(default=0)
    st = models.IntegerField(default=0)
    secretariat = models.CharField(max_length=255, blank=True, default='')

    def __str__(self):
        return f"Ward {self.ward} - {self.name}"

class WardArea(models.Model):
    ward = models.ForeignKey(Ward, related_name='areas', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)

    class Meta:
        unique_together = ('ward', 'name')

    def __str__(self):
        return f"{self.name} (Ward {self.ward_id})"

class SustainabilityFeedback(models.Model):
    id = models.CharField(max_length=100, primary_key=True)  # e.g., CSB-1719148400000
    ward = models.ForeignKey(Ward, related_name='sustainability_feedback', on_delete=models.CASCADE)
    score = models.IntegerField()
    cleanliness = models.IntegerField()
    water = models.IntegerField()
    transport = models.IntegerField()
    green = models.IntegerField()
    roads = models.IntegerField()
    pollution = models.IntegerField()
    disaster = models.IntegerField()
    governance = models.IntegerField()
    date = models.CharField(max_length=50)  # format: "23 Jun 2026"
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feedback {self.id} for Ward {self.ward_id} (Score: {self.score})"

class Complaint(models.Model):
    id = models.CharField(max_length=100, primary_key=True)  # e.g., GVMC-KVW8-2K1X
    ward = models.ForeignKey(Ward, related_name='complaints', on_delete=models.CASCADE)
    colony = models.CharField(max_length=255, blank=True, default='')
    category = models.CharField(max_length=100)
    desc = models.TextField()
    photo = models.TextField(blank=True, null=True)  # Store base64 image representation
    status = models.CharField(max_length=50, default='Pending')  # Pending, In Progress, Resolved
    priority = models.CharField(max_length=50, default='Medium')  # Low, Medium, High
    date = models.CharField(max_length=50)  # format: "23 Jun 2026"
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Complaint {self.id} (Status: {self.status})"

class OfficerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='officer_profile')
    role = models.CharField(max_length=100, default='Ward Officer')  # Admin, Ward Officer, Data Entry Operator

    def __str__(self):
        return f"{self.user.username} - {self.role}"
