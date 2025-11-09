import axios from "axios";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useMemo, useState } from "react";

import PokemonCard from "../components/PokemonCard";
import PokemonListRow from "../components/PokemonListRow";

interface PokemonListResponse {
  results: Array<{
    name: string;
    url: string;
  }>;
}

export interface PokemonListItem {
  id: number;
  name: string;
  image: string;
}

interface HomeProps {
  pokemons: PokemonListItem[];
}

const Home: NextPage<HomeProps> = ({ pokemons }) => {
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [searchTerm, setSearchTerm] = useState("");

  const toggleOptions = useMemo(
    () => [
      { label: "Tarjetas", value: "card" as const },
      { label: "Lista", value: "list" as const },
    ],
    []
  );

  const filteredPokemons = useMemo(() => {
    const normalizedQuery = searchTerm.trim().toLowerCase();

    if (!normalizedQuery) {
      return pokemons;
    }

    return pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(normalizedQuery)
    );
  }, [pokemons, searchTerm]);

  const hasResults = filteredPokemons.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-sky-50 pb-16">
      <Head>
        <title>Pokédex de Kanto</title>
      </Head>
      <header className="bg-red-500 py-10 text-center text-white shadow-lg">
        <h1 className="text-4xl font-extrabold tracking-wide">Pokédex de Kanto</h1>
        <p className="mt-2 text-lg font-medium">
          Explora la colección clásica de los primeros 151 Pokémon.
        </p>
      </header>
      <main className="mx-auto mt-12 max-w-6xl px-4">
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <label htmlFor="pokemon-search" className="sr-only">
              Busca por nombre
            </label>
            <input
              id="pokemon-search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Buscar Pokémon..."
              className="w-full rounded-full border border-red-200 bg-white px-5 py-3 text-sm text-zinc-700 shadow-sm transition focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-400 dark:border-red-800 dark:bg-zinc-900 dark:text-zinc-100"
            />
          </div>
          <div className="flex justify-end sm:justify-start">
            <div className="inline-flex rounded-full border border-red-200 bg-white p-1 shadow-sm dark:border-red-800 dark:bg-zinc-900">
              {toggleOptions.map((option) => {
                const isActive = viewMode === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setViewMode(option.value)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 ${
                      isActive
                        ? "bg-red-500 text-white shadow"
                        : "text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                    }`}
                    aria-pressed={isActive}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {hasResults ? (
          viewMode === "card" ? (
            <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredPokemons.map((pokemon) => (
                <PokemonCard key={pokemon.id} {...pokemon} />
              ))}
            </section>
          ) : (
            <section className="flex flex-col gap-4">
              {filteredPokemons.map((pokemon) => (
                <PokemonListRow key={pokemon.id} {...pokemon} />
              ))}
            </section>
          )
        ) : (
          <p className="rounded-3xl bg-white/80 p-8 text-center text-sm font-medium text-red-500 shadow-sm backdrop-blur dark:bg-zinc-900/80 dark:text-red-200">
            No se encontraron Pokémon que coincidan con "{searchTerm}".
          </p>
        )}
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const { data } = await axios.get<PokemonListResponse>(
    "https://pokeapi.co/api/v2/pokemon?limit=151"
  );

  const pokemons: PokemonListItem[] = data.results.map((pokemon, index) => {
    const id = index + 1;
    return {
      id,
      name: pokemon.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
    };
  });

  return {
    props: {
      pokemons,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default Home;
