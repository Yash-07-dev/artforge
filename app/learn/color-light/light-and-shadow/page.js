
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "artforge-color-light-light-shadow-completed";
const CHECKLIST_KEY = "artforge-color-light-light-shadow-checklist";

const exercises = [
  "Draw a sphere and mark the direction of its light source.",
  "Add a light area, a middle value, and a form shadow to the sphere.",
  "Draw a cast shadow on the ground opposite the light direction.",
  "Shade a simple cartoon object using clear, readable shadow shapes.",
];

export default function LightAndShadowPage() {
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
          Color & Light · Lesson 03
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#171717] sm:text-5xl">
          Light and Shadow
        </h1>

        <p className="mt-5 text-base leading-8 text-[#6B6B6B]">
          Light and shadow help flat drawings feel solid and dimensional.
          By choosing a clear light source and organizing shadow shapes,
          you can give cartoon characters and objects form without
          adding unnecessary detail.
        </p>
      </section>

      <section className="mt-10 rounded-xl border border-[#E5E5E5] p-6">
        <h2 className="text-2xl font-bold text-[#171717]">
          1. Identify the light source
        </h2>

        <p className="mt-4 leading-8 text-[#6B6B6B]">
          A light source is what illuminates your subject. It might be
          the sun, a lamp, a candle, or another object producing light.
          Decide where the light comes from before drawing shadows.
        </p>

        <div className="mt-5 rounded-xl bg-[#FFF5EF] p-5">
          <div className="flex items-center justify-center gap-5">
            <div className="flex flex-col items-center gap-2">
              <div className="h-12 w-12 rounded-full bg-[#F5B942] shadow-lg shadow-[#F5B942]/30" />
              <span className="text-xs font-semibold text-[#6B6B6B]">
                Light source
              </span>
            </div>

            <span className="text-2xl text-[#E86A33]">→</span>

            <div className="flex flex-col items-center gap-2">
              <div className="h-20 w-20 rounded-full bg-[#E7A77D] shadow-inner" />
              <span className="text-xs font-semibold text-[#6B6B6B]">
                Object
              </span>
            </div>
          </div>

          <p className="mt-4 text-center text-sm leading-6 text-[#6B6B6B]">
            Decide on one main light direction to keep the lighting
            consistent across your illustration.
          </p>
        </div>
      </section>

      <section className="mt-8 rounded-xl border border-[#E5E5E5] p-6">
        <h2 className="text-2xl font-bold text-[#171717]">
          2. Understand the main shadow types
        </h2>

        <div className="mt-5 space-y-4">
          <div className="rounded-lg bg-[#F7F7F7] p-4">
            <h3 className="font-semibold text-[#171717]">
              Form shadow
            </h3>
            <p className="mt-2 text-sm leading-7 text-[#6B6B6B]">
              The darker area on the object itself, where less light
              reaches its surface.
            </p>
          </div>

          <div className="rounded-lg bg-[#F7F7F7] p-4">
            <h3 className="font-semibold text-[#171717]">
              Cast shadow
            </h3>
            <p className="mt-2 text-sm leading-7 text-[#6B6B6B]">
              The shadow an object projects onto the ground or another
              surface. It generally falls away from the light source.
            </p>
          </div>

          <div className="rounded-lg bg-[#F7F7F7] p-4">
            <h3 className="font-semibold text-[#171717]">
              Highlight
            </h3>
            <p className="mt-2 text-sm leading-7 text-[#6B6B6B]">
              A bright area where light strongly reaches the surface.
              Highlights can help show the material and shape of an object.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-xl border border-[#E5E5E5] p-6">
        <h2 className="text-2xl font-bold text-[#171717]">
          3. Use a simple three-part shading method
        </h2>

        <p className="mt-4 leading-8 text-[#6B6B6B]">
          Start with three clear groups instead of trying to blend
          everything immediately.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-[#E5E5E5] p-4">
            <div className="h-20 rounded-md bg-[#F3CBAE]" />
            <h3 className="mt-3 font-semibold text-[#171717]">Light</h3>
            <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">
              The side facing the light source.
            </p>
          </div>

          <div className="rounded-lg border border-[#E5E5E5] p-4">
            <div className="h-20 rounded-md bg-[#C58A65]" />
            <h3 className="mt-3 font-semibold text-[#171717]">
              Midtone
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">
              The main value describing the surface.
            </p>
          </div>

          <div className="rounded-lg border border-[#E5E5E5] p-4">
            <div className="h-20 rounded-md bg-[#70452F]" />
            <h3 className="mt-3 font-semibold text-[#171717]">
              Shadow
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">
              The side receiving less direct light.
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-[#6B6B6B]">
          For a clean cartoon style, simple shadow shapes can work better
          than lots of tiny gradients.
        </p>
      </section>

      <section className="mt-8 rounded-xl border border-[#E5E5E5] p-6">
        <h2 className="text-2xl font-bold text-[#171717]">
          4. Practical exercise
        </h2>

        <p className="mt-3 leading-7 text-[#6B6B6B]">
          Draw a sphere, cube, or simple cartoon character. Pick a light
          direction, shade the object, and place its cast shadow on the
          ground. Keep the light direction consistent.
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
          practising your light and shadow shapes.
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
