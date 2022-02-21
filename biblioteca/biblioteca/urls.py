from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenObtainPairView,
    TokenVerifyView
)
from rest_framework import routers
from users.views import VerifyTokenUser, UsuariosViewset , CadastroUsuarioApiview , ResetSenhaApiview, LivrosViewset, UsuarioLivrosApiview, LivrosEmprestadosUsuarioApiview, EmprestarLivroApiview, DevolverLivroApiview

rotas = routers.DefaultRouter()
rotas.register('usuarios', UsuariosViewset, basename='usuarios')
rotas.register('livros', LivrosViewset, basename='livros')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh-token/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(rotas.urls)),
    path('cadastro/', CadastroUsuarioApiview.as_view(), name='cadastro'),
    path('novasenha/', ResetSenhaApiview.as_view(), name='nova_senha'),
    path('usuario/livros/', UsuarioLivrosApiview.as_view(), name='usuario_livros'),
    path('usuario/livros-emprestados/', LivrosEmprestadosUsuarioApiview.as_view(), name='usuario_livros_emprestado'),
    path('emprestar/', EmprestarLivroApiview.as_view(), name='emprestar_livro'),
    path('devolver/', DevolverLivroApiview.as_view(), name='devolver_livro'),
    path('verificar/', VerifyTokenUser.as_view(), name='token_verify'),

]
