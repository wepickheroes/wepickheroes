from django.db import models

from nucleus.models import AbstractBaseModel


class LeagueSeason(AbstractBaseModel):
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)

    def __str__(self):
        dateformat = "%d/%m/%y"
        return 'Season: {} vs. {}'.format(self.start_date.strftime(dateformat), self.end_date.strftime(dateformat))


class LeagueSeries(AbstractBaseModel):
    league_season = models.ForeignKey('schedule.LeagueSeason', null=True, blank=True, on_delete=models.SET_NULL)
    num_games = models.PositiveIntegerField(blank=False, null=False, default=1)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    team_a = models.ForeignKey('teams.Team', null=True, blank=True, related_name='series_played_as_team_1',
                               on_delete=models.SET_NULL)
    team_b = models.ForeignKey('teams.Team', null=True, blank=True, related_name='series_played_as_team_2',
                               on_delete=models.SET_NULL)

    def __str__(self):
        return 'Series: {} vs. {}'.format(self.team_a.name, self.team_b.name)


class Match(AbstractBaseModel):
    series = models.ForeignKey('schedule.LeagueSeries', null=True, blank=True, on_delete=models.SET_NULL)
    team_a_score = models.PositiveIntegerField(blank=True, null=True)
    team_b_score = models.PositiveIntegerField(blank=True, null=True)
    match_date = models.DateField(null=True,blank=True)

    def __str__(self):
        return 'Match: {} vs. {}'.format(self.series.team_a.name, self.series.team_b.name)
