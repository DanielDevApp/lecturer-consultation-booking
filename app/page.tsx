import BookingSlip from "./components/BookingSlip";

const heroSlips = [
  { lecturer: "Dr. A. Mensah", department: "Computer Science", day: "Mon", time: "10:00–10:30", code: "CS-0417", status: "confirmed" as const },
  { lecturer: "Prof. R. Owusu", department: "Mathematics", day: "Mon", time: "13:00–13:30", code: "MT-1182", status: "pending" as const },
  { lecturer: "Dr. K. Boateng", department: "Physics", day: "Tue", time: "09:30–10:00", code: "PH-0933", status: "confirmed" as const },
];

const features = [
  {
    title: "One-click booking",
    description: "Students browse available slots and reserve consultation time instantly with secure confirmation codes.",
  },
  {
    title: "Live availability",
    description: "Lecturers publish their office hours once and manage their schedule without repeated email follow-ups.",
  },
  {
    title: "Trusted by GCTU",
    description: "A polished interface for students and faculty to streamline consultation booking across campus.",
  },
];

const confirmedCount = heroSlips.filter((slip) => slip.status === "confirmed").length;
const pendingCount = heroSlips.filter((slip) => slip.status === "pending").length;
const totalCount = heroSlips.length;

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden bg-base-100">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-primary/20 via-transparent to-transparent" />

        <div className="relative mx-auto max-w-7xl px-5 pt-10 pb-12 sm:px-6 lg:px-8 lg:pt-12 lg:pb-16">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="space-y-8">
              <div className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary shadow-sm ring-1 ring-primary/20">
                Official GCTU consultation hub
              </div>
              <div className="space-y-5">
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                  Book lecturer consultations in seconds.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                  Find available office hours, reserve a slot, and get instant confirmation — all from one polished campus scheduling experience.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <a href="/register" className="btn-brand btn-brand-primary inline-flex w-full justify-center sm:w-auto">
                  Start booking
                </a>
                <a href="/lecturers" className="btn-brand btn-brand-outline inline-flex w-full justify-center sm:w-auto">
                  Browse lecturers
                </a>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Students</p>
                  <p className="mt-3 text-xl font-semibold text-slate-950">Fast booking</p>
                </div>
                <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Lecturers</p>
                  <p className="mt-3 text-xl font-semibold text-slate-950">Clear availability</p>
                </div>
                <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Campus</p>
                  <p className="mt-3 text-xl font-semibold text-slate-950">No more email chains</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_32px_80px_-40px_rgba(15,23,42,0.18)]">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Today&apos;s highlights</p>
                    <h2 className="mt-3 text-2xl font-semibold text-slate-950">Live consultation feed</h2>
                  </div>
                  <span className="rounded-2xl bg-primary/10 px-3 py-2 text-sm font-semibold text-primary">
                    Live now
                  </span>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-center shadow-sm">
                    <p className="text-xs uppercase tracking-[0.24em] text-emerald-600">Confirmed</p>
                    <p className="mt-3 text-3xl font-semibold text-emerald-900">{confirmedCount}</p>
                    <p className="mt-1 text-sm text-emerald-700">Ready for consultation</p>
                  </div>
                  <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4 text-center shadow-sm">
                    <p className="text-xs uppercase tracking-[0.24em] text-amber-700">Pending</p>
                    <p className="mt-3 text-3xl font-semibold text-amber-900">{pendingCount}</p>
                    <p className="mt-1 text-sm text-amber-700">Awaiting approval</p>
                  </div>
                  <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-4 text-center shadow-sm">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Total slots</p>
                    <p className="mt-3 text-3xl font-semibold text-slate-950">{totalCount}</p>
                    <p className="mt-1 text-sm text-slate-500">Today&apos;s schedule</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {heroSlips.map((slip) => (
                    <BookingSlip key={slip.code} {...slip} />
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {features.map((feature) => (
                  <div key={feature.title} className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
                    <h3 className="font-semibold text-slate-950">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-base-200 py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] bg-white p-10 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">How it works</p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-950">From schedule to confirmed</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                The booking flow is built to move students from browsing to a confirmed consultation in under one minute.
              </p>
            </div>
            <div className="grid gap-4">
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">1. Choose a lecturer</p>
                <p className="mt-3 text-base text-slate-600">Search by department, name, or availability and compare the next open slots.</p>
              </div>
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">2. Reserve your slot</p>
                <p className="mt-3 text-base text-slate-600">Reserve a consultation with one click and receive an instant booking code.</p>
              </div>
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">3. Show up prepared</p>
                <p className="mt-3 text-base text-slate-600">Arrive with the code, save time, and keep consultation scheduling clean and reliable.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
