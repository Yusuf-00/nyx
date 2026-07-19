<!-- BEGIN:nextjs-agent-rules -->
# Nyx Project Rules for Copilot Agents

## Phase 0-2 Complete ✓

**Phase 0 — Repository & Tooling Setup**, **Phase 1 — Data Layer (API + Types)**, and **Phase 2 — TanStack Query Integration** are complete. The project is ready for Phase 3 implementation.

### Setup Summary
- ✅ Next.js 16 (latest stable) with TypeScript strict mode and Tailwind CSS v4
- ✅ ESLint + Prettier configured for code quality and formatting
- ✅ TanStack Query (@tanstack/react-query) + lucide-react installed
- ✅ Tailwind dark-only brand color tokens (background, surface, text, text-muted, border, accent, on-accent, gain, loss) — **nyx is dark-themed only, no light mode, no theme toggle**
- ✅ Page title set to "nyx", favicon added (icon badge SVG)
- ✅ Folder structure created per PLAN.md section 7
- ✅ Build passes with no errors
- ✅ Data-layer types created in `lib/types/market.ts` (`Asset`, `AssetDetails`)
- ✅ CoinGecko integration added in `lib/api/coingecko.ts` via `getMarkets(): Promise<Asset[]>`
- ✅ Formatting utilities added in `lib/utils/formatters.ts` (price, percentage, volume, date/time)
- ✅ TanStack Query provider added in `app/providers.tsx`
- ✅ Market data hook added in `lib/hooks/useMarketData.ts`

### Key References
- **PLAN.md**: Architecture, tech stack, data flow, responsive design
- **BRAND.md**: Color palette, typography, logo specs, voice guidelines
- **TASKS.md**: All phases of development tasks
- **tailwind.config.ts**: Brand color tokens (use these, never raw hex in components)
- **app/globals.css**: Tailwind v4 @theme config with dark color values only

### Important Guidelines
1. **Never hardcode hex colors** — use Tailwind theme tokens (e.g., `bg-surface`, `text-accent`)
2. **Dark-themed only** — do NOT add light mode, a `dark:` class strategy, a theme toggle, or `prefers-color-scheme` handling. This was explicitly corrected after an earlier scope mistake — the original brief calls for a dark-themed dashboard only.
3. **Fonts** — Sans-serif (Inter) for labels/copy; Monospace (JetBrains Mono) for numeric values only
4. **Components** — Use React Context for auth state; TanStack Query for server state
5. **No `middleware.ts`** — Session is localStorage-only; route protection via client-side ProtectedRoute component
6. **Strict TypeScript** — No `any` types; follow Open/Closed and Interface Segregation principles
7. **Branching protocol by phase** — Before starting any phase, create a dedicated branch from `main` (one branch per phase). Do not stack a new phase on top of another feature branch.
8. **Keep human in the loop for external/scope-dependent actions** — Pause and ask before actions that require external decisions or credentials (for example: confirming the correct data-source URL, wiring third-party connections, deployment/account steps, or any action outside local code changes).

### Running the Project
```bash
npm install --legacy-peer-deps  # Install dependencies (lucide-react needs legacy for React 19)
npm run dev                      # Start dev server
npm run build                    # Test production build
npm run lint                     # Run ESLint
npm run format                   # Run Prettier
```

### Next Steps
Begin Phase 3 — Authentication. See TASKS.md for full requirements.

<!-- END:nextjs-agent-rules -->

