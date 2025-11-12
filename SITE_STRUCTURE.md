# Site Structure & Content Model

## How Your Site Works

```
devstevers.com (Netlify deployment)
│
├── Contentful Space (your CMS)
│   ├── Site Settings Entry
│   │   ├── title: "Christopher Stevers"
│   │   ├── tagline: "I develop websites."
│   │   ├── email: contact email
│   │   ├── intro: opening paragraph
│   │   ├── skillsFrontend: [HTML, CSS, JS, React, etc]
│   │   ├── skillsBackend: [Node, MongoDB, Git, etc]
│   │   ├── socials: [links to GitHub, Twitter, LinkedIn]
│   │   ├── projects: [portfolio items]
│   │   ├── aboutTitle: "Behind the Screen"
│   │   └── aboutBody: your bio
│   │
│   ├── Project Entries (5 samples, easily extensible)
│   │   ├── Kanbeano
│   │   ├── Soul Runner
│   │   ├── Whirl Creek Farm
│   │   ├── Scribo
│   │   └── Ration Cost Calculator
│   │   
│   └── Social Entries
│       ├── GitHub
│       ├── Twitter
│       └── LinkedIn
│
└── Astro Build
    ├── Reads from Contentful at build time
    ├── Generates static HTML
    └── Publishes to Netlify
```

## Page Layout

```
┌─────────────────────────────────────────┐
│  HEADER                                  │
│  Christopher Stevers                    │
│  I develop websites.                    │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  INTRO SECTION                          │
│  console.log("I develop websites.");    │
│  [Intro paragraph]                      │
│  Contact: [email]                       │
│                                         │
│  [Skills Grid]                          │
│  Frontend: HTML, CSS, JS...             │
│  Backend: Node, MongoDB...              │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  PORTFOLIO                              │
│  [Project Grid - 3 columns]             │
│  - Kanbeano      - Soul Runner          │
│  - Whirl Creek   - Scribo               │
│  - Ration Cost                          │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  ABOUT                                   │
│  Behind the Screen                      │
│  [Your bio/story]                       │
│  Hand Coded by me.                      │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  FOOTER                                  │
│  Connect: [GitHub] [Twitter] [LinkedIn] │
└─────────────────────────────────────────┘
```

## Content Type Details

### 🔧 Site Settings (main entry)
```
title           String      "Christopher Stevers"
tagline         String      "I develop websites."
email           String      "your@email.com"
intro           Text        Long paragraph
skillsFrontend  Array       ["HTML", "CSS", "JavaScript", ...]
skillsBackend   Array       ["Node.js", "MongoDB", ...]
socials         Links       References to Social entries
projects        Links       References to Project entries
aboutTitle      String      "Behind the Screen"
aboutBody       Text        Your bio/story
```

### 📁 Project Entry
```
title           String      "Project Name"
image           Asset       Optional screenshot
linkUrl         String      https://project-site.com
repoUrl         String      https://github.com/user/repo
```

### 🔗 Social Entry
```
label           String      "GitHub" | "Twitter" | "LinkedIn"
url             String      https://github.com/yourname
```

## Content Flow

```
┌─────────────────────────┐
│  Edit in Contentful     │
│  (CMS)                  │
└───────────┬─────────────┘
            │
            │ Publish
            ▼
┌─────────────────────────┐
│  Contentful API         │
│  (Cloud)                │
└───────────┬─────────────┘
            │
            │ Fetch content at build time
            ▼
┌─────────────────────────┐
│  Astro (src/lib/)       │
│  - contentful.ts        │
└───────────┬─────────────┘
            │
            │ Pass to components
            ▼
┌─────────────────────────┐
│  Astro Components       │
│  - Header.astro         │
│  - PortfolioGrid.astro  │
│  - Socials.astro        │
└───────────┬─────────────┘
            │
            │ Generate static HTML
            ▼
┌─────────────────────────┐
│  Static Site (dist/)    │
│  Pure HTML + CSS + JS   │
└───────────┬─────────────┘
            │
            │ Upload to Netlify
            ▼
┌─────────────────────────┐
│  devstevers.com         │
│  (Live!)                │
└─────────────────────────┘
```

## Key Files

| File | Purpose |
|------|---------|
| `src/lib/contentful.ts` | Fetches data from Contentful |
| `src/lib/types.ts` | TypeScript types for your data |
| `src/pages/index.astro` | Main page template |
| `src/components/*.astro` | Reusable UI components |
| `src/styles.css` | Global styles (Tailwind) |
| `scripts/setup-contentful.mjs` | Creates content types |
| `scripts/seed-contentful.mjs` | Adds sample data |

## To Add a New Project

1. **In Contentful:**
   - Go to Content > Create
   - Select "Project"
   - Fill in: Title, Image, Links
   - Publish

2. **In Site Settings:**
   - Edit Site Settings entry
   - Add new Project to "Projects" field
   - Publish

3. **In Your Site:**
   - Run `pnpm run build`
   - New project appears automatically!

## To Change Site Text

1. Go to Contentful
2. Edit "Site Settings" entry
3. Change any field (title, skills, bio, etc)
4. Click "Publish"
5. Run `pnpm run build`
6. Site updates!

---

This decoupled architecture means:
- ✅ Content editors don't touch code
- ✅ Developers can change layout without touching content
- ✅ Site is fast (static HTML)
- ✅ Fully managed in Contentful CMS
