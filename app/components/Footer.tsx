"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/login" || pathname === "/register" || pathname === "/admin/login") {
    return null;
  }

  return (
    <footer className="border-t border-slate-200/80 bg-slate-950 text-slate-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-sm font-bold text-white shadow-lg">
              G
            </span>
            <div>
              <p className="font-serif text-xl font-semibold text-white">GCTU Consult</p>
              <p className="text-sm text-slate-400">Ghana Communication Technology University</p>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300">
            The official consultation booking platform for GCTU students and lecturers. Book office hours in seconds — no email chains, no guesswork.
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Explore</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {[
              { href: "/lecturers", label: "Find a lecturer" },
              { href: "/#how-it-works", label: "How it works" },
              { href: "/register", label: "Create account" },
              { href: "/login", label: "Log in" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Support</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>help@gctu.edu.gh</li>
            <li>Mon – Fri, 8:00 – 17:00 GMT</li>
            <li>Tema, Ghana</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <p className="mx-auto max-w-6xl px-5 py-4 text-xs text-slate-500 sm:px-6">
          © {new Date().getFullYear()} Ghana Communication Technology University. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
