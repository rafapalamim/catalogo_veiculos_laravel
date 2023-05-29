import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import { AuthenticatedProvider } from './contexts/AuthenticatedContext'
import Painel from './pages/Painel'
import VeiculosLista from './pages/VeiculosLista'


export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<AuthenticatedProvider><Login /></AuthenticatedProvider>}></Route>
                <Route path="/painel" element={<AuthenticatedProvider><Painel /></AuthenticatedProvider>}></Route>
                <Route path="/veiculos" element={<AuthenticatedProvider><VeiculosLista /></AuthenticatedProvider>}></Route>
            </Routes>
        </BrowserRouter>
    )
}