# devstevers-astro-contentful

A clean, minimalist Astro + Contentful portfolio site matching the aesthetic of devstevers.com

## Features

- **Astro Static Generation** – Fast, SEO-friendly static site
- **Contentful Headless CMS** – Manage all content without touching code
- **Tailwind CSS** – System-UI inspired styling with black-on-white aesthetic
- **TypeScript** – Full type safety
- **Netlify Ready** – Deploy with a single click

## Quick Start

### 1. Install Dependencies
```bash
npm install
# or
pnpm install
```

### 2. Set Up Contentful

You'll need a Contentful account and API tokens. If you don't have one:

1. Go to [contentful.com](https://www.contentful.com) and sign up (free tier available)
2. Create a new **Space** (this is your content database)
3. Go to **Settings > API keys**
4. Copy your **Space ID** and create a **Content Delivery API token** (for reading content)
5. Also create a **Personal Access Token** for the Management API (for setup/seed scripts)

### 3. Configure Environment Variables

```bash
cp .env.example .env
```

Then fill in your Contentful credentials in `.env`:
```
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ENVIRONMENT=master
CONTENTFUL_CDA_TOKEN=your_delivery_token
CONTENTFUL_MANAGEMENT_TOKEN=your_management_token
```

### 4. Create Content Types & Seed Data

```bash
# Create the content types (Social, Project, Site Settings)
npm run contentful:setup

# Populate with starter content
npm run contentful:seed
```

### 5. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your site!

## Available Commands

- `npm run dev` – Start dev server
- `npm run build` – Build for production
- `npm run preview` – Preview production build locally
- `npm run contentful:setup` – Create Contentful content types
- `npm run contentful:seed` – Populate with starter content

## Deploying to Netlify

1. Push your code to GitHub
2. Connect your repo to Netlify
3. Add environment variables in Netlify dashboard:
   - `CONTENTFUL_SPACE_ID`
   - `CONTENTFUL_CDA_TOKEN`
   - `CONTENTFUL_ENVIRONMENT` (default: `master`)
4. Set build command: `npm run build`
5. Set publish directory: `dist`

Your site will rebuild whenever you publish content in Contentful!

## File Structure

```
├── src/
│   ├── components/      # Astro components
│   ├── lib/            # Contentful helpers
│   ├── pages/          # Routes
│   └── styles.css      # Global styles
├── public/             # Static assets
├── scripts/            # Contentful setup/seed
├── astro.config.mjs
├── tailwind.config.cjs
└── tsconfig.json
```

## Editing Content

After initial setup, all content can be edited in the Contentful web interface:

- **Site Settings** – Title, tagline, intro, about section, skills
- **Projects** – Portfolio items with title, image, and links
- **Socials** – GitHub, Twitter, LinkedIn links

Changes publish instantly (or after you rebuild).

## Customization

- **Colors** – Edit `tailwind.config.cjs`
- **Layout** – Modify components in `src/components/`
- **Content Structure** – Update scripts and types in `src/lib/`

Made with ❤️ by Christopher Stevers
