<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Resultados de la Búsqueda') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">

                    @if($flights->isEmpty())
                        <p class="text-gray-600">No hay vuelos disponibles para los criterios seleccionados.</p>
                    @else
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vuelo</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Origen</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Destino</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio (USD)</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                @foreach($flights as $flight)
                                    <tr>
                                        <td class="px-6 py-4 whitespace-nowrap">{{ $flight->flight_number }}</td>
                                        <td class="px-6 py-4 whitespace-nowrap">{{ $flight->origin }}</td>
                                        <td class="px-6 py-4 whitespace-nowrap">{{ $flight->destination }}</td>
                                        <td class="px-6 py-4 whitespace-nowrap">{{ $flight->departure_date->format('d/m/Y') }}</td>
                                        <td class="px-6 py-4 whitespace-nowrap">${{ number_format($flight->price, 2) }}</td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    @endif

                    <div class="mt-6">
                        <a href="{{ route('flights.search.form') }}" class="text-blue-600 hover:underline">
                            ← Nueva búsqueda
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>