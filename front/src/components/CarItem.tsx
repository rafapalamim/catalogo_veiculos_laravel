import React, { PropsWithChildren } from "react"

interface CarItemProps {
    nome: string,
    modelo: string,
    marca: string,
    valor: number,
    foto?: string,
}

const CarItem: React.FC<PropsWithChildren<CarItemProps>> = (props: CarItemProps) => {
    return (
        <div className="w-64 rounded shadow-sm shadow-gray-400 hover:shadow-md hover:shadow-gray-500 cursor-pointer transition-shadow">
            <div>
                <img src={props.foto ?? "https://placehold.co/300x200"} />
            </div>
            <div className="px-4 py-2">
                <div className="font-bold text-black select-none">{props.nome}</div>
                <div className="text-gray-500 select-none">{props.marca} {props.modelo}</div>
                <div className="mt-6 text-xl text-blue-600 font-bold select-none">R$ {props.valor}</div>
            </div>
        </div>
    )
}

export default CarItem