# Generated by Django 5.0 on 2023-12-30 19:24

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("shop", "0001_initial"),
        ("user", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="favourites",
            field=models.ManyToManyField(
                blank=True, related_name="user_favourites", to="shop.product"
            ),
        ),
    ]
