# FitLog — Workout Library

A dark, no-nonsense gym companion built with Next.js. Browse a library of
lifts pulled live from the FitLog API, drill into a workout's full detail
page, and lock lifts into **Today's Plan** or **Saved for later** — all
persisted across reloads.

## Description

FitLog lets you pick a lift, add it to today's plan, and watch the day's
work (exercises, minutes, calories) add up in real time. It's built as a
responsive, mobile-first Next.js app on top of the public FitLog API
(`https://api.abcz.workers.dev/api/fitlog`), with global state shared across
the app via React Context.

## Technologies Used

- **Next.js 14** (App Router) — routing, layouts, client/server components
- **React 18** — UI and state
- **Tailwind CSS** — styling and full responsiveness
- **React Context API** — global Today's Plan / Saved state, propagated
  across the Navbar, Library, Detail, and My Plan pages
- **lucide-react** — icon set
- **localStorage** — persists the plan/saved lists across page reloads

## Features

1. **Live workout library** — fetches all lifts from the FitLog API and
   renders them as a responsive 3-column grid with category tags, equipment,
   and a stats row (duration, calories, rating).
2. **Workout detail pages** (`/workout/[id]`) — full spec panel (equipment,
   difficulty, sets, reps, duration, calories, rating) and numbered
   instructions, fetched live by ID from the API.
3. **Today's Plan & Saved tracking** — "Add to today's plan" and "Save for
   later" update global state instantly, reflected in the Navbar badge
   counters and on `/my-plan`, with a 5-lift cap and toast confirmations.
4. **My Plan dashboard** (`/my-plan`) — live Exercises / Minutes / Calories
   summary, tabbed Today's Plan / Saved lists, Mark as Done, and Remove,
   with a friendly empty state and loading state.
5. **Sort & search** — reorder the library by Duration, Calories, or
   Rating, and filter by name or category, without leaving the page.
6. **Fully responsive** across mobile, tablet, and desktop, with a custom
   404 page for any unknown route and state that survives a reload via
   `localStorage`.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Project Structure

```
app/                Next.js App Router pages (home, workout/[id], my-plan, 404)
components/         Navbar, Hero, WorkoutCard, LibrarySection, My Plan UI, Toasts
context/PlanContext.js   Global Today's Plan / Saved state + localStorage
lib/api.js          FitLog API fetch + normalization helpers
```
