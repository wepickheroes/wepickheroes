from django.db import models
from teams.models import Team
from nucleus.models import AbstractBaseModel
# Create your models here.

class LeagueSeason(AbstractBaseModel):
    start_date = models.DateField(null=True,blank=True)
    end_date = models.DateField(null=True,blank=True)

class LeagueSeries(AbstractBaseModel):
    league_season = models.ForeignKey(LeagueSeason, null=True, blank=True, related_name='league_series',
                                on_delete=models.SET_NULL)
    num_games = models.PositiveIntegerField(blank=False, null=False)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    team_a = models.ForeignKey(Team, null=True, blank=True, related_name='matches_played_as_team_1',
                                on_delete=models.SET_NULL)
    team_b = models.ForeignKey(Team, null=True, blank=True, related_name='matches_played_as_team_2',
                                on_delete=models.SET_NULL)


class Match(AbstractBaseModel):
    series = models.ForeignKey(LeagueSeries, null=True, blank=True, related_name='league_series',
                                on_delete=models.SET_NULL)
    team_a_score = models.PositiveIntegerField(blank=True, null=True)
    team_b_score = models.PositiveIntegerField(blank=True, null=True)
    match_date = models.DateField(null=True,blank=True)



    def __str__(self):
        return '{} vs. {}'.format(self.team_1.name,self.team_2.name)
