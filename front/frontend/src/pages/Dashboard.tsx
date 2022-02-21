import Header from '../components/Header'
import Footer from '../components/Footer'
import UsuarioContext from '../context/UsuarioContext';

import FaceIcon from '@mui/icons-material/Face';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import LayersIcon from '@mui/icons-material/Layers';

import {  useContext, useEffect } from 'react';
import axios from 'axios'
import { useNavigate }  from 'react-router';
import { Link } from 'react-router-dom';

import '../style/dashboard.css'
import '../style/Cadastro.css'
const url = 'http://127.0.0.1:8000/verificar/'

export type UsuarioType = {
    email : string,
    first_name: string,
    fone: string,
    id: number,
    last_name: string,
    telefone: string
}

const Dashboard = () => {

    const navigate = useNavigate()
    const { state , setState } = useContext(UsuarioContext)


    useEffect(() => {   
        const token = localStorage.getItem('token')
        axios.get(url, {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.data)
        .then(data => {
            data.results.forEach((e : any) => {
                const usuario: UsuarioType = {
                    email : e.email,
                    first_name: e.first_name,
                    fone: e.fone,
                    id: e.id,
                    last_name: e.last_name,
                    telefone: e.fone
                }
                setState(usuario)
            })
        })
        .catch(e => {
            navigate('/login')
        })
           
    },[navigate, setState])

    return(
        <div className='container' >
            <Header pagina='Dashboard' itens={['Meus Dados','Dashboard', "Usuarios", "Livros","Usuario-Livros" ,"Emprestar Livros" , "Devolver Livros", "Logoff"]} usuario={state.first_name}   ></Header>
            <p className='titulo' >Dashboard</p>
            <main className='main , dashboard' >
               <Link  to='/usuarios/' >Usuarios <FaceIcon className='icone' /> </Link>
                <Link to='/livros/' >Livros <LayersIcon className='icone'  /> </Link>
                <Link to='/emprestar-livro/' >Emprestar Livros <KeyboardTabIcon  className='icone' /> </Link>
                <Link to='/devolver-livro' >Devolver Livros <KeyboardBackspaceIcon className='icone'  /> </Link>
            </main>
            <Footer/>
        </div>
    )
}

export default Dashboard