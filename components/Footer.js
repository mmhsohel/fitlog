import { Dumbbell } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-[#1a1d23]">
      <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-3 px-4 py-8 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
             <Image
              src="/logo.png"
              alt="FitLog Logo"
              width={20}
              height={20}
               className="rotate-90 transition-transform"
            />
          <span className="font-display text-sm font-bold tracking-wide text-white">
            FITLOG
          </span>
        </div>
        <p className="text-xs text-white/40">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
