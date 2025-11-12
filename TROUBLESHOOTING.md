# 🐛 Troubleshooting Guide

## Common Issues & Solutions

### 🔴 Build Error: "Expected parameter accessToken"

**Problem:** The site tries to build but fails because Contentful credentials are missing.

**Solution:**
```bash
cp .env.example .env
# Edit .env and fill in CONTENTFUL_SPACE_ID and CONTENTFUL_CDA_TOKEN
pnpm run dev  # Try again
```

**Why:** Astro fetches content from Contentful at build time. Without valid credentials, it can't proceed.

---

### 🔴 "Cannot find module 'contentful'"

**Problem:** Installation didn't work properly.

**Solution:**
```bash
rm -r node_modules pnpm-lock.yaml
pnpm install
```

**Why:** Sometimes dependency installs are incomplete. Clean reinstall fixes it.

---

### 🔴 "No siteSettings entry found"

**Problem:** Site builds but shows error about missing Site Settings.

**Solution:**
```bash
pnpm run contentful:seed
```

**Why:** You need to populate Contentful with initial content first.

---

### 🔴 Dev server shows blank page

**Problem:** Site loads but displays nothing.

**Solution:**
1. Check browser console for errors (F12)
2. Verify `.env` has correct tokens
3. Check Contentful space has published Site Settings entry
4. Restart dev server: `pnpm run dev`

---

### 🔴 Images not showing in portfolio

**Problem:** Projects show "No image" placeholder instead of screenshots.

**Solution:**
1. In Contentful, go to Assets
2. Upload an image
3. Go to a Project entry
4. Set the Image field to your uploaded asset
5. Publish and rebuild

**Note:** We're using a blank image field for now. You can add real images anytime in Contentful.

---

### 🔴 Changes in Contentful not showing up

**Problem:** You edited content and published, but site still shows old content.

**Solution:**
```bash
pnpm run build
```

**Why:** Astro fetches content during build, not runtime. You must rebuild after publishing.

**For Netlify:** Set up webhooks so Contentful automatically triggers rebuilds on publish.

---

### 🔴 Links aren't showing in portfolio projects

**Problem:** "Site" and "Code" links don't appear on projects.

**Solution:**
1. In Contentful, edit a Project
2. Fill in "Site URL" (like https://example.com)
3. Fill in "Repo URL" (like https://github.com/user/repo)
4. Publish and rebuild

**Note:** Links only show if you fill in the URL fields.

---

### 🔴 Skills list is empty

**Problem:** Frontend/Backend skills section shows nothing.

**Solution:**
1. In Contentful, edit Site Settings
2. Scroll to "Skills (Frontend)" and "Skills (Backend)"
3. Add skill names (click add item, type skill)
4. Publish and rebuild

---

### 🔴 Social links aren't clickable

**Problem:** GitHub/Twitter/LinkedIn icons don't link anywhere.

**Solution:**
1. In Contentful, edit each Social entry
2. Verify URL is correct (starts with https://)
3. Publish all Social entries
4. Edit Site Settings and re-assign Socials
5. Publish Site Settings and rebuild

---

### 🔴 Font looks different than expected

**Problem:** Site doesn't use system fonts.

**Solution:**
Check `tailwind.config.cjs`:
```javascript
fontFamily: {
  sans: [
    'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI',
    'Roboto', 'Ubuntu', 'Helvetica Neue', 'Arial'
  ]
}
```

To use a custom font (like Google Fonts):
1. Add font import to `src/styles.css`
2. Update `tailwind.config.cjs` fontFamily
3. Run `pnpm run dev`

---

### 🔴 "Port 3000 already in use"

**Problem:** `pnpm run dev` says port 3000 is taken.

**Solution (Option A - Kill process):**
```bash
# Windows - find what's using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with the number)
taskkill /PID <PID> /F
```

**Solution (Option B - Use different port):**
Edit `astro.config.mjs`:
```javascript
server: { port: 3001 }  // Use different port
```

---

### 🔴 Netlify deploy fails

**Problem:** Deployment to Netlify doesn't work.

**Solution:**
1. Check build command: `pnpm run build`
2. Check publish directory: `dist`
3. Verify environment variables are set in Netlify dashboard:
   - `CONTENTFUL_SPACE_ID`
   - `CONTENTFUL_CDA_TOKEN`
   - `CONTENTFUL_ENVIRONMENT=master`
4. Check build logs in Netlify dashboard for details

---

### 🔴 "Can't connect to Contentful" during build

**Problem:** Netlify build fails saying it can't reach Contentful.

**Solution:**
1. Verify tokens are correct in Netlify environment variables
2. Check Space ID is correct
3. Make sure at least one published Site Settings entry exists
4. Trigger manual redeploy from Netlify dashboard

---

### 🔴 Styling looks broken

**Problem:** Colors/fonts/layout are wrong.

**Solution:**
1. Check `src/styles.css` hasn't been corrupted
2. Clear browser cache (Ctrl+Shift+Del)
3. Verify Tailwind build: `pnpm run build`
4. Check for TypeScript errors: `pnpm run build --verbose`

---

### 🔴 Content appears but formatting is broken

**Problem:** Text shows but has no line breaks or formatting.

**Solution:**
1. In Contentful, use the `<Text>` field type (not `<Symbol>`)
2. For multiline text, use `aboutBody` field
3. In template, use `whitespace-pre-line` class (already done in index.astro)

---

### 🔴 "Too many redirects" on Netlify

**Problem:** Site shows redirect error when accessing devstevers.com.

**Solution:**
1. Check DNS settings point to Netlify (not elsewhere)
2. Remove any conflicting redirects in `netlify.toml`
3. Check Netlify domain settings
4. Clear DNS cache and wait up to 24 hours for propagation

---

### 🔴 Projects not appearing in order

**Problem:** Projects show in random order.

**Solution:**
In Contentful, edit Site Settings and drag projects to reorder them in the "Projects" array. The order you see in Contentful is the order they'll display.

---

### 🔴 Old content still showing after rebuild

**Problem:** You changed content but old version persists.

**Solution:**
1. Hard refresh browser (Ctrl+Shift+R on Windows/Linux, Cmd+Shift+R on Mac)
2. Clear CDN cache in Netlify dashboard
3. Verify the entry is Published (not just saved as draft)
4. Check you're looking at the right Contentful environment (should be "master")

---

## 🆘 Still Having Issues?

1. **Check the logs:** `pnpm run dev --verbose`
2. **Verify credentials:** All Contentful tokens in `.env`
3. **Test locally first:** Run `pnpm run dev` before deploying
4. **Check documentation:** SETUP_GUIDE.md has step-by-step instructions
5. **Rebuild everything:** 
   ```bash
   rm -rf node_modules dist .astro
   pnpm install
   pnpm run build
   ```

## 📊 Common Checks

Before asking for help, verify:

- [ ] `.env` file exists and has all 4 Contentful values
- [ ] Contentful Space ID is correct (not Space Name)
- [ ] CDA token starts with `CFPAT` or similar (not the key)
- [ ] At least one Site Settings entry exists and is **Published**
- [ ] `pnpm install` completed without errors
- [ ] Node version is 18+ (`node --version`)
- [ ] Running `pnpm run build` locally works

---

**Need more help?** Refer to the main documentation files:
- `QUICK_START.md` - Quick reference
- `SETUP_GUIDE.md` - Detailed walkthrough
- `README_ASTRO.md` - Astro-specific docs
- `SITE_STRUCTURE.md` - Content model explanation
