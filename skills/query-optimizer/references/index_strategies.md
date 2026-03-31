# Database Index Strategies

## Index Types
- B-Tree: Default, good for ranges and equality
- Hash: Fast equality lookups only
- BRIN: Efficient for large tables with sorted data
- GiST: Geometric and text search

## When to Index
- Columns in WHERE clauses
- JOIN condition columns
- Columns used in ORDER BY
- Foreign key columns

## When NOT to Index
- Columns with low cardinality (< 100 unique values)
- Small tables (< 1000 rows)
- Columns with NULL values (unless specifically querying them)
- Frequently updated columns (index maintenance overhead)

## Composite Indexes
- Order matters: equality columns first, range columns last
- Leftmost prefix can be used independently
- Avoid redundant single-column indexes

## Monitoring
- pg_stat_user_indexes: Unused indexes
- EXPLAIN ANALYZE: Query plans
- Query duration trends over time
