import { useEffect, useState } from "react";
import Dashboard from "../templates/Dashboard";
import axios from "./../api/Axios";
import List from "../components/List";
import ListItem from "../components/ListItem";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type VeiculoType = {
    nome: string,
    marca: string,
    modelo: string,
    id: number,
    valor: number,
    foto: string
}

export default function Veiculos() {

    const [veiculos, setVeiculos] = useState<VeiculoType[] | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const { data } = await axios.get("/vehicle");
            setVeiculos(data.data);
        })();
    }, []);

    if (!veiculos) {
        return (
            <Dashboard pagina="Listagem de veículos">
                <div>Carregando veículos...</div>
            </Dashboard>
        )
    }

    if (veiculos && veiculos.length < 1) {
        return (
            <Dashboard pagina="Listagem de veículos">
                <div className="w-full flex flex-row justify-end my-4">
                    <button
                        className="bg-green-600 hover:bg-green-900 px-4 py-2 text-white rounded transition-colors flex flex-row items-center"
                        onClick={() => { navigate('/painel/veiculos/adicionar') }}
                    >Novo veículo <FaPlus className="ms-4" />
                    </button>
                </div>
                <div>Nenhum veículo cadastrado. Utilize o botão "Novo veículo" para adicionar um registro</div>
            </Dashboard>
        )
    }

    async function removerVeiculo(id: number) {
        if (veiculos) {
            await axios.delete(`vehicle/${id}`).then(() => {
                toast.success(`Veículo ${id} removido com sucesso`);
                setVeiculos(veiculos.filter((veiculo: VeiculoType) => {
                    return veiculo.id != id;
                }));
            })
                .catch(() => {
                    toast.error(`Não foi possível remover o veículo ${id}`);
                });
        }
    }

    return (
        <Dashboard pagina="Listagem de veículos">
            <div className="w-full flex flex-row justify-end my-4">
                <button
                    className="bg-green-600 hover:bg-green-900 px-4 py-2 text-white rounded transition-colors flex flex-row items-center"
                    onClick={() => { navigate('/painel/veiculos/adicionar') }}
                >Novo veículo <FaPlus className="ms-4" />
                </button>
            </div>
            <List>
                {veiculos.map((veiculo: VeiculoType) => (
                    <ListItem
                        key={veiculo.id}
                        keyItem={veiculo.id}
                        title={veiculo.nome}
                        subtitle="teste"
                        actionButtons={[
                            { name: "Alterar", style: "btn btn-xs btn-blue", handleOnClick: () => { navigate(`/painel/veiculos/${veiculo.id}`) } },
                            { name: "Deletar", style: "btn btn-xs btn-red", handleOnClick: () => { removerVeiculo(veiculo.id) } }
                        ]}
                    />
                ))}
            </List>
        </Dashboard>
    )

}