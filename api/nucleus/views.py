from django.shortcuts import render
from social_django.utils import psa, load_strategy


def require_email(request):
    strategy = load_strategy()
    partial_token = request.GET.get('partial_token')
    partial = strategy.partial_load(partial_token)
    context = {
        'email_required': True,
        'partial_backend_name': partial.backend,
        'partial_token': partial_token
    }
    return render(request, 'nucleus/require_email.html', context)


