import os
from corsheaders.defaults import default_headers

CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_WHITELIST = (
    'localhost',
    'localhost:3000',
    'localhost:8000',
    'wepickheroes.com',
    'local.wepickheroes.com',
    'local.wepickheroes.com:3000',
)
# CSRF_TRUSTED_ORIGINS = (
#     'localhost',
#     'wepickheroes.com',
#     'local.wepickheroes.com:3000',
# )
CORS_ALLOW_HEADERS = default_headers + (
    'credentials',
)
GRAPHENE = {
    'SCHEMA': 'wph.schema.schema',
}

SHELL_PLUS = "ipython"

SOCIAL_AUTH_STEAM_API_KEY = os.environ.get('SOCIAL_AUTH_STEAM_API_KEY', None)
SOCIAL_AUTH_STEAM_EXTRA_DATA = ['player']
SOCIAL_AUTH_LOGIN_REDIRECT_URL = '/social-redirect/'
SOCIAL_AUTH_LOGIN_ERROR_URL = '/login/error/'
SOCIAL_AUTH_INACTIVE_USER_URL = '/login/inactive/'
SOCIAL_AUTH_NEW_USER_REDIRECT_URL = '/social-redirect/signup-complete'
SOCIAL_AUTH_PASSWORDLESS = True

SOCIAL_AUTH_PIPELINE = (
    'social_core.pipeline.social_auth.social_details',
    'social_core.pipeline.social_auth.social_uid',
    'social_core.pipeline.social_auth.auth_allowed',
    'social_core.pipeline.social_auth.social_user',
    'wph.social.pipeline.require_email',
    'social_core.pipeline.user.get_username',
    # 'social_core.pipeline.mail.mail_validation',
    'social_core.pipeline.user.create_user',
    'social_core.pipeline.social_auth.associate_user',
    'social_core.pipeline.social_auth.load_extra_data',
    'social_core.pipeline.user.user_details',
)
