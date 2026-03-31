#!/bin/bash

# Analyze git commit patterns and generate insights
# Usage: analyze_commits.sh [since] [until]

SINCE=${1:-"1 month ago"}
UNTIL=${2:-"today"}

echo "=== Git Commit Analysis ==="
echo "Period: $SINCE to $UNTIL"
echo ""

echo "Total commits:"
git log --oneline --since="$SINCE" --until="$UNTIL" | wc -l

echo ""
echo "Top contributors:"
git log --since="$SINCE" --until="$UNTIL" --format="%an" | sort | uniq -c | sort -rn | head -5

echo ""
echo "Most modified files:"
git log --since="$SINCE" --until="$UNTIL" --name-only --format="" | sort | uniq -c | sort -rn | head -5

echo ""
echo "Commits by type (from messages):"
git log --since="$SINCE" --until="$UNTIL" --format="%s" | grep -o "^[a-z]*" | sort | uniq -c | sort -rn | head -5

echo ""
echo "Average commit message length:"
git log --since="$SINCE" --until="$UNTIL" --format="%s" | awk '{print length}' | awk '{sum+=$1; count++} END {print int(sum/count) " characters"}'
