import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-content flex-col items-center justify-center px-4 py-28 text-center sm:px-6">
      <Dumbbell size={40} className="mb-4 text-accent" />
      <h1 className="font-display text-5xl font-bold text-white">404</h1>
      <p className="mt-3 text-sm text-white/50">
        This lift doesn&apos;t exist in the library. Let&apos;s get you back
        on track.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-md bg-accent px-6 py-2.5 text-sm font-bold uppercase text-black"
      >
        Back to Library
      </Link>
    </div>
  );
}
