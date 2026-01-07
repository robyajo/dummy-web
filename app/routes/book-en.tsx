import BookEnPage from "~/admin/book/en/book-en";
import type { Route } from "./+types/book-en";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Book En" }, { name: "description", content: "Book En" }];
}

export default function BookEn() {
  return <BookEnPage />;
}
