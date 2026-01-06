import { Outlet, useLoaderData } from "react-router";
import { AppSidebar } from "~/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import { getSession } from "../../session.server";
import { useEffect } from "react";

export default function AdminLayout() {
  const data = useLoaderData<{ auth?: any; profile?: any; success?: string }>();

  useEffect(() => {
    // Refresh token every 5 minutes while the dashboard is active
    const interval = setInterval(
      () => {
        fetch("/auth/refresh", { method: "POST" }).catch((err) =>
          console.error("Token auto-refresh failed", err)
        );
      },
      5 * 60 * 1000
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar auth={data?.auth} profile={data?.profile} />
      <SidebarInset>
        <Outlet context={{ profile: data?.profile, auth: data?.auth }} />
      </SidebarInset>
    </SidebarProvider>
  );
}

export async function loader({ request }: { request: Request }) {
  const session = await getSession(request.headers.get("Cookie"));
  const auth = session.get("auth");
  const url = new URL(request.url);
  const success = url.searchParams.get("success") || undefined;

  let profile = null;
  const baseUrl = import.meta.env.VITE_API_URL;

  if (auth?.token?.access_token) {
    try {
      const res = await fetch(`${baseUrl}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${auth.token.access_token}`,
          Accept: "application/json",
        },
      });

      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          profile = json.data;
        } else {
          profile = json;
        }
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  }

  return { auth, profile, success };
}
