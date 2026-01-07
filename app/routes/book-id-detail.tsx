import BookIdDetailPage from "~/admin/book/id/book-id-detail";
import type { Route } from "./+types/book-id-detail";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Book Id Detail " },
    { name: "description", content: "Book Id Detail" },
  ];
}

export default function BookIdDetail() {
  return <BookIdDetailPage />;
}
