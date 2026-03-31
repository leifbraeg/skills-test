# Performance Optimization Tips

## Common Bottlenecks

### Database Queries
- N+1 problem: Loading parent then fetching children in loop
- Missing indexes on frequently queried columns
- Unnecessary joins or large result sets
- Unoptimized aggregations

### Algorithm Complexity
- O(n²) operations in tight loops
- Nested iterations over large datasets
- Unneeded recursion (consider iteration)
- Inefficient string operations

### Memory
- Large data structures kept in memory
- Circular references preventing garbage collection
- Unnecessary object allocations
- Memory leaks from event listeners

### Caching Strategies
- Memoization for expensive computations
- HTTP caching with ETag/Last-Modified
- Redis for session data
- CDN for static assets

## Profiling Tools
- Chrome DevTools for frontend
- Node.js --prof flag for backend
- Apache JMeter for load testing
- Datadog/New Relic for production
