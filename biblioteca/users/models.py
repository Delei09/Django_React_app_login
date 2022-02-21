from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
import uuid

class UserManager(BaseUserManager):
    user_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("The email is obligatorily!")
        email = self.normalize_email(email)
        user = self.model(email=email, username=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError("Superuser is have is_superuser=True")
        if extra_fields.get('is_staff') is not True:
            raise ValueError("Superuser is have is_staff=True")
        return self._create_user(email, password, **extra_fields)

class Users(AbstractUser):

    email = models.EmailField("E-mail", unique=True)
    fone = models.CharField("Telefone", max_length=15)
    is_staff = models.BooleanField("Membro da equipe", default=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'fone']

    def __str__(self):
        return self.email

    objects = UserManager()


class Livro(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nome = models.CharField(max_length=255)
    autor = models.CharField(max_length=255)
    editora = models.CharField(max_length=255)
    id_usuario = models.ForeignKey(Users, on_delete=models.CASCADE, blank=True, null=True, related_name='livros')
    livro_emprestado = models.BooleanField(default=False)
    id_usuario_emprestado = models.ForeignKey(Users, on_delete=models.CASCADE, blank=True, null=True,
                                              related_name='livros_emprestado')

    def __str__(self):
        return self.nome

    class Meta:
        ordering = ['autor']
        verbose_name = 'Livro'
        verbose_name_plural = 'Livros'




