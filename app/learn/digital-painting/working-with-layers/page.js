
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY =
  "artforge-digital-painting-layers-completed";

const CHECKLIST_KEY =
  "artforge-digital-painting-layers-checklist";

const exercises = [
  "Create a new canvas and add at least three layers.",
  "Rename layers as Sketch, Line Art, and Color.",
  "Hide and show layers using their visibility controls.",
  "Move the layers to understand how their order affects the artwork.",
];

export default function WorkingWithLayersPage() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [checkedItems, setCheckedItems] = useState(
    exercises.map(() => false)
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      setIsCompleted(localStorage.getItem(STORAGE_KEY) === "true");

      const saved = localStorage.getItem(CHECKLIST_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);

        if (
          Array.isArray(parsed) &&
          parsed.length === exercises.length &&
          parsed.every((item) => typeof item === "boolean")
        ) {
          setCheckedItems(parsed);
        }
      }
    } catch {
      // Use default progress if saved data is unavailable.
    } finally {
      setIsLoaded(true);
    }
  }, []);

  function toggleChecklist(index) {
    const updated = checkedItems.map((checked, itemIndex) =>
      itemIndex === index ? !checked : checked
    );

    setCheckedItems(updated);

    try {
      localStorage.setItem(CHECKLIST_KEY, JSON.stringify(updated));
    } catch {
      // Keep the checklist usable for this session.
    }
  }

  function toggleCompletion() {
    const updated = !isCompleted;
    setIsCompleted(updated);

    try {
      localStorage.setItem(STORAGE_KEY, String(updated));
    } catch {
      // Keep the completion control usable for this session.
    }
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-12">
      <Link
        href="/learn/digital-painting"
        className="text-sm font-medium text-[#E86A33] hover:underline"
      >
        ← Back to Digital Painting
      </Link>

      <section className="mt-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#E86A33]">
          Digital Painting · Lesson 03
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#171717] sm:text-5xl">
          Working with Layers
        </h1>

        <p className="mt-5 text-base leading-8 text-[#6B6B6B]">
          Layers let you organize different parts of your digital artwork
          independently. They make it easier to edit a sketch, line art,
          colors, shadows, and highlights without repainting everything.
        </p>
      </section>

      <section className="mt-10 rounded-xl border border-[#E5E5E5] p-6">
        <h2 className="text-2xl font-bold text-[#171717]">
          1. What is a layer?
        </h2>

        <p className="mt-4 leading-8 text-[#6B6B6B]">
          Think of layers as transparent sheets stacked on top of one
          another. Each sheet can contain different marks. When combined,
          they form one image. Most painting applications let you reorder,
          hide, rename, and adjust layers.
        </p>
      </section>

      <section className="mt-8 rounded-xl border border-[#E5E5E5] p-6">
        <h2 className="text-2xl font-bold text-[#171717]">
          2. Organize your artwork
        </h2>

        <p className="mt-4 leading-8 text-[#6B6B6B]">
          A simple workflow is to keep the rough sketch on one layer, clean
          line art on another, and base colors on a separate layer. You can
          add more layers for shadows and highlights as needed.
        </p>

        <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-[#6B6B6B]">
          <li>Rename layers so their purpose is clear.</li>
          <li>Use visibility controls to compare changes.</li>
          <li>Check layer order when one part hides another.</li>
          <li>Save your work in a format that preserves layers.</li>
        </ul>
      </section>

      <section className="mt-8 rounded-xl border border-[#E5E5E5] p-6">
        <h2 className="text-2xl font-bold text-[#171717]">
          3. Practical layer exercise
        </h2>

        <p className="mt-3 leading-7 text-[#6B6B6B]">
          Draw a simple object, such as a cup or a fruit. Put the rough
          sketch, clean lines, and colors on separate layers. Toggle each
          layer's visibility to see how the image changes.
        </p>

        <div className="mt-5 space-y-3">
          {exercises.map((exercise, index) => (
            <label
              key={exercise}
              className="flex cursor-pointer items-start gap-3 rounded-lg bg-[#FFF5EF] p-4"
            >
              <input
                type="checkbox"
                checked={checkedItems[index]}
                disabled={!isLoaded}
                onChange={() => toggleChecklist(index)}
                className="mt-1 h-4 w-4 accent-[#E86A33]"
              />

              <span
                className={`text-sm leading-6 ${
                  checkedItems[index]
                    ? "text-[#6B6B6B] line-through"
                    : "text-[#171717]"
                }`}
              >
                {exercise}
              </span>
            </label>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-xl bg-[#FFF5EF] p-6">
        <h2 className="text-xl font-bold text-[#171717]">
          Lesson completion
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">
          Mark this lesson complete after reviewing the content and trying
          the layer exercise.
        </p>

        <button
          type="button"
          disabled={!isLoaded}
          onClick={toggleCompletion}
          className="mt-5 rounded-lg bg-[#E86A33] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#CF5727] disabled:opacity-50"
        >
          {isCompleted ? "Mark as incomplete" : "Mark lesson as complete"}
        </button>

        <p className="mt-3 text-sm font-medium text-[#6B6B6B]">
          Status: {isCompleted ? "Completed ✓" : "In progress"}
        </p>
      </section>
    </main>
  );
}
