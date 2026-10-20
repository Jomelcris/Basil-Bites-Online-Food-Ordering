export class MenuItem {
  constructor({
    id,
    name,
    description,
    price,
    emoji,
    image = "",
    tint,
    categoryId,
    tags = [],
    prepTime,
    isFeatured = false,
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.emoji = emoji;
    this.image = image;
    this.tint = tint;
    this.categoryId = categoryId;
    this.tags = tags;
    this.prepTime = prepTime;
    this.isFeatured = isFeatured;
  }

  hasTag(tag) {
    return this.tags.includes(tag);
  }

  matches(query) {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      this.name.toLowerCase().includes(q) ||
      this.description.toLowerCase().includes(q) ||
      this.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }

  getReviews(reviews) {
    return reviews.filter((review) => review.menuItemId === this.id);
  }

  getAverageRating(reviews) {
    const own = this.getReviews(reviews);
    if (own.length === 0) return 0;
    const total = own.reduce((sum, review) => sum + review.rating, 0);
    return Math.round((total / own.length) * 10) / 10;
  }
}
