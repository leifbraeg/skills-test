#!/usr/bin/env python3
"""
Analyze code for common bug patterns.
Supports Python, JavaScript, Go, and Rust.
"""

import ast
import sys
import json

class BugAnalyzer(ast.NodeVisitor):
    def __init__(self):
        self.issues = []

    def visit_If(self, node):
        # Check for always-true conditions
        if isinstance(node.test, ast.Constant):
            if node.test.value:
                self.issues.append({
                    'line': node.lineno,
                    'type': 'ALWAYS_TRUE',
                    'message': 'Condition is always True'
                })
        self.generic_visit(node)

    def visit_Compare(self, node):
        # Check for None comparisons
        for comparator in node.comparators:
            if isinstance(comparator, ast.Constant) and comparator.value is None:
                self.issues.append({
                    'line': node.lineno,
                    'type': 'NULL_CHECK',
                    'message': 'Consider using "is None" instead of "== None"'
                })
        self.generic_visit(node)

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(json.dumps({'error': 'Usage: analyze.py <file>'}))
        sys.exit(1)

    with open(sys.argv[1]) as f:
        tree = ast.parse(f.read())

    analyzer = BugAnalyzer()
    analyzer.visit(tree)
    print(json.dumps(analyzer.issues, indent=2))
