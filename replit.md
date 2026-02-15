# values.tech

## Overview
A Next.js application that tracks the public stances of tech companies, executives, and VCs on important issues. Built with React 19, Next.js 16, Tailwind CSS 4, and TypeScript.

## Project Architecture
- **Framework**: Next.js 16 (App Router with Turbopack)
- **Styling**: Tailwind CSS 4 with PostCSS
- **Language**: TypeScript 5
- **UI Icons**: lucide-react
- **Data**: Static TypeScript data files in `src/data/` and `src/lib/mock-data.ts`
- **Supabase**: Client/server files exist in `src/lib/supabase/` but are not actively used by pages (data comes from static files)

## Structure
```
src/
  app/          - Next.js App Router pages (about, companies, people, vcs, topics, search, etc.)
  components/   - Shared React components (Header, Footer, SearchBox, StanceCard, etc.)
  data/         - Static data files (companies, VCs)
  lib/          - Utilities, types, constants, mock-data
public/
  images/       - Company, people, and VC logos/images
```

## Running
- **Dev**: `npm run dev` (port 5000, host 0.0.0.0)
- **Build**: `npm run build`
- **Start**: `npm start` (port 5000)

## Recent Changes
- Configured Next.js for Replit environment (port 5000, allowedDevOrigins)
