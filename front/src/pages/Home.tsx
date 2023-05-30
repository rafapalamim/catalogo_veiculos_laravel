import { useEffect, useState } from "react";
import CarItem from "../components/CarItem";
import Site from "../templates/Site";
import axios from "./../api/Axios";

type VeiculoProps = {
    id: number,
    nome: string,
    marca: string,
    modelo: string,
    valor: number,
    foto: string
}

export default function Home() {

    const [veiculos, setVeiculos] = useState<VeiculoProps[] | null>(null);

    useEffect(() => {
        (async () => {
            const response = await axios.get('/vehicle');
            setVeiculos(response.data.data);
        })();
    }, []);

    if (!veiculos || veiculos.length < 1) {
        return (
            <Site>
                <div className="flex flex-row flex-wrap container mx-auto mt-4 items-baseline justify-around gap-4">
                    <p className="text-black">Nenhum veículo cadastrado</p>
                </div>
            </Site>
        )
    }

    return (
        <Site>
            <div className="flex flex-row flex-wrap container mx-auto mt-4 items-baseline justify-around gap-4">
                {veiculos.map((veiculo) => {
                    return <CarItem key={veiculo.id} nome={veiculo.nome} marca={veiculo.marca} modelo={veiculo.modelo} valor={veiculo.valor} foto={veiculo.foto} />
                })}
            </div>
        </Site>
    )
}