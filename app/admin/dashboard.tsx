import type { BreadcrumbType } from "types";
import { useEffect } from "react";
import { toast } from "sonner";
import ComponentPageAdmin from "~/components/admin/page-admin";
const breadcrumbs: BreadcrumbType[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    isCurrent: true,
  },
];
export default function Dashboard({
  auth,
  success,
}: {
  auth?: {
    user: {
      name: string;
      email: string;
      avatar_url: string;
      role: string;
      active: string;
    };
    token: {
      token_type: string;
      expires_in: number;
    };
  };
  success?: string;
}) {
  useEffect(() => {
    if (success) {
      toast.success(success);
    }
  }, [success]);
  return (
    <>
      <ComponentPageAdmin breadcrumb={breadcrumbs}>
        {auth && (
          <div className="bg-muted/50 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-4">
              <img
                src={auth.user.avatar_url}
                alt={auth.user.name}
                className="h-16 w-16 rounded-full object-cover"
              />
              <div>
                <div className="text-lg font-semibold">{auth.user.name}</div>
                <div className="text-sm text-muted-foreground">
                  {auth.user.email}
                </div>
                <div className="text-xs text-muted-foreground">
                  {auth.user.role} • {auth.user.active}
                </div>
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Token: {auth.token.token_type}, expires in {auth.token.expires_in}s
            </div>
          </div>
        )}
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
        </div>
        <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min" />
      </ComponentPageAdmin>
    </>
  );
}
