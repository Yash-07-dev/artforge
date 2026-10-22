
"use client";

import Link from "next/link";
import { useState } from "react";
import LessonSidebar from "@/components/LessonSidebar";

const exercises = [
  "Warm up by drawing straight lines and circles for two minutes.",
  "Sketch a simple object using light, loose lines.",
  "Refine the sketch by adding a few important details.",
];

export default function SketchingLessonPage() {
  const [completed, setCompleted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [checkedItems, setCheckedItems] = useState([false, false, false]);

  const completedExercises = checkedItems.filter(Boolean).length;

  return (
    <main className="min-h-screen w-full px-6 py-12">
      <div
        className={`mx-auto grid gap-8 ${
          isSidebarOpen
            ? "max-w-7xl grid-cols-1 md:grid-cols-[auto_minmax(0,1fr)]"
            : "max-w-5xl grid-cols-1"
        }`}
      >
        <LessonSidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen((previous) => !previous)}
        />

        <div className="min-w-0">
          <Link
            href="/learn/drawing-fundamentals"
            className="text-sm font-medium text-[#E86A33] hover:underline"
          >
            ← Back to Drawing Fundamentals
          </Link>

          <section className="mt-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#E86A33]">
              Lesson 04 · Practice
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#171717] sm:text-5xl">
              Practice Sketching
            </h1>

            <p className="mt-5 text-base leading-8 text-[#6B6B6B]">
              Sketching helps you explore ideas quickly without worrying about
              perfect lines. Focus on the overall shape, movement, and structure
              before adding small details.
            </p>
          </section>

          <section className="mt-10 rounded-xl border border-[#E5E5E5] p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-[#171717]">
              What you'll learn
            </h2>

            <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-[#6B6B6B]">
              <li>Warm up your hand with simple lines and shapes.</li>
              <li>Capture the basic structure of an object.</li>
              <li>Build confidence through regular drawing practice.</li>
            </ul>

            <h2 className="mt-8 text-2xl font-bold text-[#171717]">
              Your practice exercise
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#6B6B6B]">
              Choose a cup, bottle, plant, or another simple object. Begin with
              loose lines and basic shapes. Check its proportions, refine the
              outline, and add only a few important details. Don't erase every
              imperfect line—focus on learning through repetition.
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
        </div>
      </div>
    </main>
  );
}
