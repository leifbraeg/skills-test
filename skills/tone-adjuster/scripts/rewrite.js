#!/usr/bin/env node

/**
 * Rewrite text in different tones
 * Usage: node rewrite.js "text" "tone"
 */

const tones = {
  formal: (text) => text.replace(/\b(hey|gonna|wanna|kinda)\b/gi, (m) => ({
    'hey': 'hello',
    'gonna': 'going to',
    'wanna': 'want to',
    'kinda': 'somewhat'
  }[m.toLowerCase()])),

  casual: (text) => text.replace(/\b(hello|therefore|however)\b/gi, (m) => ({
    'hello': 'hey',
    'therefore': 'so',
    'however': 'but'
  }[m.toLowerCase()])),

  sarcastic: (text) => `Oh sure, ${text.toLowerCase()} 🙄`,
};

const text = process.argv[2] || '';
const tone = process.argv[3] || 'formal';

if (tones[tone]) {
  console.log(tones[tone](text));
} else {
  console.error(`Unknown tone: ${tone}`);
  process.exit(1);
}
