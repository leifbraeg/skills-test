#!/usr/bin/env node

/**
 * Summarize pull request changes
 * Usage: summarize.js <base-commit> <head-commit>
 */

const { execSync } = require('child_process');

function getPRSummary(baseCommit, headCommit) {
  const diffStat = execSync(`git diff --stat ${baseCommit}..${headCommit}`).toString();
  const files = execSync(`git diff --name-only ${baseCommit}..${headCommit}`).toString().split('\n');

  const stats = {
    filesChanged: files.length - 1,
    additions: 0,
    deletions: 0,
    impact: 'low'
  };

  const lines = diffStat.split('\n');
  for (const line of lines) {
    const match = line.match(/(\d+)\s+\+|(\d+)\s+-/);
    if (match) {
      if (match[1]) stats.additions += parseInt(match[1]);
      if (match[2]) stats.deletions += parseInt(match[2]);
    }
  }

  if (stats.additions + stats.deletions > 500) {
    stats.impact = 'high';
  } else if (stats.additions + stats.deletions > 100) {
    stats.impact = 'medium';
  }

  return stats;
}

const [base, head] = process.argv.slice(2);
if (!base || !head) {
  console.error('Usage: summarize.js <base-commit> <head-commit>');
  process.exit(1);
}

const summary = getPRSummary(base, head);
console.log(JSON.stringify(summary, null, 2));
