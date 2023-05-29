import CarItem from "../components/CarItem";
import Site from "../templates/Site";

export default function Home() {
    return (
        <Site>
            <div className="flex flex-row gap-4 container mx-auto mt-4">
                <CarItem nome="Gol" marca="Marca" modelo="Modelo" valor={100} />
                <CarItem nome="Gol" marca="Marca" modelo="Modelo" valor={100} />
                <CarItem nome="Gol" marca="Marca" modelo="Modelo" valor={100} />
                <CarItem nome="Gol" marca="Marca" modelo="Modelo" valor={100} />
            </div>
        </Site>
    )
}