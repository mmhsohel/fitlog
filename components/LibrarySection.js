"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { getAllWorkouts } from "@/lib/api";
import WorkoutCard from "./WorkoutCard";
import SortDropdown from "./SortDropdown";
import Loader from "./Loader";

export default function LibrarySection() {
  const [workouts, setWorkouts] = useState([]);
  const [status, setStatus] = useState("loading"); 
  const [sort, setSort] = useState("duration");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let alive = true;
    getAllWorkouts()
      .then((data) => {
        if (!alive) return;
        setWorkouts(data);
        setStatus("ready");
      })
      .catch(() => {
        if (!alive) return;
        setStatus("error");
      });
    return () => {
      alive = false;
    };
  }, []);

  const filtered = useMemo(() => {
    let list = [...workouts];
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (w) =>
          w.name.toLowerCase().includes(q) ||
          w.category.some((c) => c.toLowerCase().includes(q))
      );
    }
    list.sort((a, b) => (b[sort] || 0) - (a[sort] || 0));
    return list;
  }, [workouts, sort, query]);

  return (
    <section id="library" className="mx-auto max-w-content px-4 py-16 sm:px-6">
      <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold uppercase text-white">
            The Library
          </h2>
          <p className="mt-1 text-sm text-white/50">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-md border border-line bg-surface2 px-3 py-2">
            <Search size={14} className="text-white/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search lifts…"
              className="w-32 bg-transparent text-xs text-white placeholder:text-white/30 focus:outline-none sm:w-44"
            />
          </div>
          <SortDropdown value={sort} onChange={setSort} />
        </div>
      </div>

      {status === "loading" && <Loader />}

      {status === "error" && (
        <p className="rounded-md border border-line bg-surface2 p-6 text-center text-sm text-white/60">
          Couldn&apos;t load the workout library right now. Please try again shortly.
        </p>
      )}

      {status === "ready" && filtered.length === 0 && (
        <p className="rounded-md border border-line bg-surface2 p-6 text-center text-sm text-white/60">
          No lifts match your search.
        </p>
      )}

      {status === "ready" && filtered.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((w) => (
            <WorkoutCard key={w.id} workout={w} />
          ))}
        </div>
      )}
    </section>
  );
}
