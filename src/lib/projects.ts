import type { Project } from "./types";

// All project content for the site. Order here is the order on the page.
// Images come from scripts/images.mjs (cover.webp is the first file listed there).

const shots = (slug: string, n: number) =>
  Array.from({ length: n }, (_, i) => `/images/${slug}/shot-${i + 1}.webp`);

export const games: Project[] = [
  {
    kind: "game",
    slug: "birdie-club",
    title: "Birdie Club",
    tier: "main",
    platform: "Unity 6",
    genre: "Arcade golf",
    status: "Coming to Steam",
    statusTone: "building",
    signature: "Ball flight tuned to match real launch-monitor data",
    pitch:
      "An arcade golf game where you play as birds. It has a three-click swing meter, real ball physics, and twelve 18-hole courses you can play alone or online with up to four players.",
    summary:
      "Birdie Club started as a three-hole prototype to see if the swing felt good. Once it did, I kept going. It now has procedurally routed courses, online play through Steam, and a ball that flies and bounces the way a real one does. I'm still building it and plan to release it on Steam.",
    highlights: [
      {
        title: "Ball physics",
        body: "The ball is simulated in 2 ms steps with drag and Magnus lift. Bounces use friction, which is what lets backspin bite and putts lip out.",
      },
      {
        title: "Tuned against real numbers",
        body: "An editor tool searches for the drag and lift values that make carry distances line up with published tour data.",
      },
      {
        title: "Online play",
        body: "Up to four players share a Steam lobby. Friends join with a code, the game checks everyone is on the same build, and rounds can be turn-based or simultaneous.",
      },
      {
        title: "Course generation",
        body: "Courses are generated and routed in code. I wrote small Python tools that draw each layout so I can check holes without opening Unity.",
      },
      {
        title: "Shot shaping",
        body: "Players pick a shot type and add spin and shape, and a landing marker shows where the ball should end up.",
      },
      {
        title: "Tests",
        body: "Edit-mode tests cover the ball, the network messages and round setup. If a physics tweak changes an old shot, a test fails.",
      },
    ],
    tech: ["Unity 6", "URP", "C#", "Steamworks", "Python tooling", "NUnit"],
    cover: "/images/birdie-club/cover.webp",
    // Videos use { type: "video", src: "/media/<file>.mp4", label }.
    media: [
      { type: "image", src: "/images/birdie-club/shot-1.webp", label: "Lakeside par 3" },
      { type: "image", src: "/images/birdie-club/shot-2.webp", label: "Desert course" },
    ],
    links: { code: "https://github.com/jacobshinta/code-samples/tree/main/birdie-club-ball-physics" },
  },
  {
    kind: "game",
    slug: "ghost-notes",
    title: "Ghost Notes",
    tier: "main",
    platform: "Godot 4",
    genre: "Survivors-like",
    status: "Playable",
    statusTone: "live",
    signature: "Every ghost replays one of your loops in time with the music",
    pitch:
      "Every 20 seconds, the path you just took turns into a ghost that repeats it and fights alongside you. Each ghost sings a note, and the choir grows the longer you survive.",
    summary:
      "Ghost Notes is a survivors-like where your army is made of your own past runs. It's the most finished thing I've made, with Windows, Linux and web builds, and you can play it here in your browser.",
    highlights: [
      {
        title: "Lots of enemies",
        body: "Enemies live in packed arrays instead of one node each, a spatial hash grid handles the neighbor checks for hits and separation, and drawing is batched. A benchmark script measures the frame cost.",
      },
      {
        title: "Record and replay",
        body: "The game records your position every physics tick and plays it back with interpolation. Each ghost retraces your route, though some instruments mirror or reverse it.",
      },
      {
        title: "Music-driven",
        body: "A conductor script keeps the beat locked to the loop timer on a 16th-note grid. Ghosts sing in a round, and crossing paths plays notes that climb the current chord.",
      },
      {
        title: "Testing",
        body: "About two dozen test suites run headless, so the whole game can be checked without opening the editor.",
      },
    ],
    tech: ["Godot 4.7", "GDScript", "Web export", "Headless tests"],
    cover: "/images/ghost-notes/cover.webp",
    screenshots: shots("ghost-notes", 2),
    links: { play: "/play/ghost-notes/", code: "https://github.com/jacobshinta/code-samples/tree/main/ghost-notes-swarm-and-replay" },
  },
  {
    kind: "game",
    slug: "vine-and-dandy",
    title: "Vine & Dandy",
    tier: "main",
    platform: "Unity 6",
    genre: "Farming sim",
    status: "Playable (v0.46)",
    statusTone: "live",
    signature: "Wines blend by volume and change as they age",
    pitch:
      "A first-person vineyard game. You grow and pick grapes, make and age wine, sell at a farm stand, and eventually hire workers to take over the jobs you started out doing by hand.",
    summary:
      "You start out doing everything yourself, and as money comes in you hire people to take jobs off your hands. The game is fully playable and has been through dozens of builds, several of them played by testers. What's left is mostly polish.",
    highlights: [
      {
        title: "Wine model",
        body: "Each wine tracks body, sweetness, grape mix and when it will peak. Pouring two together blends them by volume, and wine keeps changing as it ages.",
      },
      {
        title: "Workers",
        body: "Hired staff use NavMesh pathing and job classes to pick and haul, feeding a conveyor sorting line. Applicants have traits that change their speed, care and wages.",
      },
      {
        title: "Crash-safe saves",
        body: "Saves are versioned JSON. Each one is written to a temp file first and swapped in at the end, and a crash halfway through leaves the old save intact.",
      },
      {
        title: "Other systems",
        body: "Selling, pests, a dairy and fishing each have their own folder and namespace.",
      },
    ],
    tech: ["Unity 6", "C#", "NavMesh", "JSON saves"],
    cover: "/images/vine-and-dandy/cover.webp",
    screenshots: shots("vine-and-dandy", 2),
    links: { code: "https://github.com/jacobshinta/code-samples/tree/main/vine-and-dandy-wine-model" },
  },
  {
    kind: "game",
    slug: "house-rules",
    title: "House Rules",
    tier: "main",
    platform: "Godot 4",
    genre: "Horror",
    status: "In development",
    statusTone: "building",
    signature: "The night plays out from a script, and the house reacts when you break a rule",
    pitch:
      "A short first-person horror game set over one night of babysitting. The parents leave a list of house rules on the fridge, and you have to keep every one of them until morning.",
    summary:
      "A short first-person horror game, about 20 minutes long, with a PS1 look. I built it on a small framework for interaction, mood and audio that I can reuse for the next short horror game.",
    highlights: [
      {
        title: "Writing kept separate from code",
        body: "All of the game's text lives in one story file that the code looks up by ID. Dialogue, notes and rules can be written and rewritten without touching a script, and a test catches any line that goes missing.",
      },
      {
        title: "Night director and rules",
        body: "A night director runs the evening's events from the script. The rules are tracked separately, and an outcome layer decides how the house reacts when you break one.",
      },
      {
        title: "Automated playthroughs",
        body: "Headless runs play the night start to finish, keeping or breaking rules on purpose, so a change that breaks an ending shows up right away.",
      },
      {
        title: "PS1 look",
        body: "Custom post-processing and material shaders, with menus rendered at a low resolution to match.",
      },
    ],
    tech: ["Godot 4.7", "GDScript", "Shaders", "Headless tests"],
    cover: "/images/house-rules/cover.webp",
    screenshots: shots("house-rules", 3),
    links: {},
  },
  {
    kind: "game",
    slug: "personal-effects",
    title: "Personal Effects",
    tier: "prototype",
    platform: "Godot 4",
    genre: "Deduction",
    status: "Prototype",
    statusTone: "building",
    signature: "Turn each object over in 3D to find the maker's mark on its base",
    pitch:
      "England, 1928. You're the valuer pricing a dead man's estate while his family still lives in the house. Every object you catalogue tells you a little more about him.",
    summary:
      "A deduction game about provenance. Each day a room's worth of objects comes to your table. You check maker's marks, compare pieces with an inventory written 17 years earlier, and question the family and the housekeeper, who all have their own reasons to lie. Then you decide what goes in the catalogue. The whole week is playable.",
    highlights: [
      {
        title: "Turning things over",
        body: "Each object sits on a small 3D stage you rotate by hand. Maker's marks are on the base, the way they are on real silver, so finding one means actually turning the piece over.",
      },
      {
        title: "Prices you can always work out",
        body: "Each lot stores what the player can observe, kept apart from the answer I intended. A solver prices it from the same clues and reference books the player has, and a self-test flags any lot where the two disagree.",
      },
      {
        title: "Story from evidence",
        body: "The three story threads close once the player has found enough separate pieces of evidence for each one. You piece the story together from the objects themselves.",
      },
      {
        title: "Witnesses who lie",
        body: "Each of the four people you can ask lies for their own reason. One is protecting the dead man, one wants higher prices, one is embarrassed and one made a promise. Part of the job is learning whose answers to trust.",
      },
    ],
    tech: ["Godot 4.7", "GDScript", "Python tooling"],
    cover: "/images/personal-effects/cover.webp",
    screenshots: shots("personal-effects", 2),
    links: {},
  },
  {
    kind: "game",
    slug: "squadron",
    title: "Squadron",
    tier: "prototype",
    platform: "Godot 4",
    genre: "Co-op rail shooter",
    status: "Prototype",
    statusTone: "building",
    signature: "Four-player online co-op, with the host running the world",
    pitch:
      "A co-op rail shooter for up to four players. After the heist, you fly your car through a neon city with the police on your tail and a boss at the end of each district, from a police gunship to an armored train.",
    summary:
      "This prototype is about the getaway. Between jobs you spend your cut on mods at the chop shop, and between nights the bank goes to a casino that unlocks new cars and parts.",
    highlights: [
      {
        title: "Netcode",
        body: "The host runs the world, but each player's own car is trusted locally. That keeps shooting instant even online.",
      },
      {
        title: "Rail coordinates",
        body: "Movement, obstacles and pickups are worked out as distance along the route plus a sideways offset, which keeps most of the gameplay math simple. Shots and rams are tested in world space.",
      },
      {
        title: "Procedural city",
        body: "The city comes from a fixed seed. Every player builds the same streets locally, and none of it has to go over the network.",
      },
      {
        title: "Upgrades",
        body: "Upgrades are tagged, and three of the same tag unlock a set bonus.",
      },
    ],
    tech: ["Godot 4.7", "GDScript", "ENet multiplayer", "Shaders"],
    cover: "/images/squadron/cover.webp",
    screenshots: shots("squadron", 3),
    links: {},
  },
];

export const mainGames = games.filter((g) => g.tier === "main");
export const prototypeGames = games.filter((g) => g.tier === "prototype");

/** One sentence under the prototype cards. Empty string hides it. */
export const otherPrototypes = "";

export const webProjects: Project[] = [
  {
    kind: "web",
    slug: "punch-card",
    title: "Punch Card",
    platform: "Next.js",
    genre: "League site and Discord bot",
    status: "Side project",
    statusTone: "paused",
    signature: "Swiss pairings come from a single, well-tested function",
    pitch:
      "A website and Discord bot I built to run a 3v3 Street Fighter 6 league.",
    summary:
      "I built Punch Card to run an entire league. The site has standings, the schedule, teams, stats and the rules. On match night the Discord bot announces pairings, handles check-in, opens match channels and posts results.",
    note: "I haven't run a season yet. Another league started up around the same time, so I'm holding the first one until next year rather than compete with it.",
    highlights: [
      {
        title: "Swiss pairings",
        body: "Pairings come from one deterministic function that penalizes rematches so heavily they only happen when nothing else works.",
      },
      {
        title: "Standings from match results",
        body: "Standings are recalculated from match results on every request instead of being stored, and the bracket fills its slots the same way.",
      },
      {
        title: "Discord integration",
        body: "Players sign in with Discord, and a scheduled bot runs each match night.",
      },
      {
        title: "Tests",
        body: "About 200 tests cover the league logic, over a 17-table database schema.",
      },
    ],
    tech: ["Next.js", "React", "TypeScript", "Drizzle", "PostgreSQL", "discord.js", "Vitest"],
    cover: "/images/punch-card/cover.webp",
    screenshots: shots("punch-card", 3),
    links: {},
  },
  {
    kind: "web",
    slug: "gilly-transport",
    title: "Gilly Transport",
    platform: "Next.js",
    genre: "Business site with load tracking",
    status: "Client project",
    statusTone: "paused",
    signature: "Look up any load by tracking number, straight from the database",
    pitch:
      "A website for a small trucking company, with load tracking by number and a sign-in area for customers.",
    summary:
      "I built this for a friend's trucking business. Visitors can look up a load by its tracking number, and customers sign in to a protected account area that was meant to hold their dashboards.",
    highlights: [
      {
        title: "Load tracking",
        body: "Enter a tracking number and the site pulls that load's status, origin, destination and ETA from Supabase.",
      },
      {
        title: "Protected customer area",
        body: "Clerk guards everything under /portal at the routing layer, and the page checks the session again as a fallback.",
      },
    ],
    tech: ["Next.js", "React", "TypeScript", "Supabase", "Clerk", "Tailwind"],
    cover: "/images/gilly-transport/cover.webp",
    note: "My friend shelved the business before it opened, and the site went with it.",
    links: {},
  },
  {
    kind: "web",
    slug: "viking-mountain-guitar",
    title: "Viking Mountain Guitar",
    platform: "Next.js",
    genre: "Shop site with CMS",
    status: "Client project",
    statusTone: "paused",
    signature: "The owner manages inventory in a built-in CMS",
    pitch:
      "A website for a guitar restoration and sales shop, with a guitar catalog the owner manages without touching code.",
    summary:
      "I built this for a guitar shop in Tennessee. The owner adds and edits guitars in a content editor that's built into the site.",
    highlights: [
      {
        title: "Owner-managed catalog",
        body: "A Sanity Studio runs inside the site with a custom guitar schema. The owner adds stock without needing a developer.",
      },
      {
        title: "Catalog filters",
        body: "Visitors can filter by price, hide sold guitars, and open photos in a lightbox.",
      },
      {
        title: "SEO and listings",
        body: "The site generates its own sitemap and robots file, and a guitar can link to its Facebook Marketplace listing.",
      },
    ],
    tech: ["Next.js", "React", "TypeScript", "Sanity", "Framer Motion", "Tailwind"],
    cover: "/images/viking-mountain-guitar/cover.webp",
    screenshots: shots("viking-mountain-guitar", 2),
    note: "The shop never opened, so this one stayed on my machine.",
    links: {},
  },
];
