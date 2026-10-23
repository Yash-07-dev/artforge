
"use client";

import { useEffect, useState } from "react";

const lessons = [
  {
    title: "Learn Basic Shapes",
    key: "artforge-lesson-basic-shapes-completed",
  },
  {
    title: "Understand Proportions",
    key: "artforge-lesson-proportions-completed",
  },
  {
    title: "Explore Perspective",
    key: "artforge-lesson-perspective-completed",
  },
  {
    title: "Practice Sketching",
    key: "artforge-lesson-sketching-completed",
  },
];

export default function CourseProgress() {
  const [completedLessons, setCompletedLessons] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    function loadProgress() {
      const completed = lessons
        .filter((lesson) => {
          const value = localStorage.getItem(lesson.key);

          return value === "true" || value === "1";
        })
        .map((lesson) => lesson.key);

      setCompletedLessons(completed);
      setIsLoaded(true);
    }

    loadProgress();

    window.addEventListener("storage", loadProgress);
    window.addEventListener("focus", loadProgress);

    return () => {
      window.removeEventListener("storage", loadProgress);
      window.removeEventListener("focus", loadProgress);
    };
  }, []);

  const completedCount = completedLessons.length;
  const totalLessons = lessons.length;
  const percentage = Math.round(
    (completedCount / totalLessons) * 100
  );

  return (
    <section className="mt-10 rounded-2xl border border-[#F0D9CC] bg-[#FFF5EF] p-6 sm:p-8">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-[#E86A33]">
            Your Progress
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#171717]">
            Keep creating, keep improving.
          </h2>

          <p className="mt-2 text-sm text-[#6B6B6B]">
            Every lesson brings you one step closer to stronger drawing skills.
          </p>
        </div>

        <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center self-start rounded-full border-4 border-[#E86A33] bg-white sm:self-center">
          <span className="text-xl font-bold text-[#171717]">
            {isLoaded ? `${percentage}%` : "—"}
          </span>
          <span className="text-xs text-[#6B6B6B]">Complete</span>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-[#171717]">
            Course completion
          </span>

          <span className="font-semibold text-[#E86A33]">
            {isLoaded
              ? `${completedCount} of ${totalLessons} lessons`
              : "Loading progress..."}
          </span>
        </div>

        <div
          className="h-3 overflow-hidden rounded-full bg-white"
          role="progressbar"
          aria-label="Drawing Fundamentals course progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={isLoaded ? percentage : 0}
        >
          <div
            className="h-full rounded-full bg-[#E86A33] transition-all duration-500"
            style={{ width: `${isLoaded ? percentage : 0}%` }}
          />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {lessons.map((lesson, index) => {
          const isCompleted = completedLessons.includes(lesson.key);

          return (
            <div
              key={lesson.key}
              className="flex items-center gap-3 rounded-lg bg-white p-3"
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  isCompleted
                    ? "bg-green-100 text-green-700"
                    : "bg-[#FFF0E8] text-[#E86A33]"
                }`}
              >
                {isCompleted ? "✓" : `0${index + 1}`}
              </span>

              <span className="flex-1 text-sm font-medium text-[#171717]">
                {lesson.title}
              </span>

              <span
                className={`text-xs font-semibold ${
                  isCompleted
                    ? "text-green-700"
                    : "text-[#6B6B6B]"
                }`}
              >
                {isCompleted ? "Completed" : "Not completed"}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
