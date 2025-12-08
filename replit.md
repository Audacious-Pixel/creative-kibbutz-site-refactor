# Creative Kibbutz - Modern Website

## Project Overview
Modern bilingual website for Creative Kibbutz built with Nuxt 4 + NuxtUI. The site features:
- Portfolio showcase
- Blog functionality (currently disabled)
- Shop functionality (currently disabled)
- Bilingual support (English/Portuguese) with i18n
- Responsive design with Tailwind CSS

## Recent Changes
**December 08, 2025** - Initial Replit setup:
- Configured Nuxt to run on port 5000 with host 0.0.0.0
- Added HMR configuration for Replit proxy support
- Set allowedHosts: true for Vite server to work with Replit's iframe proxy
- Created workflow for development server
- Installed all dependencies

## Project Architecture

### Frontend Stack
- **Framework**: Nuxt 4 with Vue 3 Composition API
- **UI Library**: NuxtUI for modern, accessible components
- **Styling**: Tailwind CSS 4.1
- **Internationalization**: @nuxtjs/i18n for bilingual support
- **Language**: TypeScript

### Project Structure
```
app/
├── assets/css/        # Global styles
├── components/        # Vue components
│   ├── page-modules/  # Page-specific modules
│   ├── CategoryCard.vue
│   ├── LanguageSwitcher.vue
│   ├── PostCard.vue
│   ├── ProductCard.vue
│   ├── TheFooter.vue
│   ├── TheHeader.vue
│   └── TheHeaderHome.vue
├── data/              # JSON data files
├── layouts/           # Layout components
├── pages/             # File-based routing
│   ├── blog/
│   ├── pages/portfolio/
│   ├── shop/
│   ├── index.vue
│   └── privacy.vue
├── app.config.ts      # App configuration
└── app.vue            # Root component

i18n/locales/          # Translation files
├── en.json
└── pt.json
```

### Configuration
- Port: 5000 (Replit requirement)
- Host: 0.0.0.0 (for external access)
- Default language: English
- Supported languages: English, Portuguese

### Content Management
All content is stored in JSON files under `app/data/`:
- `blog-categories.json`, `blog-posts.json`, `blog-tags.json` - Blog content
- `cases.json` - Portfolio case studies
- `shop-categories.json`, `shop-products.json` - Shop content
- Site configuration in `app/app.config.ts`

### Feature Flags
Controlled via `runtimeConfig` in `nuxt.config.ts`:
- `shopEnabled: false`
- `blogEnabled: false`
- `portfolioEnabled: true`
- `pageMode: 'single'`
- `portfolioMode: 'grid'`

## Development Notes
- Language preference is saved in cookies and localStorage
- The site uses a no-prefix i18n strategy for cleaner URLs
- Images are stored in `app/assets/img/` and `public/img/`
