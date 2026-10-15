# 🎨 FRONTEND — AUREX

Yahan sab UI/Visual code hai jo browser mein dikhta hai.

## Folder Structure

```
frontend/
├── components/
│   ├── sections/        ← Page ke har section ka component
│   │   ├── BeamHero.tsx         (Hero section — pehla screen)
│   │   ├── DarkStatement.tsx    (Quote section)
│   │   ├── TheDrop.tsx          (Scent notes animation)
│   │   ├── ServiceTicker.tsx    (Scrolling ticker)
│   │   ├── GlassCollection.tsx  (3 perfume bottles)
│   │   ├── WristMist.tsx        (Ritual section)
│   │   ├── SizeShelf.tsx        (Size options)
│   │   ├── NightFinder.tsx      (Quiz section)
│   │   ├── GiftBento.tsx        (Discovery set + gifting tiles)
│   │   ├── NightNotes.tsx       (Reviews)
│   │   ├── RainClosing.tsx      (Closing section)
│   │   └── ContactSection.tsx   (Contact form)
│   │
│   ├── layout/          ← Hamesha dikhne wale components
│   │   ├── ScentRail.tsx        (Side navigation)
│   │   ├── NocturneFooter.tsx   (Footer)
│   │   ├── CartDrawer.tsx       (Shopping bag drawer)
│   │   └── WhatsAppButton.tsx   (Floating WhatsApp button)
│   │
│   ├── ui/              ← Reusable small components & utilities
│   │   ├── Rich.tsx             (Text formatting helper)
│   │   ├── Meniscus.tsx         (Liquid divider effect)
│   │   ├── MistCanvas.tsx       (Mist animation canvas)
│   │   ├── Blotter.tsx          (Blur effect)
│   │   ├── SiteFlags.tsx        (Site-wide flags)
│   │   ├── ConcentrationLoader.tsx  (Custom loading screen)
│   │   ├── SectionMotion.tsx    (Scroll animations)
│   │   ├── Transitions.tsx      (Page transitions)
│   │   ├── Details.tsx          (Detail overlays)
│   │   └── useBlendFramePlayer.ts   (Frame animation hook)
│   │
│   └── engine/          ← Framework engine (animation, scroll, cursor)
│       ├── Loader.tsx
│       ├── Cursor.tsx
│       ├── SmoothScroll.tsx
│       ├── Animations.tsx
│       ├── RecordMode.tsx
│       └── useFramePlayer.ts
│
├── pages/               ← Page-level files
│   ├── HomePage.tsx     (Main site page — sab sections ek jagah)
│   ├── RootPage.tsx     (Next.js app/page.tsx)
│   └── RootLayout.tsx   (Next.js app/layout.tsx)
│
└── styles/              ← CSS & fonts
    ├── globals.css
    ├── site.css
    └── fonts.ts
```

## Note
> Ye files **reference/documentation** ke liye hain.
> Actual running code `site/` aur `app/` folders mein hai.
