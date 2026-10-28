
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const API_URL = "http://localhost:5000/api/artworks/mine";
const ARTWORKS_URL = "http://localhost:5000/api/artworks";

export default function MyArtworksPage() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    category: "Digital Art",
  });
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMyArtworks() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL, {
          credentials: "include",
          signal: controller.signal,
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Unable to load your artworks.");
        }

        const normalized = result.data.map((artwork) => ({
          ...artwork,
          id: artwork._id || artwork.id,
          image: artwork.imageUrl || artwork.image,
        }));

        setArtworks(normalized);
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err.message || "Unable to load your artworks.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchMyArtworks();
    return () => controller.abort();
  }, []);

  function startEditing(artwork) {
    setActionMessage("");
    setError("");
    setEditingId(artwork.id);
    setEditForm({
      title: artwork.title || "",
      description: artwork.description || "",
      category: artwork.category || "Digital Art",
    });
  }

  async function saveArtwork(event) {
    event.preventDefault();

    if (!editForm.title.trim() || !editForm.category.trim()) {
      setActionMessage("Title and category are required.");
      return;
    }

    try {
      setSaving(true);
      setActionMessage("");

      const response = await fetch(`${ARTWORKS_URL}/${editingId}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editForm.title.trim(),
          description: editForm.description.trim(),
          category: editForm.category.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to update artwork.");
      }

      setArtworks((current) =>
        current.map((artwork) =>
          artwork.id === editingId
            ? {
                ...artwork,
                ...result.data,
                id: result.data._id || result.data.id || editingId,
                image: result.data.imageUrl || artwork.image,
              }
            : artwork
        )
      );

      setEditingId(null);
      setActionMessage("Artwork updated successfully.");
    } catch (err) {
      setActionMessage(err.message || "Unable to update artwork.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteArtwork(artwork) {
    const confirmed = window.confirm(
      `Delete "${artwork.title}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setDeletingId(artwork.id);
      setActionMessage("");

      const response = await fetch(`${ARTWORKS_URL}/${artwork.id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to delete artwork.");
      }

      setArtworks((current) =>
        current.filter((item) => item.id !== artwork.id)
      );

      if (editingId === artwork.id) setEditingId(null);
      setActionMessage("Artwork deleted successfully.");
    } catch (err) {
      setActionMessage(err.message || "Unable to delete artwork.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-6 py-12">
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-[#E86A33]">
            Your creative space
          </p>
          <h1 className="mt-3 text-4xl font-bold text-[#171717]">
            My Artworks
          </h1>
          <p className="mt-3 max-w-xl text-base leading-7 text-[#6B6B6B]">
            Manage your creative collection and share your latest work.
          </p>
        </div>

        <Link
          href="/artwork-upload"
          className="inline-flex justify-center rounded-xl bg-[#E86A33] px-5 py-3 font-semibold text-white hover:bg-[#D85C28]"
        >
          + Upload Artwork
        </Link>
      </section>

      <section className="mt-10 rounded-2xl border border-[#F0E1D8] bg-white p-6">
        <p className="text-sm text-[#6B6B6B]">Total published artworks</p>
        <p className="mt-2 text-3xl font-bold text-[#171717]">
          {loading ? "—" : artworks.length}
        </p>
      </section>

      {actionMessage && (
        <p className="mt-5 rounded-xl border border-[#F0E1D8] bg-[#FFFAF7] p-4 text-sm text-[#6B6B6B]" role="status">
          {actionMessage}
        </p>
      )}

      {loading ? (
        <p className="py-16 text-center text-[#6B6B6B]" role="status">
          Loading your artworks...
        </p>
      ) : error ? (
        <p className="mt-8 rounded-xl bg-red-50 p-5 text-red-700" role="alert">
          {error}
        </p>
      ) : artworks.length === 0 ? (
        <section className="mt-10 rounded-2xl border border-dashed border-[#E5C8B8] bg-[#FFFAF7] px-6 py-16 text-center">
          <h2 className="text-xl font-semibold text-[#171717]">
            Your gallery is waiting
          </h2>
          <p className="mt-3 text-sm text-[#6B6B6B]">
            You haven't published any artwork yet.
          </p>
          <Link
            href="/artwork-upload"
            className="mt-6 inline-flex rounded-xl bg-[#E86A33] px-5 py-3 font-semibold text-white"
          >
            Publish your first artwork
          </Link>
        </section>
      ) : (
        <section className="mt-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#171717]">
              Your collection
            </h2>
            <span className="text-sm text-[#6B6B6B]">
              {artworks.length} {artworks.length === 1 ? "artwork" : "artworks"}
            </span>
          </div>

          <div className="grid grid-cols-1 items-start gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {artworks.map((artwork) => (
              <article
                key={artwork.id}
                className="min-w-0 overflow-hidden rounded-xl border border-[#F0E1D8] bg-white p-3"
              >
                <Link href={`/artwork/${artwork.id}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#F0F0EB]">
                    <Image
                      src={artwork.image}
                      alt={artwork.title}
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-3 text-xs font-medium uppercase tracking-wider text-[#E86A33]">
                    {artwork.category}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-[#171717]">
                    {artwork.title}
                  </h3>
                </Link>

                {editingId === artwork.id ? (
                  <form onSubmit={saveArtwork} className="mt-4 space-y-3">
                    <label className="block text-sm font-medium text-[#171717]">
                      Title
                      <input
                        value={editForm.title}
                        onChange={(event) =>
                          setEditForm({ ...editForm, title: event.target.value })
                        }
                        maxLength={120}
                        required
                        className="mt-1 w-full rounded-lg border border-[#E5E5E5] px-3 py-2"
                      />
                    </label>

                    <label className="block text-sm font-medium text-[#171717]">
                      Description
                      <textarea
                        value={editForm.description}
                        onChange={(event) =>
                          setEditForm({
                            ...editForm,
                            description: event.target.value,
                          })
                        }
                        maxLength={2000}
                        rows={3}
                        className="mt-1 w-full rounded-lg border border-[#E5E5E5] px-3 py-2"
                      />
                    </label>

                    <label className="block text-sm font-medium text-[#171717]">
                      Category
                      <select
                        value={editForm.category}
                        onChange={(event) =>
                          setEditForm({ ...editForm, category: event.target.value })
                        }
                        className="mt-1 w-full rounded-lg border border-[#E5E5E5] bg-white px-3 py-2"
                      >
                        {[
                          "Digital Art",
                          "Traditional Art",
                          "Illustration",
                          "Animation",
                          "Photography",
                          "Digital Painting",
                          "Other",
                        ].map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </label>

                    <div className="flex gap-2">
                      <button
                        type="submit"
                        disabled={saving}
                        className="flex-1 rounded-lg bg-[#E86A33] px-3 py-2 text-sm font-semibold text-white disabled:opacity-60"
                      >
                        {saving ? "Saving..." : "Save"}
                      </button>
                      <button
                        type="button"
                        disabled={saving}
                        onClick={() => setEditingId(null)}
                        className="rounded-lg border border-[#E5E5E5] px-3 py-2 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      onClick={() => startEditing(artwork)}
                      className="flex-1 rounded-lg border border-[#E86A33] px-3 py-2 text-sm font-semibold text-[#E86A33] hover:bg-[#FFF5EF]"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteArtwork(artwork)}
                      disabled={deletingId === artwork.id}
                      className="flex-1 rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
                    >
                      {deletingId === artwork.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
