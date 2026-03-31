# Common Bug Patterns

## Null Reference Errors
- Accessing properties on undefined/null
- Array access without bounds checking

## Type Mismatches
- String concatenation with numbers
- Object property access on primitives

## Off-by-One Errors
- Loop conditions (i < length vs i <= length)
- Array slicing boundaries

## Resource Leaks
- Open file handles without close
- Database connections not released
- Event listeners not removed
