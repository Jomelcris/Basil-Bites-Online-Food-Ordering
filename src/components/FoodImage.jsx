// Shows a real photo when item.image is set, otherwise a tinted emoji tile.
export default function FoodImage({ item, className = "", emojiClass = "text-6xl" }) {
  if (item.image) {
    return (
      <img
        src={item.image}
        alt={item.name}
        loading="lazy"
        className={`object-cover ${className}`}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={item.name}
      style={{ backgroundColor: item.tint }}
      className={`flex items-center justify-center ${className}`}
    >
      <span className={emojiClass} aria-hidden="true">
        {item.emoji}
      </span>
    </div>
  );
}
