# 🚀 Deployment Guide

## Quick Start

Your **Civilians** app is ready to deploy! Here's how to get it live:

### Prerequisites
- ✅ All dependencies are configured in `package.json`
- ✅ Build configuration is set up in `vite.config.ts`
- ✅ Deployment configs are ready (Vercel & Netlify)

## Deployment Options

### 1. Vercel (Recommended - Easiest)

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy via CLI**:
   ```bash
   vercel
   ```
   Follow the prompts to link your project.

3. **Or Deploy via GitHub**:
   - Push your code to GitHub
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect Vite and deploy!

**Configuration**: Already set in `vercel.json`

### 2. Netlify

1. **Install Netlify CLI** (optional):
   ```bash
   npm i -g netlify-cli
   ```

2. **Deploy via CLI**:
   ```bash
   netlify deploy --prod
   ```

3. **Or Deploy via GitHub**:
   - Push your code to GitHub
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your repository
   - Build command: `npm run build`
   - Publish directory: `dist`

**Configuration**: Already set in `netlify.toml`

### 3. GitHub Pages

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

4. **Enable GitHub Pages** in your repo settings to point to `gh-pages` branch

### 4. Cloudflare Pages

1. Push code to GitHub
2. Go to [Cloudflare Pages](https://pages.cloudflare.com)
3. Connect repository
4. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`

### 5. AWS S3 + CloudFront

1. **Build the app**:
   ```bash
   npm run build
   ```

2. **Upload to S3**:
   ```bash
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```

3. **Configure CloudFront** to serve from S3 bucket

## Environment Variables

If you need to configure API endpoints or other settings, create a `.env.production` file:

```env
VITE_API_URL=https://api.yourdomain.com
VITE_MAP_TILE_URL=your-custom-tile-url
```

## Build Verification

Before deploying, verify the build works locally:

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview the build
npm run preview
```

The built files will be in the `dist/` directory.

## Post-Deployment Checklist

- [ ] Verify the app loads correctly
- [ ] Test all navigation tabs
- [ ] Check map functionality
- [ ] Verify responsive design on mobile
- [ ] Test issue reporting flow
- [ ] Check leaderboard display
- [ ] Verify profile page
- [ ] Test upvoting functionality

## Custom Domain

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS as instructed

### Netlify
1. Go to Domain Settings
2. Add custom domain
3. Configure DNS records

## Performance Optimization

The app is already optimized with:
- ✅ Code splitting via Vite
- ✅ Tree shaking
- ✅ Minification
- ✅ Asset optimization
- ✅ Cache headers (configured in deployment configs)

## Troubleshooting

### Map not loading
- Check that Leaflet CSS is loaded (already in `index.html`)
- Verify OpenStreetMap tiles are accessible
- Check browser console for errors

### Build fails
- Ensure Node.js 18+ is installed
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run lint`

### 404 errors on refresh (SPA routing)
- Deployment configs already include redirect rules
- If using a different platform, ensure all routes redirect to `index.html`

## Support

For deployment issues:
1. Check deployment platform logs
2. Verify build output in `dist/`
3. Test locally with `npm run preview`
4. Check browser console for runtime errors

---

**Your app is ready to deploy! 🎉**

Choose your preferred platform and get your civic engagement app live in minutes!
