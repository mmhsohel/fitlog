import { Dumbbell } from "lucide-react";
import Image from "next/image";

export default function Loader({ label = "Loading workouts…" }) {
  return (
   <div className="flex flex-col items-center justify-center gap-3 py-24 text-white/60">
  <Image
    src="/logo.png"
    alt="Loading"
    width={30}
    height={30}
    className="rotate-90 animate-spin-fast"
  />

  <p className="text-sm font-medium tracking-wide">{label}</p>
</div>
  );
}
