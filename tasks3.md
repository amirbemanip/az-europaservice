# Phase 3: SEO Optimization & Content Expansion (Critical Stage)

This phase is critical for the website's success. Currently, many pages lack sufficient content for high SEO ranking, and micro-service pages are using generic placeholders. Our goal is to achieve 10/10 content quality and technical SEO excellence.

## 1. Translation Matrix Infrastructure (Technical Foundation)
- [ ] **Define Types**: Update `src/types/index.ts` with `MatrixContent` structures.
- [ ] **Create Matrix Utility**: Implement `src/lib/matrix.ts` for centralized content retrieval.
- [ ] **Refactor Macro Pages**: Update `src/app/[locale]/[city]/[macro]/page.tsx` to use the utility.
- [ ] **Enable Micro Pages**: Connect `src/app/[locale]/[city]/[macro]/[micro]/page.tsx` to the Translation Matrix.

## 2. Content Expansion (SEO & Value)
- [ ] **Content Gap Audit**: Identify pages with less than 300 words of unique content.
- [ ] **Micro-Service Deep Dive**:
    - [ ] Create specific content for **Baureinigung** (Post-construction) for each city.
    - [ ] Create specific content for **Praxisreinigung** (Medical) for each city.
    - [ ] Create specific content for **Glasreinigung** (Glass/Window).
    - [ ] Create specific content for **Treppenhausreinigung** (Stairwell).
- [ ] **Localized USPs**: Research and add city-specific references (e.g., Medical Valley in Erlangen, Messe in Nürnberg, Altstadt in Bamberg) to the matrix.

## 3. SEO & Technical Excellence
- [ ] **Localized Meta Data**: Ensure every (City + Service) combination has a unique, high-impact meta title and description.
- [ ] **Internal Linking**: Implement a "Related Services" or "Service Breadcrumbs" strategy to improve crawlability.
- [ ] **Schema.org Enhancements**: Verify `LocalBusiness` and `Service` schemas are correctly populated with city-specific data.

## 4. Multi-Language Quality Assurance
- [ ] **EN Matrix Population**: Fill the empty English matrix in `en.json`.
- [ ] **RTL UI Audit**: Check Persian and Arabic layouts for any overflow or alignment issues caused by longer localized strings.
- [ ] **Cultural Nuance**: Review Russian and Ukrainian content for professional tone consistency.

---
**Status**: Initializing Infrastructure
**Priority**: High (Critical for Production Build)
