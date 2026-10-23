
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "artforge-digital-painting-getting-started-completed";
const CHECKLIST_KEY = "artforge-digital-painting-getting-started-checklist";

const exercises = [
  "Open your digital painting application and create a new canvas.",
  "Try a small, medium, and large brush size.",
  "Practice light and dark strokes using different opacity settings.",
  "Save your practice artwork.",
];

export default function GettingStartedPage() {
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
      // Keep the default progress if saved data cannot be read.
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
      // The checklist remains usable for the current page session.
    }
  }

  function toggleCompletion() {
    const updated = !isCompleted;
    setIsCompleted(updated);

    try {
      localStorage.setItem(STORAGE_KEY, String(updated));
    } catch {
      // The completion state remains usable for this page session.
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
          Digital Painting · Lesson 01
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#171717] sm:text-5xl">
          Getting Started with Digital Painting
        </h1>

        <p className="mt-5 text-base leading-8 text-[#6B6B6B]">
          Digital painting lets you create artwork using a digital canvas,
          brushes, colors, and layers. You do not need advanced tools to begin.
          Focus on learning your workspace and practicing simple strokes first.
        </p>
      </section>

      <section className="mt-10 rounded-xl border border-[#E5E5E5] p-6">
        <h2 className="text-2xl font-bold text-[#171717]">
          1. Understand your workspace
        </h2>

        <p className="mt-4 leading-8 text-[#6B6B6B]">
          Most digital painting applications provide a canvas, brush tools,
          color selector, layers panel, and undo/redo controls. The exact
          arrangement depends on the application you use.
        </p>

        <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-[#6B6B6B]">
          <li>
            <strong className="text-[#171717]">Canvas:</strong> the area where
            you create your artwork.
          </li>
          <li>
            <strong className="text-[#171717]">Brush:</strong> controls how
            your marks look and feel.
          </li>
          <li>
            <strong className="text-[#171717]">Color selector:</strong> lets
            you choose the colors you paint with.
          </li>
          <li>
            <strong className="text-[#171717]">Layers:</strong> help you
            separate and organize parts of your artwork.
          </li>
        </ul>
      </section>

      <section className="mt-8 rounded-xl border border-[#E5E5E5] p-6">
        <h2 className="text-2xl font-bold text-[#171717]">
          2. Learn basic brush controls
        </h2>

        <p className="mt-4 leading-8 text-[#6B6B6B]">
          Brush size changes the thickness of your strokes. Opacity changes
          how transparent a stroke appears. Pressure sensitivity, when
          supported by your device and brush, can vary the thickness or
          opacity according to how firmly you press.
        </p>

        <p className="mt-4 leading-8 text-[#6B6B6B]">
          Start with one simple brush. Practice making thin lines, thick
          lines, soft strokes, and firm strokes before exploring complex
          brushes.
        </p>
      </section>

      <section className="mt-8 rounded-xl border border-[#E5E5E5] p-6">
        <h2 className="text-2xl font-bold text-[#171717]">
          3. Your practical exercise
        </h2>

        <p className="mt-3 leading-7 text-[#6B6B6B]">
          Create a simple brush practice sheet. Draw rows of lines and
          shapes using different brush sizes and opacity settings. The goal
          is to understand your tools, not to create a finished illustration.
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
          Mark this lesson complete after you have reviewed the content and
          tried the exercise.
        </p>

        <button
          type="button"
          disabled={!isLoaded}
          onClick={toggleCompletion}
          className="mt-5 rounded-lg bg-[#E86A33] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#cf5727] disabled:opacity-50"
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
