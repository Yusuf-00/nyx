# nyx

Crypto market, watch dashboard.

A dark-themed, responsive trading-style dashboard for tracking live crypto market data — market watch table, asset details panel, manual refresh, and a demo authentication flow.

**Live demo:** https://nyx-tau-five.vercel.app/

## Tech Stack

- Next.js 16+ (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- TanStack Query (`@tanstack/react-query`)
- [CoinGecko public API](https://www.coingecko.com/en/api) — `/coins/markets`, no API key required
- lucide-react

## Features

- **Market watch table** — name, symbol, price, 24h change %, 24h volume; search/filter by name or symbol; keyboard-selectable rows
- **Asset details panel** — name, symbol, price, 24h high/low, volume, last updated — derived from the same cached data as the table, no extra network request on selection
- **Manual refresh** — disabled while a request is in flight; loading, error, and empty states are all handled explicitly
- **Demo authentication** — hardcoded credentials, session persisted in `localStorage`, protected `/dashboard` route

## Getting Started

Requires Node.js 18+.

```bash
git clone <this-repo-url>
cd nyx
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

No environment variables or API keys are required — the CoinGecko endpoint used here is public and CORS-enabled, so the app fetches it directly from the browser.

## Demo Login

| Field | Value |
|---|---|
| Username | `demo` |
| Password | `demo123` |

This is a local/demo auth flow only — credentials are hardcoded client-side for the purpose of this project and are **not** a real authentication system. There is no backend, database, or production password handling.

## Data Source & Refresh Behavior

Market data comes from CoinGecko's `/coins/markets` endpoint. Data is fetched once on load and cached via TanStack Query with `staleTime: Infinity` — there is no automatic polling or background refetching. Use the **Refresh** button to pull the latest prices on demand; it's disabled for the duration of the request to prevent duplicate calls and to respect CoinGecko's free-tier rate limit.

## Project Structure

```
/app          — routes (login, dashboard), root layout & providers
/components   — market UI, auth UI, shared primitives
/lib          — API client, hooks, auth context, types, formatters
```

## Deployment

Deployed on [Vercel](https://nyx-tau-five.vercel.app/). No custom configuration or environment variables are needed — Vercel auto-detects the Next.js project on import.
