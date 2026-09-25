"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Clock,
  Flame,
  Star,
  CheckCircle2,
  X,
  Dumbbell,
} from "lucide-react";

import { usePlan } from "@/context/PlanContext";
import WorkoutIllustration from "@/components/WorkoutIllustration";
import Loader from "@/components/Loader";
import SortDropdown from "@/components/SortDropdown";

const TABS = [
  { key: "plan", label: "Today's Plan" },
  { key: "saved", label: "Saved" },
];

function MetricCard({ label, value }) {
  return (
    <div className="flex-1 rounded-lg border border-line bg-surface2 px-4 py-5 text-center">
      <p className="font-display text-3xl font-bold text-accent">
        {value}
      </p>

      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/50">
        {label}
      </p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-line bg-surface2 py-20 text-center">
      <Dumbbell size={28} className="text-white/30" />

      <h3 className="font-display text-lg font-bold uppercase text-white">
        Nothing here yet
      </h3>

      <p className="max-w-xs text-sm text-white/50">
        Browse the library and add a lift to get today moving.
      </p>

      <Link
        href="/"
        className="mt-2 rounded-md bg-accent px-5 py-2 text-sm font-bold uppercase text-black"
      >
        Go to workouts
      </Link>
    </div>
  );
}

function PlanRow({ workout, onRemove, onToggleDone }) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-line bg-surface2 p-4 sm:flex-row sm:items-center">
      <WorkoutIllustration
        image={workout.raw.image}
        seed={workout.id + workout.name}
        className="h-20 w-full shrink-0 rounded-md sm:w-28"
      />

      <div className="flex-1">
        <h3
          className={`font-display text-base font-bold uppercase ${
            workout.done
              ? "text-white/40 line-through"
              : "text-white"
          }`}
        >
          {workout.name}
        </h3>

        <p className="text-xs text-white/50">
          {workout.equipment}
        </p>

        <div className="mt-2 flex items-center gap-4 text-xs text-white/60">
          <span className="flex items-center gap-1">
            <Clock size={13} />
            {workout.duration} min
          </span>

          <span className="flex items-center gap-1">
            <Flame size={13} />
            {workout.calories} kcal
          </span>

          <span className="flex items-center gap-1">
            <Star
              size={13}
              className="fill-accent text-accent"
            />
            {workout.rating}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href={`/workout/${workout.id}`}
          className="rounded-md border border-white/20 px-3 py-1.5 text-xs font-semibold text-white/80 hover:border-accent hover:text-accent"
        >
          View Details
        </Link>

        {onToggleDone && (
          <button
            onClick={() => onToggleDone(workout.id)}
            className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-semibold ${
              workout.done
                ? "bg-accent text-black"
                : "border border-white/20 text-white/80 hover:border-accent hover:text-accent"
            }`}
          >
            <CheckCircle2 size={14} />
            Mark as Done
          </button>
        )}

        <button
          onClick={() => onRemove(workout.id)}
          className="rounded-md border border-white/20 p-1.5 text-white/60 hover:border-red-400 hover:text-red-400"
          aria-label="Remove"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}

export default function MyPlanPage() {
  const [tab, setTab] = useState("plan");

  const [sort, setSort] = useState("duration");

  const {
    plan,
    saved,
    metrics,
    removeFromPlan,
    removeFromSaved,
    toggleDone,
    hydrated,
  } = usePlan();

  // Get the currently active list
  const list = tab === "plan" ? plan : saved;

  // Sort the current list
  const sortedList = useMemo(() => {
    return [...list].sort(
      (a, b) =>
        (Number(b[sort]) || 0) -
        (Number(a[sort]) || 0)
    );
  }, [list, sort]);

  return (
    <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-bold uppercase text-white sm:text-4xl">
        My Plan
      </h1>

      <p className="mt-1 text-sm text-white/50">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* Metrics */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <MetricCard
          label="Exercises"
          value={metrics.exercises}
        />

        <MetricCard
          label="Minutes"
          value={metrics.minutes}
        />

        <MetricCard
          label="Calories"
          value={metrics.calories}
        />
      </div>

      {/* Tabs */}
      <div className="mt-8 flex gap-2 border-b border-line">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2.5 text-sm font-bold uppercase tracking-wide transition-colors ${
              tab === t.key
                ? "border-b-2 border-accent text-accent"
                : "text-white/50 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Sort */}
      <div className="mt-6 flex justify-end">
        <SortDropdown
          value={sort}
          onChange={setSort}
        />
      </div>

      {/* Workout list */}
      <div className="mt-4 space-y-4">
        {!hydrated ? (
          <Loader />
        ) : list.length === 0 ? (
          <EmptyState />
        ) : (
          sortedList.map((w) => (
            <PlanRow
              key={w.id}
              workout={w}
              onRemove={
                tab === "plan"
                  ? removeFromPlan
                  : removeFromSaved
              }
              onToggleDone={
                tab === "plan"
                  ? toggleDone
                  : null
              }
            />
          ))
        )}
      </div>
    </div>
  );
}