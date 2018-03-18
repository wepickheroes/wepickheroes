from django.db import models

from nucleus.models import AbstractBaseModel


class LeagueSeason(AbstractBaseModel):
    number = models.PositiveIntegerField(unique=True, null=True, blank=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if self._state.adding:
            latest_season = LeagueSeason.objects.aggregate(largest=models.Max('number'))['largest'] or 0
            self.number = latest_season + 1

        super().save(*args, **kwargs)

    def __str__(self):
        dateformat = "%m/%d/%y"
        datestring = self.start_date and self.end_date and (
            " ({}-{})".format(self.start_date.strftime(dateformat) if self.start_date else '?',
                              self.end_date.strftime(dateformat) if self.end_date else '?')
        )
        return 'Season {}{}'.format(
            self.number, datestring or ''
        )


class LeagueSeries(AbstractBaseModel):
    league_season = models.ForeignKey('schedule.LeagueSeason', on_delete=models.CASCADE)
    num_games = models.PositiveIntegerField(blank=False, null=False, default=1)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    team_a = models.ForeignKey('teams.Team', null=True, blank=True, related_name='series_played_as_team_1',
                               on_delete=models.SET_NULL)
    team_b = models.ForeignKey('teams.Team', null=True, blank=True, related_name='series_played_as_team_2',
                               on_delete=models.SET_NULL)

    class Meta:
        verbose_name_plural = 'League series'

    def get_matchup_str(self):
        return '{} vs. {}'.format(
            self.team_a.name if self.team_a else '?',
            self.team_b.name if self.team_b else '?'
        )

    def __str__(self):
        return 'Series: {}'.format(self.get_matchup_str())


class Match(AbstractBaseModel):
    series = models.ForeignKey('schedule.LeagueSeries', on_delete=models.CASCADE)
    team_a_score = models.PositiveIntegerField(blank=True, null=True)
    team_b_score = models.PositiveIntegerField(blank=True, null=True)
    match_date = models.DateField(null=True, blank=True)

    class Meta:
        verbose_name_plural = 'Matches'

    def __str__(self):
        return 'Match: {}'.format(self.series.get_matchup_str())
