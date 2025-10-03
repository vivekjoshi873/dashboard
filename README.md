# Invoices Dashboard

A modern, responsive invoices dashboard built with Next.js (App Router) and Tailwind CSS. It provides UI components to create, upload, list, and analyze invoices and includes a visual-edit integration helper for in-iframe editing and messaging.

## Summary

- Framework: Next.js 15 (App Router)
- Language: TypeScript + React (some components use plain JSX)
- Styling: Tailwind CSS v4 + design tokens via CSS custom properties in `src/app/globals.css`
- Purpose: Demo/boilerplate dashboard focused on invoices, with analytics and an editable preview integration helper (`src/visual-edits/VisualEditsMessenger.tsx`).

## Quick start

Requirements:

- Node.js >= 20
- Bun (optional) — the repository declares `bun` as the package manager in `package.json`. You can still use npm/yarn/pnpm if preferred.

Install and run (recommended: bun):

```powershell
# Install dependencies
bun install

# Run development server
bun run dev
```

Using npm/yarn:

```powershell
npm install
npm run dev
# or with pnpm/yarn
```

Open http://localhost:3000 in your browser.

Available package scripts (from `package.json`):

- `dev` — `next dev --turbopack`
- `build` — `next build`
- `start` — `next start`
- `lint` — `next lint`

## Project structure (important files)

- `package.json` — project metadata, scripts & dependencies
- `src/app/layout.tsx` — root layout; loads global CSS and injects `VisualEditsMessenger` + `ErrorReporter`
- `src/app/page.tsx` — main dashboard page that composes the UI sections
- `src/app/globals.css` — theme tokens (CSS variables) and Tailwind imports
- `src/components` — dashboard components (invoice creation, list, charts, etc.)
- `src/components/ui` — local UI primitives used across components
- `src/visual-edits/VisualEditsMessenger.tsx` — visual editing iframe helper (postMessage contract)

## Key components

- `InvoiceCreationSection.jsx` — header card allowing creation or upload of invoices
- `TimeEarningsSection.tsx` — earnings summary with range selection (1m/3m/1y/custom)
- `IncomeChart.tsx` — SVG-based combined bar + line chart (income and MoM growth)
- `InvoiceList.tsx` — scrollable list with invoice status badges and click handlers
- `ErrorReporter.tsx` — captures errors and posts them to a parent frame (useful in preview iframes)

## Visual edit integration

The file `src/visual-edits/VisualEditsMessenger.tsx` contains a large client-side helper that:

- Shows hover/focus overlays for elements annotated with `data-orchids-id`
- Sends/receives postMessage events on the channel `ORCHIDS_HOVER_v1`
- Supports inline text editing, style previews, image updates, and element resize interactions
- Is intended to run inside an iframe preview and coordinate with an external visual editor or design tool

Important: this code relies on `data-orchids-id` and `data-orchids-name` attributes being present on preview elements. Modifying it requires care because it contains many DOM-level interactions.

## Theming and styles

- Colors, radii, and other design tokens are defined in `src/app/globals.css` using CSS custom properties (e.g., `--color-primary`, `--chart-bar`).
- Tailwind utilities are the primary styling mechanism; many components also use inline styles that reference the CSS variables.

## Notes on dependencies

The repo includes a large set of dependencies for UI, icons, charts, 3D visuals, and utilities (e.g. `@radix-ui`, `lucide-react`, `recharts`, `three`, `@react-three/fiber`, `framer-motion`). See `package.json` for the exact list.

## Development notes & recommendations

- Some components are plain `.jsx` (e.g., `InvoiceCreationSection.jsx`) while the app uses TypeScript elsewhere. Consider migrating those to `.tsx` for type-safety.
- The project declares `bun` as the package manager and requires Node >=20. If you don't use Bun, `npm install` should work but lockfile behavior may differ.
- `VisualEditsMessenger.tsx` is ~2k+ lines long and contains sensitive DOM logic. Make incremental edits and add tests if you plan to change its behavior.

## Contributing

- Follow existing code style. Run `npm run lint` (or `bun run lint`) before opening PRs.
- Add unit tests when changing component logic and consider an e2e test for the main dashboard flow.

## Suggested next steps

- Add a `CONTRIBUTING.md` with code-style and branch rules.
- Add component stories (Storybook) for isolated visual testing.
- Add unit tests (vitest/jest) and a simple Playwright e2e smoke test.
- Migrate remaining `.jsx` files to TypeScript.

---

If you'd like, I can:

- Run a quick TypeScript/ESLint pass and fix low-risk issues.
- Convert `InvoiceCreationSection.jsx` to `.tsx` as a demonstration.
- Generate a short developer-focused CONTRIBUTING.md.

Tell me which you'd like me to do next.
