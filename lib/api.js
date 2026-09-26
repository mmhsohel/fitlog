const API_BASE = "https://api.abcz.workers.dev/api/fitlog";

function toArray(value) {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  if (typeof value === "string" && value.trim()) {
    return value
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
  }

  return [];
}

function pick(obj, keys, fallback = undefined) {
  for (const key of keys) {
    if (
      obj &&
      obj[key] !== undefined &&
      obj[key] !== null &&
      obj[key] !== ""
    ) {
      return obj[key];
    }
  }

  return fallback;
}

export function normalizeWorkout(raw, index = 0) {
  if (!raw) return null;

  const id = pick(
    raw,
    ["id", "_id", "workoutId", "slug"],
    String(index + 1)
  );

  const name = pick(
    raw,
    ["name", "title", "workoutName"],
    "Untitled Workout"
  );

  // API uses muscleGroups
  const muscleGroups = toArray(
    pick(
      raw,
      ["muscleGroups", "muscleGroup", "category", "categories", "tags"],
      []
    )
  );

  const equipmentRaw = pick(
    raw,
    ["equipment", "equipments", "gear"],
    []
  );

  const equipment = Array.isArray(equipmentRaw)
    ? equipmentRaw.join(", ")
    : String(equipmentRaw || "Bodyweight");

  const difficulty = pick(
    raw,
    ["difficulty", "level"],
    "Intermediate"
  );

  const duration = Number(
    pick(raw, ["duration", "durationMinutes", "time"], 20)
  );

  const calories = Number(
    pick(
      raw,
      ["caloriesBurned", "calories", "kcal"],
      150
    )
  );

  const sets = pick(raw, ["sets"], 3);

  const reps = pick(
    raw,
    ["reps", "repetitions"],
    "8-12"
  );

  const rating = Number(
    pick(raw, ["rating", "score"], 4.5)
  );

  const description = pick(
    raw,
    ["description", "subtitle", "summary", "about"],
    ""
  );

  const image = pick(
    raw,
    ["image", "imageUrl", "thumbnail"],
    ""
  );

  let instructions = pick(
    raw,
    ["instructions", "steps"],
    []
  );

  if (typeof instructions === "string") {
    instructions = instructions
      .split(/\n|\.\s+/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (!Array.isArray(instructions)) {
    instructions = [];
  }


  
  return {
    id: String(id),

    name: String(name),

    image: String(image),

    muscleGroups,

    // Keep category if your existing UI expects category
    category: muscleGroups,

    equipment,

    difficulty: String(difficulty),

    duration: Number.isFinite(duration) ? duration : 20,

    calories: Number.isFinite(calories) ? calories : 150,

    // Keep original API name available too
    caloriesBurned: Number.isFinite(calories)
      ? calories
      : 150,

    sets,

    reps,

    rating: Number.isFinite(rating) ? rating : 4.5,

    description: String(description),

    instructions,
    raw,
  };
}

export async function getAllWorkouts() {
  const response = await fetch(API_BASE, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to load workouts: ${response.status}`
    );
  }

  const data = await response.json();

  const workouts = Array.isArray(data)
    ? data
    : data?.data ||
      data?.results ||
      data?.workouts ||
      [];

  if (!Array.isArray(workouts)) {
    throw new Error("Invalid workout API response");
  }

  return workouts
    .map((workout, index) =>
      normalizeWorkout(workout, index)
    )
    .filter(Boolean);
}

export async function getWorkoutById(id) {
  if (!id) {
    throw new Error("Workout ID is required");
  }

  const response = await fetch(
    `${API_BASE}/${encodeURIComponent(id)}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }

    throw new Error(
      `Failed to load workout: ${response.status}`
    );
  }

  const data = await response.json();

  const workout = data?.data || data;

  return normalizeWorkout(workout);
}