
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const resources = [
  {
    id: 1,
    title: "Drawing Fundamentals for Beginners",
    description:
      "Learn basic lines, shapes, forms, and observation exercises to build a strong drawing foundation.",
    category: "Drawing",
    type: "Article",
    level: "Beginner",
    source: "ArtForge Learning",
    href: "/learn/drawing-fundamentals",
  },
  {
    id: 2,
    title: "Understanding Human Anatomy",
    description:
      "Explore body proportions, simplified anatomy, and gesture drawing for expressive characters.",
    category: "Anatomy",
    type: "Article",
    level: "Beginner",
    source: "ArtForge Learning",
    href: "/learn/drawing-fundamentals/proportions",
  },
  {
    id: 3,
    title: "Getting Started with Digital Painting",
    description:
      "Discover a beginner-friendly workflow for setting up your canvas and creating your first digital painting.",
    category: "Digital Painting",
    type: "Tutorial",
    level: "Beginner",
    source: "ArtForge Learning",
    href: "/learn/digital-painting/getting-started",
  },
  {
    id: 4,
    title: "Color Theory Basics",
    description:
      "Understand the color wheel, warm and cool colors, and simple color relationships.",
    category: "Color Theory",
    type: "Tutorial",
    level: "Beginner",
    source: "ArtForge Learning",
    href: "/learn/color-light/color-theory-basics",
  },
  {
    id: 5,
    title: "Value and Contrast",
    description:
      "Learn how light and dark values help make your artwork clearer and more readable.",
    category: "Color Theory",
    type: "Tutorial",
    level: "Beginner",
    source: "ArtForge Learning",
    href: "/learn/color-light/value-and-contrast",
  },
  {
    id: 6,
    title: "Light and Shadow",
    description:
      "Practise choosing a light source and adding form shadows and cast shadows to your drawings.",
    category: "Color Theory",
    type: "Tutorial",
    level: "Beginner",
    source: "ArtForge Learning",
    href: "/learn/color-light/light-and-shadow",
  },
  {
    id: 7,
    title: "Color Harmony and Atmosphere",
    description:
      "Create harmonious palettes and use colors to communicate mood and atmosphere.",
    category: "Color Theory",
    type: "Tutorial",
    level: "Beginner",
    source: "ArtForge Learning",
    href: "/learn/color-light/color-harmony-and-atmosphere",
  },
  {
    id: 8,
    title: "Working with Layers",
    description:
      "Understand how layers help you organize artwork and make edits without changing the whole image.",
    category: "Digital Painting",
    type: "Tutorial",
    level: "Beginner",
    source: "ArtForge Learning",
    href: "/learn/digital-painting/working-with-layers",
  },
  {
    id: 9,
    title: "Sketching Practice",
    description:
      "Build a regular sketching habit and practise drawing simple objects with confidence.",
    category: "Drawing",
    type: "Article",
    level: "Beginner",
    source: "ArtForge Learning",
    href: "/learn/drawing-fundamentals/sketching",
  },
];

const categories = [
  "All",
  "Drawing",
  "Anatomy",
  "Digital Painting",
  "Color Theory",
  "Animation",
];

const types = ["All", "Article", "Tutorial", "Book", "Video"];

export default function ResourcesPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const filteredResources = useMemo(() => {
    const query = search.trim().toLowerCase();

    return resources.filter((resource) => {
      const matchesSearch =
        resource.title.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query) ||
        resource.category.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategory === "All" ||
        resource.category === selectedCategory;

      const matchesType =
        selectedType === "All" || resource.type === selectedType;

      return matchesSearch && matchesCategory && matchesType;
    });
  }, [search, selectedCategory, selectedType]);

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-12">
      <Link
        href="/"
        className="text-sm font-medium text-[#E86A33] hover:underline"
      >
        ← Back to Home
      </Link>

      <section className="mt-8 rounded-2xl bg-[#FFF5EF] px-6 py-10 sm:px-10 sm:py-14">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#E86A33]">
          ArtForge Resource Library
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#171717] sm:text-5xl">
          Learn, practise, and grow as an artist.
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-8 text-[#6B6B6B]">
          Explore drawing guides, digital painting tutorials, color
          lessons, and practical resources to help develop your artistic
          skills, especially in cartoon and stylized illustration.
        </p>

        <a
          href="#resource-library"
          className="mt-7 inline-block rounded-lg bg-[#E86A33] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#CF5727]"
        >
          Explore resources →
        </a>
      </section>

      <section id="resource-library" className="mt-12 scroll-mt-8">
        <div>
          <h2 className="text-2xl font-bold text-[#171717]">
            Explore resources
          </h2>
          <p className="mt-2 text-[#6B6B6B]">
            Search and filter materials to find your next learning topic.
          </p>
        </div>

        <div className="mt-6">
          <label
            htmlFor="resource-search"
            className="mb-2 block text-sm font-semibold text-[#171717]"
          >
            Search resources
          </label>

          <input
            id="resource-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Try drawing, color theory, or layers..."
            className="w-full rounded-xl border border-[#E5E5E5] bg-white px-4 py-3 text-sm text-[#171717] outline-none transition placeholder:text-[#999999] focus:border-[#E86A33] focus:ring-2 focus:ring-[#E86A33]/10"
          />
        </div>

        <div className="mt-6">
          <p className="mb-3 text-sm font-semibold text-[#171717]">
            Categories
          </p>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                aria-pressed={selectedCategory === category}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  selectedCategory === category
                    ? "border-[#E86A33] bg-[#E86A33] text-white"
                    : "border-[#E5E5E5] bg-white text-[#6B6B6B] hover:border-[#E86A33] hover:text-[#E86A33]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <label
            htmlFor="resource-type"
            className="mb-2 block text-sm font-semibold text-[#171717]"
          >
            Resource type
          </label>

          <select
            id="resource-type"
            value={selectedType}
            onChange={(event) => setSelectedType(event.target.value)}
            className="w-full max-w-xs rounded-lg border border-[#E5E5E5] bg-white px-4 py-3 text-sm text-[#171717] outline-none focus:border-[#E86A33]"
          >
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-[#6B6B6B]" aria-live="polite">
            Showing {filteredResources.length}{" "}
            {filteredResources.length === 1 ? "resource" : "resources"}
          </p>

          {(search || selectedCategory !== "All" || selectedType !== "All") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
                setSelectedType("All");
              }}
              className="text-sm font-semibold text-[#E86A33] hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {filteredResources.length > 0 ? (
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource) => (
              <article
                key={resource.id}
                className="flex flex-col rounded-xl border border-[#E5E5E5] p-5 transition hover:-translate-y-1 hover:border-[#E86A33]/50 hover:shadow-sm"
              >
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#FFF5EF] px-3 py-1 text-xs font-semibold text-[#E86A33]">
                    {resource.category}
                  </span>

                  <span className="rounded-full bg-[#F5F5F5] px-3 py-1 text-xs font-medium text-[#6B6B6B]">
                    {resource.type}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-bold text-[#171717]">
                  {resource.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-7 text-[#6B6B6B]">
                  {resource.description}
                </p>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#EEEEEE] pt-4">
                  <span className="text-xs text-[#6B6B6B]">
                    {resource.level}
                  </span>

                  <Link
                    href={resource.href}
                    className="text-sm font-semibold text-[#E86A33] hover:underline"
                  >
                    Open resource →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-dashed border-[#D4D4D4] px-6 py-12 text-center">
            <h3 className="text-lg font-semibold text-[#171717]">
              No resources found
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">
              Try another search or change your category and resource type.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
                setSelectedType("All");
              }}
              className="mt-5 rounded-lg bg-[#E86A33] px-4 py-2 text-sm font-semibold text-white hover:bg-[#CF5727]"
            >
              Reset filters
            </button>
          </div>
        )}
      </section>

      <section className="mt-14 rounded-xl border border-[#E5E5E5] p-6 sm:p-8">
        <h2 className="text-xl font-bold text-[#171717]">
          Keep building your skills
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6B6B6B]">
          Use the ArtForge learning paths alongside this library to
          practise new concepts and develop your own artistic style.
        </p>

        <Link
          href="/learn"
          className="mt-5 inline-block rounded-lg bg-[#E86A33] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#CF5727]"
        >
          Explore learning paths →
        </Link>
      </section>
    </main>
  );
}
