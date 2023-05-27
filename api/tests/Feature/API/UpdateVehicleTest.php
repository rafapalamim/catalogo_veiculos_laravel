<?php

namespace Tests\Feature\API;

use App\Http\Resources\FindVehicleResource;
use App\Models\User;
use App\Models\Vehicle;
use Tests\TestCase;
use Tymon\JWTAuth\Facades\JWTAuth;

class UpdateVehicleTest extends TestCase
{

    public function test_should_not_be_able_to_update_a_vehicle_if_unauthenticated(): void
    {
        $headersApi = [
            "Content-Type" => "application/json",
            "Accept" => "application/json"
        ];

        $response = $this
            ->withHeaders($headersApi)
            ->json(
                'put',
                '/vehicle/1',
                [
                    "nome" => "Gol 1.0",
                    "marca" => "Volkswagen",
                    "modelo" => "Gol",
                    "foto" => "wea",
                    "valor" => 1000
                ]
            );

        $response->assertUnauthorized();
    }

    public function test_should_not_be_able_to_update_a_vehicle_with_no_data(): void
    {

        $user = User::factory()->create();

        Vehicle::factory(1)->create();

        $headersApi = [
            "Content-Type" => "application/json",
            "Accept" => "application/json",
            "Authorization" => "Bearer " . JWTAuth::fromUser($user)
        ];

        $dataUpdate = [];

        $response = $this
            ->withHeaders($headersApi)
            ->json(
                'put',
                '/vehicle/1',
                $dataUpdate
            );

        $response->assertBadRequest();
    }

    public function test_should_not_be_able_to_update_a_vehicle_when_not_exists(): void
    {

        $user = User::factory()->create();

        $headersApi = [
            "Content-Type" => "application/json",
            "Accept" => "application/json",
            "Authorization" => "Bearer " . JWTAuth::fromUser($user)
        ];

        $dataUpdate = [
            "valor" => 1
        ];

        $response = $this
            ->withHeaders($headersApi)
            ->json(
                'put',
                '/vehicle/10',
                $dataUpdate
            );

        $response->assertNotFound();
    }

    public function test_should_not_be_able_to_update_a_vehicle_with_empty_field(): void
    {

        $user = User::factory()->create();

        Vehicle::factory(1)->create();

        $headersApi = [
            "Content-Type" => "application/json",
            "Accept" => "application/json",
            "Authorization" => "Bearer " . JWTAuth::fromUser($user)
        ];

        $dataUpdate = [
            "nome" => ""
        ];

        $response = $this
            ->withHeaders($headersApi)
            ->json(
                'put',
                '/vehicle/1',
                $dataUpdate
            );

        $response->assertUnprocessable();
    }

    public function test_should_be_able_to_update_a_vehicle(): void
    {

        $user = User::factory()->create();

        Vehicle::factory(1)->create();

        $vehicle = new FindVehicleResource(Vehicle::find(1));

        $headersApi = [
            "Content-Type" => "application/json",
            "Accept" => "application/json",
            "Authorization" => "Bearer " . JWTAuth::fromUser($user)
        ];

        $dataUpdate = [
            "valor" => 10000
        ];

        $vehicle = $vehicle->resolve();

        $vehicle['valor'] = 10000;

        $response = $this
            ->withHeaders($headersApi)
            ->json(
                'put',
                '/vehicle/1',
                $dataUpdate
            );

        $response->assertOk();
        $response->assertJson([
            "data" => [
                "vehicle" => $vehicle
            ]
        ]);
    }
}
