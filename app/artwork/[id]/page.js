
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import artworks from "../../../data/artworks";




export async function generateMetadata({ params }) {
  const { id } = await params;

  const artwork = artworks.find(
    (item) => String(item.id) === id
  );

  if (!artwork) {
    return {
      title: "Artwork Not Found | ArtForge",
    };
  }

  return {
    title: `${artwork.title} | ArtForge`,
    description: artwork.description,
  };
}


export default async function ArtworkDetailPage({ params }) {
  const { id } = await params;

  const artwork = artworks.find(
    (item) => String(item.id) === id
  );

  if (!artwork) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-6 py-16">
      <Link
        href="/gallery"
        className="text-sm font-medium text-[#E86A33] hover:underline"
      >
        ← Back to Gallery
      </Link>

    
 
<div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
  {/* Artwork image */}
  <div className="w-full">
    <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-[#F0F0EB]">
      <Image
        src={artwork.image}
        alt={artwork.title}
        fill
        sizes="(max-width: 767px) 100vw, 50vw"
        className="object-cover"
        priority
      />
    </div>
  </div>

  {/* Artwork details */}
  <section className="min-w-0">
    <p className="text-sm font-semibold uppercase tracking-widest text-[#E86A33]">
      {artwork.category}
    </p>

    <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#171717] sm:text-5xl">
      {artwork.title}
    </h1>

    <p className="mt-6 leading-8 text-[#6B6B6B]">
      {artwork.description}
    </p>

    <Link
      href="/gallery"
      className="mt-8 inline-flex rounded-full bg-[#E86A33] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#C95425]"
    >
      Explore More Artwork
    </Link>
  </section>
</div>

 

    </main>
  );
}
