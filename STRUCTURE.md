# 📁 Project Structure

This document explains the project's folder structure and organization following Next.js best practices.

## 🏗️ Directory Structure

```
adzora/
├── app/                          # Next.js App Router (Pages only)
│   ├── favicon.ico              # Site favicon
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
│
├── components/                   # All React components
│   ├── layout/                  # Layout components
│   │   ├── Navbar.tsx          # Navigation bar
│   │   └── Footer.tsx          # Footer
│   │
│   ├── sections/                # Page sections
│   │   ├── Hero.tsx            # Hero/Banner section
│   │   ├── Gallery.tsx         # Gallery with filters & lightbox
│   │   ├── About.tsx           # About section
│   │   └── Contact.tsx         # Contact form
│   │
│   └── ui/                      # Reusable UI components
│       └── (future components)
│
├── lib/                         # Utilities, data, and helpers
│   ├── data/                    # Data files
│   │   └── gallery-data.ts     # Gallery items data
│   │
│   ├── types/                   # TypeScript types
│   │   └── index.ts            # Shared type definitions
│   │
│   └── utils/                   # Helper functions
│       └── (future utilities)
│
├── public/                      # Static assets
│   ├── images/                  # Images
│   ├── icons/                   # Icons
│   └── fonts/                   # Custom fonts
│
├── .github/                     # GitHub configuration
│   └── workflows/               # CI/CD workflows
│       └── deploy-vercel.yml   # Vercel deployment
│
├── .gitignore                   # Git ignore rules
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── package.json                 # Dependencies
└── README.md                    # Main documentation
```

## 📝 File Organization Principles

### 1. **app/ Directory**
- Contains **only** page routes and layouts
- No business logic or components
- Clean and minimal

### 2. **components/ Directory**
Organized by function:
- `layout/` - Site-wide components (Navbar, Footer)
- `sections/` - Large page sections (Hero, Gallery, About, Contact)
- `ui/` - Reusable UI components (Buttons, Cards, Modals)

### 3. **lib/ Directory**
- `data/` - Static data and mock data
- `types/` - TypeScript interfaces and types
- `utils/` - Helper functions and utilities

### 4. **Import Aliases**
Using `@/` for clean imports:
```typescript
// ❌ Bad
import Hero from "../../components/sections/Hero"

// ✅ Good
import Hero from "@/components/sections/Hero"
```

## 🎯 Benefits

✅ **Clear Separation**: Pages vs Components vs Logic  
✅ **Scalability**: Easy to add new features  
✅ **Maintainability**: Find files quickly  
✅ **Type Safety**: Centralized type definitions  
✅ **Reusability**: Components are easy to share  
✅ **Clean Imports**: Using @ alias everywhere  

## 📦 Adding New Features

### Add a new page section:
```
components/sections/NewSection.tsx
```

### Add a new UI component:
```
components/ui/Button.tsx
```

### Add new data:
```
lib/data/new-data.ts
```

### Add new types:
```
lib/types/index.ts (add to existing file)
```

## 🔄 Migration Notes

This structure follows:
- [Next.js Project Structure](https://nextjs.org/docs/getting-started/project-structure)
- [React Best Practices](https://react.dev/learn/thinking-in-react)
- Industry-standard conventions

---

**Last Updated:** October 18, 2025
