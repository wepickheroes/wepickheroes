from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, UserManager
from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _

from nucleus.models import AbstractBaseModel, UUIDModel


class WPHUserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, steamid, username, email, password, **extra_fields):
        """
        Creates and saves a User with the given username, email and password.
        """
        if not username:
            raise ValueError('The given username must be set')
        email = self.normalize_email(email)
        # username = self.model.normalize_username(username)
        user = self.model(steamid=steamid, username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, steamid, username, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(steamid, username, email, password, **extra_fields)

    def create_superuser(self, steamid, username, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(steamid, username, email, password, **extra_fields)


class WPHUser(AbstractBaseUser, PermissionsMixin, UUIDModel):
    steamid = models.CharField('Steam ID', max_length=64, unique=True, null=True)
    steam_friends = ArrayField(base_field=models.CharField(max_length=64), blank=True, default=[])
    username = models.CharField('username', max_length=150, null=True)
    email = models.EmailField(_('email address'), null=True, blank=True)
    avatar = models.CharField('Avatar URL', max_length=256, null=True, blank=True)
    avatarfull = models.CharField('Avatar URL (full)', max_length=256, null=True, blank=True)
    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=30, blank=True)
    is_staff = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_('Designates whether the user can log into this admin site.'),
    )
    is_active = models.BooleanField(
        _('active'),
        default=True,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)
    last_login = models.DateTimeField(_('Last Login'), null=True, blank=True)

    objects = WPHUserManager()
    # objects = UserManager()

    USERNAME_FIELD = 'steamid'
    REQUIRED_FIELDS = ['username', 'email']
    STEAM32_MODIFIER = 76561197960265728

    class Meta:
        ordering = ('username', )
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def get_full_name(self):
        return self.email

    def get_short_name(self):
        return self.email

    @property
    def steamid32(self):
        return int(self.steamid) - self.STEAM32_MODIFIER

    def __str__(self):
        return str(self.username)
