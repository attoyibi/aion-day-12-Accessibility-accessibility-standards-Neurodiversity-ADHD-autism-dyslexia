# AION Day 12 — Accessibility Playground

A single-page interactive playground for the AION Day 12 accessibility module:
a warm-up, a learning hub and a reference, plus the assessment cases for
Tasks 1–4.

Next.js + TypeScript + Tailwind. No backend, no accounts, no external API
calls — progress lives in `localStorage` and the whole thing exports to static
files.

---

## The category taxonomy

The app grades and tags everything with the **curriculum's** categories, because
that is what the worksheets use:

| Category           | German            | Used in                    |
| ------------------ | ----------------- | -------------------------- |
| Perceivability     | Wahrnehmbarkeit   | always                     |
| Operability        | Bedienbarkeit     | always                     |
| Understandability  | Verständlichkeit  | always                     |
| Error tolerance    | Fehlertoleranz    | always                     |
| **Participation**  | Teilhabe          | 5th slot, portal-usage tasks (Task 1) |
| **Consistency**    | Konsistenz        | 5th slot, structure tasks (Task 3)    |

WCAG's POUR model appears in exactly one place — a reference note in Learn
Level 1 — so learners know the industry term but always practise and get graded
on the categories above. The single source of truth is
[`lib/categories.ts`](lib/categories.ts); nothing should hard-code a category
label anywhere else.

## The six tabs

| Tab                    | What it is                                             | Reveals |
| ---------------------- | ------------------------------------------------------ | ------- |
| 📖 Learn               | All curriculum material, 3 accordion levels, 13 inline interactive widgets | no |
| 🎯 Training Ground     | Gamified "Spot the Barrier" hunt on a practice page     | **yes** |
| 🏛 PublicAccess        | Assessment case — Task 1 (mock civic portal, 2 pages)  | no      |
| 🎓 LearnAccess         | Assessment case — Task 2 (variants A/B/C)              | no      |
| 🏢 CitizenConnect      | Case study — Task 3 (placeholder slot)                 | no      |
| 🗺 Task Map            | Reference card mapping tasks → tabs → levels           | no      |

A collapsible side panel on the right shows the current tab's relevant Learn
bullets and a "This supports → Task X" badge.

## Rules the code enforces

These are load-bearing. Breaking them breaks the assessment:

1. **Reveals exist only in Training Ground.** No hints, answer keys, tooltips or
   annotations in PublicAccess, LearnAccess or CitizenConnect.
2. **Training Ground never leaks the graded cases.** Its practice page is a
   fictional sports club with its own elements. Learn's widgets teach concepts
   generically. Neither may mirror a planted barrier from an assessment case.
3. **PublicAccess is frozen.** Identical for every learner on every load — no
   randomness, no variation. Its planted barriers are documented in a comment at
   the top of `components/cases/PublicAccess.tsx` and are the exact set the
   curriculum specifies.
4. **LearnAccess marks no "best" variant.** Each of A/B/C is a real trade-off
   with a real cost.
5. **Curriculum content is the source of truth.** Don't invent extra barriers or
   swap the cases.

## Plugging in the CitizenConnect artifact

The CitizenConnect tab is a clearly-marked placeholder. Three ways to fill it:

- paste the artifact's URL into the field on the tab (stored in `localStorage`,
  no rebuild needed);
- set `CITIZEN_CONNECT_URL` in `components/cases/CitizenConnect.tsx`; or
- replace `<CitizenConnectSlot />` with the artifact's own component.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export into ./out
npm run typecheck
```

## Deploying

The build is a static export (`output: 'export'`), so it deploys anywhere. The
build command is always `npm run build` and the output directory is always
`out/` — there is no `public/` directory and no server runtime.

- **Netlify** — `netlify.toml`: build `npm run build`, publish `out`.
- **Vercel** — `vercel.json` pins the same thing. It declares no framework
  preset on purpose, so the deploy is a plain static upload of `out/` and
  behaves identically to Netlify. Without it, a project whose framework preset
  is "Other" looks for `public/` and fails with *"No Output Directory named
  public found"*. If you'd rather use Vercel's Next.js preset instead, delete
  `vercel.json` and set the framework to Next.js in Project Settings — the
  Next builder understands `output: 'export'` on its own.
- **Anything else** — serve the `out/` directory.

## Project layout

```
app/                       shell, global styles, favicon
components/
  Header / Footer / SidePanel   branded chrome
  learn/                   Learn tab + 13 inline widgets
  training/                Spot the Barrier hunt, reveal card, spot data
  cases/                   PublicAccess, LearnAccess, CitizenConnect
  TaskMap.tsx              reference table
  ui/                      chip, widget card, segmented control
lib/
  categories.ts            THE taxonomy — single source of truth
  tabs.ts                  tab defs + side-panel content
  storage.ts               localStorage helpers
```
