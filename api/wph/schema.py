import graphene

from graphene_django.types import DjangoObjectType

from django.contrib.auth import get_user_model
from  schedule.models import Match

User = get_user_model()


class UserType(DjangoObjectType):
    class Meta:
        model = User

class MatchType(DjangoObjectType):
    class Meta:
        model = Match


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


class Query(UserQuery,
            AuthenticationQuery,
            graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query)
