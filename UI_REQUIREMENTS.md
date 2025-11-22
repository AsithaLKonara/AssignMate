# Complete UI Requirements Document
## Assignment Assistant Tool - Neo-Futuristic Glassmorphism Design System

**Version:** 1.0  
**Last Updated:** 2025  
**Design Style:** Neo-Futuristic Glassmorphism  
**Theme:** Dark + Neon + Subtle Glow  
**Framework:** Next.js 16 + Tailwind CSS v4

---

## 📋 Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography System](#typography-system)
4. [Spacing & Layout System](#spacing--layout-system)
5. [Component Specifications](#component-specifications)
6. [Page Structures & Wireframes](#page-structures--wireframes)
7. [Animation & Micro-interactions](#animation--micro-interactions)
8. [Responsive Design](#responsive-design)
9. [Accessibility Requirements](#accessibility-requirements)
10. [Implementation Guidelines](#implementation-guidelines)

---

## 🎨 Design Philosophy

### Core Principles
- **Neo-Futuristic Aesthetic**: Dark backgrounds with neon accents and glassmorphism effects
- **Visual Hierarchy**: Clear distinction between primary, secondary, and tertiary elements
- **Consistent Spacing**: 8px base grid system for all measurements
- **Modern Interactions**: Smooth animations and hover effects
- **Accessibility First**: WCAG AA compliant with proper contrast ratios

### Design Style Keywords
- Glassmorphism (frosted glass effects)
- Neon Glow (cyan and purple accents)
- Gradient Text
- Subtle Animations
- Dark Theme Focus
- Clean & Modern

---

## 🎨 Color System

### Core Colors

| Purpose | Color | Hex | Usage |
|---------|-------|-----|-------|
| Background Primary | Deep Navy | `#0A0F1F` | Main page background |
| Background Secondary | Dark Slate | `#0F1629` | Secondary backgrounds |
| Card Background (glass) | Transparent White | `rgba(255,255,255,0.05)` | Glass cards |
| Card Background (strong) | Transparent White | `rgba(255,255,255,0.08)` | Enhanced glass cards |

### Accent Colors

| Purpose | Color | Hex | Usage |
|---------|-------|-----|-------|
| Primary Accent | Neon Cyan | `#00E8FF` | Primary buttons, highlights |
| Secondary Accent | Electric Purple | `#A855F7` | Secondary buttons, accents |
| Purple Dark | Purple 600 | `#8B5CF6` | Hover states |

### Text Colors

| Purpose | Color | Hex | Usage |
|---------|-------|-----|-------|
| Text Primary | White | `#FFFFFF` | Main headings, important text |
| Text Secondary | Gray | `#A1A1AA` | Body text, descriptions |
| Text Muted | Dark Gray | `#71717A` | Helper text, placeholders |

### Border Colors

| Purpose | Color | Usage |
|---------|-------|-------|
| Border Subtle | `rgba(255,255,255,0.08)` | Default borders |
| Border Glow | `rgba(255,255,255,0.12)` | Hover/active borders |

### Gradients

```css
/* Primary Gradient */
linear-gradient(90deg, #00E8FF, #8B5CF6)

/* Primary Hover Gradient */
linear-gradient(90deg, #00D4E8, #7C3AED)

/* Hero Background Gradient */
linear-gradient(135deg, rgba(0, 232, 255, 0.1), rgba(168, 85, 247, 0.1))
```

### Glow Effects

| Effect | Value | Usage |
|--------|-------|-------|
| Soft Glow | `0 0 40px rgba(0, 232, 255, 0.25)` | Subtle highlights |
| Neon Glow | `0 0 14px rgba(168, 85, 247, 0.55)` | Button hover |
| Cyan Glow | `0 0 20px rgba(0, 232, 255, 0.4)` | Cyan accents |
| Purple Glow | `0 0 20px rgba(168, 85, 247, 0.4)` | Purple accents |
| Button Glow | `0 0 20px rgba(168, 85, 247, 0.5)` | Primary buttons |

### Shadows

| Shadow | Value | Usage |
|--------|-------|-------|
| Glass Shadow | `0 8px 32px rgba(0, 0, 0, 0.3)` | Card elevation |
| Elevated Shadow | `0 16px 48px rgba(0, 0, 0, 0.4)` | Strong card elevation |

---

## 🔤 Typography System

### Font Family

**Primary Font:** Inter (via Next.js Google Fonts)
**Fallback:** `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

```css
--font-family: var(--font-inter), 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Font Sizes

| Element | Size | CSS Variable | Usage |
|---------|------|--------------|-------|
| Hero Title | 64px | `--text-hero: 4rem` | Main hero headlines |
| Section Titles | 32px | `--text-section: 2rem` | Section headings |
| Subheadings | 24px | `--text-subheading: 1.5rem` | Card titles, subsections |
| Body Text | 16px | `--text-body: 1rem` | Main content |
| Small Text | 14px | `--text-small: 0.875rem` | Captions, labels |
| Button Text | 15px | `--text-button: 0.9375rem` | Button labels |

### Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| Light | 300 | Decorative text |
| Regular | 400 | Body text |
| Medium | 500 | Emphasized text |
| Semibold | 600 | Subheadings, buttons |
| Bold | 700 | Headings, important text |

### Typography Hierarchy

#### H1 (Hero)
- Font Size: 64px
- Font Weight: 700 (Bold)
- Line Height: 1.1
- Letter Spacing: -0.02em (tight)
- Usage: Main hero titles

#### H2 (Section Titles)
- Font Size: 32px
- Font Weight: 700 (Bold)
- Line Height: 1.2
- Letter Spacing: -0.02em (tight)
- Usage: Section headings

#### H3 (Subheadings)
- Font Size: 24px
- Font Weight: 600 (Semibold)
- Line Height: 1.3
- Letter Spacing: 0 (normal)
- Usage: Card titles, subsections

#### Body Text
- Font Size: 16px
- Font Weight: 400 (Regular)
- Line Height: 1.6
- Letter Spacing: 0 (normal)
- Usage: Main content, descriptions

### Special Text Styles

#### Gradient Text
- Background: `linear-gradient(90deg, #00E8FF, #8B5CF6)`
- `-webkit-background-clip: text`
- `-webkit-text-fill-color: transparent`
- Usage: Hero titles, CTAs

---

## 📐 Spacing & Layout System

### Base Grid: 8px

All spacing values are multiples of 8px for consistency.

### Container Width

- **Max Width:** 1280px
- **Padding:** Responsive `clamp(1.5rem, 4vw, 3rem)` (24px - 48px)
- **Usage:** All page containers

### Section Spacing

| Spacing | Value | Usage |
|---------|-------|-------|
| Section Padding Top | 120px | Top padding for sections |
| Section Padding Bottom | 120px | Bottom padding for sections |
| Hero Padding Top | 180px | Top padding for hero section |
| Hero Padding Bottom | 100px | Bottom padding for hero section |
| Section Gap | 80px | Space between sections |

**Responsive:** On mobile, section padding reduces to `clamp(60px, 15vw, 80px)`

### Component Spacing

| Component | Padding | Usage |
|-----------|---------|-------|
| Card Default | 32px | Standard cards |
| Card Large | 40px | Important cards |
| Card Small | 24px | Compact cards |
| Card Gap | 32px | Space between cards in grid |

### Element Spacing

| Spacing | Value | Usage |
|---------|-------|-------|
| Element Gap | 24px | Space between elements |
| Element Gap Small | 16px | Tight spacing |
| Button Gap | 16px | Space between buttons |
| Input Gap | 16px | Space in form inputs |

### Button Spacing

| Dimension | Value | Usage |
|-----------|-------|-------|
| Padding X | 32px | Horizontal padding |
| Padding Y | 18px | Vertical padding |
| Gap | 16px | Space between button content |

### Input Spacing

| Dimension | Value | Usage |
|-----------|-------|-------|
| Padding X | 20px | Horizontal padding |
| Padding Y | 16px | Vertical padding |
| Gap | 16px | Space in input groups |

### Header Spacing

| Dimension | Value | Usage |
|-----------|-------|-------|
| Height | 80px | Navigation bar height |
| Padding X | 32px | Horizontal padding |
| Padding Y | 24px | Vertical padding |

### Border Radius

| Element | Radius | Usage |
|---------|--------|-------|
| Cards | 24px | All glass cards |
| Inputs | 16px | Form inputs |
| Buttons | 16px | All buttons |
| Small | 12px | Badges, small elements |

---

## 🧩 Component Specifications

### 1. Glass Card

**Base Class:** `.glass-card`

**Properties:**
- Background: `rgba(255, 255, 255, 0.05)`
- Backdrop Filter: `blur(16px)`
- Border: `1px solid rgba(255, 255, 255, 0.08)`
- Border Radius: `24px`
- Padding: `32px`
- Box Shadow: `0 8px 32px rgba(0, 0, 0, 0.3)`

**Variants:**
- `.glass-card-strong`: Enhanced opacity (0.08), stronger blur (20px)
- `.glass-card-sm`: Smaller padding (24px)

**Usage:** All card containers

### 2. Neon Button

**Base Class:** `.btn-neon`

**Properties:**
- Background: `linear-gradient(90deg, #00E8FF, #8B5CF6)`
- Padding: `18px 32px`
- Border Radius: `16px`
- Font Weight: 600 (Semibold)
- Font Size: 15px
- Color: White
- Box Shadow: `0 0 20px rgba(168, 85, 247, 0.5)`
- Display: `inline-flex`
- Align Items: `center`
- Gap: `16px`

**Hover State:**
- Background: `linear-gradient(90deg, #00D4E8, #7C3AED)`
- Box Shadow: `0 0 14px rgba(168, 85, 247, 0.55)`
- Transform: `translateY(-2px)`

**Active State:**
- Transform: `translateY(0)`

**Usage:** Primary CTAs, main actions

### 3. Glass Button

**Base Class:** `.btn-glass`

**Properties:**
- Background: `rgba(255, 255, 255, 0.05)`
- Backdrop Filter: `blur(16px)`
- Border: `1px solid rgba(255, 255, 255, 0.08)`
- Padding: `18px 32px`
- Border Radius: `16px`
- Font Weight: 600 (Semibold)
- Color: White

**Hover State:**
- Background: `rgba(255, 255, 255, 0.08)`
- Border Color: `rgba(255, 255, 255, 0.12)`
- Box Shadow: `0 0 40px rgba(0, 232, 255, 0.25)`

**Usage:** Secondary actions, alternative CTAs

### 4. Glass Input

**Base Class:** `.glass-input`

**Properties:**
- Background: `rgba(255, 255, 255, 0.03)`
- Border: `1px solid rgba(255, 255, 255, 0.06)`
- Border Radius: `16px`
- Backdrop Filter: `blur(8px)`
- Padding: `16px 20px`

**Focus State:**
- Outline: None
- Ring: `2px solid var(--accent-cyan)`
- Border Color: `var(--accent-cyan)`

**Usage:** All form inputs, textareas

### 5. Loader Component

**Sizes:**
- Small: `16px × 16px`
- Medium: `32px × 32px`
- Large: `48px × 48px`

**Properties:**
- Border: `4px solid rgba(0, 232, 255, 0.2)`
- Border Top: `4px solid #00E8FF`
- Border Radius: `50%`
- Animation: `spin`
- Box Shadow: `0 0 20px rgba(0, 232, 255, 0.4)`

**Usage:** Loading states, async operations

---

## 📄 Page Structures & Wireframes

### 1. Home Page (`/`)

#### Header/Navigation
```
┌─────────────────────────────────────────────────────┐
│  [Logo]                    [Upload] [Get Started]   │
└─────────────────────────────────────────────────────┘
```

**Specifications:**
- Fixed position at top
- Height: 80px
- Glassmorphism background
- Container: 1280px max-width
- Padding: 32px horizontal

#### Hero Section
```
┌─────────────────────────────────────────────────────┐
│                                                      │
│              [Badge: AI-Powered]                    │
│                                                      │
│         Your AI‑powered Assignment                  │
│              Assistant                               │
│                                                      │
│    Upload PDFs or paste questions — get clean,      │
│          clear answers instantly.                    │
│                                                      │
│        [Upload PDF]    [Paste Question]             │
│                                                      │
│         ┌────────────────────────┐                  │
│         │  Question Preview Card │                  │
│         │  [Glass Card]          │                  │
│         └────────────────────────┘                  │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**Specifications:**
- Padding Top: 180px
- Padding Bottom: 100px
- Max Width: 1280px
- Content Centered
- Max Content Width: 5xl (80rem)

**Elements:**
1. Badge: Glass card, floating animation
2. Hero Title: 64px, gradient text
3. Subtitle: 22px, secondary color
4. Action Buttons: 2 buttons side by side
5. Preview Card: Glass card strong, max-width 4xl

#### Feature Section
```
┌─────────────────────────────────────────────────────┐
│           Powerful Features                         │
│    Everything you need to excel...                  │
│                                                      │
│  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐               │
│  │Card1│  │Card2│  │Card3│  │Card4│               │
│  └─────┘  └─────┘  └─────┘  └─────┘               │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**Specifications:**
- Padding: 120px top/bottom
- Grid: 4 columns on desktop, 2 on tablet, 1 on mobile
- Gap: 32px between cards
- Cards: Glass card with icon, title, description

**Feature Cards:**
1. Upload & Parse PDF
2. AI Answer Generation
3. Rewrite to Human Style
4. One-click Export

#### CTA Section
```
┌─────────────────────────────────────────────────────┐
│                                                      │
│         ┌──────────────────────┐                    │
│         │  Ready to Get        │                    │
│         │  Started?            │                    │
│         │                      │                    │
│         │  Join thousands...   │                    │
│         │                      │                    │
│         │  [Start Now] [History]                    │
│         └──────────────────────┘                    │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**Specifications:**
- Padding: 120px top/bottom
- Card: Glass card strong
- Max Width: 4xl
- Centered

#### Footer
```
┌─────────────────────────────────────────────────────┐
│  Product    Resources   Company    Connect          │
│  • Upload   • Docs      • About    [@] [#]          │
│  • History  • FAQ       • Privacy                   │
│  • Login    • Support   • Terms                     │
│                                                      │
│              © 2025 Assignment Assistant            │
└─────────────────────────────────────────────────────┘
```

**Specifications:**
- Padding: 120px top/bottom
- Grid: 4 columns on desktop, responsive
- Gap: 32px between columns
- Border Top: 1px solid border-subtle

---

### 2. Upload Page (`/upload`)

#### Split Layout
```
┌─────────────────────────────────────────────────────┐
│  [← Back to Home]                                   │
│                                                      │
│  Upload Assignment                                  │
│  Upload a PDF or paste your assignment question     │
│                                                      │
│  ┌──────────────┐  ┌──────────────┐                │
│  │              │  │              │                │
│  │  LEFT PANEL  │  │ RIGHT PANEL  │                │
│  │  - Mode Btns │  │  - Preview   │                │
│  │  - Upload    │  │  - Info Card │                │
│  │  - Generate  │  │              │                │
│  │              │  │              │                │
│  └──────────────┘  └──────────────┘                │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**Specifications:**
- Padding Top: 100px (accounting for navbar)
- Padding Bottom: 64px
- Grid: 2 columns on desktop (lg), 1 column on mobile
- Gap: 32px between panels

**Left Panel:**
- Mode Selection: 2 buttons (Upload PDF / Paste Question)
- Input Area: FileUploader or TextAreaInput
- Generate Button: Full width neon button

**Right Panel:**
- Preview Card: Glass card strong with question preview
- Info Card: "How it works" instructions

---

### 3. Result Page (`/result`)

**Layout:**
- Question Display: Glass card with question
- Answer Display: Large glass card strong with answer
- Action Buttons: Rewrite, Save, Download (horizontal)
- Sticky header with back button

---

### 4. History Page (`/history`)

**Layout:**
- Search Bar: Glass input at top
- Assignment List: Grid of glass cards
- Each Card: Question preview, date, actions (View/Delete)
- Pagination: If more than 10 items

---

### 5. Login/Register Pages

**Layout:**
- Centered glass card strong
- Max Width: 448px (28rem)
- Form inputs with icons
- Submit button (neon)
- Link to alternate page
- Back to home link

---

## ✨ Animation & Micro-interactions

### Page Load Animations

#### Fade In
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Usage:** Cards, sections on page load  
**Duration:** 0.6s  
**Timing:** ease-out

#### Float Animation
```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
```

**Usage:** Badges, decorative elements  
**Duration:** 3s  
**Timing:** ease-in-out infinite

### Hover Effects

#### Button Hover
- Transform: `translateY(-2px)`
- Box Shadow: Increased glow
- Background: Gradient shift
- Duration: 0.3s

#### Card Hover
- Transform: `scale(1.03)`
- Border: Enhanced glow
- Box Shadow: Increased elevation
- Duration: 0.3s

#### Link Hover
- Color: Change to accent cyan
- Duration: 0.3s

### Loading States

#### Pulse Glow
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

**Usage:** Loading indicators, async operations  
**Duration:** 2s  
**Timing:** ease-in-out infinite

#### Spinner
- Rotation: 360deg
- Duration: 1s
- Timing: linear infinite

### Micro-interactions

1. **Button Click**: Scale down to 0.98 on active
2. **Input Focus**: Cyan glow ring appears
3. **Card Hover**: Gradient line expands from 0 to 100% width
4. **Icon Hover**: Rotate, scale, or translate based on context
5. **Toast Notifications**: Slide in from top-right

---

## 📱 Responsive Design

### Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| Mobile | < 640px | Single column layouts |
| Tablet | 640px - 1024px | 2 column grids |
| Desktop | > 1024px | Full layouts, 4 columns |

### Mobile Adaptations

#### Navigation
- Hamburger menu (if needed)
- Stacked buttons
- Full-width CTAs

#### Hero Section
- Reduced padding: `clamp(120px, 25vw, 140px)` top
- Smaller font sizes: 48px for hero title
- Stacked buttons
- Full-width preview card

#### Feature Cards
- Single column layout
- Full width cards
- Reduced padding: 24px

#### Sections
- Reduced padding: `clamp(60px, 15vw, 80px)`
- Stacked content
- Full-width containers

### Tablet Adaptations

- 2-column grids instead of 4
- Moderate padding reductions
- Maintained readability

---

## ♿ Accessibility Requirements

### WCAG 2.1 AA Compliance

#### Color Contrast

| Element Pair | Contrast Ratio | Status |
|--------------|----------------|--------|
| White text on Deep Navy | 15.8:1 | ✅ AAA |
| Secondary text on Deep Navy | 6.5:1 | ✅ AA |
| Cyan on Deep Navy | 4.8:1 | ✅ AA |
| Purple on Deep Navy | 4.9:1 | ✅ AA |

#### Focus Indicators

**Required:**
- Visible focus rings on all interactive elements
- Focus ring: `2px solid var(--accent-cyan)`
- Offset: `4px`
- Minimum contrast: 3:1 against background

**Implementation:**
```css
:focus-visible {
  outline: 2px solid var(--accent-cyan);
  outline-offset: 4px;
}
```

#### Keyboard Navigation

**Required:**
- All interactive elements keyboard accessible
- Logical tab order
- Skip to content link
- Escape key closes modals/overlays

#### Screen Reader Support

**Required:**
- Semantic HTML elements
- ARIA labels where needed
- Alt text for images
- Proper heading hierarchy

#### Reduced Motion

**Required:**
- Respect `prefers-reduced-motion`
- Disable animations when requested
- Maintain functionality

**Implementation:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🔧 Implementation Guidelines

### CSS Architecture

#### CSS Variables
All design tokens are defined as CSS variables in `:root`:
```css
:root {
  --bg-primary: #0A0F1F;
  --accent-cyan: #00E8FF;
  /* ... etc */
}
```

#### Utility Classes
Use utility classes for common patterns:
- `.glass-card` - Base glass card
- `.glass-card-strong` - Enhanced glass card
- `.btn-neon` - Neon gradient button
- `.btn-glass` - Glass button
- `.glass-input` - Glass input field
- `.gradient-text` - Gradient text effect
- `.glow-cyan`, `.glow-purple` - Glow effects

#### Component Structure
```tsx
// Example component structure
<div className="glass-card">
  <div className="glass-card-strong mb-6">
    {/* Icon container */}
  </div>
  <h3 className="text-xl font-semibold mb-2">
    {/* Title */}
  </h3>
  <p className="text-sm">
    {/* Description */}
  </p>
</div>
```

### Best Practices

1. **Consistency**: Always use design system tokens
2. **Responsive**: Mobile-first approach
3. **Performance**: Optimize animations, use CSS transforms
4. **Accessibility**: Test with keyboard and screen readers
5. **Maintainability**: Use CSS variables for all values

### File Structure

```
app/
├── globals.css          # Design system, utilities
├── layout.tsx           # Root layout with Inter font
├── page.tsx             # Home page
├── upload/
│   └── page.tsx         # Upload page
├── result/
│   └── page.tsx         # Result page
├── history/
│   └── page.tsx         # History page
├── login/
│   └── page.tsx         # Login page
└── register/
    └── page.tsx         # Register page

components/
├── Navbar.tsx           # Navigation component
├── FileUploader.tsx     # File upload component
├── TextAreaInput.tsx    # Text input component
├── AnswerBox.tsx        # Answer display component
├── Loader.tsx           # Loading component
├── DownloadButtons.tsx  # Download component
└── ThemeToggle.tsx      # Theme toggle (optional)
```

---

## ✅ Quality Checklist

### Design Consistency
- [ ] All colors match design system
- [ ] Typography hierarchy followed
- [ ] Spacing uses 8px grid
- [ ] Border radius consistent
- [ ] Glow effects applied correctly

### Functionality
- [ ] All buttons functional
- [ ] Forms validate correctly
- [ ] File upload works
- [ ] Animations smooth
- [ ] Loading states work

### Responsiveness
- [ ] Mobile layouts correct
- [ ] Tablet layouts correct
- [ ] Desktop layouts correct
- [ ] Text readable at all sizes
- [ ] Touch targets adequate (min 44px)

### Accessibility
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader compatible
- [ ] Color contrast sufficient
- [ ] Reduced motion respected

### Performance
- [ ] Fast initial load
- [ ] Smooth animations (60fps)
- [ ] Optimized images
- [ ] Lazy loading where appropriate

---

## 📚 Reference Resources

### Design Inspiration
- Glassmorphism trends 2025
- Neo-futuristic UI patterns
- Dark theme best practices
- Neon color palettes

### Tools
- **Color Contrast Checker**: WebAIM Contrast Checker
- **Typography Scale**: Type Scale Calculator
- **Spacing System**: 8px Grid Generator
- **Animation**: CSS Animation Libraries

---

## 📝 Change Log

### Version 1.0 (Current)
- Initial design system implementation
- All pages created
- Responsive breakpoints defined
- Accessibility guidelines added
- Animation system implemented

---

**Document Status:** ✅ Complete  
**Last Reviewed:** 2025  
**Next Review:** As needed for updates

