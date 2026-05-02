---
name: AZ-Europa Master-Class
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45464d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fed01b'
  on-secondary-container: '#6f5900'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#271901'
  on-tertiary-container: '#98805d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#ffe083'
  secondary-fixed-dim: '#eec200'
  on-secondary-fixed: '#231b00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#fcdeb5'
  tertiary-fixed-dim: '#dec29a'
  on-tertiary-fixed: '#271901'
  on-tertiary-fixed-variant: '#574425'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h1:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.015em
  h2:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: '0'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 32px
  margin-page: 64px
  section-gap: 128px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
---

## Brand & Style

This design system is engineered to project **absolute corporate authority** and **surgical precision**. It targets high-net-worth property owners and enterprise-level facility managers who value German engineering, reliability, and "medical-grade" cleanliness.

The aesthetic follows a **High-Trust Minimalism** approach. It avoids decorative fluff in favor of structural integrity and immense whitespace, creating a "breathable" interface that feels expensive and organized. The style is strictly professional, utilizing a sterile color palette punctuated by high-contrast functional accents.

- **Primary Motif:** Institutional clarity and structured hierarchy.
- **Visual Tone:** Sterile, calm, precise, and unshakeable.
- **Movement:** Stately and deliberate; transitions should be subtle fades or swift, linear translations.

## Colors

The color strategy relies on a high-contrast ratio between "Pure White" and "Deep Navy Blue" to establish an enterprise feel.

- **Foundations:** Use `#FFFFFF` for the main canvas to simulate a sterile environment. `#F8FAFC` (Cold Gray) is reserved for structural sectioning or background offsets to maintain depth without adding visual noise.
- **Typography:** `#0F172A` is used for all authoritative headings. `#334155` provides a softer but legible contrast for long-form body text.
- **Accents:** `#FACC15` (Premium Yellow) is the sole functional color. It is used exclusively for primary Calls to Action (CTAs), checkmarks, and status indicators. This ensures that the most important interactive elements are immediately visible against the monochrome base.

## Typography

This design system utilizes **Inter** for its utilitarian, systematic precision. The typography is the primary vehicle for "Corporate Authority."

- **Authoritative Headings:** Large-scale headings use tight letter-spacing and bold weights to command attention.
- **Body Text:** Generous line-heights (1.6) ensure readability and reinforce the "breathable" atmosphere.
- **Labels:** Small caps with increased tracking are used for metadata and category labels to create an institutional, organized look.
- **Hierarchy:** Use extreme scale differences between headlines and body text to create a clear informational path.

## Layout & Spacing

The layout is governed by a **Fixed Grid** philosophy to ensure consistency across enterprise deployments.

- **Rhythm:** A strict 8px base unit drives all padding and margins.
- **Whitespace:** Emphasize "Maximum Whitespace." Section gaps should be aggressive (128px+) to prevent the interface from feeling cluttered or "cheap."
- **Grid:** A 12-column system with wide 32px gutters. Elements should align strictly to the grid edges to maintain a sense of engineered order.
- **Safe Areas:** Maintain a minimum 64px page margin on all desktop views to ensure content feels centered and curated.

## Elevation & Depth

To maintain the "Ultra-Clean" aesthetic, this design system avoids heavy shadows and skeuomorphism.

- **Tonal Layers:** Depth is created by placing white components on cold gray (`#F8FAFC`) backgrounds.
- **Low-Contrast Outlines:** Use 1px borders in `#E2E8F0` for cards and input fields. This creates structure without the "weight" of a shadow.
- **Zero-Shadow Policy:** Shadows are prohibited except for one specific use case: a very soft, high-blur ambient shadow (`0 10px 30px rgba(15, 23, 42, 0.05)`) used only on active modal windows to separate them from the background.

## Shapes

The shape language is "Soft" but disciplined. A 0.25rem (4px) base radius is used to take the "edge" off the corporate atmosphere without making it feel playful or "bubbly."

- **Components:** Buttons and input fields use the base 4px radius.
- **Large Elements:** Cards and containers may use `rounded-lg` (8px) for a slightly more modern feel, but never exceed this.
- **Strictness:** Maintain right angles for the majority of the layout containers to preserve the architectural feel of the company.

## Components

- **Buttons:** Primary CTAs must be Premium Yellow (`#FACC15`) with Deep Navy Blue text. Secondary buttons should be transparent with a navy border. Padding must be generous (e.g., 16px vertical, 32px horizontal).
- **Input Fields:** Use a white background with a subtle gray border. Focus states use a 2px navy blue bottom border rather than a full glow.
- **Checkboxes:** These must use the Premium Yellow color for the checked state to signify "Service Completed" or "Verified."
- **Cards:** Minimalist white containers with a 1px border. No shadows. Use "Label-Caps" for card subtitles.
- **Lists:** High-density, separated by hairline borders (`#E2E8F0`). Icons should be monochromatic (Slate) and use thin 1.5pt strokes.
- **Status Badges:** Use "pill" shapes but keep colors muted (e.g., light gray background) unless they indicate a critical alert.
- **Additional Suggestion:** **Property Status Dashboard** – A modular component displaying real-time facility metrics using thin-line sparklines and bold numerical displays.