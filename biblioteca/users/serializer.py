from rest_framework import serializers
from .models import Users, Livro

class UsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        # fields = ["id", 'first_name', 'last_name', 'email', 'fone', 'password']
        fields = ['id', 'first_name', 'last_name', 'email', 'fone', 'password']

class LivrosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Livro
        fields = '__all__'

class UsuarioLivrosSerializer(serializers.ModelSerializer):

    livros = serializers.HyperlinkedRelatedField(many=True, view_name='livros-detail', read_only=True)
    class Meta:
        model = Users
        fields = ['id', 'first_name', "last_name", 'email', 'livros',]

class LivrosEmprestadosUsuarioSerializer(serializers.ModelSerializer):

    # livros = serializers.HyperlinkedRelatedField(many=True, view_name='livros-detail', read_only=True)
    livros = LivrosSerializer(many=True, read_only=True)

    livros_emprestado = serializers.HyperlinkedRelatedField(many=True, view_name='livros-detail', read_only=True)

    class Meta:
        model = Users
        fields = ['id', 'first_name', "last_name", 'email', 'livros', 'livros_emprestado']