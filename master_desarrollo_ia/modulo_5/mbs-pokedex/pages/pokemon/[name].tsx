import axios from "axios";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

interface PokemonListResponse {
  results: Array<{
    name: string;
    url: string;
  }>;
}

interface PokemonApiResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: Array<{
    ability: { name: string };
  }>;
  types: Array<{
    slot: number;
    type: { name: string };
  }>;
  stats: Array<{
    base_stat: number;
    stat: { name: string };
  }>;
  sprites: {
    front_default: string | null;
    other?: {
      [key: string]: {
        front_default: string | null;
      } | undefined;
      [key: number]: never;
    };
  };
}

interface PokemonStat {
  name: string;
  value: number;
}

interface PokemonDetailProps {
  pokemon: {
    id: number;
    name: string;
    image: string;
    height: number;
    weight: number;
    types: string[];
    abilities: string[];
    stats: PokemonStat[];
  };
}

const capitalize = (value: string): string =>
  value.charAt(0).toUpperCase() + value.slice(1);

const PokemonDetailPage: NextPage<PokemonDetailProps> = ({ pokemon }) => {
  const { id, name, image, height, weight, types, abilities, stats } = pokemon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-red-50 pb-16">
      <Head>
        <title>{`Pokémon ${capitalize(name)}`}</title>
      </Head>
      <header className="bg-red-500 py-10 text-center text-white shadow-lg">
        <h1 className="text-4xl font-extrabold tracking-wide">
          {capitalize(name)} #{id.toString().padStart(3, "0")}
        </h1>
        <p className="mt-2 text-lg font-medium">Descubre las estadísticas y características clave.</p>
      </header>
      <main className="mx-auto mt-12 flex max-w-4xl flex-col gap-10 px-4 md:flex-row">
        <section className="flex flex-1 justify-center">
          <div className="relative h-64 w-64 rounded-3xl border border-red-200 bg-white p-6 shadow-md dark:border-red-400">
            <Image
              src={image}
              alt={`Ilustración oficial de ${capitalize(name)}`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 80vw, 256px"
              priority
            />
          </div>
        </section>
        <section className="flex-1 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-red-600">Información General</h2>
            <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-white p-4 shadow">
                <dt className="text-sm font-medium text-zinc-500">Altura</dt>
                <dd className="text-lg font-semibold text-zinc-900">{height.toFixed(1)} m</dd>
              </div>
              <div className="rounded-lg bg-white p-4 shadow">
                <dt className="text-sm font-medium text-zinc-500">Peso</dt>
                <dd className="text-lg font-semibold text-zinc-900">{weight.toFixed(1)} kg</dd>
              </div>
              <div className="rounded-lg bg-white p-4 shadow">
                <dt className="text-sm font-medium text-zinc-500">Tipos</dt>
                <dd className="mt-1 flex flex-wrap gap-2">
                  {types.map((type) => (
                    <span
                      key={type}
                      className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700"
                    >
                      {capitalize(type)}
                    </span>
                  ))}
                </dd>
              </div>
              <div className="rounded-lg bg-white p-4 shadow">
                <dt className="text-sm font-medium text-zinc-500">Habilidades</dt>
                <dd className="mt-1 flex flex-wrap gap-2">
                  {abilities.map((ability) => (
                    <span
                      key={ability}
                      className="rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700"
                    >
                      {capitalize(ability)}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-red-600">Estadísticas Base</h2>
            <ul className="mt-4 space-y-3">
              {stats.map((stat) => (
                <li key={stat.name} className="flex items-center justify-between rounded-lg bg-white p-4 shadow">
                  <span className="font-medium text-zinc-600">{capitalize(stat.name)}</span>
                  <span className="text-lg font-semibold text-zinc-900">{stat.value}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-red-600"
            >
              ← Volver a la Pokédex
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await axios.get<PokemonListResponse>(
    "https://pokeapi.co/api/v2/pokemon?limit=151"
  );

  const paths = data.results.map((pokemon) => ({
    params: { name: pokemon.name },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PokemonDetailProps> = async ({ params }) => {
  const name = params?.name as string;

  const { data } = await axios.get<PokemonApiResponse>(
    `https://pokeapi.co/api/v2/pokemon/${name}`
  );

  const officialArtwork =
    data.sprites.other?.["official-artwork"]?.front_default ??
    data.sprites.front_default ??
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`;

  const pokemon: PokemonDetailProps["pokemon"] = {
    id: data.id,
    name: data.name,
    image: officialArtwork,
    height: data.height / 10,
    weight: data.weight / 10,
    types: data.types
      .sort((a, b) => a.slot - b.slot)
      .map((type) => type.type.name),
    abilities: data.abilities.map((ability) => ability.ability.name),
    stats: data.stats.map((stat) => ({
      name: stat.stat.name,
      value: stat.base_stat,
    })),
  };

  return {
    props: {
      pokemon,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default PokemonDetailPage;
