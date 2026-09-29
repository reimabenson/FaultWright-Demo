# FaultWright Demo

A standalone public presentation of FaultFoundry Demo V0: one frozen
software task, two deterministic reference controls, and the canonical
outcomes produced by the FaultFoundry evaluation engine.

The site is presentation-only. It does not execute tasks, call model
providers, or calculate verification results. Every identity and outcome
on the page is read from `public/demo/demo-v0.json`.

## Local development

```bash
npm install
npm run dev
```

## Checks

```bash
npm run lint
npm run typecheck
npm run verify:artifact   # digest of public/demo/demo-v0.json vs. the freeze manifest
npm run build             # runs verify:artifact first (prebuild), then next build
npm audit
```

## Routes

- `/` — the technical demo: a rigorous presentation of the frozen
  evaluation record with a full evidence ledger and artifact integrity.
- `/partner` — a brief for a prospective commercial collaborator. Same
  visual system, warmer and less dense. Its copy lives in
  `lib/partner.ts` and never touches the evaluation artifact.

Both routes are prerendered as static content.

## Architecture

- `app/` — root layout (fonts, metadata, Open Graph / Twitter, viewport),
  the two pages, `icon.svg`, and code-generated `opengraph-image` /
  `twitter-image` routes for each page.
- `lib/demo.ts` — types for the artifact and freeze manifest, plus a
  structural validator. The JSON is imported statically; malformed or
  inconsistent data throws at build time instead of rendering a wrong page.
- `lib/presentation.ts` — display copy for the demo that cannot be derived
  from the artifact (what each control is for, the result a working
  pipeline must produce for it, plain-English framing of the task). Keyed
  by the artifact's own identifiers so a swapped artifact fails loudly.
- `lib/partner.ts` — editorial content for `/partner`.
- `lib/site.ts` — site identity, per-page header/footer navigation, and
  the configurable contact destination.
- `lib/integrity.ts` — server-only, build-time hashing of the bytes that
  `public/` actually serves, compared against the manifest (see below).
- `lib/og.tsx` — shared Open Graph image renderer using the fonts bundled
  in `assets/fonts` (no network access during the build).
- `components/ui/` — small primitives: layout, headings, identifiers with
  copy buttons, status badges, ledger rows. `copy-button.tsx` is the only
  client component.
- `components/layout/` — the site header and footer, shared by both routes
  and configured per page through a `variant` prop.
- `components/demo/` — the demo sections, in reading order: hero and
  record card, evaluation flow, frozen challenge, control comparison and
  consistency check, evidence ledger, artifact integrity, scope.
- `components/partner/` — the partner-brief sections.
- `app/globals.css` — Tailwind v4 with the default palette disabled and a
  small named token set (`bg`, `surface`, `ink`, `muted`, `line`, `accent`,
  `success`, `failure`, radii, shadows, type scale).

## Public-data boundary

Only `public/demo/demo-v0.json` and `public/demo/demo-v0-freeze.json`
were copied from the engine. No Python backend, Docker environment,
hidden verifier, oracle body, private task material, credentials, or
internal artifact tree belongs in this repository.

## Artifact integrity

`demo-v0-freeze.json` records the SHA-256 of `demo-v0.json`. For that
digest to be checkable by anyone, the bytes of the record must be identical
on every operating system and on the deployment host.

- **Canonical bytes are UTF-8 with LF newlines.** `.gitattributes` forces
  `eol=lf` for the repository and specifically for `public/demo/*.json`, so
  a checkout on Windows with `core.autocrlf=true` produces the same bytes as
  a checkout on Linux. The committed blob is the source of truth.
- **The manifest was regenerated from those canonical bytes.** An earlier
  manifest carried a digest computed over a CRLF working copy; fresh clones
  and Linux deployments served LF bytes with a different digest. The
  current `demo_json_sha256`, `demo_json_bytes`, and `demo_json_newline`
  describe the committed file exactly. The evaluation record itself was
  not changed.
- **Three timestamps are kept apart.** A manifest correction must never
  read as a re-run of the evaluation, so the manifest records:
  - `artifact_created_at` — when the evaluation record was exported. It
    must equal `created_at` inside `demo-v0.json`; both the verify script
    and the page's validator enforce this.
  - `manifest_generated_at` — when the engine generated the manifest.
  - `manifest_corrected_at` — when the repository-side digest correction
    was applied, together with a `correction` object that states the
    reason and the superseded digest. The value is the write time of the
    canonical LF `demo-v0.json` (`2026-09-28T17:31:52.881439Z`), as
    recorded by both the filesystem and the git index; the corrected
    manifest was written in the same run.
  The former ambiguous `generated_at` field was replaced by the two
  explicit manifest fields.
- **Every production build verifies it.** `npm run build` runs
  `scripts/verify-artifact.mjs` first and aborts on any mismatch. The page
  also hashes the served file during prerendering (`lib/integrity.ts`) and
  fails the build if the digest disagrees with the manifest, so the digest
  shown on the page is always the digest of the file a visitor can download.

To verify independently, download `/demo/demo-v0.json` from the deployed
site and hash it:

```bash
shasum -a 256 demo-v0.json                       # macOS / Linux
Get-FileHash -Algorithm SHA256 demo-v0.json      # Windows PowerShell
```

The result must equal `demo_json_sha256` in `/demo/demo-v0-freeze.json`.

If the record is ever re-exported, save it with LF newlines, run
`npm run verify:artifact` to print the new digest and size, and update
`demo_json_sha256`, `demo_json_bytes`, `artifact_created_at` and
`manifest_generated_at` in the manifest accordingly.

## Social preview images

`app/opengraph-image.tsx` and `app/partner/opengraph-image.tsx` render the
Open Graph / Twitter previews at build time through `lib/og.tsx`. The fonts
they use are static, OFL-licensed cuts of Geist and Geist Mono committed in
`assets/fonts/` (see the README there), so the image build is deterministic
and does not fetch anything from the network.

## Deployment

Import this repository into Vercel as a Next.js project with `./` as the
Root Directory. The framework-default build command is sufficient; the
`prebuild` integrity check runs automatically.

### Environment variables

All variables are optional; `.env.example` lists them. Because both pages
are prerendered, a changed value takes effect on the next build/deploy.

- `NEXT_PUBLIC_CONTACT_URL` — destination of the "start a conversation"
  call to action on `/partner`. Accepted values: an `https://` or `http://`
  URL (scheduling page, form) or a `mailto:` address. The value is validated
  at build time and an invalid value fails the build. When it is unset the
  button is labelled "Reach out via GitHub" and points at the public
  repository, so the page never ships a broken or invented contact. No
  address is hardcoded anywhere in the component tree.
- `NEXT_PUBLIC_SITE_URL` — base for canonical and Open Graph URLs. Falls
  back to Vercel's `VERCEL_PROJECT_PRODUCTION_URL`, then
  `http://localhost:3000`. Set it only when deploying somewhere other than
  Vercel.

### Setting the contact destination on Vercel

1. Open the project in the Vercel dashboard → **Settings** →
   **Environment Variables**.
2. Add `NEXT_PUBLIC_CONTACT_URL` with the real destination, for example
   `mailto:you@example.com` or `https://cal.example.com/faultwright`.
   Select the **Production** environment (and **Preview** if preview
   deployments should show it too).
3. Trigger a redeploy (**Deployments** → latest → **Redeploy**, or push a
   commit). The `/partner` CTA switches to "Start a conversation" and links
   to the configured destination; `https`/`http` links open in a new tab
   with `rel="noopener noreferrer"`.

No code change is required to supply or rotate the destination.
