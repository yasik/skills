# Maintain documentation

Use this guide when a change affects public behavior or documentation.
Find the repository's canonical documentation source, index, and publishing
configuration before editing. Preserve one maintained source of truth.

1. Use `docs-sync` to compare actual exports, defaults, examples, and supported
   workflows with the relevant public pages.
2. Update existing pages where possible. Update navigation or the index when
   adding, removing, or renaming a page.
3. Apply `dev-docs` to changed prose. Use direct instructions, sentence case,
   descriptive links, repository terminology, and verified examples.
4. Use `docs-portal` to discover and run the repository's applicable docs checks.
   A read-only audit reports gaps without editing or rebuilding.

Keep internal plans outside public navigation and search. Preserve source links
that work for repository readers and the supported renderer. Follow the site's
actual routing and heading rules; do not impose a particular generator or route
layout. Keep generated output out of version control unless publishing explicitly
requires it. A successful local build does not authorize deployment.
