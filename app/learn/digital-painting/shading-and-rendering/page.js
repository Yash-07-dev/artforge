
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY =
  "artforge-digital-painting-shading-completed";

const CHECKLIST_KEY =
  "artforge-digital-painting-shading-checklist";

const exercises = [
  "Draw a sphere, cube, or simple object.",
  "Choose a light source and identify the lit and shadowed sides.",
  "Add a cast shadow on the surface beneath the object.",
  "Practice a hard-edged shadow and a soft-edged transition.",
];

export default function ShadingAndRenderingPage() {
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
      // Use default progress if saved data cannot be read.
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
          Digital Painting · Lesson 04
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#171717] sm:text-5xl">
          Shading and Rendering
        </h1>

        <p className="mt-5 text-base leading-8 text-[#6B6B6B]">
          Learn to make objects look three-dimensional through light,
          shadow, and value. Start with simple forms before applying
          shading techniques to characters, props, and illustrations.
        </p>
      </section>

      <section className="mt-10 rounded-xl border border-[#E5E5E5] p-6">
        <h2 className="text-2xl font-bold text-[#171717]">
          1. Understand light and value
        </h2>

        <p className="mt-4 leading-8 text-[#6B6B6B]">
          Value describes how light or dark a color appears. The side
          facing a light source is generally brighter, while areas turned
          away from the light become darker. A simple grayscale study
          helps you understand form without the distraction of color.
        </p>
      </section>

      <section className="mt-8 rounded-xl border border-[#E5E5E5] p-6">
        <h2 className="text-2xl font-bold text-[#171717]">
          2. Learn the main shadow areas
        </h2>

        <ul className="mt-4 list-disc space-y-3 pl-6 leading-7 text-[#6B6B6B]">
          <li>
            <strong className="text-[#171717]">Light area:</strong> the
            part receiving more direct light.
          </li>
          <li>
            <strong className="text-[#171717]">Form shadow:</strong> the
            area turned away from the light source.
          </li>
          <li>
            <strong className="text-[#171717]">Cast shadow:</strong> the
            shadow an object projects onto another surface.
          </li>
          <li>
            <strong className="text-[#171717]">Highlight:</strong> a
            particularly bright area where light reflects toward the viewer.
          </li>
        </ul>
      </section>

      <section className="mt-8 rounded-xl border border-[#E5E5E5] p-6">
        <h2 className="text-2xl font-bold text-[#171717]">
          3. Hard and soft edges
        </h2>

        <p className="mt-4 leading-8 text-[#6B6B6B]">
          Hard edges create clear transitions between shapes and are useful
          for crisp cartoon shading. Soft edges create gradual transitions
          and can help suggest rounded forms or atmospheric effects.
          Choose edges intentionally to suit your art style.
        </p>
      </section>

      <section className="mt-8 rounded-xl border border-[#E5E5E5] p-6">
        <h2 className="text-2xl font-bold text-[#171717]">
          4. Practical shading exercise
        </h2>

        <p className="mt-3 leading-7 text-[#6B6B6B]">
          Draw a sphere or cube using a single light source. Use a few
          distinct values, add a cast shadow, and compare hard and soft
          edges. Aim for readable form rather than excessive detail.
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
          Mark this lesson complete after reviewing the concepts and
          trying the shading exercise.
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
