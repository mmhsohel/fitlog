import { Dumbbell } from "lucide-react";

export default function Loader({ label = "Loading workouts…" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-white/60">
      <Dumbbell size={28} className="animate-bounce text-accent" />
      <p className="text-sm font-medium tracking-wide">{label}</p>
    </div>
  );
}
