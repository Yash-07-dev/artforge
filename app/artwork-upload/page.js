
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function ArtworkUploadPage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [category, setCategory] = useState("Digital Art");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const user = sessionStorage.getItem("artforgeUser");
        setIsAuthenticated(Boolean(user));
    }, []);




    async function handleSubmit(event) {
        event.preventDefault();

        if (loading) return;
        
        setMessage("");
        setMessageType("");

        if (!imageFile) {
            setMessage("Please select an artwork image.");
            setMessageType("error");
            return;
        }

        if (imageFile.size > 5 * 1024 * 1024) {
            setMessage("Please select an image smaller than 5 MB.");
            setMessageType("error");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("title", title.trim());
            formData.append("description", description.trim());
            formData.append("image", imageFile);
            formData.append("category", category);

            const response = await fetch(
                "http://localhost:5000/api/artworks",
                {
                    method: "POST",
                    credentials: "include",
                    body: formData,
                }
            );

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message || "Artwork upload failed.");
            }

            router.push("/gallery");
            router.refresh();

        } catch (error) {
            setMessage(
                error.message || "Unable to upload artwork. Please try again."
            );
            setMessageType("error");
        } finally {
            setLoading(false);
        }
    }


    return (
        <main className="min-h-screen bg-[#FFF5EF] px-5 py-12">
            <div className="mx-auto max-w-2xl">
                <Link
                    href="/gallery"
                    className="text-sm font-medium text-[#E86A33] hover:underline"
                >
                    ← Back to Gallery
                </Link>

                <section className="mt-6 rounded-2xl border border-[#F0E1D8] bg-white p-7 shadow-sm sm:p-9">
                    <h1 className="text-3xl font-bold text-[#171717]">
                        Share your artwork
                    </h1>

                    <p className="mt-2 text-sm text-[#6B6B6B]">
                        Add your creation to the ArtForge community.
                    </p>


                    {isAuthenticated === null ? (
                        <p className="mt-8 text-sm text-gray-500">
                            Checking your login status...
                        </p>
                    ) : !isAuthenticated ? (
                        <div className="mt-8 rounded-2xl border border-orange-200 bg-orange-50 p-6">
                            <h2 className="text-xl font-bold text-gray-900">
                                Join the ArtForge community!
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                Log in or create a free account to publish your artwork
                                and share your creativity with other artists.
                            </p>

                            <div className="mt-5 flex flex-wrap gap-3">
                                <Link
                                    href="/login?redirect=/artwork-upload"
                                    className="rounded-xl bg-[#E86A33] px-5 py-3 font-semibold text-white"
                                >
                                    Log in
                                </Link>

                                <Link
                                    href="/register?redirect=/artwork-upload"
                                    className="rounded-xl border border-[#E86A33] bg-white px-5 py-3 font-semibold text-[#E86A33]"
                                >
                                    Create an account
                                </Link>
                            </div>
                        </div>
                    ) : (



                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 space-y-5">


                            {message && (
                                <div
                                    role={messageType === "error" ? "alert" : "status"}
                                    className={`rounded-xl border p-4 text-sm ${messageType === "success"
                                        ? "border-green-200 bg-green-50 text-green-800"
                                        : "border-red-200 bg-red-50 text-red-700"
                                        }`}
                                >
                                    {message}
                                </div>
                            )}

                            <div>
                                <label htmlFor="title" className="mb-2 block text-sm font-medium">
                                    Artwork title
                                </label>
                                <input
                                    id="title"
                                    value={title}
                                    onChange={(event) => setTitle(event.target.value)}
                                    required
                                    maxLength={120}
                                    placeholder="Give your artwork a title"
                                    className="w-full rounded-lg border border-[#E5E5E5] px-4 py-3 outline-none focus:border-[#E86A33]"
                                />
                            </div>





                            <div>
                                <label
                                    htmlFor="description"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    maxLength={2000}
                                    rows={4}
                                    placeholder="Tell us about your artwork..."
                                    className="w-full rounded-lg border border-[#E5E5E5] px-4 py-3 outline-none focus:border-[#E86A33]"
                                />
                            </div>


                            <div>
                                <label
                                    htmlFor="image"
                                    className="mb-3 block text-sm font-semibold text-[#25211F]"
                                >
                                    Artwork image <span className="text-[#E86A33]">*</span>
                                </label>

                                <label
                                    htmlFor="image"
                                    className="group relative flex min-h-64 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#E9D7CC] bg-gradient-to-br from-[#FFFAF7] to-[#FFF0E6] p-5 text-center shadow-sm transition duration-300 hover:border-[#E86A33] hover:shadow-md"
                                >
                                    {imageFile ? (
                                        <div className="flex w-full flex-col items-center">
                                            <div className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm">
                                                <img
                                                    src={URL.createObjectURL(imageFile)}
                                                    alt="Selected artwork preview"
                                                    className="h-full w-full object-contain"
                                                />
                                                <span className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#E86A33] shadow-sm">
                                                    Preview
                                                </span>
                                            </div>

                                            <p className="mt-4 max-w-full truncate text-sm font-semibold text-[#25211F]">
                                                {imageFile.name}
                                            </p>

                                            <span className="mt-2 inline-flex items-center gap-2 rounded-full border border-[#EBC9B5] bg-white px-4 py-2 text-sm font-semibold text-[#D85C28] transition group-hover:bg-[#FFF5EF]">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M12 20h9" />
                                                    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L9 17l-4 1 1-4Z" />
                                                </svg>
                                                Change artwork
                                            </span>
                                        </div>
                                    ) : (
                                        <>
                                            <span className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-[#E86A33] shadow-sm ring-1 ring-[#F1D9CA] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="36"
                                                    height="36"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.6"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                >
                                                    <rect x="3" y="3" width="18" height="18" rx="3" />
                                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                                    <path d="m21 15-5-5L5 21" />
                                                    <path d="M12 12v-7" />
                                                    <path d="m9 8 3-3 3 3" />
                                                </svg>
                                            </span>

                                            <h3 className="text-lg font-bold tracking-tight text-[#25211F]">
                                                Bring your art to life
                                            </h3>

                                            <p className="mt-2 max-w-xs text-sm leading-6 text-[#77706B]">
                                                Choose an artwork image from your device to share with the ArtForge community.
                                            </p>

                                            <span className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#E86A33] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#D85C28] group-hover:shadow-md">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M12 16V4" />
                                                    <path d="m7 9 5-5 5 5" />
                                                    <path d="M20 16.5v2A1.5 1.5 0 0 1 18.5 20h-13A1.5 1.5 0 0 1 4 18.5v-2" />
                                                </svg>
                                                Browse files
                                            </span>

                                            <p className="mt-4 text-xs font-medium text-[#8A7B73]">
                                                JPG, PNG or WebP · Up to 5 MB
                                            </p>
                                        </>
                                    )}

                                    <input
                                        id="image"
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        required
                                        className="sr-only"
                                        onChange={(event) => {
                                            const file = event.target.files?.[0] || null;

                                            if (file && file.size > 5 * 1024 * 1024) {
                                                alert("Please choose an image smaller than 5 MB.");
                                                event.target.value = "";
                                                setImageFile(null);
                                                return;
                                            }

                                            setImageFile(file);
                                        }}
                                    />
                                </label>
                            </div>



                            <div>
                                <label
                                    htmlFor="category"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Category
                                </label>
                                <select
                                    id="category"
                                    value={category}
                                    onChange={(event) => setCategory(event.target.value)}
                                    className="w-full rounded-lg border border-[#E5E5E5] bg-white px-4 py-3 outline-none focus:border-[#E86A33]"
                                >
                                    <option>Digital Art</option>
                                    <option>Traditional Art</option>
                                    <option>Illustration</option>
                                    <option>Animation</option>
                                    <option>Photography</option>
                                    <option>Other</option>
                                </select>
                            </div>




                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-xl bg-[#E86A33] px-5 py-3.5 font-semibold text-white shadow-sm transition hover:bg-[#D85C28] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "Uploading your artwork..." : "Publish artwork"}
                            </button>


                        </form>)}
                </section>
            </div>
        </main>
    );
}

