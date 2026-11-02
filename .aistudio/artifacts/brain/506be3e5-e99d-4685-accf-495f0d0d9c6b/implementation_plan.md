# Notes Hub — Vercel Peer Dependency Resolution Plan

Configure automatic peer dependency conflict resolution via `.npmrc` alongside compatible `esbuild` versioning so Vercel builds and installs dependencies reliably without `ERESOLVE` errors.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following deployment configuration choices have been confirmed:

- **Confirmed Decision 1 — Dependency Resolution Strategy**: Add a root `.npmrc` configuration with `legacy-peer-deps=true` while retaining the updated `esbuild` (`^0.28.0`) dependency alignment in the project manifest.
- **Confirmed Decision 2 — Vercel Configuration Scope**: Add only the `.npmrc` configuration file as requested, without adding extra `vercel.json` routing files.

---

## 1. Overview & Core Concept

- **What It Does**: Instructs npm (both locally and in Vercel's build container) to use legacy peer dependency resolution (`legacy-peer-deps=true`) so peer dependency ranges across `vite`, `esbuild`, and `@tailwindcss/vite` never abort `npm install` with `ERESOLVE`.
- **Target Audience / Persona**: Developers and students deploying and maintaining the Notes Hub academic platform on Vercel.
- **Key Value**: Eliminates build-time `ERESOLVE` failures on Vercel CI/CD while keeping the existing Notes Hub application, study workflows, and UI completely intact.

---

## 2. User Experience & Visual Design

- **Key User Flows**:
  - **Developer Deployment Flow**: Pushing commits to the connected GitHub repository triggers Vercel's build pipeline, which reads `.npmrc` automatically during `npm install`, resolves all packages cleanly, and runs `vite build` to publish the Notes Hub web app.
  - **End-User Study Flow**: Unchanged — students continue to access the Dashboard, Explore Notes catalog, Note Reader, Upload flow, My Library, Bookmarks, Categories, Recently Viewed, and Settings views seamlessly.
- **Visual Identity & Theme**:
  - *Aesthetic Direction*: Retains the existing academic workspace aesthetic with high-contrast readability and clean card surfaces.
  - *Color Palette & Mood*: Preserves the Slate (`--background: #f8fafc` light / `#0B0F19` dark) and Indigo (`--primary: #4f46e5`) palette.
  - *Typography & Hierarchy*: Retains `Plus Jakarta Sans` for display headings, `Public Sans` for body copy, and `JetBrains Mono` for technical metadata and tabular counters.
  - *Component Styling & Layout*: Existing responsive sidebar + top bar workspace layout remains untouched.
- **Interactive Feedback & Motion**: All existing toast notifications, theme toggles, and interactive transitions remain intact.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Dual Protection via `.npmrc` (`legacy-peer-deps=true`) + Compatible `esbuild` Version**
  - *Chosen Approach*: Configure `legacy-peer-deps=true` in `.npmrc` at the project root while keeping `esbuild` at `^0.28.0`.
  - *Why*: Aligning `esbuild` satisfies `vite@^8.3.0` directly, while `legacy-peer-deps=true` guarantees that any transitive peer dependency mismatches between `vite`, `tsx`, and `@tailwindcss/vite` on Vercel's build image will not fail `npm install`.
  - *Alternatives Considered*: Relying solely on CLI flags (`npm install --legacy-peer-deps`) in the Vercel dashboard settings, which is harder to version-control than a committed `.npmrc` file.
- **Decision 2: Minimal Configuration Footprint**
  - *Chosen Approach*: Scope changes strictly to `.npmrc` and dependency resolution without adding unrequested `vercel.json` overrides.
  - *Why*: Keeps the repository configuration minimal and predictable, letting Vercel's zero-config Vite preset handle the static build output automatically.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

- **Architecture & Build Pipeline Diagram**:

```
┌─────────────────────────────────────────────────────────────────┐
│                    GitHub Repository (main)                     │
│  ┌──────────────────────────┐   ┌────────────────────────────┐  │
│  │         .npmrc           │   │       package.json         │  │
│  │  legacy-peer-deps=true   │   │  vite ^8.3.0               │  │
│  └────────────┬─────────────┘   │  @tailwindcss/vite ^4.3.3  │  │
│               │                 │  esbuild ^0.28.0           │  │
│               │                 └─────────────┬──────────────┘  │
└───────────────┼───────────────────────────────┼─────────────────┘
                │                               │
                ▼                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Vercel Build Environment                      │
│  1. Reads .npmrc (enables legacy-peer-deps)                     │
│  2. Runs `npm install` without ERESOLVE conflicts               │
│  3. Runs `vite build` -> outputs optimized static bundle        │
└─────────────────────────────────────────────────────────────────┘
```

- **Data Model & State**: No changes to application data models, `localStorage` persistence services, or React component state.
- **Interactive Component & State Mapping**: After adding `.npmrc`, we will verify that dependency installation and the production Vite build complete with zero errors.
