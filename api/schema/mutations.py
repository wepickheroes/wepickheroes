import graphene

from league.models import (
    League,
    LeagueRegistration,
)
from league.schema.types import (
    LeagueRegistrationType,
)
from nucleus.models import TeamMember
from teams.models import Team
from schema import types
from league.models import User


class CreateTeam(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)

    ok = graphene.Boolean()
    team = graphene.Field(types.TeamType)

    def mutate(self, info, name):
        request = info.context
        user = request.user

        if not name:
            return CreateTeam(team=None, ok=False)

        try:
            team = Team.objects.create(
                name=name, captain=user, creator=user
            )
        except:
            team = None
            ok = False
        else:
            ok = True

        return CreateTeam(team=team, ok=ok)


class CreateLeagueRegistration(graphene.Mutation):
    class Arguments:
        league_id = graphene.UUID(required=True)
        team_id = graphene.UUID(required=True)

    ok = graphene.Boolean()
    error = graphene.String()
    league_registration = graphene.Field(LeagueRegistrationType)

    def mutate(self, info, league_id, team_id):
        user = info.context.user

        if not (league_id and team_id):
            return CreateLeagueRegistration(league_registration=None, ok=False)

        try:
            team = Team.objects.get(pk=team_id)
        except Team.DoesNotExist:
            return CreateLeagueRegistration(league_registration=None, ok=False, error='Team not found.')
        else:
            if not team.captain or (team.captain and user.id != team.captain.id):
                return CreateLeagueRegistration(league_registration=None, ok=False,
                                                error='Only the team captain can register for leagues.')
            if team.players.count() < 5:
                return CreateLeagueRegistration(
                    league_registration=None, ok=False,
                    error='Team does not have enough players. Your team must have 5 players to register for a league.')

        try:
            League.objects.get(pk=league_id)
        except League.DoesNotExist:
            return CreateLeagueRegistration(league_registration=None, ok=False,
                                            error='League not found.')

        if LeagueRegistration.objects.filter(team_id=team_id, league_id=league_id).exists():
            return CreateLeagueRegistration(league_registration=None, ok=False,
                                            error='This team is already registered for this league.')

        try:
            league_registration = LeagueRegistration.objects.create(
                league_id=league_id,
                team_id=team_id,
                registered_by=user,
            )
        except Exception as e:
            league_registration = None
            ok = False
            error = str(e)
        else:
            ok = True
            error = None

        return CreateLeagueRegistration(league_registration=league_registration,
                                        ok=ok, error=error)


class CreateTeamMember(graphene.Mutation):
    class Arguments:
        team_id = graphene.UUID(required=True)

    ok = graphene.Boolean()
    error = graphene.String()
    team = graphene.Field(types.TeamType)

    def mutate(self, info, team_id):
        user = info.context.user

        if not team_id:
            return CreateTeamMember(team=None, ok=False, error='Missing team.')

        if not user.is_authenticated:
            return CreateTeamMember(team=None, ok=False, error='You must be logged in to do this.')

        try:
            team = Team.objects.get(pk=team_id)
        except Team.DoesNotExist:
            return CreateTeamMember(team=None, ok=False, error='Team not found.')

        if TeamMember.objects.filter(player_id=user.id, team_id=team_id).exists():
            return CreateTeamMember(team=None, ok=False, error='You are already on this team.')

        try:
            TeamMember.objects.create(team_id=team_id, player_id=user.id)
        except Exception as e:
            ok = False
            error = str(e)
        else:
            ok = True
            error = None

        return CreateTeamMember(team=team, ok=ok, error=error)


class ChangeCaptain(graphene.Mutation):
    class Arguments:
        team_id = graphene.UUID(required=True)
        new_captain_id = graphene.Int(required=True)

    ok = graphene.Boolean()
    error = graphene.String()
    team = graphene.Field(types.UserType)

    def mutate(self, info, team_id, new_captain_id):
        user = info.context.user

        try:
            team = Team.objects.get(pk=team_id)
        except Team.DoesNotExist:
            return ChangeCaptain(team=None, ok=False, error='Team not found.')

        if user.id == new_captain_id:
            return ChangeCaptain(team=None, ok=False, error='Cannot change captain to current captain.')
        if user.id != team.captain.id:
            return ChangeCaptain(team=None, ok=False, error='Only the team captain can change the captain.')
        else:
            user = User.objects.filter(id=new_captain_id)[0]
            team.captain = user
            user.save()
            ok = True
            error = None

        return ChangeCaptain(team=team, ok=ok, error=error)


class Mutations(graphene.ObjectType):
    create_team = CreateTeam.Field()
    create_league_registration = CreateLeagueRegistration.Field()
    create_team_member = CreateTeamMember.Field()
    change_captain = ChangeCaptain.Field()

