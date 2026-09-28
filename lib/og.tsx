import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { ReactNode } from "react";

import { site } from "@/lib/site";

/*
 * Shared Open Graph / Twitter image renderer.
 *
 * Fonts are read from `assets/fonts` (committed, OFL-licensed static cuts of
 * Geist and Geist Mono), so image generation never touches the network and
 * produces the same bytes on every build machine. A missing font file is a
 * repository error and fails the build with a clear message.
 */

const ogSize = { width: 1200, height: 630 } as const;

const ogColors = {
  bg: "#f7f7f5",
  surface: "#ffffff",
  ink: "#17191c",
  ink2: "#3a3f45",
  muted: "#5d646b",
  faint: "#6f767d",
  line: "#e2e4e6",
  accent: "#0f5b73",
  accentSoft: "#e6f0f4",
  success: "#157347",
  successSoft: "#e8f5ed",
  successLine: "#b7dcc5",
  failure: "#b3261e",
  failureSoft: "#fbeceb",
  failureLine: "#f0c2bd",
} as const;

const ogFontFamily = {
  sans: "Geist",
  mono: "Geist Mono",
} as const;

type FontSpec = { file: string; name: string; weight: 500 | 600 };

const FONT_DIR = join(process.cwd(), "assets", "fonts");

const fontSpecs: FontSpec[] = [
  { file: "Geist-Medium.ttf", name: ogFontFamily.sans, weight: 500 },
  { file: "Geist-SemiBold.ttf", name: ogFontFamily.sans, weight: 600 },
  { file: "GeistMono-Medium.ttf", name: ogFontFamily.mono, weight: 500 },
];

type LoadedFont = { name: string; data: Buffer; weight: 500 | 600; style: "normal" };

let fontsPromise: Promise<LoadedFont[]> | undefined;

function loadFonts(): Promise<LoadedFont[]> {
  fontsPromise ??= Promise.all(
    fontSpecs.map(async (spec) => {
      const path = join(FONT_DIR, spec.file);
      try {
        const data = await readFile(path);
        return { name: spec.name, data, weight: spec.weight, style: "normal" as const };
      } catch (cause) {
        throw new Error(
          `Open Graph font "${spec.file}" could not be read from ${FONT_DIR}. The bundled fonts in assets/fonts are required to build the social preview images.`,
          { cause },
        );
      }
    }),
  );
  return fontsPromise;
}

type ChipTone = "success" | "failure" | "neutral" | "accent";

const chipStyles: Record<ChipTone, { border: string; background: string; color: string }> = {
  success: { border: ogColors.successLine, background: ogColors.successSoft, color: ogColors.success },
  failure: { border: ogColors.failureLine, background: ogColors.failureSoft, color: ogColors.failure },
  neutral: { border: ogColors.line, background: ogColors.surface, color: ogColors.ink2 },
  accent: { border: "#c6dbe3", background: ogColors.accentSoft, color: ogColors.accent },
};

function OgMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <rect width="32" height="32" rx="7" fill={ogColors.accent} />
      <path
        d="M8 17.5l5 5 11-12"
        fill="none"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChipGlyph({ tone }: { tone: ChipTone }) {
  if (tone !== "success" && tone !== "failure") return null;
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {tone === "success" ? <path d="M3 8.5l3 3 7-7" /> : <path d="M4 4l8 8M12 4l-8 8" />}
    </svg>
  );
}

export function OgChip({ tone, label, meta }: { tone: ChipTone; label: string; meta?: string }) {
  const style = chipStyles[tone];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 18px",
        borderRadius: 6,
        border: `1px solid ${style.border}`,
        background: style.background,
        color: style.color,
        fontSize: 20,
      }}
    >
      <ChipGlyph tone={tone} />
      <span>{label}</span>
      {meta && <span style={{ fontFamily: ogFontFamily.mono, fontSize: 18, opacity: 0.9 }}>{meta}</span>}
    </div>
  );
}

export type OgImageProps = {
  /** Uppercase monospace label in the top-right corner. */
  topRight: string;
  /** Accent monospace label above the title. */
  kicker: string;
  title: string;
  titleSize?: number;
  /** Bottom-left content, usually a row of chips. */
  footerLeft: ReactNode;
  /** Bottom-right monospace lines. */
  footerRight: string[];
};

export async function renderOgImage(props: OgImageProps) {
  const fonts = await loadFonts();
  const { topRight, kicker, title, titleSize = 62, footerLeft, footerRight } = props;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 64px",
          background: ogColors.bg,
          color: ogColors.ink,
          fontFamily: ogFontFamily.sans,
          fontWeight: 500,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <OgMark size={40} />
            <span style={{ fontSize: 28, fontWeight: 600, letterSpacing: -0.6 }}>{site.name}</span>
            <span style={{ fontSize: 24, color: ogColors.faint, marginLeft: 4 }}>/</span>
            <span style={{ fontSize: 22, color: ogColors.muted }}>{site.descriptor}</span>
          </div>
          <span
            style={{
              fontFamily: ogFontFamily.mono,
              fontSize: 17,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: ogColors.faint,
            }}
          >
            {topRight}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <span
            style={{
              fontFamily: ogFontFamily.mono,
              fontSize: 18,
              letterSpacing: 2.2,
              textTransform: "uppercase",
              color: ogColors.accent,
            }}
          >
            {kicker}
          </span>
          <span
            style={{
              fontSize: titleSize,
              fontWeight: 600,
              letterSpacing: -2.2,
              lineHeight: 1.06,
              maxWidth: 1072,
            }}
          >
            {title}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, flexShrink: 1 }}>{footerLeft}</div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 6,
              flexShrink: 0,
              fontFamily: ogFontFamily.mono,
              fontSize: 17,
              color: ogColors.muted,
            }}
          >
            {footerRight.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts },
  );
}
