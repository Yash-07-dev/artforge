
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const lessons = [
  {
    number: "01",
    title: "Learn Basic Shapes",
    href: "/learn/drawing-fundamentals/basic-shapes",
  },
  {
    number: "02",
    title: "Understand Proportions",
    href: "/learn/drawing-fundamentals/proportions",
  },
  {
    number: "03",
    title: "Explore Perspective",
    href: "/learn/drawing-fundamentals/perspective",
  },
  {
    number: "04",
    title: "Practice Sketching",
    href: "/learn/drawing-fundamentals/sketching",
  },
];

export default function LessonSidebar({
  isOpen,
  onToggle,
}) {
  const pathname = usePathname();

  return (
    <div className="flex items-start gap-3">
      <button
        type="button"
        onClick={onToggle}
        aria-label={isOpen ? "Hide lesson sidebar" : "Show lesson sidebar"}
        aria-expanded={isOpen}
        className="sticky top-6 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#E5E5E5] bg-white text-xl text-[#171717] shadow-sm transition hover:bg-[#FFF5EF]"
      >
        {isOpen ? "‹" : "☰"}
      </button>

      {isOpen && (
        <aside className="w-[240px] shrink-0 rounded-xl border border-[#E5E5E5] bg-white p-4">
          <Link
            href="/learn/drawing-fundamentals"
            className="mb-5 inline-block text-sm font-medium text-[#E86A33] hover:underline"
          >
            ← All lessons
          </Link>

          <h2 className="mb-1 text-base font-bold text-[#171717]">
            Drawing Fundamentals
          </h2>

          <p className="mb-5 text-sm text-[#6B6B6B]">
            Your learning path
          </p>

          <nav aria-label="Drawing Fundamentals lessons">
            <ul className="space-y-2">
              {lessons.map((lesson) => {
                const isActive = pathname === lesson.href;

                return (
                  <li key={lesson.number}>
                    <Link
                      href={lesson.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`block rounded-lg border p-3 transition-colors ${
                        isActive
                          ? "border-[#E86A33] bg-[#FFF5EF] text-[#C65324]"
                          : "border-transparent text-[#404040] hover:border-[#E5E5E5] hover:bg-[#FAFAFA]"
                      }`}
                    >
                      <span className="mb-1 block text-xs font-semibold tracking-wide">
                        LESSON {lesson.number}
                      </span>

                      <span className="text-sm font-medium">
                        {lesson.title}
                      </span>

                      {isActive && (
                        <span className="mt-1 block text-xs">
                          Currently viewing
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
      )}
    </div>
  );
}
