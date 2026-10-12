
import Link from "next/link";
import ArtworkCard from "../components/ArtworkCard";
import artworks from "../data/artworks";

export default function Home() {
  return (
    <main>

      
<section className="mx-auto max-w-7xl px-6 py-20">
  <div className="mb-10 flex items-end justify-between gap-4">
    <div>
      <p className="text-sm font-semibold uppercase tracking-widest text-[#E86A33]">
        Selected works
      </p>

      <h2 className="mt-3 text-3xl font-bold text-[#171717] sm:text-4xl">
        Featured Artwork
      </h2>

      <p className="mt-3 max-w-xl text-[#6B6B6B]">
        Explore a selection of creative work from the ArtForge collection.
      </p>
    </div>

    <Link
      href="/gallery"
      className="hidden text-sm font-semibold text-[#171717] hover:text-[#E86A33] sm:block"
    >
      View gallery →
    </Link>
  </div>

  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
    {artworks.map((artwork) => (
      <ArtworkCard key={artwork.id} artwork={artwork} />
    ))}
  </div>
</section>

      <section className="mx-auto flex min-h-[75vh] max-w-7xl flex-col items-start justify-center px-6 py-20">
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#E86A33]">
          Learn · Create · Share · Inspire
        </p>

        <h1 className="max-w-4xl text-5xl font-bold leading-tight tracking-tight text-[#171717] sm:text-6xl lg:text-7xl">
          Turn your imagination into{" "}
          <span className="text-[#E86A33]">art.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-8 text-[#6B6B6B] sm:text-lg">
          Discover artwork, learn new techniques, explore creative
          resources, and take the next step in your artistic journey.
        </p>

        <div className="mt-9 flex flex-wrap gap-4">
          <Link
            href="/gallery"
            className="rounded-full bg-[#E86A33] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#C95425]"
          >
            Explore Artwork
          </Link>

          <Link
            href="/learn"
            className="rounded-full border border-[#E5E5E5] px-7 py-3.5 text-sm font-semibold text-[#171717] transition hover:border-[#E86A33] hover:text-[#E86A33]"
          >
            Start Learning
          </Link>
        </div>
      </section>
    </main>
  );
}
