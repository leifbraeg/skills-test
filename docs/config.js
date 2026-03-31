const CONFIG = {
  // ─── GitHub ────────────────────────────────────────────────────────────────
  // "owner/repo" of the repository that stores your skills
  repo: "leifbraeg/skills-test",

  // Branch to read from
  branch: "main",

  // Path inside the repo where skill folders live
  // Each sub-folder should contain a `skill.json`
  skillsPath: "skills",

  // Filename inside each skill folder containing metadata
  skillFile: "skill.json",

  // Optional GitHub personal access token.
  // Leave empty for public repos. Add a token with `repo` scope for private ones
  // or to increase the API rate limit (60 → 5000 req/hr).
  token: "",

  // ─── UI ────────────────────────────────────────────────────────────────────
  title: "AI Skills Library (Demo)",

  // ─── Metadata fields ───────────────────────────────────────────────────────
  // Defines which fields from skill.json to display and how.
  //
  //   key       — property name in skill.json (required)
  //   label     — human-readable label
  //   required  — if true, skills missing this field are still shown (no error)
  //   type      — "text" (default) | "array" | "link" | "code"
  //   card      — if true, field is shown on the skill card in the list view
  //
  // "name" and "description" are always rendered as the card header/body;
  // you can still list them here to show them in the detail panel too.
  //
  // Note: "virustotalReportUrl" and "virustotalScanDate" are auto-populated by
  // GitHub Actions security scans and should not be manually edited.
  metadataFields: [
    { key: "tags",     label: "Tags",     type: "array", card: true  },
    { key: "featured", label: "Featured",                card: false },
    { key: "version",  label: "Version",                 card: false },
  ],

  // ─── Tag filter bar ────────────────────────────────────────────────────────
  // Predefined tags to show in the filter bar.
  // Leave empty ([]) to auto-detect all tags from the loaded skills.
  predefinedTags: [],
};
