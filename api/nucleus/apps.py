from django.apps import AppConfig


class NucleusConfig(AppConfig):
    name = 'nucleus'

    def ready(self):
        import nucleus.signals
