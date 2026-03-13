# Movie App — Architecture v1 (Speed-to-Launch Edition)

## Prime Directive

Ship a read-only curated release calendar with:

- Local-only saves
- Daily trivia
- Editorial ingestion

Do NOT build:

- Auth
- Backend save sync
- Prediction systems
- Queues
- Cache infra
- Complex CMS
- Over-engineered infra

Prove the product first.

---

## Preferred Stack

Mobile:
- React Native (Expo)

API:
- Hono (TypeScript)

Database:
- Supabase (Postgres)

Background jobs:
- Supabase Edge Function cron

State:
- Zustand + TanStack Query

Storage:
- Supabase Storage

Admin:
- Supabase Studio + minimal Next.js page

Analytics:
- PostHog

Hosting:
- Railway (API)
- Vercel (admin)

---

## Core Product Surfaces (v1)

- Calendar
- Home
- Detail Card
- Local Save
- Daily Trivia
- Editorial tooling

Excluded:

- Search
- Auth
- Social
- Prediction
- Android
- Push
- TV filtering UI
- Radar

---

## Domain Model

### titles

- id
- title
- content_type
- director
- cast_json
- synopsis
- poster_url
- trailer_url
- release_date
- platform
- platform_label
- editorial_tier
- cultural_weight
- is_visible
- date_changed_at
- release_state
- created_at
- updated_at

### trivia_questions

- id
- question_text
- answer_options
- correct_index
- explanation
- scheduled_date
- related_title_id
- is_published

### trivia_responses

- id
- device_id
- question_id
- selected_index
- is_correct
- streak_count
- answered_at

---

## API Contract

GET /releases  
GET /releases/:id  
GET /home  
GET /trivia/today  
POST /trivia/responses  

Admin:

POST /admin/sync

---

## Phase Plan

### Phase 0
- Supabase setup
- DB schema
- Hono scaffold
- Expo scaffold
- basic endpoints

### Phase 1
- Calendar UI
- Detail card
- Home
- Local saves

### Phase 2
- Trivia system
- Admin trivia UI

### Phase 3
- Polish
- Analytics
- App Store

---

## Anti-Overengineering Rules

Do NOT add:

- queues
- auth
- backend save sync
- prediction schema
- custom CMS
- caching layer
- design system
- staging infra
- social features

If feature does not enable a real v1 user story → do not build.