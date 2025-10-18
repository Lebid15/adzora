# 🎨 Adzora - Creative Visual Content Platform

> A modern, fast, and responsive portfolio website for showcasing infographics, graphic design work, and visual content.

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Latest-ff0055?style=flat-square)](https://www.framer.com/motion/)

## ✨ Features

- 🚀 **Lightning Fast** - Built with Next.js 15 and Turbopack
- 📱 **Fully Responsive** - Works seamlessly on all devices
- 🎭 **Smooth Animations** - Powered by Framer Motion
- 🎨 **Modern Design** - Clean, aesthetic, and professional
- 🌙 **Dark Mode** - Automatic theme switching
- 🖼️ **Gallery System** - Filter by categories, lightbox view
- 📧 **Contact Form** - Easy client communication
- ♿ **Accessible** - WCAG compliant
- 🔍 **SEO Optimized** - Meta tags and semantic HTML

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/)
- **Deployment:** [Vercel](https://vercel.com/) (recommended)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Lebid15/adzora.git
   cd adzora
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open browser**
   ```
   http://localhost:3000
   ```

## 📂 Project Structure

```
adzora/
├── app/                    # Next.js App Router
│   ├── components/        # React components
│   │   ├── Navbar.tsx    # Navigation bar
│   │   ├── Hero.tsx      # Hero section
│   │   ├── Gallery.tsx   # Gallery with filters
│   │   ├── About.tsx     # About section
│   │   ├── Contact.tsx   # Contact form
│   │   └── Footer.tsx    # Footer
│   ├── data/             # Mock data
│   │   └── mockData.ts   # Gallery items
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── public/               # Static files
├── .github/              # GitHub Actions
├── next.config.ts        # Next.js configuration
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies
```

## 🎨 Customization

### Update Site Content

Edit `app/components/` files to customize:
- **Site Name & Logo:** `Navbar.tsx` and `Footer.tsx`
- **Hero Section:** `Hero.tsx`
- **About Info:** `About.tsx`
- **Contact Details:** `Contact.tsx`

### Add Gallery Items

Edit `app/data/mockData.ts` to add your own images/videos:

```typescript
{
  id: 1,
  type: 'image',
  src: 'your-image-url.jpg',
  thumbnail: 'your-thumbnail.jpg',
  title: 'Your Title',
  category: 'Your Category',
  tags: ['tag1', 'tag2'],
}
```

### Change Colors

Edit `app/globals.css` to customize colors:

```css
:root {
  --accent: #f97316;        /* Primary color */
  --accent-dark: #ea580c;   /* Darker shade */
}
```

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com/)
   - Click "Import Project"
   - Select your GitHub repository
   - Click "Deploy"

3. **Done!** Your site will be live in seconds 🎉

### Deploy to Namecheap (Alternative)

For traditional hosting:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Export static files** (if needed)
   ```bash
   npm run export
   ```

3. **Upload `out/` folder** to your hosting via FTP

## 📜 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Adzora Team**
- Website: [adzora.net](https://adzora.net)
- GitHub: [@Lebid15](https://github.com/Lebid15)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [Framer Motion](https://www.framer.com/motion/)
- Images from [Unsplash](https://unsplash.com/)

---

**Made with ❤️ for creative professionals**
