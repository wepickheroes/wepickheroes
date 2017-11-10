import uuid
from django.db import models
from django.utils import timezone


class UUIDModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    class Meta:
        abstract = True


class CreatableModel(models.Model):
    created = models.DateTimeField(default=timezone.now)

    class Meta:
        abstract = True


class UpdateableModel(models.Model):
    updated = models.DateTimeField(null=True, blank=True, editable=False)

    def save(self, *args, **kwargs):
        if self.pk:
            self.updated = timezone.now()
        return super(UpdateableModel, self).save(*args, **kwargs)

    class Meta:
        abstract = True


class AbstractBaseModel(CreatableModel, UpdateableModel, UUIDModel):
    class Meta:
        abstract = True
