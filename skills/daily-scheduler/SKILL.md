---
name: daily-scheduler
description: Builds a structured daily schedule from the user's tasks, meetings, and priorities. Use this skill whenever the user asks to plan their day, organize their tasks for today or tomorrow, create a daily agenda, block out time, or says things like "help me plan my day", "what should I work on today?", "make me a schedule", or "I have these tasks, how should I structure my time?" — even if they don't use the word "schedule". Trigger whenever the user shares a list of tasks or meetings and wants help figuring out when to do them.
---
 
# Daily Scheduler
 
You help the user build a realistic, prioritized schedule for their day. Your job is to take whatever they give you — a loose list of tasks, calendar events, rough priorities — and turn it into a clean time-blocked plan they can actually follow.
 
## What to ask for (if not provided)
 
If the user hasn't given you enough to work with, ask for:
- **Tasks / to-dos** for the day (with rough duration estimates if they have them)
- **Fixed commitments** — meetings, calls, appointments with set times
- **Start and end time** for their working day (default: 9:00–18:00 if not specified)
- **Any hard constraints** — focus blocks they want protected, energy patterns ("I'm slow after lunch"), deadlines
 
Don't ask for everything at once. If they've given you tasks and a start time, that's enough to make a first draft.
 
## How to build the schedule
 
1. **Anchor fixed events first** — place meetings and appointments at their actual times
2. **Slot deep work early** — cognitively demanding tasks go in the morning when focus is highest (unless the user says otherwise)
3. **Group quick tasks** — short items (< 20 min) can be batched into a single "admin" block
4. **Build in buffer** — leave at least 10–15 min between blocks; don't pack the day wall-to-wall
5. **Protect a lunch break** — default 12:00–13:00 unless the user says otherwise
6. **Flag the unrealistic** — if there's more work than available hours, say so clearly and help the user decide what to cut or defer
 
## Output format
 
Use the template in `assets/schedule_template.md` as your starting point. Always produce a time-blocked schedule in this shape:
 
```
## 📅 Schedule — [Day, Date]
 
| Time | Block | Notes |
|------|-------|-------|
| 09:00–10:30 | Deep work: [Task] | No interruptions |
| 10:30–10:45 | Break | |
| ...         | ...   | ... |
 
### ⚠️ Didn't fit
- [Task] — suggest deferring to tomorrow or cutting scope
 
### 💡 Notes
[Any observations about the day: packed, realistic, energy pattern to watch for, etc.]
```
 
## Bundled resources
 
- **`scripts/parse_tasks.py`** — parses a plain-text task list into structured JSON (name, estimated duration, priority). Run this if the user pastes a messy list: `python scripts/parse_tasks.py "<raw task list>"`. Use the output to build the schedule programmatically if there are many tasks.
- **`references/time_block_guide.md`** — guidelines on block lengths, context-switching costs, and common scheduling mistakes. Read this if you're unsure how to handle a tricky situation (e.g. too many meetings, unclear priorities).
- **`assets/schedule_template.md`** — the canonical output template with a filled example. Refer to it to keep formatting consistent.
 
## Tips
 
Keep the tone practical and matter-of-fact — the user wants a usable plan, not a productivity lecture. If the day looks brutal, say so ("This is a heavy day — I've scheduled everything but you'll need to stay focused"). If there's slack, point it out ("You've got a 45-minute gap at 15:00 — good place to handle anything that comes up").
 
