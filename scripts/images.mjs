// Resizes source screenshots to WebP for the site.
//   node scripts/images.mjs          -> public/images/<slug>/*.webp
//   node scripts/images.mjs --sheet  -> also a contact sheet
// Sources live next to this repo (PROJECTS_DIR, default: the parent folder) and in assets/, which isn't committed.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const D = process.env.PROJECTS_DIR ?? path.resolve("..");
const WEB = path.resolve("assets/web-captures");
const GAME = path.resolve("assets/game-captures");

const shots = {
  "birdie-club": [
    `${D}/GolfGame/GolfGame/Assets/_Golf/Resources/CourseCards/Course01.png`,
    `${D}/GolfGame/GolfGame/Assets/_Golf/Resources/CourseCards/Course04.png`,
    `${D}/GolfGame/GolfGame/Assets/_Golf/Resources/CourseCards/Course07.png`,
  ],
  "ghost-notes": [
    `${D}/Godot Projects/echo/build/steam_screenshots/03_choir_routes.png`,
    `${D}/Godot Projects/echo/build/steam_screenshots/01_boss_static.png`,
    `${D}/Godot Projects/echo/build/steam_screenshots/02_volley.png`,
  ],
  "vine-and-dandy": [
    `${D}/WineGame/docs/capsule-shots/01_rows_windmill_evening_preview.jpg`,
    `${D}/WineGame/docs/capsule-shots/05_crow_windmill_sunset_preview.jpg`,
    `${D}/WineGame/docs/capsule-shots/08_sun_right_B_camera_up_preview.jpg`,
  ],
  "house-rules": [
    `${D}/Godot Projects/house-rules/screenshots/title/calm.png`,
    `${GAME}/hr-kitchen.png`,
    `${GAME}/hr-shadow-kid.png`,
    `${GAME}/hr-decay.png`,
  ],
  "personal-effects": [
    `${GAME}/pe-desk.png`,
    `${GAME}/pe-examine.png`,
    `${GAME}/pe-letter.png`,
  ],
  squadron: [
    `${GAME}/squadron-gunship.png`,
    `${GAME}/squadron-chase.png`,
    `${GAME}/squadron-transport.png`,
    `${GAME}/squadron-title.png`,
  ],
  "punch-card": [
    `${D}/Site/src/app/opengraph-image.png`,
    `${WEB}/pc-home.png`,
    `${WEB}/pc-rules.png`,
    `${WEB}/pc-schedule.png`,
  ],
  "gilly-transport": [`${WEB}/gt-home.png`],
  "viking-mountain-guitar": [
    `${WEB}/vg-home.png`,
    `${WEB}/vg-guitars.png`,
    `${WEB}/vg-detail.png`,
  ],
};

const OUT = "public/images";
const made = [];

for (const [slug, files] of Object.entries(shots)) {
  await mkdir(path.join(OUT, slug), { recursive: true });
  for (const [i, src] of files.entries()) {
    const name = i === 0 ? "cover" : `shot-${i}`;
    const dest = path.join(OUT, slug, `${name}.webp`);
    await sharp(src)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(dest);
    made.push(dest);
    console.log(dest);
  }
}

if (process.argv.includes("--sheet")) {
  const W = 400, H = 225, cols = 5;
  const rows = Math.ceil(made.length / cols);
  const tiles = await Promise.all(
    made.map(async (f, i) => ({
      input: await sharp(f).resize(W, H, { fit: "cover" }).toBuffer(),
      left: (i % cols) * W,
      top: Math.floor(i / cols) * H,
    })),
  );
  const sheet = process.argv[process.argv.indexOf("--sheet") + 1] ?? "contact-sheet.png";
  await sharp({ create: { width: W * cols, height: H * rows, channels: 3, background: "#000" } })
    .composite(tiles)
    .png()
    .toFile(sheet);
  console.log("sheet:", sheet);
}
