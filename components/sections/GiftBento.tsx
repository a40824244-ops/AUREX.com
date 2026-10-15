"use client";

import { gifting } from "../content";
import { Lines, plain } from "./Rich";
import Meniscus from "./Meniscus";
import { addToCart, parsePrice } from "../lib/cart";

// Gifting & offers (Motion map M34 snap-in tiles). Five dark-glass tiles in a bento: the discovery set (big, its own
// photo), free engraving (an engraved italic initial), gift wrap, samples, refills (note photos, darkened). The tiles
// drift in from different sides and lock into the grid (Round 3). ?static=1: the plain grid.

export default function GiftBento() {
  const [disc, engrave, ...rest] = gifting.tiles;
  return (
    <section id="gifting" className="gifting relative z-[3] bg-bg section-y" data-record-time="1.3" data-record-hold="0.3" data-record-align="center" data-record-label="Gifting">
      <div className="absolute inset-x-0 top-0">
        <Meniscus />
      </div>
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <h2 className="font-display h-lg" aria-label={plain(gifting.title)}>
            <Lines lines={gifting.title} />
          </h2>
          <p className="eyebrow mb-3">{gifting.eyebrow}</p>
        </div>

        <div className="gift-grid mt-16 grid gap-3 lg:h-[78vh] lg:grid-cols-4 lg:grid-rows-2">
          {/* discovery set: big tile */}
          <article className="tile gift-tile group min-h-[460px] lg:col-span-2 lg:row-span-2" data-cursor="View">
            {/* Three bottles side by side */}
            <div className="absolute inset-0 flex items-end justify-center gap-0 overflow-hidden bg-[#0d0b0a]">
              {[
                { src: "/images/nocturne/bottle-janan.webp", name: "Janan Sports" },
                { src: "/images/nocturne/bottle-9pm.webp",   name: "9pm Night Light" },
                { src: "/images/nocturne/bottle-legend.webp", name: "Legend" },
              ].map((b) => (
                <div key={b.name} className="relative flex flex-1 flex-col items-center justify-end h-full transition-transform duration-[1.4s] group-hover:scale-[1.04]">
                  <img
                    src={b.src}
                    alt={b.name}
                    className="h-[78%] w-full object-contain object-bottom drop-shadow-2xl"
                  />
                  <span className="mb-4 text-[11px] tracking-widest text-white/50 uppercase">{b.name}</span>
                </div>
              ))}
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(13,11,10,0.96)_0%,rgba(13,11,10,0.18)_38%,transparent_60%)]" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-8">
              <div>
                <h3 className="font-display text-[clamp(34px,3vw,52px)] leading-none">{disc.title}</h3>
                <p className="mt-3 max-w-[40ch] text-[14px] leading-relaxed text-muted">{disc.text}</p>
              </div>
              <div className="flex flex-col items-end gap-3 shrink-0">
                <span className="font-display text-[34px] leading-none">{disc.price}</span>
                <button
                  type="button"
                  onClick={() =>
                    addToCart({
                      id: "discovery-set",
                      name: disc.title,
                      size: "3 × 2 ml",
                      price: disc.price || "Rs. 4,999",
                      numericPrice: parsePrice(disc.price || "4999"),
                      image: "/images/nocturne/bottle-janan.webp",
                    })
                  }
                  className="btn btn-solid !px-4 !py-2 text-[13px]"
                >
                  Add to bag +
                </button>
              </div>
            </div>
          </article>

          {/* engraving */}
          <article className="tile gift-tile flex min-h-[260px] flex-col justify-between p-7">
            <span className="engraved font-display self-center text-[clamp(110px,10vw,170px)] italic leading-[0.8]">{engrave.initial}</span>
            <div>
              <h3 className="font-display text-[28px] leading-none">{engrave.title}</h3>
              <p className="mt-2 text-[14px] text-muted">{engrave.text}</p>
            </div>
          </article>

          {rest.map((t) => (
            <article key={t.id} className="tile gift-tile flex min-h-[260px] flex-col justify-end p-7">
              {t.image && <img src={t.image} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-45" />}
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(13,11,10,0.95)_10%,rgba(13,11,10,0.3)_70%)]" />
              <div className="relative">
                <h3 className="font-display text-[28px] leading-none">{t.title}</h3>
                <p className="mt-2 text-[14px] text-muted">{t.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
