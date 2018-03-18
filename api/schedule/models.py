from django.db import models
from teams.models import Team
from nucleus.models import AbstractBaseModel
# Create your models here.

class Match(AbstractBaseModel):
    team_1 = models.ForeignKey(Team, null=True, blank=True, related_name='matches_played_as_team_1',
                                on_delete=models.SET_NULL)
    team_2 = models.ForeignKey(Team, null=True, blank=True, related_name='matches_played_as_team_2',
                                on_delete=models.SET_NULL)
    team_1_score = models.PositiveIntegerField(blank=True, null=True)
    team_2_score = models.PositiveIntegerField(blank=True, null=True)
    match_date = models.DateField(null=True,blank=True)


    def __str__(self):
        return '{} vs. {}'.format(self.team_1.name,self.team_2.name)
