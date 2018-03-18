from django.contrib.auth import get_user_model
from graphene_django.types import DjangoObjectType

from teams.models import Team
from schedule.models import (
    LeagueSeason,
    LeagueSeries,
    Match,
)

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


class LeagueSeriesType(DjangoObjectType):
    class Meta:
        model = LeagueSeries


class LeagueSeasonType(DjangoObjectType):
    class Meta:
        model = LeagueSeason
