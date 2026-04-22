"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/feed",
      });

      if (result.error) {
        setError(result.error.message ?? "Could not create account");
      } else if (result.data?.user) {
        await authClient.signIn.email({ email, password, callbackURL: "/feed" });
        router.push("/feed");
        router.refresh();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-serif text-4xl mb-6 tracking-tight">furbook</h1>
      <p className="text-muted-foreground text-sm mb-6 text-center">
        Sign up to see photos of your friends&apos; pets
      </p>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2.5 text-sm border border-border rounded-sm bg-white focus:border-foreground/30 transition-colors"
          autoComplete="name"
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          pattern="[a-zA-Z0-9_]+"
          title="Letters, numbers, underscores only"
          className="w-full px-3 py-2.5 text-sm border border-border rounded-sm bg-white focus:border-foreground/30 transition-colors"
          autoComplete="username"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2.5 text-sm border border-border rounded-sm bg-white focus:border-foreground/30 transition-colors"
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          className="w-full px-3 py-2.5 text-sm border border-border rounded-sm bg-white focus:border-foreground/30 transition-colors"
          autoComplete="new-password"
        />

        {error && (
          <p className="text-destructive text-xs text-center mt-1 animate-fade-in">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || !name || !username || !email || !password}
          className="mt-2 w-full bg-accent text-white text-sm font-semibold py-1.5 rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:pointer-events-none"
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>

      <p className="text-muted-foreground text-xs mt-4 text-center leading-relaxed max-w-[260px]">
        By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.
      </p>

      <Link
        href="/sign-in"
        className="text-sm mt-4 hover:text-foreground/60 transition-colors"
      >
        Already have an account?{" "}
        <span className="font-semibold text-foreground">Log in</span>
      </Link>
    </div>
  );
}
