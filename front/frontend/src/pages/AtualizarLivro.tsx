import Header from '../components/Header'
import Footer from '../components/Footer'
import { Button, TextField } from '@mui/material'
import '../style/Cadastro.css'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router'
import UsuarioContext from '../context/UsuarioContext'

const livroInicio =  {
    nome : '' ,
    autor: "",
    editora: "",
}

type LivrosType ={
    nome : string ,
    autor: string,
    editora:string,
}

const url = 'http://127.0.0.1:8000/verificar/'

type livrosProps = {
    
}


const AtualizarLivro : React.FC<livrosProps> = ({ children}) => {

    const [livro, setlivro] = useState<LivrosType>(livroInicio)
    const [mensagem, setMensagem] = useState('')
    const navigate = useNavigate()
    const params = useParams()
    const {state} = useContext(UsuarioContext)

    useEffect(() => {   
        const id_livro = params.livro_id
        const urlLivro = `http://127.0.0.1:8000/livros/${id_livro}`
        const token = localStorage.getItem('token')

        axios.get(url,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        .catch(e => {
                navigate('/login')
        })

        axios.get(urlLivro, {
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        })
        .then(res => res.data)
        .then(data => setlivro({...livro, 
            autor : data.autor,
            nome: data.nome,
            editora: data.editora
        } ))
        .catch(e => {
            // navigate('/login')
            console.log(e)
        })
    },[navigate])

    function inputChange(e : React.ChangeEvent<HTMLInputElement>) {
        setlivro({...livro  , [e.target.id] : e.target.value})
    }

    function salvar(e : React.FormEvent){
        e.preventDefault()
        const token = localStorage.getItem('token')
        const id_livro = params.livro_id
        const urlLivro = `http://127.0.0.1:8000/livros/${id_livro}/`
        axios.patch(urlLivro, livro ,{
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        })
            .then(res => res.data)
            .then(data=> {
                setMensagem("Livro alterado com sucesso!")
                setlivro(livroInicio)
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
            <Header pagina='Atualizar Livro' itens={['Meus Dados','Dashboard', "Usuarios", "Livros" ,"Emprestar Livros" , "Devolver Livros", "Logoff"]} usuario={state.first_name}   ></Header>
            <main className='main' >
                <p className='titulo' >Atualizar livro</p>
                <form className='form'   >
                    <TextField id="nome" label="Nome" variant="outlined"  value={livro.nome} className='input_cadastro' 
                      onChange={(e : React.ChangeEvent<HTMLInputElement> ) => inputChange(e)}  />
                    <TextField id="autor" label="Autor" variant="outlined" value={livro.autor} className='input_cadastro' 
                        onChange={(e : React.ChangeEvent<HTMLInputElement> ) => inputChange(e)}   />
                    <TextField id="editora" label="Editora" variant="outlined" value={livro.editora} className='input_cadastro'
                        onChange={(e : React.ChangeEvent<HTMLInputElement> ) => inputChange(e)}  />
                    <p className='mensagem' >{mensagem && mensagem}</p>
                    <Button variant="outlined" onClick={ (e : React.FormEvent) => salvar(e)}  >Salvar</Button>
                </form>
            </main>
            <Footer></Footer>
        </div>
    )
}

export default AtualizarLivro