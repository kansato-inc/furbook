"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/feed",
      });

      if (result.error) {
        setError(result.error.message ?? "Invalid email or password");
      } else {
        router.push("/feed");
        router.refresh();
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-serif text-4xl mb-8 tracking-tight">furbook</h1>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2.5 text-sm border border-border rounded-sm bg-card text-foreground focus:border-foreground/30 transition-colors"
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          className="w-full px-3 py-2.5 text-sm border border-border rounded-sm bg-card text-foreground focus:border-foreground/30 transition-colors"
          autoComplete="current-password"
        />

        {error && (
          <p className="text-destructive text-xs text-center mt-1 animate-fade-in">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || !email || !password}
          className="mt-2 w-full bg-accent text-white text-sm font-semibold py-1.5 rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:pointer-events-none"
        >
          {loading ? "Signing in..." : "Log in"}
        </button>
      </form>

      <div className="flex items-center gap-3 my-4 w-full">
        <div className="h-px bg-border flex-1" />
        <span className="text-muted-foreground text-xs font-semibold">OR</span>
        <div className="h-px bg-border flex-1" />
      </div>

      <Link
        href="/sign-up"
        className="text-accent text-sm font-semibold mt-2 hover:text-accent-hover transition-colors"
      >
        Create new account
      </Link>
    </div>
  );
}
