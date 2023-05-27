<?php

namespace Tests\Feature\API;

use App\Models\Vehicle;
use Tests\TestCase;

class ListVehiclesTest extends TestCase
{

    public function test_list_all_vehicles(): void
    {

        Vehicle::factory(3)->create();

        $headersGuest = [
            "Content-Type" => "application/json",
            "Accept" => "application/json"
        ];

        $response = $this
            ->withHeaders($headersGuest)
            ->json(
                'get',
                '/vehicle'
            );

        $response->assertOk();
        $this->assertEquals(3, Vehicle::all()->count());
    }

    public function test_list_with_zero_vehicles(): void
    {

        $headersGuest = [
            "Content-Type" => "application/json",
            "Accept" => "application/json"
        ];

        $response = $this
            ->withHeaders($headersGuest)
            ->json(
                'get',
                '/vehicle'
            );

        $response->assertOk();
        $this->assertEquals(0, Vehicle::all()->count());
    }
}
