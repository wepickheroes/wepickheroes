import graphene

from graphene_django.types import DjangoObjectType

from django.contrib.auth import get_user_model

User = get_user_model()


class UserType(DjangoObjectType):
    class Meta:
        model = User


class UserQuery:
    all_users = graphene.List(UserType)

    def resolve_all_users(self, info, **kwargs):
        return User.objects.all()


class AuthenticationQuery:
    is_authenticated = graphene.Field(graphene.String)

    def resolve_is_authenticated(self, info, **kwargs):
        return info.context.user.is_authenticated()


class Query(UserQuery,
            AuthenticationQuery,
            graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query)
