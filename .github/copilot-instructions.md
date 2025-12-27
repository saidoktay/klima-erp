# Copilot instructions for Klima-ERP

This file contains concise, actionable guidance for AI coding agents working in this repository.

**Quick Start**
- **Dev:** `npm run dev` (runs `vite`).
- **Build:** `npm run build` (runs `tsc -b` then `vite build`).
- **Preview production build:** `npm run preview`.
- **Lint:** `npm run lint` (ESLint configured in root).

**Big-picture architecture**
- Frontend-only React + TypeScript app bootstrapped with Vite: see [package.json](package.json).
- Routing: `react-router-dom` (v7) with a nested layout pattern. Root routes are defined in [src/App.tsx](src/App.tsx). The `MainLayout` uses an `<Outlet />` to render nested pages: [src/layout/MainLayout.tsx](src/layout/MainLayout.tsx).
- UI: Material UI (MUI) components + `sx` styling across components. Sidebar is a permanent Drawer: [src/components/Sidebar.tsx](src/components/Sidebar.tsx).

**Data flows & state**
- Current data is local/in-memory. `TaskBoard` holds all tasks in local `useState`: [src/task/TaskBoard.tsx](src/task/TaskBoard.tsx).
- Task shape and allowed statuses live in [src/types/task.ts](src/types/task.ts). When integrating APIs, replace the local `useState` in `TaskBoard` with a data-fetching layer (service or hooks).

**Project-specific conventions and important patterns**
- Drawer width is a fixed constant (240). Layout and modal positioning rely on this: update both `drawerWidth` in [src/layout/MainLayout.tsx](src/layout/MainLayout.tsx) / [src/components/Sidebar.tsx](src/components/Sidebar.tsx) and the modal left offset in [src/task/AddTodo.tsx](src/task/AddTodo.tsx) if you change it.
- Styling uses MUI `sx` prop instead of separate styled-components. Prefer `sx` for component-local styles.
- Mix of default and named exports: e.g. `Sidebar` is a default export, `MainLayout` and `Home` are named exports. Keep export style consistent when adding files.
- UI text contains Turkish strings in places (e.g. labels in `AddTodo`). Preserve or intentionally translate when editing copy.

**Where to look for examples**
- Page routing and layout: [src/App.tsx](src/App.tsx) → [src/layout/MainLayout.tsx](src/layout/MainLayout.tsx).
- Sidebar navigation: [src/components/Sidebar.tsx](src/components/Sidebar.tsx).
- Task UX (add / columns / cards): [src/task/TaskBoard.tsx](src/task/TaskBoard.tsx), [src/task/TaskColumn.tsx](src/task/TaskColumn.tsx), [src/task/TaskCard.tsx](src/task/TaskCard.tsx), [src/task/AddTodo.tsx](src/task/AddTodo.tsx).
- Type definitions: [src/types/task.ts](src/types/task.ts).

**Build / debug tips**
- Start dev server and open the browser: `npm run dev` (Vite). Hot reload is enabled.
- Production build runs type-checking (`tsc -b`) before `vite build` — fixes that cause build failures are typically TypeScript errors.
- Linting: `npm run lint`. The ESLint config is in the repo root (`eslint.config.js`).

**What’s *not* present (so be cautious)**
- There is no backend/API client or tests in the repo. Changes that rely on server data must include a new `src/api` or `src/services` area and a migration plan from in-memory state to API calls.

**How to add a new page / route**
1. Create a new folder under `src/pages/<Name>` and export the page component (prefer named export).
2. Add a route in [src/App.tsx](src/App.tsx). If it should be inside the main layout, add it under the `Route` that renders `MainLayout`.

If anything here is unclear or you want more examples (API integration pattern, tests, or a suggested `src/api` layout), tell me which area to expand and I'll update this file.
