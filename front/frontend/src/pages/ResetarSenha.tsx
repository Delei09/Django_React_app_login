import Header from '../components/Header'
import Footer from '../components/Footer'
import { Button, TextField } from '@mui/material'
import '../style/Cadastro.css'
import React, { useContext, useState } from 'react'
import axios from 'axios'
import UsuarioContext from '../context/UsuarioContext'

const senhaInicial = {
    senha: "",
    confirmacao_senha: ""
}
type SenhaProps = {
    senha: string,
    confirmacao_senha: string
}

const ResetarSenha = () => {

    const [senha, setSenha] = useState<SenhaProps>(senhaInicial)
    const [mensagem, setMensagem] = useState('')
    const {state } = useContext(UsuarioContext)
  
    function inputChange(e : React.ChangeEvent<HTMLInputElement>) {
        setSenha({...senha, [e.target.id]: e.target.value})
    }

    function salvar(e : React.FormEvent){
        e.preventDefault()
        const token = localStorage.getItem('token')
        const url = 'http://127.0.0.1:8000/novasenha/'
        console.log(senha)
        axios.post(url, senha ,{
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        })
            .then(res => res.data)
            .then(data=> {
                setMensagem("senha alterado com sucesso!")
                setSenha(senhaInicial)
            })
            .catch(e =>{
                const msg =  JSON.stringify( e.response.data )  
                const ms =msg.replaceAll('{', '')
                const m = ms.replaceAll('}', '')
                setMensagem(m)
            }  )
    }

    return(
        <div className='container' >
            <Header pagina='Alterar Senha' itens={['Meus Dados','Dashboard', "Usuarios", "Livros" ,"Emprestar Livros" , "Devolver Livros", "Logoff"]} usuario={state.first_name}   ></Header>
            <main className='main' >
                <p className='titulo' >Alterar Senha</p>
                <form className='form'   >
                    <TextField id="senha" value={senha.senha}  label="Senha" variant="outlined" type='password'  className='input_cadastro' 
                      onChange={(e : React.ChangeEvent<HTMLInputElement> ) => inputChange(e)}  />
                    <TextField id="confirmacao_senha" value={senha.confirmacao_senha} label="Confirmar senha" type='password'  variant="outlined" className='input_cadastro' 
                        onChange={(e : React.ChangeEvent<HTMLInputElement> ) => inputChange(e)}   />
                    <p className='mensagem' >{mensagem && mensagem}</p>
                    <Button variant="outlined" onClick={ (e : React.FormEvent) => salvar(e)}  >Salvar</Button>
                </form>
            </main>
            <Footer></Footer>
        </div>
    )
}

export default ResetarSenha