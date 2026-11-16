# 🗺️ Project Map - Flex-Life

## 🚀 Project Overview
Premium event experience website for creating digital portals (invitations, guest lists, etc.) for weddings, baptisms, and special events.

## 🛠️ Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS.
- **Routing**: React Router.
- **Icons**: Lucide-React.
- **Architecture**: Component-based, Single Page Application (SPA) with dedicated routes for Templates/Demos.

## 🎨 Design System (Tokens in `src/index.css`)
- **Palette**:
  - `bg`: #FFF9F5 (Ivory)
  - `bg-elevated`: #EBDCC6 (Beige)
  - `card`: #FFFFFF (Pure White)
  - `text`: #4A3434 (Cocoa Brown)
  - `primary`: #F7D7D9 (Blush Pink)
  - `accent`: #D4A77C (Soft Gold)
  - `secondary`: #A7B89F (Sage Green)
- **Typography**:
  - Headings: *Playfair Display* (Serif)
  - Body/UI: *Poppins* (Sans-serif)
  - Labels: *Share Tech Mono* (Monospace)

## 🏗️ Architecture & Routes
- `/` (Home):
  - `Navbar`: Floating, glass effect, mobile burger menu.
  - `Hero`: Dynamic title reveal animation.
  - `About`: Feature list, premium visual card.
  - `Services`: Grid of event types with expansion logic.
  - `Timeline`: Scroll-based storytelling (vertical line removed on mobile).
  - `FAQ`: Accordion style.
  - `Contact`: Lead capture form.
- `/templates`: Catalogue of available models categorized by event type.
- `/demos/:demoId`: Full-screen iframe viewer for static demo sites.

## ⚙️ Key Business Logics
- **Demo Conversion Funnel**: 
  - User views a demo $\rightarrow$ clicks "Choose this model" $\rightarrow$ redirects to `/#contact?modele=ID`.
  - `Contact.tsx` detects the `modele` param and pre-fills the project description.
- **Service Card Behavior**: 
  - Desktop: Hover/Focus reveals content.
  - Mobile: Click toggles active state (only one open at a time).
- **Timeline Mobile**: Vertical connector lines are hidden to clean up the layout.

## ⚠️ Non-Negotiable Rules (Anti-Vibe Coding)
- No decorative gradients, neon glows, or generic "card soup".
- No lorem ipsum; real copy only.
- Accessibility: AA contrast, touch targets $\ge$ 44px, keyboard focus visible.
- Responsive: Tested at 320, 390, 768, 1024, 1440px.
