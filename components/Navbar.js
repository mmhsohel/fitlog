"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();
  const [open, setOpen] = useState(false);

  const linkClass = (href) => {
    const active =
      href === "/#library"
        ? pathname === "/"
        : pathname === href;

    return `text-sm font-semibold tracking-wide transition-colors ${active ? "text-accent" : "text-white/70 hover:text-white"
      }`;
  };

  const mobileLinkClass = (href) => {
    const active =
      href === "/#library"
        ? pathname === "/"
        : pathname === href;

    return `rounded-md px-2 py-2.5 text-sm font-semibold ${
      active ? "text-accent" : "text-white/80 hover:text-white"
    }`;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Image
            src="/logo.png"
            alt="FitLog Logo"
            width={20}
            height={20}
            className="rotate-90 transition-transform"
          />
          <span className="font-display text-lg font-bold tracking-wide text-white">
            FITLOG
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/#library" className={linkClass("/#library")}>
            Workout
          </Link>
          <Link href="/my-plan" className={linkClass("/my-plan")}>
            My Plan
          </Link>
        </nav>

        {/* Badges: always visible, on every screen size */}
        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-black"
          >
            Plan <span className="rounded-full bg-black/15 px-1.5">{plan.length}</span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full border border-white/30 px-3 py-1.5 text-xs font-bold text-white"
          >
            Saved <span className="rounded-full border border-white/20 px-1.5">{saved.length}</span>
          </Link>

          <button
            onClick={() => setOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-white md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-surface px-4 pb-5 pt-3 sm:px-6 md:hidden">
          <nav className="flex flex-col gap-1">
            <Link href="/#library" onClick={() => setOpen(false)} className={mobileLinkClass("/#library")}>
              Workout
            </Link>
            <Link href="/my-plan" onClick={() => setOpen(false)} className={mobileLinkClass("/my-plan")}>
              My Plan
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}