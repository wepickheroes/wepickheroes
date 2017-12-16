from django.conf import settings
from django.shortcuts import redirect, render

SITE_PROTOCOL = 'http' if settings.DEBUG else 'https'
SITE_DOMAIN = 'localhost:3000' if settings.DEBUG else 'wepickheroes.com'


def require_email(request):
    partial_token = request.GET.get('partial_token')
    return_url = '{protocol}://{domain}/finish-steam/{token}'.format(
        protocol=SITE_PROTOCOL,
        domain=SITE_DOMAIN,
        token=partial_token
    )
    return redirect(return_url)


def social_redirect(request):
    return_url = '{protocol}://{domain}/'.format(
        protocol=SITE_PROTOCOL,
        domain=SITE_DOMAIN,
    )
    print('Redirecting to', return_url)
    return redirect(return_url)

