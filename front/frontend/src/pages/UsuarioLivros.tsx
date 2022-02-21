import Header from '../components/Header'
import Footer from '../components/Footer'
import UsuarioContext from '../context/UsuarioContext';

import {  useContext, useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate }  from 'react-router';
import {LivrosType} from '../pages/Livros'
import '../style/dashboard.css'
import '../style/Cadastro.css'

type livroProps = {
    id: string,
    first_name: string,
    last_name:string,
    email:string,
    livros: [LivrosType],
    livros_emprestados: [string]
}



const UsuarioLivros = () => {

    const navigate = useNavigate()
    const { state  } = useContext(UsuarioContext)
    const [livro, setLivro] = useState<[livroProps]>()


    useEffect(() => {   
        const token = localStorage.getItem('token')
        axios.get('http://127.0.0.1:8000/usuario/livros-emprestados/', {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            console.log(res.data.results)
            setLivro(res.data.results)
        })
        .catch(e => {
            navigate('/login')
        })
           
    },[navigate])

    return(
        <div className='container' >
            <Header pagina='Usuario Livros' itens={['Meus Dados','Dashboard', "Usuarios", "Livros", "Usuario-Livros" ,"Emprestar Livros" , "Devolver Livros", "Logoff"]} usuario={state.first_name}   ></Header>
            <p className='titulo' >Usuario Livros</p>
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
                        {/* <p className="card-text"> Livros: {livro?.map((l ) => {
                            return(
                                l.livros.map( x => {
                                    <ul>
                                        <li>{x.id}</li>
                                        <li>{x.nome}</li>
                                        <li>{x.autor}</li>
                                        <li>{x.editora}</li>
                                        <li>{x.id_usuario}</li>
                                        <li>{x.livro_emprestado}</li>
                                        <li>{x.id}</li>
                                    </ul>
                                } )
                            )

                        })} </p> */}
                        <p className="card-text"> Livros Emprestados: {state.telefone} </p>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    )
}

export default UsuarioLivros