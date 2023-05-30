<?php

namespace Database\Factories;

use Faker\Factory as FakerFactory;
use Faker\Provider\Fakecar;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vehicle>
 */
class VehicleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $faker = FakerFactory::create();
        $faker->addProvider(new Fakecar($faker));

        return [
            'nome' => $faker->vehicle,
            'marca' => $faker->vehicleBrand,
            'modelo' => $faker->vehicleModel,
            'foto' => 'default.jpg',
            'valor' => $faker->numerify("#####.##")
        ];
    }
}
