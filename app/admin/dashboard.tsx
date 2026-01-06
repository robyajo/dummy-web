import type { Auth, BreadcrumbType, User } from "types";
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
  profile,
  success,
}: {
  auth?: {
    user: Auth;
    token: {
      token_type: string;
      expires_in: number;
    };
  };
  profile?: User;
  success?: string;
}) {
  const user = profile;

  useEffect(() => {
    if (success) {
      toast.success(success);
    }
  }, [success]);

  const getAvatarUrl = (url?: string) => {
    if (!url) return "";
    return `/resources/image-proxy?url=${encodeURIComponent(url)}`;
  };

  return (
    <>
      <ComponentPageAdmin breadcrumb={breadcrumbs}>
        {user && (
          <div className="bg-muted/50 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-4">
              <img
                src={getAvatarUrl(user.avatar_url)}
                alt={user.name}
                className="h-16 w-16 rounded-full object-cover"
              />
              <div>
                <div className="text-lg font-semibold">{user.name}</div>
                <div className="text-sm text-muted-foreground">
                  {user.email}
                </div>
                <div className="text-xs text-muted-foreground">
                  {user.role} • {user.active}
                </div>
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Token: {auth?.token.token_type}, expires in{" "}
              {auth?.token.expires_in}s
            </div>
            <div className="mt-4 grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
              <div className="flex flex-col">
                <span className="font-semibold text-muted-foreground">ID:</span>
                <span>{user.id}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-muted-foreground">
                  UUID:
                </span>
                <span className="break-all">{user.uuid}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-muted-foreground">
                  Email Verified At:
                </span>
                <span>
                  {user.email_verified_at
                    ? new Date(user.email_verified_at).toLocaleString()
                    : "Not Verified"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-muted-foreground">
                  Created At:
                </span>
                <span>{new Date(user.created_at).toLocaleString()}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-muted-foreground">
                  Updated At:
                </span>
                <span>{new Date(user.updated_at).toLocaleString()}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-muted-foreground">
                  Avatar File:
                </span>
                <span>{user.avatar}</span>
              </div>
              <div className="flex flex-col md:col-span-2">
                <span className="font-semibold text-muted-foreground">
                  Avatar Image:
                </span>
                <div className="mt-2">
                  <img
                    src={getAvatarUrl(user.avatar_url)}
                    alt={user.name}
                    className="max-w-50 rounded-lg border shadow-sm"
                  />
                </div>
                <span className="mt-1 break-all text-xs text-muted-foreground">
                  {user.avatar_url}
                </span>
              </div>
            </div>
          </div>
        )}
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted/50 rounded-xl p-4 flex flex-col justify-between">
            <div className="text-sm font-medium text-muted-foreground">
              Role
            </div>
            <div className="text-2xl font-bold capitalize">
              {user?.role || "N/A"}
            </div>
          </div>
          <div className="bg-muted/50 rounded-xl p-4 flex flex-col justify-between">
            <div className="text-sm font-medium text-muted-foreground">
              Status
            </div>
            <div
              className={`text-2xl font-bold capitalize ${
                user?.active === "active"
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {user?.active || "N/A"}
            </div>
          </div>
          <div className="bg-muted/50 rounded-xl p-4 flex flex-col justify-between">
            <div className="text-sm font-medium text-muted-foreground">
              Verified
            </div>
            <div className="text-2xl font-bold">
              {user?.email_verified_at ? "Yes" : "No"}
            </div>
          </div>
        </div>
      </ComponentPageAdmin>
    </>
  );
}
