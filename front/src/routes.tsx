import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Site from './templates/Site'


export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Site><Home /></Site>}></Route>
                <Route path="/login" Component={() => <h1>login</h1>}></Route>
            </Routes>
        </BrowserRouter>
    )
}