#!/usr/bin/env node

/**
 * Simple performance profiler
 * Measures function execution time and identifies bottlenecks
 */

const timings = new Map();

function time(label, fn) {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  const duration = end - start;

  if (!timings.has(label)) {
    timings.set(label, []);
  }
  timings.get(label).push(duration);

  return result;
}

function report() {
  console.log('\n=== Performance Report ===\n');

  const sorted = Array.from(timings.entries())
    .map(([label, times]) => ({
      label,
      avg: times.reduce((a, b) => a + b, 0) / times.length,
      min: Math.min(...times),
      max: Math.max(...times),
      total: times.reduce((a, b) => a + b, 0)
    }))
    .sort((a, b) => b.total - a.total);

  sorted.forEach(({ label, avg, min, max, total }) => {
    console.log(`${label}`);
    console.log(`  Total: ${total.toFixed(2)}ms`);
    console.log(`  Avg:   ${avg.toFixed(2)}ms`);
    console.log(`  Min:   ${min.toFixed(2)}ms`);
    console.log(`  Max:   ${max.toFixed(2)}ms\n`);
  });
}

module.exports = { time, report };
