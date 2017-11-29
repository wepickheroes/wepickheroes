from django.core.urlresolvers import reverse

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
