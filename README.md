# Soften

**Your Nervous System First Aid Kit** — free, instant, no sign-up required.

Soften is a multi-page React website offering evidence-informed nervous system regulation tools based on somatic principles and polyvagal theory.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/       Shared UI components (Navbar, Footer, SEO, ToolCard, etc.)
├── data/             Tool metadata (tools.js)
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── NotFound.jsx
│   ├── tools/        8 interactive tool pages
│   ├── checkin/      Daily check-in page + state definitions
│   ├── learn/        4 educational articles
│   └── blog/         Blog listing, individual posts, and post data files
├── utils/            localStorage helpers (checkInStorage.js)
└── router.jsx        React Router v6 config with lazy-loaded routes
```

## Adding a New Blog Post

1. Create a new file in `src/pages/blog/posts/` named `your-post-slug.js`
2. Export a default object with this shape:

```js
export default {
  slug: 'your-post-slug',
  title: 'Your Post Title',
  metaDescription: '150–160 char description for Google.',
  date: '2026-04-08',       // ISO date string
  readingTime: 6,            // estimated minutes
  category: 'Exercises',    // Exercises | Science | Daily Life | Recovery
  excerpt: 'First 1–2 sentences for the card preview.',
  author: 'Soften Editorial Team',
  content: `
## Your Heading

Paragraph text. Use **bold**, *italic*, and [links](/path).

## Another Heading

- List item one
- List item two
  `.trim(),
}
```

3. The post is automatically picked up by `posts/index.js` via `import.meta.glob` and appears in the blog listing immediately.

**Supported markdown in content:**
- `## Heading`, `### Subheading`
- `**bold**`, `*italic*`
- `[link text](/internal/path)` and `[link text](https://external.com)`
- `- list items`
- `---` horizontal rule
- `| table | headers |` with `|---|---|` separator row

## Customizing the Design

Colors, fonts, and animations are defined in `tailwind.config.js`:

```js
colors: {
  bg: '#FAF9F6',      // warm white background
  sage: '#7C9A8E',    // primary green
  clay: '#C4A484',    // secondary terracotta
  ocean: '#6B8FA3',   // accent blue
  charcoal: '#3D3D3D',// main text
  sos: '#E07A6A',     // SOS button coral
}
```

## SEO Notes

Every page uses `react-helmet-async` via the `<SEO>` component to set:
- `<title>` and `<meta name="description">`
- Open Graph tags (`og:title`, `og:description`, `og:url`, `og:image`)
- `<link rel="canonical">`
- JSON-LD structured data (HowTo on tool pages, Article on blog posts)

**For production SEO**, this React SPA needs pre-rendering so Google can index all routes. Options:

1. **Recommended: Migrate to Next.js or Astro** — gives full SSR/SSG with no architectural changes needed
2. **Vite SSG plugin** — `vite-plugin-ssg` adds static generation to this Vite setup
3. **Platform pre-rendering** — Netlify and Cloudflare Pages offer edge-side rendering that can pre-render React SPAs

Without pre-rendering, Google's crawler will index the site via JavaScript rendering, which works but is slower and less reliable than static HTML.

## Tech Stack

- **React 18** + **Vite 6**
- **React Router v6** — `createBrowserRouter` with lazy-loaded routes
- **react-helmet-async** — per-page SEO head management
- **Tailwind CSS v3** — utility classes with custom color palette
- **Framer Motion** — breathing animation and scroll reveals
- **localStorage** — check-in history and disclaimer banner state

## Not Affiliated

This site is not affiliated with Somatic Experiencing® International. It is an independent wellness resource.

## Disclaimer

Soften is for educational and self-care purposes only. Not therapy or medical advice. If you're in crisis: call or text **988**.
