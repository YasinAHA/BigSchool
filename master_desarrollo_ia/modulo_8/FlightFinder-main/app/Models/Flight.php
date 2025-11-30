<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Flight extends Model
{
    protected $fillable = [
        'flight_number',
        'origin',
        'destination',
        'departure_date',
        'price',
    ];

    protected $casts = [
        'departure_date' => 'date',
        'price' => 'decimal:2',
    ];
}