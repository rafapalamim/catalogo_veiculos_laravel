import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Site from './templates/Site'
import Login from './pages/Login'


export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Site><Home /></Site>}></Route>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
        </BrowserRouter>
    )
}