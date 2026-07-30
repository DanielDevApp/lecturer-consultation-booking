import Link from "next/link";
import type { Metadata } from "next";
import PageHeader from "@/app/components/PageHeader";
import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "My bookings",
};

const BOOKINGS = [
  {
    lecturer: "Dr. Amara Owusu",
    topic: "Project proposal review",
    when: "Today · 2:00–2:20 PM",
    room: "CS 204",
    status: "Confirmed",
  },
  {
    lecturer: "Dr. Efua Addo",
    topic: "Lab report feedback",
    when: "Thu · 4:15–4:35 PM",
    room: "CS 045",
    status: "Upcoming",
  },
  {
    lecturer: "Prof. Kwesi Mensah",
    topic: "Midterm clarification",
    when: "Last week · completed",
    room: "IT 118",
    status: "Done",
  },
];

const STATUS_BADGES = {
  Confirmed: "inline-flex rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-900 ring-1 ring-emerald-100",
  Upcoming: "inline-flex rounded-full bg-sky-100 px-3 py-1.5 text-xs font-semibold text-sky-900 ring-1 ring-sky-100",
  Done: "inline-flex rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-900 ring-1 ring-slate-100",
};

export default async function StudentDashboardPage() {
  const session = await getSession();
  if (!session || session.role !== "student") {
    redirect("/login?redirect=/dashboard/student");
  }

  return (
    <div className="bg-base-200">
      <PageHeader
        eyebrow="Student dashboard"
        eyebrowColor="primary"
        title="Consultation overview"
        description="Your upcoming consultations and recent visits at GCTU."
        action={
          <Link href="/lecturers" className="btn btn-primary rounded-2xl">
            Book a new slot
          </Link>
        }
      />

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-6">
        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          {[
            { label: "Upcoming", value: "2", color: "text-primary" },
            { label: "This week", value: "1", color: "text-accent" },
            { label: "Completed", value: "1", color: "text-base-content/50" },
          ].map((stat) => (
            <div key={stat.label} className="card border border-base-300/70 bg-base-100 shadow-sm">
              <div className="card-body py-5">
                <p className="text-xs font-bold uppercase tracking-widest text-base-content/50">
                  {stat.label}
                </p>
                <p className={`stat-value mt-1 ${stat.color}`}>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <ul className="space-y-4">
          {BOOKINGS.map((booking) => (
            <li key={`${booking.lecturer}-${booking.when}`}>
              <div className="card card-hover border border-base-300/70 bg-base-100 shadow-sm">
                <div className="card-body flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-serif text-xl font-semibold">{booking.lecturer}</h2>
                      <span className={STATUS_BADGES[booking.status]}>{booking.status}</span>
                    </div>
                    <p className="mt-1 text-sm text-base-content/70">{booking.topic}</p>
                    <p className="mt-3 text-sm font-medium">
                      {booking.when}
                      <span className="mx-2 text-base-content/30">·</span>
                      {booking.room}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" className="btn btn-outline btn-sm rounded-xl">
                      Reschedule
                    </button>
                    <button type="button" className="btn btn-outline btn-sm rounded-xl text-error hover:border-error">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
