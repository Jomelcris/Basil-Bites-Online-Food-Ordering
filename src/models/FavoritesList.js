// Immutable list of saved menu item ids.
export class FavoritesList {
  constructor(itemIds = []) {
    this.itemIds = itemIds;
  }

  has(menuItemId) {
    return this.itemIds.includes(menuItemId);
  }

  toggle(menuItemId) {
    return this.has(menuItemId)
      ? new FavoritesList(this.itemIds.filter((id) => id !== menuItemId))
      : new FavoritesList([...this.itemIds, menuItemId]);
  }

  clear() {
    return new FavoritesList([]);
  }

  get count() {
    return this.itemIds.length;
  }
}
