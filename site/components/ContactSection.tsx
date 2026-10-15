"use client";

import emailjs from "@emailjs/browser";
import { useState } from "react";
import { contact } from "../content";
import { Lines, plain } from "./Rich";

export default function ContactSection() {
  const [sendState, setSendState] = useState<"idle" | "sending" | "sent" | "error" | "unconfigured">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setSendState("sending");
    setErrorMessage("");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setSendState("unconfigured");
      return;
    }

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setErrorMessage("Please fill all fields.");
      setSendState("error");
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name,
          from_name: name,
          to_name: name,
          email,
          to_email: email,
          subject: `New inquiry from ${name} — AUREX`,
          message,
          reply_to: contact.email,
        },
        {
          publicKey,
        }
      );

      form.reset();
      setSendState("sent");
    } catch (err: any) {
      console.error("Failed to send email via EmailJS:", err);
      const text = err?.text || err?.message || "Message could not be sent. Please try again.";
      setErrorMessage(text);
      setSendState("error");
    }
  }

  return (
    <section id="contact" className="contact-section relative z-[3] overflow-hidden bg-[#171310] section-y" data-record-time="1.2" data-record-align="center" data-record-label="Contact">
      <div className="container-x relative">
        <p className="eyebrow">The house</p>
        <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_minmax(320px,0.85fr)] lg:items-end lg:gap-20">
          <div>
            <h2 className="font-display h-lg" aria-label={plain(contact.title)}>
              <Lines lines={contact.title} />
            </h2>
            <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-muted">{contact.text}</p>
            <a href={`mailto:${contact.email}`} className="mt-7 inline-flex items-center gap-3 text-[14px] text-fg transition-colors hover:text-[color:var(--amber)]">
              {contact.email}<span aria-hidden>↗</span>
            </a>
          </div>
          <form onSubmit={sendMessage} className="grid gap-7">
            <label className="grid gap-2 text-[12px] uppercase tracking-[0.18em] text-muted">
              Your name
              <input name="name" type="text" autoComplete="name" required className="border-b border-line bg-transparent py-3 text-[16px] normal-case tracking-normal text-fg outline-none transition-colors placeholder:text-muted/60 focus:border-[color:var(--amber)]" placeholder="Name" />
            </label>
            <label className="grid gap-2 text-[12px] uppercase tracking-[0.18em] text-muted">
              Email address
              <input name="email" type="email" autoComplete="email" required className="border-b border-line bg-transparent py-3 text-[16px] normal-case tracking-normal text-fg outline-none transition-colors placeholder:text-muted/60 focus:border-[color:var(--amber)]" placeholder="you@example.com" />
            </label>
            <label className="grid gap-2 text-[12px] uppercase tracking-[0.18em] text-muted">
              Your note
              <textarea name="message" required rows={3} className="resize-y border-b border-line bg-transparent py-3 text-[16px] normal-case tracking-normal text-fg outline-none transition-colors placeholder:text-muted/60 focus:border-[color:var(--amber)]" placeholder="How can we help?" />
            </label>
            <button type="submit" disabled={sendState === "sending"} className="btn btn-solid justify-self-start !px-6 !py-4 disabled:cursor-not-allowed disabled:opacity-60">
              {sendState === "sending" ? "Sending..." : "Send a note"} <span aria-hidden>↗</span>
            </button>
            {sendState !== "idle" && (
              <p role="status" aria-live="polite" className="text-[14px]">
                {sendState === "sending" && <span className="text-muted">Sending your message...</span>}
                {sendState === "sent" && <span className="text-[#a8e6cf]">Thanks. Your message has been sent successfully.</span>}
                {sendState === "error" && <span className="text-[#ff8b8b]">{errorMessage || "Message could not be sent. Please try again."}</span>}
                {sendState === "unconfigured" && <span className="text-muted">Email delivery is not configured yet.</span>}
              </p>
            )}
          </form>
        </div>
        <svg className="contact-line mt-16 block h-10 w-full max-w-3xl overflow-visible text-[color:var(--amber)]" viewBox="0 0 720 40" fill="none" aria-hidden="true">
          <path d="M1 28C126 28 118 8 242 8S354 34 474 23 594 5 719 5" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
    </section>
  );
}