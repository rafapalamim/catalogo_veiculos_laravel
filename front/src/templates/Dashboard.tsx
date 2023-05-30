import { PropsWithChildren } from "react";
import Link from "../components/Link";
import { useNavigate } from "react-router-dom";

type DashboardType = {
    pagina: string
}

export default function Dashboard(props: PropsWithChildren<DashboardType>) {

    const navigate = useNavigate();

    return (
        <div className="flex flex-row h-full">

            <aside className="bg-gray-950 h-full w-52 flex flex-col items-center justify-start">
                <div className="py-8 border-b-2 border-gray-800 w-full text-center">
                    <h1 className="text-4xl select-none text-white">Logo</h1>
                </div>
                <Link text="Exibir site" className="cursor-pointer select-none text-white hover:bg-blue-600 px-2 py-3 transition-colors w-full" onClick={() => { navigate("/") }} />
                <Link text="Veículos" className="cursor-pointer select-none text-white hover:bg-blue-600 px-2 py-3 transition-colors w-full" onClick={() => { navigate("/painel/veiculos") }} />

            </aside>

            <div className="bg-gray-100 w-full h-full px-4 overflow-auto">

                <header className="flex flex-row items-center w-full my-3 bg-white rounded shadow-sm px-4 py-2">
                    <nav className="flex flex-row justify-between items-center w-full">
                        <div>{props.pagina}</div>
                    </nav>
                </header>

                <main>
                    {props.children}
                </main>

            </div>
        </div>
    )
}