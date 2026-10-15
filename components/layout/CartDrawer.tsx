"use client";

import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  CartItem,
  getCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  getCartTotal,
  getCartCount,
  closeCart,
} from "../lib/cart";
import { contact } from "../content";

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState<null | {
    orderId: string;
    name: string;
    phone: string;
    address: string;
    city: string;
    total: number;
    itemsSummary: string;
  }>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    note: "",
  });

  // Sync cart state
  useEffect(() => {
    setItems(getCart());

    const handleUpdate = () => setItems(getCart());
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    window.addEventListener("cart:updated", handleUpdate);
    window.addEventListener("cart:open", handleOpen);
    window.addEventListener("cart:close", handleClose);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("cart:updated", handleUpdate);
      window.removeEventListener("cart:open", handleOpen);
      window.removeEventListener("cart:close", handleClose);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const total = getCartTotal(items);
  const count = getCartCount(items);

  async function handleConfirmOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address || !formData.city) return;
    if (items.length === 0) return;

    setIsSubmitting(true);
    const orderId = `AUREX-${Math.floor(1000 + Math.random() * 9000)}`;

    const itemsSummary = items
      .map((it) => `${it.name} (${it.size}) × ${it.quantity} — Rs. ${(it.numericPrice * it.quantity).toLocaleString()}`)
      .join("\n");

    const fullOrderDetails = `
ORDER ID: ${orderId}
----------------------------------------
Customer: ${formData.name}
Phone/WhatsApp: ${formData.phone}
Email: ${formData.email || "N/A"}
Address: ${formData.address}, ${formData.city}
Note: ${formData.note || "None"}
Payment: Cash on Delivery (COD)
----------------------------------------
ITEMS:
${itemsSummary}
----------------------------------------
TOTAL: Rs. ${total.toLocaleString()}
    `.trim();

    // 1. Try to send via EmailJS
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (serviceId && templateId && publicKey) {
      try {
        await emailjs.send(
          serviceId,
          templateId,
          {
            name: formData.name,
            from_name: formData.name,
            email: formData.email || contact.email,
            to_email: formData.email || contact.email,
            subject: `NEW ORDER #${orderId} — ${formData.name} (Rs. ${total.toLocaleString()})`,
            message: fullOrderDetails,
            reply_to: formData.email || contact.email,
          },
          { publicKey }
        );
      } catch (err) {
        console.error("EmailJS order notification failed:", err);
      }
    }

    setOrderComplete({
      orderId,
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      total,
      itemsSummary,
    });

    clearCart();
    setIsSubmitting(false);
  }

  const whatsappMessage = orderComplete
    ? encodeURIComponent(
        `Salam AUREX! I placed an order on your website:\n\n*Order ID:* ${orderComplete.orderId}\n*Name:* ${orderComplete.name}\n*Phone:* ${orderComplete.phone}\n*Address:* ${orderComplete.address}, ${orderComplete.city}\n\n*Items:*\n${orderComplete.itemsSummary}\n\n*Total:* Rs. ${orderComplete.total.toLocaleString()} (Cash on Delivery)`
      )
    : "";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className="relative z-10 flex h-full w-full max-w-lg flex-col bg-[#14100d] text-fg shadow-2xl border-l border-[rgba(236,226,208,0.1)] transition-transform duration-300"
        aria-label="Shopping bag"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[rgba(236,226,208,0.12)] px-6 py-5">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-[24px] tracking-tight">Your Bag</h2>
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[var(--amber-soft)] px-2 text-[12px] font-medium text-[#0d0b0a]">
              {count}
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(236,226,208,0.2)] text-muted transition-colors hover:border-fg hover:text-fg cursor-pointer"
            aria-label="Close bag"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {orderComplete ? (
            /* Order Completed Success View */
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(233,160,76,0.15)] text-[32px] text-[color:var(--amber)]">
                ✓
              </div>
              <h3 className="font-display mt-5 text-[28px]">Order Confirmed!</h3>
              <p className="mt-2 text-[15px] text-muted">
                Thank you, <span className="text-fg">{orderComplete.name}</span>. Your order has been placed.
              </p>
              <div className="mt-6 w-full rounded-xl border border-[rgba(236,226,208,0.1)] bg-[rgba(255,255,255,0.02)] p-4 text-left text-[14px]">
                <p className="text-muted">
                  Order ID: <span className="font-semibold text-fg">{orderComplete.orderId}</span>
                </p>
                <p className="mt-1 text-muted">
                  Total: <span className="font-semibold text-[color:var(--amber)]">Rs. {orderComplete.total.toLocaleString()}</span> (Cash on Delivery)
                </p>
                <p className="mt-1 text-muted">
                  Delivery to: <span className="text-fg">{orderComplete.address}, {orderComplete.city}</span>
                </p>
              </div>

              <div className="mt-8 flex w-full flex-col gap-3">
                <a
                  href={`https://wa.me/${contact.whatsapp}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-solid flex w-full items-center justify-center gap-2 !py-4 text-[14px]"
                >
                  Confirm on WhatsApp ↗
                </a>
              </div>
            </div>
          ) : items.length === 0 ? (
            /* Empty Cart View */
            <div className="flex h-full flex-col items-center justify-center text-center py-16">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[rgba(236,226,208,0.15)] text-[24px] text-muted">
                🛍️
              </div>
              <p className="font-display mt-4 text-[22px]">Your bag is empty</p>
              <p className="mt-2 text-[14px] text-muted">Explore the collection and add your favorite fragrance.</p>
              <button
                onClick={() => {
                  setIsOpen(false);
                  const el = document.getElementById("glass");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn btn-solid mt-6 !px-6 !py-3 text-[14px] cursor-pointer"
              >
                View Perfumes
              </button>
            </div>
          ) : !isCheckingOut ? (
            /* Items List View */
            <div className="space-y-6">
              <div className="divide-y divide-[rgba(236,226,208,0.08)]">
                {items.map((it) => (
                  <div key={it.id} className="flex gap-4 py-4">
                    <img
                      src={it.image}
                      alt={it.name}
                      className="h-20 w-16 rounded-lg object-cover border border-[rgba(236,226,208,0.1)] shrink-0"
                    />
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-display text-[17px] leading-snug">{it.name}</h4>
                          <p className="text-[12px] uppercase tracking-wider text-muted">{it.size}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(it.id)}
                          className="text-muted hover:text-[#ff8b8b] transition-colors p-1 text-[13px]"
                          aria-label={`Remove ${it.name}`}
                        >
                          ✕
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center rounded border border-[rgba(236,226,208,0.2)] bg-black/30">
                          <button
                            onClick={() => updateQuantity(it.id, -1)}
                            className="px-2.5 py-0.5 text-muted hover:text-fg transition-colors"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="px-2 text-[13px] font-medium">{it.quantity}</span>
                          <button
                            onClick={() => updateQuantity(it.id, 1)}
                            className="px-2.5 py-0.5 text-muted hover:text-fg transition-colors"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-medium text-[15px] text-[color:var(--amber-soft)]">
                          Rs. {(it.numericPrice * it.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Checkout Form View */
            <form onSubmit={handleConfirmOrder} className="space-y-4 pt-1">
              <div className="flex items-center justify-between pb-2 border-b border-[rgba(236,226,208,0.1)]">
                <h3 className="font-display text-[20px]">Shipping Details</h3>
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="text-[13px] text-muted hover:text-fg underline"
                >
                  ← Edit Bag
                </button>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-muted">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ali Khan"
                  className="mt-1.5 w-full rounded-md border border-[rgba(236,226,208,0.2)] bg-black/40 px-3.5 py-2.5 text-[15px] text-fg outline-none focus:border-[color:var(--amber)]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-muted">Phone / WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="0300 1234567"
                  className="mt-1.5 w-full rounded-md border border-[rgba(236,226,208,0.2)] bg-black/40 px-3.5 py-2.5 text-[15px] text-fg outline-none focus:border-[color:var(--amber)]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-muted">Email (Optional)</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="mt-1.5 w-full rounded-md border border-[rgba(236,226,208,0.2)] bg-black/40 px-3.5 py-2.5 text-[15px] text-fg outline-none focus:border-[color:var(--amber)]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-muted">Complete Address *</label>
                <textarea
                  required
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="House #, Street, Area"
                  className="mt-1.5 w-full resize-none rounded-md border border-[rgba(236,226,208,0.2)] bg-black/40 px-3.5 py-2.5 text-[15px] text-fg outline-none focus:border-[color:var(--amber)]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-muted">City *</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g. Lahore, Karachi, Islamabad"
                  className="mt-1.5 w-full rounded-md border border-[rgba(236,226,208,0.2)] bg-black/40 px-3.5 py-2.5 text-[15px] text-fg outline-none focus:border-[color:var(--amber)]"
                />
              </div>

              <div className="rounded-lg border border-[rgba(236,226,208,0.15)] bg-[rgba(233,160,76,0.06)] p-3.5 text-[13px]">
                <p className="font-medium text-[color:var(--amber-soft)]">Payment: Cash on Delivery (COD)</p>
                <p className="mt-1 text-muted">Pay with cash when your parcel arrives at your doorstep.</p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-solid w-full !py-4 text-[15px] disabled:opacity-60"
              >
                {isSubmitting ? "Placing Order..." : `Confirm Order · Rs. ${total.toLocaleString()}`}
              </button>
            </form>
          )}
        </div>

        {/* Footer / Summary (When not completed and not checking out yet) */}
        {!orderComplete && items.length > 0 && !isCheckingOut && (
          <div className="border-t border-[rgba(236,226,208,0.12)] bg-[#100d0b] p-6 space-y-4">
            <div className="space-y-2 text-[14px]">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span className="text-fg">Rs. {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Delivery</span>
                <span className="text-[#a8e6cf]">FREE (Across Pakistan)</span>
              </div>
              <div className="flex justify-between border-t border-[rgba(236,226,208,0.1)] pt-2 text-[17px] font-semibold">
                <span>Total (Cash on Delivery)</span>
                <span className="text-[color:var(--amber)]">Rs. {total.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => setIsCheckingOut(true)}
              className="btn btn-solid w-full !py-4 text-[15px] flex items-center justify-center gap-2"
            >
              Checkout & Confirm Order →
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
