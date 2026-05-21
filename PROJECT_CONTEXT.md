# DelNorte — Project Context

This document is the single source of truth for the DelNorte website. **Read it before making changes.** Keep it up to date when architecture, contracts, or gotchas change.

---

## 1. Ecosystem Layout

Three projects live under `C:\...\inmobiliaria\`:

| Path | Role | Dev port |
|---|---|---|
| `DelNorte/` | Public-facing website (this repo) | 3001 |
| `see-admin-ecosystem/` | Multi-tenant ERP: admin UI + public API + Supabase-backed DB | 3000 |
| `stitch_inmobiliaria_p_gina_de_inicio (1)/` | Stitch-exported wireframe (design reference only) | — |

**DelNorte consumes `see-admin-ecosystem`'s public API.** It never talks to Supabase directly.

---

## 2. Tech Stack

- **Next.js 16 (Turbopack) + App Router + TypeScript strict**. This is a *new* Next.js — APIs differ from older training data. Read `node_modules/next/dist/docs/` before assuming anything.
- **Tailwind CSS v4** using `@theme` directive in [globals.css](src/app/globals.css). No `tailwind.config.ts` tokens; everything is CSS variables.
- **@tanstack/react-query v5** for client-side property/agency caches.
- **Map:** `react-map-gl` **v8** with the `/maplibre` subpath + **MapLibre GL** + **OpenFreeMap** tiles (`https://tiles.openfreemap.org/styles/liberty`). Free, no API key, no credit card. **Mapbox was removed** because it requires a credit card.
- **GSAP 3** + ScrollTrigger for entrance animations (respects `prefers-reduced-motion`).
- **Fonts:** Manrope (`--font-headline`) + Inter (`--font-body`) via `next/font/google`.

---

## 3. Design System

Set in [globals.css](src/app/globals.css) via `@theme`:

- `--color-primary` `#041627` (navy) — headlines, primary buttons, nav
- `--color-primary-800` `#1a2b3c` — primary hover
- `--color-secondary` `#775a19` (amber) — accents
- `--color-secondary-fixed` `#ffdea5` (cream) — highlight chips, active states
- `--color-surface-container-low` `#f3f4f5`, `--color-outline-variant` `#c4c6cd`, `--color-on-surface-variant` `#44474c` — Material 3 neutrals

**Editorial minimalist** style: rounded-xl cards, `shadow-editorial` / `shadow-editorial-lg`, big Manrope headlines, Inter body, secondary-fixed circular icon chips. No emoji icons — always `lucide-react`.

---

## 4. API Contract

All endpoints are under `see-admin-ecosystem/app/api/public/v1/`. Auth header: `X-API-Key: sk_live_...` (hashed + matched against `api_keys` table).

| Endpoint | Returns |
|---|---|
| `GET /agency` | Single agency (name, phone, settings with website_* fields) |
| `GET /properties?page&per_page&operation_type&property_type&city&bedrooms&min_price&max_price&search` | Paginated published properties. **Only returns `is_published=true AND status='activo'`.** |
| `GET /properties/:id` | Single property detail (same publish filters) |

**Selected fields must include `lat, lng`** — the map depends on them. If you add/change columns the site needs, update the SQL `select` in both `properties/route.ts` and `properties/[id]/route.ts`.

---

## 5. Geocoding (Jujuy addresses)

Properties need accurate `lat/lng` for map markers. Don't hand-pick coordinates — use a geocoder.

**Primary: Georef (datos.gob.ar)** — official Argentine geocoder, covers every province/departamento/localidad/calle nationally. Free, no API key.

```
GET https://apis.datos.gob.ar/georef/api/direcciones?direccion=<addr>&provincia=jujuy&max=5
```

Response includes `ubicacion.lat`, `ubicacion.lon`, and `localidad`, `departamento`, `provincia`. Preferred because it disambiguates *departamento* (e.g., Palpalá vs Dr. Manuel Belgrano).

**Fallback: Nominatim (OpenStreetMap)** — global coverage.

```
GET https://nominatim.openstreetmap.org/search?format=json&q=<addr>,<city>,Jujuy,Argentina&limit=1
```

Requires `User-Agent` header and ≤1 req/s per usage policy.

**Helper:** [`see-admin-ecosystem/lib/geocoding.ts`](../see-admin-ecosystem/lib/geocoding.ts) — wraps both with automatic fallback, used by the seed script and the property form.

---

## 6. Map Marker Conventions

[PropertyMap.tsx](src/components/properties/PropertyMap.tsx) differentiates by `operation_type`:

| Operation | Pill | Icon |
|---|---|---|
| `venta` | `bg-primary text-white` | `Tag` |
| `alquiler` | `bg-secondary text-white` | `Key` |
| `alquiler_temporal` | `bg-secondary-fixed text-primary` | `CalendarDays` |

Legend rendered top-left of the map. Active marker swaps to the contrasting variant and scales 110%.

OpenFreeMap's liberty style references POI sprites (office, atm, swimming_pool, gate…) that aren't always in the sprite sheet — the `onLoad` handler registers a 1×1 transparent placeholder via `styleimagemissing` to silence those warnings.

---

## 7. Environment Variables

`DelNorte/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3000      # admin port, NOT 4000
NEXT_PUBLIC_API_KEY=sk_live_...                # raw key (shown once at creation)
NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

`see-admin-ecosystem/.env.local`: Supabase URL + anon + service_role keys (already set).

---

## 8. Running Locally

```bash
# terminal 1 — admin + API
cd ../see-admin-ecosystem && npm run dev    # :3000

# terminal 2 — public site
cd DelNorte && npm run dev                  # :3001
```

If fetches fail with `ENOTFOUND *.supabase.co`, the Supabase project is paused (free tier pauses after ~1 week). Restore it from the Supabase dashboard.

---

## 9. Seeding Test Data

[`see-admin-ecosystem/scripts/seed-delnorte-test-property.mjs`](../see-admin-ecosystem/scripts/seed-delnorte-test-property.mjs) — finds Del Norte agency, provisions an API key, inserts a published test property. **Geocodes the address via `lib/geocoding.ts`** so the marker lands in the correct departamento. Idempotent via upsert by title.

Run:
```bash
node scripts/seed-delnorte-test-property.mjs
```

Copy the printed `sk_live_...` into `DelNorte/.env.local`.

---

## 10. Gotchas

- **Public API `select` must include `lat, lng`** — without them, properties never show on the map. Both list and detail routes.
- **`is_published=true AND status='activo'`** — seeds must set both or the property is invisible.
- **Supabase project pausing** — free-tier projects pause after ~1 week of inactivity; DNS stops resolving. Restore from dashboard.
- **Admin port** — API lives on `:3000`. Don't point DelNorte at `:4000`.
- **Form submission via custom dropdown** — [SearchSelect](src/components/ui/SearchSelect.tsx) uses a hidden input so native `<form action method="GET">` still works.
- **Next.js scroll-behavior warning** — `<html>` needs `data-scroll-behavior="smooth"` when using CSS `scroll-behavior: smooth`.
- **`ref_code` is DB-generated** — don't send it when inserting properties.

---

## 11. What Lives Where

| Concern | File |
|---|---|
| API calls (all) | [src/lib/api.ts](src/lib/api.ts) |
| TS types | [src/types/index.ts](src/types/index.ts) |
| Formatters / WhatsApp URL / cn | [src/lib/utils.ts](src/lib/utils.ts) |
| Map + markers + legend | [src/components/properties/PropertyMap.tsx](src/components/properties/PropertyMap.tsx) |
| Listing page logic (URL filters) | [src/app/propiedades/PropertiesClient.tsx](src/app/propiedades/PropertiesClient.tsx) |
| Custom dropdown | [src/components/ui/SearchSelect.tsx](src/components/ui/SearchSelect.tsx) |
| Global tokens + keyframes | [src/app/globals.css](src/app/globals.css) |
