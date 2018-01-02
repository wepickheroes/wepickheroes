from django.conf import settings
from django.shortcuts import redirect, render
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie

SITE_PROTOCOL = 'http' if settings.DEBUG else 'https'
SITE_DOMAIN = 'local.wepickheroes.com' if settings.DEBUG else 'wepickheroes.com'


@ensure_csrf_cookie
def index(request):
    return JsonResponse({})


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

