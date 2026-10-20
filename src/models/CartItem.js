export class CartItem {
  constructor(menuItem, quantity = 1) {
    this.menuItem = menuItem;
    this.quantity = quantity;
  }

  withQuantity(quantity) {
    return new CartItem(this.menuItem, quantity);
  }

  getSubtotal() {
    return this.menuItem.price * this.quantity;
  }
}
