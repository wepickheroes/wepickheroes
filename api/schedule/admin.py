from django.contrib import admin

from .models import (
    LeagueSeason,
    LeagueSeries,
    Match,
)


class LeagueSeasonAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'number', 'start_date', 'end_date', )
    readonly_fields = ('number', )


class LeagueSeriesAdmin(admin.ModelAdmin):
    list_display = (
        '__str__',
        'league_season',
        'team_a',
        'team_b',
        'num_games',
        'start_date',
        'end_date',
    )
    list_filter = (
        'league_season',
        'num_games',
        'start_date',
        'end_date',
    )
    search_fields = (
        'team_a__name',
        'team_b__name',
    )
    raw_id_fields = (
        'team_a',
        'team_b',
    )
    readonly_fields = ('created', 'updated', )
    fieldsets = (
        ('Management', {
            'fields': ('league_season', 'num_games', 'created', 'updated', )
        }),
        ('Dates', {
            'fields': ('start_date', 'end_date', ),
        }),
        ('Teams', {
            'fields': ('team_a', 'team_b', )
        }),
    )

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        return queryset.select_related(
            'team_a',
            'team_b',
            'league_season',
        )


class MatchAdmin(admin.ModelAdmin):
    list_display = (
        '__str__',
        'series',
        'team_a_score',
        'team_b_score',
        'match_date',
    )
    list_filter = (
        'match_date',
    )
    search_fields = (
        'series__team_a__name',
        'series__team_b__name',
    )
    readonly_fields = ('created', 'updated', )
    raw_id_fields = ('series', )
    fieldsets = (
        ('Management', {
            'fields': ('series', 'created', 'updated',)
        }),
        ('Dates', {
            'fields': ('match_date',)
        }),
        ('Scores', {
            'fields': ('team_a_score', 'team_b_score',),
        }),
    )

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        return queryset.select_related(
            'series__team_a',
            'series__team_b',
            'series__league_season',
        )


admin.site.register(LeagueSeason, LeagueSeasonAdmin)
admin.site.register(LeagueSeries, LeagueSeriesAdmin)
admin.site.register(Match, MatchAdmin)
