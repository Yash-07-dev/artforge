
import Link from "next/link";

export const metadata = {
  title: "Digital Painting | ArtForge",
  description:
    "Learn digital painting fundamentals, brushes, layers, shading, and rendering with ArtForge.",
};

const lessons = [
  {
    number: "01",
    title: "Getting Started with Digital Painting",
    description:
      "Understand your digital canvas, brush tools, workspace, and basic painting workflow.",
    level: "Beginner",
  },
  {
    number: "02",
    title: "Brushes and Brush Control",
    description:
      "Explore brush sizes, opacity, pressure, and strokes to create clean and expressive marks.",
    level: "Beginner",
  },
  {
    number: "03",
    title: "Working with Layers",
    description:
      "Learn how layers help you organize sketches, line art, colors, shadows, and highlights.",
    level: "Beginner",
  },
  {
    number: "04",
    title: "Shading and Rendering",
    description:
      "Build form with shadows, highlights, and smooth or stylized rendering techniques.",
    level: "Practice",
  },
];

export default function DigitalPaintingPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-6 py-12">
      <Link
        href="/learn"
        className="text-sm font-medium text-[#E86A33] hover:underline"
      >
        ← Back to Learn
      </Link>

      <section className="mt-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#E86A33]">
          ArtForge Learning · Beginner
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#171717] sm:text-5xl">
          Digital Painting
        </h1>

        <p className="mt-5 text-base leading-8 text-[#6B6B6B]">
          Learn to create digital artwork step by step. Explore brushes,
          layers, shading, and rendering while developing your own artistic
          workflow.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-[#171717]">
          Your Learning Path
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">
          Follow these lessons in order and practice each skill as you go.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          {lessons.map((lesson) => (
            <article
              key={lesson.number}
              className="rounded-xl border border-[#E5E5E5] bg-white p-6"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFF0E8] text-sm font-bold text-[#E86A33]">
                  {lesson.number}
                </span>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#E86A33]">
                    {lesson.level}
                  </p>

                  <h3 className="mt-2 text-lg font-semibold text-[#171717]">
                    {lesson.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#6B6B6B]">
                    {lesson.description}
                  </p>

                  <p className="mt-4 text-sm font-medium text-[#6B6B6B]">
                    Lesson content coming next
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
