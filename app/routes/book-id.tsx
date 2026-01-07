import BookIdPage from "~/admin/book/id/book-id";
import type { Route } from "./+types/book-id";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Book Id" }, { name: "description", content: "Book Id" }];
}

export default function BookId() {
  return <BookIdPage />;
}
