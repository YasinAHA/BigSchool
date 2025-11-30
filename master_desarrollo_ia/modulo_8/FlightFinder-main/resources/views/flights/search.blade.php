<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Buscar Vuelos') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-3xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    <form method="POST" action="{{ route('flights.search') }}">
                        @csrf
                        <div class="mb-4">
                            <label for="origin" class="block text-sm font-medium text-gray-700">Origen (3 letras)</label>
                            <input type="text" name="origin" id="origin" maxlength="3" minlength="3"
                                   value="{{ old('origin') }}" required
                                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                            @error('origin')
                                <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="mb-4">
                            <label for="destination" class="block text-sm font-medium text-gray-700">Destino (3 letras)</label>
                            <input type="text" name="destination" id="destination" maxlength="3" minlength="3"
                                   value="{{ old('destination') }}" required
                                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                            @error('destination')
                                <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="mb-4">
                            <label for="date" class="block text-sm font-medium text-gray-700">Fecha de Salida</label>
                            <input type="date" name="date" id="date" value="{{ old('date') }}" required
                                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                            @error('date')
                                <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                            @enderror
                        </div>

                        <!-- Botón de buscar -->
                        <div class="mt-6">
                            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                Buscar Vuelos
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>