# Generated by Django 2.0 on 2018-04-07 05:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('nucleus', '0003_auto_20180324_2100'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='teammember',
            name='position',
        ),
        migrations.RemoveField(
            model_name='teammemberhistory',
            name='position',
        ),
        migrations.DeleteModel(
            name='Position',
        ),
    ]