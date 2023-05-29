import { useParams } from "react-router-dom";
import Dashboard from "../templates/Dashboard";
import FormVeiculo from "../components/forms/FormVeiculo";
import { useEffect, useState } from "react";
import axios from "./../api/Axios";

export default function VeiculosEditar() {
    const { id } = useParams();

    const [veiculo, setVeiculo] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await axios.get(`/vehicle/${id}`);
            setVeiculo(response.data.data);
        })();
    }, []);

    if (!veiculo) {
        return (
            <Dashboard pagina={`Editar veículo #${id}`}>
                <p>Carregando dados...</p>
            </Dashboard>
        );
    }

    return (
        <Dashboard pagina={`Editar veículo #${id}`}>
            <div className="bg-white px-4 py-4 rounded">
                <FormVeiculo veiculo={veiculo} />
            </div>
        </Dashboard>
    )
}