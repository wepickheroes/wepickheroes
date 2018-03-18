import graphene

from django.contrib.auth import get_user_model

from teams.models import Team
from django.contrib.auth import get_user_model
from schedule.models import (
    LeagueSeason,
    LeagueSeries,
    Match,
)
from schema import types

User = get_user_model()


class TeamQuery:
    team = graphene.Field(types.TeamType, id=graphene.UUID())

    def resolve_team(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return Team.objects.get(pk=id)
        return None


class TeamsQuery:
    all_teams = graphene.List(types.TeamType)
    my_teams = graphene.List(types.TeamType)

    def resolve_all_teams(self, info, **kwargs):
        return Team.objects.all()

    def resolve_my_teams(self, info, **kwargs):
        request = info.context
        return Team.objects.filter(teammember__player=request.user).distinct()


class UserQuery:
    all_users = graphene.List(types.UserType)

    def resolve_all_users(self, info, **kwargs):
        return User.objects.all()


class AuthenticationQuery:
    is_authenticated = graphene.Field(graphene.Boolean)

    def resolve_is_authenticated(self, info, **kwargs):
        return info.context.user.is_authenticated


class LeagueSeriesQuery:
    all_series = graphene.List(types.LeagueSeriesType)

    def resolve_all_series(self, info, **kwargs):
        return LeagueSeries.objects.all()


class LeagueSeasonQuery:
    all_seasons = graphene.List(types.LeagueSeasonType)

    def resolve_all_seasons(self, info, **kwargs):
        return LeagueSeason.objects.all()


class MatchQuery:
    all_matches = graphene.List(types.MatchType)

    def resolve_all_matches(self, info, **kwargs):
        return Match.objects.all()


class Query(LeagueSeasonQuery,
            LeagueSeriesQuery,
            MatchQuery,
            TeamQuery,
            TeamsQuery,
            UserQuery,
            AuthenticationQuery,
            graphene.ObjectType):
    pass


