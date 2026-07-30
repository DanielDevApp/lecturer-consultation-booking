"use client";

import { createSession } from "@/app/actions/auth";
import { findUserByCredentials } from "@/lib/auth/client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? undefined;
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");

    const user = findUserByCredentials(email, password);
    if (!user) {
      setError("Invalid email or password. Try the demo accounts below.");
      setPending(false);
      return;
    }

    if (user.role === "admin") {
      router.push(`/admin/login?email=${encodeURIComponent(email)}`);
      setPending(false);
      return;
    }

    await createSession(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      redirectTo,
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="alert alert-error text-sm shadow-sm">
            <span>{error}</span>
          </div>
        )}

        <div className="form-control">
          <label className="label" htmlFor="email">
            <span className="label-text font-medium text-slate-700">Email address</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@gctu.edu.gh"
            className="input input-bordered w-full transition-all duration-200 placeholder:text-slate-400 focus:border-primary focus:bg-white focus:shadow-lg focus:shadow-primary/15"
          />
        </div>

        <div className="form-control">
          <label className="label" htmlFor="password">
            <span className="label-text font-medium text-slate-700">Password</span>
            <button
              type="button"
              className="label-text-alt link link-primary no-underline transition-all duration-200 hover:text-primary hover:underline"
            >
              Forgot?
            </button>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="••••••••"
            className="input input-bordered w-full transition-all duration-200 placeholder:text-slate-400 focus:border-primary focus:bg-white focus:shadow-lg focus:shadow-primary/15"
          />
        </div>

        <label className="label cursor-pointer justify-start gap-3 transition-all duration-200 hover:bg-slate-50 rounded-xl px-2 py-1.5">
          <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" />
          <span className="label-text text-slate-600 font-medium">Keep me signed in</span>
        </label>

        <button
          type="submit"
          disabled={pending}
          className="btn-brand btn-brand-primary w-full rounded-[1.25rem] py-4 text-base font-semibold shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:shadow-lg disabled:hover:shadow-primary/25 disabled:hover:translate-y-0"
        >
          {pending ? <span className="loading loading-spinner loading-sm" /> : "Log in"}
        </button>
      </form>

      <div className="mt-6 rounded-2xl border border-base-300/70 bg-base-200/50 p-4 text-sm">
        <p className="font-semibold text-base-content">Demo accounts</p>
        <ul className="mt-2 space-y-1 text-base-content/70">
          <li>Student: student@gctu.edu.gh / student123</li>
          <li>Lecturer: lecturer@gctu.edu.gh / lecturer123</li>
        </ul>
      </div>

      <p className="mt-6 text-center text-sm text-base-content/70">
        New here?{" "}
        <Link href="/register" className="link link-primary font-semibold no-underline hover:underline">
          Create an account
        </Link>
      </p>
    </>
  );
}
