import Header from '../components/Header'
import Footer from '../components/Footer'
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import '../style/Cadastro.css'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

const usuarioInicio =  {
    first_name : '' ,
    last_name: "",
    email: "",
    telefone: "",
    password:"",
    is_staff: false,
    is_superuser:false
}

type UsuarioType = {
    first_name : string ,
    last_name: string ,
    email: string ,
    telefone: string ,
    password:string ,
    is_staff: boolean,
    is_superuser: boolean
}

const url = 'http://127.0.0.1:8000/cadastro/'


const CadastroUsuario = () => {

    const [usuario, setUsuario] = useState<UsuarioType>(usuarioInicio)
    const [mensagem, setMensagem] = useState('')
    const navigate = useNavigate()

    function inputChange(e : React.ChangeEvent<HTMLInputElement>) {
        setUsuario({...usuario  , [e.target.id] : e.target.value})
    }

    function radioChange(e : React.ChangeEvent<HTMLInputElement>) {
        setUsuario({...usuario  , [e.target.name] : e.target.value})
    }

    function salvar(e : React.FormEvent){
        e.preventDefault()
        axios.post(url, usuario)
            .then(res => res.data)
            .then(data=> {
                setMensagem(data)
                setUsuario(usuarioInicio)
                navigate('/login/')
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
            <Header pagina='Cadastro de Usuario' itens={['Login', "Cadastrar"]}   ></Header>
            <main className='main' >
                <p className='titulo' >Cadastro de Usuario</p>
                <form className='form'   >
                    <TextField id="first_name" label="Primeiro Nome" variant="outlined"  value={usuario.first_name} className='input_cadastro' 
                      onChange={(e : React.ChangeEvent<HTMLInputElement> ) => inputChange(e)}  />
                    <TextField id="last_name" label="Ultimo Nome" variant="outlined" value={usuario.last_name} className='input_cadastro' 
                        onChange={(e : React.ChangeEvent<HTMLInputElement> ) => inputChange(e)}   />
                    <TextField id="email" label="Email" variant="outlined" value={usuario.email} className='input_cadastro'
                        onChange={(e : React.ChangeEvent<HTMLInputElement> ) => inputChange(e)}  />
                    <TextField id="telefone" label="Telefone" variant="outlined" value={usuario.telefone} className='input_cadastro' 
                        onChange={(e : React.ChangeEvent<HTMLInputElement> ) => inputChange(e)}  />
                    <TextField id="password" label="senha" type='password' variant="outlined" value={usuario.password} className='input_cadastro' 
                        onChange={(e : React.ChangeEvent<HTMLInputElement> ) => inputChange(e)}  />
                    <FormControl  className='input_cadastro' >
                        <FormLabel id="demo-controlled-radio-buttons-group">Faz parte da Equipe de administração?</FormLabel>
                        <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="is_staff"
                        value={usuario.is_staff}
                        onChange={ (e : React.ChangeEvent<HTMLInputElement>) => radioChange(e)}
                        >
                        <FormControlLabel value={true} control={<Radio />} label="Sim" />
                        <FormControlLabel value={false}   control={<Radio />} label="Não" />
                        </RadioGroup>Não
                    </FormControl>
                    <FormControl className='input_cadastro' >
                        <FormLabel id="demo-controlled-radio-buttons-group">É um super usuario?</FormLabel>
                        <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="is_superuser"
                        value={usuario.is_superuser}
                        onChange={ (e : React.ChangeEvent<HTMLInputElement>) => radioChange(e)}
                        >
                        <FormControlLabel value={true} control={<Radio />} label="Sim" />
                        <FormControlLabel value={false} control={<Radio />} label="Não" />
                        </RadioGroup>
                    </FormControl>
                    <p className='mensagem' >{mensagem && mensagem}</p>
                    <Button variant="outlined" onClick={ (e : React.FormEvent) => salvar(e)}  >Salvar</Button>
                </form>
            </main>
            <Footer></Footer>
        </div>


    )
}

export default CadastroUsuario