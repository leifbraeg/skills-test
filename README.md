# AI Skills Library

A browsable, searchable library for AI assistant skills. Built on GitHub, deployed as a static site, no backend required.

## What is this?

Skills are reusable instructions that tell an AI assistant how to perform a task (code review, meeting summaries, tone checking, etc.). This catalogue gives them a searchable home where anyone can find, use, and contribute skills without needing to manage infrastructure or understand Git.

## Quick Start

### Using the Library

1. **Search** — type in the search bar to find skills by name or description
2. **Filter** — use the tag dropdowns to narrow results (tags combine with OR within categories, AND between them)
3. **Open a skill** — click any card to view full documentation, scripts, and references
4. **Download** — export any skill as a portable `.skill` file (a ZIP archive)

### Contributing a Skill

**Via browser (recommended):**
1. Click **Upload skill** button (top-right)
2. Drop in a `.skill` file (ZIP archive with `SKILL.md` at minimum)
3. Edit metadata in the form
4. Click **Open Pull Request** — this creates a branch and PR automatically

**Via Git:**
1. Create a folder under `skills/your-skill-name/` with at least `skill.json` and `SKILL.md`
2. Open a pull request against `main`

You'll need a GitHub [personal access token](https://github.com/settings/tokens?type=beta) with **Contents: Read and Write** and **Pull requests: Write** permissions to contribute via browser.

## How It Works

- **No database** — Skills are files stored in GitHub. Every change is a pull request with full history and review.
- **No backend** — The frontend is two static files (`index.html` and `config.js`). It reads directly from GitHub's API.
- **Portable** — Download any skill as a `.skill` file (standard ZIP). Rename to `.zip` to inspect contents.
- **Security scanning** — GitHub Actions automatically scans uploaded skills with VirusTotal and stores results in metadata.

### Folder Structure

```
skills/
├── code-reviewer/
│   ├── skill.json        ← metadata (name, description, tags, version, etc.)
│   ├── SKILL.md          ← documentation and prompt instructions
│   ├── scripts/          ← optional executable scripts
│   ├── references/       ← optional reference documents
│   └── assets/           ← optional images and files
└── meeting-summariser/
    └── …
```

## Setup Your Own Library

### 1. Configure

Edit `docs/config.js`:

```js
const CONFIG = {
  repo: "your-username/your-repo",     // where skills are stored
  branch: "main",                       // which branch to read
  skillsPath: "skills",                 // folder containing skill folders
  title: "My Skills Library",           // page title
  metadataFields: [                     // which skill.json fields to display
    { key: "tools", label: "Tools", type: "array", card: true },
    { key: "tags", label: "Tags", type: "array", card: true },
    { key: "version", label: "Version", card: false },
  ],
  predefinedTags: [],                   // leave empty to auto-detect
};
```

### 2. Deploy

Push `index.html` and `config.js` to `docs/` folder in your repo. In GitHub:

1. Go to **Settings → Pages**
2. Set source to `main` branch, `/docs` folder
3. Your library will be live at `https://<username>.github.io/<repo>/`

No build step, no Actions required.

## API Rate Limits

GitHub allows 60 API requests/hour unauthenticated. With more than ~20 skills or multiple users, you'll hit this limit. Add a [personal access token](https://github.com/settings/tokens?type=beta) in the token modal (top-right) to raise it to 5,000 requests/hour. Token is stored locally in your browser only.

## Dependencies

Loaded from CDN at runtime. No installation needed.

| Library | Version | Purpose |
|---|---|---|
| [marked](https://github.com/markedjs/marked) | 12 | Markdown rendering |
| [highlight.js](https://highlightjs.org) | 11 | Code syntax highlighting |
| [JSZip](https://stuk.github.io/jszip/) | 3 | Packing/unpacking `.skill` files |
