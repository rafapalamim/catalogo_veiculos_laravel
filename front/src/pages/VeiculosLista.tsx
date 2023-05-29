import { useEffect, useState } from "react";
import Dashboard from "../templates/Dashboard";
import axios from "./../api/Axios";
import List from "../components/List";
import ListItem from "../components/ListItem";

type VeiculoType = {
    nome: string,
    marca: string,
    modelo: string,
    id: number,
    valor: number,
    foto: string
}

export default function Veiculos() {

    const [veiculos, setVeiculos] = useState<VeiculoType[]>([]);

    useEffect(() => {
        (async () => {
            const { data } = await axios.get("/vehicle");
            setVeiculos(data.data);
        })();
    }, []);

    if (veiculos.length < 1) {
        return (
            <Dashboard pagina="Listagem de veículos">
                <div>Carregando veículos...</div>
            </Dashboard>
        )
    }

    return (
        <Dashboard pagina="Listagem de veículos">
            <List>
                {veiculos.map((veiculo: VeiculoType) => (
                    <ListItem
                        key={veiculo.id}
                        keyItem={veiculo.id}
                        title={veiculo.nome}
                        subtitle="teste"
                        actionButtons={[
                            { name: "Alterar", color: "blue", handleOnClick: () => { console.log('Alterar') } },
                            { name: "Deletar", color: "red", handleOnClick: () => { console.log('Deletar') } }
                        ]}
                    />
                ))}
            </List>
        </Dashboard>
    )

}