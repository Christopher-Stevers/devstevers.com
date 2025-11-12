# ⚡ Quick Setup Checklist

## Before You Start
- [ ] Create a Contentful account at www.contentful.com
- [ ] Create a new Space in Contentful
- [ ] Generate API tokens (Delivery & Management)

## Step-by-Step

### 1️⃣ Configure Environment
```bash
cp .env.example .env
# Edit .env with your Contentful credentials
```

**Fill in these values:**
- `CONTENTFUL_SPACE_ID` - from Contentful Settings > API Keys
- `CONTENTFUL_CDA_TOKEN` - Content Delivery token
- `CONTENTFUL_MANAGEMENT_TOKEN` - Personal Access token
- `CONTENTFUL_ENVIRONMENT` - leave as "master"

### 2️⃣ Create Content Types
```bash
pnpm run contentful:setup
```

### 3️⃣ Add Sample Content
```bash
pnpm run contentful:seed
```

### 4️⃣ Start Development
```bash
pnpm run dev
```

Visit: **http://localhost:3000**

### 5️⃣ Deploy to Netlify

**Option A: Git + Netlify (easiest)**
```bash
git add .
git commit -m "Astro + Contentful setup"
git push origin main
# Then connect repo to Netlify at netlify.com
```

**Option B: Drag & Drop
```bash
pnpm run build
# Upload dist/ folder to Netlify
```

**Option C: Netlify CLI**
```bash
netlify deploy --prod --dir=dist
```

### 6️⃣ Add Netlify Environment Variables
In Netlify Dashboard:
1. Settings > Build & deploy > Environment
2. Add variables:
   - `CONTENTFUL_SPACE_ID`
   - `CONTENTFUL_CDA_TOKEN`

---

## 📝 Edit Your Content

Go to your Contentful Space and edit:
- **Site Settings** - Your name, bio, skills
- **Projects** - Portfolio items  
- **Socials** - GitHub/Twitter/LinkedIn links

Then publish & rebuild!

---

## Useful Commands

| Command | What it does |
|---------|-------------|
| `pnpm run dev` | Start dev server (http://localhost:3000) |
| `pnpm run build` | Build for production |
| `pnpm run preview` | Preview production build |
| `pnpm run contentful:setup` | Create content types |
| `pnpm run contentful:seed` | Add sample data |

---

## 🔗 Custom Domain (devstevers.com)

**On Netlify Dashboard:**
1. Site settings > Domain management
2. Click "Add custom domain"
3. Enter: `devstevers.com`
4. Update your domain DNS to point to Netlify

See: https://docs.netlify.com/domains-ssl/custom-domains/

---

**Full details in:** `SETUP_GUIDE.md`
