
"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";


const artists = {
    mayasketch: {
        name: "Maya Sketch",
        username: "@mayasketch",
        bio: "Character artist who loves creating expressive cartoon characters and magical worlds.",
        interests: ["Character Design", "Cartoon", "Illustration"],
        artworks: [
           
            {
                id: 2,
                title: "Color Study",
                category: "Color & Light",
                image: "/artworks/image2.jpg",
            },
            {
                id: 3,
                title: "Quiet Moments",
                category: "Illustration",
                image: "/artworks/image3.jpg",
            },
        ],
    },

    arjuncreates: {
        name: "Arjun Creates",
        username: "@arjuncreates",
        bio: "Digital artist experimenting with colorful environments, lighting, and imaginative worlds.",
        interests: ["Digital Painting", "Environment Art", "Color"],
        artworks: [
            {
                id: 1,
                title: "Colorful Dreamscape",
                category: "Digital Painting",
                image: "/artworks/artwork2.jpg",
            },

             {
                id: 2,
                title: "Dreamscape",
                category: "Digital Painting",
                image: "/artworks/image1.jpg",
            },
        ],
    },

    ninadraws: {
        name: "Nina Draws",
        username: "@ninadraws",
        bio: "Illustrator practising expressive cartoon faces, character design, and storytelling.",
        interests: ["Character Design", "Cartoon", "Sketching"],
        artworks: [
            {
                id: 1,
                title: "Character Expressions",
                category: "Character Design",
                image: "/artworks/artwork3.jpg",
            },
        ],
    },

    studiolines: {
        name: "Studio Lines",
        username: "@studiolines",
        bio: "An art practice focused on drawing fundamentals, daily sketches, and improving through repetition.",
        interests: ["Sketching", "Drawing", "Fundamentals"],
        artworks: [
            {
                id: 1,
                title: "Daily Sketch Practice",
                category: "Sketching",
                image: "/artworks/artwork4.jpg",
            },
        ],
    },
};

export default function ArtistProfilePage() {
    const params = useParams();
    const username = String(params.username || "").toLowerCase();
    const artist = artists[username];

    const [isFollowing, setIsFollowing] = useState(false);

    if (!artist) {
        return (
            <main className="mx-auto min-h-screen max-w-5xl px-6 py-16">
                <h1 className="text-3xl font-bold text-[#171717]">
                    Artist not found
                </h1>
                <p className="mt-3 text-[#6B6B6B]">
                    This artist profile does not exist yet.
                </p>
                <Link
                    href="/community"
                    className="mt-6 inline-block font-semibold text-[#E86A33] hover:underline"
                >
                    ← Back to Community
                </Link>
            </main>
        );
    }

    return (
        <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-12">
            <Link
                href="/community"
                className="text-sm font-medium text-[#E86A33] hover:underline"
            >
                ← Back to Community
            </Link>

            <section className="mt-8 rounded-2xl border border-[#E5E5E5] p-6 sm:p-10">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[#FFF0E8] text-3xl font-bold text-[#E86A33]">
                        {artist.name.charAt(0)}
                    </div>

                    <div className="flex-1">
                        <p className="text-sm font-medium text-[#E86A33]">
                            Artist Profile
                        </p>

                        <h1 className="mt-2 text-3xl font-bold text-[#171717] sm:text-4xl">
                            {artist.name}
                        </h1>

                        <p className="mt-2 text-sm text-[#6B6B6B]">
                            {artist.username}
                        </p>

                        <p className="mt-4 max-w-2xl leading-7 text-[#6B6B6B]">
                            {artist.bio}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                            {artist.interests.map((interest) => (
                                <span
                                    key={interest}
                                    className="rounded-full bg-[#FFF5EF] px-3 py-1 text-xs font-semibold text-[#E86A33]"
                                >
                                    {interest}
                                </span>
                            ))}
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsFollowing((current) => !current)}
                        aria-pressed={isFollowing}
                        className={`rounded-lg px-5 py-3 text-sm font-semibold transition ${isFollowing
                                ? "border border-[#E86A33] bg-white text-[#E86A33]"
                                : "bg-[#E86A33] text-white hover:bg-[#CF5727]"
                            }`}
                    >
                        {isFollowing ? "Following ✓" : "Follow"}
                    </button>
                </div>
            </section>

            <section className="mt-12">
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-[#171717]">
                            Artwork by {artist.name}
                        </h2>
                        <p className="mt-2 text-sm text-[#6B6B6B]">
                            Explore this artist's collection.
                        </p>
                    </div>

                    <span className="text-sm text-[#6B6B6B]">
                        {artist.artworks.length} artworks
                    </span>
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {artist.artworks.map((artwork) => (
                        <Link
                            key={artwork.id}
                            href={`/artwork/${artwork.id}`}
                            className="overflow-hidden rounded-xl border border-[#E5E5E5] transition hover:-translate-y-1 hover:shadow-md"
                        >
                            <div className="aspect-[4/3] overflow-hidden bg-[#F5F5F5]">
                                <img
                                    src={artwork.image}
                                    alt={artwork.title}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            <div className="p-4">
                                <p className="text-xs font-semibold uppercase tracking-wide text-[#E86A33]">
                                    {artwork.category}
                                </p>
                                <h3 className="mt-2 font-bold text-[#171717]">
                                    {artwork.title}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
