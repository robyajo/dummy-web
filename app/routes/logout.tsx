import type { Route } from "./+types/logout";
import { redirect } from "react-router";
import { getSession, destroySession } from "../../session.server";

export default function Logout() {
  return null;
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const auth = session.get("auth");
  const token = auth?.token?.access_token;
  const baseUrl = import.meta.env.VITE_API_URL;
  if (token) {
    try {
      await fetch(`${baseUrl}/api/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
    } catch {}
  }
  return redirect("/", {
    headers: { "Set-Cookie": await destroySession(session) },
  });
}
