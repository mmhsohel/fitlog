"use client";

import { ArrowDown, Dumbbell } from "lucide-react";

export default function Hero() {
  return (
    <section className="border-b border-line bg-surface">
      <div className="mx-auto grid max-w-content items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
        <div>
          <p className="mb-3 text-xs font-bold tracking-[0.25em] text-accent">
            WORKOUT LIBRARY
          </p>
          <h1 className="font-display text-4xl font-bold uppercase leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            Train with intent.
            <br /> Log every set.
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-[1.02]"
          >
            Browse Workouts <ArrowDown size={16} />
          </a>
        </div>

        <div className="relative flex h-64 items-center justify-center rounded-2xl border border-line bg-gradient-to-br from-surface2 to-black sm:h-80 md:h-96">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-accent/10 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-accent/5 blur-3xl" />
          <Dumbbell
            size={140}
            strokeWidth={1}
            className="relative z-10 text-accent"
          />
        </div>
      </div>
    </section>
  );
}
