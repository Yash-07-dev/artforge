
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import LessonSidebar from "@/components/LessonSidebar";

const STORAGE_KEY = "artforge-lesson-basic-shapes-completed";

export default function BasicShapesLessonPage() {
  const [completed, setCompleted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProgressLoaded, setIsProgressLoaded] = useState(false);

  // Load saved completion status from the browser.
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(STORAGE_KEY);
      setCompleted(savedProgress === "true");
    } catch (error) {
      console.error("Unable to load lesson progress:", error);
    } finally {
      setIsProgressLoaded(true);
    }
  }, []);

  // Save completion status whenever it changes.
  useEffect(() => {
    if (!isProgressLoaded) return;

    try {
      localStorage.setItem(STORAGE_KEY, String(completed));
    } catch (error) {
      console.error("Unable to save lesson progress:", error);
    }
  }, [completed, isProgressLoaded]);

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
              Lesson 01 · Beginner
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#171717] sm:text-5xl">
              Learn Basic Shapes
            </h1>

            <p className="mt-5 text-base leading-8 text-[#6B6B6B]">
              Almost every complex drawing can be broken down into simple shapes.
              Learning to see circles, rectangles, and cylinders makes drawing
              objects and characters easier.
            </p>
          </section>

          <section className="mt-10 rounded-xl border border-[#E5E5E5] p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-[#171717]">
              What you'll learn
            </h2>

            <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-[#6B6B6B]">
              <li>Identify circles, squares, rectangles, and triangles.</li>
              <li>Break everyday objects into simple shapes.</li>
              <li>Combine shapes to create a simple drawing.</li>
            </ul>

            <h2 className="mt-8 text-2xl font-bold text-[#171717]">
              Your practice exercise
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#6B6B6B]">
              Take a pencil and paper. Draw a simple house using a rectangle
              for the walls, a triangle for the roof, and small rectangles
              for the door and windows. Then try combining circles and
              rectangles to sketch a simple cartoon character.
            </p>

            <div className="mt-6 rounded-lg bg-[#FFF5EF] p-5">
              <p className="font-semibold text-[#171717]">
                Practice checklist
              </p>

              <ul className="mt-3 space-y-3 text-sm text-[#6B6B6B]">
                <li>Draw at least five circles.</li>
                <li>Draw five rectangles and three triangles.</li>
                <li>Combine shapes into one recognizable object.</li>
              </ul>
            </div>

            <button
              type="button"
              disabled={!isProgressLoaded}
              onClick={() => setCompleted((previous) => !previous)}
              className={`mt-8 rounded-full px-6 py-3 text-sm font-semibold transition ${
                completed
                  ? "border border-[#E86A33] bg-white text-[#E86A33]"
                  : "bg-[#E86A33] text-white hover:bg-[#C95425]"
              } disabled:cursor-wait disabled:opacity-60`}
            >
              {!isProgressLoaded
                ? "Loading progress..."
                : completed
                  ? "Mark as incomplete"
                  : "Mark lesson as complete"}
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
