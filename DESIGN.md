# Design Brief

**Purpose**: Maternal health companion unifying pregnancy and postpartum journeys with modern, elegant, supportive design. Two distinct visual identities signal flow context without sacrificing consistency.

## Color Palette

| Token | Pregnancy (Cool) | Having Baby (Warm) | Usage |
|-------|-----|-----|-----|
| Primary | `0.48 0.15 305` (purple) | `0.62 0.22 15` (rose/coral) | CTAs, active states, key highlights |
| Secondary | `0.70 0.12 310` (lavender) | `0.75 0.16 35` (peach) | Secondary actions, accents |
| Accent | `0.68 0.18 295` (violet) | `0.68 0.20 25` (coral) | Sparse highlights, badges |
| Background | `0.98 0.008 307` (near-white) | `0.98 0.010 15` (soft cream) | Page base |
| Card | `0.99 0.006 310` (white) | `0.99 0.008 12` (white) | Surfaces, modals |
| Muted | `0.92 0.01 307` | `0.92 0.012 20` | Disabled, secondary text |
| Destructive | `0.62 0.22 25` (red) | `0.62 0.22 25` (red) | Error, danger |
| Success | `0.66 0.16 142` (green) | `0.66 0.16 142` (green) | Confirmations |

## Typography

| Role | Font | Scale | Weight |
|------|------|-------|--------|
| Display/Headings | General Sans | 32/28/24/20 | 600 (semibold) |
| Body | Inter | 16/14 | 400–600 |
| Mono/Code | Geist Mono | 12/14 | 400 |

## Elevation & Depth

| Level | Usage | Shadow |
|-------|-------|--------|
| Flat | Background | None |
| Card | Content blocks, modals | `shadow-card: 0 4px 12px rgba(0,0,0,0.08)` |
| Elevated | Hover states, floating actions | `shadow-elevated: 0 20px 25px -5px ...` |
| Subtle | Borders | `shadow-subtle: 0 2px 4px rgba(0,0,0,0.06)` |

## Structural Zones

| Zone | Background | Treatment | Purpose |
|------|------------|-----------|---------|
| Header | Card | `border-b` + `shadow-card` | Navigation, branding, logout |
| Main Content | Background | Fluid, card grid | Timeline, reminders, modules |
| Section Cards | Card | Rounded (14px), `shadow-card` | Module containers, video blocks |
| Footer/Bottom Nav | Card | `border-t` + `shadow-card` | Home, Assistant, Community, Shopping, Classes |
| Module Details | Background/Card | Inline expansion, no modal | Timeline details, reminder expansion |

## Component Patterns

| Pattern | Usage | Behavior |
|---------|-------|----------|
| CTA Button | Primary actions | `bg-primary text-primary-foreground` with `hover:shadow-elevated` |
| Secondary Button | Alternative actions | `bg-secondary text-secondary-foreground` |
| Card Hover | Module entry points | `transition-smooth` + subtle lift (translateY) |
| Badge | Status, tags | Muted background, small radius |
| Input | Form fields | Border on focus, `bg-input` |
| Link | Navigation | Underline on hover, `text-primary` |

## Motion

| Animation | Duration | Easing | Trigger |
|-----------|----------|--------|---------|
| Float | 3s infinite | ease-in-out | Baby development images, floating elements |
| Fade | 0.4s | ease-out | Page load, module expansion |
| Pulse | 2s infinite | ease-in-out | Current timeline segment, emergency badge |
| Expand | 0.35s | ease-out | Inline timeline details, reminder expansion |

## Spacing & Rhythm

- **Base unit**: 4px (Tailwind default)
- **Card padding**: 24px / 1.5rem
- **Section gap**: 20px / 1.25rem
- **Heading margin**: 32px top, 16px bottom
- **Inline spacing**: 8px between elements

## Signature Details

1. **Dual-color system**: Pregnancy (cool purple) vs Having Baby (warm rose) — toggled via `.having-baby-theme` class on root container.
2. **Animated 2D baby growth**: Floating, pulsing baby illustrations in pregnancy timeline (M1–M10 segments).
3. **Real imagery**: Pregnant women in wellness cards, real instructor/user photos in community/classes, product photography in shopping.
4. **Inline expansion**: Timeline month details and reminder edits expand below modules, never in modal popups.
5. **Video carousel**: Wellness and classes use real YouTube thumbnails with instructor/duration overlay.
6. **Soft, maternal aesthetic**: No harsh contrast; pastels and soft tones dominate; animations are gentle (no bounces).

## Constraints

- Mobile-first responsive (`sm:`, `md:`, `lg:` breakpoints)
- No raw hex, RGB, or HSL — only OKLCH via CSS variables
- No animated illustrations except 2D baby growth (M1–M10)
- Real photos only: pregnant women, mothers, babies, instructors, products
- Consistent `--radius: 0.875rem` (14px) for all rounded corners
- All colors and shadows defined as design tokens; never inline styles

## Responsive Breakpoints

| Screen | `sm: 640px` | `md: 768px` | `lg: 1024px` | `2xl: 1400px` |
|--------|-----------|-----------|-----------|-----------|
| Use | Large mobile | Tablet | Desktop | Wide desktop |
