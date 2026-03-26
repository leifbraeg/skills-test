## Code Review: `example.py`

**Language:** Python
**Lines reviewed:** 42

---

### 🔴 Critical Bugs

**Line 17 – Off-by-one error in `process_items()`:**
The loop uses `range(len(items) + 1)`, which will try to access `items[len(items)]` on the final iteration — one past the end of the list. This raises `IndexError: list index out of range` on any non-empty input. Change to `range(len(items))`.

### 🟡 Likely Bugs

**Line 31 – Missing null check before `user["email"]`:**
`get_user()` can return `None` if the user ID doesn't exist (see line 8's early return). Accessing `user["email"]` without checking will raise `TypeError: 'NoneType' object is not subscriptable`. Add a null guard before the key access.

### 🟠 Edge Case Risks

**Line 24 – No validation of `count` parameter:**
If `count` is zero, `total / count` on line 26 raises `ZeroDivisionError`. If `count` is negative, it produces a nonsensical result. Add a guard: `if count <= 0: return 0`.

### ℹ️ Notes

**Line 44 – File path assumes current working directory:**
`open("output.csv")` writes relative to wherever the script is run from, which may not be predictable in production. Consider using `pathlib.Path(__file__).parent / "output.csv"` for a path relative to the script itself.

---

**Summary:** Two issues will cause runtime crashes on normal inputs: the off-by-one on line 17 and the unguarded null access on line 31. Fix those first. The division-by-zero risk on line 24 is an edge case but worth a one-line guard.
