import { PropsWithChildren, useState } from "react";
import { FaSave } from "react-icons/fa";
import axios from "./../../api/Axios";

type VeiculoProps = {
    nome?: string,
    marca?: string,
    modelo?: string,
    valor?: string,
    foto?: string,
    id?: number
}

type VeiculoParamProps = {
    veiculo?: VeiculoProps
}

export default function FormVeiculo(props: PropsWithChildren<VeiculoParamProps>) {

    const [data, setData] = useState<VeiculoProps>({ foto: 'test' });

    if (Object.hasOwn(props, 'veiculo')) {
        const { veiculo } = props;

        if (!data.id) {
            if (veiculo) setData(veiculo);
        }
    }

    async function save() {
        const response = await axios.post('/vehicle', data);
        // Se deu certo, subir foto
        console.log(response);
    }

    async function edit() {
        const response = await axios.put(`/vehicle/${props.veiculo?.id}`, data);
        // Se deu certo, subir foto
        console.log(response);
    }

    return (
        <form
            className="flex flex-col"
            onSubmit={(event) => {
                event.preventDefault();
                console.log(data);
                if (data.id) {
                    edit();
                } else {
                    save();
                }
            }}
        >
            <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input className="input-item" type="text" id="nome" name="nome" defaultValue={data.nome ?? ""} onChange={(e) => setData({ ...data, nome: e.target.value })} />
            </div>

            <div className="form-group">
                <label htmlFor="marca">Marca</label>
                <input className="input-item" type="text" id="marca" name="marca" defaultValue={data.marca ?? ""} onChange={(e) => setData({ ...data, marca: e.target.value })} />
            </div>

            <div className="form-group">
                <label htmlFor="modelo">Modelo</label>
                <input className="input-item" type="text" id="modelo" name="modelo" defaultValue={data.modelo ?? ""} onChange={(e) => setData({ ...data, modelo: e.target.value })} />
            </div>

            <div className="form-group">
                <label htmlFor="valor">Valor</label>
                <input className="input-item" type="text" id="valor" name="valor" defaultValue={data.valor ?? ""} onChange={(e) => setData({ ...data, valor: e.target.value })} />
            </div>

            <div className="form-group">
                <label htmlFor="foto">Foto</label>
                <input className="input-item" type="file" accept="image/*" id="foto" name="foto" />
            </div>

            <div className="flex flex-row justify-end">
                <button className="btn btn-green flex flex-row items-center">Salvar <FaSave className="ms-4" /></button>
            </div>
        </form>
    )
}