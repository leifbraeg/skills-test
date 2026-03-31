# Testing Best Practices

## Test Structure
- Arrange: Set up test data
- Act: Execute the function
- Assert: Verify results

## Coverage Targets
- Statements: 80%+
- Branches: 75%+
- Functions: 90%+
- Lines: 80%+

## Test Types
- Unit: Single function in isolation
- Integration: Multiple components together
- E2E: Full user workflows
- Performance: Response time and throughput

## Naming Conventions
```
test("description of what it does", () => { ... })
describe("ComponentName", () => { ... })
```
