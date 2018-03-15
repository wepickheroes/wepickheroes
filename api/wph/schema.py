import graphene

from django.contrib.auth import get_user_model
from graphene_django.types import DjangoObjectType

from teams.models import Team
from django.contrib.auth import get_user_model
from schedule.models import Match

User = get_user_model()


class TeamType(DjangoObjectType):
    class Meta:
        model = Team


class UserType(DjangoObjectType):
    class Meta:
        model = User


class MatchType(DjangoObjectType):
    class Meta:
        model = Match


class TeamQuery:
    all_teams = graphene.List(TeamType)

    def resolve_all_teams(self, info, **kwargs):
        return Team.objects.all()


class UserQuery:
    all_users = graphene.List(UserType)

    def resolve_all_users(self, info, **kwargs):
        return User.objects.all()


class MatchQuery:
    all_matches = graphene.List(MatchType)

    def resolve_all_matches(self, info, **kwargs):
        return Match.objects.all()


class AuthenticationQuery:
    is_authenticated = graphene.Field(graphene.Boolean)

    def resolve_is_authenticated(self, info, **kwargs):
        return info.context.user.is_authenticated


class Query(TeamQuery,
            UserQuery,
            AuthenticationQuery,
            graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query)
