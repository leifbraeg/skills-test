#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Generate API documentation from JSDoc comments
 */
function extractJSDoc(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const jsdocRegex = /\/\*\*([\s\S]*?)\*\//g;
  const matches = content.matchAll(jsdocRegex);

  const docs = [];
  for (const match of matches) {
    docs.push({
      comment: match[1].trim(),
      line: content.substring(0, match.index).split('\n').length
    });
  }

  return docs;
}

function generateMarkdown(docs) {
  let md = '# API Documentation\n\n';
  docs.forEach((doc, i) => {
    md += `## Function ${i + 1}\n\n\`\`\`\n${doc.comment}\n\`\`\`\n\n`;
  });
  return md;
}

const targetFile = process.argv[2];
if (!targetFile) {
  console.error('Usage: generate.js <source-file>');
  process.exit(1);
}

const docs = extractJSDoc(targetFile);
const markdown = generateMarkdown(docs);
console.log(markdown);
