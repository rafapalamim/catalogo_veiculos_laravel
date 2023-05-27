<?php

namespace Tests\Feature\API;

use App\Models\User;
use App\Models\Vehicle;
use Tests\TestCase;
use Tymon\JWTAuth\Facades\JWTAuth;

class DeleteVehicleTest extends TestCase
{
    public function test_should_not_be_able_to_delete_a_vehicle_if_unauthenticated(): void
    {
        $headersApi = [
            "Content-Type" => "application/json",
            "Accept" => "application/json"
        ];

        $response = $this
            ->withHeaders($headersApi)
            ->json(
                'delete',
                '/vehicle/1'
            );

        $response->assertUnauthorized();
    }

    public function test_should_not_be_able_to_delete_a_vehicle_if_not_exists(): void
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
                'delete',
                '/vehicle/10'
            );

        $response->assertNotFound();
    }

    public function test_should_be_able_to_delete_a_vehicle(): void
    {

        Vehicle::factory(1)->create();

        $user = User::factory()->create();

        $headersApi = [
            "Content-Type" => "application/json",
            "Accept" => "application/json",
            "Authorization" => "Bearer " . JWTAuth::fromUser($user)
        ];

        $response = $this
            ->withHeaders($headersApi)
            ->json(
                'delete',
                '/vehicle/1'
            );

        $response->assertNoContent();

        $allVehicle = Vehicle::find(1);
        $this->assertEmpty($allVehicle);
    }
}
