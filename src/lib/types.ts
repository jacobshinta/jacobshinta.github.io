export type Highlight = {
  title: string;
  body: string;
};

export type ProjectLinks = {
  /** Internal path to a playable browser build, e.g. "/play/ghost-notes/". */
  play?: string;
  steam?: string;
  itch?: string;
  download?: string;
  /** A folder in the public code-samples repo. */
  code?: string;
  github?: string;
  live?: string;
};

/**
 * A gallery item. Leave `src` empty to show a "coming soon" placeholder slot,
 * so the layout is ready before the footage exists.
 */
export type Media = {
  type: "image" | "video";
  src: string;
  label: string;
};

export type Project = {
  kind: "game" | "web";
  slug: string;
  title: string;
  /** Games: the four main pieces vs. smaller prototypes. Web projects ignore this. */
  tier?: "main" | "prototype";
  /** Engine for games ("Unity 6", "Godot 4"), main framework for web ("Next.js"). */
  platform: string;
  genre: string;
  status: string;
  /** "live" gets a filled dot, "building" a ring, "paused" a grey dot. */
  statusTone?: "live" | "building" | "paused";
  /** The one standout technical fact, shown on cards in place of more tags. */
  signature: string;
  /** One or two sentences for cards. */
  pitch: string;
  /** A short paragraph for the detail page. */
  summary: string;
  /** The "What I built" cards on the detail page. */
  highlights: Highlight[];
  tech: string[];
  /** Path under public/, e.g. "/images/birdie-club/cover.webp". */
  cover?: string;
  screenshots?: string[];
  media?: Media[];
  links: ProjectLinks;
  /** Optional note shown under the overview. */
  note?: string;
};
