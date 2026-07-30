import { Suspense } from "react";
import LoginForm from "@/app/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-base-200 lg:grid lg:grid-cols-[1.1fr_0.9fr]">
      <aside className="relative hidden overflow-hidden bg-gradient-to-br from-primary via-indigo-500 to-accent text-white p-10 lg:flex xl:p-14">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,#ffffff33,transparent_35%)]" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,#ffffff15,transparent_55%)]" />
        <div className="relative z-10 flex h-full flex-col justify-between">
          <div className="space-y-8 max-w-lg">
            <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-white/80 shadow-sm shadow-white/10">
              GCTU Consultation Portal
            </div>
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.28em] text-white/70">Welcome back</p>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Sign in to your university booking dashboard.
              </h1>
              <p className="max-w-xl text-base leading-8 text-white/80">
                Easily manage your consultations, see upcoming bookings, and keep your schedule in sync with the GCTU campus.
              </p>
            </div>
            <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-[0_30px_80px_-40px_rgba(255,255,255,0.45)] backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">Featured login</p>
              <p className="mt-3 text-xl font-semibold text-white">Student and lecturer accounts</p>
              <div className="mt-6 grid gap-3 text-sm text-white/80">
                <div className="rounded-3xl bg-white/10 p-4">
                  <p className="font-semibold">Student</p>
                  <p className="mt-1">Use student credentials for quick access.</p>
                </div>
                <div className="rounded-3xl bg-white/10 p-4">
                  <p className="font-semibold">Lecturer</p>
                  <p className="mt-1">Switch to lecturer mode to manage slots.</p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-white/60">© {new Date().getFullYear()} Ghana Communication Technology University</p>
        </div>
      </aside>

      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white shadow-[0_40px_120px_-50px_rgba(15,23,42,0.18)]">
            <div className="p-8 sm:p-10">
              <div className="mb-3 inline-flex items-center gap-3 rounded-full bg-primary/10 px-3 py-2 text-sm font-semibold text-primary">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-primary text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5a7.5 7.5 0 0 1 15 0" />
                  </svg>
                </span>
                Secure sign in
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Welcome back</h1>
              <p className="mt-3 text-slate-600">Access your bookings, schedule, and consultation tools with a secure GCTU account.</p>
              <div className="mt-8">
                <Suspense fallback={<div className="h-80 rounded-[1.5rem] bg-slate-100" />}>
                  <LoginForm />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
