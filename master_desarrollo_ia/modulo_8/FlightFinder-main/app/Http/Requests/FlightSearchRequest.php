<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FlightSearchRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'origin' => ['required', 'alpha', 'size:3'],
            'destination' => ['required', 'alpha', 'size:3', 'different:origin'],
            'date' => ['required', 'date', 'after_or_equal:today'],
        ];
    }

    public function attributes(): array
    {
        return [
            'origin' => 'origen',
            'destination' => 'destino',
            'date' => 'fecha de salida',
        ];
    }
}