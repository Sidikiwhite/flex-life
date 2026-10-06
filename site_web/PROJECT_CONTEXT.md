# Project Overview: Cyberpunk React Business Website

## 🚀 Tech Stack
- **Framework:** React 19 (Vite)
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript
- **Key Libraries:** `lucide-react` (icons), `resend` (email API)
- **Build Tool:** Vite with `vite-plugin-singlefile` (for single HTML output)

## 🏗️ Architecture
The project is a high-performance, one-page business website with a "cyberpunk" aesthetic.

### 📂 Directory Structure
- `src/components/`: All UI sections (Hero, About, Services, etc.)
- `src/hooks/`: Custom logic for animations (`useReveal`) and theming (`useTheme`)
- `src/utils/`: Utility functions (e.g., `cn.ts` for Tailwind class merging)
- `api/`: Backend functions (e.g., `send.ts` for handling contact form submissions via Resend)

### 🧩 Core Components
- **App.tsx**: Root component orchestrating the page layout.
- **CustomCursor**: Neon decorative cursor effect.
- **Navbar**: Fixed navigation with theme toggle.
- **Hero, About, Services, Timeline, FAQ, Newsletter, Contact**: Main content sections.
- **ParticleCanvas**: Visual background effects.

## 🎨 Key Features
- **Scroll Reveal:** Uses an Intersection Observer via `useReveal` to trigger animations as the user scrolls.
- **Theme System:** Dark/Light mode support via `useTheme`.
- **Cyberpunk Aesthetic:** Heavy use of neon colors, gradients, and futuristic UI patterns.
- **Single File Build:** Configured to bundle everything into one HTML file for easy deployment.

## 🛠️ Development Commands
- `npm run dev`: Start local development server.
- `npm run build`: Build for production.
- `npm run preview`: Preview the production build locally.
