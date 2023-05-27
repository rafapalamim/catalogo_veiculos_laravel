<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateVehicleRequest;
use App\Http\Requests\UpdateVehicleRequest;
use App\Http\Resources\CreateVehicleResource;
use App\Http\Resources\FindVehicleResource;
use App\Http\Resources\UpdateVehicleResource;
use App\Models\Vehicle;
use Illuminate\Http\Response;

class VehicleController extends Controller
{

    public function list()
    {

        $vehicles = Vehicle::all();

        return response()->json([
            "data" => FindVehicleResource::collection($vehicles)
        ], Response::HTTP_OK);
    }

    public function find(int $id)
    {
        $vehicle = Vehicle::find($id);

        if (!$vehicle) {
            return response()
                ->json([], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            "data" => new FindVehicleResource($vehicle)
        ], Response::HTTP_OK);
    }

    public function store(CreateVehicleRequest $request)
    {

        $fields = $request->validated();

        $vehicle = new Vehicle($fields);

        if (!$vehicle->save()) {
            return response()->json([
                "error" => "Fail message"
            ], Response::HTTP_BAD_REQUEST);
        }

        return response()->json([
            "data" => [
                "vehicle" => new CreateVehicleResource($vehicle)
            ]
        ], Response::HTTP_CREATED);
    }

    public function update(UpdateVehicleRequest $request, int $id)
    {
        /** @var Vehicle */
        $vehicle = Vehicle::find($id);

        if (!$vehicle) {
            return response()->json([
                "error" => "Veículo não encontrado"
            ], Response::HTTP_NOT_FOUND);
        }

        $validated = $request->validated();

        if (!$validated) {
            return response()->json([
                "error" => "Nenhum atributo foi informado"
            ], Response::HTTP_BAD_REQUEST);
        }

        if (!$vehicle->update($validated)) {
            return response()->json([], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            "data" => [
                "vehicle" => new UpdateVehicleResource($vehicle)
            ]
        ], Response::HTTP_OK);
    }

    public function destroy(int $id)
    {

        /** @var Vehicle */
        $vehicle = Vehicle::find($id);

        if (!$vehicle) {
            return response()->json([
                "error" => "Veículo não encontrado"
            ], Response::HTTP_NOT_FOUND);
        }

        if (!$vehicle->delete()) {
            return response()->json([
                "error" => "Não foi possível remover o veículo"
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->noContent();
    }
}
