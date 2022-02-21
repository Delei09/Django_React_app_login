import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Button, TextField } from '@mui/material'
import '../style/Cadastro.css'
import '../style/login.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'



const url = 'http://127.0.0.1:8000/login/'

const loginInicio =  {
    email : '',
    password: ''
}

type loginType = {
    email: string,
    password: string
}

const Login = () => {
    
    const [login, setLogin] = useState<loginType>(loginInicio)
    const [mensagem, setMensagem] = useState('')
    let navigate = useNavigate();
    
    function handlelogin(e : React.ChangeEvent<HTMLInputElement>){
        setLogin({...login  , [e.target.id] : e.target.value})
    }
    async function logar(e : React.FormEvent){
        e.preventDefault()
        axios.post(url, login)
            .then(res => res.data)
            .then(data =>{
                localStorage.setItem('token', data.access)
                navigate('/dashboard')
            })
            .catch(e =>{
                const msg =  JSON.stringify( e.response.data )  
                const ms = msg.replaceAll('{', '')
                const m = ms.replaceAll('}', '')
                setMensagem(m)
            }  )
    }

    return(
        <div className='container' >
            <Header  pagina='Login' itens={['Login', "Cadastrar"]} ></Header>
            
            <main className='main' >       
                <p className='titulo' >Faça Seu Login</p>
                <form className='form'>
                    <TextField id="email" label="Email" variant="outlined" className='input_cadastro' 
                        onChange={(e : React.ChangeEvent<HTMLInputElement> ) => handlelogin(e)} />
                    <TextField id="password" label="password" variant="outlined" type='password'  className='input_cadastro'  
                        onChange={(e : React.ChangeEvent<HTMLInputElement> ) => handlelogin(e)} />
                        <p className='mensagem' >{mensagem && mensagem}</p>
                    <Button variant="outlined" onClick={ (e : React.FormEvent) => logar(e)}>Logar</Button>
                </form>
            </main>
            <Footer/>
        </div>
    )
}
export default Login