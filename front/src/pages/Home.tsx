import { useEffect, useState } from "react";
import CarItem from "../components/CarItem";
import Site from "../templates/Site";
import axios from "./../api/Axios";

export default function Home() {

    const [veiculos, setVeiculos] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await axios.get('/vehicle');
            setVeiculos(response.data.data);
        })();
    }, []);

    return (
        <Site>
            <div className="flex flex-row gap-4 container mx-auto mt-4">
                {veiculos.map((veiculo) => {
                    return <CarItem key={veiculo.id} nome={veiculo.nome} marca={veiculo.marca} modelo={veiculo.model} valor={veiculo.valor} />
                })}
            </div>
        </Site>
    )
}