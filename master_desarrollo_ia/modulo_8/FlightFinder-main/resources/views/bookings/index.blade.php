<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Mis Reservas') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">

                    @if($bookings->isEmpty())
                        <p class="text-gray-600">No tienes reservas aún.</p>
                    @else
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vuelo</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Salida</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                @foreach($bookings as $booking)
                                    <tr>
                                        <td class="px-6 py-4 whitespace-nowrap">{{ $booking->flight_number }}</td>
                                        <td class="px-6 py-4 whitespace-nowrap">{{ $booking->departure_date->format('d/m/Y') }}</td>
                                        <td class="px-6 py-4 whitespace-nowrap">{{ ucfirst($booking->status) }}</td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    @endif

                    <a href="{{ url('/') }}" class="mt-4 inline-block text-blue-600 hover:underline">
                        ← Volver al inicio
                    </a>

                </div>
            </div>
        </div>
    </div>
</x-app-layout>