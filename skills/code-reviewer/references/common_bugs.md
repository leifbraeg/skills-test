# Common Bug Patterns by Language

A quick reference for the kinds of issues most likely to appear in each language.
Use this when reviewing to make sure you haven't missed anything obvious.

---

## Python

- **Off-by-one in `range()`** — `range(len(xs) + 1)` goes out of bounds; `range(len(xs) - 1)` misses the last element.
- **Mutable default arguments** — `def f(items=[])` shares state across calls. Use `None` and initialize inside the function.
- **Unclosed file handles** — `open()` without a `with` block leaks descriptors. Always use `with open(...) as f`.
- **Silent `except`** — bare `except:` or `except Exception: pass` swallows errors and makes bugs invisible.
- **`is` vs `==`** — `x is None` is correct; `x == None` can be overridden by `__eq__`.
- **Integer division** — in Python 3, `/` always returns float; use `//` for integer division.

---

## JavaScript / TypeScript

- **`==` vs `===`** — loose equality coerces types in surprising ways (`0 == false`, `"" == false`). Use `===`.
- **`=` vs `===` in conditions** — `if (x = value)` assigns; `if (x === value)` compares.
- **Unhandled promise rejections** — `async` functions that throw without a `try/catch` or `.catch()` silently fail.
- **`null` / `undefined` dereference** — accessing a property on a value that might be null/undefined crashes at runtime.
- **`var` hoisting** — `var` is function-scoped and hoisted; prefer `const`/`let` to avoid surprises.
- **Async in loops** — `forEach` doesn't await; use `for...of` with `await` inside loops.

---

## Go

- **Ignored error returns** — Go functions return errors as values; ignoring them with `_` or no check is the #1 source of bugs.
- **Nil pointer dereference** — continuing after a failed operation that returns `nil` will panic on first field access.
- **Unclosed `rows` / `resp.Body`** — `sql.Rows` and `http.Response.Body` must be closed; use `defer rows.Close()`.
- **Missing `rows.Err()` check** — errors during row iteration are not returned by `rows.Next()`; always check after the loop.
- **Race conditions** — concurrent map writes or shared variable mutation without a mutex cause data races.
- **Shadowed `err`** — `:=` in nested scopes can shadow an outer `err`, masking errors.

---

## Java / Kotlin

- **`NullPointerException`** — the classic. Check for null before dereferencing, or use `Optional` / Kotlin's `?.` operator.
- **`equals()` vs `==`** — `==` compares references for objects; use `.equals()` for value comparison.
- **Unchecked casts** — `(MyType) obj` throws `ClassCastException` if the type is wrong; check with `instanceof` first.
- **Resource leaks** — streams, connections, and readers must be closed; use try-with-resources.
- **Integer overflow** — `int` arithmetic silently overflows; use `long` or `Math.addExact` for large values.

---

## Rust

- **Unwrapping without checking** — `.unwrap()` on `None` or `Err` panics; use `?`, `if let`, or `match`.
- **Integer overflow in debug vs release** — overflows panic in debug builds but silently wrap in release.
- **Borrowing after move** — using a value after it's been moved causes a compile error, but logic around `clone()` can introduce subtle inefficiencies or incorrect sharing.
