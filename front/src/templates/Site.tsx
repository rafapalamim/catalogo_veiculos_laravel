import { PropsWithChildren } from "react";
import Link from "../components/Link";
import { useNavigate } from "react-router-dom";

export default function Site(props: PropsWithChildren) {

    const navigate = useNavigate();

    const className = "px-4 py-2 w-full block hover:bg-gray-100 transition-colors cursor-pointer select-none border-b-2";

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
            <div className="h-screen overflow-hidden">
                <div className="h-auto">
                    <div className="bg-blue-600 py-2 shadow-inner shadow-blue-800">
                        <div className="container mx-auto max-lg:px-4">
                            <input className="w-full rounded px-3 py-3" placeholder="Pesquise por marca, modelo..." />
                        </div>
                    </div>
                    <div className="bg-white">
                        <div className="container mx-auto max-lg:px-4 flex flex-col py-4">
                            <h1 className="font-bold uppercase mb-2">Lista de carros</h1>
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-row gap-4">
                                    <div className="font-bold">Opções de filtro</div>
                                    <div className="text-gray-500">Limpar filtros</div>
                                    <div className="text-gray-500 ms-8">XYZ veículos</div>
                                </div>
                                <div className="flex flex-row gap-4">
                                    <div>Ordenar: <span className="text-blue-600 font-bold">Valor (menor para maior)</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row container mx-auto max-lg:px-4 h-3/4">
                    <div className="w-4/12 overflow-auto">
                        <ul>
                            <li className={className}>Item 1</li>
                            <li className={className}>Item 2</li>
                            <li className={className}>Item 3</li>
                            <li className={className}>Item 4</li>
                            <li className={className}>Item 5</li>
                            <li className={className}>Item 6</li>
                            <li className={className}>Item 7</li>
                            <li className={className}>Item 8</li>
                            <li className={className}>Item 9</li>
                            <li className={className}>Item 10</li>
                            <li className={className}>Item 1</li>
                            <li className={className}>Item 2</li>
                            <li className={className}>Item 3</li>
                            <li className={className}>Item 4</li>
                            <li className={className}>Item 5</li>
                            <li className={className}>Item 6</li>
                            <li className={className}>Item 7</li>
                            <li className={className}>Item 8</li>
                            <li className={className}>Item 9</li>
                            <li className={className}>Item 10</li>
                        </ul>
                    </div>
                    <main className="overflow-y-auto invisible-scrollbar">
                        {props.children}
                    </main>
                </div>
            </div>
            <footer className="flex flex-row bg-gray-950 text-white mt-16">
                <div className="container mx-auto h-96">
                    Footer
                </div>
            </footer>
        </>
    )
}