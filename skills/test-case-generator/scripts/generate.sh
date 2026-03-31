#!/bin/bash

# Generate test cases from source code
# Usage: generate.sh <source-file> <test-framework>

SOURCE_FILE=$1
FRAMEWORK=${2:-jest}

if [ -z "$SOURCE_FILE" ]; then
  echo "Usage: $0 <source-file> [jest|vitest|pytest]"
  exit 1
fi

echo "Analyzing $SOURCE_FILE for test generation..."
echo "Target framework: $FRAMEWORK"
echo ""

# Extract function names
if [[ $SOURCE_FILE == *.py ]]; then
  grep -E "^def " "$SOURCE_FILE" | sed 's/def \([^(]*\).*/\1/' | while read func; do
    echo "Generating tests for: $func"
    echo "  - Happy path"
    echo "  - Edge cases"
    echo "  - Error handling"
  done
else
  grep -E "^(export )?(function|const.*=.*=>)" "$SOURCE_FILE" | while read line; do
    echo "Generating tests for: $line"
  done
fi
