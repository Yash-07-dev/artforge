
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    function readUser() {
      try {
        const storedUser = sessionStorage.getItem("artforgeUser");
        setUser(storedUser ? JSON.parse(storedUser) : null);
      } catch {
        sessionStorage.removeItem("artforgeUser");
        setUser(null);
      } finally {
        setAuthChecked(true);
      }
    }

    readUser();

    // Update Navbar when login/logout happens in another component.
    window.addEventListener("artforge-auth-changed", readUser);

    // Also refresh state when returning to this tab.
    window.addEventListener("focus", readUser);

    return () => {
      window.removeEventListener("artforge-auth-changed", readUser);
      window.removeEventListener("focus", readUser);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      sessionStorage.removeItem("artforgeToken");
      sessionStorage.removeItem("artforgeUser");

      window.dispatchEvent(new Event("artforge-auth-changed"));
      router.push("/");
    }
  };

  const links = [
    { label: "Home", href: "/" },
    { label: "Gallery", href: "/gallery" },
    { label: "Learn", href: "/learn" },
    { label: "Resources", href: "/resources" },
    { label: "Community", href: "/community" },
  ];

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function AuthLinks({ mobile = false }) {
    const linkClass = mobile
      ? "text-sm font-medium text-[#171717] hover:text-[#E86A33]"
      : "text-sm font-medium text-[#171717] hover:text-[#E86A33]";

    if (!authChecked) return null;

    if (user) {
      return (
        <><span className={`${linkClass} cursor-pointer`}>
          Hi, {user.name}
        </span>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-[#E86A33] px-4 py-2 text-sm font-semibold text-[#E86A33] hover:bg-[#FFF5EF]"
          >
            Logout
          </button>
        </>
      );
    }

    return (
      <>
        <Link
          href="/login"
          onClick={mobile ? closeMenu : undefined}
          className={linkClass}
        >
          Login
        </Link>
        <Link
          href="/register"
          onClick={mobile ? closeMenu : undefined}
          className="rounded-lg bg-[#E86A33] px-4 py-2 text-sm font-semibold text-white hover:bg-[#D85C28]"
        >
          Register
        </Link>
      </>
    );
  }

  return (
    <header className="border-b border-[#E5E5E5] bg-[#FAFAF7]">
      <nav className="mx-auto max-w-7xl px-6 py-5">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            onClick={closeMenu}
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

            <AuthLinks />
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="rounded-md p-2 text-[#171717] hover:bg-[#E5E5E5] md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
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
                onClick={closeMenu}
                className="text-sm font-medium text-[#171717] hover:text-[#E86A33]"
              >
                {link.label}
              </Link>
            ))}

            <div className="flex flex-col items-start gap-4 border-t border-[#E5E5E5] pt-4">
              <AuthLinks mobile />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
