from django.contrib.auth import get_user_model
from django.db import models

from nucleus.models import AbstractBaseModel

User = get_user_model()


class Team(AbstractBaseModel):
    name = models.CharField(max_length=255)
    logo_url = models.CharField(max_length=255, null=True, blank=True)
    players = models.ManyToManyField(User, through='nucleus.TeamMember', related_name='teams')
    captain = models.ForeignKey(User, null=True, blank=True, related_name='teams_captain_of',
                                on_delete=models.SET_NULL)
    creator = models.ForeignKey(User, null=True, blank=True, related_name='teams_created',
                                on_delete=models.SET_NULL)

    def __str__(self):
        return self.name
