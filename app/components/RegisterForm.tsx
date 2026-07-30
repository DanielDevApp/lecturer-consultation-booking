"use client";

import { createSession } from "@/app/actions/auth";
import { findUserByEmail, saveRegisteredUser } from "@/lib/auth/client";
import Link from "next/link";
import { type Dispatch, type FormEvent, type SetStateAction, useState } from "react";

type RegisterFormProps = {
  role: "student" | "lecturer";
  setRole: Dispatch<SetStateAction<"student" | "lecturer">>;
};

export default function RegisterForm({ role, setRole }: RegisterFormProps) {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim().toLowerCase();
    const password = String(form.get("password") ?? "");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      setPending(false);
      return;
    }

    if (findUserByEmail(email)) {
      setError("An account with this email already exists. Please log in.");
      setPending(false);
      return;
    }

    const allEmails = ["admin@gctu.edu.gh", "student@gctu.edu.gh", "lecturer@gctu.edu.gh"];
    if (allEmails.includes(email)) {
      setError("This email is reserved. Use a different email or log in with demo credentials.");
      setPending(false);
      return;
    }

    const id = `user-${Date.now()}`;
    const user = { id, name, email, password, role };

    saveRegisteredUser(user);
    await createSession({ id, name, email, role });
  }

  return (
    <>
      <div className="mb-6 grid grid-cols-2 gap-2 rounded-2xl bg-base-200 p-1.5">
        <button
          type="button"
          onClick={() => setRole("student")}
          className={`rounded-xl py-2.5 text-sm font-semibold transition-all duration-300 ${
            role === "student"
              ? "bg-gradient-to-r from-primary to-blue-600 text-primary-content shadow-lg shadow-primary/40"
              : "text-base-content/70 hover:text-primary hover:bg-white/50"
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-2.5 5-4 8-4s8 1.5 8 4" />
            </svg>
            Student
          </span>
        </button>
        <button
          type="button"
          onClick={() => setRole("lecturer")}
          className={`rounded-xl py-2.5 text-sm font-semibold transition-all duration-300 ${
            role === "lecturer"
              ? "bg-gradient-to-r from-secondary to-orange-600 text-secondary-content shadow-lg shadow-secondary/40"
              : "text-base-content/70 hover:text-secondary hover:bg-white/50"
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
              <path d="M12 2L15.09 8.26H22L17.55 12.96L19.73 19.26L12 15.55L4.27 19.26L6.45 12.96L2 8.26H8.91L12 2Z" />
            </svg>
            Lecturer
          </span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="alert alert-error text-sm shadow-lg shadow-error/15 rounded-2xl">
            <span>{error}</span>
          </div>
        )}

        <input type="hidden" name="role" value={role} />

        <div className="form-control">
          <label className="label" htmlFor="name">
            <span className="label-text font-medium text-slate-700">Full name</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Ama Serwaa"
            className="input input-bordered w-full transition-all duration-200 placeholder:text-slate-400 focus:border-primary focus:bg-white focus:shadow-lg focus:shadow-primary/15"
          />
        </div>

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
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            placeholder="At least 8 characters"
            className="input input-bordered w-full transition-all duration-200 placeholder:text-slate-400 focus:border-primary focus:bg-white focus:shadow-lg focus:shadow-primary/15"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className={`btn-brand w-full rounded-[1.25rem] py-4 text-base font-semibold transition-all duration-300 ${
            role === "student"
              ? "btn-brand-primary shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5"
              : "btn-brand-secondary shadow-lg shadow-secondary/25 hover:shadow-xl hover:shadow-secondary/40 hover:-translate-y-0.5"
          } disabled:opacity-60 disabled:hover:shadow-lg disabled:hover:translate-y-0`}
        >
          {pending ? <span className="loading loading-spinner loading-sm" /> : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-base-content/70">
        Already registered?{" "}
        <Link href="/login" className="link link-primary font-semibold no-underline hover:underline">
          Log in instead
        </Link>
      </p>
    </>
  );
}
