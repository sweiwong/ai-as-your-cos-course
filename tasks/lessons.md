# Lessons Learned

## Meta-Patterns (apply to every session)

1. **Content ages faster than code.** Any page that references external tools (install commands, UI screenshots, pricing) will go stale. Periodically audit these pages against official docs — especially before sharing with readers.

2. **Test with the actual audience, not just the build.** `npm run build` passing tells you nothing about whether a reader can follow the instructions. Real validation = someone walking through the experience end-to-end. For CSS, that means looking at it visually in both themes.

3. **Be explicit with non-technical readers.** "Close your terminal" means different things to different people. Every instruction that seems obvious to a technical person needs to be spelled out for this audience (e.g., "Quit Terminal with Cmd+Q"). This applies to the whole course, not just installation.

4. **Commit smaller, push sooner.** Don't let finished work sit locally unpushed. Don't bundle unrelated changes into one commit. Smaller units = easier rollback, less risk of losing work, and readers get updates faster.

---

## 2026-02-27: Dark Mode Regression During Light Mode Fix

**What happened:** Refactored `app/global.css` to add light mode colors. Moved dark colors under `.dark` scoping. Dark mode broke because `body` got an explicit light `background-color` but `.dark body` only overrode `background-image`, not `background-color`.

**Root cause (confirmed):** The `.dark body` block was missing `background-color`. The light `hsl(40 20% 98%)` bled through in dark mode. Additionally, `var(--color-fd-background)` did NOT work as a fix — Tailwind v4's `@theme` layer system prevented the CSS variable from resolving correctly in the `.dark body` context. Had to use the explicit HSL value `hsl(220 20% 12%)`.

**Rules to prevent this:**
1. **Always verify BOTH light and dark mode visually before committing CSS changes** — build passing means nothing for visual correctness
2. **When refactoring CSS for theme support, test the EXISTING theme first** (dark mode was working → verify it still works before checking light mode)
3. **Every property on a base selector needs a `.dark` counterpart** — if `body` sets `background-color`, `.dark body` MUST also set `background-color`
4. **Tailwind v4 + CSS variables caveat** — don't use `var(--color-fd-*)` in `.dark` element selectors; use explicit HSL values instead
5. **Smaller commits** — should have committed light mode fix and dark mode preservation separately so rollback is easy

## 2026-02-27: Light Mode Body Gradient

**What happened:** First attempt used radial gradients (gold + purple) on light background. User said it looked uneven/messy. Then tried `background-image: none` which revealed a harsh pink undertone from Fumadocs defaults.

**Fix:** Set explicit `background-color: hsl(40 20% 98%)` (soft warm white) with `background-image: none`. Clean and uniform.

**Rule:** Radial gradient blobs that work on dark backgrounds look terrible on light backgrounds. For light mode, prefer flat or very subtle linear gradients.

## 2026-03-03: Installation Page Had Wrong Prerequisites

**What happened:** A reader couldn't install Claude Code following our installation page. The page listed Node.js 18+ as a prerequisite and had a full "check/install Node.js" step. The native installer (`curl ... | bash` / `irm ... | iex`) does NOT require Node.js — that's only for the deprecated npm install method. Reader also hit `command not found` after install (PATH not refreshed).

**Root cause:** Installation instructions were written when npm was the primary install method. Anthropic switched to a native installer that has no Node.js dependency, but the page wasn't updated.

**Rules to prevent this:**
1. **Verify install/setup instructions against official docs before publishing** — upstream tools change their install methods
2. **For non-technical audiences, "close your terminal" is ambiguous** — be explicit: "Quit Terminal with Cmd+Q" or "Close the PowerShell window"
3. **When a reader reports a problem, check the official source of truth first** — don't assume our docs are current
4. **Windows has different prerequisites than Mac** — always check platform-specific requirements (e.g., Git for Windows is required but wasn't mentioned)
