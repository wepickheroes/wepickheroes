import graphene

from . import types
from league.models import (
    Season,
    League,
    LeagueRegistration,
    Division,
    DivisionSeason,
    Series,
    Match,
)


class SeasonQuery:
    all_seasons = graphene.List(types.SeasonType)

    def resolve_all_seasons(self, info, **kwargs):
        return Season.objects.all()


class LeagueQuery:
    all_leagues = graphene.List(types.LeagueType)

    def resolve_all_leagues(self, info, **kwargs):
        return League.objects.all()


class LeagueRegistrationQuery:
    all_league_registrations = graphene.List(types.LeagueRegistrationType)

    def resolve_all_league_registrations(self, info, **kwargs):
        return LeagueRegistration.objects.all()


class DivisionQuery:
    all_divisions = graphene.List(types.DivisionType)

    def resolve_all_divisions(self, info, **kwargs):
        return Division.objects.all()


class DivisionSeasonQuery:
    all_division_seasons = graphene.List(types.DivisionSeasonType)

    def resolve_all_division_seasons(self, info, **kwargs):
        return DivisionSeason.objects.all()


class SeriesQuery:
    all_series = graphene.List(types.SeriesType)

    def resolve_all_series(self, info, **kwargs):
        return Series.objects.all()


class MatchQuery:
    all_matches = graphene.List(types.MatchType)

    def resolve_all_matches(self, info, **kwargs):
        return Match.objects.all()

