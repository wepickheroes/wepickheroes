from django.contrib import admin

from .models import Team
from nucleus.admin import TeamMemberInline


class TeamAdmin(admin.ModelAdmin):
    inlines = (TeamMemberInline, )
    raw_id_fields = ('captain', 'creator', )
    list_display = (
        'name',
        'get_player_count',
        'get_player_list',
        'created',
        'updated',
    )
    search_fields = ('name', )

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        return queryset.prefetch_related('players')

    def get_player_count(self, obj):
        return obj.players.count()
    get_player_count.short_description = 'Num Players'

    def get_player_list(self, obj):
        return ', '.join([p.username for p in obj.players.all()])
    get_player_list.short_description = 'Players'


admin.site.register(Team, TeamAdmin)
