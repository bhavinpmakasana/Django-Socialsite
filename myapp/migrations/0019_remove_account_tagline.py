# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-07-22 05:56
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0018_auto_20160721_2252'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='account',
            name='tagline',
        ),
    ]