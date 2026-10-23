
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "artforge-color-light-value-contrast-completed";
const CHECKLIST_KEY = "artforge-color-light-value-contrast-checklist";

const exercises = [
  "Draw five boxes ranging from white to black.",
  "Create a simple cartoon object using only three values: light, middle, and dark.",
  "Make a small grayscale drawing before adding any colors.",
  "Compare two versions of an object: one with low contrast and one with high contrast.",
];

export default function ValueAndContrastPage() {
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
          Color & Light · Lesson 02
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#171717] sm:text-5xl">
          Value and Contrast
        </h1>

        <p className="mt-5 text-base leading-8 text-[#6B6B6B]">
          Value describes how light or dark a color appears. Contrast is
          the difference between values or colors. Learning to control
          both helps your cartoon illustrations look clear, readable,
          and three-dimensional.
        </p>
      </section>

      <section className="mt-10 rounded-xl border border-[#E5E5E5] p-6">
        <h2 className="text-2xl font-bold text-[#171717]">
          1. Understand value
        </h2>

        <p className="mt-4 leading-8 text-[#6B6B6B]">
          Imagine a scale that starts at white, passes through several
          grays, and ends at black. This is a value scale. Every color
          also has a value, from light to dark.
        </p>

        <div className="mt-5 grid grid-cols-5 overflow-hidden rounded-lg">
          {[
            { label: "Light", color: "#F5F5F5", text: "#171717" },
            { label: "Light-mid", color: "#CFCFCF", text: "#171717" },
            { label: "Middle", color: "#929292", text: "#171717" },
            { label: "Dark-mid", color: "#555555", text: "#FFFFFF" },
            { label: "Dark", color: "#222222", text: "#FFFFFF" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex h-24 items-end justify-center p-2"
              style={{ backgroundColor: item.color, color: item.text }}
            >
              <span className="text-center text-xs font-medium">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-4 leading-7 text-[#6B6B6B]">
          Artists often plan the light and dark areas first. A drawing
          can have attractive colors but still feel confusing if its
          important shapes have similar values.
        </p>
      </section>

      <section className="mt-8 rounded-xl border border-[#E5E5E5] p-6">
        <h2 className="text-2xl font-bold text-[#171717]">
          2. What is contrast?
        </h2>

        <p className="mt-4 leading-8 text-[#6B6B6B]">
          Contrast is the difference between two visual elements.
          Strong light-dark contrast makes a shape stand out. Low
          contrast creates a softer, quieter appearance.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-[#F2F2F2] p-4">
            <h3 className="font-semibold text-[#171717]">Low contrast</h3>
            <div className="mt-4 flex h-24 items-center justify-center rounded-lg bg-[#D8D8D8]">
              <div className="h-12 w-12 rounded-full bg-[#BDBDBD]" />
            </div>
            <p className="mt-3 text-sm leading-6 text-[#6B6B6B]">
              Similar values blend together, creating a gentle effect.
            </p>
          </div>

          <div className="rounded-lg bg-[#F2F2F2] p-4">
            <h3 className="font-semibold text-[#171717]">High contrast</h3>
            <div className="mt-4 flex h-24 items-center justify-center rounded-lg bg-[#222222]">
              <div className="h-12 w-12 rounded-full bg-[#FFFFFF]" />
            </div>
            <p className="mt-3 text-sm leading-6 text-[#6B6B6B]">
              Different values separate clearly and attract attention.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-xl border border-[#E5E5E5] p-6">
        <h2 className="text-2xl font-bold text-[#171717]">
          3. Use three main values
        </h2>

        <p className="mt-4 leading-8 text-[#6B6B6B]">
          A useful beginner exercise is to shade an object with only
          three value groups:
        </p>

        <ul className="mt-4 list-disc space-y-3 pl-6 leading-7 text-[#6B6B6B]">
          <li>
            <strong className="text-[#171717]">Light:</strong> the
            areas facing the light source.
          </li>
          <li>
            <strong className="text-[#171717]">Middle value:</strong>{" "}
            the main body of the object.
          </li>
          <li>
            <strong className="text-[#171717]">Shadow:</strong> the
            areas receiving less light.
          </li>
        </ul>

        <p className="mt-4 leading-7 text-[#6B6B6B]">
          For cartoon art, clear value shapes are often more effective
          than adding many tiny shading details.
        </p>
      </section>

      <section className="mt-8 rounded-xl border border-[#E5E5E5] p-6">
        <h2 className="text-2xl font-bold text-[#171717]">
          4. Practical exercise
        </h2>

        <p className="mt-3 leading-7 text-[#6B6B6B]">
          Start with a simple cartoon character, fruit, or cup. Draw
          it in grayscale and separate its light, middle, and shadow
          shapes. Once the values read clearly, you can add color.
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
          trying the grayscale exercise.
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
