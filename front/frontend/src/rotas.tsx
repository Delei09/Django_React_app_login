import { Route, Routes,  } from "react-router"
import CadastroUsuario from "./pages/CadastroUsuario"
import Livros from "./pages/Livros"
import Login from "./pages/Login"
import Usuarios from "./pages/Usuarios"
import Dashboard from "./pages/Dashboard"
import CadastroLivro from "./pages/AdicionarLivro"
import AtualizarLivro from "./pages/AtualizarLivro"
import EmprestarLivro from "./pages/EmprestarLivro"
import DevolverLivros from "./pages/DevolverLivro"
import MeusDados from "./pages/MeusDados"
import ResetarSenha from "./pages/ResetarSenha"
import UsuarioLivros from "./pages/UsuarioLivros"

const Rotas = () => {
    
    return(
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard /> } />
            <Route path="/cadastrar" element={ <CadastroUsuario />} />
            <Route path="/login" element={<Login /> } />
            <Route path="/usuarios" element={ <Usuarios /> } />
            <Route path="/livros" element={<Livros />} />
            <Route path="/cadastrar/livro" element={<CadastroLivro />} />
            <Route path='/livros/:livro_id' element= {<AtualizarLivro />} />
            <Route path='/emprestar-livro' element= {<EmprestarLivro />} />
            <Route path='/devolver-livro' element= {<DevolverLivros />} />
            <Route path='/meus-dados' element= {<MeusDados />} />
            <Route path='/resetar-senha/' element={<ResetarSenha />} />
            <Route path='/usuario/livros' element={<UsuarioLivros />} />
        </Routes>
    )
}

export default Rotas