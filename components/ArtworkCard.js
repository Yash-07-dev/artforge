
import Image from "next/image";
import Link from "next/link";

export default function ArtworkCard({ artwork }) {
  return (
    <Link href={`/artwork/${artwork.id}`} className="group block">
      <article>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#F0F0EB]">
          <Image
            src={artwork.image}
            alt={artwork.title}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="mt-4">
          <p className="text-xs font-medium uppercase tracking-wider text-[#E86A33]">
            {artwork.category}
          </p>

          <h3 className="mt-2 text-lg font-semibold text-[#171717] transition-colors group-hover:text-[#E86A33]">
            {artwork.title}
          </h3>
        </div>
      </article>
    </Link>
  );
}
