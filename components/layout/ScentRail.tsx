"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { rail } from "../content";
import { getCart, getCartCount, openCart } from "../lib/cart";

// Nav N6 "left vertical rail" (Motion map M24 outline to fill). "AUREX" stands vertically in outline letters that
// fill with amber as you read down the page (the rail is the progress bar); five chapter marks; the bag at the foot.
// Top right and phone bar: a direct Contact link beside the bag.

export default function ScentRail() {
  const root = useRef<HTMLDivElement>(null);
  const contactLink = useRef<HTMLDivElement>(null);
  const [bag, setBag] = useState(0);

  // Sync with actual cart count and animate on item add
  useEffect(() => {
    setBag(getCartCount(getCart()));

    const handleCartUpdate = () => {
      setBag(getCartCount(getCart()));
    };

    const handleBagBump = () => {
      setBag(getCartCount(getCart()));
      const counts = root.current?.querySelectorAll(".bag-count");
      if (!counts) return;
      gsap
        .timeline()
        .to(counts, { scale: 1.7, backgroundColor: "#e9a04c", duration: 0.22, ease: "power2.out" })
        .to(counts, { scale: 1, backgroundColor: "#ece2d0", duration: 0.6, ease: "power3.out" });
    };

    window.addEventListener("cart:updated", handleCartUpdate);
    window.addEventListener("bag:add", handleBagBump);

    return () => {
      window.removeEventListener("cart:updated", handleCartUpdate);
      window.removeEventListener("bag:add", handleBagBump);
    };
  }, []);

  // page progress → --p (0..1) on the rail and the phone bar
  useEffect(() => {
    const el = root.current!;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.setProperty("--p", p.toFixed(4));
      // the Contact link steps aside while a strip marked data-hide-pill (the ticker) passes under it
      const under = Array.from(document.querySelectorAll<HTMLElement>("[data-hide-pill]")).some((s) => {
        const r = s.getBoundingClientRect();
        return r.top < 96 && r.bottom > 0;
      });
      contactLink.current?.classList.toggle("is-away", under);
      // the chapter mark of the section in the middle of the screen lights up
      let active = "";
      for (const c of rail.chapters) {
        const sec = document.getElementById(c.id);
        if (sec && sec.getBoundingClientRect().top <= window.innerHeight * 0.5) active = c.id;
      }
      el.querySelectorAll<HTMLElement>(".rail-mark").forEach((m) => m.classList.toggle("is-active", m.dataset.chapter === active));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={root}>
      {/* ---------- laptop: the rail ---------- */}
      <nav aria-label="Main" className="rail fixed inset-y-0 left-0 z-50 hidden w-[var(--rail-w)] flex-col items-center justify-between border-r border-[rgba(236,226,208,0.08)] bg-[linear-gradient(90deg,rgba(13,11,10,0.72),rgba(13,11,10,0.2))] py-7 backdrop-blur-[2px] lg:flex">
        <a href="#top" aria-label="AUREX, back to top" className="font-display flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(236,226,208,0.3)] text-[20px] italic leading-none text-fg">
          A
        </a>

        <div className="rail-word font-display relative text-[46px] tracking-[0.04em]" data-cursor="Top">
          <span className="outline">AUREX</span>
          <span className="fill" aria-hidden>
            AUREX
          </span>
        </div>

        <ul className="flex flex-col items-center gap-5">
          {rail.chapters.map((c) => (
            <li key={c.id}>
              <a href={`#${c.id}`} data-chapter={c.id} className="rail-mark group flex flex-col items-center gap-2 text-[12px] tracking-[0.12em] text-muted transition-colors hover:text-fg">
                <span className="rail-dot block h-[5px] w-[5px] rounded-full bg-[rgba(236,226,208,0.35)] transition-[background-color,box-shadow] duration-500" />
                {c.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Bag Icon triggers Cart Drawer */}
        <button
          onClick={openCart}
          type="button"
          aria-label={`Bag, ${bag} items`}
          className="relative flex h-10 w-10 items-center justify-center text-fg transition-transform hover:scale-110"
          data-cursor="Bag"
        >
          <BagIcon />
          <span className="bag-count absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[var(--ivory)] px-1 text-[12px] font-medium leading-none text-[var(--smoke)]">
            {bag}
          </span>
        </button>
      </nav>

      {/* top-right contact link (laptop) */}
      <div ref={contactLink} data-magnet className="contact-pill fixed right-8 top-7 z-50 hidden transition-[opacity,transform] duration-500 lg:block [&.is-away]:pointer-events-none [&.is-away]:-translate-y-3 [&.is-away]:opacity-0">
        <a href="#contact" className="btn btn-outline !px-6 !py-3">
          Contact
        </a>
      </div>

      {/* ---------- phone: top bar ---------- */}
      <div className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-[rgba(236,226,208,0.08)] bg-[rgba(13,11,10,0.7)] px-5 backdrop-blur-md lg:hidden">
        <a href="#top" className="bar-word font-display relative text-[20px] leading-none">
          <span className="outline">AUREX</span>
          <span className="fill" aria-hidden>
            AUREX
          </span>
        </a>
        <div className="flex items-center gap-4">
          <button
            onClick={openCart}
            type="button"
            aria-label={`Bag, ${bag} items`}
            className="relative text-fg"
          >
            <BagIcon />
            <span className="bag-count absolute -right-2 -top-1.5 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-[var(--ivory)] px-1 text-[12px] leading-none text-[var(--smoke)]">
              {bag}
            </span>
          </button>
          <a href="#contact" className="label text-fg">Contact</a>
        </div>
      </div>
    </div>
  );
}

function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
      <path d="M5 8h14l-1.2 12.2a1 1 0 0 1-1 .8H7.2a1 1 0 0 1-1-.8L5 8Z" />
      <path d="M9 10V6.5a3 3 0 0 1 6 0V10" />
    </svg>
  );
}
