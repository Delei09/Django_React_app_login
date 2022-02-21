import Header from '../components/Header'
import Footer from '../components/Footer'
import UsuarioContext from '../context/UsuarioContext';

import {  useContext, useEffect } from 'react';
import axios from 'axios'
import { useNavigate }  from 'react-router';

import '../style/dashboard.css'
import '../style/Cadastro.css'
import { Button } from '@mui/material';
const url = 'http://127.0.0.1:8000/verificar/'

export type UsuarioType = {
    email : string,
    first_name: string,
    fone: string,
    id: number,
    last_name: string,
    telefone: string
}

const MeusDados = () => {

    const navigate = useNavigate()
    const { state  } = useContext(UsuarioContext)


    useEffect(() => {   
        const token = localStorage.getItem('token')
        axios.get(url, {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.data)
        .catch(e => {
            navigate('/login')
        })
           
    },[navigate])

    return(
        <div className='container' >
            <Header pagina='Meus Dados' itens={['Meus Dados','Dashboard', "Usuarios", "Livros" ,"Emprestar Livros" , "Devolver Livros", "Logoff"]} usuario={state.first_name}   ></Header>
            <p className='titulo' >Meus Dados</p>
            <main className='main , dashboard' >
                <div className="card">
                    <div className="card-header">
                        Usuario
                    </div>
                    <div className="card">
                        <p className="card-text"> ID: {state.id} </p>
                        <p className="card-text"> Primeiro nome: {state.first_name} </p>
                        <p className="card-text"> Ultimo nome: {state.last_name} </p>
                        <p className="card-text"> Email: {state.email} </p>
                        <p className="card-text"> Telefone: {state.telefone} </p>
                        <Button variant="outlined" onClick={e => navigate('/resetar-senha/')} >Alterar Senha</Button>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    )
}

export default MeusDados