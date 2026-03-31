# Git Commit Conventions

## Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

## Types
- feat: A new feature
- fix: A bug fix
- docs: Documentation only
- style: Changes that don't affect code meaning
- refactor: Code change without feature or fix
- perf: Performance improvement
- test: Adding or updating tests
- chore: Build, dependencies, tooling

## Subject Rules
- Use imperative mood ("add" not "added")
- Don't capitalize first letter
- No period (.) at the end
- Limit to 50 characters

## Body
- Explain what and why, not how
- Wrap at 72 characters
- Separate from subject with blank line

## Good Examples
```
feat(auth): implement two-factor authentication

Add optional 2FA with TOTP support for increased account security.
Users can enable/disable in account settings.

Closes #1234
```

```
fix(api): handle empty response body gracefully

Previously threw error when API returned 204 No Content.
Now returns null instead to match API contract.
```
