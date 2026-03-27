# AI Skills Library

A lightweight catalogue for AI skills — built on top of GitHub, deployed as a static page, and designed so that anyone can contribute without touching any infrastructure.

---

## What is this?

AI skills are reusable instructions that tell an AI assistant how to perform a specific task — a code reviewer, a meeting summariser, a tone checker, a PR description writer. They combine a prompt with context, examples, scripts, and reference material to produce consistent, reliable behaviour.

The problem with skills is that they tend to accumulate in personal notes, Slack threads, and individual tool configs. They don't get shared, they don't get improved, and they disappear when someone leaves.

This catalogue is an attempt to fix that. It gives skills a home: a browsable, searchable library where anyone can find what exists, understand how to use it, and contribute their own. The interface abstracts the technical side away so that contributing a skill feels like filling out a form, not making a code change.

---

## Principles

**GitHub is the backend.** There is no database, no server, no CMS to maintain. Skills live as files in a Git repository. Every addition, change, and deletion is a pull request — with history, authorship, review, and rollback built in for free.

**The interface exists to lower the barrier.** Not everyone is comfortable opening a pull request. The catalogue lets anyone upload a `.skill` file through a browser and have it land as a PR automatically. The Git workflow happens in the background.

**Skills are portable.** Every skill can be downloaded as a `.skill` file, which is a standard ZIP archive containing everything — documentation, scripts, assets, metadata. Rename it to `.zip` to inspect it. It works with any tool that can unzip files.

**No build step.** The frontend is two files: `index.html` and `config.js`. No framework, no bundler, no CI pipeline required. Drop them anywhere and they work.

---

## How it works

The page is a static HTML file that talks directly to the GitHub Contents API. On load, it fetches the list of skill folders from the repository, reads the `skill.json` metadata from each one, and renders the catalogue. Nothing is stored server-side.

When you open a skill, the page lazily fetches the `SKILL.md` documentation, scripts, references, and assets on demand — only loading what you actually look at.

When you upload a skill, the page reads the `.skill` file in the browser, unpacks it, and uses the GitHub API to create a new branch and open a pull request with the skill contents. The reviewer merges it, and the skill appears in the catalogue on next load.

### Repository structure

```
skills/
├── code-reviewer/
│   ├── skill.json        ← metadata (name, description, tags, author, …)
│   ├── SKILL.md          ← full documentation and prompt instructions
│   ├── scripts/          ← executable scripts the skill uses
│   ├── references/       ← reference documents and context
│   └── assets/           ← images and other supporting files
├── meeting-summariser/
│   └── …
└── …
```

Each skill is a folder. The folder name becomes the skill's identifier. Everything else lives inside it.

### skill.json

```json
{
  "name": "Code Reviewer",
  "description": "Reviews code for bugs and correctness issues.",
  "tags": ["Claude Code", "Cursor"],
  "author": "your-name",
  "version": "1.0.0"
}
```

The fields shown in the catalogue are fully configurable in `config.js`. You can add any field you want — it will appear in the skill detail view automatically.

### SKILL.md

The main documentation file. Starts with a YAML frontmatter block, followed by markdown:

```
---
name: code-reviewer
description: Reviews code for bugs…
---

## What this skill does

…
```

The frontmatter is rendered as a metadata table. The rest is rendered as formatted markdown with syntax-highlighted code blocks.

---

## Using the catalogue

**Search** — type anything in the search bar to filter skills by name, description, or tag.

**Filter by tag** — click a tag in the filter bar to narrow the list. Multiple tags narrow further.

**Open a skill** — click any card to open the detail panel. Switch between tabs to read the documentation, view scripts, browse references, and see assets.

**Download a skill** — click **Download .skill** in the Overview tab to get a portable archive of the entire skill folder.

**Dark mode** — toggle with the button in the top-right corner. Your preference is saved across sessions.

---

## Contributing a skill

The recommended way to contribute is through the **Upload skill** button in the top-right corner.

### What you need

A `.skill` file — a ZIP archive containing at minimum a `skill.json` and a `SKILL.md`. You can build one by:

1. Creating a folder with your skill's files
2. Zipping it
3. Renaming the `.zip` to `.skill`

Or download an existing skill from the catalogue and use it as a template.

### What happens when you upload

1. You drop in the `.skill` file
2. A form appears pre-filled from the `skill.json` inside — review and edit the metadata
3. Hit **Open Pull Request**
4. The page creates a branch named `skill/{folder-name}`, pushes all the files, and opens a PR against `main`
5. A maintainer reviews and merges it

You need a GitHub account and a [personal access token](https://github.com/settings/tokens?type=beta) with **Contents: Read and Write** and **Pull requests: Write** permissions on the repository. Paste your token into the token modal (the icon next to the upload button) — it's stored only in your browser.

### Contributing directly via Git

If you prefer working directly in the repository:

1. Fork or clone the repo
2. Create your skill folder under `skills/your-skill-name/`
3. Add at minimum `skill.json` and `SKILL.md`
4. Open a pull request against `main`

---

## Setup

### 1. Fork or create the skills repository

This can be any GitHub repository — public or private. The catalogue reads from wherever you point it.

### 2. Configure

Edit `config.js`:

```js
const CONFIG = {
  repo:       "your-username/your-repo",
  branch:     "main",
  skillsPath: "skills",
  skillFile:  "skill.json",
  token:      "",
  title:      "AI Skills Library",
  metadataFields: [
    { key: "tags",    label: "Tags",    type: "array", card: true  },
    { key: "author",  label: "Author",                 card: true  },
    { key: "version", label: "Version",                card: false },
  ],
  predefinedTags: [],
};
```

### 3. Deploy to GitHub Pages

Put `index.html` and `config.js` in a `docs/` folder in your repository. Go to **Settings → Pages**, set the source to the `main` branch and `/docs` folder. Your catalogue will be live at `https://<username>.github.io/<repo>/`.

No build step. No GitHub Actions required.

### 4. Custom fonts (optional)

The catalogue is designed for the ABC Rom typeface. To use it, place your licensed `.woff2` files in a `fonts/` folder next to `index.html`:

```
fonts/
  ABCRom-Regular.woff2
  ABCRom-Book.woff2
  ABCRom-Medium.woff2
  ABCRom-Bold.woff2
```

Falls back to system fonts if the files aren't present.

---

## Rate limits

The GitHub API allows 60 requests per hour without authentication. Each skill folder uses one request on load, plus more when you browse tabs or download. With more than ~20 skills or multiple users, you will hit this limit.

To raise it to 5,000 requests per hour, add a [personal access token](https://github.com/settings/tokens?type=beta) through the token modal in the top-right corner. The token is stored in your browser's `localStorage` and never sent anywhere other than the GitHub API.

For a shared deployment, each user should add their own token rather than sharing one.

---

## Dependencies

Loaded from CDN at runtime. No install or build step.

| Library | Version | Purpose |
|---|---|---|
| [marked](https://github.com/markedjs/marked) | 12 | Renders `SKILL.md` as HTML |
| [highlight.js](https://highlightjs.org) | 11 | Syntax highlighting for code files |
| [JSZip](https://stuk.github.io/jszip/) | 3 | Packs and unpacks `.skill` files |
