
import ColorLightProgress from "@/components/ColorLightProgress";
import Link from "next/link";

const lessons = [
    {
        number: "01",
        title: "Color Theory Basics",
        description:
            "Learn the color wheel, primary and secondary colors, warm and cool colors, and simple color relationships.",
        duration: "15–20 min",
        href: "/learn/color-light/color-theory-basics",
    },
    {
        number: "02",
        title: "Value and Contrast",
        description:
            "Understand light and dark values, contrast, and how to make cartoon illustrations clear and readable.",
        duration: "15–20 min",
        href: "/learn/color-light/value-and-contrast",
    },
    {
        number: "03",
        title: "Light and Shadow",
        description:
            "Explore light sources, cast shadows, form shadows, and basic shading techniques for cartoon art.",
        duration: "20–25 min",
        href: "/learn/color-light/light-and-shadow",
    },
    {
        number: "04",
        title: "Color Harmony and Atmosphere",
        description:
            "Build pleasing color palettes and use color to communicate mood, depth, and atmosphere.",
        duration: "20–25 min",
        href: "/learn/color-light/color-harmony-and-atmosphere",
    },
];

export default function ColorLightPage() {
    return (
        <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-12">
            <Link
                href="/learn"
                className="text-sm font-medium text-[#E86A33] hover:underline"
            >
                ← Back to Learning
            </Link>

            <section className="mt-8 rounded-2xl bg-[#FFF5EF] px-6 py-10 sm:px-10 sm:py-14">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#E86A33]">
                    ArtForge Learning Path
                </p>

                <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#171717] sm:text-5xl">
                    Color & Light
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-8 text-[#6B6B6B]">
                    Learn how to use color, value, contrast, light, and shadow to
                    make your artwork more expressive. These beginner-friendly
                    lessons include practical exercises designed for stylized and
                    cartoon illustrations.
                </p>

                <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium text-[#6B6B6B]">
                    <span className="rounded-full bg-white px-4 py-2">
                        4 lessons
                    </span>
                    <span className="rounded-full bg-white px-4 py-2">
                        Beginner friendly
                    </span>
                    <span className="rounded-full bg-white px-4 py-2">
                        Practical exercises
                    </span>
                </div>
            </section>

            <section className="mt-12">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-[#171717]">
                        Course lessons
                    </h2>
                    <p className="mt-2 text-[#6B6B6B]">
                        Follow the lessons in order and practise each concept.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {lessons.map((lesson) => (
                        <article
                            key={lesson.number}
                            className="flex flex-col rounded-xl border border-[#E5E5E5] p-6 transition hover:border-[#E86A33]/50 hover:shadow-sm"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#FFF5EF] font-bold text-[#E86A33]">
                                    {lesson.number}
                                </span>

                                <span className="rounded-full bg-[#F5F5F5] px-3 py-1 text-xs font-medium text-[#6B6B6B]">
                                    {lesson.duration}
                                </span>
                            </div>

                            <h3 className="mt-5 text-xl font-bold text-[#171717]">
                                {lesson.title}
                            </h3>

                            <p className="mt-3 flex-1 text-sm leading-7 text-[#6B6B6B]">
                                {lesson.description}
                            </p>

                            {lesson.href ? (
                                <Link
                                    href={lesson.href}
                                    className="mt-5 inline-block text-sm font-semibold text-[#E86A33] hover:underline"
                                >
                                    Start lesson →
                                </Link>
                            ) : (
                                <p className="mt-5 text-sm font-medium text-[#6B6B6B]">
                                    Coming soon
                                </p>
                            )}            </article>
                    ))}
                </div>
            </section>

            <section className="mt-12 rounded-xl border border-[#E5E5E5] p-6 sm:p-8">
                <h2 className="text-xl font-bold text-[#171717]">
                    Your practice goal
                </h2>

                <p className="mt-3 leading-7 text-[#6B6B6B]">
                    By the end of this course, aim to create a small cartoon
                    illustration with a clear light source, readable shadows, and
                    a limited color palette.
                </p>

                <Link
                    href="/learn"
                    className="mt-5 inline-block rounded-lg bg-[#E86A33] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#CF5727]"
                >
                    Explore all courses
                </Link>
            </section>
        <ColorLightProgress />
        </main>
    );
}
