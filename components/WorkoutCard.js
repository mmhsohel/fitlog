"use client";

import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import WorkoutIllustration from "./WorkoutIllustration";

export default function WorkoutCard({ workout }) {
  console.log("WorkoutCard workout:", workout.raw); // Debugging line
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface2 transition-colors hover:border-accent/50"
    >
      <WorkoutIllustration image={workout.raw.image} seed={workout.id + workout.name} className="h-40 w-full" />

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex flex-wrap gap-1.5">
          {workout.category.slice(0, 2).map((c) => (
            <span
              key={c}
              className="rounded-full bg-surface3 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent"
            >
              {c}
            </span>
          ))}
        </div>

        <h3 className="font-display text-base font-bold uppercase leading-snug text-white group-hover:text-accent">
          {workout.name}
        </h3>

        <p className="truncate text-xs text-white/50">{workout.equipment}</p>

        <div className="mt-auto flex items-center gap-4 pt-2 text-xs text-white/60">
          <span className="flex items-center gap-1">
            <Clock size={13} /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame size={13} /> {workout.calories} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star size={13} className="fill-accent text-accent" />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
