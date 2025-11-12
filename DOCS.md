# 📖 Documentation Index

Welcome! Here's where to find everything you need to get your Astro + Contentful portfolio running.

## 🎯 Start Here

### **[QUICK_START.md](QUICK_START.md)** ⚡ (5 minutes)
The fastest way to get started. 30-second checklist:
1. Create Contentful account
2. Configure `.env`
3. Run setup & seed
4. Start dev server
5. Deploy to Netlify

**Start with this if:** You just want to get things running ASAP

---

## 📚 Complete Guides

### **[SETUP_GUIDE.md](SETUP_GUIDE.md)** 🔧 (10-15 minutes)
Step-by-step walkthrough with screenshots:
- Create Contentful account & space
- Generate API tokens
- Configure environment variables
- Create content types
- Seed starter content
- Start development server
- Deploy to Netlify
- Edit content

**Start with this if:** You're new to Contentful or want detailed instructions

---

### **[SITE_STRUCTURE.md](SITE_STRUCTURE.md)** 🗂️
Visual guide to how everything works:
- Content flow diagram
- Data model (Site Settings, Projects, Socials)
- Page layout
- How content flows from Contentful to your site
- File structure

**Use this if:** You want to understand the architecture

---

### **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** 🐛
Fixes for common problems:
- Missing Contentful credentials
- Build errors
- Content not updating
- Deployment issues
- Port conflicts
- And 15+ more solutions

**Use this if:** Something isn't working

---

### **[README_ASTRO.md](README_ASTRO.md)** 🚀
Astro-specific documentation:
- Features
- Quick start
- Available commands
- Deploying
- Customization
- File structure

**Use this if:** You want Astro-specific details

---

## 📋 Reference Documents

### **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** ✨
High-level overview:
- What's been created
- Project structure
- Next steps
- Key features
- What you can edit

**Use this if:** You want a quick overview of what you have

---

### **[plan.md](plan.md)** 📝
Original specification document with:
- Complete file tree
- File-by-file breakdown
- Configuration details
- Setup instructions
- Deployment notes

**Use this if:** You want the original detailed spec

---

## 🗂️ File Structure

```
d:\Chris\Startups\Stevers.dev/
│
├── 📖 DOCUMENTATION
│   ├── QUICK_START.md          ← Read this first!
│   ├── SETUP_GUIDE.md          ← Detailed instructions
│   ├── SITE_STRUCTURE.md       ← How it works
│   ├── TROUBLESHOOTING.md      ← When things break
│   ├── README_ASTRO.md         ← Astro docs
│   ├── PROJECT_SUMMARY.md      ← Overview
│   ├── plan.md                 ← Original spec
│   └── README.md               ← Main readme
│
├── ⚙️ CONFIGURATION
│   ├── astro.config.mjs        # Astro settings
│   ├── tailwind.config.cjs     # Tailwind settings
│   ├── tsconfig.json           # TypeScript settings
│   ├── postcss.config.cjs      # PostCSS settings
│   ├── package.json            # Dependencies
│   └── .env.example            # Environment template
│
├── 🎨 SOURCE CODE
│   └── src/
│       ├── components/         # Reusable UI components
│       │   ├── Header.astro
│       │   ├── GearIcon.astro
│       │   ├── PortfolioGrid.astro
│       │   └── Socials.astro
│       ├── lib/               # Utilities & helpers
│       │   ├── contentful.ts   # Contentful client
│       │   └── types.ts        # TypeScript types
│       ├── pages/             # Routes
│       │   └── index.astro     # Main page
│       ├── styles.css         # Global styles
│       └── env.d.ts           # Type definitions
│
├── 📦 ASSETS
│   └── public/
│       └── favicon.svg         # Site icon
│
├── 🚀 DEPLOYMENT SCRIPTS
│   └── scripts/
│       ├── setup-contentful.mjs  # Create content types
│       └── seed-contentful.mjs   # Add sample data
│
└── 📂 BUILD OUTPUT
    └── dist/                   # Generated site (after build)
```

## 🚀 Commands Cheat Sheet

```bash
pnpm install                  # Install dependencies (one time)
pnpm run contentful:setup     # Create Contentful content types
pnpm run contentful:seed      # Add sample data to Contentful
pnpm run dev                  # Start development server
pnpm run build                # Build for production
pnpm run preview              # Preview production build locally
```

## 🎯 Common Workflows

### First Time Setup
```bash
cp .env.example .env
# Edit .env with Contentful tokens
pnpm run contentful:setup
pnpm run contentful:seed
pnpm run dev
```

### After Editing Content in Contentful
```bash
pnpm run build
```

### Deploy to Netlify
```bash
git push origin main
# Netlify auto-deploys from main branch
```

## 📞 Which Document Should I Read?

| I want to... | Read this |
|---|---|
| Get running quickly | **QUICK_START.md** |
| Follow step-by-step instructions | **SETUP_GUIDE.md** |
| Understand the architecture | **SITE_STRUCTURE.md** |
| Fix a problem | **TROUBLESHOOTING.md** |
| Learn about Astro | **README_ASTRO.md** |
| See an overview | **PROJECT_SUMMARY.md** |
| See the full spec | **plan.md** |
| Deploy to production | **SETUP_GUIDE.md** (Section 8) |
| Edit content | **SETUP_GUIDE.md** (Section 7) |
| Customize styling | **README_ASTRO.md** (Customization) |
| Add a new project | **SITE_STRUCTURE.md** (To Add a New Project) |

## 🔗 External Resources

- **Astro Docs:** https://docs.astro.build
- **Contentful Docs:** https://www.contentful.com/developers/docs
- **Tailwind CSS:** https://tailwindcss.com
- **Netlify Docs:** https://docs.netlify.com

## ✅ Quick Checklist

- [ ] Read QUICK_START.md
- [ ] Create Contentful account
- [ ] Generate API tokens
- [ ] Copy .env.example to .env
- [ ] Fill in Contentful credentials
- [ ] Run `pnpm run contentful:setup`
- [ ] Run `pnpm run contentful:seed`
- [ ] Run `pnpm run dev`
- [ ] Visit http://localhost:3000
- [ ] Deploy to Netlify

---

## 📝 Document Overview

| Document | Length | Time to Read | Purpose |
|----------|--------|--------------|---------|
| QUICK_START.md | ~200 lines | 5 min | Get running fast |
| SETUP_GUIDE.md | ~400 lines | 15 min | Detailed walkthrough |
| SITE_STRUCTURE.md | ~300 lines | 10 min | Understand architecture |
| TROUBLESHOOTING.md | ~300 lines | 10 min | Fix issues |
| README_ASTRO.md | ~150 lines | 5 min | Astro reference |
| PROJECT_SUMMARY.md | ~200 lines | 5 min | Overview |
| plan.md | ~612 lines | 20 min | Full spec |

---

**Your portfolio is ready to launch!** Start with `QUICK_START.md` and you'll be live in minutes. 🎉

Questions? Check `TROUBLESHOOTING.md` or read the relevant guide above.
