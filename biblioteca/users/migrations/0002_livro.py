# Generated by Django 4.0.2 on 2022-02-15 14:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Livro',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('nome', models.CharField(max_length=255)),
                ('autor', models.CharField(max_length=255)),
                ('editora', models.CharField(max_length=255)),
                ('livro_emprestado', models.BooleanField(default=False)),
                ('id_usuario', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='livros', to=settings.AUTH_USER_MODEL)),
                ('id_usuario_emprestado', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='livros_emprestado', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Livro',
                'verbose_name_plural': 'Livros',
                'ordering': ['autor'],
            },
        ),
    ]