export interface CartItem {
  id: string;
  name: string;
  size: string;
  price: string;
  numericPrice: number;
  image: string;
  quantity: number;
}

const STORAGE_KEY = "aurex_cart_items";

export function parsePrice(priceStr: string): number {
  if (!priceStr) return 0;
  const cleaned = priceStr.replace(/[^0-9]/g, "");
  return parseInt(cleaned, 10) || 0;
}

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent("cart:updated", { detail: items }));
  } catch (err) {
    console.error("Failed to save cart:", err);
  }
}

export function addToCart(item: Omit<CartItem, "quantity">, quantity = 1): void {
  const cart = getCart();
  const existing = cart.find((i) => i.id === item.id);
  let updated: CartItem[];

  if (existing) {
    updated = cart.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i));
  } else {
    updated = [...cart, { ...item, quantity }];
  }

  saveCart(updated);
  window.dispatchEvent(new CustomEvent("cart:open"));
}

export function updateQuantity(id: string, delta: number): void {
  const cart = getCart();
  const updated = cart
    .map((item) => {
      if (item.id === id) {
        const nextQty = item.quantity + delta;
        return nextQty > 0 ? { ...item, quantity: nextQty } : null;
      }
      return item;
    })
    .filter(Boolean) as CartItem[];

  saveCart(updated);
}

export function removeFromCart(id: string): void {
  const cart = getCart();
  saveCart(cart.filter((item) => item.id !== id));
}

export function clearCart(): void {
  saveCart([]);
}

export function getCartTotal(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.numericPrice * item.quantity, 0);
}

export function getCartCount(cart: CartItem[]): number {
  return cart.reduce((count, item) => count + item.quantity, 0);
}

export function openCart(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("cart:open"));
  }
}

export function closeCart(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("cart:close"));
  }
}
