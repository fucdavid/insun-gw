## Agent skills

### Issue tracker

Issues and PRDs for this repo live in GitHub Issues and use the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Use the default five-label triage vocabulary. See `docs/agents/triage-labels.md`.

### Domain docs

This repo uses a single-context domain docs layout. See `docs/agents/domain.md`.

## Frontend verification

When changing frontend UI or styling, do not rely only on jsdom/component tests. jsdom can confirm rendered DOM, but it does not prove that Tailwind/PostCSS output was generated or that the page is visually usable in a real browser.

For frontend changes, verify at least:

- `npm test`
- `npm run build`
- real browser rendering through the local dev server
- CSS bundle contains generated Tailwind rules when Tailwind classes are used

For visible page work, add Playwright or screenshot-based checks as soon as the project has browser-test tooling. Treat missing visual/browser verification as a test gap and mention it explicitly.
