import { useParams } from "react-router";
import type { BreadcrumbType } from "types";

import ComponentPageAdmin from "~/components/admin/page-admin";

export default function BookIdDetailPage() {
  const { id } = useParams();

  const breadcrumbs: BreadcrumbType[] = [
    {
      label: "Books ID",
      href: "/books/id",
      isCurrent: false,
    },
    {
      label: "Detail",
      href: `/books/id/show/${id}`,
      isCurrent: true,
    },
  ];

  return (
    <ComponentPageAdmin breadcrumb={breadcrumbs}>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Book ID Detail</h1>
        <div className="rounded-lg border p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">
            Viewing details for Indonesian book ID:
          </p>
          <p className="text-lg font-medium">{id}</p>
        </div>
      </div>
    </ComponentPageAdmin>
  );
}
