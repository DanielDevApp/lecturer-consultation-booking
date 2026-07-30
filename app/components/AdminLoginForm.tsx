"use client";

import { createSession } from "@/app/actions/auth";
import { findUserByCredentials } from "@/lib/auth/client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function AdminLoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/admin";
  const prefilledEmail = searchParams.get("email") ?? "admin@gctu.edu.gh";
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
    if (!user || user.role !== "admin") {
      setError("Access denied. Admin credentials required.");
      setPending(false);
      return;
    }

    await createSession(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      redirectTo,
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-base-200 px-5 py-12">
      <div className="card w-full max-w-md border border-base-300/70 bg-base-100 shadow-2xl">
        <div className="card-body">
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral text-neutral-content">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-6 w-6" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Restricted</p>
              <h1 className="text-2xl font-bold">Admin sign in</h1>
            </div>
          </div>

          <p className="text-sm text-base-content/70">
            This area is for authorised GCTU administrators only.
          </p>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {error && (
              <div className="alert alert-error text-sm">
                <span>{error}</span>
              </div>
            )}

            <div className="form-control">
              <label className="label" htmlFor="admin-email">
                <span className="label-text font-medium">Admin email</span>
              </label>
              <input
                id="admin-email"
                name="email"
                type="email"
                required
                defaultValue={prefilledEmail}
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label" htmlFor="admin-password">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
                id="admin-password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="input input-bordered w-full"
              />
            </div>

            <button type="submit" disabled={pending} className="btn btn-neutral w-full">
              {pending ? <span className="loading loading-spinner loading-sm" /> : "Enter admin panel"}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-base-content/50">
            Demo: admin@gctu.edu.gh / admin123
          </p>

          <Link href="/" className="btn btn-ghost btn-sm mt-2">
            ← Back to site
          </Link>
        </div>
      </div>
    </div>
  );
}
