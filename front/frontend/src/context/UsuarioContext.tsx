import React, { createContext, useState } from 'react'

type UsuarioType = {
    email : string,
    first_name: string,
    id: number,
    last_name: string,
    telefone: string
}

type PropsUsuarioContext = {
    state: UsuarioType,
    setState: React.Dispatch<React.SetStateAction<UsuarioType>>
}

const UsuarioInicial = {
    state:{
        id:0,
        first_name:"",
        last_name:"",
        email:"",
        telefone:"",
    },
    setState: () => {}
}

const UsuarioContext = createContext<PropsUsuarioContext>(UsuarioInicial)

const UsuarioContextProvider: React.FC = ( {children} ) => {

    const [ state, setState] = useState(UsuarioInicial.state)
    return (
        <UsuarioContext.Provider
            value={ {state, setState}}>
            {children}
        </UsuarioContext.Provider>
    )
}

export {UsuarioContextProvider}
export default UsuarioContext


