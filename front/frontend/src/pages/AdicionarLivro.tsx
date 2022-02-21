import Header from '../components/Header'
import Footer from '../components/Footer'
import { Button, TextField } from '@mui/material'
import '../style/Cadastro.css'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import UsuarioContext from '../context/UsuarioContext'

const livroInicio =  {
    nome : '' ,
    autor: "",
    editora: "",
    id_usuario: 0
}

type LivrosType ={
    nome : string ,
    autor: string,
    editora:string,
    id_usuario: number
}

const urlLivro = 'http://127.0.0.1:8000/livros/'



const CadastroLivro = () => {

    const [livro, setlivro] = useState<LivrosType>(livroInicio)
    const [mensagem, setMensagem] = useState('')
    const {state } = useContext(UsuarioContext)
    useEffect(()=> {
        setlivro({...livro, id_usuario: state.id})
    },[])


    function inputChange(e : React.ChangeEvent<HTMLInputElement>) {
        setlivro({...livro  , [e.target.id] : e.target.value})
    }

    function salvar(e : React.FormEvent){
        e.preventDefault()
        const token = localStorage.getItem('token')        
        axios.post(urlLivro, livro ,{
            headers: {
                'Authorization': `Bearer ${token}`
                }
        })
            .then(res => res.data)
            .then(data=> {
                setMensagem("Livro salvo com sucesso!")
                setlivro(livroInicio)
            })
            .catch(e =>{
                const msg =  JSON.stringify( e.response.data )  
                const ms =msg.replaceAll('{', '')
                const m = ms.replaceAll('}', '')
                setMensagem(m)
            }  )
        console.log(livro)
    }

    return(
        <div className='container' >
            <Header pagina='Cadastro Livro' itens={['Meus Dados','Dashboard', "Usuarios", "Livros" ,"Emprestar Livros" , "Devolver Livros", "Logoff"]} usuario={state.first_name}   ></Header>
            <main className='main' >
                <p className='titulo' >Cadastro de livro</p>
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

export default CadastroLivro