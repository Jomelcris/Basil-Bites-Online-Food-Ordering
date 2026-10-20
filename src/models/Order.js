export class Order {
  constructor({
    id,
    items,
    customerName,
    address,
    phone,
    paymentMethod,
    notes = "",
    deliveryFee,
    status = "preparing",
    createdAt = new Date().toISOString(),
  }) {
    this.id = id;
    this.items = items;
    this.customerName = customerName;
    this.address = address;
    this.phone = phone;
    this.paymentMethod = paymentMethod;
    this.notes = notes;
    this.deliveryFee = deliveryFee;
    this.status = status;
    this.createdAt = createdAt;
  }

  getSubtotal() {
    return this.items.reduce((sum, item) => sum + item.getSubtotal(), 0);
  }

  getTotal() {
    return this.getSubtotal() + this.deliveryFee;
  }

  getItemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }
}
