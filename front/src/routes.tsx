import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import { AuthenticatedProvider } from './contexts/AuthenticatedContext'
import VeiculosLista from './pages/VeiculosLista'
import VeiculosAdicionar from './pages/VeiculosAdicionar'
import VeiculosEditar from './pages/VeiculosEditar'


export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<AuthenticatedProvider><Login /></AuthenticatedProvider>}></Route>
                <Route path="/painel/veiculos" element={<AuthenticatedProvider><VeiculosLista /></AuthenticatedProvider>}></Route>
                <Route path="/painel/veiculos/:id" element={<AuthenticatedProvider><VeiculosEditar /></AuthenticatedProvider>}></Route>
                <Route path="/painel/veiculos/adicionar" element={<AuthenticatedProvider><VeiculosAdicionar /></AuthenticatedProvider>}></Route>
            </Routes>
        </BrowserRouter>
    )
}