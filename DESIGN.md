# DESIGN.md: shubhamsinha1010.github.io (v2)

> **Current theme (supersedes the "Replicated" visual system below).** Teal and coral: dark teal
> field `#0E2A2E`, teal panels `#174148`, coral `#FF6B5B` (dark teal text on coral, never white),
> warm sand `#FBF1EA`; Nunito 900 headings; coral heroes with angled
> edges, tilted cards, rounded buttons that hop on hover, and a compact footer with no wordmark. The CDC
> metaphor (record rails, offsets, sync-lag readout, loader, binlog) is retired. The brief, content
> rules and data sections below still apply.

## Phase 0: Brief

- **Subject:** Shubham Sinha, Python backend and AI engineer, 5+ years. Numerator (Jan 2024 to now,
  remote), Inexture Solutions (Dec 2020 to Dec 2023, Ahmedabad). B.Tech IT, Dharmsinh Desai University.
- **Audience:** recruiters, hiring managers and senior engineers screening for backend / AI roles.
- **Job of the site:** get him hired. In 3 seconds: who he is, what he builds, where the work is.
  In 3 minutes: proof (case studies with real numbers), then an easy way to email him.
- **Assets:** portrait (`/assets/img/shubham.webp`), a 90-second intro video, three real
  PulseSearch screenshots, five written case studies, the resume PDF. All real, nothing invented.
- **Constraints:** static hosting on GitHub Pages, keep the existing case-study URLs
  (`/work/<slug>.html`) and the resume URL alive, no fake metrics. The live site must not change
  until the owner deploys.
- **Assumptions:** none invented. Every number on the site comes from the previous site or the
  resume. No placeholders.

## Phase 1: Concept

Three concepts from different territories:

| | A. Replicated (material of the work) | B. Ranked (formal system) | C. Stepwell (place) |
|---|---|---|---|
| Idea | The site is a change stream: his career is a binlog, and scrolling replays it, every section committing from source to index | The whole site is a search results page for one query; each section is a hit with BM25 and kNN rank provenance | Ahmedabad's stepwells: the page descends level by level, one layer of the stack per level |
| Anchor | His defining work is CDC: an overnight (~12 h) reindex replaced by sync under 60 s; PulseSearch measured at 1.1 s p50 | He builds hybrid search with RRF fusion | He studied and worked in Gujarat |
| Layout | Log-structured: every section opens with a record header (offset, op, key) on column 1, payload from column 4 | One result column, ranks in a gutter | Stacked terraces, inset per level |
| Motion verb | stream in, then commit | rerank | descend |
| Signature | The name replicates out of order and settles without ever regressing; a sync-lag readout that started the visit at 12 hours | Results reorder as the query types | Parallax terraces |
| O / F / Fe / P | 4 / 5 / 4 / 2 | 3 / 4 / 5 / 3 | 4 / 2 / 3 / 2 |

**Pick A.** It is built on the one fact that is most his (he literally replaced overnight
reindexes with sub-minute replication), it produces decisions for every layer of the site, and it
is cheap to build well in DOM and type with no WebGL. Stolen from B for the 404 only: a search
that returns zero hits, with a suggestion.

### Concept card

```
Idea:        Shubham's career as a change stream: scroll replays the log, and every section
             commits from source to index in under a second.
Metaphor:    Change data capture: binlog records, offsets, commits, replication lag.
Signature:   (1) Loader: sync lag counts down from an overnight reindex (12:00:00) to under a
             second, then the readout lives on in the corner for the whole visit, rising with
             scroll speed and settling back, like a consumer catching up.
             (2) Hero: the name's letters arrive out of order, compressed like serialized
             payloads, and expand into place: version-guarded, it never regresses.
Emotion:     Calm precision. Fast, but nothing is out of place.
Motion verb: Stream in, then commit. Things travel compressed and fast along one axis, then lock
             and expand to their full width. Nothing bounces.
Screenshot:  The hero: SHUBHAM SINHA set wide across the page, a live event log streaming beside
             it, and "sync lag 0.9 s" in the corner.
```

## Phase 2: Art direction system

### Palette (from a server room, not a code editor)

The previous site was near-black with an acid-green accent, which is AI default #2. This one is
light: the grey of a rack label and powder-coated steel, black ink, one signal blue that only
marks commits (focus, the lag readout, the active record).

| Role | Hex | Use |
|---|---|---|
| ground | `#E4E5E0` | page |
| ink | `#111214` | text, rules at full strength, the contact field |
| muted | `#55584F` | secondary text (AA 5.6:1 on ground) |
| line | `rgb(17 18 20 / 0.16)` | record separators only |
| accent ("commit") | `#2B36F5` | commits, focus ring, readout, current nav. 6.3:1 on ground |
| curtain | `#111214` | page transition strips, loader, contact finale |

### Type

- **Archivo** (Google, variable `wdth` 62 to 125, `wght` 100 to 900) for display and text.
  The width axis IS the motion verb: payloads arrive condensed (`wdth` 62) and commit expanded.
  Display: weight 760, `wdth` 125, tracking -0.035em, leading 0.84. Text: weight 400, `wdth` 100.
- **JetBrains Mono** 400 to 600 only for event data: log lines, offsets, the lag readout, record
  headers. Not for every label.
- Scale: `--t-mega clamp(4.2rem, 0.6rem + 15.6vw, 17rem)` down to `--t-xs 0.75rem`.

### Grid and rhythm

- 12 columns, fluid gutter. Three hang lines: column 1 (record header), column 4 (payload),
  column 9 (meta). Every section's text starts on one of them.
- Rhythm moods: tight (8u) for the numbers, normal (16u) for work, airy (28u) around the
  statement, full viewport for hero and finale.
- **Shape:** radius 0 everywhere. Buttons are bars that fill like a commit.

### Motion language

- Eases from the engine: `expo.out` for arrivals, `expo.inOut` for curtains.
- Commit: `x` from -3%, `wdth` 62 to 100 (125 for display), 1.1 s; record rule scaleX 0 to 1.
- Page transition: six log-line strips stream in from the left, staggered 40 ms, carrying the
  next path as a create event (`c  /work/pulsesearch`), then stream out to the right. 0.7 s each way.
- Hovers, one treatment per role:
  - Primary buttons: the bar fills left to right (a progress bar committing), label inverts,
    arrow travels.
  - Work rows: the row advances one step (offset moves right), title widens on the `wdth`
    axis, a preview of the project's pipeline follows the pointer.
  - Nav: underline draws from the left in the commit colour; the current page keeps it.
  - Inline links: underline at rest that rises into a band.
  - Utility links (socials, footer): colour only.
- **Idle:** the hero event log keeps streaming (producer writes) and the lag readout breathes
  between 0.8 and 1.2 s. Both stop off screen and under reduced motion.
- No WebGL. The concept is typographic and data-driven; GL would add weight and nothing true.

### Composition plan (each section a different family)

```
HERO (poster + live log)               STATEMENT (8 of 12 cols)
+--------------------------------+     +--------------------------------+
|SS                Work Exp About|     |0001  c about                   |
|                                |     |      Overnight reindexes became|
|SHUBHAM               c work .. |     |      sub-minute sync. ...      |
|SINHA                 u bi  ..  |     |                                |
|Python backend & AI   c ...     |     +--------------------------------+
|Remote, India     sync lag 0.9s |
+--------------------------------+
NUMBERS (data)                         WORK (index list + pointer preview)
+--------------------------------+     +--------------------------------+
|50%    <60 s   19M+   +23%  40% |     |0003 Incident Commander  agents |
|label  label   label  label lbl |     |0004 PulseSearch      [preview] |
+--------------------------------+     |0005 CricLot              ...   |
                                       +--------------------------------+
EXPERIENCE (sticky narrative)          ABOUT (asymmetric pair)
+--------------------------------+     +--------------------------------+
|Numerator   | record             |     |[ intro video 7 cols ] bio 4c  |
|2024 to now | record             |     |portrait     schema of skills  |
|(sticky)    | record             |     +--------------------------------+
+--------------------------------+
FINALE (ink field)
+--------------------------------+
|EMAIL ME (mega, expands)        |
|address [copy]   links  colophon|
+--------------------------------+
```

### Genericness test

- "A dark dev portfolio with a lime accent and particle hero" is what a generic model lands on
  (and what the old site was). Changed to a light rack-grey ground with one signal blue.
- "Mono font on every label" is a tell: mono is restricted to real event data.
- "Fade-up on every section" replaced by the commit reveal that is specific to this concept.
- "Three project cards" replaced by a log-like index whose rows are records.
- Numbered sections are not decoration here: they are stream offsets and they increase in order.

## Decisions log

- Stack: **Astro** (static output for GitHub Pages, ClientRouter for real page transitions,
  about 75 KB of JS). URLs are kept (`build.format: 'file'` gives `/work/<slug>.html`).
- Deploy will need GitHub Pages "Source: GitHub Actions" (workflow in `.github/workflows/`).
