
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "artforge-color-light-harmony-atmosphere-completed";
const CHECKLIST_KEY = "artforge-color-light-harmony-atmosphere-checklist";

const exercises = [
  "Choose three neighboring colors to create an analogous palette.",
  "Create a palette using complementary colors.",
  "Make two small versions of the same cartoon object with different moods.",
  "Create a final cartoon illustration using a limited, harmonious palette.",
];

export default function ColorHarmonyAndAtmospherePage() {
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
          Color & Light · Lesson 04
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#171717] sm:text-5xl">
          Color Harmony and Atmosphere
        </h1>

        <p className="mt-5 text-base leading-8 text-[#6B6B6B]">
          Color harmony is about choosing colors that work well together.
          Atmosphere is the mood or feeling your colors create. Together,
          they help your cartoon illustrations feel cohesive, expressive,
          and intentional.
        </p>
      </section>

      <section className="mt-10 rounded-xl border border-[#E5E5E5] p-6">
        <h2 className="text-2xl font-bold text-[#171717]">
          1. Build a harmonious palette
        </h2>

        <p className="mt-4 leading-8 text-[#6B6B6B]">
          A palette is the set of colors you choose for an illustration.
          Instead of using every color available, start with a few colors
          that have a clear relationship.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-[#FFF5EF] p-4">
            <h3 className="font-semibold text-[#171717]">
              Analogous colors
            </h3>
            <div className="mt-4 flex overflow-hidden rounded-lg">
              <div className="h-12 flex-1 bg-[#E86A33]" />
              <div className="h-12 flex-1 bg-[#F5B942]" />
              <div className="h-12 flex-1 bg-[#A8B85A]" />
            </div>
            <p className="mt-3 text-sm leading-6 text-[#6B6B6B]">
              Colors close to each other on the color wheel. They often
              create a unified, gentle palette.
            </p>
          </div>

          <div className="rounded-lg bg-[#FFF5EF] p-4">
            <h3 className="font-semibold text-[#171717]">
              Complementary colors
            </h3>
            <div className="mt-4 flex overflow-hidden rounded-lg">
              <div className="h-12 flex-1 bg-[#E86A33]" />
              <div className="h-12 flex-1 bg-[#FFFFFF]" />
              <div className="h-12 flex-1 bg-[#337FE8]" />
            </div>
            <p className="mt-3 text-sm leading-6 text-[#6B6B6B]">
              Colors opposite each other on the wheel. They can create
              strong contrast and make important details stand out.
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-[#6B6B6B]">
          Tip: Use one color as the main color, another as a supporting
          color, and a third for small accents.
        </p>
      </section>

      <section className="mt-8 rounded-xl border border-[#E5E5E5] p-6">
        <h2 className="text-2xl font-bold text-[#171717]">
          2. Use color to create a mood
        </h2>

        <p className="mt-4 leading-8 text-[#6B6B6B]">
          Color choices influence how a scene feels. These are common
          associations, not fixed rules; the surrounding colors and
          context also affect the mood.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-[#E5E5E5] p-4">
            <div className="h-20 rounded-lg bg-gradient-to-r from-[#F5B942] to-[#E86A33]" />
            <h3 className="mt-3 font-semibold text-[#171717]">
              Warm and cheerful
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">
              Try yellows, oranges, and warm reds.
            </p>
          </div>

          <div className="rounded-lg border border-[#E5E5E5] p-4">
            <div className="h-20 rounded-lg bg-gradient-to-r from-[#77BCE8] to-[#5668A8]" />
            <h3 className="mt-3 font-semibold text-[#171717]">
              Calm and quiet
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">
              Try blues, blue-greens, and softer values.
            </p>
          </div>

          <div className="rounded-lg border border-[#E5E5E5] p-4">
            <div className="h-20 rounded-lg bg-gradient-to-r from-[#44345E] to-[#9A5276]" />
            <h3 className="mt-3 font-semibold text-[#171717]">
              Mysterious
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">
              Try deep purples, muted reds, and darker values.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-xl border border-[#E5E5E5] p-6">
        <h2 className="text-2xl font-bold text-[#171717]">
          3. Create depth with color
        </h2>

        <p className="mt-4 leading-8 text-[#6B6B6B]">
          Color can help separate objects at different distances. For
          example, distant objects may appear lighter, less detailed, or
          closer to the surrounding atmosphere. Nearby objects can have
          stronger contrast and clearer edges.
        </p>

        <ul className="mt-4 list-disc space-y-3 pl-6 leading-7 text-[#6B6B6B]">
          <li>
            <strong className="text-[#171717]">Foreground:</strong>{" "}
            use clearer shapes and stronger contrast for nearby objects.
          </li>
          <li>
            <strong className="text-[#171717]">Middle ground:</strong>{" "}
            balance contrast and detail.
          </li>
          <li>
            <strong className="text-[#171717]">Background:</strong>{" "}
            try softer contrast and less detail to suggest distance.
          </li>
        </ul>
      </section>

      <section className="mt-8 rounded-xl border border-[#E5E5E5] p-6">
        <h2 className="text-2xl font-bold text-[#171717]">
          4. Practical exercise
        </h2>

        <p className="mt-3 leading-7 text-[#6B6B6B]">
          Draw a simple cartoon character or object twice. Use a warm
          palette for one version and a cool palette for the other.
          Compare how the mood changes, then choose the version that
          best communicates your intended feeling.
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
          creating your own color palette.
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
