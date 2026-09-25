"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import {  Plus, Bookmark } from "lucide-react";
import { getWorkoutById } from "@/lib/api";
import { usePlan } from "@/context/PlanContext";
import WorkoutIllustration from "@/components/WorkoutIllustration";
import Loader from "@/components/Loader";

const SPEC_ORDER = [
  ["EQUIPMENT", "equipment"],
  ["DIFFICULTY", "difficulty"],
  ["SETS", "sets"],
  ["REPS", "reps"],
  ["DURATION", "duration", "min"],
  ["CALORIES", "calories", "kcal"],
  ["RATING", "rating"],
];

export default function WorkoutDetailPage() {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);
  const [status, setStatus] = useState("loading");
  const { addToPlan, addToSaved, isPlanFull } = usePlan();

  useEffect(() => {
    let alive = true;
    getWorkoutById(id)
      .then((data) => {
        if (!alive) return;
        if (!data) {
          setStatus("notfound");
          return;
        }
        setWorkout(data);
        setStatus("ready");
      })
      .catch(() => {
        if (!alive) return;
        setStatus("error");
      });
    return () => {
      alive = false;
    };
  }, [id]);

  if (status === "loading") return <Loader label="Loading workout…" />;

  if (status === "notfound") return notFound();

  if (status === "error") {
    return (
      <div className="mx-auto max-w-content px-4 py-24 text-center sm:px-6">
        <p className="text-white/60">
          Couldn&apos;t load this workout. Please try again shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
      <div className="grid gap-10 md:grid-cols-2">
        <WorkoutIllustration
          image={workout.raw.image}
          seed={workout.id + workout.name}
          className="h-72 w-full rounded-2xl border border-line sm:h-96"
        />

        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            {workout.category.map((c) => (
              <span
                key={c}
                className="rounded-full bg-surface3 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-accent"
              >
                {c}
              </span>
            ))}
          </div>

          <h1 className="font-display text-3xl font-bold uppercase leading-tight text-white sm:text-4xl">
            {workout.name}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            {workout.description}
          </p>

          <div className="mt-6 divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface2">
            {SPEC_ORDER.map(([label, key, unit]) => (
              <div
                key={key}
                className="flex items-center justify-between px-4 py-2.5 text-sm"
              >
                <span className="font-semibold tracking-wide text-white/50">
                  {label}
                </span>
                <span className="font-medium text-white">
                  {workout[key]}
                  {unit ? ` ${unit}` : ""}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => addToPlan(workout)}
              disabled={isPlanFull}
              className="flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-bold uppercase text-black transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus size={16} /> Add to today&apos;s plan
            </button>
            <button
              onClick={() => addToSaved(workout)}
              className="flex items-center gap-2 rounded-md border border-white/30 px-5 py-2.5 text-sm font-bold uppercase text-white transition-colors hover:border-accent hover:text-accent"
            >
              <Bookmark size={16} /> Save for later
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="mb-4 font-display text-xl font-bold uppercase text-white">
          Instructions
        </h2>
        <ol className="space-y-3">
          {workout.instructions.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-white/70">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-black">
                {i + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
