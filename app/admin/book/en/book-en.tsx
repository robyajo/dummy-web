import { Link } from "react-router";
import type { Auth, BreadcrumbType, User } from "types";

import ComponentPageAdmin from "~/components/admin/page-admin";
import { Button } from "~/components/ui/button";

const breadcrumbs: BreadcrumbType[] = [
  {
    label: "Books",
    href: "/books/en",
    isCurrent: true,
  },
];

export default function BookEnPage() {
  return (
    <>
      <ComponentPageAdmin breadcrumb={breadcrumbs}>
        <p>Books EN</p>
        <Button>
          <Link to="/books/en/show/1234567890" viewTransition>
            Show Book EN 1234567890
          </Link>
        </Button>
      </ComponentPageAdmin>
    </>
  );
}
