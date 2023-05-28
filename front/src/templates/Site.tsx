import { PropsWithChildren } from "react";
import Link from "../components/Link";
import { useNavigate } from "react-router-dom";

export default function Site(props: PropsWithChildren) {

    const navigate = useNavigate();

    return (
        <>
            <header className="container flex flex-row items-center justify-between mx-auto h-20 max-lg:px-4">
                <div>
                    <h1 className="text-4xl select-none">Logo</h1>
                </div>
                <nav className="flex flex-row gap-8">
                    <Link text="Página inicial" onClick={() => console.log('test')} className="cursor-not-allowed select-none text-gray-400" />
                    <Link text="Vender carro" onClick={() => console.log('test')} className="cursor-not-allowed select-none text-gray-400" />
                    <Link text="App veículos" onClick={() => console.log('test')} className="cursor-not-allowed select-none text-gray-400" />
                    <Link text="Sobre nós" onClick={() => console.log('test')} className="cursor-not-allowed select-none text-gray-400 me-8" />
                    <Link text="Acesso restrito" onClick={() => navigate('/login')} className="cursor-pointer select-none text-gray-600 hover:text-gray-900" />
                </nav>
            </header>
            <div className="bg-blue-600 py-2 shadow-inner shadow-blue-800">
                <div className="container mx-auto max-lg:px-4">
                    <input className="w-full rounded px-3 py-3" placeholder="Pesquise por marca, modelo..." />
                </div>
            </div>
            <main className="container mx-auto max-lg:px-4">
                {props.children}
            </main>
            <footer className="flex flex-row bg-gray-950 text-white mt-4">
                <div className="container mx-auto">
                    Footer
                </div>
            </footer>
        </>
    )
}