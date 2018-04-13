from django.contrib.auth import get_user_model
from django.db import models

from nucleus.models import AbstractBaseModel

User = get_user_model()


class Season(AbstractBaseModel):
    number = models.IntegerField(editable=False)
    start_date = models.DateField()
    end_date = models.DateField()
    league = models.ForeignKey('league.League', on_delete=models.CASCADE, null=True)

    class Meta:
        ordering = ('number', )
        unique_together = ('number', 'league', )

    def save(self, *args, **kwargs):
        if self._state.adding:
            latest_season = Season.objects.filter(league=self.league).aggregate(
                largest=models.Max('number')
            )['largest'] or 0
            self.number = latest_season + 1

        super().save(*args, **kwargs)

    def __str__(self):
        return "Season {} for {}".format(self.number, str(self.league))


class League(AbstractBaseModel):
    name = models.CharField(max_length=256)
    num_series_per_season = models.IntegerField()
    num_games_per_series = models.IntegerField()
    description = models.CharField(max_length=512, null=True, blank=True,
                                   help_text='A short description about this league.')

    def __str__(self):
        return "{} League".format(self.name)


class LeagueRegistration(AbstractBaseModel):
    league = models.ForeignKey('league.League', on_delete=models.CASCADE)
    team = models.ForeignKey('teams.Team', on_delete=models.CASCADE)
    registered_by = models.ForeignKey(User,
                                      on_delete=models.SET_NULL,
                                      null=True, blank=True,)

    def __str__(self):
        return "Registration for {} by {}".format(self.league.name, self.team.name)


class Division(AbstractBaseModel):
    league = models.ForeignKey('league.League', on_delete=models.CASCADE)
    number = models.IntegerField()
    name = models.CharField(max_length=256, null=True, blank=True)
    seasons = models.ManyToManyField('league.Season',
                                     through='league.DivisionSeason',
                                     related_name='divisions')

    class Meta:
        unique_together = ('league', 'number', )
        ordering = ('number', )

    def __str__(self):
        return "Division {}: {}".format(self.number, self.name)


class DivisionSeason(AbstractBaseModel):
    division = models.ForeignKey('league.Division', on_delete=models.CASCADE)
    season = models.ForeignKey('league.Season', on_delete=models.CASCADE)
    teams = models.ManyToManyField('teams.Team',
                                   related_name='division_seasons')
    start_date = models.DateField()
    end_date = models.DateField()

    class Meta:
        ordering = ('division__number', 'season__number', )

    def __str__(self):
        return "Division {} - {}".format(self.division.number, str(self.season))


class SeriesTimeWindow(AbstractBaseModel):
    division_season = models.ForeignKey('league.DivisionSeason', on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()

    class Meta:
        ordering = (
            'division_season__division__number',
            'division_season__season__number',
            'start_date',
        )

    def __str__(self):
        return "Series Time Window: {} - {}".format(self.start_date, self.end_date)


class Series(AbstractBaseModel):
    series_time_window = models.ForeignKey('league.SeriesTimeWindow', on_delete=models.CASCADE,
                                           null=True)
    team_a = models.ForeignKey('teams.Team',
                               on_delete=models.CASCADE,
                               related_name='series_as_team_a')
    team_b = models.ForeignKey('teams.Team',
                               on_delete=models.CASCADE,
                               related_name='series_as_team_b')
    winner = models.ForeignKey('teams.Team',
                               on_delete=models.CASCADE,
                               related_name='series_won',
                               null=True, blank=True)
    loser = models.ForeignKey('teams.Team',
                              on_delete=models.CASCADE,
                              related_name='series_lost',
                              null=True, blank=True)

    class Meta:
        verbose_name_plural = 'Series'

    def __str__(self):
        return "Series: {} vs. {}".format(str(self.team_a), str(self.team_b))


class Match(AbstractBaseModel):
    series = models.ForeignKey('league.Series', on_delete=models.CASCADE)
    date = models.DateField(null=True, blank=True)
    matchid = models.CharField(max_length=32, null=True, blank=True)
    winner = models.ForeignKey('teams.Team',
                               on_delete=models.CASCADE,
                               related_name='matches_won',
                               null=True, blank=True)
    loser = models.ForeignKey('teams.Team',
                              on_delete=models.CASCADE,
                              related_name='matches_lost',
                              null=True, blank=True)

    class Meta:
        verbose_name_plural = 'Matches'

    def __str__(self):
        return "Match: {} vs. {}".format(str(self.series.team_a), str(self.series.team_b))
