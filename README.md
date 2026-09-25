FitLog — Workout Library

FitLog is a responsive workout library built with Next.js and React. It provides a structured interface for discovering workouts, viewing detailed exercise information, building a personal workout plan, and saving exercises for later.

Workout data is retrieved from the FitLog API and normalized through a dedicated API client before being consumed by the application.

Overview

FitLog provides a complete workout-browsing and planning experience:

Browse workouts from the FitLog API

Search and filter exercises

Sort workouts by duration, calories, or rating

View detailed workout information

Add exercises to Today's Plan

Save exercises for later

Track planned exercises, total duration, and calories

Mark planned exercises as completed

Persist plan and saved state across browser reloads

Provide responsive layouts across mobile, tablet, and desktop

Handle unknown routes with a custom 404 page

The application uses the Next.js App Router, React Context for shared client-side state, and localStorage for persistence.

Features

Workout Library

The library retrieves workout data from the FitLog API and presents exercises in a responsive grid.

Each workout can display:

Workout name

Muscle groups / categories

Equipment

Difficulty

Duration

Calories

Rating

Workout image

Users can search the library by workout name or category and sort results by:

Duration

Calories

Rating

Workout Details

Each workout has a dedicated dynamic route:

/workout/[id]

The detail page retrieves the selected workout from the API and presents its complete specification, including:

Equipment

Difficulty

Sets

Repetitions

Duration

Calories

Rating

Description

Step-by-step instructions

Users can add the workout directly to Today's Plan or save it for later.

Today's Plan

Users can build a daily workout plan from the library.

The plan provides:

Exercise count

Total workout duration

Estimated calories

Individual workout entries

Mark as Done functionality

Remove functionality

Maximum plan capacity

Toast notifications for user actions

Plan changes are reflected immediately throughout the application.

Saved Workouts

Users can save workouts for later without adding them to Today's Plan.

Saved workouts are available from the My Plan dashboard and remain available after a browser reload.

My Plan Dashboard

The /my-plan page provides a centralized view of the user's workout activity.

It includes:

Today's Plan

Saved workouts

Exercise count

Total duration

Total calories

Completion state

Remove actions

Empty states

Loading states

Persistent Client State

FitLog uses React Context to provide shared plan state across the application.

The shared state is used by:

Navbar

Workout Library

Workout Details

My Plan

Toast notifications

Plan and saved-workout data are persisted using browser localStorage, allowing the user's state to survive page reloads.

Note: This persistence is browser-local. It is not a server-side account or cloud synchronization system.

Architecture

FitLog follows a modular Next.js App Router structure.

User
 │
 ▼
Next.js App Router
 │
 ├── Home
 │
 ├── Workout Library
 │      │
 │      ▼
 │   API Client
 │      │
 │      ▼
 │   FitLog API
 │
 ├── Workout Details
 │      │
 │      ▼
 │   API Client
 │
 └── My Plan
        │
        ▼
   PlanContext
        │
        ▼
    localStorage

Data Flow

Workout data follows this general flow:

FitLog API
    ↓
lib/api.js
    ↓
Response normalization
    ↓
React components
    ↓
Workout cards / detail pages

Plan-related state follows:

User action
    ↓
PlanContext
    ↓
Today's Plan / Saved state
    ↓
localStorage
    ↓
State restored after reload

Technology Stack

Technology

Purpose

Next.js

Application framework and App Router

React

Component-based UI and client-side state

Tailwind CSS

Styling and responsive design

React Context API

Shared workout-plan state

Lucide React

UI iconography

localStorage

Browser-side persistence

FitLog API

Workout data source

Use the exact Next.js and React versions defined in package.json as the authoritative project versions.

API Integration

The application consumes workout data from:

https://api.abcz.workers.dev/api/fitlog

The API integration is isolated in:

lib/api.js

The API client is responsible for:

Fetching the workout collection

Fetching individual workouts

Handling API response structures

Normalizing API fields

Providing a consistent data structure to UI components

Handling missing or optional values

This separation prevents UI components from depending directly on the external API response format.

Normalized Workout Model

The frontend works with a normalized representation containing fields such as:

id
name
category
equipment
duration
calories
rating
difficulty
sets
reps
description
instructions
raw

The original API response can also be retained through the raw property when additional API fields are required by the UI.

Project Structure

app/
├── layout.*
├── page.*
├── not-found.*
├── workout/
│   └── [id]/
│       └── page.*
└── my-plan/
    └── page.*

components/
├── Navbar
├── Hero
├── WorkoutCard
├── WorkoutIllustration
├── LibrarySection
├── My Plan UI
└── Toast UI

context/
└── PlanContext.*

lib/
└── api.*

public/
└── static assets

Responsibilities

app/

Contains application routes, layouts, dynamic pages, and route-level metadata.

components/

Contains reusable presentation and UI components.

context/

Contains application-wide client-side state such as Today's Plan and Saved workouts.

lib/

Contains API communication, normalization, and reusable application utilities.

public/

Contains static assets such as logos and locally hosted images.

Routing

The application uses the Next.js App Router.

Route

Purpose

/

Home and workout library

/workout/[id]

Dynamic workout detail

/my-plan

Today's Plan and Saved workouts

Unknown routes

Custom 404 page

Dynamic workout routes are resolved using the workout ID returned by the API.

Metadata and SEO

FitLog uses Next.js metadata APIs for route-specific metadata.

The root layout provides default metadata, while individual pages can override titles and descriptions.

Example:

export const metadata = {
  title: {
    default: "FitLog",
    template: "%s | FitLog",
  },
  description:
    "A responsive workout library and personal workout planning application.",
  icons: {
    icon: "/logo.png",
  },
};

Dynamic workout pages can generate metadata based on the selected workout.

This allows pages such as:

BENCH PRESS | FitLog
SQUAT | FitLog
DEADLIFT | FitLog

rather than using the same title for every route.

Responsive Design

The application is designed using a mobile-first approach.

The interface adapts to:

Mobile devices

Tablets

Laptops

Desktop displays

Responsive behavior includes:

Adaptive workout grids

Flexible navigation

Responsive typography

Mobile-friendly controls

Flexible workout cards

Responsive detail layouts

User Experience

FitLog provides immediate feedback for important user actions.

Examples include:

Add to Today's Plan

Save workout

Remove workout

Mark workout as completed

Plan capacity reached

Toast notifications are used to communicate the result of these actions without interrupting the user's workflow.

Loading and empty states are also provided where appropriate.

Error Handling

The application handles common client-side and API-related states, including:

API request failures

Empty workout results

Missing workout data

Invalid workout IDs

Loading states

Unknown routes

The application also uses fallback values during API normalization when optional fields are unavailable.

Data Persistence

Today's Plan and Saved workouts are stored using:

localStorage

This provides persistence across browser reloads.

Because the data is stored locally:

Data is tied to the current browser

Data is not synchronized between devices

Clearing browser storage removes the saved state

There is currently no authenticated cloud profile

For a future production platform, persistence can be migrated to a backend database associated with authenticated users.

Getting Started

Prerequisites

Make sure the following are installed:

Node.js

npm

Verify the installation:

node --version
npm --version

Installation

Clone the repository and install dependencies:

npm install

Development

Start the development server:

npm run dev

Open:

http://localhost:3000

Production Build

Create a production build:

npm run build

Start the production server:

npm start

Before deploying, verify that:

npm run build

completes successfully without errors.

Environment Configuration

If environment-specific configuration is introduced, keep secrets and deployment-specific values outside the source code.

For example:

NEXT_PUBLIC_API_BASE_URL=https://api.abcz.workers.dev/api/fitlog

The application should access configuration through environment variables rather than scattering API URLs throughout components.

Never commit API keys, private credentials, database credentials, authentication secrets, or other sensitive values to the repository.

Production Considerations

The current application is primarily a client-facing workout library with browser-local persistence.

For a larger production system, the following capabilities can be introduced:

User authentication

Server-side workout plans

Database-backed persistence

Multi-device synchronization

User profiles

Workout history

Server-side authorization

API caching

Rate limiting

Observability and structured logging

Automated testing

CI/CD

Error monitoring

Performance monitoring

API versioning

Database backups

These capabilities are outside the scope of the current application unless explicitly implemented.

Development Principles

The project follows several architectural principles:

Separation of concerns

API communication is separated from UI components.

API → lib/api
State → context
UI → components
Routes → app

Reusable components

Common interface elements are implemented as reusable components instead of duplicating UI logic across pages.

Normalized API data

External API responses are normalized before being consumed by the UI.

This reduces coupling between the external API and frontend implementation.

Responsive by default

Components are designed with responsive behavior from the beginning rather than treating mobile support as a later enhancement.

Available Scripts

The primary development commands are:

npm run dev
npm run build
npm start

Additional scripts should be documented here when added to package.json, such as:

npm run lint
npm run test
npm run typecheck

Only document scripts that actually exist in the project.

Project Status

FitLog currently provides:

Workout library

API integration

Workout search

Workout sorting

Dynamic workout details

Today's Plan

Saved workouts

Plan statistics

Completion tracking

Toast notifications

Local persistence

Responsive UI

Dynamic route handling

Custom 404 handling

The current persistence model is browser-based and does not provide authenticated, server-side user accounts or cross-device synchronization.

License

Add the project's applicable license here before publishing the repository publicly.

For example:

MIT License

Do not include a license declaration unless the repository actually uses that license.