SHELL_PLUS = "ipython"

SOCIAL_AUTH_STEAM_EXTRA_DATA = ['player']
SOCIAL_AUTH_LOGIN_REDIRECT_URL = '/'
SOCIAL_AUTH_LOGIN_ERROR_URL = '/login/error/'
SOCIAL_AUTH_INACTIVE_USER_URL = '/login/inactive/'
SOCIAL_AUTH_NEW_USER_REDIRECT_URL = '/'
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
