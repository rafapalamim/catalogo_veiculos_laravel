<?php

namespace Tests\Feature\API;

use App\Models\User;
use Tests\TestCase;
use Tymon\JWTAuth\Facades\JWTAuth;

class FindVehicleTest extends TestCase
{

    public function test_should_be_able_to_find_a_vehicle_by_id(): void
    {

        $user = User::factory()->create();

        $headersApi = [
            "Content-Type" => "application/json",
            "Accept" => "application/json",
            "Authorization" => "Bearer " . JWTAuth::fromUser($user)
        ];

        $headersGuest = [
            "Content-Type" => "application/json",
            "Accept" => "application/json"
        ];

        $this
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

        $response = $this
            ->withHeaders($headersGuest)
            ->json(
                'get',
                '/vehicle/1'
            );

        $response->assertOk();
        $response->assertJson([
            "data" => [
                "id" => 1,
                "nome" => "Gol 1.0 Ano 2000",
                "marca" => "Volkswagen",
                "modelo" => "Gol",
                "foto" => "wea",
                "valor" => 15000
            ]
        ]);
    }

    public function test_should_not_be_able_to_find_a_vehicle_with_inexistent_id(): void
    {

        $headersGuest = [
            "Content-Type" => "application/json",
            "Accept" => "application/json"
        ];

        $response = $this
            ->withHeaders($headersGuest)
            ->json(
                'get',
                '/vehicle/1'
            );

        $response->assertNotFound();
    }
}
