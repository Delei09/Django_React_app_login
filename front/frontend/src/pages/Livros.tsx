import Header from '../components/Header'
import Footer from '../components/Footer'

import LayersIcon from '@mui/icons-material/Layers';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import '../style/dashboard.css'
import '../style/Cadastro.css'
import React, { useContext, useEffect, useState } from 'react';
import UsuarioContext from '../context/UsuarioContext';
import { useNavigate } from 'react-router';
import axios from 'axios';


export type LivrosType = {
    id  : string,
    nome: string,
    autor: string,
    editora: string,
    livro_emprestado: boolean,
    id_usuario: number,
    id_usuario_emprestado: boolean
  }
  const livroInicio =  {
    id  : '',
    nome: '',
    autor: '',
    editora: '',
    livro_emprestado: false,
    id_usuario: 1,
    id_usuario_emprestado: false
  }

const Livros = () => {

    const url = 'http://127.0.0.1:8000/verificar/'
    const {state} = useContext(UsuarioContext)
    const navigate = useNavigate()
    const [livros, setlivros] = useState<[LivrosType]>([livroInicio])
    const [anterior, setAnterior] = useState('')
    const [proximo, setProximo] = useState('')
    const [open, setOpen] = useState(false);
    const [idLivro , setIdLivro ] = useState('')
    const [alterou, setAlterou] = useState(0)
    const [urlLivro, setUrlLivro] = useState('http://127.0.0.1:8000/livros/')

  

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

        axios.get(urlLivro, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.data)
        .then(data => {
            setlivros(data.results)
            if(data.next){
                setProximo(data.next)
            }
            if(data.previous){
                setAnterior(data.previous)
            }
        })
        .catch(e => {
            axios.get('http://127.0.0.1:8000/livros/', {
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => res.data)
            .then(data => {
                setlivros(data.results)
                if(data.next){
                    setProximo(data.next)
                }
                if(data.previous){
                    setAnterior(data.previous)
                }
            })
        })
    },[alterou, navigate, urlLivro])

    function paginacao(pagina : string){
        const token = localStorage.getItem('token')
        if(pagina === 'anterior'){
            setUrlLivro(anterior)
            axios.get(anterior, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => res.data)
            .then(data => {
                setlivros(data.results)
                if(data.next){
                    setProximo(data.next)
                    setUrlLivro(data.previous)
                }
                if(data.previous){
                    setAnterior(data.previous)
                    setUrlLivro(data.next)
                }
            })}

        if(pagina === 'proximo'){
            setUrlLivro(proximo)
            axios.get(proximo, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => res.data)
            .then(data => {
                setlivros(data.results)
                if(data.next){
                    setProximo(data.next)
                   
                }
                if(data.previous){
                    setAnterior(data.previous)
                }
            })}
    }

    const handleClickOpen = (id : string) => {
        setOpen(true);
      };
    
      const handleClose = (opcao : boolean) => {
          if(opcao){
            const token = localStorage.getItem('token')
            const urlExcluir = `http://127.0.0.1:8000/livros/${idLivro}/`
            console.log(urlExcluir)
            axios.delete(urlExcluir, {
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res =>  setAlterou(alterou + 1) )
            .catch(e => console.log(e))

          }
        setOpen(false);
      };

    return(
        <div className='container' >
            <Header pagina='Livros' itens={['Meus Dados','Dashboard', "Usuarios", "Livros" ,"Emprestar Livros" , "Devolver Livros", "Logoff"]} usuario={state.first_name}   ></Header>
            <p className='titulo' >Livros <LayersIcon className='icone'  /> </p>
            <main className='main , dashboard' >
                <Button variant="outlined" onClick = {e => navigate('/cadastrar/livro')}  > Adicionar Livro <AddBoxIcon /> </Button>
            <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Autor</th>
                            <th scope="col">Editora</th>
                            <th scope="col">Emprestado</th>
                            <th scope="col">Dono</th>
                            <th scope="col">id_emprestado</th>
                            <th scope="col">Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {livros.map((livro, index) => {
                            return(
                                <tr key={index} >
                                    <th scope="row">{index + 1}</th>
                                    <td>{livro.id}</td>
                                    <td>{livro.nome}</td>
                                    <td>{livro.autor}</td>
                                    <td>{livro.editora}</td>
                                    <td>{livro.livro_emprestado ? 'Sim' : "Não"}</td>
                                    <td>{livro.id_usuario}</td>
                                    <td>{livro.id_usuario_emprestado ? livro.id_usuario_emprestado : "X" }</td>
                                    <td>
                                        <BorderColorIcon className='opcao'  id={livro.id} onClick={  (e : React.MouseEvent) => { 
                                                navigate(`/livros/${e.currentTarget.id}`)
                                        } } />
                                        <div>
                                            <AutoDeleteIcon className='opcao' id={livro.id}  onClick={ (e : React.MouseEvent) => {
                                                setIdLivro(e.currentTarget.id)
                                               handleClickOpen(e.currentTarget.id)
                                            } }/>
                                            <Dialog
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                            >
                                                <DialogTitle id="alert-dialog-title">
                                                     {`Tem certeza que deseja excluir o livro ${idLivro}`}
                                                </DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                      Voce ira excluir todo o historico do livro
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={e => handleClose(false)}>Cancelar</Button>
                                                    <Button onClick={e => handleClose(true)} autoFocus>
                                                        Excluir
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </div>
                                      </td>
                                </tr>
                            )
                        })}
                    </tbody>
                    </table>

                    <nav className='paginacao' aria-label="">
                        <ul className="  ">
                            <li >
                                <Button  variant="outlined" onClick={ e => paginacao('anterior')}  >Anterior</Button>
                            </li>
                            <li >
                                <Button  variant="outlined" onClick={ e => paginacao('proximo')}   >Proxima</Button>
                            </li>
                        </ul>
                    </nav>
            </main>
            <Footer/>
        </div>
    )
}

export default Livros





   

