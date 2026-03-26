# Aperio weekly update

This skill gathers context from multiple sources across Taxfix's tooling and composes a concise, skimmable weekly status update for Mission Aperio, then publishes it directly to the Notion Updates database.

## Why this matters

Mission Aperio is a cross-functional, long-running initiative at Taxfix focused on removing barriers to building with AI and automation tools. The team spans People, R&D, Operations, Product, G&B, and Corporate IT. Stakeholders skim these updates quickly, so they must be concise, specific, and honest — not padded or vague.

## Step 1: Gather context from all sources

Run these in parallel to save time. Collect as much signal as possible before writing.

### Slack: #mission-aperio

- Channel ID: `C0AFTUF37JA`
- Read the last ~50 messages from the channel
- Read any threads that look substantive (not just emoji reactions or joins)
- Look for: decisions made, blockers raised, asks for help, progress mentions, meeting outcomes

### Notion: Aperio task board

- Query the Tasks data source (`collection://223515cb-252b-49b6-9d70-ffbeb0e9fa74`) filtered to `Mission = 'Aperio'`
- Pull: task name, status, assignee, team, effort, complexity
- Group by status to understand the shape of work (what's blocked, building, in review, done, queued)
- Compare against the previous update if one exists in the Updates database to identify what changed

### Notion: Updates database

- Database ID: `31a39357d84780fca4bfe61bc29113db`
- Data source: `collection://31a39357-d847-80b3-9397-000bba0b12fe`
- Read the most recent existing update page to understand what was said last time
- This helps frame "what happened" as genuinely new progress since the last update

### Google Drive: meeting notes (if relevant)

- Search Google Drive for recent documents related to Aperio, mission sync, or IAM
- These are typically Gemini-generated meeting notes from Google Meet
- Extract: key decisions, action items, technical direction changes, new information

### Notion: Mission charter (for context only)

- Page: `30539357d84780e0a27bfd9498c48e06`
- Only fetch if you need to ground yourself in the mission's goals and framing
- Do not repeat charter content verbatim — the update should reflect current state, not restate the problem

## Step 2: Identify the week number

Count the number of existing update pages in the Updates database and increment by one. Use this as the week number in the title.

## Step 3: Draft the update

The update answers three questions. Use **bold text** for headings (not H2 markdown headers). Prefix each heading with a relevant emoji:

```
**⏪ What happened?**

[Content]

---

**🔄 What is happening?**

[Content]

---

**⏩ What will happen next?**

[Content]
```

### Writing principles

- **Concise and skimmable.** Assume the reader will spend 30–60 seconds on this. Every sentence should earn its place.
- **Specific over vague.** Name people, tools, ticket numbers, dates, and metrics. "Leif completed the access request analysis" is better than "metrics work was done."
- **Honest about blockers.** If something is stuck, say what it's stuck on and who or what needs to unblock it. Don't soften blockers into "we're working through some challenges."
- **No filler.** No "we're excited to share" or "great progress this week." Just state what happened.
- **British English spelling.** Prioritise, organisation, recognised, etc.
- **Sentence case for the page title.** Never use title case like "Mission Launched, Team Assembled." Use "Mission launched, team assembled."

### What happened (⏪)

Cover the period since the last update. What was completed? What decisions were made? What milestones were hit? Reference specific tasks that moved to Done or Review. Mention any new team members or structural changes.

### What is happening (🔄)

What is actively being worked on right now? Group by status where it helps (Building, In review, Blocked, Queued). For blocked items, always say what's blocking them. Mention any emerging architectural or strategic direction if it's crystallising from recent discussions.

### What will happen next (⏩)

What's planned for the coming week? Upcoming meetings, expected deliverables, decisions that need to be made. Be concrete — "kickoff meeting on Friday" not "we'll meet soon."

## Step 4: Confirm with the user before publishing

Present the draft to the user in the conversation. Ask if they want to adjust anything before it goes into Notion. The user may want to add context that wasn't visible in the tools, soften or sharpen language, or correct something.

## Step 5: Publish to Notion

Create a new page in the Updates database:

- **Parent data source:** `collection://31a39357-d847-80b3-9397-000bba0b12fe`
- **Properties:**
  - `Name`: "Week N — [short summary in sentence case]"
  - `date:Date:start`: today's date in ISO format (YYYY-MM-DD)
  - `date:Date:is_datetime`: 0
- **Content:** The formatted update using the three-section structure above

After publishing, share the Notion link with the user.

## Edge cases

- **Quiet week with little activity:** Still publish an update. A short update that says "no major movement, blocked on X" is better than no update. Maintaining the cadence matters.
- **User provides additional context in conversation:** Incorporate it. The tools won't capture everything — hallway conversations, decisions made in DMs, or strategic shifts communicated verbally are all valid inputs the user might add.
- **Multiple weeks since last update:** Note the gap honestly. Don't try to reconstruct a week-by-week breakdown — just cover the full period since the last update.
