"use client";

import { Dumbbell, Flame, HeartPulse, PersonStanding, Zap, Activity } from "lucide-react";

const PALETTES = [
  ["#ccff00", "#1c1c1c"],
  ["#7dd3fc", "#1c1c1c"],
  ["#fca5a5", "#1c1c1c"],
  ["#c4b5fd", "#1c1c1c"],
  ["#fdba74", "#1c1c1c"],
  ["#5eead4", "#1c1c1c"],
];

const ICONS = [Dumbbell, Flame, HeartPulse, PersonStanding, Zap, Activity];

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * A self-drawn illustration (gradient + icon), used instead of pulling
 * images from the API so every card has its own consistent, owned art.
 */
export default function WorkoutIllustration({ seed = "", className = "" }) {
  const h = hashString(String(seed));
  const [accent] = PALETTES[h % PALETTES.length];
  const Icon = ICONS[h % ICONS.length];

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(circle at 30% 20%, ${accent}33, transparent 60%), linear-gradient(135deg, #1a1a1a, #101010)`,
      }}
    >
      <div
        className="absolute -right-6 -top-6 h-28 w-28 rounded-full opacity-20"
        style={{ background: accent }}
      />
      <div
        className="absolute -left-8 -bottom-8 h-32 w-32 rounded-full opacity-10"
        style={{ background: accent }}
      />
      <Icon size={56} strokeWidth={1.5} color={accent} className="relative z-10" />
    </div>
  );
}
