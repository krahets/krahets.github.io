# krahets.com — Personal Academic Website

Single-page static site for Yudong Jin. Pure HTML + CSS, no framework, no build step. Deployable directly to Cloudflare Pages.

## File Structure

```
index.html          # Entire website — HTML, CSS, and JS in one file
assets/
  profile_light.jpg / profile_dark.jpg   # Avatar (theme-aware)
  favicon.png                            # Circular favicon (128×128)
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
- `--border` — dividers

**Type scale** — Lato (300/400/700 only). Available sizes: `--text-xs` (12px), `--text-sm` (14px), `--text-base` (16px), `--text-md` (18px), `--text-lg` (20px). No 500/600 weights — use 400 or 700.

**Chinese name** — 靳宇栋 uses `LXGW WenKai TC` (Google Fonts, 400 only).

**Spacing** — `--max-width: 760px`, fluid padding with `clamp()`.

## Dark Mode

- Toggled via `data-theme` attribute on `<html>`
- Anti-flash inline `<script>` in `<head>` reads `localStorage` and `prefers-color-scheme`
- JS at bottom of `<body>` handles toggle button + theme-aware badge URLs + avatar swap
- Dark theme images dimmed with `filter: brightness(0.82)` on `.pub__thumb`, `.book__thumb`, `.exp-card__icon`

## Sections & Classes

| Section | Key classes |
|---|---|
| About | `.about`, `.about__photo`, `.about__bio` |
| Publications | `.pub`, `.pub__thumb` (video, 220px, 16:9), `.badge`, `.pub__authors`, `.pub__title` |
| Open-Source | `.book`, `.book__thumb` (img, 220px, 16:9), `.badge`, `.book__title`, `.book__desc` |
| Experience | `.exp-grid` (2-col), `.exp-card`, `.exp-card__icon` (44×44px), `.exp-card__role/mentor/period` |
| Awards | `.award`, `.award__left`, `.award__name`, `.award__desc`, `.award__year` |
| Footer | `.site-footer` (flex, copyright left / source code right) |

## Badges

`.badge` — unified class for all section badges (CVPR 2025, ICCV 2025, #1 Trending GitHub Repo, Most-Read LeetBook). Displayed above the title. `--text-sm`, `--text-muted` color.

## Asset Conventions

- Publication thumbnails: `pub_<name>.mp4` — 852×480 (480p), H264 CRF26, no audio, `-preset slow -movflags faststart`
- Open-Source thumbnails: `book_<name>.jpg` — 852×480 (480p), center-cropped 16:9
- Experience icons: `exp_<company>.(jpg|png)` — displayed at 44×44px, `border-radius: 8px`
- Profile photos: `profile_light.jpg` / `profile_dark.jpg` — circular via CSS `border-radius: 50%`

## GitHub Star Badges

shields.io badges with theme-aware URL params. Updated on theme toggle via JS regex on `.gh-badge` `src`:
- Light: `style=flat&label=Stars&color=0071e3&labelColor=eaf4fe`
- Dark: `style=flat&label=Stars&color=6aa3f5&labelColor=1c2d44`

## Content

- **Owner**: Yudong Jin (靳宇栋), PhD student at Zhejiang University, advised by Prof. Xiaowei Zhou, mentored by Prof. Sida Peng
- **Education**: M.S. Shanghai Jiao Tong University, B.S. Xi'an Jiaotong University
- **Email**: krahetx@gmail.com
- **GitHub**: krahets | **X**: krahets
- **Research**: Spatial intelligence, lifting video models into 3D space to perceive the physical world
