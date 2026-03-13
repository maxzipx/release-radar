# Release Dates

Phase 0 sets up the technical foundation for the mobile app and API without implementing real product features yet.

## Workspace layout

- `apps/mobile`: Expo Router mobile shell
- `apps/api`: Hono API shell
- `packages/shared`: shared TypeScript types
- `supabase`: placeholder migration location

## Environment

Create these files before wiring real services:

- `apps/mobile/.env`
- `apps/api/.env`

Mobile variables:

```env
EXPO_PUBLIC_API_URL=http://localhost:8787
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
```

API variables:

```env
PORT=8787
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
CORS_ORIGIN=*
```

The scaffold will run without Supabase credentials until those clients are used.

## Commands

```bash
npm install
npm run dev:api
npm run dev:mobile
```

## Phase 0 boundaries

- Included: workspace scaffolding, placeholder tabs, placeholder API routes, env handling, Supabase wiring points
- Intentionally omitted: real release data, calendar logic, trivia gameplay, auth, backend sync, predictions, admin flows, UI polish
