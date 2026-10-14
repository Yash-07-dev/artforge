
import Link from "next/link";

export default function LearningCard({ category }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-[#E5E5E5] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#E86A33] hover:shadow-md">
      <p className="text-xs font-semibold uppercase tracking-wider text-[#E86A33]">
        {category.label}
      </p>

      <h3 className="mt-4 text-xl font-semibold text-[#171717]">
        {category.title}
      </h3>

      <p className="mt-3 flex-1 text-sm leading-7 text-[#6B6B6B]">
        {category.description}
      </p>

      <Link
        href="/learn"
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#171717] hover:text-[#E86A33]"
      >
        Explore topic <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
