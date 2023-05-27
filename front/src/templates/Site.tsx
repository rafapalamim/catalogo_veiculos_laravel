import { PropsWithChildren } from "react";
import Button, { ButtonColors } from "../components/Button";

export default function Site(props: PropsWithChildren) {
    return (
        <main className="container-fluid">
            <header className="w-full bg-white flex flex-row justify-between items-center">
                <div id="logo_area" className="px-4">
                    <a>Logo</a>
                </div>
                <nav id="menu_area" className="flex flex-row">
                    <Button
                        text="Página inicial"
                        color={ButtonColors.WHITE}
                        onClick={(e) => { console.log(e) }}>
                    </Button>
                    <Button
                        text="Área restrita"
                        color={ButtonColors.WHITE}
                        onClick={(e) => { console.log(e) }}>
                    </Button>
                </nav>
            </header>
            <div id="search_bar" className="bg-blue-500 py-4 px-4">
                <input className="w-full h-10 rounded px-2" />
            </div>
            {props.children}
            <footer className="flex flex-row items-center justify-center mt-5 pt-3 border-blue-500 border-t-2">
                Projeto de avaliação - Rafael Palamim
            </footer>
        </main>
    )
}