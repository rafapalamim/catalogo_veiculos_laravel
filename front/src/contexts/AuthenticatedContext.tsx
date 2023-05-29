import { useNavigate } from "react-router-dom";
import axios from "./../api/Axios";
import { createContext, useEffect, useState } from "react";

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
                navigate("/painel");
            })
            .catch(() => {
                setIsLogged(false);
                navigate("/login");
            });
    }, []);

    function setLogin() {
        setIsLogged(true);
        navigate("/painel");
    }

    return (
        <AuthenticatedContext.Provider value={{ isLogged, setLogin }}>
            {children}
        </AuthenticatedContext.Provider>
    )
}