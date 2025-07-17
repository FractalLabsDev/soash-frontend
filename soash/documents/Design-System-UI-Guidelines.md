# Design System & UI Guidelines

## Overview

This document defines the design system and UI guidelines for the Soash platform. It establishes consistent visual patterns, component standards, and design principles to ensure a cohesive user experience across all interfaces. This system integrates stakeholder-approved prototype designs with atomic design principles and shadcn/ui components.

**Design Philosophy**: Clean, modern, data-focused
**Target Audience**: Content creators and business owners
**Brand Personality**: Professional, intelligent, approachable
**Component Architecture**: Atomic design with shadcn/ui foundation
**Design Source**: Stakeholder-approved clickable prototype

---

## Design Principles

### 1. Clarity First
- **Information hierarchy**: Most important data prominently displayed
- **Minimal cognitive load**: Avoid overwhelming users with too much information
- **Clear navigation**: Intuitive paths to key features
- **Accessible design**: WCAG 2.1 AA compliance

### 2. Data-Driven Design
- **Visual emphasis on metrics**: Charts and numbers are focal points
- **Actionable insights**: Every data point leads to clear actions
- **Performance-focused**: Visual cues for high/low performance
- **Trend visualization**: Clear indication of positive/negative trends

### 3. Professional Aesthetics
- **Modern and clean**: Minimal visual noise
- **Trustworthy appearance**: Professional color palette and typography
- **Brand consistency**: Cohesive visual language throughout
- **Responsive design**: Seamless experience across all devices

---

## Color Palette

### Primary Colors (From Prototype)
```css
/* Primary - Dark blue from prototype */
--color-primary: hsl(222.2 47.4% 11.2%)
--color-primary-foreground: hsl(210 40% 98%)

/* Primary scale for variations */
--color-primary-50: #f8fafc
--color-primary-100: #f1f5f9
--color-primary-200: #e2e8f0
--color-primary-300: #cbd5e1
--color-primary-400: #94a3b8
--color-primary-500: hsl(222.2 47.4% 11.2%)  /* Primary from prototype */
--color-primary-600: #475569
--color-primary-700: #334155
--color-primary-800: #1e293b
--color-primary-900: #0f172a
```

### Secondary Colors (From Prototype)
```css
/* Secondary - Light backgrounds */
--color-secondary: hsl(210 40% 96.1%)
--color-secondary-foreground: hsl(222.2 47.4% 11.2%)

/* Muted - Subtle backgrounds and text */
--color-muted: hsl(210 40% 96.1%)
--color-muted-foreground: hsl(215.4 16.3% 46.9%)

/* Accent - Hover states and highlights */
--color-accent: hsl(210 40% 96.1%)
--color-accent-foreground: hsl(222.2 47.4% 11.2%)

/* Base colors */
--color-background: hsl(0 0% 100%)
--color-foreground: hsl(222.2 84% 4.9%)
--color-card: hsl(0 0% 100%)
--color-card-foreground: hsl(222.2 84% 4.9%)
--color-popover: hsl(0 0% 100%)
--color-popover-foreground: hsl(222.2 84% 4.9%)

/* Borders and inputs */
--color-border: hsl(214.3 31.8% 91.4%)
--color-input: hsl(214.3 31.8% 91.4%)
--color-ring: hsl(222.2 84% 4.9%)
```

### Semantic Colors
```css
/* Success - Positive trends, high performance */
--color-success-50: #f0fdf4
--color-success-100: #dcfce7
--color-success-500: #22c55e
--color-success-600: #16a34a
--color-success-700: #15803d

/* Warning - Moderate performance, attention needed */
--color-warning-50: #fffbeb
--color-warning-100: #fef3c7
--color-warning-500: #f59e0b
--color-warning-600: #d97706
--color-warning-700: #b45309

/* Error - Low performance, issues */
--color-error-50: #fef2f2
--color-error-100: #fee2e2
--color-error-500: #ef4444
--color-error-600: #dc2626
--color-error-700: #b91c1c

/* Info - Neutral information */
--color-info-50: #f0f9ff
--color-info-100: #e0f2fe
--color-info-500: #06b6d4
--color-info-600: #0891b2
--color-info-700: #0e7490
```

### Usage Guidelines
- **Primary**: Call-to-action buttons, active states, brand elements
- **Gray**: Text, borders, backgrounds, inactive states
- **Success**: Positive metrics, growth indicators, success messages
- **Warning**: Moderate performance, cautionary messages
- **Error**: Poor performance, error states, deletion actions
- **Info**: Neutral information, help text, secondary actions

---

## Typography

### Font Stack
```css
/* Primary Font - Inter */
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* Monospace Font - JetBrains Mono */
--font-mono: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
```

### Type Scale
```css
/* Display - Hero sections, major headings */
--text-display-lg: 4.5rem; /* 72px */
--text-display-md: 3.75rem; /* 60px */
--text-display-sm: 3rem; /* 48px */

/* Headings - Section titles, card headers */
--text-heading-xl: 2.25rem; /* 36px */
--text-heading-lg: 1.875rem; /* 30px */
--text-heading-md: 1.5rem; /* 24px */
--text-heading-sm: 1.25rem; /* 20px */

/* Body - Main content text */
--text-body-xl: 1.125rem; /* 18px */
--text-body-lg: 1rem; /* 16px */
--text-body-md: 0.875rem; /* 14px */
--text-body-sm: 0.75rem; /* 12px */

/* Labels - Form labels, captions */
--text-label-lg: 0.875rem; /* 14px */
--text-label-md: 0.75rem; /* 12px */
--text-label-sm: 0.6875rem; /* 11px */
```

### Font Weights
```css
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Line Heights
```css
--line-height-tight: 1.2;
--line-height-normal: 1.5;
--line-height-relaxed: 1.625;
--line-height-loose: 2;
```

---

## Spacing System

### Space Scale
```css
/* Spacing values based on 4px grid */
--space-0: 0;
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem; /* 8px */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem; /* 16px */
--space-5: 1.25rem; /* 20px */
--space-6: 1.5rem; /* 24px */
--space-8: 2rem; /* 32px */
--space-10: 2.5rem; /* 40px */
--space-12: 3rem; /* 48px */
--space-16: 4rem; /* 64px */
--space-20: 5rem; /* 80px */
--space-24: 6rem; /* 96px */
```

### Usage Guidelines
- **Component padding**: space-4 (16px) for most components
- **Section spacing**: space-8 (32px) between major sections
- **Element spacing**: space-2 (8px) between related elements
- **Layout margins**: space-6 (24px) for page margins

---

## Atomic Design Component Library

### Overview
Our component library follows atomic design principles, organizing components into five distinct levels. Components are built using shadcn/ui as a foundation, providing excellent accessibility and proven patterns while maintaining our atomic design structure.

1. **Atoms** - Basic building blocks (shadcn/ui primitives: buttons, inputs, labels)
2. **Molecules** - Simple combinations of atoms (form fields, metric cards, search boxes)
3. **Organisms** - Complex components made of molecules/atoms (navigation, forms, dashboards)
4. **Templates** - Page-level layouts with placeholders (dashboard, auth layouts)
5. **Pages** - Specific instances of templates with real content

### shadcn/ui Integration Strategy

**Foundation Layer**: shadcn/ui components provide the accessible, well-tested foundation
**Atomic Wrapper Layer**: Custom atomic design wrappers add business logic and design system compliance
**Composition Layer**: Molecules and organisms compose atoms following atomic design principles

```typescript
// Example: Button atom wrapping shadcn/ui
import { Button as ShadcnButton } from "@/components/ui/button"

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "default", ...props }, ref) => {
    return (
      <ShadcnButton
        ref={ref}
        variant={variant}
        size={size}
        className={cn("transition-all duration-200", props.className)}
        {...props}
      />
    )
  }
)
```

---

## Atoms

### Buttons

#### Primary Button
```css
.btn-primary {
  background-color: var(--color-primary-500);
  color: white;
  padding: var(--space-3) var(--space-6);
  border-radius: 0.5rem;
  font-weight: var(--font-weight-medium);
  font-size: var(--text-body-lg);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.btn-primary:hover {
  background-color: var(--color-primary-600);
  transform: translateY(-1px);
}

.btn-primary:active {
  background-color: var(--color-primary-700);
  transform: translateY(0);
}
```

#### Secondary Button
```css
.btn-secondary {
  background-color: transparent;
  color: var(--color-primary-500);
  padding: var(--space-3) var(--space-6);
  border: 1px solid var(--color-primary-500);
  border-radius: 0.5rem;
  font-weight: var(--font-weight-medium);
  font-size: var(--text-body-lg);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.btn-secondary:hover {
  background-color: var(--color-primary-50);
  border-color: var(--color-primary-600);
}
```

#### Button Sizes
- **Small**: padding: space-2 space-4, font-size: text-body-md
- **Medium**: padding: space-3 space-6, font-size: text-body-lg (default)
- **Large**: padding: space-4 space-8, font-size: text-body-xl

### Input Fields
```css
.input-field {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--color-gray-300);
  border-radius: 0.5rem;
  font-size: var(--text-body-lg);
  color: var(--color-gray-900);
  background-color: white;
  transition: border-color 0.2s ease-in-out;
}

.input-field:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input-field::placeholder {
  color: var(--color-gray-400);
}
```

### Labels
```css
.label {
  display: block;
  font-size: var(--text-label-lg);
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-700);
  margin-bottom: var(--space-2);
}
```

### Icons
```css
.icon {
  width: 1.25rem;
  height: 1.25rem;
  color: currentColor;
  flex-shrink: 0;
}

.icon-sm { width: 1rem; height: 1rem; }
.icon-md { width: 1.25rem; height: 1.25rem; }
.icon-lg { width: 1.5rem; height: 1.5rem; }
```

### Badges
```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-3);
  border-radius: 9999px;
  font-size: var(--text-label-md);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.badge.high-performance {
  background-color: var(--color-success-100);
  color: var(--color-success-700);
}

.badge.medium-performance {
  background-color: var(--color-warning-100);
  color: var(--color-warning-700);
}

.badge.low-performance {
  background-color: var(--color-error-100);
  color: var(--color-error-700);
}
```

### Loading Indicators
```css
.loading-spinner {
  width: 2rem;
  height: 2rem;
  border: 2px solid var(--color-gray-200);
  border-top: 2px solid var(--color-primary-500);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-skeleton {
  background: linear-gradient(90deg, var(--color-gray-200) 25%, var(--color-gray-100) 50%, var(--color-gray-200) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

---

## Molecules

### Form Fields
```css
/* InputField Molecule: Label + Input + Error Message */
.input-field-molecule {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.input-field-molecule .label {
  /* Uses label atom styles */
}

.input-field-molecule .input {
  /* Uses input atom styles */
}

.input-field-molecule .error-message {
  font-size: var(--text-body-sm);
  color: var(--color-error-600);
}
```

### Search Box
```css
/* SearchBox Molecule: Input + Icon + Button */
.search-box {
  display: flex;
  align-items: center;
  position: relative;
}

.search-box .input {
  padding-right: var(--space-12);
  /* Uses input atom styles */
}

.search-box .search-icon {
  position: absolute;
  right: var(--space-3);
  /* Uses icon atom styles */
}
```

### Metric Cards
```css
/* MetricCard Molecule: Icon + Value + Label + Badge */
.metric-card-molecule {
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid var(--color-gray-200);
  padding: var(--space-6);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
}

.metric-card-molecule .icon {
  /* Uses icon atom styles */
}

.metric-card-molecule .metric-value {
  font-size: var(--text-heading-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
}

.metric-card-molecule .metric-label {
  font-size: var(--text-body-md);
  color: var(--color-gray-600);
}

.metric-card-molecule .badge {
  /* Uses badge atom styles */
}
```

### Navigation Links
```css
/* NavLink Molecule: Icon + Label + Badge (optional) */
.nav-link-molecule {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  color: var(--color-gray-700);
  text-decoration: none;
  border-radius: 0.5rem;
  transition: all 0.2s ease-in-out;
}

.nav-link-molecule:hover {
  background-color: var(--color-gray-100);
  color: var(--color-gray-900);
}

.nav-link-molecule.active {
  background-color: var(--color-primary-50);
  color: var(--color-primary-700);
}

.nav-link-molecule .icon {
  /* Uses icon atom styles */
}

.nav-link-molecule .badge {
  /* Uses badge atom styles */
  margin-left: auto;
}
```

---

## Organisms

### Cards

### Card Containers
```css
/* Base Card Organism: Complex container with header/body/footer */
.card-organism {
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid var(--color-gray-200);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease-in-out;
}

.card-organism:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-organism .card-header {
  padding: var(--space-6);
  border-bottom: 1px solid var(--color-gray-200);
}

.card-organism .card-body {
  padding: var(--space-6);
}

.card-organism .card-footer {
  padding: var(--space-4) var(--space-6);
  border-top: 1px solid var(--color-gray-200);
  background-color: var(--color-gray-50);
}
```

### Forms
```css
/* LoginForm Organism: Multiple form fields + buttons + validation */
.login-form-organism {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  padding: var(--space-8);
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid var(--color-gray-200);
}

.login-form-organism .form-header {
  text-align: center;
  margin-bottom: var(--space-4);
}

.login-form-organism .form-fields {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.login-form-organism .form-actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.login-form-organism .form-footer {
  text-align: center;
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-gray-200);
}
```

### Navigation

### Top Navigation
```css
/* TopNav Organism: Brand + Navigation Links + User Actions */
.top-nav-organism {
  background-color: white;
  border-bottom: 1px solid var(--color-gray-200);
  padding: var(--space-4) var(--space-6);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.top-nav-organism .nav-brand {
  font-size: var(--text-heading-md);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-500);
}

.top-nav-organism .nav-links {
  display: flex;
  align-items: center;
  gap: var(--space-8);
}

.top-nav-organism .nav-actions {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}
```

### Sidebar Navigation
```css
/* Sidebar Organism: Navigation sections + Links + User profile */
.sidebar-organism {
  width: 16rem;
  background-color: white;
  border-right: 1px solid var(--color-gray-200);
  padding: var(--space-6);
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.sidebar-organism .sidebar-header {
  margin-bottom: var(--space-6);
}

.sidebar-organism .sidebar-content {
  flex: 1;
}

.sidebar-organism .sidebar-section {
  margin-bottom: var(--space-8);
}

.sidebar-organism .sidebar-section-title {
  font-size: var(--text-label-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-500);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-4);
}

.sidebar-organism .sidebar-links {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.sidebar-organism .sidebar-footer {
  margin-top: auto;
  padding-top: var(--space-6);
  border-top: 1px solid var(--color-gray-200);
}
```

### Dashboard Sections
```css
/* DashboardHeader Organism: Title + Actions + Filters */
.dashboard-header-organism {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-8);
  padding: var(--space-6);
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid var(--color-gray-200);
}

.dashboard-header-organism .header-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.dashboard-header-organism .header-title {
  font-size: var(--text-heading-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
}

.dashboard-header-organism .header-subtitle {
  font-size: var(--text-body-md);
  color: var(--color-gray-600);
}

.dashboard-header-organism .header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

/* MetricsGrid Organism: Grid of metric cards */
.metrics-grid-organism {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-6);
  margin-bottom: var(--space-8);
}
```

---

## Templates

### Dashboard Template
```css
/* DashboardTemplate: Layout structure for dashboard pages */
.dashboard-template {
  display: grid;
  grid-template-columns: 16rem 1fr;
  height: 100vh;
}

.dashboard-template .sidebar {
  /* Uses sidebar organism */
}

.dashboard-template .main-content {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.dashboard-template .top-nav {
  /* Uses top navigation organism */
}

.dashboard-template .content-area {
  flex: 1;
  padding: var(--space-6);
  overflow-y: auto;
  background-color: var(--color-gray-50);
}
```

### Authentication Template
```css
/* AuthTemplate: Centered layout for login/signup */
.auth-template {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: var(--color-gray-50);
  padding: var(--space-6);
}

.auth-template .auth-container {
  width: 100%;
  max-width: 400px;
}

.auth-template .auth-header {
  text-align: center;
  margin-bottom: var(--space-8);
}

.auth-template .auth-footer {
  text-align: center;
  margin-top: var(--space-6);
  padding-top: var(--space-6);
  border-top: 1px solid var(--color-gray-200);
}
```

---

## Pages

### Dashboard Page
```css
/* Specific instance of dashboard template with real content */
.dashboard-page {
  /* Uses dashboard template structure */
}

.dashboard-page .welcome-section {
  margin-bottom: var(--space-8);
}

.dashboard-page .metrics-overview {
  margin-bottom: var(--space-8);
}

.dashboard-page .recent-posts {
  margin-bottom: var(--space-8);
}

.dashboard-page .insights-section {
  /* Uses insights organism */
}
```

### Login Page
```css
/* Specific instance of auth template for login */
.login-page {
  /* Uses auth template structure */
}

.login-page .login-form {
  /* Uses login form organism */
}
```

### Data Visualization

#### Chart Colors
```css
/* Chart color palette for data visualization */
--chart-color-1: #3b82f6; /* Primary blue */
--chart-color-2: #10b981; /* Success green */
--chart-color-3: #f59e0b; /* Warning yellow */
--chart-color-4: #ef4444; /* Error red */
--chart-color-5: #8b5cf6; /* Purple */
--chart-color-6: #06b6d4; /* Cyan */
--chart-color-7: #f97316; /* Orange */
--chart-color-8: #84cc16; /* Lime */
```

#### Chart Containers
```css
.chart-container {
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid var(--color-gray-200);
  padding: var(--space-6);
  margin-bottom: var(--space-6);
}

.chart-title {
  font-size: var(--text-heading-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
  margin-bottom: var(--space-4);
}

.chart-subtitle {
  font-size: var(--text-body-md);
  color: var(--color-gray-600);
  margin-bottom: var(--space-6);
}
```


---

## Layout System

### Grid System
```css
/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-6);
}

/* Grid */
.grid {
  display: grid;
  gap: var(--space-6);
}

.grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }

/* Responsive breakpoints */
@media (min-width: 640px) {
  .sm\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
  .sm\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
}

@media (min-width: 768px) {
  .md\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
  .md\:grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
  .lg\:grid-cols-6 { grid-template-columns: repeat(6, 1fr); }
}
```

### Flexbox Utilities
```css
.flex { display: flex; }
.flex-col { flex-direction: column; }
.flex-wrap { flex-wrap: wrap; }
.items-center { align-items: center; }
.items-start { align-items: flex-start; }
.items-end { align-items: flex-end; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.justify-start { justify-content: flex-start; }
.justify-end { justify-content: flex-end; }
```

---

## Responsive Design

### Breakpoints
```css
/* Mobile First Approach */
/* xs: 0px - 639px (default) */
/* sm: 640px - 767px */
/* md: 768px - 1023px */
/* lg: 1024px - 1279px */
/* xl: 1280px and up */

--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
```

### Responsive Typography
```css
/* Scale down text on mobile */
@media (max-width: 639px) {
  .text-display-lg { font-size: 2.5rem; }
  .text-display-md { font-size: 2rem; }
  .text-heading-xl { font-size: 1.875rem; }
  .text-heading-lg { font-size: 1.5rem; }
}
```

### Mobile-Specific Styles
```css
/* Mobile navigation */
@media (max-width: 767px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: -100%;
    z-index: 50;
    transition: left 0.3s ease-in-out;
  }
  
  .sidebar.open {
    left: 0;
  }
  
  .mobile-menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 40;
  }
}

/* Mobile-optimized cards */
@media (max-width: 639px) {
  .card {
    border-radius: 0.5rem;
    margin: 0 var(--space-4);
  }
  
  .card-header,
  .card-body {
    padding: var(--space-4);
  }
}
```

---

## Animation Guidelines

### Transition Timings
```css
--duration-fast: 0.15s;
--duration-normal: 0.2s;
--duration-slow: 0.3s;

--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
```

### Common Animations
```css
/* Hover effects */
.hover-lift {
  transition: transform var(--duration-normal) var(--ease-out);
}

.hover-lift:hover {
  transform: translateY(-2px);
}

/* Fade in animation */
.fade-in {
  opacity: 0;
  animation: fadeIn var(--duration-slow) var(--ease-out) forwards;
}

@keyframes fadeIn {
  to { opacity: 1; }
}

/* Slide up animation */
.slide-up {
  transform: translateY(1rem);
  opacity: 0;
  animation: slideUp var(--duration-slow) var(--ease-out) forwards;
}

@keyframes slideUp {
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

---

## Accessibility Guidelines

### Color Contrast
- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text**: Minimum 3:1 contrast ratio
- **UI elements**: Minimum 3:1 contrast ratio

### Focus States
```css
/* Focus indicators */
.focus-ring {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

/* Custom focus styles */
.custom-focus:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}
```

### Screen Reader Support
```css
/* Visually hidden but accessible to screen readers */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

---

## Implementation Notes

### Tailwind CSS Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { /* primary color scale */ },
        gray: { /* gray color scale */ },
        success: { /* success color scale */ },
        warning: { /* warning color scale */ },
        error: { /* error color scale */ },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        /* custom spacing scale */
      },
    },
  },
  plugins: [],
}
```

### Component Organization (Atomic Design)
```
src/components/
├── atoms/           # Basic building blocks
│   ├── Button/
│   ├── Input/
│   ├── Label/
│   ├── Icon/
│   ├── Badge/
│   └── LoadingSpinner/
├── molecules/       # Simple combinations of atoms
│   ├── InputField/  # Label + Input + Error
│   ├── SearchBox/   # Input + Icon + Button
│   ├── MetricCard/  # Icon + Value + Label + Badge
│   ├── NavLink/     # Icon + Label + Badge
│   └── FormField/   # Label + Input + Validation
├── organisms/       # Complex UI sections
│   ├── Navigation/
│   ├── Sidebar/
│   ├── DashboardHeader/
│   ├── MetricsGrid/
│   ├── LoginForm/
│   └── ChartContainer/
├── templates/       # Page layouts
│   ├── DashboardTemplate/
│   ├── AuthTemplate/
│   └── SettingsTemplate/
└── pages/          # Specific page instances
    ├── Dashboard/
    ├── Login/
    └── Settings/
```

This design system provides a comprehensive foundation for building consistent, accessible, and visually appealing interfaces for the Soash platform during the 3-month development sprint.