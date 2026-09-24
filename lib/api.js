const API_BASE = "https://api.abcz.workers.dev/api/fitlog";

/**
 * The public FitLog API's exact field names aren't guaranteed, so every
 * record is normalized here into one predictable shape the rest of the
 * app can rely on. Unknown/missing fields fall back to sane defaults
 * instead of crashing the UI.
 */
function toArray(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string" && value.trim()) {
    return value.split(",").map((v) => v.trim()).filter(Boolean);
  }
  return [];
}

function pick(obj, keys, fallback) {
  for (const key of keys) {
    if (obj && obj[key] !== undefined && obj[key] !== null && obj[key] !== "") {
      return obj[key];
    }
  }
  return fallback;
}

export function normalizeWorkout(raw, index = 0) {
  if (!raw) return null;

  const id = pick(raw, ["id", "_id", "workoutId", "slug"], String(index + 1));
  const name = pick(raw, ["name", "title", "workoutName"], "Untitled Lift");
  const category = toArray(
    pick(raw, ["category", "categories", "tags", "muscleGroup"], [])
  );
  const equipmentRaw = pick(raw, ["equipment", "equipments", "gear"], []);
  const equipment = Array.isArray(equipmentRaw)
    ? equipmentRaw.join(", ")
    : equipmentRaw || "Bodyweight";

  const duration = pick(raw, ["duration", "durationMinutes", "time"], 20);
  const calories = pick(raw, ["calories", "kcal", "caloriesBurned"], 150);
  const rating = pick(raw, ["rating", "score"], 4.5);
  const difficulty = pick(raw, ["difficulty", "level"], "Intermediate");
  const sets = pick(raw, ["sets"], 3);
  const reps = pick(raw, ["reps", "repetitions"], "8-12");
  const description = pick(
    raw,
    ["description", "subtitle", "summary", "about"],
    "A focused movement built to add real, trackable work to your session."
  );

  let instructions = pick(raw, ["instructions", "steps"], []);
  if (typeof instructions === "string") {
    instructions = instructions
      .split(/\n|\.\s+/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  if (!Array.isArray(instructions) || instructions.length === 0) {
    instructions = [
      "Set up in a stable, controlled starting position.",
      "Engage your core and move the weight with a slow, deliberate tempo.",
      "Pause briefly at full contraction, focusing on the working muscle.",
      "Return to the start under control and repeat for the full set.",
    ];
  }

  return {
    id: String(id),
    name: String(name).toUpperCase(),
    category: category.length ? category : ["FULL BODY"],
    equipment,
    duration: Number(duration) || 20,
    calories: Number(calories) || 150,
    rating: Number(rating) || 4.5,
    difficulty,
    sets,
    reps,
    description,
    instructions,
    raw,
  };
}

export async function getAllWorkouts() {
  const res = await fetch(API_BASE, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load workouts");
  const data = await res.json();
  const list = Array.isArray(data) ? data : data?.data || data?.results || [];
  return list.map((w, i) => normalizeWorkout(w, i));
}

export async function getWorkoutById(id) {
  const res = await fetch(`${API_BASE}/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load workout");
  const data = await res.json();
  const raw = data?.data || data;
  return normalizeWorkout(raw);
}
