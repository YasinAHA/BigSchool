import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import { capitalize } from "../lib/strings";

export interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
}

const PokemonCard: FC<PokemonCardProps> = ({ id, name, image }) => {
  return (
    <Link
      href={`/pokemon/${name}`}
      className="block rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900"
      aria-labelledby={`pokemon-${id}-name`}
    >
      <article className="flex flex-col items-center gap-4 text-center">
        <div className="relative h-32 w-32">
          <Image
            src={image}
            alt={`Imagen oficial de ${capitalize(name)}`}
            fill
            sizes="(max-width: 768px) 50vw, 160px"
            className="object-contain"
            priority={id <= 12}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">#{id.toString().padStart(3, "0")}</p>
          <h2 id={`pokemon-${id}-name`} className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            {capitalize(name)}
          </h2>
        </div>
      </article>
    </Link>
  );
};

export default PokemonCard;
