<?php

namespace App\Http\Controllers;

use App\Http\Requests\FlightSearchRequest;
use App\Models\Flight;

class FlightController extends Controller
{
    public function showSearchForm()
    {
        return view('flights.search');
    }

    public function search(FlightSearchRequest $request)
    {
        $data = $request->validated();

        $flights = Flight::where('origin', strtoupper($data['origin']))
                         ->where('destination', strtoupper($data['destination']))
                         ->whereDate('departure_date', $data['date'])
                         ->get();

        return view('flights.results', compact('flights'));
    }
}