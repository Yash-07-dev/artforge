
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "artforge-color-light-theory-completed";
const CHECKLIST_KEY = "artforge-color-light-theory-checklist";

const exercises = [
  "Draw or study a color wheel with primary and secondary colors.",
  "Mix or select orange, green, and purple as secondary colors.",
  "Choose a warm color palette and a cool color palette.",
  "Create a small cartoon object using only three or four colors.",
];

export default function ColorTheoryBasicsPage() {
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
      // Keep the checklist usable during this session.
    }
  }

  function toggleCompletion() {
    const updated = !isCompleted;
    setIsCompleted(updated);

    try {
      localStorage.setItem(STORAGE_KEY, String(updated));
    } catch {
      // Keep the completion control usable during this session.
    }
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-12">
      <Link
        href="/learn/color-light"
        className="text-sm font-medium text-[#E86A33] hover:underline"
      >
        ← Back to Color & Light
      </Link>

      <section className="mt-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#E86A33]">
          Color & Light · Lesson 01
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#171717] sm:text-5xl">
          Color Theory Basics
        </h1>

        <p className="mt-5 text-base leading-8 text-[#6B6B6B]">
          Color theory helps artists choose colors that work well together.
          Understanding the color wheel, warm and cool colors, and simple
          color relationships can make illustrations clearer and more
          expressive.
        </p>
      </section>

      <section className="mt-10 rounded-xl border border-[#E5E5E5] p-6">
        <h2 className="text-2xl font-bold text-[#171717]">
          1. Understand the color wheel
        </h2>

        <p className="mt-4 leading-8 text-[#6B6B6B]">
          A traditional artist's color wheel organizes hues into a circle.
          It helps you see how colors relate to one another and provides
          a useful starting point for choosing a palette.
        </p>

        <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-[#6B6B6B]">
          <li>
            <strong className="text-[#171717]">Primary colors:</strong>{" "}
            red, yellow, and blue in the traditional paint color model.
          </li>
          <li>
            <strong className="text-[#171717]">Secondary colors:</strong>{" "}
            orange, green, and purple, formed by mixing neighboring
            primary colors in that model.
          </li>
          <li>
            <strong className="text-[#171717]">Intermediate colors:</strong>{" "}
            colors between primary and secondary hues.
          </li>
        </ul>

        <p className="mt-4 text-sm leading-6 text-[#6B6B6B]">
          Digital screens use a different light-based color model, so
          screen colors and paint mixtures do not behave exactly the same.
        </p>
      </section>

      <section className="mt-8 rounded-xl border border-[#E5E5E5] p-6">
        <h2 className="text-2xl font-bold text-[#171717]">
          2. Warm and cool colors
        </h2>

        <p className="mt-4 leading-8 text-[#6B6B6B]">
          Reds, oranges, and many yellows are often described as warm
          colors. Blues and many blue-greens are often described as cool.
          These associations can help establish mood, though context
          affects how a color feels.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-[#FFF0E8] p-4">
            <h3 className="font-semibold text-[#171717]">Warm palette</h3>
            <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">
              Try red, orange, and yellow for a lively or sunny mood.
            </p>
          </div>

          <div className="rounded-lg bg-[#EAF4FF] p-4">
            <h3 className="font-semibold text-[#171717]">Cool palette</h3>
            <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">
              Try blue, teal, and violet for a calm or evening atmosphere.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-xl border border-[#E5E5E5] p-6">
        <h2 className="text-2xl font-bold text-[#171717]">
          3. Simple color relationships
        </h2>

        <ul className="mt-4 list-disc space-y-3 pl-6 leading-7 text-[#6B6B6B]">
          <li>
            <strong className="text-[#171717]">Complementary:</strong>{" "}
            colors opposite each other on the wheel, often useful for
            strong contrast.
          </li>
          <li>
            <strong className="text-[#171717]">Analogous:</strong>{" "}
            neighboring colors, often useful for a unified palette.
          </li>
          <li>
            <strong className="text-[#171717]">Monochromatic:</strong>{" "}
            variations of one hue using different lightness and saturation.
          </li>
        </ul>
      </section>

      <section className="mt-8 rounded-xl border border-[#E5E5E5] p-6">
        <h2 className="text-2xl font-bold text-[#171717]">
          4. Practical exercise
        </h2>

        <p className="mt-3 leading-7 text-[#6B6B6B]">
          Create a small cartoon illustration using a limited palette.
          Try one warm palette and one cool palette, then compare how
          each changes the mood of your artwork.
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
          trying the palette exercise.
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
