# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-07-22 05:42
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0015_account'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='account',
            options={'managed': False},
        ),
    ]
