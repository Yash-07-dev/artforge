
import Link from "next/link";
import ArtworkCard from "../components/ArtworkCard";
import artworks from "../data/artworks";
import LearningCard from "../components/LearningCard";
import learningCategories from "../data/learningCategories";

export default function Home() {
  return (
    <main>


<section className="bg-[#FAFAF7]">
  <div className="mx-auto max-w-7xl px-6 py-20">
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-widest text-[#E86A33]">
        Grow your skills
      </p>

      <h2 className="mt-3 text-3xl font-bold text-[#171717] sm:text-4xl">
        Learn the art of creating
      </h2>

      <p className="mt-4 leading-7 text-[#6B6B6B]">
        Explore practical topics and build your artistic skills,
        one step at a time.
      </p>
    </div>

    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {learningCategories.map((category) => (
        <LearningCard key={category.id} category={category} />
      ))}
    </div>
  </div>
</section>


      
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



    
<section className="bg-white">
  <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2 md:gap-16">

    {/* Left: About content */}
    <div>
      <p className="text-sm font-semibold uppercase tracking-widest text-[#E86A33]">
        About ArtForge
      </p>

      <h2 className="mt-4 text-3xl font-bold leading-tight text-[#171717] sm:text-4xl">
        Every artist starts somewhere.
      </h2>

      <p className="mt-6 leading-8 text-[#6B6B6B]">
        ArtForge is a space for exploring creativity, learning artistic
        techniques, and finding inspiration. Whether you're picking up
        a pencil for the first time or improving your digital painting,
        there's always something new to discover.
      </p>

      <p className="mt-4 leading-8 text-[#6B6B6B]">
        Our vision is simple: Learn, Create, Share, and Inspire.
        We want to help artists keep practicing, share ideas, and grow
        together.
      </p>
    </div>

    {/* Right: Four principles */}
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {[
        {
          number: "01",
          title: "Learn",
          description: "Build skills through practical resources.",
        },
        {
          number: "02",
          title: "Create",
          description: "Turn ideas into original artwork.",
        },
        {
          number: "03",
          title: "Share",
          description: "Show your creative journey.",
        },
        {
          number: "04",
          title: "Inspire",
          description: "Discover new ideas and perspectives.",
        },
      ].map((item) => (
        <div
          key={item.number}
          className="rounded-xl border border-[#E5E5E5] p-5 transition hover:border-[#E86A33]"
        >
          <p className="text-sm font-semibold text-[#E86A33]">
            {item.number}
          </p>

          <h3 className="mt-3 text-lg font-semibold text-[#171717]">
            {item.title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">
            {item.description}
          </p>
        </div>
      ))}
    </div>

  </div>
</section>


<section className="bg-[#FAFAF7] px-6 py-20">
  <div className="mx-auto max-w-4xl rounded-2xl border border-[#E5E5E5] bg-white px-6 py-12 text-center sm:px-12 sm:py-16">
    <p className="text-sm font-semibold uppercase tracking-widest text-[#E86A33]">
      Your creative journey starts here
    </p>

    <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold leading-tight text-[#171717] sm:text-4xl">
      Ready to create something amazing?
    </h2>

    <p className="mx-auto mt-5 max-w-xl leading-7 text-[#6B6B6B]">
      Explore artwork, discover new techniques, and take the next
      step in your artistic journey.
    </p>

    <div className="mt-8 flex flex-wrap justify-center gap-4">
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
  </div>
</section>


    </main>
  );
}
