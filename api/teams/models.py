from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import models
from django.template.loader import render_to_string

from nucleus.models import (
    AbstractBaseModel,
    EmailMixin,
    EmailRecord,
)

User = get_user_model()


class Team(AbstractBaseModel):
    name = models.CharField(max_length=255)
    logo_url = models.CharField(max_length=255, null=True, blank=True)
    players = models.ManyToManyField(User, through='nucleus.TeamMember', related_name='teams')
    captain = models.ForeignKey(User, null=True, blank=True, related_name='teams_captain_of',
                                on_delete=models.SET_NULL)
    creator = models.ForeignKey(User, null=True, blank=True, related_name='teams_created',
                                on_delete=models.SET_NULL)

    def __str__(self):
        return self.name


INVITE_TEMPLATE = """Hello,

You've been invited to join a team on push.gg. Click the link below to sign up:

{signup_link}

- Push League
"""


class TeamInvite(AbstractBaseModel):
    team = models.ForeignKey('teams.Team', on_delete=models.CASCADE)
    player_email = models.EmailField()
    player = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)

    def save(self, *args, **kwargs):
        try:
            previous_self = TeamInvite.objects.get(pk=self.pk)
        except TeamInvite.DoesNotExist:
            previous_self = None

        new_instance = not previous_self

        super().save(*args, **kwargs)

        if new_instance:
            self.send_email()

    def send_email(self):
        subject = "You have been invited to a team on push.gg"
        email_body = INVITE_TEMPLATE.format(
            signup_link="",
        )
        self.player.email_user(
            "You have been invited to a team on push.gg",
            email_body,
        )
        EmailRecord.objects.create(
            to=self.player_email,
            from_address=settings.DEFAULT_FROM_EMAIL,
            subject=subject,
            text_content=email_body
        )
