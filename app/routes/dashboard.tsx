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

export default function DashboardPage() {
  const data = useLoaderData<typeof loader>();
  return <Dashboard auth={data.auth} success={data.success} />;
}
export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const auth = session.get("auth");
  const url = new URL(request.url);
  const success = url.searchParams.get("success") || undefined;
  return { auth, success };
}
