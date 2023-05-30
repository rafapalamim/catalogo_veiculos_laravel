import { useNavigate } from "react-router-dom";
import axios from "./../api/Axios";
import { createContext, useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ContextType = {
    isLogged: boolean
    setLogin: () => void
}

type AuthenticatedType = {
    children: React.ReactNode
}

export const AuthenticatedContext = createContext({} as ContextType);

export const AuthenticatedProvider = ({ children }: AuthenticatedType) => {

    const navigate = useNavigate();

    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        axios
            .get('/auth/status')
            .then(() => {
                setIsLogged(true);
            })
            .catch(() => {
                setIsLogged(false);
                navigate("/login");
            });
    }, []);

    function setLogin() {
        setIsLogged(true);
        navigate("/painel/veiculos");
    }

    return (
        <AuthenticatedContext.Provider value={{ isLogged, setLogin }}>
            <ToastContainer position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="colored" />
            {children}
        </AuthenticatedContext.Provider>
    )
}