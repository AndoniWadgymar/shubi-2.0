from django.db import models
from locations.models import Location

class Coach(models.Model):
    first_name = models.CharField(max_length=100, default="")
    last_name = models.CharField(max_length=100)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    email = models.EmailField(unique=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
