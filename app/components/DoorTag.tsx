type Status = "available" | "booked" | "away";

const STATUS: Record<Status, { label: string; badge: string }> = {
  available: {
    label: "Available now",
    badge: "inline-flex rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-900 ring-1 ring-emerald-100",
  },
  booked: {
    label: "Fully booked",
    badge: "inline-flex rounded-full bg-rose-100 px-3 py-1.5 text-xs font-semibold text-rose-900 ring-1 ring-rose-100",
  },
  away: {
    label: "Away",
    badge: "inline-flex rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-900 ring-1 ring-slate-100",
  },
};

export default function DoorTag({ status = "available" }: { status?: Status }) {
  const s = STATUS[status];
  return <span className={s.badge}>{s.label}</span>;
}
