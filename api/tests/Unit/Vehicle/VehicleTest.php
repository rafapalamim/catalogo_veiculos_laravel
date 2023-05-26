<?php

namespace Tests\Unit\Vehicle;

use App\Models\Vehicle;
use Tests\TestCase;

class VehicleTest extends TestCase
{
    public function test_create_vehicle_model(): void
    {
        $carro = new Vehicle([
            "nome" => "Gol",
            "marca" => "Volkswagen",
            "modelo" => "Hatch",
            "foto" => '/path/to/image',
            "valor" => 15000
        ]);

        $this->assertEquals([
            "nome" => "Gol",
            "marca" => "Volkswagen",
            "modelo" => "Hatch",
            "foto" => '/path/to/image',
            "valor" => 15000
        ], $carro->toArray());
    }

    public function test_persist_vehicle_in_memo(): void
    {

        $carro = new Vehicle([
            "nome" => "Gol",
            "marca" => "Volkswagen",
            "modelo" => "Hatch",
            "foto" => '/path/to/image',
            "valor" => 15000
        ]);

        $carro->save();

        $this->assertEquals(1, Vehicle::count());

        $persist = Vehicle::find(1);
        $this->assertEquals($carro->toArray(), $persist->toArray());
    }
}
