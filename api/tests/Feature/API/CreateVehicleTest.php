<?php

namespace Tests\Feature\API;

use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;
use Tymon\JWTAuth\Facades\JWTAuth;

class CreateVehicleTest extends TestCase
{

    public function test_should_not_be_able_to_create_a_vehicle_if_unauthenticated(): void
    {
        $headersApi = [
            "Content-Type" => "application/json",
            "Accept" => "application/json"
        ];

        $response = $this
            ->withHeaders($headersApi)
            ->json(
                'post',
                '/vehicle',
                [
                    "nome" => "Gol 1.0",
                    "marca" => "Volkswagen",
                    "modelo" => "Gol",
                    "foto" => "wea",
                    "valor" => 100
                ]
            );

        $response->assertUnauthorized();
    }

    public function test_should_not_be_able_to_create_a_vehicle_if_price_equals_zero(): void
    {

        $user = User::factory()->create();

        $headersApi = [
            "Content-Type" => "application/json",
            "Accept" => "application/json",
            "Authorization" => "Bearer " . JWTAuth::fromUser($user)
        ];

        $response = $this
            ->withHeaders($headersApi)
            ->json(
                'post',
                '/vehicle',
                [
                    "nome" => "Gol 1.0",
                    "marca" => "Volkswagen",
                    "modelo" => "Gol",
                    "foto" => "wea",
                    "valor" => 0
                ]
            );

        $response->assertUnprocessable();
    }

    public function test_should_not_be_able_to_create_a_vehicle_with_empty_attributes(): void
    {

        $user = User::factory()->create();

        $headersApi = [
            "Content-Type" => "application/json",
            "Accept" => "application/json",
            "Authorization" => "Bearer " . JWTAuth::fromUser($user)
        ];

        $response = $this
            ->withHeaders($headersApi)
            ->json(
                'post',
                '/vehicle',
                [
                    "nome" => "",
                    "marca" => "",
                    "modelo" => "Gol",
                    "foto" => "wea",
                    "valor" => 1
                ]
            );

        $response->assertUnprocessable();
        $response->assertJson(function (AssertableJson $json) {
            $json
                ->has("message")
                ->has("errors", 2)
                ->whereAllType(["errors.nome" => "array", "errors.marca" => "array"]);
        });
    }

    public function test_should_be_able_to_create_a_vehicle(): void
    {

        $user = User::factory()->create();

        $headersApi = [
            "Content-Type" => "application/json",
            "Accept" => "application/json",
            "Authorization" => "Bearer " . JWTAuth::fromUser($user)
        ];

        $response = $this
            ->withHeaders($headersApi)
            ->json(
                'post',
                '/vehicle',
                [
                    "nome" => "Gol 1.0 Ano 2000",
                    "marca" => "Volkswagen",
                    "modelo" => "Gol",
                    "foto" => "wea",
                    "valor" => 15000
                ]
            );

        $response->assertCreated();
        $response->assertJson([
            "data" => [
                "vehicle" => [
                    "id" => 1
                ]
            ]
        ]);
    }

    public function test_vehicle_factory(): void
    {
        Vehicle::factory(10)->create();
        $list = Vehicle::all();
        $this->assertEquals(10, $list->count());
    }
}
