import FormVeiculo from "../components/forms/FormVeiculo";
import Dashboard from "../templates/Dashboard";

export default function VeiculosAdicionar() {
    return (
        <Dashboard pagina="Adicionar veículo">
            <div className="bg-white px-4 py-4 rounded">
                <FormVeiculo />
            </div>
        </Dashboard>
    )
}