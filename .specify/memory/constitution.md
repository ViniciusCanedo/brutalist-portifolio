<!--
SYNC IMPACT REPORT
==================
Version change: 1.2.0 -> 1.3.0
List of modified principles:
  - IV. Nuxt 4 Production-Ready Single File Components: Updated framework constraint to Nuxt 4.
  - Deployment and Quality Verification: Updated compilation check to Nuxt 4 setup.
Added sections:
  - None
Removed sections:
  - None
Templates requiring updates:
  - .specify/templates/plan-template.md (✅ updated)
  - .specify/templates/spec-template.md (✅ updated)
  - .specify/templates/tasks-template.md (✅ updated)
Follow-up TODOs:
  - None
-->

# Brutalist Portfolio Workbench Constitution

## Core Principles

### I. Neo-Brutalist Design Tokens & Tailwind Core Engine Integration
Every visual component MUST strictly bind to the defined Neo-Brutalist token set (#F1F1F1 background, #2E2E2E primary text/border, #FF6F20 accent, #BEC3C7 muted, #3B3B3B dark, and #FFFFFF white). Color overrides, custom shadow offsets, and border weights (3px/6px) MUST be handled through central configurations or tailwind custom theme configuration, prohibiting ad-hoc styling. Typography MUST use 'Space Grotesk' for display elements and headers, and 'Space Mono' for code block, HUD, and telemetry elements.

### II. Dual-Pane Layout Workspace Separation
The user interface MUST maintain a strict visual separation between the Interactive Live Portfolio Surface (Left Panel, 50% width on large displays) and the Code Inspector & Sandbox Workspace (Right Panel, 50% width on large displays). Both panels MUST scroll independently and remain responsive across all screen breakpoints. The portfolio surface itself MUST consist of exactly two views: the Landing Page and the Projects Page.

### III. Interactive Telemetry & State Synchronization
Dynamic state (active page swapping, technology category filters, projects tabs, and sandbox parameters) MUST be managed using single-source-of-truth Vue 3 reactive variables. Clicking interactive elements in the portfolio (e.g. stack matrix cards) MUST immediately update the workspace telemetry and feed real-time diagnostics into the HUD.

### IV. Nuxt 4 Production-Ready Single File Components
All components presented in the Code Inspector panel MUST represent valid, complete, and production-ready Nuxt 4 Single File Components (SFCs) using <script setup> syntax. Placeholders are strictly prohibited, and components MUST be fully copy-pasteable and functional with TailwindCSS config mappings.

### V. GSAP Timeline Sandboxing & Easing Controls
All motion parameters (easing curves, speed/duration, delay) for system reboot and micro-animations MUST link dynamically to the Sandbox Engine. Motion timelines MUST be constructed via GSAP, reading live input from the workspace controls, and ensuring graceful degradation if GSAP is blocked or fails to load. Micro-interactions and CSS transitions MUST utilize the 'brutal-snappy' easing curve: `cubic-bezier(0.3, 1.5, 0.4, 1)`.

## Visual and Technical Standards
- **Core Styling**: All elements must use custom border widths and box shadows (e.g. `border-3` or `shadow-brutal`) as defined in `references/style.json`.
- **Brutalist CSS Helpers**: Use utility classes `.border-brutal` (3px border with `#2E2E2E`), `.shadow-brutal` (4px offset `#2E2E2E`), `.shadow-brutal-accent` (4px offset `#FF6F20`), and `.shadow-brutal-lg` (8px offset `#2E2E2E`).
- **Responsive Layout**: Visual structure must support mobile devices using stacked layouts, moving seamlessly to side-by-side viewports on `xl` screens.
- **Scroll Footprint**: Layouts must disable root body scrolling and implement scroll zones using standard custom Webkit scrollbars.

### Core Reusable Components Specification
- **Primary Button**: High-contrast active element styled with `bg-neoAccent`, `text-neoPrimary`, `border-brutal`, and `shadow-brutal`. On hover/focus, it must translate slightly (`-2px` X/Y) and apply active easing.
- **Project Card**: Content container featuring `bg-white`, `border-brutal`, `shadow-brutal`. On hover, the shadow changes to `shadow-brutal-accent`. The card contains technology tags, descriptive text tabs (Summary vs Telemetry), and action anchors.
- **Navigation Bar**: Sticky header containing the brand identifier (Logo slot) and toggle routes for switching between Landing Page and Projects Page views.

### Page Architecture and Semantic Outline
- **Landing Page Structure**:
  - `nav` (Navigation Bar component with brand logo and link toggles)
  - `header` (Hero section displaying intro, name, dynamic role title, and diagnostic HUD terminal)
  - `section` (Tech Stack Matrix Grid with category buttons and telemetry cards)
  - `section` (Critical Operational Postures showing core developer methodologies)
  - `section` (Curated Technical Index CTA for project redirection)
- **Projects Page Structure**:
  - `nav` (Navigation Bar component)
  - `header` (Case Studies Archive title header and category sorting options)
  - `main` (Responsive Grid rendering Project Cards filterable by tags)

## Deployment and Quality Verification
- **Component Extractability**: Verify that all Single File Components (SFC) code inside the inspector pane compiles cleanly under Nuxt 4 setup without syntax errors.
- **Timeline Safety**: Ensure GSAP animations are correctly bound to current sandbox ease/duration variables and release resources on unmount to prevent memory leaks.
- **Syntactic Integrity Check**: All HTML reference files, layouts, and Vue components must be well-formed, fully closed, and syntax-valid. Any incomplete or truncated structures discovered in legacy files must be resolved before compilation.
- **Visual Verification**: Run manual or automated sanity checks against target references (`style.json`) before committing modifications.

## Governance
- All modifications to visual designs or component code templates must respect these principles.
- Version updates to the constitution must follow semantic versioning rules based on the impact of changes.
- Prior to any feature specification or implementation, the plan MUST include a Constitution Check validating adherence to these principles.

**Version**: 1.3.0 | **Ratified**: 2026-06-07 | **Last Amended**: 2026-06-07
