import graphene
from schema.queries import Query
from schema.mutations import Mutations

schema = graphene.Schema(query=Query, mutation=Mutations)
