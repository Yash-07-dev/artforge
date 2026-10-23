
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY =
  "artforge-digital-painting-brush-control-completed";

const CHECKLIST_KEY =
  "artforge-digital-painting-brush-control-checklist";

const exercises = [
  "Draw ten thin lines using a small brush size.",
  "Draw ten thick lines using a larger brush size.",
  "Practice strokes at low, medium, and high opacity.",
  "Draw circles, curves, and simple shapes with controlled strokes.",
];

export default function BrushesAndBrushControlPage() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [checkedItems, setCheckedItems] = useState(
    exercises.map(() => false)
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      setIsCompleted(localStorage.getItem(STORAGE_KEY) === "true");

      const savedChecklist = localStorage.getItem(CHECKLIST_KEY);

      if (savedChecklist) {
        const parsed = JSON.parse(savedChecklist);

        if (
          Array.isArray(parsed) &&
          parsed.length === exercises.length &&
          parsed.every((item) => typeof item === "boolean")
        ) {
          setCheckedItems(parsed);
        }
      }
    } catch {
      // Continue with default progress if saved data is unavailable.
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
      // The checklist remains usable during this page session.
    }
  }

  function toggleCompletion() {
    const updated = !isCompleted;
    setIsCompleted(updated);

    try {
      localStorage.setItem(STORAGE_KEY, String(updated));
    } catch {
      // The completion state remains usable during this page session.
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
          Digital Painting · Lesson 02
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#171717] sm:text-5xl">
          Brushes and Brush Control
        </h1>

        <p className="mt-5 text-base leading-8 text-[#6B6B6B]">
          Brush control helps you create clean lines, expressive marks,
          smooth shading, and confident shapes. Start with a simple brush
          and practice controlling its size, hardness, and opacity.
        </p>
      </section>

      <section className="mt-10 rounded-xl border border-[#E5E5E5] p-6">
        <h2 className="text-2xl font-bold text-[#171717]">
          1. Brush size
        </h2>

        <p className="mt-4 leading-8 text-[#6B6B6B]">
          Brush size controls the thickness of your stroke. Smaller brushes
          are useful for details and fine lines, while larger brushes are
          useful for broad shapes and blocking in color.
        </p>

        <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-[#6B6B6B]">
          <li>Use small brushes for details and thin lines.</li>
          <li>Use medium brushes for ordinary drawing and painting.</li>
          <li>Use large brushes to cover broad areas quickly.</li>
        </ul>
      </section>

      <section className="mt-8 rounded-xl border border-[#E5E5E5] p-6">
        <h2 className="text-2xl font-bold text-[#171717]">
          2. Brush hardness
        </h2>

        <p className="mt-4 leading-8 text-[#6B6B6B]">
          Hardness controls how sharply a brush edge appears. A hard brush
          creates a defined edge, while a soft brush creates a feathered
          edge that can be useful for blending and gentle shading.
        </p>

        <p className="mt-4 leading-8 text-[#6B6B6B]">
          Try both types on your canvas. Use hard edges when you need
          clarity, and soft edges when you want gradual transitions.
          Not every painting application uses the same brush controls.
        </p>
      </section>

      <section className="mt-8 rounded-xl border border-[#E5E5E5] p-6">
        <h2 className="text-2xl font-bold text-[#171717]">
          3. Opacity and pressure
        </h2>

        <p className="mt-4 leading-8 text-[#6B6B6B]">
          Opacity determines how transparent a stroke appears. Low opacity
          lets underlying colors show through; high opacity produces a more
          solid mark. If your device supports pressure sensitivity, changing
          how firmly you press may also affect the stroke.
        </p>

        <p className="mt-4 leading-8 text-[#6B6B6B]">
          Practice with low, medium, and high opacity. If you use a mouse
          without pressure sensitivity, you can still learn brush control
          by adjusting the settings manually.
        </p>
      </section>

      <section className="mt-8 rounded-xl border border-[#E5E5E5] p-6">
        <h2 className="text-2xl font-bold text-[#171717]">
          4. Practical brush exercise
        </h2>

        <p className="mt-3 leading-7 text-[#6B6B6B]">
          Create a brush practice sheet. Focus on steady movement and
          consistency rather than making a finished artwork.
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
          Mark this lesson complete after reviewing the content and
          practicing the exercises.
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
