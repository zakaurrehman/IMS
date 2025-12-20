# 🚀 MetalsTrade - Redesigned Website

Welcome to the newly redesigned MetalsTrade website! This document outlines the new structure and how to work with it.

## 📦 What's New?

### **New Component-Based Architecture**

All components are now organized by feature, making the codebase more maintainable and scalable:

```
components/
├── Navbar/          ← Main navigation
├── Pricing/         ← Pricing section & cards
├── Hero/            ← Landing hero banner
├── Features/        ← Feature showcase
├── Footer/          ← Footer with links
└── CTA/             ← Call-to-action section
```

### **New Public Pages**

- **Home** (`/`) - Landing page with Hero, Features, Pricing
- **Pricing** (`/pricing`) - Pricing plans with FAQ
- **About** (`/about`) - Company info, mission, team
- **Features** (`/features`) - Detailed feature showcase

### **Optimized Structure**

✅ Clean component hierarchy  
✅ Reusable sub-components  
✅ Responsive mobile-first design  
✅ Tailwind CSS styling  
✅ Easy to customize  

---

## 🎯 Quick Start

### **View the Site**

```bash
npm run dev
# Visit http://localhost:3000
```

### **Customize Branding**

1. **Update Logo** → `components/Navbar/navbarContent.jsx` (Line 15-17)
2. **Update Company Name** → Replace "MetalsTrade" throughout
3. **Update Colors** → Edit Tailwind classes (search for `blue-600`)

### **Update Pricing Plans**

Edit `components/Pricing/pricingContent.jsx` lines 8-35

```jsx
const plans = [
  {
    name: 'Your Plan',
    price: '$99',
    features: ['Feature 1', 'Feature 2'],
    // ...
  }
];
```

### **Update Features**

Edit `components/Features/features.jsx` lines 5-18

```jsx
const features = [
  {
    icon: '📋',
    title: 'Your Feature',
    description: 'Feature description',
  }
];
```

---

## 📚 Documentation

For detailed information, see:

- **Architecture Overview** → `NEW_ARCHITECTURE.md`
- **Customization Guide** → `CUSTOMIZATION_GUIDE.md`
- **Original Architecture** → `ARCHITECTURE.md`

---

## 🗂️ File Structure

### **Component Organization**

```
components/
├── Navbar/
│   ├── navbar.jsx           (Main wrapper)
│   ├── navbarContent.jsx    (Container & responsive logic)
│   ├── navbarLinks.jsx      (Desktop links)
│   └── navbarMenu.jsx       (Mobile menu)
│
├── Pricing/
│   ├── pricing.jsx          (Section wrapper)
│   ├── pricingContent.jsx   (Cards container)
│   ├── pricingCard.jsx      (Individual card)
│   └── pricingFeatures.jsx  (Feature list)
│
├── Hero/
│   └── hero.jsx             (Landing hero)
│
├── Features/
│   ├── features.jsx         (Grid container)
│   └── featureCard.jsx      (Individual card)
│
├── Footer/
│   └── footer.jsx           (Footer with links)
│
└── CTA/
    └── cta.jsx              (Call-to-action)
```

### **Page Organization**

```
app/
├── page.js                      (Home/Landing)
│
├── (public)/
│   ├── landing/page.jsx         (Landing alternative)
│   ├── pricing/page.jsx         (Pricing page)
│   ├── about/page.jsx           (About page)
│   └── features/page.jsx        (Features page)
│
├── (auth)/
│   ├── signin/                  (Sign in)
│   └── signup/                  (Sign up)
│
└── (root)/                      (Protected routes - unchanged)
    ├── contracts/
    ├── invoices/
    └── [Other pages...]
```

---

## 🎨 Design System

### **Colors**

```
Primary:   bg-blue-600, text-blue-600
Light:     bg-blue-50, text-blue-100
Dark:      bg-gray-900
White:     bg-white
Success:   bg-green-500
```

### **Typography**

```
Headings:    font-bold (2xl to 5xl)
Body:        font-normal text-gray-600
Links:       text-blue-600 hover:text-blue-700
Buttons:     font-semibold px-4 py-2 rounded-lg
```

### **Spacing**

```
Padding:     px-4 py-3 (base units)
Margins:     mb-4 mt-6 (consistent spacing)
Container:   max-w-[container] mx-auto (centered)
```

---

## 🔄 Component Patterns

### **Section Wrapper Pattern**

Each major section follows this pattern:

```jsx
export default function SectionName() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">Title</h2>
        {/* Content */}
      </div>
    </section>
  );
}
```

### **Card Pattern**

Cards use consistent styling:

```jsx
<div className="p-8 rounded-xl border-2 border-gray-200 hover:shadow-lg">
  {/* Card content */}
</div>
```

### **Responsive Pattern**

Mobile-first approach with Tailwind breakpoints:

```jsx
<div className="grid md:grid-cols-2 gap-8">
  {/* Single column on mobile, 2 on desktop */}
</div>
```

---

## 🛠️ Development Tasks

### **Add a New Feature Section**

1. Create folder: `components/FeatureName/`
2. Create main component: `featureName.jsx`
3. Create sub-components as needed
4. Export from `components/index.js`
5. Import and use in pages

### **Add a New Page**

1. Create folder: `app/(public)/newpage/`
2. Create `page.jsx` with standard layout:
   ```jsx
   <Navbar />
   <main>Content</main>
   <Footer />
   ```

### **Customize Colors**

Find & replace in all components:
- Change `blue-600` to your color
- Update class names throughout

---

## 🚀 Deployment

### **Build for Production**

```bash
npm run build
npm start
```

### **Deploy to Vercel**

```bash
vercel deploy
```

The site will be deployed and ready to use!

---

## 📱 Responsive Design

All components are mobile-responsive:

- **Mobile**: Default Tailwind classes
- **Tablet**: `md:` breakpoint (768px)
- **Desktop**: `lg:` breakpoint (1024px)

Test on actual devices to ensure proper display.

---

## 🔒 Protected Routes

The (root) group contains all protected routes that require authentication:

- `/contracts`
- `/invoices`
- `/expenses`
- `/accounting`
- `/dashboard`
- etc.

These remain unchanged and work as before.

---

## 💡 Tips & Tricks

### **Quick Color Change**

1. Open search (Ctrl+Shift+H or Cmd+Shift+H)
2. Find: `bg-blue-600`
3. Replace: `bg-[your-color]-600`
4. Do the same for `blue-50`, `blue-100`, etc.

### **Add Component Quickly**

Use the export from `components/index.js`:

```jsx
import { Navbar, Footer, Pricing } from '@/components';

export default function MyPage() {
  return (
    <div>
      <Navbar />
      <Pricing />
      <Footer />
    </div>
  );
}
```

### **Debug Layout Issues**

Add visual debugging:

```jsx
<div className="border-2 border-red-500 p-2">
  Debug content
</div>
```

---

## 📞 Support

For issues or questions:

1. Check `NEW_ARCHITECTURE.md` for structure details
2. Check `CUSTOMIZATION_GUIDE.md` for how to customize
3. Review component files - they're well-commented
4. Check Tailwind docs for styling: https://tailwindcss.com

---

## ✅ Next Steps

1. ✅ Review the new structure
2. ⬜ Customize branding (logo, colors, text)
3. ⬜ Update pricing plans
4. ⬜ Update team information
5. ⬜ Add contact form (optional)
6. ⬜ Setup analytics (optional)
7. ⬜ Test on mobile devices
8. ⬜ Deploy to production

---

**Happy building! 🎉**

Questions? See the documentation files or review the component code - it's well-organized and easy to follow!
