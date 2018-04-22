from django.contrib import admin
from django.forms.models import BaseInlineFormSet, ModelForm

from .models import (
    Season,
    League,
    LeagueRegistration,
    Division,
    DivisionSeason,
    Series,
    SeriesTimeWindow,
    Match,
)
from teams.models import Team


class BaseAdmin(admin.ModelAdmin):
    def get_readonly_fields(self, request, obj=None):
        return super().get_readonly_fields(request, obj) + (
            'created',
            'updated',
        )


class SeasonInline(admin.TabularInline):
    model = Season
    extra = 0
    show_change_link = True


class LeagueAdmin(BaseAdmin):
    model = League
    list_display = (
        '__str__',
        'num_series_per_season',
        'num_games_per_series',
    )
    inlines = (SeasonInline, )


class SeasonAdmin(BaseAdmin):
    model = Season
    list_display = (
        '__str__',
        'number',
        'league',
        'start_date',
        'end_date',
    )
    list_filter = (
        'start_date',
        'end_date',
        'league',
        'number',
    )


class DivisionSeasonInline(admin.TabularInline):
    model = DivisionSeason
    extra = 0
    show_change_link = True
    fields = ('season', )


class SeriesTimeWindowInline(admin.TabularInline):
    model = SeriesTimeWindow
    extra = 0
    show_change_link = True
    fields = ('start_date', 'end_date', )


class DivisionAdmin(BaseAdmin):
    model = Division
    list_display = (
        '__str__',
        'league',
    )
    list_filter = (
        'league',
    )
    inlines = (DivisionSeasonInline, )


class LeagueRegistrationAdmin(BaseAdmin):
    model = LeagueRegistration
    list_display = (
        '__str__',
        'registered_by',
    )
    list_filter = (
        'league',
    )


class DivisionSeasonTeamInline(admin.StackedInline):
    model = DivisionSeason.teams.through
    extra = 0


class DivisionSeasonAdmin(BaseAdmin):
    model = DivisionSeason
    list_display = (
        '__str__',
        'division',
        'season',
        'get_num_teams',
        'start_date',
        'end_date',
    )
    list_filter = (
        'division',
        'division__league',
        'season',
        'start_date',
        'end_date',
    )
    exclude = ('teams', )
    inlines = (
        SeriesTimeWindowInline,
        DivisionSeasonTeamInline,
    )

    def get_num_teams(self, obj):
        return obj.teams.count()
    get_num_teams.short_description = 'Number of teams'


class SeriesInlineFormSet(BaseInlineFormSet):
    def __init__(self, data=None, files=None, instance=None,
                 save_as_new=False, prefix=None, queryset=None, **kwargs):
        self.participating_teams = Team.objects.filter(
            division_seasons=instance.division_season
        )
        if self.form.base_fields:
            self.limit_team_field_queryset('team_a')
            self.limit_team_field_queryset('team_b')
            self.limit_team_field_queryset('winner')
            self.limit_team_field_queryset('loser')
        super(SeriesInlineFormSet, self).__init__(data, files, instance, save_as_new, prefix, queryset, **kwargs)

    def limit_team_field_queryset(self, field):
        if self.form.base_fields.get(field):
            self.form.base_fields[field].queryset = self.participating_teams


class SeriesInline(admin.TabularInline):
    model = Series
    extra = 0
    show_change_link = True
    formset = SeriesInlineFormSet


class SeriesTimeWindowAdmin(admin.ModelAdmin):
    model = SeriesTimeWindow
    list_display = (
        'division_season',
        'start_date',
        'end_date',
    )
    list_filter = (
        'start_date',
        'end_date',
        'division_season__division',
        'division_season__season',
    )
    raw_id_fields = ('division_season', )
    inlines = (SeriesInline, )


class SeriesMatchInline(admin.TabularInline):
    model = Match
    extra = 0
    show_change_link = True


class SeriesForm(ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        instance = self.instance
        if instance and instance.series_time_window:
            self.participating_teams = Team.objects.filter(
                division_seasons=instance.series_time_window.division_season
            )
            self.limit_team_field_queryset('team_a')
            self.limit_team_field_queryset('team_b')
            self.limit_team_field_queryset('winner')
            self.limit_team_field_queryset('loser')

    def limit_team_field_queryset(self, field):
        if self.fields.get(field):
            self.fields[field].queryset = self.participating_teams


class SeriesAdmin(BaseAdmin):
    model = Series
    form = SeriesForm
    list_display = (
        '__str__',
        'series_time_window',
        'winner',
        'loser',
    )
    list_filter = (
        'series_time_window__start_date',
        'series_time_window__end_date',
        'series_time_window__division_season__division',
        'series_time_window__division_season__season',
    )
    inlines = (SeriesMatchInline, )
    fieldsets = (
        (None, {
            'fields': (
                'series_time_window',
                'created',
                'updated',
            ),
        }),
        ('Teams', {
            'fields': (
                ('team_a', 'team_b', ),
                ('winner', 'loser', ),
            ),
        })
    )
    raw_id_fields = ('series_time_window', )

    # def get_division(self, obj):
    #     pass


class MatchAdmin(BaseAdmin):
    model = Match
    list_display = (
        '__str__',
        'series',
        'matchid',
        'winner',
        'loser',
    )
    list_filter = (
        'series__series_time_window__division_season__division',
        'series__series_time_window__division_season__season',
        'date',
    )


admin.site.register(League, LeagueAdmin)
admin.site.register(Season, SeasonAdmin)
admin.site.register(Division, DivisionAdmin)
admin.site.register(LeagueRegistration, LeagueRegistrationAdmin)
admin.site.register(DivisionSeason, DivisionSeasonAdmin)
admin.site.register(SeriesTimeWindow, SeriesTimeWindowAdmin)
admin.site.register(Series, SeriesAdmin)
admin.site.register(Match, MatchAdmin)
