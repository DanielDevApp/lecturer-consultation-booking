import Link from "next/link";
import type { Metadata } from "next";
import InitialAvatar from "@/app/components/InitialAvatar";
import PageHeader from "@/app/components/PageHeader";
import { LECTURERS } from "@/lib/mock-data";

export async function generateStaticParams() {
  return LECTURERS.map((lecturer) => ({ slug: lecturer.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lecturer = LECTURERS.find((item) => item.slug === slug);

  if (!lecturer) {
    return { title: "Lecturer profile" };
  }

  return {
    title: `${lecturer.name}`,
    description: `View ${lecturer.name}'s consultation availability at GCTU and book a slot.`,
  };
}

const statusBadge = {
  available: "inline-flex rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-900 ring-1 ring-emerald-100",
  booked: "inline-flex rounded-full bg-rose-100 px-3 py-1.5 text-xs font-semibold text-rose-900 ring-1 ring-rose-100",
  away: "inline-flex rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-900 ring-1 ring-slate-100",
};

const statusLabel = {
  available: "Available now",
  booked: "Fully booked",
  away: "Away",
};

export default async function LecturerProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lecturer = LECTURERS.find((item) => item.slug === slug);

  if (!lecturer) {
    return (
      <div className="bg-base-200 px-5 py-16">
        <div className="card mx-auto max-w-3xl border border-base-300/70 bg-base-100 p-8 text-center shadow-sm">
          <p className="eyebrow text-secondary">Not found</p>
          <h1 className="mt-3 font-serif text-3xl font-bold">This lecturer profile is unavailable.</h1>
          <Link href="/lecturers" className="btn btn-primary mt-6 rounded-2xl">
            Back to directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-base-200">
      <PageHeader
        eyebrow="Lecturer profile"
        eyebrowColor="primary"
        title={lecturer.name}
        description={lecturer.bio}
        action={
          <Link href="/lecturers" className="btn btn-outline rounded-2xl">
            Browse all lecturers
          </Link>
        }
      />

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="card border border-base-300/70 bg-base-100 shadow-sm">
            <div className="card-body">
              <div className="flex flex-wrap items-center gap-3">
                <InitialAvatar initials={lecturer.initials} label={`Avatar for ${lecturer.name}`} size="md" />
                <div>
                  <p className="font-serif text-2xl font-bold">{lecturer.department}</p>
                  <p className="text-sm text-base-content/70">{lecturer.role}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-base-300/70 bg-base-200/50 px-4 py-4">
                  <p className="eyebrow text-base-content/50">Office</p>
                  <p className="mt-1 font-semibold">{lecturer.room}</p>
                </div>
                <div className="rounded-2xl border border-base-300/70 bg-base-200/50 px-4 py-4">
                  <p className="eyebrow text-base-content/50">Next slot</p>
                  <p className="mt-1 font-semibold">{lecturer.next}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className={statusBadge[lecturer.status]}>{statusLabel[lecturer.status]}</span>
                <span className="badge badge-outline">4.9/5 student feedback</span>
              </div>

              <div className="mt-8">
                <h2 className="font-serif text-xl font-bold">Focus areas</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {lecturer.focus.map((item) => (
                    <span key={item} className="badge badge-lg badge-outline">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="card border border-base-300/70 bg-base-100 shadow-sm">
            <div className="card-body">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="eyebrow text-secondary">Make a booking</p>
                  <h2 className="font-serif text-2xl font-bold">Reserve a consultation</h2>
                </div>
                <span className="inline-flex rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary ring-1 ring-primary/20">
                  15 mins
                </span>
              </div>

              <form className="mt-6 space-y-4">
                <div className="form-control">
                  <label className="label" htmlFor="student-name">
                    <span className="label-text font-medium">Full name</span>
                  </label>
                  <input id="student-name" className="input input-bordered w-full" placeholder="Ama Serwaa" />
                </div>
                <div className="form-control">
                  <label className="label" htmlFor="topic">
                    <span className="label-text font-medium">Topic</span>
                  </label>
                  <input id="topic" className="input input-bordered w-full" placeholder="Project review" />
                </div>
                <div className="form-control">
                  <label className="label" htmlFor="slot">
                    <span className="label-text font-medium">Preferred slot</span>
                  </label>
                  <select id="slot" className="select select-bordered w-full" defaultValue="">
                    <option value="" disabled>
                      Select a slot
                    </option>
                    {lecturer.availability.map((slot) => (
                      <option key={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn btn-primary w-full rounded-2xl">
                  Confirm booking request
                </button>
                <p className="text-center text-xs text-base-content/50">
                  Sign in required for live bookings — backend coming soon.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
