export default function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div
        aria-hidden
        className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-orange-400/20 blur-2xl"
        style={{ animation: "pulse-ring 4s ease-in-out infinite" }}
      />
      <div
        aria-hidden
        className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-blue-500/15 blur-2xl ambient-blob"
      />

      <div className="relative overflow-hidden rounded-3xl border-2 border-base-300/80 bg-white p-6 shadow-2xl shadow-blue-500/10">
        <div aria-hidden className="hero-grid absolute inset-0 opacity-80" />

        <div className="relative space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Today</p>
              <p className="text-lg font-bold text-slate-900">Office hours</p>
            </div>
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
              3 slots open
            </span>
          </div>

          <div className="space-y-3">
            {[
              { time: "10:00 AM", dept: "Computer Science", color: "border-l-blue-500 bg-blue-50" },
              { time: "1:30 PM", dept: "Mathematics", color: "border-l-orange-500 bg-orange-50" },
              { time: "3:00 PM", dept: "Telecom Engineering", color: "border-l-green-500 bg-green-50" },
            ].map((slot) => (
              <div
                key={slot.time}
                className={`rounded-xl border border-slate-200 border-l-4 ${slot.color} px-4 py-3 transition-transform hover:scale-[1.02]`}
              >
                <p className="text-sm font-bold text-slate-900">{slot.time}</p>
                <p className="text-xs text-slate-600">{slot.dept}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-green-500 p-4 text-white">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/80">Booking code</p>
            <p className="mt-1 font-mono text-xl font-bold tracking-wider">GCTU-2841</p>
          </div>
        </div>

        <div
          aria-hidden
          className="absolute -right-3 top-1/2 h-16 w-16 rounded-2xl border-2 border-violet-300 bg-violet-100 rotate-12"
        />
        <div
          aria-hidden
          className="absolute -left-2 bottom-8 h-10 w-10 rounded-full border-4 border-orange-300 bg-orange-100"
        />
      </div>
    </div>
  );
}
