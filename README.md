# FrostyLabs Landing Page ❄️

The official landing page for [FrostyLabs.ai](https://frostylabs.ai) - Build AI-powered workflows for anything in Web3.

![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?logo=typescript)
![License](https://img.shields.io/badge/License-Private-red)

## 🚀 Live Site

**Production:** [https://frostylabs.ai](https://frostylabs.ai)

## ✨ Features

- 🎨 **Modern Design** - Sleek dark theme with glassmorphism and animations
- 🌍 **Internationalization** - Multi-language support (EN, ES, FR, ZH) via next-intl
- 🔐 **Web3 Wallet Connect** - ThirdWeb integration for seamless wallet connection
- 📱 **Fully Responsive** - Mobile-first design with Tailwind CSS
- ⚡ **Optimized Performance** - Server-side rendering with Next.js App Router
- 🎬 **Video Demos** - Embedded workflow demonstrations
- 📧 **Waitlist Integration** - Google Forms for beta signups
- 🔒 **SEO Optimized** - Schema.org markup, Open Graph, Twitter Cards

## 🛠️ Tech Stack

- **Framework:** Next.js 15.3.2 (App Router)
- **Language:** TypeScript 5.9.3
- **Styling:** Tailwind CSS 4.1.17
- **UI Components:** Radix UI, shadcn/ui
- **Animations:** Framer Motion
- **Internationalization:** next-intl
- **Web3:** ThirdWeb SDK 5.105.16
- **Icons:** Lucide React
- **Forms:** Google Forms integration

## 📋 Prerequisites

- Node.js 20+ 
- pnpm 10+
- Git

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone <repository-url>
cd frostylabs_landing_v2
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_thirdweb_client_id
THIRDWEB_SECRET_KEY=your_thirdweb_secret_key
```

### 4. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📦 Build

```bash
pnpm build
```

The optimized production build will be created in `.next/`.


## 📁 Project Structure

```
frostylabs_landing_v2/
├── app/                    # Next.js App Router pages
│   ├── [locale]/          # Internationalized routes
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── Hero.tsx          # Hero section with wallet connect
│   ├── Features.tsx      # Features showcase
│   └── VideoDemo.tsx     # Video demonstration
├── i18n/                 # Internationalization config
├── lib/                  # Utility functions
│   └── thirdweb.ts      # ThirdWeb client setup
├── public/              # Static assets
│   └── resources/       # Images, videos, logos
├── messages/            # Translation files (en, es, fr, zh)
├── next.config.ts       # Next.js configuration
├── nixpacks.toml        # Nixpacks build configuration
└── tailwind.config.ts   # Tailwind CSS configuration
```

## 🌍 Internationalization

Supported languages:
- 🇺🇸 English (en)
- 🇪🇸 Spanish (es)
- 🇫🇷 French (fr)
- 🇨🇳 Chinese (zh)

Translation files are in `messages/[locale].json`.

## 🎨 Customization

### Colors

Edit `app/globals.css` to customize the color scheme:

```css
--frost-blue: #4FB8FF
--ice-blue: #7DD3FC
--crystal-blue: #38BDF8
--frozen-slate: #1E293B
```

### Fonts

The site uses **Orbitron** (Google Fonts) for headings. Update in `app/layout.tsx`.

## 📝 Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## 🤝 Contributing

This is a private repository. Contact the team for contribution guidelines.

## 📄 License

Private - © 2024 FrostyLabs.ai

## 🔗 Links

- **Website:** [https://frostylabs.ai](https://frostylabs.ai)
- **Twitter:** [@FrostyLabsAi](https://x.com/FrostyLabsAi)
- **GitHub:** [@FrostyLabsAi](https://github.com/FrostyLabsAi)

---

**Built with ❄️ by the FrostyLabs team**
