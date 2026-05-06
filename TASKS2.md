# AZ-Europa Service V3.0: Enterprise Migration & Scaling Blueprint (10/10 Master Level)

Dieses Dokument ist der ultimative operative Ausführungsplan. Ziel ist die exakte 1:1 Replikation des SEO-Footprints der alten Live-Website (az-europaservice.de), integriert in ein hochperformantes, dynamisches Next.js App-Router-System mit einer UI/UX auf Weltklasse-Niveau. Nichts wird ausgelassen.

## Phase 1: Enterprise Data Modeling (1:1 Abbildung der Live-Seite)
Das Herzstück des Systems. Wir müssen die flache Array-Struktur durch eine relationale Master-Datenbank ersetzen.

- [x] **D1.1 `src/types/index.ts` refaktorisieren:**
  - `MacroService` Interface anlegen (id, title, slug, icon, short_desc, cover_image).
  - `MicroService` Interface anlegen (id, macro_id, title, slug, description, seo_meta, features).
  - `City` Interface erweitern (isPrimaryHub, coordinates, specific_contact).
- [x] **D1.2 `src/data/db.ts` Macro-Services anlegen:**
  - `reinigung` (Reinigung aller Art)
  - `hausmeisterservice` (Hausmeisterservice)
  - `renovierungen` (Renovierungen - Frischer Look)
  - `abbrucharbeiten` (Abbrucharbeiten - Effizient)
  - `gartenpflege` (Gartenpflege - Grünes Paradies)
  - `entruempelung` (Entrümpelung - Befreien Sie sich)
- [x] **D1.3 `src/data/db.ts` Micro-Services anlegen & mappen:**
  - **Unter Reinigung:** `unterhaltsreinigung`, `baureinigung`, `bueroreinigung`, `desinfektionsreinigung`, `fassadenreinigung`, `industriereinigung`, `krankenhausreinigung`, `praxisreinigung`, `treppenhausreinigung`, `glasreinigung`.
  - **Unter Renovierung:** `malerarbeiten`, `bodenverlegung`, `komplettumbau`.
  - **Unter Abbruch:** `rueckbau`, `entsorgung`.
  - **Unter Gartenpflege:** `rasenmaehen`, `heckenschnitt`, `neugestaltung`.
  - **Unter Entrümpelung:** `wohnungsaufloesung`, `kellerentruempelung`.
- [x] **D1.4 `CityMatrix` etablieren:** Logik einbauen, um abzufragen: "Gibt es *Krankenhausreinigung* in *Bamberg*?" -> Gibt `true` oder `false` zurück, um Soft-404s zu vermeiden.

## Phase 2: Zero-Loss SEO Routing & 301 Engine
Wir bauen die URL-Struktur so, dass Google den Wechsel auf das neue System liebt.

- [x] **R2.1 App Router Setup für Hierarchien:**
  - Ordner anlegen: `src/app/[locale]/[city]/[macro]/page.tsx`
  - Ordner anlegen: `src/app/[locale]/[city]/[macro]/[micro]/page.tsx`
- [x] **R2.2 Generierung der statischen Pfade (`generateStaticParams`):**
  - Schleife über `Locales x Cities x Macros x Micros` schreiben (ca. 400+ Routen) für ISR/SSG Performance.
- [x] **R2.3 Hardcoded 301 SEO-Schild in `next.config.ts`:**
  - Redirect `/gebaeudereinigung-erlangen/` -> `/de/erlangen/reinigung`
  - Redirect `/unterhaltsreinigung-erlangen/` -> `/de/erlangen/reinigung/unterhaltsreinigung`
  - Redirect `/hausmeisterservice-nuernberg/` -> `/de/nuernberg/hausmeisterservice`
  - *Alle über 60 URLs der alten Seite müssen hier als permanente 301-Redirects fest verdrahtet werden!*
- [x] **R2.4 Strikte Canonical URL Integration:** In `layout.tsx` sicherstellen, dass jede Permutation exakt auf sich selbst zeigt, um Content-Cannibalization zu verhindern.

## Phase 3: World-Class UI/UX Component Design
Die neuen Services brauchen ein Layout, das nach Enterprise-Level aussieht (wie Stripe oder Vercel).

- [x] **U3.1 Enterprise Mega-Menu (`EnterpriseHeader.tsx`):**
  - Radix-UI (oder Headless UI) Navigation implementieren.
  - Ein Klick auf "Leistungen" öffnet ein Full-Width Dropdown mit 6 Spalten (eine pro Macro-Service) und den Top 3 Micro-Services darunter.
- [x] **U3.2 Dynamic Hero Component (`CinematicHeroParallax.tsx`):**
  - Wenn der User auf `/renovierungen` ist, muss das Parallax-Video/Bild im Hintergrund Handwerker zeigen, nicht Reinigungskräfte. Die Headline muss sich dynamisch anpassen.
- [x] **U3.3 TrueBentoGrid Erweiterung:**
  - Startseite: Das Grid muss von 4 auf 6 große Kacheln erweitert werden, um alle 6 Macro-Services dominant zu präsentieren. Hover-Effekte (Framer Motion) optimieren.
- [x] **U3.4 Dynamic Breadcrumbs (`BreadcrumbSchema.tsx`):**
  - Visuelle und Schema-basierte Breadcrumbs bauen: `Home > [City] > [Macro] > [Micro]`.
- [x] **U3.5 Macro & Micro Landingpage Templates:**
  - Erstellen einer hoch-konvertierenden Seite mit Trust-Badges (TÜV), FAQ-Sektion und regionsspezifischer Karte (`Google Maps API`).

## Phase 4: Schema.org & Local Dominance (Google Green Zone)
Wir diktieren Google, wie die Seite im Local Pack auszusehen hat.

- [x] **S4.1 LocalBusiness Schema:**
  - Pro Stadt-Seite (`/[city]`) ein spezifisches Schema injizieren mit exakten Koordinaten, Öffnungszeiten (Mo-Fr 7-20 Uhr) und Telefonnummern (`09131 6146235` für Erlangen, etc.).
- [x] **S4.2 Service Schema:**
  - Auf jeder Micro-Service-Seite (z.B. Praxisreinigung) das Schema `Service` mit `provider` (AZ-Europa) und `areaServed` (Nürnberg) einbetten.
- [x] **S4.3 Dynamisches FAQ Schema:**
  - Automatisierte Generierung von FAQ JSON-LD basierend auf der geladenen Dienstleistung, um "People Also Ask"-Snippets in Google zu triggern.
- [x] **S4.4 H1-Tag Enforcement:**
  - Jede Unterseite bekommt garantiert ein dynamisches H1, das den Titel der alten Seite exakt matcht (z.B. "Gebäudereinigung in Erlangen").

## Phase 5: The Translation Matrix (6 Sprachen x 40 Services)
Internationale Skalierung ohne Performance-Einbußen.

- [ ] **T5.1 Dictionary Refactoring (`locales/`):**
  - JSON-Struktur erweitern: `services.macro.[id]`, `services.micro.[id]`.
- [ ] **T5.2 Fallback-Algorithmus (`get-dictionary.ts`):**
  - Wenn ein Micro-Service auf Ukrainisch (UK) noch nicht übersetzt ist, darf die Seite nicht crashen, sondern muss elegant auf Deutsch (DE) zurückfallen.
- [ ] **T5.3 LTR/RTL Layout Stress-Test:**
  - Das Mega-Menu und die Breadcrumbs für Arabisch (AR) und Persisch (FA) spiegeln und auf Mobile-Bugs prüfen.

## Phase 6: Smart Quoting & Lead Generation (CRO)
Den Traffic in tatsächliche B2B-Kunden verwandeln.

- [x] **C6.1 SmartLeadForm Erweiterung:**
  - Das Dropdown im Kontaktformular muss die 6 Macro-Services dynamisch aus `db.ts` laden.
  - Wenn der User auf der Seite "Renovierungen Nürnberg" ist, muss das Formular "Nürnberg" und "Renovierung" automatisch vorauswählen.
- [ ] **C6.2 API Payload Tracking (`/api/lead`):**
  - E-Mail-Templates (Resend) anpassen, sodass der Sales-Mitarbeiter sofort sieht: `[LEAD: NÜRNBERG | KATEGORIE: RENOVIERUNG]`.
- [x] **C6.3 Trust-Bar Injection:**
  - Neben dem Formular Logos für "24h Service", "Geprüfter Meisterbetrieb" und "TÜV" (wie auf der Live-Seite) platzieren, um das Vertrauen zu maximieren.

## Phase 7: Deployment, QA & Management Sign-Off
Der Abschluss nach Enterprise-Standard.

- [ ] **Q7.1 Lighthouse CLI CI/CD Pipeline:**
  - Sicherstellen, dass die massiven neuen DOM-Elemente (Mega-Menu) nicht den LCP (Largest Contentful Paint) über 1.0s drücken.
- [ ] **Q7.2 Pre-Launch Crawl (Screaming Frog):**
  - Lokaler Crawl der neuen Build-Version. Ziel: 0 Broken Links, 0 Orphan Pages, 100% korrekte Canonicals.
- [ ] **Q7.3 GSC (Google Search Console) Handover:**
  - Bereitstellung der dynamischen `sitemap.ts` mit allen >400 URLs und Einreichung der Change-of-Address (falls Domain-Wechsel) bzw. Re-Indexierung anstoßen.
- [ ] **Q7.4 Microsoft Clarity Heatmapping:**
  - Tracker-Einbau, um in den ersten 14 Tagen das Userverhalten auf dem neuen Mega-Menu zu messen.
