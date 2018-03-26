from graphene_django.types import DjangoObjectType

from league.models import (
    Season,
    League,
    LeagueRegistration,
    Division,
    DivisionSeason,
    Series,
    Match,
)


class SeasonType(DjangoObjectType):
    class Meta:
        model = Season


class LeagueType(DjangoObjectType):
    class Meta:
        model = League


class LeagueRegistrationType(DjangoObjectType):
    class Meta:
        model = LeagueRegistration


class DivisionType(DjangoObjectType):
    class Meta:
        model = Division


class DivisionSeasonType(DjangoObjectType):
    class Meta:
        model = DivisionSeason


class SeriesType(DjangoObjectType):
    class Meta:
        model = Series


class MatchType(DjangoObjectType):
    class Meta:
        model = Match
