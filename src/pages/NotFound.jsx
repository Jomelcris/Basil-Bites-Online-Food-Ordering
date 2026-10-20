import EmptyState from "../components/EmptyState.jsx";
import { content } from "../data/content.js";

export default function NotFound() {
  const t = content.notFound;
  return <EmptyState emoji={t.emoji} title={t.title} body={t.body} ctaLabel={t.cta} ctaTo="/" />;
}
