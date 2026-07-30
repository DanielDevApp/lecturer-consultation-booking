"use client";

import { destroySession } from "@/app/actions/auth";
import { useAuth } from "@/app/providers/AuthProvider";
import { dashboardPathForRole } from "@/lib/auth/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const PUBLIC_LINKS = [
  { href: "/lecturers", label: "Find a lecturer" },
  { href: "/#how-it-works", label: "How it works" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const isAuthPage =
    pathname === "/login" || pathname === "/register" || pathname === "/admin/login";
  const isAdminArea = pathname.startsWith("/admin") && pathname !== "/admin/login";
  const isDashboard = pathname.startsWith("/dashboard");

  const navLinks: { href: string; label: string }[] = [...PUBLIC_LINKS];
  if (user?.role === "student") {
    navLinks.push({ href: "/dashboard/student", label: "My bookings" });
  }
  if (user?.role === "lecturer") {
    navLinks.push({ href: "/dashboard/lecturer", label: "My dashboard" });
  }
  if (user?.role === "admin") {
    navLinks.push({ href: "/admin", label: "Admin panel" });
  }

  const dashboardRole =
    user?.role ??
    (pathname.startsWith("/dashboard/lecturer")
      ? "lecturer"
      : pathname.startsWith("/dashboard/student")
      ? "student"
      : undefined);

  const dashboardLinks = dashboardRole === "lecturer"
    ? [
        { href: "/dashboard/lecturer", label: "My schedule" },
        { href: "/lecturers", label: "Publish hours" },
      ]
    : [
        { href: "/dashboard/student", label: "My bookings" },
        { href: "/lecturers", label: "Book a slot" },
      ];

  const dashboardTitle = user?.name ? user.name : "Dashboard";
  const dashboardSubtitle =
    dashboardRole === "lecturer"
      ? "Lecturer dashboard"
      : dashboardRole === "student"
      ? "Student dashboard"
      : "Dashboard";

  async function handleLogout() {
    setOpen(false);
    await destroySession();
  }

  if (isDashboard) {
    return (
      <header className="sticky top-0 z-50 border-b border-slate-800/70 bg-slate-950 px-4 text-white shadow-xl backdrop-blur-xl sm:px-6">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between py-3">
          <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-200 text-emerald-950 text-sm font-bold shadow-xl">
              G
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-emerald-300">{dashboardSubtitle}</p>
              <p className="text-lg font-semibold tracking-tight text-white">{dashboardTitle}</p>
            </div>
          </div>

          <nav className="hidden items-center gap-2 md:flex" aria-label="Dashboard">
            {dashboardLinks.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                    active ? "bg-emerald-200/15 text-emerald-100" : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/"
              className="rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
            >
              Home
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl border border-emerald-300/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/20"
            >
              Log out
            </button>
          </div>
        </div>

        <div className="md:hidden border-t border-slate-800/70 bg-slate-950 px-4 py-3">
          <div className="flex flex-wrap gap-2">
            {dashboardLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-gradient-to-r from-primary to-accent px-4 text-white shadow-xl backdrop-blur-xl sm:px-6">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between py-3">
        <div className="flex-none">
          <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-200 text-sm font-bold text-emerald-950 shadow-xl transition-transform duration-300 group-hover:scale-105">
              G
            </span>
            <div className="leading-tight">
              <span className="block text-lg font-semibold tracking-tight text-emerald-100">GCTU Consult</span>
              <span className="hidden text-[0.65rem] uppercase tracking-widest text-emerald-200/90 sm:block">
                Consultation booking
              </span>
            </div>
          </Link>
        </div>

        {!isAuthPage && (
          <nav className="hidden flex-none md:flex" aria-label="Main">
            <ul className="menu menu-horizontal gap-1 px-1">
              {navLinks.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`rounded-xl px-3 py-2 text-sm transition-colors ${
                        active
                          ? "bg-white/15 text-white font-semibold"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}

        <div className="flex flex-none items-center gap-2">
          {!isAuthPage && (
            <>
              {user ? (
                <div className="hidden items-center gap-2 md:flex">
                  <Link
                    href={dashboardPathForRole(user.role)}
                    className="btn btn-ghost btn-sm rounded-xl text-neutral-content/80 hover:bg-white/10 hover:text-neutral-content"
                  >
                    {user.name.split(" ")[0]}
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="btn btn-outline btn-sm rounded-xl border-white/20 text-neutral-content hover:border-white/40 hover:bg-white/10"
                  >
                    Log out
                  </button>
                </div>
              ) : (
                <div className="hidden items-center gap-2 md:flex">
                  <Link
                    href="/login"
                    className="rounded-xl border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/register"
                    className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:bg-slate-100"
                  >
                    Register
                  </Link>
                </div>
              )}
            </>
          )}

          {!isAuthPage && (
            <button
              type="button"
              className="btn btn-ghost btn-square rounded-xl text-white md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>

      {!isAuthPage && open && (
        <nav
          id="mobile-nav"
          className="absolute inset-x-0 top-full border-t border-white/10 bg-slate-950 px-4 py-4 shadow-2xl md:hidden text-white"
          aria-label="Mobile"
        >
          <ul className="menu rounded-2xl bg-slate-950 p-3 text-white">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-white hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {user ? (
              <>
                <li>
                  <Link
                    href={dashboardPathForRole(user.role)}
                    onClick={() => setOpen(false)}
                    className="text-white hover:text-white"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button type="button" onClick={handleLogout} className="text-error hover:text-white">
                    Log out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="text-white hover:text-white font-semibold"
                  >
                    Log in
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="text-white hover:text-white font-semibold"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}

      {isAdminArea && user?.role === "admin" && (
        <div className="absolute inset-x-0 top-full border-t border-white/10 bg-primary/95 px-4 py-1.5 text-center text-xs text-primary-content">
          Admin session active — restricted area
        </div>
      )}
    </header>
  );
}
