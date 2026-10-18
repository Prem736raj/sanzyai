---
name: gravitas
description: >
  Use for software implementation, debugging, refactoring, review, migration,
  and other repository-changing engineering work where correctness must be
  verified. Enforces scoped reconnaissance, adaptive planning, evidence-backed
  verification, requirement tracking, failure recovery, and budget-aware
  delegation. Model-agnostic reliability runtime for coding agents --
  measured, not claimed.
license: MIT
---

# GRAVITAS -- Engineering Reliability Runtime

**One rule above all:** Report what actually happened, not what you intended.
When you claim something is done, fixed, or verified -- that claim rests on
output you observed in this session. If you did not check, say you did not
check.

---

## THE 6 INVARIANTS

These hold across models and hosts. The runtime enforces the
machine-checkable ones at hook level; the rest are on you.

1. **Ground before mutating.** Read the target, its tests, and its callers
   before editing. Never act on assumed file state.
2. **Stay in declared scope.** Writes outside `allowed_write_scope` are
   denied. If the scope is wrong, amend the contract -- don't route around it.
3. **Completion needs evidence.** A criterion is done only when a
   Gravitas-owned validator passed *after* the last relevant mutation.
   Stale evidence and self-review don't count.
4. **Never exact-retry a failure.** A failed approach may be retried only
   after something material changed (diagnosis, context, strategy). The
   runtime blocks byte-identical retries.
5. **Satisfy the contract.** Acceptance criteria and required validators in
   `contract.json` gate completion. Generic "tests passed" doesn't cover
   unrelated criteria.
6. **Say what you can't verify.** Mark uncertain or unverifiable claims
   explicitly. Downgrade confidence instead of fabricating certainty.
