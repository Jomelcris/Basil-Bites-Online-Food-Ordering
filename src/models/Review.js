export class Review {
  constructor({ id, menuItemId, author, rating, comment, date }) {
    this.id = id;
    this.menuItemId = menuItemId;
    this.author = author;
    this.rating = rating;
    this.comment = comment;
    this.date = date;
  }

  getInitials() {
    return this.author
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2);
  }
}
