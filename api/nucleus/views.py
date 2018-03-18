from django.conf import settings
from django.contrib.auth import logout as auth_logout
from django.shortcuts import redirect
from django.http import JsonResponse

SITE_PROTOCOL = 'http' if settings.DEBUG else 'https'
SITE_DOMAIN = 'local.wepickheroes.com:3000' if settings.DEBUG else 'wepickheroes.com'


def index(request):
    return JsonResponse({})


def logout(request):
    auth_logout(request)
    return social_redirect(request)


def require_email(request):
    partial_token = request.GET.get('partial_token')
    return_url = '{protocol}://{domain}/finish-steam/{token}'.format(
        protocol=SITE_PROTOCOL,
        domain=SITE_DOMAIN,
        token=partial_token
    )
    return redirect(return_url)


def social_redirect(request, path=''):
    return_url = '{protocol}://{domain}/{path}'.format(
        protocol=SITE_PROTOCOL,
        domain=SITE_DOMAIN,
        path=path,
    )
    return redirect(return_url)

