import uuid

from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.sites.models import Site
from django.db import models
from django.utils import timezone

User = get_user_model()


class UUIDModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    class Meta:
        abstract = True


class CreatableModel(models.Model):
    created = models.DateTimeField(default=timezone.now, editable=False)

    class Meta:
        abstract = True


class UpdateableModel(models.Model):
    updated = models.DateTimeField(null=True, blank=True, editable=False)

    def save(self, *args, **kwargs):
        if self.pk:
            self.updated = timezone.now()
        return super(UpdateableModel, self).save(*args, **kwargs)

    class Meta:
        abstract = True


class AbstractBaseModel(CreatableModel, UpdateableModel, UUIDModel):
    class Meta:
        abstract = True


class EmailMixin:
    @staticmethod
    def create_url(url):
        return '{}://{}/{}'.format(
            'http' if settings.DEBUG else 'https',
            Site.objects.get_current().domain,
            url
        )


class Fixture(UUIDModel):
    name = models.CharField(max_length=255, unique=True)

    class Meta:
        ordering = ['name']
        abstract = True

    def __repr__(self):
        return "<{}: {}>".format(type(self).__name__, self.name)

    def __str__(self):
        return self.name


class SkillBracket(Fixture):
    pass


class Region(Fixture):
    pass


class PositionQuerySet(models.QuerySet):
    def primary(self):
        return self.filter(secondary=False)

    def secondary(self):
        return self.filter(secondary=True)


class Position(Fixture):
    secondary = models.BooleanField(default=False,
                                    help_text='Designates whether this position is only useful in the context of a '
                                              'team member, but not a Team or a Player alone (e.g. Coach or Standin).')
    objects = PositionQuerySet.as_manager()

    def __repr__(self):
        return "<{}: {}{}>".format(type(self).__name__, self.name,
                                   ' (secondary)' if self.secondary else '')


class Interest(Fixture):
    pass


class Language(Fixture):
    pass


class EmailTag:
    ALL = 0
    UPDATES = 1
    PLAYER_NOTIFICATIONS = 2
    TEAM_NOTIFICATIONS = 3
    CHOICES = (
        (ALL, 'All'),
        (UPDATES, 'Updates and New Features'),
        (PLAYER_NOTIFICATIONS, 'Player Notifications'),
        (TEAM_NOTIFICATIONS, 'Team Notifications'),
    )


class TeamMemberHistoryManager(models.Manager):
    def create_from_team_member(self, team_member, player_id):
        assert type(team_member) is TeamMember
        reason = None
        if player_id == team_member.player_id:
            reason = TeamMemberHistory.REASON_LEFT
        elif player_id == team_member.team.captain_id:
            reason = TeamMemberHistory.REASON_REMOVED
        return TeamMemberHistory.objects.create(
            started=team_member.created,
            ended=timezone.now(),
            team=team_member.team,
            player=team_member.player,
            position=team_member.position,
            reason=reason,
        )


class TeamMemberHistory(AbstractBaseModel):
    REASON_LEFT = 1
    REASON_REMOVED = 2
    REASON_CHOICES = (
        (REASON_LEFT, 'Left'),
        (REASON_REMOVED, 'Removed'),
    )
    started = models.DateTimeField('Started')
    ended = models.DateTimeField('Ended')
    team = models.ForeignKey('teams.Team', on_delete=models.CASCADE)
    player = models.ForeignKey(User, on_delete=models.CASCADE)
    position = models.ForeignKey(Position, null=True, blank=True, on_delete=models.SET_NULL)
    reason = models.IntegerField('Reason', choices=REASON_CHOICES, null=True, help_text='Reason for leaving the team')

    objects = TeamMemberHistoryManager()


class TeamMember(AbstractBaseModel):
    team = models.ForeignKey('teams.Team', on_delete=models.CASCADE)
    player = models.ForeignKey(User, on_delete=models.CASCADE)
    position = models.ForeignKey(Position, null=True, blank=True, on_delete=models.SET_NULL)

    class Meta:
        ordering = ('team', 'player', )

    def delete(self, player_id=None, *args, **kwargs):
        TeamMemberHistory.objects.create_from_team_member(self, player_id)
        return super(TeamMember, self).delete(*args, **kwargs)

    def __repr__(self):
        return "<{}: {}, {}, {}>".format(type(self).__name__,
                                         repr(self.team), repr(self.player), repr(self.position))

    def __str__(self):
        return str(self.player)


class EmailRecord(AbstractBaseModel):
    to = models.ForeignKey(User, on_delete=models.CASCADE)
    from_address = models.CharField(max_length=256)
    subject = models.CharField(max_length=256)
    text_content = models.TextField()

    def __str__(self):
        return '{} sent to {}'.format(self.subject, self.to)
