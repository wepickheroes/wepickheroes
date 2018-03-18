import graphene

from teams.models import Team
from schema import types


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


class Mutations(graphene.ObjectType):
    create_team = CreateTeam.Field()
