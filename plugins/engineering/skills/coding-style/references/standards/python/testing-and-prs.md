# Testing and Pull Requests

Use this page for test conventions and review-ready change expectations.

## Testing conventions

- Use the repository's existing test runner; prefer `pytest` when none exists.
- Use the existing pytest async integration for async tests.
- Use coverage tooling only to identify consequential gaps, not to chase a number.
- Name tests with the pattern:
  `test_<what>_<condition>_<expected_result>`
- Mock only genuine external boundaries with existing test tools.
- When protocol drift is a real risk, compare exported vocabularies and exercise
  public encode/decode or execution paths with independent fixtures. Do not
  inspect private handlers or registries to achieve parity coverage.
- Choose representative protocol fixtures by distinct behavior and regression
  risk. Keep them hand-auditable; do not add one test per event merely for count.
- Test public interfaces only. Each test must protect consequential behavior;
  use `unit-test-coverage` for admission and failure triage.

## Fixture placement

- Put fixtures, doubles, and mock setup in the nearest relevant `conftest.py`.
- Use `@pytest.fixture(name="<name>")` to avoid
  `redefined-outer-name` warnings.
- Name fixture functions as `fixture_<name>`.

Example:

```python
@pytest.fixture(name="my_fixture")
def fixture_my_fixture() -> MyType:
    return MyType()
```

## Pull request expectations

- Add tests when the change needs them.
- Update documentation when the public behavior or workflow changes.
- Run the existing format, lint, typing, and required test commands.
- Run affected tests first; broaden to required repository gates and meaningful
  integration coverage for the changed risk.

Commit message and PR text rules live in the `create-pr` skill.
