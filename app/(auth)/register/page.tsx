"use client";

import { useState } from "react";
import RegisterForm from "@/app/components/RegisterForm";

export default function RegisterPage() {
  const [role, setRole] = useState<"student" | "lecturer">("student");

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-base-200 lg:grid lg:grid-cols-[1.1fr_0.9fr]">
      <aside className="relative hidden overflow-hidden bg-gradient-to-br from-primary via-indigo-500 to-accent text-white p-10 lg:flex xl:p-14">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,#ffffff33,transparent_35%)]" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,#ffffff15,transparent_55%)]" />
        <div className="relative z-10 flex h-full flex-col justify-between">
          <div className="space-y-8 max-w-lg">
            <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-white/80 shadow-sm shadow-white/10">
              Join the GCTU community
            </div>
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.28em] text-white/70">Create your account</p>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Register and start booking consultations effortlessly.
              </h1>
              <p className="max-w-xl text-base leading-8 text-white/80">
                Whether you&apos;re a student or lecturer, set up access quickly and manage your day with confidence.
              </p>
            </div>
            <div className="grid gap-3">
              <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-[0_30px_80px_-40px_rgba(255,255,255,0.45)] backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">Student</p>
                <p className="mt-3 text-lg font-semibold text-white">Book classes, review slots, and stay ahead.</p>
              </div>
              <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-[0_30px_80px_-40px_rgba(255,255,255,0.45)] backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">Lecturer</p>
                <p className="mt-3 text-lg font-semibold text-white">Publish availability and manage consultations in one place.</p>
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
              <div className="mb-3 inline-flex items-center gap-3 rounded-full bg-secondary/10 px-3 py-2 text-sm font-semibold text-secondary">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-secondary text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </span>
                {role === "student" ? "Student setup" : "Lecturer setup"}
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
                Create {role === "student" ? "student" : "lecturer"} account
              </h1>
              <p className="mt-3 text-slate-600">
                {role === "student"
                  ? "Create a student account to book consultations, manage your timetable, and stay connected with GCTU lecturers."
                  : "Create a lecturer account to publish office hours, approve student bookings, and manage consultations from one dashboard."}
              </p>
              <div className="mt-8">
                <RegisterForm role={role} setRole={setRole} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
