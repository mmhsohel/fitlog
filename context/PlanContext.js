"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const PlanContext = createContext(null);
const PLAN_LIMIT = 5;
const STORAGE_KEY = "fitlog-state-v1";

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted state on mount
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setPlan(parsed.plan || []);
        setSaved(parsed.saved || []);
      }
    } catch (e) {
      // ignore corrupt storage
    } finally {
      setHydrated(true);
    }
  }, []);

  // Persist on change
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ plan, saved })
      );
    } catch (e) {
      // ignore quota errors
    }
  }, [plan, saved, hydrated]);

  const pushToast = useCallback((message, tone = "default") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, tone }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const isPlanFull = plan.length >= PLAN_LIMIT;

  const addToPlan = useCallback(
    (workout) => {
      setPlan((prev) => {
        if (prev.some((w) => w.id === workout.id)) {
          pushToast("Already in today's plan");
          return prev;
        }
        if (prev.length >= PLAN_LIMIT) {
          pushToast("Today's plan is full (5 lifts max)");
          return prev;
        }
        pushToast("Added to today's plan");
        return [...prev, { ...workout, done: false }];
      });
    },
    [pushToast]
  );

  const addToSaved = useCallback(
    (workout) => {
      setSaved((prev) => {
        if (prev.some((w) => w.id === workout.id)) {
          pushToast("Already saved");
          return prev;
        }
        pushToast("Saved for later");
        return [...prev, workout];
      });
    },
    [pushToast]
  );

  const removeFromPlan = useCallback(
    (id) => {
      setPlan((prev) => prev.filter((w) => w.id !== id));
      pushToast("Removed from today's plan");
    },
    [pushToast]
  );

  const removeFromSaved = useCallback(
    (id) => {
      setSaved((prev) => prev.filter((w) => w.id !== id));
      pushToast("Removed from saved");
    },
    [pushToast]
  );

  const toggleDone = useCallback(
    (id) => {
      setPlan((prev) =>
        prev.map((w) => (w.id === id ? { ...w, done: !w.done } : w))
      );
      pushToast("Marked as done");
    },
    [pushToast]
  );

  const metrics = useMemo(() => {
    return plan.reduce(
      (acc, w) => ({
        exercises: acc.exercises + 1,
        minutes: acc.minutes + (Number(w.duration) || 0),
        calories: acc.calories + (Number(w.calories) || 0),
      }),
      { exercises: 0, minutes: 0, calories: 0 }
    );
  }, [plan]);

  const value = {
    plan,
    saved,
    metrics,
    isPlanFull,
    addToPlan,
    addToSaved,
    removeFromPlan,
    removeFromSaved,
    toggleDone,
    toasts,
    pushToast,
    dismissToast,
    hydrated,
  };

  return (
    <PlanContext.Provider value={value}>{children}</PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}
