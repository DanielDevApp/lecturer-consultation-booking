import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["500", "600", "700"],
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "GCTU Consult | Lecturer Consultation Booking",
  description: "GCTU's student and lecturer consultation booking platform for seamless office hours scheduling.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="gctu">
      <body className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} font-body bg-base-100`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}