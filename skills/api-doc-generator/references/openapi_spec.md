# OpenAPI 3.0 Specification

## Basic Structure

```yaml
openapi: 3.0.0
info:
  title: API Title
  version: 1.0.0
paths:
  /endpoint:
    get:
      summary: Get resource
      responses:
        200:
          description: Success
```

## Common Fields
- `paths`: API endpoints
- `components`: Reusable schemas
- `security`: Authentication schemes
- `tags`: Logical grouping

## Generating from Code
Use JSDoc comments with @param, @returns, @throws annotations.
