<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateVehicleRequest;
use App\Http\Requests\UpdateVehicleRequest;
use App\Http\Requests\VehiclePhotoRequest;
use App\Http\Resources\CreateVehicleResource;
use App\Http\Resources\FindVehicleResource;
use App\Http\Resources\UpdateVehicleResource;
use App\Models\Vehicle;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;

class VehicleController extends Controller
{

    public function list()
    {

        $vehicles = Vehicle::orderBy('valor', 'ASC')->get();

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

        $file = $this->uploadPhoto($request);

        $fields['foto'] = $file;

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

        $validated = $request->validated();

        if (!$validated) {
            return response()->json([
                "error" => "Nenhum atributo foi informado"
            ], Response::HTTP_BAD_REQUEST);
        }

        /** @var Vehicle */
        $vehicle = Vehicle::find($id);

        if (!$vehicle) {
            return response()->json([
                "error" => "Veículo não encontrado"
            ], Response::HTTP_NOT_FOUND);
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

    public function newPhoto(VehiclePhotoRequest $request, int $id)
    {

        $validated = $request->validated();

        if (!$validated) {
            return response()->json([
                "error" => "Nenhum atributo foi informado"
            ], Response::HTTP_BAD_REQUEST);
        }

        /** @var Vehicle */
        $vehicle = Vehicle::find($id);

        if (!$vehicle) {
            return response()->json([
                "error" => "Veículo não encontrado"
            ], Response::HTTP_NOT_FOUND);
        }

        $newPhoto = $this->uploadPhoto($request);
        $validated['foto'] = $newPhoto;

        $this->deletePhoto($vehicle->getRawOriginal('foto'));

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

        $this->deletePhoto($vehicle->getRawOriginal('foto'));

        if (!$vehicle->delete()) {
            return response()->json([
                "error" => "Não foi possível remover o veículo"
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->noContent();
    }

    private function uploadPhoto(Request $request): string
    {
        $file = $request->file('foto');
        $fileName = $file->hashName();
        $file->move("upload", $fileName);

        return $fileName;
    }

    private function deletePhoto(string $file): void
    {
        $oldPath = public_path("upload/" . $file);
        if (File::exists($oldPath) && $file != 'default.jpg') {
            File::delete($oldPath);
        }
    }
}
