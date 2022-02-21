import Header from '../components/Header'
import Footer from '../components/Footer'
import FaceIcon from '@mui/icons-material/Face';

import '../style/dashboard.css'
import '../style/Cadastro.css'

import UsuarioContext from '../context/UsuarioContext'; 
import { useNavigate } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

const url = 'http://127.0.0.1:8000/verificar/'
const urlUsuarios = 'http://127.0.0.1:8000/usuarios'

type UsuariosType = {
  id  : number,
  first_name: string,
  last_name: string,
  email: string,
  fone: string
}
const usuarioInicio = {
    id  : 1,
    first_name: '',
    last_name: '',
    email: '',
    fone: ''
  }

const Usuarios = () => {

    const [usuarios, setUsuarios] = useState<[UsuariosType]>([usuarioInicio])
    const [anterior, setAnterior] = useState('')
    const [proximo, setProximo] = useState('')
    const { state } = useContext(UsuarioContext)
    const navigate = useNavigate()

    useEffect(() => {   
        const token = localStorage.getItem('token')
        axios.get(url,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        .catch(e => {
                navigate('/login')
        })
        axios.get(urlUsuarios, {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.data)
        .then(data => {
            setUsuarios(data.results)
            if(data.next){
                setProximo(data.next)
            }
            if(data.previous){
                setAnterior(data.previous)
            }
        }
        
        )
    },[navigate])

    function paginacao(pagina : string){
        const token = localStorage.getItem('token')
        if(pagina === 'anterior'){
            axios.get(anterior, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => res.data)
            .then(data => {
                setUsuarios(data.results)
                if(data.next){
                    setProximo(data.next)
                }
                if(data.previous){
                    setAnterior(data.previous)
                }
            })}

        if(pagina === 'proximo'){
            axios.get(proximo, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => res.data)
            .then(data => {
                setUsuarios(data.results)
                if(data.next){
                    setProximo(data.next)
                }
                if(data.previous){
                    setAnterior(data.previous)
                }
            })}
    }

    return(
        <div className='container' >
            <Header pagina='Usuarios' itens={['Meus Dados','Dashboard', "Usuarios", "Livros" ,"Emprestar Livros" , "Devolver Livros", "Logoff"]} usuario={state.first_name}   ></Header>
            <p className='titulo' >Usuarios <FaceIcon className='icone' />  </p>
            <main className='main , dashboard' >
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID</th>
                        <th scope="col">Primeiro Nome</th>
                        <th scope="col">Ultimo Nome</th>
                        <th scope="col">Email</th>
                        <th scope="col">Telefone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario, index) => {
                            return(
                                <tr  key={index}  >
                                    <th scope="row">{index + 1}</th>
                                    <td>{usuario.id}</td>
                                    <td>{usuario.first_name}</td>
                                    <td>{usuario.last_name}</td>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.fone}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                    </table>
                    <nav className='paginacao' aria-label="">
                        <ul className="  ">
                            <li >
                                <Button variant="outlined" onClick={ e => paginacao('anterior')}  >Anterior</Button>
                            </li>
                            <li >
                                <Button variant="outlined" onClick={ e => paginacao('proximo')}   >Proxima</Button>
                            </li>
                        </ul>
                    </nav>
            </main>
            <Footer/>
        </div>
    )
}

export default Usuarios


