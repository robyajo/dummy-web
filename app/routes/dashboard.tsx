import Dashboard from "~/admin/dashboard";
import type { Route } from "./+types/dashboard";
import { getSession } from "../../session.server";
import { useLoaderData } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard" },
    { name: "description", content: "Dashboard" },
  ];
}

const baseUrl = import.meta.env.VITE_API_URL;

export default function DashboardPage() {
  const data = useLoaderData<typeof loader>();
  return (
    <Dashboard auth={data.auth} profile={data.profile} success={data.success} />
  );
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const auth = session.get("auth");
  const url = new URL(request.url);
  const success =
    session.get("success") || url.searchParams.get("success") || undefined;
  let profile = null;

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
