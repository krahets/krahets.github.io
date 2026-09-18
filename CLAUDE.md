# krahets.com — Personal Academic Website

Single-page static site for Yudong Jin. Plain HTML + CSS + vanilla JS, no framework, no build step. Deployable directly to Cloudflare Pages.

## File Structure

```
index.html          # Entire website — HTML, CSS, and JS in one file
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
- `--accent` — blue links
- `--accent-bg`, `--accent-border` — link pill hover fill and border
- `--button-color`, `--button-hover-bg` — section button colors, matching Apple homepage secondary buttons
- `--star-*` — GitHub star badge colors
- `--border` — dividers

**Type scale** — Lato (locally hosted, 400/700 only). Available sizes: `--text-xs` (12px), `--text-sm` (14px), `--text-base` (16px), `--text-md` (18px), `--text-lg` (20px). No 500/600 weights — use 400 or 700.

**Chinese name** — 靳宇栋 uses `LXGW WenKai TC` (locally hosted, 400 only; subset contains exactly 靳宇栋).

**Spacing** — `--max-width: 760px`, fluid padding with `clamp()`.

**Interaction timing** — All button, star bubble, theme-toggle, and contact-link hover transitions share `--interaction-duration: 0.04s` with `ease-out` in both directions. Theme changes remain instantaneous, and reduced-motion preferences still override transitions.

## Local Fonts

All fonts are served from `assets/fonts/` using inline `@font-face` rules with `font-display: swap`. The page has no runtime Google Fonts stylesheet, font requests, or preconnects. Text renders using fallback fonts while local WOFF2 files load. GitHub star counts still use their separate asynchronous API requests.

| Family / subset | Weights | Total size |
| --- | --- | --- |
| Lato Latin | 400, 700 | 28,148 bytes |
| Lato Latin Extended | 400, 700 | 6,016 bytes |
| LXGW WenKai TC, name-only subset | 400 | 1,912 bytes |
| **All bundled WOFF2 files** | | **36,076 bytes (35.2 KiB)** |

- Preserve the supplied `unicode-range` declarations: browsers request only the subsets required by the page's text. Lato 300 is unused and is not bundled.
- Lato files come from Google Fonts v25; the Chinese name subset comes from LXGW WenKai TC v10. The subset contains U+9773 (靳), U+5B87 (宇), and U+680B (栋). If the Chinese name changes or this font is used for other Chinese text, regenerate the subset and update its `unicode-range`.
- Font files retain their original font-family names. Their SIL Open Font License notices are included in `assets/fonts/LICENSE-Lato.txt` and `assets/fonts/LICENSE-LXGW-WenKai-TC.txt`; preserve these when redistributing the site. Sources: [Lato license](https://github.com/google/fonts/blob/main/ofl/lato/OFL.txt), [LXGW WenKai TC license](https://github.com/google/fonts/blob/main/ofl/lxgwwenkaitc/OFL.txt).
- To refresh fonts, request the [Lato CSS](https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap) and [name-subset CSS](https://fonts.googleapis.com/css2?family=LXGW+WenKai+TC&text=%E9%9D%B3%E5%AE%87%E6%A0%8B&display=swap) with a modern Chrome User-Agent to obtain WOFF2 URLs. Download the files, retain the provided weights and Unicode ranges, and update the inline `@font-face` rules to local paths.
- Filenames include the first 10 hexadecimal characters of each file's SHA-256 hash. If font contents change, update the filename and CSS reference so the existing immutable `/assets/*` cache policy does not serve stale files.
- Verify with Google Fonts domains blocked: the page should still render promptly, `document.fonts.ready` should resolve with local fonts loaded, and both themes and mobile layout should remain correct.

## Dark Mode

- Toggled via `data-theme` attribute on `<html>`. `applyTheme` temporarily disables transitions with `.theme-switching` and flushes styles before restoring them, so page and bubble colors switch together without flashing; normal hover transitions remain enabled.
- Anti-flash inline `<script>` in `<head>` reads `localStorage` and `prefers-color-scheme`
- JS at bottom of `<body>` handles toggle button, avatar swap, and GitHub star count loading
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
- `pub_4danyone.mp4` uses the approved 2026-09-18 teaser content: **[13, 19) seconds** of `../4danyone-release/page/.dev/outputs/fast_forward_video/4DAnyone_Fast_Forward.mp4`, matching `../4danyone-release/code/docs/assets/teaser.gif`. Keep the website's MP4 format and native 48fps (288 frames / 6.000s); derive from that high-quality MP4, not the palette-quantized GIF. Preserve the top Source Video / 4DGS Rendering capsule, transition and footer. Do not substitute the longer website teaser or replace the video element with a GIF.
- The source-only letterbox correction applies to Bruce Lee (top row, third column) and Doctor Strange (bottom row, first column); their contour masks follow the same crop. The 4DGS framing and the other ten sources are unchanged. Generate homepage previews from the corrected current Fast Forward MP4, not earlier source-grid crops.
- Open-Source thumbnails: `book_<name>.jpg` — 852×480 (480p), center-cropped 16:9
- Experience icons: `exp_<company>.(jpg|png)` — displayed at 44×44px, `border-radius: 8px`
- Profile photos: `profile_light.jpg` / `profile_dark.jpg` — circular via CSS `border-radius: 50%`

## GitHub Star Badges

Local HTML/CSS badges populated from the GitHub REST API. Each badge uses `.gh-badge[data-repo="owner/repo"]` with a decorative `.gh-badge__icon` using the inline Font Awesome Free solid star symbol and `.gh-badge__count`. Each repository link groups a blue `.pill` labeled `Code` with a slightly smaller star bubble on the right inside one clickable `.badge-link`. Star counts are cached in `localStorage` for 6 hours to avoid unnecessary API calls.

- The star bubble uses fully rounded corners, a short left-pointing CSS tip, a 6px gap from Code, no visible background fill, a `--star-border` matching the star icon color, and bold count text (Lato 700; medium gold `#c59630` light, muted gold `#d4b65e` dark). The bubble background matches the page background; the tip inherits that opaque color to mask its seam. Buttons and star counts use 13px (`0.8125rem`) text. Standard `.pill` buttons use `2px 9px` padding; the star bubble uses `1px 8px` to keep generous spacing while remaining smaller than Code. The star icon uses a stronger yellow (`#e3b341` light, `#d4b65e` dark). Button colors match [Apple homepage](https://www.apple.com/) secondary buttons: light `View pricing` uses `#0066cc` text and border; dark `Pre-order` uses `#2997ff`. Both start with a transparent background. Hover and keyboard focus use `#0076df` fill, white text, and a transparent border, with a 40ms ease-out transition in both directions. Within the repository link, Code uses this blue hover style, while the star bubble fills with its star color and both the icon and count turn white. The bubble background and foreground transitions also take 40ms in both directions; its tip inherits the fill and its border stays gold. A visible focus outline surrounds the entire link.
- Hides only the star bubble if the GitHub API fails and no cached count is available; the Code link remains usable.

## Maintenance Checklist

- Add publications by copying an existing `<article class="pub">`, updating title/authors/links, using a local `assets/pub_<name>.mp4`, and setting `data-repo="owner/repo"` on the star badge when a GitHub repo exists.
- Add open-source items by copying an existing `<article class="book">`, using a local `assets/book_<name>.jpg`, and setting the star badge `data-repo`.
- Keep all external links that open new tabs on `target="_blank" rel="noopener noreferrer"`.
- Use only loaded font weights: 400 or 700 for Lato; 400 for `LXGW WenKai TC`.
- Before publishing, run a local static server such as `python3 -m http.server 4173 --bind 127.0.0.1` and verify light/dark theme, responsive layout, media loading, and GitHub star badges.

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
