type BookingSlipProps = {
  lecturer: string;
  department: string;
  day: string;
  time: string;
  code: string;
  status: "confirmed" | "pending";
};

export default function BookingSlip({
  lecturer,
  department,
  day,
  time,
  code,
  status,
}: BookingSlipProps) {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-[0_20px_70px_-28px_rgba(15,23,42,0.15)]">
      <div className="bg-primary/5 px-5 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
        Consultation slip
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{day}</p>
            <h3 className="mt-1 font-serif text-lg font-semibold text-slate-950">{lecturer}</h3>
            <p className="text-sm text-slate-500">{department}</p>
          </div>
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
              status === "confirmed"
                ? "bg-emerald-100 text-emerald-900 ring-1 ring-emerald-100"
                : "bg-amber-100 text-amber-900 ring-1 ring-amber-100"
            }`}
          >
            {status === "confirmed" ? "Confirmed" : "Pending"}
          </span>
        </div>

        <div className="mt-5 grid gap-4 rounded-3xl border border-slate-200/75 bg-slate-50 p-4 text-sm text-slate-600 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.24em] text-slate-400">Time</p>
            <p className="mt-1 font-semibold text-slate-900">{time}</p>
          </div>
          <div className="text-right">
            <p className="text-[0.65rem] uppercase tracking-[0.24em] text-slate-400">Code</p>
            <p className="mt-1 font-mono text-sm font-bold text-primary">{code}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
