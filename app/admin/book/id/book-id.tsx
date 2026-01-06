import { Link } from "react-router";
import type { Auth, BreadcrumbType, User } from "types";

import ComponentPageAdmin from "~/components/admin/page-admin";
import { Button } from "~/components/ui/button";

const breadcrumbs: BreadcrumbType[] = [
  {
    label: "Books",
    href: "/books/id",
    isCurrent: true,
  },
];

export default function BookIdPage() {
  return (
    <>
      <ComponentPageAdmin breadcrumb={breadcrumbs}>
        <p>Books ID</p>
        <Button>
          <Link to="/books/id/show/1234567890" viewTransition>
            Show Book ID 1234567890
          </Link>
        </Button>
      </ComponentPageAdmin>
    </>
  );
}
