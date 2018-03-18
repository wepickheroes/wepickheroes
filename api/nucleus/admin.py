from django.contrib import admin

from .models import TeamMember


class TeamMemberInline(admin.TabularInline):
    model = TeamMember
    raw_id_fields = ('player', 'team', )
    extra = 0
