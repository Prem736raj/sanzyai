# GRAVITAS -- Engineering Reliability Runtime (Local dump for worker_m1)
Source: c:\Users\prem7\Downloads\sanzyai-main-20261016T152129Z-1-001\sanzyai-main\sanzyai-main\.agents\skills\gravitas\SKILL.md

Core Methodology:
Model-agnostic engineering reliability runtime.
Invariants:
1. Ground before mutating.
2. Stay in declared scope.
3. Completion needs evidence.
4. Never exact-retry a failure.
5. Satisfy the contract.
6. Say what you can't verify.
Output format: What Changed, Evidence, Why.
Verification: VERDICT: PASS / FAIL.
