from django.urls import reverse

from nucleus.models import TeamMember
from social_core.pipeline.partial import partial


@partial
def require_email(strategy, details, user=None, is_new=False, *args, **kwargs):
    if user and user.email:
        return
    elif is_new and not details.get('email'):
        email = strategy.request_data().get('email')
        if email:
            details['email'] = email
        else:
            current_partial = kwargs.get('current_partial')
            return strategy.redirect(
                "{}?partial_token={}".format(
                    reverse("nucleus:require_email"),
                    current_partial.token,
                )
            )


@partial
def create_teammember(strategy, details, user=None, is_new=False, *args, **kwargs):
    accept_invite = strategy.request_data().get('accept_invite')
    if accept_invite:
        try:
            TeamMember.objects.create(
                team_id=accept_invite,
                player=user,
            )
        except:
            pass


