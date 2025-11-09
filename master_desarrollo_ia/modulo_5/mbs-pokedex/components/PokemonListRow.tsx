import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import { capitalize } from "../lib/strings";
import type { PokemonCardProps } from "./PokemonCard";

const PokemonListRow: FC<PokemonCardProps> = ({ id, name, image }) => {
  return (
    <Link
      href={`/pokemon/${name}`}
      className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:bg-zinc-50 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
      aria-labelledby={`pokemon-${id}-name`}
    >
      <div className="relative h-16 w-16 flex-shrink-0">
        <Image
          src={image}
          alt={`Imagen oficial de ${capitalize(name)}`}
          fill
          sizes="64px"
          className="object-contain"
          priority={id <= 12}
        />
      </div>
      <article className="flex w-full items-center justify-between gap-4 text-left">
        <div className="flex flex-col">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            #{id.toString().padStart(3, "0")}
          </p>
          <h2 id={`pokemon-${id}-name`} className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            {capitalize(name)}
          </h2>
        </div>
        <span className="hidden text-sm font-medium text-red-500 sm:inline">Ver detalles →</span>
      </article>
    </Link>
  );
};

export default PokemonListRow;
