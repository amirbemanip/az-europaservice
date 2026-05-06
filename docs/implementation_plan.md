# Management-Statusbericht: SEO-Migration & Technische Konsolidierung

**Datum:** 05. Mai 2026
**Erstellt von:** Amir Bemani (Digital Operations & SEO)
**Thema:** Bestandsaufnahme der Live-Website und sichere SEO-Migration auf das neue System

## 1. Executive Summary

Der heutige Schwerpunkt lag auf der systematischen und detaillierten Analyse der aktuellen Live-Website (az-europaservice.de). Das primäre Ziel ist es, bei dem bevorstehenden Wechsel auf das neue System keinerlei Sichtbarkeit bei Google einzubüßen (Zero-SEO-Loss). 

Die bestehende Struktur weist gute Ansätze in der lokalen Suchmaschinenoptimierung auf (starke Ausrichtung auf Erlangen und Nürnberg mit spezifischen Unterseiten wie "Gebäudereinigung Erlangen"). Das neue System wird diese exakten inhaltlichen Themen und URLs übernehmen, jedoch die zugrundeliegende Performance, das UI/UX-Design und die Conversion-Rate signifikant verbessern. 

Das Vorgehen ist stark priorisiert: Wir stabilisieren zuerst die technische Basis und übernehmen die bestehenden SEO-Werte 1:1, bevor wir in weiteren Phasen skalieren (z. B. Bamberg als neuen Hub ausbauen oder komplexere Automatisierungen einführen).

## 2. Status-Tabelle

| Bereich | Heute abgeschlossen | Aktuell in Bearbeitung | Nächste Schritte |
| :--- | :--- | :--- | :--- |
| **Zugänge & Systemumgebung** | Lokales System & Codebase vollständig aufgesetzt und synchronisiert. | - | - |
| **Technische Bestandsaufnahme** | Vollständiger Crawl der Live-Website (Struktur, URLs, Meta-Tags gesichert). | Abgleich der alten URL-Pfade mit dem neuen Routing. | - |
| **SEO-Basis (Meta & Titles)** | Identifikation der aktuellen Title-Tags (z.B. *Gebäudereinigung in Erlangen \| AZ - Europa Service GmbH*). | Mapping der Titelstrukturen auf die neue Next.js-Architektur. | Dynamische Generierung exakter Meta-Titles im neuen Code. |
| **Lokale Seitenstruktur** | Sicherung aller Landingpages für Erlangen und Nürnberg. | Integration der "Triple-Hub"-Struktur (Erlangen, Nürnberg, Bamberg). | Aufbau der lokalen Pillar-Pages im neuen Design. |
| **Dokumentation / Planung** | Strategischer Report und Vorgehensmodell erstellt. | - | Freigabe durch das Management einholen. |

## 3. Findings: Analyse der Live-Website

Im aktuellen System wurden die folgenden strukturellen Eigenschaften festgestellt, die wir strategisch in das neue System übernehmen und verbessern werden:

1. **Starke lokale URL-Struktur:** Die Live-Seite nutzt spezifische URLs wie `/gebaeudereinigung-erlangen/` oder `/hausmeisterservice-nuernberg/`. **Entscheidung:** Diese URLs müssen im neuen System als exakte Routen (oder via sauberen 301-Redirects) beibehalten werden, um laufenden Traffic nicht zu unterbrechen.
2. **Title Tags und Meta Descriptions:** Die aktuellen Titel (z.B. *Reinigungen aller Art in Erlangen & Nürnberg \| AZ - Europa Service*) sind funktional, aber können durch dynamische Generierung im neuen Next.js-System effizienter skaliert und besser auf die Suchintention der Nutzer abgestimmt werden.
3. **Technische Performance & UX:** Die aktuelle Seite hat im Bereich der Ladezeiten (insbesondere Mobile) deutliches Verbesserungspotenzial. Im neuen System wird durch moderne Bildformate (AVIF/WebP) und Lazy-Loading eine deutlich bessere Core-Web-Vitals-Bewertung erreicht. Dies zahlt direkt auf das Google-Ranking ein.

## 4. Nächste 14 Tage (Fokus-Aufgaben)

1. **SEO-Matching abschließen:** Die Meta-Titles und Descriptions aus der Live-Version exakt in die Sprach-Dateien (`locales/*.json`) und die dynamische Generierung in `layout.tsx` / `page.tsx` der neuen Seite übertragen.
2. **Technisches Deployment vorbereiten:** Die neue Seite auf einer Staging-Umgebung bereitstellen, um die UI/UX unter realen Bedingungen zu testen.
3. **LocalBusiness Schema finalisieren:** Die strukturierten Daten (JSON-LD) für Erlangen, Nürnberg und neu Bamberg einbetten, um die lokale Präsenz (Google My Business Integration) zu stärken.

## 5. User Review Required (Feedback-Anfrage)

> [!IMPORTANT]
> **Management-Freigabe:** 
> Bitte bestätigen Sie dieses Vorgehen. Das primäre Ziel bleibt die *Sicherung der bestehenden SEO-Werte* bei gleichzeitiger massiver Aufwertung von Performance und Design. Sobald dieses Fundament steht, werden wir uns auf Lead-Generierung (Smart Quoting) und Automatisierung fokussieren.
