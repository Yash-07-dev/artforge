
"use client";

import { useEffect, useState } from "react";

const lessons = [
  {
    title: "Color Theory Basics",
    key: "artforge-color-light-theory-completed",
  },
  {
    title: "Value and Contrast",
    key: "artforge-color-light-value-contrast-completed",
  },
  {
    title: "Light and Shadow",
    key: "artforge-color-light-light-shadow-completed",
  },
  {
    title: "Color Harmony and Atmosphere",
    key: "artforge-color-light-harmony-atmosphere-completed",
  },
];

export default function ColorLightProgress() {
  const [completedLessons, setCompletedLessons] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    function loadProgress() {
      try {
        const completed = lessons
          .filter((lesson) => localStorage.getItem(lesson.key) === "true")
          .map((lesson) => lesson.key);

        setCompletedLessons(completed);
      } catch {
        setCompletedLessons([]);
      } finally {
        setIsLoaded(true);
      }
    }

    loadProgress();

    window.addEventListener("focus", loadProgress);

    return () => {
      window.removeEventListener("focus", loadProgress);
    };
  }, []);

  const completedCount = completedLessons.length;
  const percentage = Math.round(
    (completedCount / lessons.length) * 100
  );

  return (
    <section className="mt-10 rounded-2xl border border-[#E5E5E5] p-6 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-[#E86A33]">
            Your learning journey
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#171717]">
            Color & Light Progress
          </h2>

          <p className="mt-2 text-sm text-[#6B6B6B]">
            Track your progress through all four lessons.
          </p>
        </div>

        <div className="sm:text-right">
          <p className="text-3xl font-bold text-[#E86A33]">
            {isLoaded ? percentage : 0}%
          </p>

          <p className="mt-1 text-sm text-[#6B6B6B]">
            {isLoaded ? completedCount : 0} of {lessons.length} completed
          </p>
        </div>
      </div>

      <div
        className="mt-6 h-3 overflow-hidden rounded-full bg-[#F0F0F0]"
        role="progressbar"
        aria-label="Color and Light course completion"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={isLoaded ? percentage : 0}
      >
        <div
          className="h-full rounded-full bg-[#E86A33] transition-all duration-500"
          style={{ width: `${isLoaded ? percentage : 0}%` }}
        />
      </div>

      <div className="mt-6 space-y-3">
        {lessons.map((lesson, index) => {
          const isCompleted = completedLessons.includes(lesson.key);

          return (
            <div
              key={lesson.key}
              className="flex items-center gap-3 rounded-lg bg-[#FFF5EF] p-4"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-[#E86A33]">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="flex-1 text-sm font-medium text-[#171717]">
                {lesson.title}
              </span>

              <span
                className={`text-xs font-semibold ${
                  isCompleted ? "text-green-700" : "text-[#6B6B6B]"
                }`}
              >
                {isCompleted ? "Completed ✓" : "Not completed"}
              </span>
            </div>
          );
        })}
      </div>

      {!isLoaded && (
        <p className="mt-4 text-sm text-[#6B6B6B]">
          Loading your progress...
        </p>
      )}
    </section>
  );
}
