from django.db import models
from teams.models import Team
from nucleus.models import AbstractBaseModel
# Create your models here.

class Match(AbstractBaseModel):
    home_team = models.ForeignKey(Team, null=True, blank=True, related_name='home_team',
                                on_delete=models.SET_NULL)
    away_team = models.ForeignKey(Team, null=True, blank=True, related_name='away_team',
                                on_delete=models.SET_NULL)
    home_team_score = models.PositiveIntegerField(blank=True, null=True)
    away_team_score = models.PositiveIntegerField(blank=True, null=True)
    match_date = models.DateField(null=True,blank=True)


    def __str__(self):
        return '{} vs. {}'.format(self.home_team.name,self.away_team.name)
