
import Link from "next/link";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "/gallery" },
  { label: "Learn", href: "/learn" },
  { label: "Resources", href: "/resources" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#E5E5E5] bg-[#FAFAF7]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight text-[#171717]"
            >
              ArtForge<span className="text-[#E86A33]">.</span>
            </Link>

            <p className="mt-3 text-sm text-[#6B6B6B]">
              Learn · Create · Share · Inspire
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#6B6B6B] transition hover:text-[#E86A33]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 border-t border-[#E5E5E5] pt-6">
          <p className="text-xs text-[#6B6B6B]">
            © {new Date().getFullYear()} ArtForge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
