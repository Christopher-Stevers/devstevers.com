# 🚀 Contentful + Astro Setup Guide

Your Astro + Contentful portfolio project is now ready! Follow these steps to get your site live.

## Step 1: Create a Contentful Account & Space

1. Go to **[www.contentful.com](https://www.contentful.com)** and sign up (free tier is available)
2. Create a new **Organization** and **Space** (give it a name like "DevStevers")
3. You'll see a dashboard with your **Space ID** displayed at the top

## Step 2: Generate API Tokens

### A) Content Delivery API Token (for reading content)

1. In Contentful, go to **Settings > API Keys**
2. Click **Create API Key** (or **Content delivery tokens**)
3. Copy the **Space ID** and **Content Delivery API Token**
4. These are for **reading** your published content (safe to expose)

### B) Content Management API Token (for setup/seed scripts)

1. In Contentful, go to **Settings > API Tokens** 
2. Click **Create Personal Access Token**
3. Give it a name like "Local Setup"
4. Copy the token (this is for **writing** content during setup only)

## Step 3: Configure Environment Variables

1. Create a `.env` file in your project root (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and fill in your Contentful credentials:
   ```
   CONTENTFUL_SPACE_ID=r8kg3ok9p3wayour_space_id_here
   CONTENTFUL_ENVIRONMENT=master
   CONTENTFUL_CDA_TOKEN=your_content_delivery_token_here
   CONTENTFUL_MANAGEMENT_TOKEN=your_personal_access_token_here
   ```

## Step 4: Create Content Types in Contentful

Run this command to create the content types (Social, Project, Site Settings):

```bash
pnpm run contentful:setup
```

This will:
- ✅ Create a "Social" content type (for GitHub/Twitter/LinkedIn links)
- ✅ Create a "Project" content type (for portfolio items)
- ✅ Create a "Site Settings" content type (for main site content)
- ✅ Publish them so they're ready to use

## Step 5: Seed Starter Content

Populate your space with sample content:

```bash
pnpm run contentful:seed
```

This will create:
- ✅ 3 social links (GitHub, Twitter, LinkedIn)
- ✅ 5 sample projects
- ✅ Site settings with your name, tagline, skills, and bio

**You can edit all of this directly in Contentful later!**

## Step 6: Start the Development Server

```bash
pnpm run dev
```

Your site will be available at **http://localhost:3000**

You should see:
- Your name and tagline at the top
- Console log effect
- Skills listed (frontend & backend)
- Portfolio section with 5 sample projects
- Social links at the bottom
- About section

## Step 7: Edit Content in Contentful

1. Go to your Contentful Space dashboard
2. Click **Content** to see your entries
3. Edit any entry (Site Settings, Projects, Socials)
4. Click **Publish** to go live
5. Rebuild your site to pull the latest content:
   ```bash
   pnpm run build
   ```

## Step 8: Deploy to Netlify

### Option A: Connect GitHub to Netlify (Recommended)

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Initial Astro + Contentful setup"
   git push origin main
   ```

2. Go to **[netlify.com](https://www.netlify.com)** and sign in with GitHub
3. Click **Add new site > Import an existing project**
4. Select your GitHub repo
5. Set build settings:
   - **Build command:** `pnpm run build`
   - **Publish directory:** `dist`
6. Click **Deploy site**

### Option B: Manual Deploy

1. Build your site:
   ```bash
   pnpm run build
   ```

2. Upload the `dist/` folder to Netlify using drag-and-drop

### Option C: Netlify CLI

```bash
pnpm install -g netlify-cli
pnpm run build
netlify deploy --prod --dir=dist
```

### Add Environment Variables to Netlify

1. In Netlify Dashboard, go to **Site settings > Build & deploy > Environment**
2. Click **Edit variables** and add:
   ```
   CONTENTFUL_SPACE_ID=your_space_id
   CONTENTFUL_CDA_TOKEN=your_delivery_token
   CONTENTFUL_ENVIRONMENT=master
   ```
3. Save and redeploy

Your site will now rebuild automatically when you publish content in Contentful!

## ✨ What You Can Edit in Contentful

### Site Settings
- **Title:** Your name
- **Tagline:** "I develop websites"
- **Email:** Contact email
- **Intro:** Opening paragraph
- **Skills (Frontend):** HTML, CSS, JavaScript, React, etc.
- **Skills (Backend):** Node, MongoDB, PostgreSQL, etc.
- **About Title:** "Behind the Screen"
- **About Body:** Your bio/story

### Projects
For each project, you can set:
- **Title:** Project name
- **Image:** Screenshot (currently blank, add from Contentful)
- **Site URL:** Link to live site
- **Repo URL:** Link to GitHub repo

### Socials
- **Label:** GitHub, Twitter, LinkedIn
- **URL:** Your profile links

## 🎨 Customization

### Change Colors
Edit `tailwind.config.cjs`:
```javascript
colors: {
  body: '#0f172a',        // Text color
  link: '#1d4ed8',        // Link color
}
```

### Change Fonts
Edit `tailwind.config.cjs` - modify the `fontFamily` section to use Google Fonts or system fonts

### Change Layout
Edit components in `src/components/`:
- `Header.astro` - Top section
- `PortfolioGrid.astro` - Portfolio layout
- `Socials.astro` - Social links

## 📚 Project Structure

```
├── src/
│   ├── components/          # Reusable Astro components
│   │   ├── Header.astro
│   │   ├── GearIcon.astro
│   │   ├── PortfolioGrid.astro
│   │   └── Socials.astro
│   ├── lib/
│   │   ├── contentful.ts    # Fetch content from Contentful
│   │   └── types.ts         # TypeScript types
│   ├── pages/
│   │   └── index.astro      # Main page
│   └── styles.css           # Global styles
├── public/
│   └── favicon.svg          # Site icon
├── scripts/
│   ├── setup-contentful.mjs  # Create content types
│   └── seed-contentful.mjs   # Add sample content
├── astro.config.mjs
├── tailwind.config.cjs
├── tsconfig.json
└── package.json
```

## 🆘 Troubleshooting

### "No siteSettings entry found"
- Run `pnpm run contentful:seed` to create sample data
- Make sure you've published the Site Settings entry in Contentful

### Build fails with "Cannot find module 'contentful'"
- Run `pnpm install` to install dependencies

### Site shows placeholder images
- Upload images to Contentful as Assets
- Link them in each Project's "Image" field

### Changes not showing up
- Publish your content in Contentful
- Run `pnpm run build` to rebuild (or wait for Netlify auto-rebuild)

---

**Need help?** Check the main README.md or the plan.md file for more details!
