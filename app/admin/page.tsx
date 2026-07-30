import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { destroySession } from "@/app/actions/auth";
import PageHeader from "@/app/components/PageHeader";
import { getSession } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Admin panel",
  description: "GCTU consultation booking administration.",
};

const metrics = [
  { label: "Live bookings", value: "128", detail: "+12% this week", tone: "text-primary" },
  { label: "Pending approvals", value: "9", detail: "3 urgent", tone: "text-secondary" },
  { label: "Avg. response time", value: "9 min", detail: "Under target", tone: "text-accent" },
];

const alerts = [
  { title: "Queue spike at 10:00 AM", detail: "4 new requests came in within 15 minutes." },
  { title: "Room CS 204 overbooked", detail: "One lecturer requested a room change for today." },
  { title: "Weekly report generated", detail: "The summary dashboard has been updated successfully." },
];

const activity = [
  { student: "Joyce Amoah", lecturer: "Dr. Amara Owusu", slot: "Today · 2:00 PM", status: "Confirmed" },
  { student: "Kofi Asante", lecturer: "Prof. Kwesi Mensah", slot: "Wed · 10:30 AM", status: "Pending" },
  { student: "Ama Serwaa", lecturer: "Dr. Linda Boateng", slot: "Thu · 1:00 PM", status: "Reviewed" },
];

const ACTIVITY_BADGES = {
  Confirmed: "inline-flex rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-900 ring-1 ring-emerald-100",
  Pending: "inline-flex rounded-full bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-900 ring-1 ring-amber-100",
  Reviewed: "inline-flex rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-900 ring-1 ring-slate-100",
};

export default async function AdminPage() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    redirect("/admin/login");
  }

  return (
    <div className="bg-base-200">
      <PageHeader
        eyebrow="Admin control center"
        eyebrowColor="primary"
        title={`Welcome, ${session.name.split(" ")[0]}`}
        description="Monitor consultations, review demand, and keep the GCTU booking system running smoothly."
        action={
          <form action={destroySession}>
            <button type="submit" className="btn btn-outline rounded-2xl">
              Sign out
            </button>
          </form>
        }
      />

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="card border border-base-300/70 bg-base-100 shadow-sm">
              <div className="card-body">
                <p className="text-xs font-bold uppercase tracking-widest text-base-content/50">
                  {metric.label}
                </p>
                <p className="stat-value mt-2">{metric.value}</p>
                <p className={`mt-2 text-sm font-medium ${metric.tone}`}>{metric.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="card border border-base-300/70 bg-base-100 shadow-sm">
            <div className="card-body">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="eyebrow text-secondary">Alerts</p>
                  <h2 className="font-serif text-2xl font-bold">Live system health</h2>
                </div>
                <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-900 ring-1 ring-emerald-100">
                  All systems normal
                </span>
              </div>
              <ul className="mt-6 space-y-3">
                {alerts.map((alert) => (
                  <li
                    key={alert.title}
                    className="rounded-2xl border border-base-300/70 bg-base-200/50 px-4 py-4 transition-colors hover:bg-base-200"
                  >
                    <p className="font-semibold">{alert.title}</p>
                    <p className="mt-1 text-sm text-base-content/70">{alert.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card overflow-hidden border border-base-300/70 bg-base-100 shadow-sm">
            <div className="border-b border-base-300/70 bg-base-200/50 px-6 py-5">
              <p className="eyebrow text-primary">Recent activity</p>
              <h2 className="font-serif text-2xl font-bold">Bookings this week</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="text-base-content/60">
                    <th>Student</th>
                    <th>Lecturer</th>
                    <th>Slot</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {activity.map((entry) => (
                    <tr key={`${entry.student}-${entry.slot}`} className="hover:bg-base-200/50">
                      <td className="font-medium">{entry.student}</td>
                      <td>{entry.lecturer}</td>
                      <td>{entry.slot}</td>
                      <td>
                        <span className={ACTIVITY_BADGES[entry.status] ?? "inline-flex rounded-full bg-base-100 px-3 py-1.5 text-xs font-semibold text-base-content/80 ring-1 ring-base-100"}>
                          {entry.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
