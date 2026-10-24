# Adaptation and maintenance

The 13 documents under `standards/` capture Python and TypeScript coding
preferences. They are adapted standards, not snapshots of a required framework.
The [source license](SOURCE-LICENSE) retains the original copyright notice.

- Read the target's instructions, manifests, lockfiles, and nearby code first.
- Keep explicit public contracts, useful module boundaries, and readable flow.
- Use existing tooling. New dependencies need a concrete capability gap.
- Infer whether Python packages share a root distribution or are independent
  workspace members. Do not create package manifests just to match an example.
- Use the target's actual public documentation root, navigation, and build.
- Tool schemas, execution context, cancellation, and permission handling must
  use existing application contracts. This guide grants no operational authority.
- Test examples illustrate meaningful public behavior; they do not mandate
  private helper coverage or one test per symbol.

Refresh these documents deliberately. Review semantic changes, retain license
notices, and validate links and representative workflows. Do not restore project
names, proprietary primitives, or fixed toolchain assumptions during a refresh.
