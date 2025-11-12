# ⚡ Quick Reference Card

Print this or bookmark it! Everything you need at a glance.

## 🎯 One-Minute Setup

```
1. Create free Contentful account at www.contentful.com
2. Create a Space and get API tokens
3. cp .env.example .env
4. Edit .env with tokens
5. pnpm run contentful:setup && pnpm run contentful:seed
6. pnpm run dev
7. Visit http://localhost:3000 ✅
```

## 📝 What Goes in .env

```
CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_ENVIRONMENT=master
CONTENTFUL_CDA_TOKEN=your_delivery_token
CONTENTFUL_MANAGEMENT_TOKEN=your_management_token
```

**Where to find:**
- Space ID → Contentful dashboard top-right
- Delivery Token → Settings > API Keys > Content Delivery
- Management Token → Settings > API Tokens > Create Personal Access Token

## 🛠️ Essential Commands

| Command | What it does | When to use |
|---------|---|---|
| `pnpm install` | Install dependencies | First time only |
| `pnpm run contentful:setup` | Create content types | Once, during setup |
| `pnpm run contentful:seed` | Add sample data | Once, during setup |
| `pnpm run dev` | Start dev server | Daily development |
| `pnpm run build` | Build for production | After changing content |
| `pnpm run preview` | Preview production build | Before deploying |

## 📂 Key Files to Know

| File | Purpose | Edit? |
|------|---------|-------|
| `src/pages/index.astro` | Main page template | ✓ Yes |
| `src/components/*.astro` | UI components | ✓ Yes |
| `src/lib/contentful.ts` | Contentful client | ⚠️ Advanced |
| `tailwind.config.cjs` | Styling config | ✓ Yes |
| `astro.config.mjs` | Astro settings | ⚠️ Advanced |
| `.env` | Secrets (don't commit!) | ✓ Yes |

## 🌐 Deployment Checklist

- [ ] All code committed to GitHub
- [ ] `.env` variables NOT in git (use `.gitignore`)
- [ ] Connect repo to Netlify
- [ ] Add 3 environment variables in Netlify:
  - `CONTENTFUL_SPACE_ID`
  - `CONTENTFUL_CDA_TOKEN`
  - `CONTENTFUL_ENVIRONMENT=master`
- [ ] Set build command: `pnpm run build`
- [ ] Set publish directory: `dist`
- [ ] Deploy!

## 📝 Contentful Content Model

```
Site Settings (1 entry)
├── title: "Christopher Stevers"
├── tagline: "I develop websites."
├── email: your@email.com
├── intro: opening paragraph
├── skillsFrontend: [HTML, CSS, JS, ...]
├── skillsBackend: [Node, MongoDB, ...]
├── socials: [GitHub, Twitter, LinkedIn]
├── projects: [Project 1, Project 2, ...]
├── aboutTitle: "Behind the Screen"
└── aboutBody: your bio

Projects (add as many as you want)
├── title: "Project Name"
├── image: optional screenshot
├── linkUrl: https://site.com
└── repoUrl: https://github.com/user/repo

Socials (3 entries)
├── GitHub
│   ├── label: "GitHub"
│   └── url: https://github.com/yourname
├── Twitter
│   ├── label: "Twitter"
│   └── url: https://twitter.com/yourname
└── LinkedIn
    ├── label: "LinkedIn"
    └── url: https://linkedin.com/in/yourname
```

## 🔧 Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| Build fails: "Expected parameter accessToken" | `cp .env.example .env` then fill in tokens |
| Port 3000 in use | Edit `astro.config.mjs`: change `port: 3000` to `3001` |
| Projects not showing | Run `pnpm run contentful:seed` |
| Changes not appearing | Run `pnpm run build` to rebuild |
| Can't find tokens | Check Contentful > Settings > API Keys |
| Netlify deploy fails | Check env vars in Netlify dashboard |

## 📱 Customization Quick Tips

| Change | Edit this file |
|--------|---|
| Colors | `tailwind.config.cjs` → `colors` section |
| Fonts | `tailwind.config.cjs` → `fontFamily` section |
| Page layout | `src/pages/index.astro` |
| Components | `src/components/*.astro` |
| Global styles | `src/styles.css` |

## 🚀 Deployment Options

```
Option A: Git + Netlify (easiest)
→ Push to GitHub
→ Netlify auto-deploys

Option B: Netlify CLI
→ pnpm run build
→ netlify deploy --prod --dir=dist

Option C: Drag & Drop
→ pnpm run build
→ Upload dist/ to Netlify dashboard
```

## 📚 Documentation Quick Links

| Document | Read if... |
|----------|---|
| QUICK_START.md | You want to start now |
| SETUP_GUIDE.md | You need detailed steps |
| SITE_STRUCTURE.md | You want to understand how it works |
| TROUBLESHOOTING.md | Something is broken |
| DOCS.md | You need a guide to all docs |

## 💾 Important: Never Commit These

```
❌ .env (has secret tokens!)
❌ node_modules/
❌ dist/
❌ .astro/

✅ Add to .gitignore (already done)
```

## 🎨 Page Sections (in order)

1. **Header** - Name & tagline
2. **Intro** - About you, contact email
3. **Skills** - Frontend & Backend lists
4. **Portfolio** - Project grid (3 columns)
5. **About** - "Behind the Screen" section
6. **Footer** - Social links

## 🔄 Content Update Flow

```
Edit in Contentful
         ↓
    Publish
         ↓
 pnpm run build
         ↓
   Site Updates ✅
```

## 📊 Performance Notes

- ✅ Static HTML generation = blazingly fast
- ✅ No JavaScript bloat
- ✅ SEO optimized
- ✅ Automatic CDN caching on Netlify
- ✅ Rebuilds on content publish

## 🔐 Security Tips

- ✅ Never commit `.env`
- ✅ Use read-only tokens (CDA) in build
- ✅ Use management tokens only locally
- ✅ Rotate tokens if leaked
- ✅ Use Netlify environment variables (not in repo)

## 🎯 Development Workflow

```
1. Make changes to code/content
2. Run pnpm run dev
3. Test at http://localhost:3000
4. For content changes: pnpm run build
5. Commit & push
6. Netlify auto-deploys
```

## 🌍 Custom Domain (devstevers.com)

1. Update DNS to point to Netlify
2. Go to Netlify Dashboard > Site Settings
3. Add custom domain
4. Follow Netlify's DNS instructions
5. Wait 24-48 hours for DNS propagation

---

**Still confused?** Read SETUP_GUIDE.md for complete step-by-step instructions!

**Need to find something?** See DOCS.md for index of all documentation.
