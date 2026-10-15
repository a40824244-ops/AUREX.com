"use client";

import emailjs from "@emailjs/browser";
import { useState } from "react";
import { footer } from "../content";

// Footer (Motion map M12 split text stagger, letters). Link columns + "Letters, after dark" signup, then a huge
// italic AUREX wordmark across the bottom whose letters rise one by one out of a mask, the final "X" with an amber glint
// (Round 3). ?static=1: the full word.

export default function NocturneFooter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function handleNewsletter(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("sending");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (serviceId && templateId && publicKey) {
      try {
        await emailjs.send(
          serviceId,
          templateId,
          {
            name: "Newsletter Subscriber",
            to_name: "Subscriber",
            from_name: "AUREX",
            email: email.trim(),
            to_email: email.trim(),
            message: "New subscription request to 'Letters, after dark' from: " + email.trim(),
          },
          publicKey
        );
      } catch (err) {
        console.error("Footer newsletter EmailJS error:", err);
      }
    }

    setEmail("");
    setStatus("sent");
  }

  return (
    <footer className="relative z-[3] overflow-hidden border-t border-line bg-bg pt-24" data-record-time="1.4" data-record-align="bottom" data-record-label="Footer">
      <div className="container-x grid gap-12 md:grid-cols-[1.3fr_repeat(3,minmax(0,1fr))]">
        <div className="max-w-[360px]">
          <p className="font-display text-[34px] leading-none">{footer.letter}</p>
          <p className="mt-3 text-[14px] text-muted">{footer.letterNote}</p>
          <form className="mt-6 flex border-b border-[rgba(236,226,208,0.3)]" onSubmit={handleNewsletter}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Your email"
              aria-label="Your email"
              className="w-full bg-transparent py-3 text-[15px] text-fg placeholder:text-muted focus:outline-none"
            />
            <button type="submit" disabled={status === "sending"} className="label shrink-0 text-fg disabled:opacity-50">
              {status === "sending" ? "..." : "Join →"}
            </button>
          </form>
          {status === "sent" && <p className="mt-2 text-[13px] text-[#a8e6cf]">Subscribed successfully.</p>}
        </div>
        {footer.columns.map((c) => (
          <div key={c.title}>
            <p className="label text-muted">{c.title}</p>
            <ul className="mt-5 space-y-3">
              {c.links.map((l) => (
                <li key={l}>
                  <a href="#top" className="link-underline text-[15px]">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="relative mt-20 flex justify-center overflow-hidden px-4" aria-label={footer.word}>
        <p className="foot-word font-display whitespace-nowrap text-[30px] italic leading-[0.9] sm:text-[40px] md:text-[76px] lg:text-[112px] xl:text-[140px]" aria-hidden>
          {footer.word.split("").map((ch, i) => (
            <span key={i} className="foot-mask inline-block overflow-hidden pb-[0.08em] pr-[0.02em]">
              <span className={`foot-letter ${i === footer.word.length - 1 ? "text-[color:var(--amber-soft)]" : ""}`}>{ch}</span>
            </span>
          ))}
        </p>
      </div>
      <div className="container-x flex flex-wrap items-center justify-between gap-4 border-t border-line py-6 text-[12px] text-muted">
        <p>{footer.note}</p>
        <p>© AUREX · concept</p>
      </div>
    </footer>
  );
}
