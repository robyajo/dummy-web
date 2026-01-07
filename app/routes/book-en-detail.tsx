import BookEnDetailPage from "~/admin/book/en/book-en-detail";
import type { Route } from "./+types/book-en-detail";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Book En Detail | ${params.id}` },
    { name: "description", content: `Book En Detail ${params.id}` },
  ];
}

export default function BookEnDetail() {
  return <BookEnDetailPage />;
}
