# devstevers-astro-contentful-clone

A Contentful‑editable Astro clone of **devstevers.com** with matching structure, system‑UI font feel, simple black‑on‑white palette, and gear icons.

> Note: The live site appears to be a minimalist, hand‑coded page that uses default system fonts, black text on a white background, and simple “gear” decorative icons alongside social links and sections (based on the page content we fetched). This bundle mirrors that visual language and structure while making all copy/images editable from Contentful.

---

## 1) File tree

```
.
├─ astro.config.mjs
├─ package.json
├─ postcss.config.cjs
├─ tailwind.config.cjs
├─ tsconfig.json
├─ .gitignore
├─ .env.example
├─ src/
│  ├─ env.d.ts
│  ├─ styles.css
│  ├─ lib/
│  │  ├─ contentful.ts
│  │  └─ types.ts
│  ├─ components/
│  │  ├─ Header.astro
│  │  ├─ GearIcon.astro
│  │  ├─ PortfolioGrid.astro
│  │  └─ Socials.astro
│  ├─ pages/
│  │  └─ index.astro
│  └─ images/
│     └─ placeholder-*.jpg
├─ public/
│  └─ favicon.svg
└─ scripts/
   ├─ setup-contentful.mjs
   └─ seed-contentful.mjs
```

---

## 2) package.json

```json
{
  "name": "devstevers-astro-contentful-clone",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "contentful:setup": "node scripts/setup-contentful.mjs",
    "contentful:seed": "node scripts/seed-contentful.mjs"
  },
  "dependencies": {
    "astro": "^4.15.0",
    "contentful": "^10.5.2",
    "dotenv": "^16.4.5"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.14",
    "typescript": "^5.6.3"
  }
}
```

---

## 3) astro.config.mjs

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://example.com',
  server: { port: 3000 },
});
```

---

## 4) tailwind.config.cjs

```js
module.exports = {
  content: ['./src/**/*.{astro,html,js,ts}'],
  theme: {
    extend: {
      colors: {
        // minimal black-on-white aesthetic like the original site
        body: '#0f172a', // slate-900-ish text
        link: '#1d4ed8', // defaultish link hue
      },
      fontFamily: {
        // system UI stack mirrors "default browser font" feel
        sans: [
          'ui-sans-serif','system-ui','-apple-system','Segoe UI','Roboto','Ubuntu','Cantarell',
          'Noto Sans','Helvetica Neue','Arial','\"Apple Color Emoji\"','\"Segoe UI Emoji\"'
        ],
        mono: ['ui-monospace','SFMono-Regular','Menlo','Monaco','Consolas','Liberation Mono','Courier New','monospace']
      }
    }
  },
  plugins: []
};
```

---

## 5) postcss.config.cjs

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

---

## 6) tsconfig.json

```json
{
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {},
    "types": ["astro/client"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "target": "ES2020"
  }
}
```

---

## 7) .gitignore

```
node_modules
.dist
.astro
.env
```

---

## 8) .env.example

```
# Contentful Delivery (read) API
CONTENTFUL_SPACE_ID=
CONTENTFUL_ENVIRONMENT=master
CONTENTFUL_CDA_TOKEN=

# Contentful Management (write) API — used only by setup/seed scripts
CONTENTFUL_MANAGEMENT_TOKEN=
```

Rename to `.env` and fill values before running.

---

## 9) src/env.d.ts

```ts
/// <reference types="astro/client" />
```

---

## 10) src/styles.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: light;
}

body { @apply bg-white text-body antialiased; }
main { @apply max-w-3xl mx-auto px-6 py-10; }
a { @apply text-link underline underline-offset-2 hover:no-underline; }
hr { @apply my-10 border-slate-200; }
pre { @apply text-sm text-slate-600 font-mono; }
section + section { @apply mt-12; }
```

---

## 11) src/lib/types.ts

```ts
export type Social = {
  label: 'GitHub' | 'Twitter' | 'LinkedIn';
  url: string;
};

export type Project = {
  title: string;
  imageUrl: string;
  linkUrl?: string;
  repoUrl?: string;
};

export type SiteSettings = {
  title: string; // "Christopher Stevers"
  tagline: string; // "I develop websites."
  email: string;  // contact email string
  intro: string;  // first paragraph(s)
  skillsFrontend: string[];
  skillsBackend: string[];
  socials: Social[];
  projects: Project[];
  aboutTitle: string; // "Behind the Screen"
  aboutBody: string;  // rich text serialized to plain for simplicity
};
```

---

## 12) src/lib/contentful.ts

```ts
import 'dotenv/config';
import { createClient } from 'contentful';

const space = process.env.CONTENTFUL_SPACE_ID!;
const accessToken = process.env.CONTENTFUL_CDA_TOKEN!;
const environment = process.env.CONTENTFUL_ENVIRONMENT || 'master';

export const cda = createClient({ space, accessToken, environment });

export async function getSiteSettings() {
  const res = await cda.getEntries({ content_type: 'siteSettings', limit: 1 });
  const item = res.items[0] as any;
  if (!item) throw new Error('No siteSettings entry found');

  // Flatten fields for Astro props
  const f = item.fields;
  return {
    title: f.title,
    tagline: f.tagline,
    email: f.email,
    intro: f.intro,
    skillsFrontend: f.skillsFrontend || [],
    skillsBackend: f.skillsBackend || [],
    socials: (f.socials || []).map((s: any) => ({ label: s.fields.label, url: s.fields.url })),
    projects: (f.projects || []).map((p: any) => ({
      title: p.fields.title,
      imageUrl: 'fields' in p.fields.image ? `https:${p.fields.image.fields.file.url}` : '',
      linkUrl: p.fields.linkUrl || '',
      repoUrl: p.fields.repoUrl || ''
    })),
    aboutTitle: f.aboutTitle,
    aboutBody: f.aboutBody,
  };
}
```

---

## 13) src/components/GearIcon.astro

```astro
---
const size = Astro.props.size ?? 20;
---
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M12 8.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Z" stroke="currentColor" stroke-width="1.5"/>
  <path d="M4 12c0-.5.05-.98.15-1.45l-1.9-1.1 2-3.46 1.98.57c.42-.36.88-.67 1.38-.93l.25-2.06h4l.24 2.06c.5.26.96.57 1.38.93l2-.57 2 3.46-1.9 1.1c.1.47.15.95.15 1.45s-.05.98-.15 1.45l1.9 1.1-2 3.46-2-.57a7.1 7.1 0 0 1-1.38.93l-.24 2.06h-4l-.25-2.06a7.1 7.1 0 0 1-1.38-.93l-1.98.57-2-3.46 1.9-1.1c-.1-.47-.15-.95-.15-1.45Z" stroke="currentColor" stroke-width="1.5"/>
</svg>
```

---

## 14) src/components/Socials.astro

```astro
---
import GearIcon from './GearIcon.astro';
const { socials } = Astro.props;
---
<ul class="flex gap-4 items-center">
  {socials.map((s: any) => (
    <li><a href={s.url} class="inline-flex items-center gap-1" target="_blank" rel="noreferrer">
      <GearIcon size={16} /><span>{s.label}</span>
    </a></li>
  ))}
</ul>
```

---

## 15) src/components/Header.astro

```astro
---
const { title, tagline } = Astro.props;
---
<header class="border-b border-slate-200">
  <div class="max-w-3xl mx-auto px-6 py-8">
    <h1 class="text-3xl font-semibold">{title}</h1>
    <p class="text-slate-600">{tagline}</p>
  </div>
</header>
```

---

## 16) src/components/PortfolioGrid.astro

```astro
---
const { projects } = Astro.props;
---
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  {projects.map((p: any) => (
    <article class="border rounded p-2">
      <img src={p.imageUrl} alt={`Screenshot: ${p.title}`} class="h-36 w-full object-cover bg-slate-100" loading="lazy" />
      <div class="mt-2 text-sm flex items-center justify-between">
        <span>{p.title}</span>
        <div class="flex gap-2 text-xs">
          {p.linkUrl && <a href={p.linkUrl} target="_blank" rel="noreferrer">Site</a>}
          {p.repoUrl && <a href={p.repoUrl} target="_blank" rel="noreferrer">Code</a>}
        </div>
      </div>
    </article>
  ))}
</div>
```

---

## 17) src/pages/index.astro

```astro
---
import '../styles.css';
import Header from '../components/Header.astro';
import Socials from '../components/Socials.astro';
import PortfolioGrid from '../components/PortfolioGrid.astro';
import { getSiteSettings } from '../lib/contentful';

const data = await getSiteSettings();
const emailHref = `mailto:${data.email}`;
---
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{data.title} — {data.tagline}</title>
  </head>
  <body>
    <Header title={data.title} tagline={data.tagline} />
    <main>
      <section>
        <pre>console.log({data.tagline});</pre>
        <p class="mt-4">{data.intro}</p>
        <p class="mt-4">If you're interested in working with me, please let me know at <a href={emailHref}>{data.email}</a>.</p>

        <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="p-4 border rounded">
            <h3 class="font-semibold mb-2">Frontend</h3>
            <ul class="list-disc list-inside text-sm">
              {data.skillsFrontend.map((s: string) => <li>{s}</li>)}
            </ul>
          </div>
          <div class="p-4 border rounded">
            <h3 class="font-semibold mb-2">Backend</h3>
            <ul class="list-disc list-inside text-sm">
              {data.skillsBackend.map((s: string) => <li>{s}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section id="portfolio">
        <h2 class="text-xl font-bold">Portfolio</h2>
        <PortfolioGrid projects={data.projects} />
      </section>

      <section>
        <h2 class="text-xl font-bold">{data.aboutTitle}</h2>
        <p class="mt-4 whitespace-pre-line">{data.aboutBody}</p>
        <p class="mt-4 text-sm text-slate-600">Hand Coded by me.</p>
      </section>

      <footer class="mt-12 text-sm text-slate-500 flex items-center gap-4">
        <Socials socials={data.socials} />
      </footer>
    </main>
  </body>
</html>
```

---

## 18) public/favicon.svg

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
  <path fill="#111827" d="M12 8.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Z"/>
  <path fill="#111827" d="M4 12c0-.5.05-.98.15-1.45l-1.9-1.1 2-3.46 1.98.57c.42-.36.88-.67 1.38-.93l.25-2.06h4l.24 2.06c.5.26.96.57 1.38.93l2-.57 2 3.46-1.9 1.1c.1.47.15.95.15 1.45s-.05.98-.15 1.45l1.9 1.1-2 3.46-2-.57a7.1 7.1 0 0 1-1.38.93l-.24 2.06h-4l-.25-2.06a7.1 7.1 0 0 1-1.38-.93l-1.98.57-2-3.46 1.9-1.1c-.1-.47-.15-.95-.15-1.45Z"/>
</svg>
```

---

## 19) scripts/setup-contentful.mjs (creates content types)

```js
import 'dotenv/config';
import contentfulManagement from 'contentful-management';

const client = contentfulManagement.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ENV_ID = process.env.CONTENTFUL_ENVIRONMENT || 'master';

async function run() {
  const space = await client.getSpace(SPACE_ID);
  const env = await space.getEnvironment(ENV_ID);

  // Content type: Social
  const social = await env.createContentTypeWithId('social', {
    name: 'Social',
    fields: [
      { id: 'label', name: 'Label', type: 'Symbol', required: true },
      { id: 'url', name: 'URL', type: 'Symbol', required: true },
    ],
    displayField: 'label',
  }).catch(async (e) => env.getContentType('social'));

  // Content type: Project
  const project = await env.createContentTypeWithId('project', {
    name: 'Project',
    fields: [
      { id: 'title', name: 'Title', type: 'Symbol', required: true },
      { id: 'image', name: 'Image', type: 'Link', linkType: 'Asset' },
      { id: 'linkUrl', name: 'Site URL', type: 'Symbol' },
      { id: 'repoUrl', name: 'Repo URL', type: 'Symbol' }
    ],
    displayField: 'title',
  }).catch(async (e) => env.getContentType('project'));

  // Content type: Site Settings
  const site = await env.createContentTypeWithId('siteSettings', {
    name: 'Site Settings',
    fields: [
      { id: 'title', name: 'Title', type: 'Symbol', required: true },
      { id: 'tagline', name: 'Tagline', type: 'Symbol', required: true },
      { id: 'email', name: 'Email', type: 'Symbol', required: true },
      { id: 'intro', name: 'Intro', type: 'Text' },
      { id: 'skillsFrontend', name: 'Skills (Frontend)', type: 'Array', items: { type: 'Symbol' } },
      { id: 'skillsBackend', name: 'Skills (Backend)', type: 'Array', items: { type: 'Symbol' } },
      { id: 'socials', name: 'Socials', type: 'Array', items: { type: 'Link', linkType: 'Entry' } },
      { id: 'projects', name: 'Projects', type: 'Array', items: { type: 'Link', linkType: 'Entry' } },
      { id: 'aboutTitle', name: 'About Title', type: 'Symbol', required: true },
      { id: 'aboutBody', name: 'About Body', type: 'Text' }
    ],
    displayField: 'title',
  }).catch(async (e) => env.getContentType('siteSettings'));

  // publish content types if needed
  for (const ct of [social, project, site]) {
    if (!ct.sys.publishedVersion) {
      await ct.publish();
    }
  }

  console.log('✔ Content types ready');
}

run().catch((e) => { console.error(e); process.exit(1); });
```

---

## 20) scripts/seed-contentful.mjs (creates a starter entry+assets)

```js
import 'dotenv/config';
import contentfulManagement from 'contentful-management';

const client = contentfulManagement.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ENV_ID = process.env.CONTENTFUL_ENVIRONMENT || 'master';

async function run() {
  const space = await client.getSpace(SPACE_ID);
  const env = await space.getEnvironment(ENV_ID);

  // Create socials
  const socials = [
    { label: 'GitHub', url: 'https://github.com/Christopher-Stevers' },
    { label: 'Twitter', url: 'https://twitter.com' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com' }
  ];

  const socialEntries = [];
  for (const s of socials) {
    const entry = await env.createEntry('social', { fields: {
      label: { 'en-US': s.label },
      url: { 'en-US': s.url },
    }});
    await entry.publish();
    socialEntries.push(entry);
  }

  // Create projects (without real images to keep it portable)
  const projectTitles = ['Kanbeano','Soul Runner','Whirl Creek Farm','Scribo','Ration Cost Calculator'];
  const projEntries = [];
  for (const t of projectTitles) {
    const entry = await env.createEntry('project', { fields: {
      title: { 'en-US': t },
      linkUrl: { 'en-US': '' },
      repoUrl: { 'en-US': '' }
    }});
    await entry.publish();
    projEntries.push(entry);
  }

  // Create site settings
  const site = await env.createEntry('siteSettings', { fields: {
    title: { 'en-US': 'Christopher Stevers' },
    tagline: { 'en-US': 'I develop websites.' },
    email: { 'en-US': 'christopherstevers@protonmail.com' },
    intro: { 'en-US': `Since starting my development journey I’ve worked with a range of technologies...` },
    skillsFrontend: { 'en-US': ['HTML','CSS','JavaScript','React.js','Next.js','Nuxt.js','SCSS'] },
    skillsBackend: { 'en-US': ['Node','MongoDB','Wordpress','Git','GitHub'] },
    socials: { 'en-US': socialEntries.map(e => ({ sys: { type: 'Link', linkType: 'Entry', id: e.sys.id } })) },
    projects: { 'en-US': projEntries.map(e => ({ sys: { type: 'Link', linkType: 'Entry', id: e.sys.id } })) },
    aboutTitle: { 'en-US': 'Behind the Screen' },
    aboutBody: { 'en-US': `Hi, I'm Chris Stevers, a full stack web developer from Southwestern Ontario.\n\nI began studying coding with C++...` },
  }});
  await site.publish();

  console.log('✔ Seeded starter content');
}

run().catch((e) => { console.error(e); process.exit(1); });
```

---

## 21) How to run

```bash
# 1) install deps
npm i

# 2) copy env
cp .env.example .env
# fill CONTENTFUL_* values (create a space, a CDA token, and a CMA token)

# 3) create content types
npm run contentful:setup

# 4) seed demo content
npm run contentful:seed

# 5) dev server
npm run dev
```

---

## 22) Notes on “exact” fonts, colors, icons

- **Fonts**: The source page renders with system default sans‑serif (no custom webfont). This project intentionally uses a **system‑UI font stack** to match that look.
- **Colors**: The site is **black/near‑black text on white** with standard link blue for anchors. Tailwind config uses slate‑900‑like body text and a conservative blue for links to reflect that.
- **Icons**: The original page shows **decorative gear icons** near headings/socials. This bundle includes an inline **GearIcon** SVG for a like‑for‑like vibe and a matching **favicon.svg**.

You can swap any of these quickly (e.g., add Google Fonts) if you decide to style it further.

---

## 23) Optional: Using real project screenshots

Upload images as Contentful Assets and link them in each **Project** entry under the `image` field. The rendering already reads `image.fields.file.url` and prefixes it with `https:`.

---

## 24) Deploying

- **Vercel** or **Netlify**: Add the `CONTENTFUL_*` env vars in the dashboard. Build command: `npm run build`. Output directory: `dist/`.
- **Static Export**: Astro builds static HTML that fetches content at build time; since we use the **CDA** in `getEntries` at runtime during build, the build will succeed on CI with the proper tokens.

---


MIT — free to use and modify.

