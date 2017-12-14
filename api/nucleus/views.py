from django.conf import settings
from django.shortcuts import redirect, render
from social_django.utils import psa, load_strategy


def require_email(request):
    partial_token = request.GET.get('partial_token')
    return_url = '{protocol}://{domain}/finish-steam/{token}'.format(
        protocol='http' if settings.DEBUG else 'https',
        domain='127.0.0.1:3000',
        token=partial_token
    )
    return redirect(return_url)


def social_redirect(request):
    return_url = '{protocol}://{domain}/'.format(
        protocol='http' if settings.DEBUG else 'https',
        domain='127.0.0.1:3000',
    )
    return redirect(return_url)

