---
name: design-system-kethan-dosapati
description: Creates implementation-ready design-system guidance with tokens, component behavior, and accessibility standards. Use when creating or updating UI rules, component specifications, or design-system documentation.
---

<!-- TYPEUI_SH_MANAGED_START -->

# Kethan Dosapati

## Mission
Deliver implementation-ready design-system guidance for Kethan Dosapati that can be applied consistently across marketing site interfaces.

## Brand
- Product/brand: Kethan Dosapati
- URL: https://dkethan.github.io/portfolio/#work
- Audience: developers and technical teams
- Product surface: marketing site

## Style Foundations
- Visual style: structured, accessible, implementation-first
- Main font style: `font.family.primary=JetBrains Mono`, `font.family.stack=JetBrains Mono, ui-monospace, SF Mono, Menlo, monospace, sans-serif`, `font.size.base=16px`, `font.weight.base=400`, `font.lineHeight.base=24.8px`
- Typography scale: `font.size.xs=10px`, `font.size.sm=10.5px`, `font.size.md=11px`, `font.size.lg=13.5px`, `font.size.xl=14.5px`, `font.size.2xl=15px`, `font.size.3xl=16px`, `font.size.4xl=17.17px`
- Color palette: `color.text.primary=#f1efe9`, `color.text.secondary=#8a8884`, `color.border.muted=#ffffff`, `color.text.inverse=#56544f`, `color.surface.base=#000000`, `color.surface.muted=#c8ff3f`, `color.surface.raised=#161616`, `color.surface.strong=#0c0c0c`
- Spacing scale: `space.1=4px`, `space.2=6px`, `space.3=8px`, `space.4=10px`, `space.5=11px`, `space.6=13px`, `space.7=14px`, `space.8=16px`
- Radius/shadow/motion tokens: `radius.xs=4px`, `radius.sm=24px`, `radius.md=999px` | `motion.duration.instant=200ms`, `motion.duration.fast=250ms`, `motion.duration.normal=300ms`, `motion.duration.slow=400ms`, `motion.duration.slower=1000ms`

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone
concise, confident, implementation-focused

## Rules: Do
- Use semantic tokens, not raw hex values in component guidance.
- Every component must define required states: default, hover, focus-visible, active, disabled, loading, error.
- Responsive behavior and edge-case handling should be specified for every component family.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and tokens.
3. Define component anatomy, variants, and interactions.
4. Add accessibility acceptance criteria.
5. Add anti-patterns and migration notes.
6. End with QA checklist.

## Required Output Structure
- Context and goals
- Design tokens and foundations
- Component-level rules (anatomy, variants, states, responsive behavior)
- Accessibility requirements and testable acceptance criteria
- Content and tone standards with examples
- Anti-patterns and prohibited implementations
- QA checklist

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.

## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Prefer system consistency over local visual exceptions.

<!-- TYPEUI_SH_MANAGED_END -->
