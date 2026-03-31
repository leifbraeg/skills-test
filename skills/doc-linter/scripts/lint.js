#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Lint documentation for quality issues
 */
function lintMarkdown(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];

  // Check for missing frontmatter
  if (!content.startsWith('---')) {
    issues.push({ level: 'warn', msg: 'Missing YAML frontmatter' });
  }

  // Check for headings
  if (!content.match(/^#+ /m)) {
    issues.push({ level: 'error', msg: 'No headings found' });
  }

  // Check for broken links
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const [, text, url] = match;
    if (!url.startsWith('http') && !url.startsWith('#')) {
      const fullPath = path.join(path.dirname(filePath), url);
      if (!fs.existsSync(fullPath)) {
        issues.push({
          level: 'error',
          msg: `Broken link: ${text} → ${url}`
        });
      }
    }
  }

  // Check for orphaned files (referenced but not linked)
  const headingMatch = content.match(/^(#+)\s+(.+)$/gm);
  if (!headingMatch || headingMatch.length < 3) {
    issues.push({
      level: 'warn',
      msg: 'Documentation appears sparse (< 3 sections)'
    });
  }

  return issues;
}

const target = process.argv[2];
if (!target) {
  console.error('Usage: lint.js <markdown-file>');
  process.exit(1);
}

const issues = lintMarkdown(target);
issues.forEach(issue => {
  const icon = issue.level === 'error' ? '❌' : '⚠️';
  console.log(`${icon} [${issue.level.toUpperCase()}] ${issue.msg}`);
});

process.exit(issues.some(i => i.level === 'error') ? 1 : 0);
