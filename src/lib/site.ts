// Site owner details and links. Components read from here.
type Site = Record<
  | "name" | "url" | "role" | "location" | "tagline" | "email" | "github"
  | "code" | "itch" | "linkedin" | "resume" | "reel",
  string
>;

export const site: Site = {
  name: "Jacob Long",
  url: "https://jacobshinta.github.io",
  role: "Game Developer",
  location: "Jacksonville, FL",
  // Used for search results and link previews.
  tagline:
    "Game developer in Jacksonville, FL, working in Unity and Godot. Currently finishing Birdie Club for Steam.",
  email: "jacobshinta@me.com",
  github: "https://github.com/jacobshinta",
  code: "https://github.com/jacobshinta/code-samples",
  // Optional links. Empty strings are hidden.
  itch: "",
  linkedin: "",
  // Printed from resume/resume.html by `node scripts/resume.mjs`.
  resume: "/resume.pdf",
  // YouTube/Vimeo embed URL or a local file under public/; empty hides the reel.
  reel: "",
};
