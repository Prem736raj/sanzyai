# GRAVITAS -- Engineering Reliability Runtime (Local Copy)
Source: c:\Users\prem7\Downloads\sanzyai-main-20261016T152129Z-1-001\sanzyai-main\sanzyai-main\.agents\skills\gravitas\SKILL.md

Key Methodology:
- 1. Ground before mutating.
- 2. Stay in declared scope.
- 3. Completion needs evidence (machine-verifiable output, not self-review).
- 4. Never exact-retry a failure.
- 5. Satisfy the contract.
- 6. Say what you can't verify.
- Verification hierarchy: test execution > compiler > static analysis > structural diff.
- Binary verdict: VERDICT: PASS or VERDICT: FAIL -- [reason].
