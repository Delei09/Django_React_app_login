from django.contrib import admin

from django.contrib.auth.admin import UserAdmin
from .forms import CustomUserChangeForm, CustomUserCreateForm
from .models import Users, Livro

class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreateForm
    form = CustomUserChangeForm
    model = Users
    list_display = ('first_name', 'last_name', 'email', 'fone', 'is_staff')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ("Informações Pessoais", {'fields': ('first_name', 'last_name', 'fone')}),
        ('Permissões', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ("Dados Importantes", {"fields": ('last_login', 'date_joined')})
    )
admin.site.register(Users, CustomUserAdmin)

class LivroAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'autor', 'editora')
    list_display_links = ('id', 'nome')
    search_fields = ('nome',)
    # list_filter = ('ativo',)
    # list_editable = ('ativo',)
    list_per_page = 25
    ordering = ('nome',)

admin.site.register(Livro, LivroAdmin)

