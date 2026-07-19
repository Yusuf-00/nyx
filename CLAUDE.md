# Nyx Project Instructions for Claude Models

This document supplements AGENTS.md with Claude-specific guidance for the Nyx project.

## Phase 0 Complete ✓

**Repository & Tooling Setup** is complete. All foundational setup is done:
- Next.js 16 (App Router, TypeScript strict, Tailwind v4)
- Dependencies: @tanstack/react-query, lucide-react, ESLint, Prettier
- Tailwind dark-only brand color tokens (no light mode, no theme toggle)
- Favicon and page title set
- Folder structure created

See AGENTS.md for full Phase 0 summary.

## Claude-Specific Guidelines

### Code Generation
1. **Type Safety First** — Always use TypeScript strict mode. No `any` types. Use discriminated unions for complex state.
2. **Component Patterns** — Prefer functional components with hooks. Use `React.memo` for list items. Extract constants to avoid recreations.
3. **Accessibility** — Always include `aria-label` for icon buttons, semantic HTML (`thead`, `tbody`, `th scope="col"`), and focus management.
4. **Testing Mindset** — Write code testable from the start (e.g., pure functions for formatters, isolated hooks, detachable components).

### Color & Styling
- **nyx is dark-themed only** — no light mode, no `dark:` class strategy, no theme toggle. Do not add any of these even if it seems like a natural enhancement.
- **Never hardcode hex** — Always use Tailwind tokens: `bg-surface`, `text-accent`, `border border-border`
- **Monospace only for numbers** — `font-mono` only on price/volume/percentage columns and the wordmark
- **Reference BRAND.md** for all color decisions — it's the single source of truth

### Data Flow
Follow the architecture in PLAN.md section 4:
```
CoinGecko API → lib/api/coingecko.ts → lib/hooks/useMarketData.ts → app/dashboard → MarketTable + AssetDetailsPanel
```
- Single source of truth for market data (no duplicate queries)
- TanStack Query manages caching; Components only read
- Selecting a row updates state, never triggers a new fetch

### Performance Considerations
1. Use `React.memo` on `MarketRow` to prevent unnecessary re-renders during filtering/selection
2. Debounce search input at ~200ms
3. Reserve skeleton dimensions to prevent CLS (Cumulative Layout Shift)
4. Use Tailwind JIT (already configured) to keep CSS minimal

### Common Pitfalls to Avoid
- ❌ Don't create a `middleware.ts` for route protection (auth state is localStorage-only, server can't read it)
- ❌ Don't import colors directly from BRAND.md hex values — define them in tailwind.config.ts and reference as tokens
- ❌ Don't use `staleTime: 0` (defeats the purpose of React Query caching)
- ❌ Don't add light mode, a theme toggle, or `prefers-color-scheme` handling — nyx is dark-themed only
- ❌ Don't hardcode component dimensions — use Tailwind spacing utilities

## File Locations Quick Reference
```
nyx-app/
├── app/
│   ├── layout.tsx (root layout, providers)
│   ├── page.tsx (home redirect)
│   ├── login/page.tsx (login form)
│   └── dashboard/page.tsx (main app)
├── components/
│   ├── market/ (MarketTable, MarketRow, SearchFilter, AssetDetailsPanel, RefreshButton, TableStates)
│   ├── auth/ (LoginForm, ProtectedRoute)
│   └── ui/ (Button, Input, Badge — shared primitives)
├── lib/
│   ├── api/coingecko.ts (fetch wrapper)
│   ├── hooks/ (useMarketData, useAuth)
│   ├── context/ (AuthContext)
│   ├── types/market.ts (Asset, AssetDetails types)
│   └── utils/formatters.ts (price, %, volume, date formatting)
├── tailwind.config.ts (brand color tokens, dark-only)
└── app/globals.css (Tailwind @theme, dark-only)
```

## Next Steps
Begin Phase 1 — Data Layer (API + Types). Follow TASKS.md.

---

See AGENTS.md for broader agent guidance and PLAN.md for full architecture.

