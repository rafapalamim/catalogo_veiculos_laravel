<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Vehicle;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        /**
         * Criado usuário administrador padrão
         */

        $checkIfExists = \App\Models\User::where('email', 'admin@verzel.com')->count();
        if ($checkIfExists <= 0) {
            \App\Models\User::factory()->create([
                'name' => "Administrador Verzel",
                'email' => "admin@verzel.com",
                'email_verified_at' => now(),
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
                'remember_token' => Str::random(10),
            ]);
        }

        Vehicle::factory(10)->create();
    }
}
