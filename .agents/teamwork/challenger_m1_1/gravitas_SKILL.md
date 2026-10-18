# GRAVITAS -- Engineering Reliability Runtime (Local Copy)
Source: c:\Users\prem7\Downloads\sanzyai-main-20261016T152129Z-1-001\sanzyai-main\sanzyai-main\.agents\skills\gravitas\SKILL.md

The 6 Invariants:
1. Ground before mutating. Read the target, its tests, and its callers before editing. Never act on assumed file state.
2. Stay in declared scope. Writes outside allowed_write_scope are denied.
3. Completion needs evidence. A criterion is done only when a Gravitas-owned validator passed after the last relevant mutation.
4. Never exact-retry a failure.
5. Satisfy the contract.
6. Say what you can't verify.

Verification Hierarchy:
Executable evidence over prose:
1. Hidden deterministic acceptance validator
2. External integration / runtime execution
3. Project tests
4. Compiler / type checker
5. Deterministic static analysis
6. Executable reproducer
7. Structural / diff invariant
8. Independent model review
9. Same-model self-review

Every verification ends with:
VERDICT: PASS or VERDICT: FAIL -- [reason] with failing output.
