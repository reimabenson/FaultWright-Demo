# Bundled fonts

Static cuts of Geist and Geist Mono used to render the Open Graph / Twitter
preview images at build time (`app/opengraph-image.tsx`,
`app/partner/opengraph-image.tsx` via `lib/og.tsx`). Bundling them keeps the
image build deterministic: no font is fetched from the network during
`next build`.

Source: https://github.com/vercel/geist-font, release v1.7.2, `ttf/` folder.
License: SIL Open Font License 1.1 — see `OFL.txt` in this directory.

| File                    | Family     | Weight |
| ----------------------- | ---------- | ------ |
| `Geist-Medium.ttf`      | Geist      | 500    |
| `Geist-SemiBold.ttf`    | Geist      | 600    |
| `GeistMono-Medium.ttf`  | Geist Mono | 500    |

The page itself continues to load Geist through `next/font/google`, which
self-hosts the web fonts at build time as before.
