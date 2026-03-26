**README:**

---

# Skills Library

A minimalistic frontend for browsing AI skills stored in a GitHub repository. GitHub acts as the backend — skills live in folders, metadata is versioned, and everything is fetched live via the GitHub API. Deployable as a static site on GitHub Pages with zero build steps.

## How it works

Each skill is a folder under `skills/` containing at minimum a `skill.json` metadata file. The frontend reads the folder listing and metadata on load, then lazily fetches `SKILL.md`, scripts, references, and assets as you browse.

```
skills/
└── code-reviewer/
    ├── skill.json       # metadata (name, description, tags, …)
    ├── SKILL.md         # full skill documentation (rendered as markdown)
    ├── scripts/         # executable scripts
    ├── references/      # reference documents
    └── assets/          # images and other files
```

## skill.json

```json
{
  "name": "Code Reviewer",
  "description": "Reviews pull requests for clarity, correctness, and style.",
  "tags": ["Claude Code", "Cursor"],
  "author": "leifbraeg",
  "version": "1.0.0"
}
```

The fields displayed — and how they appear — are fully configurable in `config.js`.

## Setup

### 1. Configure

Edit `docs/config.js`:

```js
const CONFIG = {
  repo:       "your-username/your-repo",  // GitHub repo containing skills
  branch:     "main",
  skillsPath: "skills",                   // folder where skill sub-folders live
  skillFile:  "skill.json",               // metadata filename inside each folder
  token:      "",                         // optional — see Rate limits below
  title:      "Skills Library",
  metadataFields: [
    { key: "tags",    label: "Tags",    type: "array", card: true  },
    { key: "author",  label: "Author",                 card: true  },
    { key: "version", label: "Version",                card: false },
  ],
  predefinedTags: [],  // leave empty to auto-detect from skills
};
```

### 2. Deploy to GitHub Pages

1. Put `index.html` and `config.js` in a `docs/` folder at the root of your repo
2. Go to **Settings → Pages → Source** → Deploy from branch → `main` / `/docs`
3. Your site will be live at `https://<username>.github.io/<repo>/`

## Rate limits

The GitHub API allows **60 requests/hour** for unauthenticated requests. Each skill folder requires one API call on load (plus more when browsing tabs and downloading). If you hit the limit, the app will stop loading content.

To raise the limit to **5,000 req/hr**, add a [Personal Access Token](https://github.com/settings/tokens) to `config.js`:

```js
token: "github_pat_your_token_here",
```

> **Note:** Do not commit a token to a public repository. For public GitHub Pages deployments, consider building a token input UI so each visitor authenticates with their own token.

## Downloading skills

Each skill can be downloaded as a `.skill` file from the Overview tab. This is a standard ZIP archive — rename it to `.zip` to inspect or extract the contents with any file manager or unzip tool. It includes all files from the skill folder: metadata, documentation, scripts, references, and assets.

## Dependencies

All loaded from CDN at runtime — no install, no build step.

| Library | Purpose |
|---|---|
| [marked](https://github.com/markedjs/marked) | Renders `SKILL.md` as HTML |
| [JSZip](https://stuk.github.io/jszip/) | Packages skills into `.skill` files |
