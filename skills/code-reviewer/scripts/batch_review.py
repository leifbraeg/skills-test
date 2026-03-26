#!/usr/bin/env python3
"""
batch_review.py — scan a directory and list all reviewable code files.

Usage (from within a skill run):
    python scripts/batch_review.py <directory>

Outputs a JSON list of file paths that the skill should review, filtered to
supported languages and ignoring common non-review targets (tests, generated
files, lock files, etc.).
"""

import json
import sys
from pathlib import Path

# File extensions the skill knows how to review
REVIEWABLE_EXTENSIONS = {
    ".py", ".js", ".ts", ".jsx", ".tsx",
    ".go", ".rs", ".java", ".kt", ".swift",
    ".c", ".cpp", ".h", ".cs", ".rb", ".php",
}

# Directories to skip entirely
SKIP_DIRS = {
    "node_modules", ".git", "__pycache__", ".venv", "venv",
    "dist", "build", ".next", "vendor", "target",
}

# File name patterns to skip
SKIP_PATTERNS = {
    ".min.js", ".generated.", "_pb2.py", ".lock",
}


def should_skip(path: Path) -> bool:
    name = path.name
    return any(pat in name for pat in SKIP_PATTERNS)


def collect_files(root: Path) -> list[str]:
    results = []
    for path in sorted(root.rglob("*")):
        if path.is_dir():
            continue
        if any(part in SKIP_DIRS for part in path.parts):
            continue
        if path.suffix not in REVIEWABLE_EXTENSIONS:
            continue
        if should_skip(path):
            continue
        results.append(str(path))
    return results


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: batch_review.py <directory>", file=sys.stderr)
        sys.exit(1)

    root = Path(sys.argv[1])
    if not root.exists():
        print(f"Directory not found: {root}", file=sys.stderr)
        sys.exit(1)

    files = collect_files(root)
    print(json.dumps(files, indent=2))
