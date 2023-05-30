import { PropsWithChildren, useState } from "react";
import { FaSave, FaChevronCircleLeft } from "react-icons/fa";
import axios from "./../../api/Axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type VeiculoProps = {
    nome?: string,
    marca?: string,
    modelo?: string,
    valor?: string,
    foto?: File | string | null,
    id?: number
}

type VeiculoParamProps = {
    veiculo?: VeiculoProps
}

export default function FormVeiculo(props: PropsWithChildren<VeiculoParamProps>) {

    const [data, setData] = useState<VeiculoProps>({});
    const navigate = useNavigate();

    if (Object.hasOwn(props, 'veiculo')) {
        const { veiculo } = props;

        if (!data.id) {
            if (veiculo) setData(veiculo);
        }
    }

    async function save() {
        await axios.post('/vehicle', data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(response => {
                toast.success("Veículo salvo com sucesso");
                navigate(`/painel/veiculos/${response.data.data.vehicle.id}`);
            })
            .catch(error => {
                const errors = Object.values(error.response.data.errors).map((item: any) => {
                    return item[0]
                })
                toast.error(errors.join("\n"));
            });
    }

    async function edit() {
        const { foto, ...putData } = data;
        await axios.put(`/vehicle/${props.veiculo?.id}`, putData)
            .then(() => toast.success("Veículo editado com sucesso"))
            .catch(error => {
                const errors = Object.values(error.response.data.errors).map((item: any) => {
                    return item[0]
                })
                toast.error(errors.join("\n"));
            });

        if (typeof foto !== 'string') {
            await axios
                .post(`/vehicle/photo/${props.veiculo?.id}`, { foto }, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                .then(() => toast.success("Foto do veículo atualizada com sucesso"))
                .catch(error => {
                    const errors = Object.values(error.response.data.errors).map((item: any) => {
                        return item[0]
                    })
                    toast.error(errors.join("\n"));
                });
        }

    }

    const ButtonBack = () => {
        return (
            <button className="btn btn-blue flex flex-row items-center" onClick={() => navigate('/painel/veiculos')}><FaChevronCircleLeft className="me-2" /> Voltar para a listagem</button>
        )
    }

    return (
        <>
            <form
                className="flex flex-col"
                onSubmit={(event) => {
                    event.preventDefault();
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
                    <input className="input-item" type="file" accept="image/*" id="foto" name="foto" onChange={(e) => setData({ ...data, foto: e.target.files?.[0] })} />
                    {data.foto &&
                        <div className="w-80 my-4">
                            <p className="font-bold text-xl">Foto:</p>
                            {typeof data.foto === "string" ?
                                <img src={data.foto as string} />
                                :
                                <img src={URL.createObjectURL(data.foto)} />
                            }
                        </div>
                    }
                </div>

                <div className="flex flex-row justify-end gap-4">
                    <ButtonBack />
                    <button className="btn btn-green flex flex-row items-center">Salvar <FaSave className="ms-4" /></button>
                </div>
            </form>
        </>
    )
}