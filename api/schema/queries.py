import graphene

from django.contrib.auth import get_user_model

# from graphene_django.filter import DjangoFilterConnectionField


from teams.models import Team
from nucleus.models import TeamMember
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
        user = info.context.user
        if user.is_authenticated:
            return Team.objects.filter(teammember__player=user).distinct()
        return Team.objects.none()

class TeamMemberQuery:
    all_teammembers = graphene.List(types.TeamMemberType)

    def resolve_all_teammembers(self, info, **kwargs):
        return TeamMember.objects.all()


class UserQuery:
    all_users = graphene.List(types.UserType)
    self = graphene.Field(types.UserType)

    def resolve_all_users(self, info, **kwargs):
        return User.objects.all()

    def resolve_self(self, info, **kwargs):
        if info.context.user.is_authenticated:
            return info.context.user
        return None


class AuthenticationQuery:
    is_authenticated = graphene.Field(graphene.Boolean)

    def resolve_is_authenticated(self, info, **kwargs):
        return info.context.user.is_authenticated


class Query(TeamQuery,
            TeamsQuery,
            UserQuery,
            SeasonQuery,
            TeamMemberQuery,
            LeagueQuery,
            LeagueRegistrationQuery,
            DivisionQuery,
            DivisionSeasonQuery,
            SeriesQuery,
            MatchQuery,
            AuthenticationQuery,
            graphene.ObjectType):
    pass


