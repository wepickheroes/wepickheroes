from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

from social_django.models import UserSocialAuth

from .models import TeamMember
from .tasks import _update_player_rank

User = get_user_model()


def update_rank(modeladmin, request, queryset):
    for user in queryset:
        _update_player_rank(user.pk)
update_rank.short_description = 'Update rank for selected users'


class UserSocialAuthInline(admin.StackedInline):
    model = UserSocialAuth
    extra = 0


class CustomUserAdmin(UserAdmin):
    list_display = (
        'username',
        'email',
        'is_staff',
        'rank_label',
        'rank_int',
        'rank_leaderboard',
    )
    inlines = UserAdmin.inlines + [
        UserSocialAuthInline,
    ]
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('email', )}),
        ('Ranking info', {'fields': ('rank_label', 'rank_int', 'rank_leaderboard', )}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser',
                                    'groups', 'user_permissions'),
                         'classes': ('collapse', )}),
    )
    readonly_fields = UserAdmin.readonly_fields = (
        'rank_label',
        'rank_int',
        'rank_leaderboard',
    )

    actions = [update_rank]

    def get_social_data(self, obj, key):
        social_auth = obj.social_auth.first()
        if social_auth:
            return social_auth.extra_data.get(key)

    def get_rank_data(self, obj):
        return self.get_social_data(obj, 'rank_data')

    def get_rank_item(self, obj, key):
        rank_data = self.get_rank_data(obj)
        if rank_data:
            return rank_data.get(key)

    def rank_label(self, obj):
        return self.get_rank_item(obj, 'rank')

    def rank_int(self, obj):
        return self.get_rank_item(obj, 'rank_int')

    def rank_leaderboard(self, obj):
        return self.get_rank_item(obj, 'rank_leaderboard')


class TeamMemberInline(admin.TabularInline):
    model = TeamMember
    raw_id_fields = ('player', 'team', )
    extra = 0


admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)
