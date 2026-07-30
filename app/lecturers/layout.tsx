import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find a lecturer",
  description: "Browse GCTU lecturer office hours and book a consultation slot.",
};

export default function LecturersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
