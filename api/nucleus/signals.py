from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

from .tasks import update_player_rank

User = get_user_model()


@receiver(post_save, sender=User)
def set_player_ranking(sender, instance, **kwargs):
    update_player_rank(instance.pk)
