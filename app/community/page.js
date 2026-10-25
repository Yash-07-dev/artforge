
"use client";

import Link from "next/link";
import { useState } from "react";

const initialPosts = [
  {
    id: 1,
    artist: "Maya Sketch",
    username: "@mayasketch",
    title: "Little Forest Guardian",
    description:
      "A small cartoon character inspired by forest spirits and nature.",
    category: "Character Design",
    style: "Cartoon",
    image: "/artworks/artwork1.jpg",
    likes: 24,
  },
  {
    id: 2,
    artist: "Arjun Creates",
    username: "@arjuncreates",
    title: "Colorful Dreamscape",
    description:
      "Experimenting with color palettes, lighting, and atmosphere.",
    category: "Digital Painting",
    style: "Digital Art",
    image: "/artworks/artwork2.jpg",
    likes: 18,
  },
  {
    id: 3,
    artist: "Nina Draws",
    username: "@ninadraws",
    title: "Character Expressions",
    description:
      "Practising expressive cartoon faces and different emotions.",
    category: "Character Design",
    style: "Cartoon",
    image: "/artworks/artwork3.jpg",
    likes: 32,
  },
  {
    id: 4,
    artist: "Studio Lines",
    username: "@studiolines",
    title: "Daily Sketch Practice",
    description:
      "Simple shapes and sketches are the foundation of better artwork.",
    category: "Sketching",
    style: "Traditional",
    image: "/artworks/artwork4.jpg",
    likes: 15,
  },
];

const categories = [
  "All",
  "Character Design",
  "Digital Painting",
  "Sketching",
];

export default function CommunityPage() {
  const [posts, setPosts] = useState(initialPosts);
  const [likedPosts, setLikedPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  function toggleLike(postId) {
    const alreadyLiked = likedPosts.includes(postId);

    setLikedPosts((current) =>
      alreadyLiked
        ? current.filter((id) => id !== postId)
        : [...current, postId]
    );

    setPosts((current) =>
      current.map((post) =>
        post.id === postId
          ? {
            ...post,
            likes: post.likes + (alreadyLiked ? -1 : 1),
          }
          : post
      )
    );
  }

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
          ArtForge Community
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#171717] sm:text-5xl">
          Art brings us together.
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-8 text-[#6B6B6B]">
          Discover creative ideas, explore artwork, and get inspired by
          artists who are learning and growing just like you.
        </p>

        <a
          href="#community-feed"
          className="mt-7 inline-block rounded-lg bg-[#E86A33] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#CF5727]"
        >
          Explore artwork ↓
        </a>
      </section>

      <section id="community-feed" className="mt-12 scroll-mt-8">
        <div>
          <h2 className="text-2xl font-bold text-[#171717]">
            Community artwork
          </h2>

          <p className="mt-2 text-[#6B6B6B]">
            Explore different styles and appreciate the creativity of others.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              aria-pressed={selectedCategory === category}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${selectedCategory === category
                  ? "border-[#E86A33] bg-[#E86A33] text-white"
                  : "border-[#E5E5E5] bg-white text-[#6B6B6B] hover:border-[#E86A33] hover:text-[#E86A33]"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        <p className="mt-5 text-sm text-[#6B6B6B]" aria-live="polite">
          Showing {filteredPosts.length}{" "}
          {filteredPosts.length === 1 ? "artwork" : "artworks"}
        </p>

        <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="overflow-hidden rounded-xl border border-[#E5E5E5] bg-white transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#F5F5F5]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              </div>

              <div className="p-5">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#FFF5EF] px-3 py-1 text-xs font-semibold text-[#E86A33]">
                    {post.category}
                  </span>

                  <span className="rounded-full bg-[#F5F5F5] px-3 py-1 text-xs font-medium text-[#6B6B6B]">
                    {post.style}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-bold text-[#171717]">
                  {post.title}
                </h3>

                <Link
                  href={`/artists/${post.username.replace("@", "")}`}
                  className="mt-1 inline-block text-sm font-medium text-[#E86A33] hover:underline"
                >
                  {post.artist}
                </Link>


                <p className="mt-3 text-sm leading-7 text-[#6B6B6B]">
                  {post.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-[#EEEEEE] pt-4">
                  <span className="text-xs text-[#6B6B6B]">
                    {post.username}
                  </span>

                  <button
                    type="button"
                    onClick={() => toggleLike(post.id)}
                    aria-pressed={likedPosts.includes(post.id)}
                    aria-label={
                      likedPosts.includes(post.id)
                        ? `Unlike ${post.title}`
                        : `Like ${post.title}`
                    }
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${likedPosts.includes(post.id)
                        ? "bg-[#FFF0E8] text-[#E86A33]"
                        : "bg-[#F5F5F5] text-[#6B6B6B] hover:bg-[#FFF0E8] hover:text-[#E86A33]"
                      }`}
                  >
                    <span aria-hidden="true">
                      {likedPosts.includes(post.id) ? "♥" : "♡"}
                    </span>
                    {post.likes}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-xl border border-[#E5E5E5] p-6 sm:p-8">
        <h2 className="text-xl font-bold text-[#171717]">
          Have artwork to share?
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6B6B6B]">
          We're preparing the artwork submission experience. Soon, artists
          will be able to publish their own creations and share their progress.
        </p>

        <p className="mt-4 text-sm font-semibold text-[#E86A33]">
          Artwork posting coming soon
        </p>
      </section>
    </main>
  );
}
