import type { Metadata } from "next";
import { redirect } from "next/navigation";
import InitialAvatar from "@/app/components/InitialAvatar";
import PageHeader from "@/app/components/PageHeader";
import { getSession } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Lecturer dashboard",
};

const SLOTS = [
  { day: "Mon", time: "10:00–12:00", booked: 4, total: 6 },
  { day: "Wed", time: "14:00–16:00", booked: 6, total: 6 },
  { day: "Fri", time: "09:00–11:00", booked: 2, total: 6 },
];

const REQUESTS = [
  { student: "Joyce Amoah", topic: "Capstone outline", when: "Mon · 10:20 AM" },
  { student: "Kofi Asante", topic: "Exam revision", when: "Mon · 10:40 AM" },
  { student: "Ama Serwaa", topic: "Assignment feedback", when: "Fri · 9:20 AM" },
];

export default async function LecturerDashboardPage() {
  const session = await getSession();
  if (!session || session.role !== "lecturer") {
    redirect("/login?redirect=/dashboard/lecturer");
  }

  return (
    <div className="bg-base-200">
      <PageHeader
        eyebrow="Lecturer dashboard"
        eyebrowColor="secondary"
        title="Office hours overview"
        description="Publish your office hours once. Students fill the open slots."
        action={
          <button type="button" className="btn btn-secondary rounded-2xl shadow-md">
            Publish new hours
          </button>
        }
      />

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            <h2 className="font-serif text-xl font-bold">This week</h2>
            {SLOTS.map((slot) => {
              const full = slot.booked === slot.total;
              const pct = Math.round((slot.booked / slot.total) * 100);
              return (
                <div key={slot.day} className="card border border-base-300/70 bg-base-100 shadow-sm">
                  <div className="card-body">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold">{slot.day}</p>
                        <p className="text-sm text-base-content/70">{slot.time}</p>
                      </div>
                      <span
                        className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${
                          full
                            ? "bg-rose-100 text-rose-900 ring-1 ring-rose-100"
                            : "bg-emerald-100 text-emerald-900 ring-1 ring-emerald-100"
                        }`}
                      >
                        {slot.booked}/{slot.total} booked
                      </span>
                    </div>
                    <progress
                      className={`progress mt-4 w-full ${full ? "progress-error" : "progress-success"}`}
                      value={pct}
                      max={100}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-3">
            <h2 className="mb-4 font-serif text-xl font-bold">Upcoming students</h2>
            <ul className="card divide-y divide-base-300/70 border border-base-300/70 bg-base-100 shadow-sm">
              {REQUESTS.map((req) => (
                <li
                  key={`${req.student}-${req.when}`}
                  className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-base-200/50 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                >
                  <div className="flex items-center gap-3">
                    <InitialAvatar
                      initials={req.student
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                      label={`Avatar for ${req.student}`}
                      size="sm"
                      variant="primary"
                    />
                    <div>
                      <p className="font-medium">{req.student}</p>
                      <p className="text-sm text-base-content/70">{req.topic}</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium sm:text-right">{req.when}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
