import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GCTU Consult — Lecturer Consultation Booking",
    short_name: "GCTU Consult",
    description: "Book lecturer consultations at Ghana Communication Technology University.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait-primary",
    theme_color: "#0b4f8a",
    background_color: "#eef3f8",
    categories: ["education", "productivity"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
