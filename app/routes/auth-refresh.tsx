import { type ActionFunctionArgs } from "react-router";
import { getSession, commitSession, refreshSession } from "session.server";

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const session = await getSession(request.headers.get("Cookie"));
  const refreshed = await refreshSession(session);

  if (refreshed) {
    return new Response(JSON.stringify({ success: true }), {
      headers: {
        "Set-Cookie": await commitSession(session),
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(JSON.stringify({ success: false }), {
    status: 401,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
