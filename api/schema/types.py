from django.contrib.auth import get_user_model
from graphene_django.types import DjangoObjectType

from teams.models import Team

from nucleus.models import TeamMember


User = get_user_model()


class TeamType(DjangoObjectType):
    class Meta:
        model = Team


class UserType(DjangoObjectType):
    class Meta:
        model = User


class TeamMemberType(DjangoObjectType):
    class Meta:
        model = TeamMember
