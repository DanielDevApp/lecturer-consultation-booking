"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import DoorTag from "@/app/components/DoorTag";
import InitialAvatar from "@/app/components/InitialAvatar";
import PageHeader from "@/app/components/PageHeader";
import { DEPARTMENTS, LECTURERS } from "@/lib/mock-data";

export default function LecturersPage() {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("All departments");

  const filtered = useMemo(() => {
    return LECTURERS.filter((lecturer) => {
      const matchesDept =
        department === "All departments" || lecturer.department === department;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        lecturer.name.toLowerCase().includes(q) ||
        lecturer.department.toLowerCase().includes(q);
      return matchesDept && matchesQuery;
    });
  }, [query, department]);

  return (
    <div className="bg-base-200">
      <PageHeader
        eyebrow="Directory"
        eyebrowColor="accent"
        title="Find a lecturer"
        description="Browse published office hours at GCTU and book the next open slot."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="input input-bordered flex flex-1 items-center gap-2 rounded-3xl bg-base-100 px-4 py-3 transition-all duration-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-4 w-4 opacity-50" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or department"
              className="grow bg-transparent text-base-content placeholder:text-slate-400 outline-none"
            />
          </label>
          <select
            className="select select-bordered rounded-3xl bg-base-100 focus:border-primary focus:ring-2 focus:ring-primary/20 sm:max-w-xs"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </PageHeader>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-6">
        {filtered.length === 0 ? (
          <div className="card border border-base-300/70 bg-base-100 p-10 text-center shadow-sm">
            <p className="font-serif text-2xl font-bold">No lecturers found</p>
            <p className="mt-2 text-base-content/70">Try a different search or department filter.</p>
          </div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((lecturer) => (
              <li key={lecturer.slug}>
                <Link
                  href={`/lecturers/${lecturer.slug}`}
                  className="card card-hover h-full border border-base-300/70 bg-base-100 shadow-sm transition-all hover:border-primary/30 hover:shadow-lg"
                >
                  <div className="card-body">
                    <div className="flex items-start justify-between gap-3">
                      <InitialAvatar initials={lecturer.initials} label={`Avatar for ${lecturer.name}`} />
                      <DoorTag status={lecturer.status} />
                    </div>
                    <h2 className="card-title mt-4 font-serif">{lecturer.name}</h2>
                    <p className="text-sm text-base-content/70">{lecturer.department}</p>
                    <div className="mt-4 flex items-end justify-between border-t border-base-300/70 pt-4 text-xs text-base-content/60">
                      <span>{lecturer.room}</span>
                      <span className="font-semibold text-base-content">{lecturer.next}</span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
