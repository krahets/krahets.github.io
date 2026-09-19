# krahets.com — Personal Academic Website

Single-page static site for Yudong Jin. Plain HTML + CSS + vanilla JS, no framework, no build step. Deployable directly to Cloudflare Pages.

## File Structure

```
index.html          # Static content, semantic markup, tiny theme bootstrap
styles.css          # Fonts, themes, shared components and responsive layout
script.js           # Theme preference and GitHub star counts (deferred)
_headers            # Cloudflare Pages caching and security headers
assets/
  fonts/                                # Local WOFF2 fonts and SIL OFL licenses
  profile_light.jpg / profile_dark.jpg   # Avatar (theme-aware)
  favicon.png                            # Circular favicon (128×128)
  pub_4danyone.mp4                       # Publication preview video
  pub_lingbot_va_v2.mp4                  # Publication preview video
  pub_pointsplat.mp4                     # Publication preview video
  pub_scal3r.mp4                         # Publication preview video
  pub_diffuman4d.mp4                     # Publication preview video
  pub_envgs.mp4                          # Publication preview video
  book_hello_algo.jpg                    # Open-Source section thumbnail
  book_illustration.jpg                  # Open-Source section thumbnail
  exp_robbyant.jpg / exp_antgroup.png    # Experience card icons
```

## Design System

**Colors** — OKLCH perceptually uniform color tokens, defined on `:root` and `[data-theme="dark"]`:

- `--bg`, `--text-primary`, `--text-secondary`, `--text-muted` — neutrals
- `--accent` — blue links and button text/borders
- `--accent-bg`, `--accent-border` — theme-toggle hover fill and border
- `--button-hover-bg` — filled button hover color, matching Apple homepage secondary buttons
- `--star-*` — GitHub star badge colors
- `--border` — dividers

**Type scale** — Lato (locally hosted, 400/700 only). Sizes: `--text-button` (13px), `--text-sm` (14px), `--text-base` (16px), `--text-lg` (20px), and fluid `--text-name` (24–32px). No 500/600 weights — use 400 or 700.

**Chinese name** — 靳宇栋 uses `LXGW WenKai TC` (locally hosted, 400 only; subset contains exactly 靳宇栋).

**Spacing** — `--max-width: 760px`, fluid padding with `clamp()`.

**Interaction timing** — All button, star bubble, theme-toggle, and contact-link hover transitions share `--interaction-duration: 0.04s` with `ease-out` in both directions. Theme changes remain instantaneous, and reduced-motion preferences still override transitions.

## Local Fonts

All fonts are served from `assets/fonts/` using `@font-face` rules in `styles.css` with `font-display: swap`. The page has no runtime Google Fonts stylesheet, font requests, or preconnects. Text renders using fallback fonts while local WOFF2 files load. GitHub star counts still use their separate asynchronous API requests.

| Family / subset | Weights | Total size |
| --- | --- | --- |
| Lato Latin | 400, 700 | 28,148 bytes |
| Lato Latin Extended | 400, 700 | 6,016 bytes |
| LXGW WenKai TC, name-only subset | 400 | 1,912 bytes |
| **All bundled WOFF2 files** | | **36,076 bytes (35.2 KiB)** |

- Preserve the supplied `unicode-range` declarations: browsers request only the subsets required by the page's text. Lato 300 is unused and is not bundled.
- Lato files come from Google Fonts v25; the Chinese name subset comes from LXGW WenKai TC v10. The subset contains U+9773 (靳), U+5B87 (宇), and U+680B (栋). If the Chinese name changes or this font is used for other Chinese text, regenerate the subset and update its `unicode-range`.
- Font files retain their original font-family names. Their SIL Open Font License notices are included in `assets/fonts/LICENSE-Lato.txt` and `assets/fonts/LICENSE-LXGW-WenKai-TC.txt`; preserve these when redistributing the site. Sources: [Lato license](https://github.com/google/fonts/blob/main/ofl/lato/OFL.txt), [LXGW WenKai TC license](https://github.com/google/fonts/blob/main/ofl/lxgwwenkaitc/OFL.txt).
- To refresh fonts, request the [Lato CSS](https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap) and [name-subset CSS](https://fonts.googleapis.com/css2?family=LXGW+WenKai+TC&text=%E9%9D%B3%E5%AE%87%E6%A0%8B&display=swap) with a modern Chrome User-Agent to obtain WOFF2 URLs. Download the files, retain the provided weights and Unicode ranges, and update the `@font-face` rules in `styles.css` to local paths.
- Filenames include the first 10 hexadecimal characters of each file's SHA-256 hash. When replacing a font, update the hash and its CSS reference together.
- Verify with Google Fonts domains blocked: the page should still render promptly, `document.fonts.ready` should resolve with local fonts loaded, and both themes and mobile layout should remain correct.

## Dark Mode

- Toggled via `data-theme` attribute on `<html>`. `applyTheme` temporarily disables transitions with `.theme-switching` and flushes styles before restoring them, so page and bubble colors switch together without flashing; normal hover transitions remain enabled.
- A small inline bootstrap before the stylesheet resolves the initial theme. Only `light`/`dark` preferences are valid; missing, invalid or inaccessible storage falls back to the system preference.
- Deferred `script.js` initializes theme behavior and star counts inside a private scope. Theme icons are static SVGs in HTML; CSS chooses the visible icon and JS updates `aria-pressed` and the avatar.
- Follow system theme changes until the user explicitly toggles. A manual choice remains effective for the session even if storage writes fail.
- Dark theme images dimmed with `filter: brightness(0.82)` on `.pub__thumb`, `.book__thumb`, `.exp-card__icon`

## Sections & Classes

| Section      | Key classes                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------------ |
| About        | `.about`, `.about__photo`, `.about__bio`                                                               |
| Publications | `.pub`, `.pub__thumb` (video, 240px, 16:9), `.badge`, `.badge__accent`, `.pub__authors`, `.pub__title` |
| Open-Source  | `.book`, `.book__thumb` (img, 240px, 16:9), `.badge`, `.book__title`, `.book__desc`                    |
| Experience   | `.exp-grid` (2-col), `.exp-card`, `.exp-card__icon` (44×44px), `.exp-card__role/mentor/period`         |
| Awards       | `.award`, `.award__left`, `.award__name`, `.award__desc`, `.award__year`                               |
| Footer       | `.site-footer` (flex, copyright left / source code right)                                              |

## Badges

`.badge` — unified class for section badges, including venue strings such as `CVPR 2026 (Highlight)`, `ICCV 2025`, and non-paper badges such as `#1 Trending GitHub Repo in 2023`. Displayed above the title.

`.badge__accent` — inline text accent used only for emphasized badge fragments such as `Highlight`. Pure text styling only; no pill background, border, or extra left margin.

## Asset Conventions

- Publication thumbnails: `pub_<name>.mp4` — 852×480 (480p), H264 CRF23, no audio, `-preset medium -movflags faststart`
- `pub_4danyone.mp4` uses the approved 2026-09-19 rebuilt teaser content: **[13, 19) seconds** of `../4danyone-release/page/.dev/outputs/fast_forward_video/4DAnyone_Fast_Forward.mp4`, matching `../4danyone-release/code/docs/assets/teaser.gif`. Keep the website's MP4 format and native 48fps (288 frames / 6.000s); derive from that high-quality MP4, not the palette-quantized GIF. Preserve the top Source Video / 4DGS Rendering capsule, transition and footer. Do not substitute the longer website teaser or replace the video element with a GIF.
- The source-only letterbox correction applies to Bruce Lee (top row, third column), Doctor Strange (bottom row, first column), and Liang Bo (bottom row, fourth column); their contour masks follow the same crop. The 4DGS framing and other nine source crops are unchanged. Generate homepage previews from the corrected current Fast Forward MP4, not earlier source-grid crops. Current MP4 SHA-256: `8ce377456e7e532f921071a6472da0e9b04d1bde23ebacb4e834a10784f29753`.
- Open-Source thumbnails: `book_<name>.jpg` — 852×480 (480p), center-cropped 16:9
- Experience icons: `exp_<company>.(jpg|png)` — displayed at 44×44px, `border-radius: 8px`
- Profile photos: `profile_light.jpg` / `profile_dark.jpg` — circular via CSS `border-radius: 50%`

## GitHub Star Badges

Each repository link contains a `Code` pill and a smaller capsule with a short left-pointing tip. The star icon uses the shared SVG sprite. Mark the bubble with `.gh-badge[data-repo="owner/repo"]`, `hidden`, and `role="img"`; its `.gh-badge__count` starts empty. The Code link works without JavaScript or the API.

- The bubble appears only when a valid count is available. `script.js` sets its compact count and accessible label with the full count and repository name.
- Cache valid nonnegative integer counts in `localStorage` under `github-stars:owner/repo` for six hours. Preserve this key format across updates. Corrupt counts/timestamps are ignored; a future timestamp never qualifies as a fresh cache entry.
- Display cached data immediately. Refresh stale counts in the background with a five-second request timeout. Network/API errors retain stale counts; without a cache, the bubble stays hidden. Storage failures do not break theme controls or API loading.
- Default bubble fill matches the page to mask the tip seam. Its border and star share the theme's gold color; the count has its own token for light-theme readability.
- Hover/focus fills Code blue and the bubble gold, with white text/icon. All color transitions use the shared 40ms token; keyboard focus outlines the whole link. Exact colors and padding live in `styles.css`.

## Structure and Caching

- Edit content directly in `index.html`. Publication and book titles are `h3` headings under section `h2` headings; the page's sections are inside `main`, with the site footer outside it.
- Shared CSS selectors cover publication/book layouts and thumbnails; keep content-specific differences in their own rules. The Chinese name uses `.about__name-cn`, with no inline presentation styles.
- Below-fold book and experience images have explicit dimensions and native lazy loading. Publication videos keep autoplay/loop behavior and use `preload="metadata"`; no media assets are re-encoded as part of code maintenance.
- `_headers` allows caching but requires revalidation for every file. Media filenames are reused during updates, so do not restore year-long immutable caching for all of `/assets/`. CSS and JS are plain files without a build or filename-versioning pipeline and must also revalidate.
- Cloudflare Pages applies `_headers`; Python's local static server does not. Font hashes are retained for provenance, but use the same revalidation policy.
- No framework, bundler, runtime content templates, package installation, or build step is needed. Existing tool metadata such as `skills-lock.json` is unrelated to page loading.

## Maintenance Checklist

- Add publications by copying an existing `<article class="pub">`, updating title/authors/links, using a local `assets/pub_<name>.mp4`, and setting `data-repo="owner/repo"` on the star badge when a GitHub repo exists.
- Add open-source items by copying an existing `<article class="book">`, using a local `assets/book_<name>.jpg`, and setting the star badge `data-repo`.
- Keep all external links that open new tabs on `target="_blank" rel="noopener noreferrer"`.
- Use only loaded font weights: 400 or 700 for Lato; 400 for `LXGW WenKai TC`.
- Preview with `python3 -m http.server 4173 --bind 127.0.0.1`. Check desktop/mobile layout, light/dark switching, keyboard focus, local fonts and media.
- Check star counts with fresh/stale/corrupt cache data, API failure and timeout; Code must remain usable. Check theme behavior with blocked storage, an invalid saved theme and system-theme changes.
- Run `node --check script.js` and `git diff --check`. Keep temporary browser-check scripts/screenshots outside the repository; no test-tool dependency is required to serve the site.

## Content

- **Owner**: Yudong Jin (靳宇栋), fourth-year PhD student (expected to graduate in 2027) at Zhejiang University, advised by Prof. Xiaowei Zhou and Prof. Sida Peng
- **Education**: M.Eng. Shanghai Jiao Tong University, B.Eng. Qianxuesen Class at Xi'an Jiaotong University
- **Email**: krahetx@gmail.com
- **GitHub**: krahets | **X**: krahets
- **Research**: Spatial intelligence, lifting video models into 3D space to perceive the physical world
- **Publications currently shown**:
  - `4DAnyone` — SIGGRAPH Asia 2026, local preview video `assets/pub_4danyone.mp4`
  - `LingBot-VA 2.0` — arXiv 2026, local preview video `assets/pub_lingbot_va_v2.mp4`
  - `PointSplat` — ECCV 2026, local preview video `assets/pub_pointsplat.mp4`
  - `Scal3R` — CVPR 2026 (`Highlight` accented inline), local preview video `assets/pub_scal3r.mp4`
  - `Diffuman4D` — ICCV 2025, local preview video `assets/pub_diffuman4d.mp4`
  - `EnvGS` — CVPR 2025, local preview video `assets/pub_envgs.mp4`
