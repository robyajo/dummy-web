import type { Route } from "./+types/logout";
import { redirect } from "react-router";
import { getSession, commitSession } from "../../session.server";

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
      const res = await fetch(`${baseUrl}/api/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      let message = "Logout successful";
      if (!res.ok) {
        try {
          const json = await res.json();
          message = json?.message || "Logout failed";
          session.flash("error", message);
        } catch {
          session.flash("error", "Logout failed");
        }
      } else {
        try {
          const json = await res.json();
          message = json?.message || message;
        } catch {}
        session.flash("success", message);
      }
    } catch {}
  }
  session.set("auth", undefined as any);
  return redirect("/", {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}
