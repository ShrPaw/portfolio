# Nicolas Bustamante — Portfolio

A premium, production-ready portfolio website showcasing Data Analysis, AI Automation, Python Development, and Trading Systems expertise.

## ✨ Features

- **Premium UI** — Minimalist, modern design with smooth Framer Motion animations
- **Interactive Particle Field** — Neural mesh background effect
- **Typewriter Hero** — Animated role rotation
- **3D Tilt Cards** — Skills and projects with perspective transforms
- **Animated Stats Counter** — Numbers count up on scroll
- **Glass Morphism Navbar** — Scroll-aware with active section indicator
- **AI Chatbot Widget** — Offline assistant with smart responses
- **Custom Cursor** — Glowing orb with trailing effect (desktop)
- **Scroll Progress Bar** — Gradient indicator at top of page
- **Fully Responsive** — Works on mobile, tablet, and desktop

## 🛠 Tech Stack

- React 19 + TypeScript
- Vite 6 (fast builds)
- Tailwind CSS 4
- Framer Motion (animations)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server (opens on port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
portfolio-final/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── public/
│   ├── favicon.svg
│   └── manifest.json
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── lib/
    │   └── utils.ts
    └── components/
        ├── ScrollProgress.tsx
        ├── CustomCursor.tsx
        ├── Navbar.tsx
        ├── Hero.tsx
        ├── ParticleField.tsx
        ├── About.tsx
        ├── Timeline.tsx
        ├── StatsCounter.tsx
        ├── Skills.tsx
        ├── Services.tsx
        ├── Projects.tsx
        ├── Contact.tsx
        ├── Footer.tsx
        └── ChatbotWidget.tsx
```

## 🎨 Sections

| Section | Description |
|---------|-------------|
| **Hero** | Animated avatar, typewriter, magnetic CTAs |
| **About** | Staggered text reveal with key highlights |
| **Timeline** | Animated career journey (2019–present) |
| **Stats** | Animated counters (years, bots, revenue) |
| **Skills** | 3D tilt cards with progress rings |
| **Services** | Freelance offerings with pricing |
| **Projects** | 6 showcase cards with tilt effects |
| **Contact** | Glass card with email, location, socials |
| **Chatbot** | Offline AI assistant widget |

## 🌐 Deploy

### Vercel
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm i -g serve
CMD ["serve", "-s", "dist", "-l", "3000"]
EXPOSE 3000
```

## 📝 License

MIT
