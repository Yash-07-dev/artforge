
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success || !result.data?.token) {
        setError(result.message || "Login failed. Check your credentials.");
        return;
      }

      // Temporary token storage for local development.
      // We'll improve the authentication/session design in a later step.
      sessionStorage.setItem("artforgeToken", result.data.token);
      sessionStorage.setItem(
        "artforgeUser",
        JSON.stringify(result.data.user)
      );

      window.dispatchEvent(new Event("artforge-auth-changed"));

      router.push("/gallery");
    } catch {
      setError(
        "Could not connect to ArtForge. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-1 items-center justify-center bg-[#FFF5EF] px-5 py-12">
      <section className="w-full max-w-md rounded-2xl border border-[#F0E1D8] bg-white p-7 shadow-sm sm:p-9">
        <div className="mb-7 text-center">
          <Link
            href="/"
            className="text-3xl font-bold tracking-tight text-[#171717]"
          >
            ArtForge<span className="text-[#E86A33]">.</span>
          </Link>

          <h1 className="mt-6 text-2xl font-bold text-[#171717]">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-[#6B6B6B]">
            Sign in to continue your creative journey.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-[#171717]"
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-[#E5E5E5] px-4 py-3 text-[#171717] outline-none focus:border-[#E86A33] focus:ring-2 focus:ring-[#E86A33]/20"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-[#171717]"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-[#E5E5E5] px-4 py-3 text-[#171717] outline-none focus:border-[#E86A33] focus:ring-2 focus:ring-[#E86A33]/20"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#E86A33] px-4 py-3 font-semibold text-white transition-colors hover:bg-[#D85C28] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#6B6B6B]">
          New to ArtForge?{" "}
          <Link
            href="/register"
            className="font-semibold text-[#E86A33] hover:underline"
          >
            Create an account
          </Link>
        </p>
      </section>
    </main>
  );
}
