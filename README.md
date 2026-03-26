# Message Board

- Public one-page message board application
- Visitors can create, view, and delete short messages
- Messages are shown newest first
- Timestamps are formatted in Hungarian style
- Supports light mode and dark mode
- Built with Next.js App Router, TypeScript, Tailwind CSS, and Supabase

## Features

- Public message creation
- Public message listing
- Public message deletion
- Reverse chronological order
- Hungarian date/time formatting
- Inline validation
- Toast feedback for create/delete actions
- Responsive single-page UI
- Manual theme toggle with persisted preference

## Tech stack

- Next.js 16
- React
- TypeScript
- Tailwind CSS 4
- Supabase
- Vercel

## Dependencies

### App dependencies

- `next`
- `react`
- `react-dom`
- `@supabase/supabase-js`
- `clsx`
- `tailwind-merge`
- `lucide-react`
- `zod`
- `next-themes`
- `sonner`

### Dev dependencies

- `typescript`
- `eslint`
- `eslint-config-next`
- `tailwindcss`
- `@tailwindcss/postcss`
- `@types/node`
- `@types/react`
- `@types/react-dom`

## Environment variables

Create `.env.local` in the project root:

```env
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

## Run locally

`npm run dev`

App: http://localhost:3000

## Notes

- Initial message list is fetched server-side
- Create and delete actions go through internal API routes
- The browser does not write to Supabase directly
- Validation runs on both frontend and backend
- Message content is stored and rendered as plain text only
