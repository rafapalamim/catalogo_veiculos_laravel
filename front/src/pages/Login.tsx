import React, { useContext, useState } from "react";
import axios from "../api/Axios";
import { AuthenticatedContext } from "../contexts/AuthenticatedContext";

export default function Login() {

    const auth = useContext(AuthenticatedContext);

    const classInput = "w-full border shadow-sm shadow-gray-400 rounded py-2 px-3";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function login(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const data = {
            email,
            password
        };

        axios
            .post('/auth/login', data)
            .then(() => {
                auth.setLogin();
            })
            .catch(error => {
                console.error('e', error);
            });
    }

    return (
        <div className="w-6/12 max-sm:w-full mx-auto flex flex-row items-center justify-center h-screen">
            <form
                className="w-full flex flex-col items-center justify-center px-4"
                onSubmit={login}
            >
                <h1 className="text-2xl font-bold mb-8">Área restrita</h1>

                <div className="form-group">
                    <label className="w-full" htmlFor="email">E-mail</label>
                    <input className={classInput} type="email" id="email" name="email" onChange={(e) => { setEmail(e.target.value) }} />
                </div>

                <div className="form-group">
                    <label className="w-full" htmlFor="password">Senha</label>
                    <input className={classInput} type="password" id="password" name="password" onChange={(e) => { setPassword(e.target.value) }} />
                </div>

                <button className="bg-blue-700 text-white font-bold w-full py-3 rounded mt-3 hover:bg-blue-800">Entrar</button>
            </form>
        </div>
    )

}