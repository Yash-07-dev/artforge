
import Link from "next/link";
import CourseProgress from "@/components/CourseProgress";

export const metadata = {
  title: "Drawing Fundamentals | ArtForge",
  description:
    "Learn shapes, proportions, perspective, and sketching with ArtForge's drawing fundamentals guide.",
};

const lessons = [
  {
    number: "01",
    title: "Learn Basic Shapes",
    description:
      "Understand how circles, squares, cylinders, and other simple forms help you construct complex objects.",
    duration: "Beginner",
  },
  {
    number: "02",
    title: "Understand Proportions",
    description:
      "Practice comparing sizes and relationships between parts of an object or character.",
    duration: "Beginner",
  },
  {
    number: "03",
    title: "Explore Perspective",
    description:
      "Learn how horizon lines and vanishing points create the illusion of depth.",
    duration: "Beginner",
  },
  {
    number: "04",
    title: "Practice Sketching",
    description:
      "Develop confident lines, simple gestures, and a regular drawing practice.",
    duration: "Practice",
  },
];

const lessonUrls = {
  "01": "/learn/drawing-fundamentals/basic-shapes",
  "02": "/learn/drawing-fundamentals/proportions",
  "03": "/learn/drawing-fundamentals/perspective",
  "04": "/learn/drawing-fundamentals/sketching",
};

export default function DrawingFundamentalsPage() {
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
          Drawing Fundamentals
        </h1>

        <p className="mt-5 text-base leading-8 text-[#6B6B6B]">
          Build your drawing skills step by step. Start with simple shapes,
          understand proportions, explore perspective, and develop confidence
          through regular practice.
        </p>
      </section>

      {/* Course Progress Dashboard */}
      <CourseProgress />

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-[#171717]">
          Your Learning Path
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">
          Follow these topics in order and practice each skill as you go.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          {lessons.map((lesson) => {
            const lessonUrl = lessonUrls[lesson.number];

            const cardContent = (
              <article className="rounded-xl border border-[#E5E5E5] bg-white p-6 transition hover:border-[#E86A33] hover:shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFF0E8] text-sm font-bold text-[#E86A33]">
                    {lesson.number}
                  </span>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#E86A33]">
                      {lesson.duration}
                    </p>

                    <h3 className="mt-2 text-lg font-semibold text-[#171717]">
                      {lesson.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-[#6B6B6B]">
                      {lesson.description}
                    </p>

                    <p className="mt-4 text-sm font-semibold text-[#E86A33]">
                      Start lesson →
                    </p>
                  </div>
                </div>
              </article>
            );

            return (
              <Link
                key={lesson.number}
                href={lessonUrl}
                className="block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E86A33]"
              >
                {cardContent}
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
