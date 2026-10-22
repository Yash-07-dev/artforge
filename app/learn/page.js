
import LearningCard from "../../components/LearningCard";
import learningCategories from "../../data/learningCategories";

export const metadata = {
  title: "Learn Art | ArtForge",
  description:
    "Explore art tutorials, drawing fundamentals, digital painting, and color theory with ArtForge.",
};

export default function LearnPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-6 py-12">
      {/* Page heading */}
      <section>
        <p className="text-sm font-semibold uppercase tracking-widest text-[#E86A33]">
          ArtForge Learning
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#171717] sm:text-5xl">
          Learn and Improve Your Art
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-7 text-[#6B6B6B]">
          Explore tutorials, strengthen your fundamentals, and develop your
          own artistic style one step at a time.
        </p>
      </section>

      {/* Learning categories */}
      <section className="mt-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#171717]">
            Explore Learning Topics
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">
            Choose a topic to start building your artistic skills.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {learningCategories.map((category) => (
            <LearningCard key={category.id} category={category} />
          ))}
        </div>
      </section>
    </main>
  );
}
