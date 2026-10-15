import { closing } from "../content";
import { Lines, plain } from "./Rich";

// Closing "stay a little longer" (Motion map M37 breathing light).
// Left side: Headline + Shop CTA.
// Right side: Compact Afshan perfume bottle with warm ambient glow.

export default function RainClosing() {
  return (
    <section className="closing relative z-[3] min-h-[640px] overflow-hidden bg-bg section-y py-24" data-record-time="2.2" data-record-hold="0.6" data-record-label="Closing">
      <div aria-hidden className="city-glow pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_55%_at_30%_35%,rgba(255,190,110,0.12),transparent_70%)] mix-blend-screen" />
      <div aria-hidden className="rain pointer-events-none absolute inset-0 opacity-60" />

      <div className="container-x relative z-[2] flex min-h-[500px] items-center justify-between gap-12 max-lg:flex-col max-lg:items-start max-lg:gap-14">
        {/* Left: Headline & CTA */}
        <div className="max-w-xl">
          <h2 className="font-display h-xl" aria-label={plain(closing.lines)}>
            <Lines lines={closing.lines} />
          </h2>
          <div className="closing-cta mt-12 flex flex-wrap items-center gap-6">
            <span data-magnet className="inline-block">
              <a href="#glass" className="btn btn-solid" data-cursor="Shop">
                {closing.cta}
              </a>
            </span>
            <span className="label text-muted">{closing.note}</span>
          </div>
        </div>

        {/* Right: Moderately sized Afshan perfume bottle */}
        <div className="relative flex w-full justify-center lg:w-auto lg:justify-end">
          <div className="breathe relative w-[290px] sm:w-[340px] md:w-[390px] lg:w-[420px] xl:w-[450px]">
            {/* Ambient amber aura behind the bottle */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(233,160,76,0.35),transparent_70%)] mix-blend-screen blur-2xl"
            />
            <img
              src={closing.image}
              alt="AUREX Afshan perfume"
              className="glass-photo aspect-[3/4] w-full rounded-2xl object-cover shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-[rgba(236,226,208,0.08)]"
              data-cursor="View"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
