<?php

namespace Database\Seeders;

use App\Models\Flight;
use Illuminate\Database\Seeder;

class FlightSeeder extends Seeder
{
    public function run(): void
    {
        Flight::insert([
            ['flight_number' => 'AV123', 'origin' => 'MAD', 'destination' => 'LAX', 'departure_date' => '2025-12-10', 'price' => 450.00],
            ['flight_number' => 'IB456', 'origin' => 'MAD', 'destination' => 'JFK', 'departure_date' => '2025-12-10', 'price' => 520.00],
            ['flight_number' => 'LA789', 'origin' => 'LAX', 'destination' => 'MAD', 'departure_date' => '2025-12-15', 'price' => 480.00],
        ]);
    }
}
