from django.contrib import admin

from .models import (
    Season,
    League,
    LeagueRegistration,
    Division,
    DivisionSeason,
    Series,
    Match,
)


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
        'get_num_teams',
    )
    list_filter = (
        'division',
        'season',
    )
    exclude = ('teams', )
    inlines = (DivisionSeasonTeamInline, )

    def get_num_teams(self, obj):
        return obj.teams.count()
    get_num_teams.short_description = 'Number of teams'


class SeriesMatchInline(admin.TabularInline):
    model = Match
    extra = 0
    show_change_link = True


class SeriesAdmin(BaseAdmin):
    model = Series
    list_display = (
        '__str__',
        'division_season',
        'start_date',
        'end_date',
        'winner',
        'loser',
    )
    list_filter = (
        'division_season__division',
        'division_season__season',
        'start_date',
        'end_date',
    )
    inlines = (SeriesMatchInline, )


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
        'series__division_season__division',
        'series__division_season__season',
        'date',
    )


admin.site.register(League, LeagueAdmin)
admin.site.register(Season, SeasonAdmin)
admin.site.register(Division, DivisionAdmin)
admin.site.register(LeagueRegistration, LeagueRegistrationAdmin)
admin.site.register(DivisionSeason, DivisionSeasonAdmin)
admin.site.register(Series, SeriesAdmin)
admin.site.register(Match, MatchAdmin)
