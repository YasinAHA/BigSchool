<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;

class BookingController extends Controller
{
    public function index()
    {
        // ⚠️ Solo las reservas del usuario autenticado
        $bookings = auth()->user()->bookings;

        return view('bookings.index', compact('bookings'));
    }
}