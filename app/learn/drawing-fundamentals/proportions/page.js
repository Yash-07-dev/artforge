
"use client";

import Link from "next/link";
import { useState } from "react";

export default function ProportionsLessonPage() {
  const [completed, setCompleted] = useState(false);
  const [checkedItems, setCheckedItems] = useState([false, false, false]);

  const exercises = [
    "Draw three objects using simple shapes.",
    "Compare the height and width of each object.",
    "Draw a simple cartoon character with a large head and smaller body.",
  ];

  const completedExercises = checkedItems.filter(Boolean).length;

  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-6 py-12">
      <Link
        href="/learn/drawing-fundamentals"
        className="text-sm font-medium text-[#E86A33] hover:underline"
      >
        ← Back to Drawing Fundamentals
      </Link>

      <section className="mt-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#E86A33]">
          Lesson 02 · Beginner
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#171717] sm:text-5xl">
          Understand Proportions
        </h1>

        <p className="mt-5 text-base leading-8 text-[#6B6B6B]">
          Proportion describes the size of one part of a drawing compared
          with another. Learning to compare height, width, and spacing helps
          you draw objects and cartoon characters more convincingly.
        </p>
      </section>

      <section className="mt-10 rounded-xl border border-[#E5E5E5] p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-[#171717]">
          What you'll learn
        </h2>

        <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-[#6B6B6B]">
          <li>Compare the height and width of objects.</li>
          <li>Break a character into simple proportional parts.</li>
          <li>Use basic size relationships to improve your sketches.</li>
        </ul>

        <h2 className="mt-8 text-2xl font-bold text-[#171717]">
          Your practice exercise
        </h2>

        <p className="mt-3 text-sm leading-7 text-[#6B6B6B]">
          Draw a simple cartoon character. Start with a circle for the
          head and a smaller shape for the body. Compare their sizes, then
          add arms and legs. Try a second version with a larger head to see
          how proportions change the character's style.
        </p>

        <div className="mt-6 rounded-lg bg-[#FFF5EF] p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-semibold text-[#171717]">
              Practice checklist
            </p>

            <p className="text-sm text-[#6B6B6B]" aria-live="polite">
              {completedExercises} of {exercises.length} completed
            </p>
          </div>

          <div className="mt-4 space-y-4">
            {exercises.map((exercise, index) => (
              <label
                key={exercise}
                className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-[#6B6B6B]"
              >
                <input
                  type="checkbox"
                  checked={checkedItems[index]}
                  onChange={() =>
                    setCheckedItems((previous) =>
                      previous.map((checked, itemIndex) =>
                        itemIndex === index ? !checked : checked
                      )
                    )
                  }
                  className="mt-1 accent-[#E86A33]"
                />

                <span>{exercise}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setCompleted((previous) => !previous)}
          className={`mt-8 rounded-full px-6 py-3 text-sm font-semibold transition ${
            completed
              ? "border border-[#E86A33] bg-white text-[#E86A33]"
              : "bg-[#E86A33] text-white hover:bg-[#C95425]"
          }`}
        >
          {completed ? "Mark as incomplete" : "Mark lesson as complete"}
        </button>

        {completed && (
          <p className="mt-4 text-sm font-medium text-green-700" role="status">
            Great work! You've completed this lesson.
          </p>
        )}
      </section>
    </main>
  );
}
