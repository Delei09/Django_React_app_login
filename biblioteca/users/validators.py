import re
from .models import Users

def campo_valido(campo, item):
    if not item:
        return False

def nome_valido(nome ):
    modelo = r"(^[a-z ,.'-]+$)"
    resposta = re.findall(modelo, nome)
    return resposta

def celular_valido(numero_celular):
    modelo = '(^1\d\d(\d\d)?$|^0800 ?\d{3} ?\d{4}$|^(\(0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d\) ?|0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d[ .-]?)?(9|9[ .-])?[2-9]\d{3}[ .-]?\d{4}$)'
    resposta = re.findall(modelo, numero_celular)
    return resposta

def senha_valido( senha):
    modelo = r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@$#%&çÇ`\'^~]).{8,}$"
    resposta = re.findall(modelo, senha)
    return resposta

def email_valido(email):
    existe = Users.objects.filter(email=email).exists()
    return existe