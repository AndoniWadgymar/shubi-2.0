from django.db import models
from coaches.models import Coach
from locations.models import Location

class Tier(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name
    
class ClassType(models.Model):
    name = models.CharField(max_length=100, unique=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return self.name
    
class Class(models.Model):
    class_type = models.ForeignKey(ClassType, on_delete=models.CASCADE, related_name="class_type")
    tier = models.ForeignKey(Tier, on_delete=models.CASCADE, related_name="tier")
    coach = models.ForeignKey(Coach, on_delete=models.CASCADE)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    attendees = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.name} - {self.date}"
