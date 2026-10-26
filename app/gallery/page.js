
"use client";

import { useEffect, useState } from "react";
import ArtworkCard from "../../components/ArtworkCard";
import sampleArtworks from "../../data/artworks";

const API_URL = "http://localhost:5000/api/artworks";

export default function GalleryPage() {
  const [artworks, setArtworks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Artwork");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchArtworks() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load artwork from the server.");
        }

        const result = await response.json();

        if (!result.success || !Array.isArray(result.data)) {
          throw new Error("The server returned an unexpected response.");
        }

        const normalizedArtworks = result.data.map((artwork) => ({
          ...artwork,
          id: artwork._id || artwork.id,
          image: artwork.imageUrl || artwork.image,
        }));

        setArtworks(normalizedArtworks);
      } catch (err) {
        if (err.name === "AbortError") return;

        console.error("Gallery API error:", err);
        setError(
          "Couldn't load artwork from the database. Showing sample artwork instead."
        );
        setArtworks(sampleArtworks);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchArtworks();

    return () => controller.abort();
  }, []);

  const categories = [
    "All Artwork",
    ...new Set(artworks.map((artwork) => artwork.category)),
  ];

  const query = searchQuery.trim().toLowerCase();

  const filteredArtworks = artworks.filter((artwork) => {
    const matchesCategory =
      selectedCategory === "All Artwork" ||
      artwork.category === selectedCategory;

    const matchesSearch =
      artwork.title.toLowerCase().includes(query) ||
      artwork.category.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-6 py-12">
      {/* Gallery heading */}
      <section>
        <p className="text-sm font-semibold uppercase tracking-widest text-[#E86A33]">
          The ArtForge Collection
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#171717] sm:text-5xl">
          Explore the Gallery
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-7 text-[#6B6B6B]">
          Discover artwork, explore different styles, and find inspiration
          for your own creative journey.
        </p>
      </section>

      {/* Search */}
      <section className="mt-8">
        <label htmlFor="gallery-search" className="sr-only">
          Search artwork
        </label>

        <input
          id="gallery-search"
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search by artwork title or category..."
          className="w-full max-w-xl rounded-xl border border-[#E5E5E5] bg-white px-4 py-3 text-sm outline-none focus:border-[#E86A33]"
        />
      </section>

      {/* Loading and error messages */}
      {loading && (
        <p className="mt-6 text-sm text-[#6B6B6B]" role="status">
          Loading artwork...
        </p>
      )}

      {error && (
        <p className="mt-6 text-sm text-amber-700" role="status">
          {error}
        </p>
      )}

      {/* Category filters and result count */}
      <section className="mt-10">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              aria-pressed={selectedCategory === category}
              className={`rounded-full border px-5 py-2.5 text-sm font-medium transition ${
                selectedCategory === category
                  ? "border-[#E86A33] bg-[#E86A33] text-white"
                  : "border-[#E5E5E5] bg-white text-[#171717] hover:border-[#E86A33]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <p className="mt-3 text-sm text-[#6B6B6B]" aria-live="polite">
          Showing {filteredArtworks.length}{" "}
          {filteredArtworks.length === 1 ? "artwork" : "artworks"}
        </p>
      </section>

      {/* Artwork grid */}
      <section className="mt-8">
        {loading ? (
          <p className="py-12 text-center text-sm text-[#6B6B6B]">
            Please wait while we load the gallery.
          </p>
        ) : filteredArtworks.length > 0 ? (
          <div className="grid grid-cols-1 items-start gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArtworks.map((artwork) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <h2 className="text-xl font-semibold text-[#171717]">
              No artwork found
            </h2>

            <p className="mt-2 text-sm text-[#6B6B6B]">
              Try another search term or select a different category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All Artwork");
              }}
              className="mt-5 rounded-full bg-[#E86A33] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#C95425]"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
