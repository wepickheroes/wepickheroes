import graphene

from django.contrib.auth import get_user_model

from teams.models import Team
from django.contrib.auth import get_user_model
from league.schema.queries import (
    SeasonQuery,
    LeagueQuery,
    LeagueRegistrationQuery,
    DivisionQuery,
    DivisionSeasonQuery,
    SeriesQuery,
    MatchQuery,
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


class Query(TeamQuery,
            TeamsQuery,
            UserQuery,
            SeasonQuery,
            LeagueQuery,
            LeagueRegistrationQuery,
            DivisionQuery,
            DivisionSeasonQuery,
            SeriesQuery,
            MatchQuery,
            AuthenticationQuery,
            graphene.ObjectType):
    pass


