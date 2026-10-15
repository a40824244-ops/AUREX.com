import { contact } from "../content";

const message = "Hello AUREX, I would like to know more about your fragrances.";

export default function WhatsAppButton() {
  const href = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with AUREX on WhatsApp"
      title="WhatsApp"
      className="whatsapp-float"
    >
      <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M16.03 3.2a12.56 12.56 0 0 0-10.7 19.14L3.6 28.8l6.6-1.7a12.58 12.58 0 1 0 5.83-23.9Zm0 22.84a10.2 10.2 0 0 1-5.2-1.42l-.37-.22-3.9 1 .99-3.8-.24-.39a10.25 10.25 0 1 1 8.72 4.83Zm5.62-7.68c-.31-.16-1.85-.91-2.14-1.02-.29-.1-.5-.16-.71.16-.2.31-.81 1.02-.99 1.23-.18.2-.36.23-.67.08-.31-.16-1.3-.48-2.47-1.52-.91-.81-1.53-1.81-1.71-2.12-.18-.31-.02-.48.14-.64.14-.14.31-.36.46-.54.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.71-1.71-.97-2.35-.25-.62-.51-.54-.71-.55h-.61c-.21 0-.55.08-.84.39-.29.31-1.1 1.07-1.1 2.61s1.13 3.03 1.29 3.24c.16.21 2.22 3.39 5.38 4.75.75.32 1.33.51 1.79.65.75.24 1.43.2 1.97.12.6-.09 1.85-.76 2.11-1.49.26-.73.26-1.36.18-1.49-.08-.13-.29-.21-.6-.37Z" />
      </svg>
      <span className="whatsapp-float-label">WhatsApp</span>
    </a>
  );
}