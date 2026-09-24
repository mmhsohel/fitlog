"use client";

import { CheckCircle2, X } from "lucide-react";
import { usePlan } from "@/context/PlanContext";

export default function ToastStack() {
  const { toasts, dismissToast } = usePlan();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 sm:bottom-6 sm:right-6">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="flex items-center gap-3 rounded-lg border border-line bg-surface3 px-4 py-3 shadow-xl shadow-black/40 animate-[toastIn_.2s_ease-out]"
        >
          <CheckCircle2 size={18} className="shrink-0 text-accent" />
          <span className="text-sm text-white/90">{t.message}</span>
          <button
            onClick={() => dismissToast(t.id)}
            className="ml-2 text-white/40 hover:text-white"
            aria-label="Dismiss"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
