# Workspace packages

Before adding a package, justify the ownership boundary and inspect the root
manifest, lockfile, sibling packages, build configuration, and test discovery.
Reuse an existing package when it already owns the behavior.

## Python

Prefer a `src/` layout with explicit public exports and a `py.typed` marker for
a distributed typed package. An illustrative independent member looks like:

```text
packages/storage/
  pyproject.toml
  src/product_storage/
    __init__.py
    py.typed
    _implementation.py
  tests/
    conftest.py
    test_storage.py
```

Names are examples. Follow the target's distribution and import naming scheme.
Some repositories package several source trees through one root manifest;
others use independent workspace members. Preserve the existing model. Add a
member manifest and workspace registration only when that model requires them.
Declare direct dependencies at their owner, update the lockfile with the existing
package manager, and verify public imports and built wheel contents.

## TypeScript

Follow existing package boundaries and workspace registration. Keep an explicit
public `src/index.ts`, package-local tests, and strict checking of source and
tests. Separate build inputs so published output contains runtime code and type
declarations without shipping test fixtures or helpers. Match existing ESM/CJS
and export-map contracts; do not assume one module mode fits every consumer.

## Verification

Use the repository's dependency sync, format, lint, type-check, test, and package
build commands. Check built exports and supported consumers when packaging
changes. Do not create a new verification toolchain merely to add a package.
