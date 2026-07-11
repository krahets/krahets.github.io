# krahets.com — Personal Academic Website

Single-page static site for Yudong Jin. Plain HTML + CSS + vanilla JS, no framework, no build step. Deployable directly to Cloudflare Pages.

## File Structure

```
index.html          # Entire website — HTML, CSS, and JS in one file
assets/
  profile_light.jpg / profile_dark.jpg   # Avatar (theme-aware)
  favicon.png                            # Circular favicon (128×128)
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
- `--star-*` — GitHub star badge colors
- `--border` — dividers

**Type scale** — Lato (300/400/700 only). Available sizes: `--text-xs` (12px), `--text-sm` (14px), `--text-base` (16px), `--text-md` (18px), `--text-lg` (20px). No 500/600 weights — use 400 or 700.

**Chinese name** — 靳宇栋 uses `LXGW WenKai TC` (Google Fonts, 400 only).

**Spacing** — `--max-width: 760px`, fluid padding with `clamp()`.

## Dark Mode

- Toggled via `data-theme` attribute on `<html>`
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
- Open-Source thumbnails: `book_<name>.jpg` — 852×480 (480p), center-cropped 16:9
- Experience icons: `exp_<company>.(jpg|png)` — displayed at 44×44px, `border-radius: 8px`
- Profile photos: `profile_light.jpg` / `profile_dark.jpg` — circular via CSS `border-radius: 50%`

## GitHub Star Badges

Local HTML/CSS badges populated from the GitHub REST API. Each badge uses `.gh-badge[data-repo="owner/repo"]` with a decorative `.gh-badge__icon` using the inline Font Awesome Free solid star symbol and `.gh-badge__count`. Display format is a star icon plus count. Star counts are cached in `localStorage` for 6 hours to avoid unnecessary API calls.

- Default style is an informational chip with transparent `--star-bg`, GitHub-like yellow `--star-icon` (`#e3b341` light, `#f2cc60` dark), readable yellow `--star-text` for the count, and a subtle yellow `--star-border`; hover mirrors `.pill` behavior by only adding yellow `--star-hover-bg`
- Hides the star pill if the GitHub API fails and no cached count is available

## Maintenance Checklist

- Add publications by copying an existing `<article class="pub">`, updating title/authors/links, using a local `assets/pub_<name>.mp4`, and setting `data-repo="owner/repo"` on the star badge when a GitHub repo exists.
- Add open-source items by copying an existing `<article class="book">`, using a local `assets/book_<name>.jpg`, and setting the star badge `data-repo`.
- Keep all external links that open new tabs on `target="_blank" rel="noopener noreferrer"`.
- Use only loaded font weights: 300, 400, or 700 for Lato; 400 for `LXGW WenKai TC`.
- Before publishing, run a local static server such as `python3 -m http.server 4173 --bind 127.0.0.1` and verify light/dark theme, responsive layout, media loading, and GitHub star badges.

## Content

- **Owner**: Yudong Jin (靳宇栋), PhD student at Zhejiang University, advised by Prof. Xiaowei Zhou, mentored by Prof. Sida Peng
- **Education**: M.S. Shanghai Jiao Tong University, B.S. Qianxuesen Class at Xi'an Jiaotong University
- **Email**: krahetx@gmail.com
- **GitHub**: krahets | **X**: krahets
- **Research**: Spatial intelligence, lifting video models into 3D space to perceive the physical world
- **Publications currently shown**:
  - `PointSplat` — ECCV 2026, local preview video `assets/pub_pointsplat.mp4`
  - `Scal3R` — CVPR 2026 (`Highlight` accented inline), local preview video `assets/pub_scal3r.mp4`
  - `Diffuman4D` — ICCV 2025, local preview video `assets/pub_diffuman4d.mp4`
  - `EnvGS` — CVPR 2025, local preview video `assets/pub_envgs.mp4`
