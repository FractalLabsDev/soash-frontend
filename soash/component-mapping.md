# Component Mapping: Prototype to Atomic Design

## Overview

This document maps the components found in the clickable prototype to our atomic design hierarchy. It serves as a guide for migrating shadcn/ui components and building our design system.

## Prototype Component Analysis

Based on the prototype structure and component usage patterns, here's the mapping:

---

## Atoms (Basic Building Blocks)

### From shadcn/ui + Prototype Patterns

| Prototype Usage | Atomic Component | shadcn/ui Base | Description |
|---|---|---|---|
| Primary gradient buttons | `Button` | `@/components/ui/button` | CTA buttons with gradient styling |
| Secondary outline buttons | `Button` (variant) | `@/components/ui/button` | Secondary actions |
| Text inputs with borders | `Input` | `@/components/ui/input` | Form input fields |
| Text labels | `Label` | `@/components/ui/label` | Form field labels |
| Status indicators | `Badge` | `@/components/ui/badge` | Performance badges, confidence scores |
| Lucide icons | `Icon` | `lucide-react` | All iconography |
| Profile pictures | `Avatar` | `@/components/ui/avatar` | User avatars |
| Loading states | `LoadingSpinner` | Custom | Loading indicators |
| Text content | `Typography` | Custom | Heading/body text variants |
| Separators | `Separator` | `@/components/ui/separator` | Visual dividers |

---

## Molecules (Simple Combinations)

### From Prototype Component Patterns

| Prototype Pattern | Molecular Component | Composed Of | Description |
|---|---|---|---|
| Form fields with labels + validation | `InputField` | Label + Input + Error Text | Complete form field |
| Search with icon and button | `SearchBox` | Input + Icon + Button | Search functionality |
| Metric displays | `MetricCard` | Icon + Value + Label + Badge | Dashboard metrics |
| Navigation items | `NavLink` | Icon + Label + Badge (optional) | Sidebar navigation |
| User profile section | `UserProfile` | Avatar + Name + Role | User identification |
| Action buttons with icons | `IconButton` | Icon + Button | Toolbar actions |
| Status indicators | `StatusBadge` | Badge + Icon | Performance status |
| Progress indicators | `ProgressBar` | Progress + Label | Loading/completion |

---

## Organisms (Complex UI Sections)

### From Prototype Major Sections

| Prototype Section | Organism Component | Composed Of | Description |
|---|---|---|---|
| Left sidebar navigation | `Sidebar` | NavLink molecules + UserProfile | Main navigation |
| Top navigation bar | `Navbar` | IconButton + UserProfile + Search | Header navigation |
| Dashboard header with filters | `DashboardHeader` | Typography + Button + Select | Page headers |
| Metrics overview grid | `MetricsGrid` | MetricCard molecules | Dashboard metrics |
| Login/signup forms | `AuthForm` | InputField + Button molecules | Authentication |
| AI insight cards | `AIInsightCard` | Typography + Badge + Button | AI recommendations |
| Content performance cards | `ContentCard` | MetricCard + ProgressBar | Post analytics |
| Platform connection cards | `PlatformCard` | Icon + Typography + Button | Social platforms |
| Analytics charts | `ChartContainer` | Chart + Typography + Controls | Data visualization |

---

## Templates (Page Layouts)

### From Prototype Page Structures

| Prototype Layout | Template Component | Layout Structure | Description |
|---|---|---|---|
| Main dashboard layout | `DashboardTemplate` | Sidebar + Navbar + Content | Primary layout |
| Authentication pages | `AuthTemplate` | Centered form layout | Login/signup |
| Settings pages | `SettingsTemplate` | Sidebar + Content + Form | Configuration |
| Full-width analytics | `AnalyticsTemplate` | Header + Charts + Grid | Analytics views |

---

## Pages (Specific Instances)

### From Prototype Screens

| Prototype Screen | Page Component | Template Used | Content |
|---|---|---|---|
| Main dashboard | `DashboardPage` | DashboardTemplate | MetricsGrid + Charts |
| AI Assistant | `AIAssistantPage` | DashboardTemplate | AIInsightCard + Actions |
| Analytics overview | `AnalyticsPage` | AnalyticsTemplate | Charts + Tables |
| Platform connections | `PlatformsPage` | DashboardTemplate | PlatformCard grid |
| User login | `LoginPage` | AuthTemplate | AuthForm |
| User registration | `SignupPage` | AuthTemplate | AuthForm |

---

## Component Hierarchy Mapping

```
src/components/
├── atoms/
│   ├── Button/           # Primary/secondary buttons from prototype
│   ├── Input/            # Form inputs with prototype styling
│   ├── Label/            # Form labels
│   ├── Badge/            # Status badges (confidence %, performance)
│   ├── Icon/             # Lucide React icons
│   ├── Avatar/           # User profile images
│   ├── LoadingSpinner/   # Loading states
│   ├── Typography/       # Text components (h1, h2, p variants)
│   └── Separator/        # Visual dividers
├── molecules/
│   ├── InputField/       # Label + Input + Error (form fields)
│   ├── SearchBox/        # Input + Icon + Button (search)
│   ├── MetricCard/       # Icon + Value + Label + Badge (metrics)
│   ├── NavLink/          # Icon + Label + Badge (navigation)
│   ├── UserProfile/      # Avatar + Name + Role
│   ├── IconButton/       # Icon + Button (actions)
│   ├── StatusBadge/      # Badge + Icon (status indicators)
│   └── ProgressBar/      # Progress + Label (completion)
├── organisms/
│   ├── Sidebar/          # Complete navigation sidebar
│   ├── Navbar/           # Top navigation bar
│   ├── DashboardHeader/  # Page headers with actions
│   ├── MetricsGrid/      # Grid of metric cards
│   ├── AuthForm/         # Login/signup forms
│   ├── AIInsightCard/    # AI recommendation cards
│   ├── ContentCard/      # Content performance cards
│   ├── PlatformCard/     # Social platform connection cards
│   └── ChartContainer/   # Charts with controls
├── templates/
│   ├── DashboardTemplate/ # Main app layout
│   ├── AuthTemplate/      # Authentication layout
│   ├── SettingsTemplate/  # Settings page layout
│   └── AnalyticsTemplate/ # Analytics page layout
└── pages/
    ├── DashboardPage/     # Main dashboard
    ├── AIAssistantPage/   # AI Assistant
    ├── AnalyticsPage/     # Analytics overview
    ├── PlatformsPage/     # Platform connections
    ├── LoginPage/         # User login
    └── SignupPage/        # User registration
```

---

## Migration Priority

### Phase 1: Core Atoms (High Priority)
1. Button - Primary CTA styling
2. Input - Form field styling
3. Badge - Status indicators
4. Typography - Text hierarchy
5. Icon - Lucide React integration

### Phase 2: Essential Molecules (High Priority)
1. MetricCard - Dashboard metrics
2. NavLink - Navigation
3. InputField - Forms
4. UserProfile - User identification

### Phase 3: Key Organisms (Medium Priority)
1. Sidebar - Main navigation
2. DashboardHeader - Page headers
3. MetricsGrid - Dashboard layout
4. AuthForm - Authentication

### Phase 4: Templates & Pages (Medium Priority)
1. DashboardTemplate - Primary layout
2. AuthTemplate - Auth layout
3. DashboardPage - Main page
4. AIAssistantPage - AI features

---

## Design Token Integration

Each component level should use design tokens consistently:

- **Atoms**: Direct token usage (`bg-primary`, `text-gray-900`)
- **Molecules**: Compose atom tokens (`card-base`, `stack-md`)
- **Organisms**: Layout and spacing tokens (`grid-auto-fit`, `container-main`)
- **Templates**: Responsive and layout tokens
- **Pages**: Content-specific token combinations

---

## shadcn/ui Component Usage

| shadcn/ui Component | Atomic Level | Wrapper Component | Customizations |
|---|---|---|---|
| Button | Atom | `Button` | Gradient variants, sizes |
| Input | Atom | `Input` | Border styling, focus states |
| Label | Atom | `Label` | Typography consistency |
| Badge | Atom | `Badge` | Color variants, sizes |
| Avatar | Atom | `Avatar` | Size variants |
| Card | Molecule | `Card` (base) | Hover effects, variants |
| Separator | Atom | `Separator` | Color, thickness |
| Progress | Molecule | `ProgressBar` | Color variants |
| Tabs | Organism | `TabContainer` | Styling consistency |
| Dialog | Organism | `Modal` | Animation, styling |

This mapping ensures we maintain the atomic design principles while leveraging shadcn/ui's accessibility and proven patterns.