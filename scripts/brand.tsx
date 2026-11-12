// Renders the site's link-preview card and the Apple touch icon.
//   npx tsx scripts/brand.tsx
// Writes src/app/opengraph-image.png and src/app/apple-icon.png, which Next picks up by file name.
// Re-run after changing the name, tagline or the lead game's cover.
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { ImageResponse } from "next/og";

const root = process.cwd();
const BG = "#121110";
const TEXT = "#f1ece4";
const MUTED = "#a39d93";
const ACCENT = "#a6e36f";

const fontFile = (w: number) =>
  readFileSync(
    path.join(root, `node_modules/@fontsource/bricolage-grotesque/files/bricolage-grotesque-latin-${w}-normal.woff`),
  );
const fonts = [
  { name: "Bricolage", data: fontFile(700), weight: 700 as const, style: "normal" as const },
  { name: "Bricolage", data: fontFile(600), weight: 600 as const, style: "normal" as const },
];

async function main() {
  // Satori reads PNG/JPEG, not WebP, so convert the cover first.
  const cover = await sharp(path.join(root, "public/images/birdie-club/cover.webp"))
    .resize(700, 630, { fit: "cover" })
    .png()
    .toBuffer();
  const coverUrl = `data:image/png;base64,${cover.toString("base64")}`;

  const og = (
    <div style={{ width: "100%", height: "100%", display: "flex", background: BG, fontFamily: "Bricolage" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={coverUrl} alt="" width={700} height={630} style={{ position: "absolute", right: 0, top: 0 }} />
      {/* Fade the screenshot into the background so the text side stays clean. */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1200,
          height: 630,
          backgroundImage: `linear-gradient(90deg, ${BG} 0%, ${BG} 45%, rgba(18,17,16,0.8) 62%, rgba(18,17,16,0.1) 100%)`,
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 72px", width: 760 }}>
        <div style={{ display: "flex", fontSize: 26, fontWeight: 600, color: MUTED, letterSpacing: 1 }}>
          Game Developer · Jacksonville, FL
        </div>
        <div style={{ display: "flex", fontSize: 104, fontWeight: 700, color: TEXT, lineHeight: 1.02, marginTop: 18 }}>
          Jacob Long
        </div>
        <div style={{ display: "flex", fontSize: 36, fontWeight: 600, color: TEXT, marginTop: 26, lineHeight: 1.3 }}>
          I make games in Unity and Godot.
        </div>
        <div style={{ display: "flex", fontSize: 30, fontWeight: 600, color: ACCENT, marginTop: 10 }}>
          Now finishing Birdie Club for Steam.
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: 10, background: ACCENT }} />
    </div>
  );

  const res = new ImageResponse(og, { width: 1200, height: 630, fonts });
  const png = Buffer.from(await res.arrayBuffer());
  writeFileSync(path.join(root, "src/app/opengraph-image.png"), png);
  console.log(`src/app/opengraph-image.png  1200x630  ${(png.length / 1024).toFixed(0)} KB`);

  // The touch icon is the favicon, rendered square with no transparency (iOS fills it black otherwise).
  // The corners are filled with the tile's own color, since iOS rounds them itself.
  const iconSvg = readFileSync(path.join(root, "src/app/icon.svg"), "utf8");
  const tile = iconSvg.match(/<rect[^>]*fill="([^"]+)"/)?.[1] ?? BG;
  const icon = await sharp(Buffer.from(iconSvg), { density: 600 })
    .resize(180, 180)
    .flatten({ background: tile })
    .png()
    .toBuffer();
  writeFileSync(path.join(root, "src/app/apple-icon.png"), icon);
  console.log("src/app/apple-icon.png  180x180");
}

main();
