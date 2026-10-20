import { CartItem } from "./CartItem.js";

// Cart is immutable: every method that changes it returns a new Cart,
// which lets React detect the change and re-render.
export class Cart {
  constructor(items = []) {
    this.items = items;
  }

  getItemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  getQuantity(menuItemId) {
    const found = this.items.find((item) => item.menuItem.id === menuItemId);
    return found ? found.quantity : 0;
  }

  addItem(menuItem, quantity = 1) {
    const exists = this.items.some((item) => item.menuItem.id === menuItem.id);
    const items = exists
      ? this.items.map((item) =>
          item.menuItem.id === menuItem.id
            ? item.withQuantity(item.quantity + quantity)
            : item
        )
      : [...this.items, new CartItem(menuItem, quantity)];
    return new Cart(items);
  }

  updateQuantity(menuItemId, quantity) {
    if (quantity <= 0) return this.removeItem(menuItemId);
    return new Cart(
      this.items.map((item) =>
        item.menuItem.id === menuItemId ? item.withQuantity(quantity) : item
      )
    );
  }

  removeItem(menuItemId) {
    return new Cart(this.items.filter((item) => item.menuItem.id !== menuItemId));
  }

  clear() {
    return new Cart([]);
  }

  isEmpty() {
    return this.items.length === 0;
  }

  getSubtotal() {
    return this.items.reduce((sum, item) => sum + item.getSubtotal(), 0);
  }

  getDeliveryFee({ fee, freeAbove }) {
    if (this.isEmpty()) return 0;
    return this.getSubtotal() >= freeAbove ? 0 : fee;
  }

  getTotal(delivery) {
    return this.getSubtotal() + this.getDeliveryFee(delivery);
  }
}
