
"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { label: "Home", href: "/" },
    { label: "Gallery", href: "/gallery" },
    { label: "Learn", href: "/learn" },
    { label: "Resources", href: "/resources" },
  ];

  return (
    <header className="border-b border-[#E5E5E5] bg-[#FAFAF7]">
      <nav className="mx-auto max-w-7xl px-6 py-5">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-[#171717]"
          >
            ArtForge<span className="text-[#E86A33]">.</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#171717] transition-colors hover:text-[#E86A33]"
              >
                {link.label}
              </Link>

            ))}


            <Link
              href="/community"
              className="text-sm font-medium text-[#171717] hover:text-[#E86A33]"
            >
              Community
            </Link>

          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="rounded-md p-2 text-[#171717] hover:bg-[#E5E5E5] md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div
            id="mobile-navigation"
            className="mt-5 flex flex-col gap-4 border-t border-[#E5E5E5] pt-5 md:hidden"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-medium text-[#171717] hover:text-[#E86A33]"
              >
                {link.label}


              </Link>




            ))}

            <Link
              href="/community"
              className="text-sm font-medium text-[#171717] hover:text-[#E86A33]"
            >
              Community
            </Link>

          </div>
        )}
      </nav>
    </header>
  );
}
