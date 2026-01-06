import { type LoaderFunctionArgs } from "react-router";
import { getSession } from "../../session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const targetUrl = url.searchParams.get("url");

  if (!targetUrl) {
    return new Response("Missing url parameter", { status: 400 });
  }

  const session = await getSession(request.headers.get("Cookie"));
  const auth = session.get("auth");

  if (!auth?.token?.access_token) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const imageResponse = await fetch(targetUrl, {
      headers: {
        Authorization: `Bearer ${auth.token.access_token}`,
      },
    });

    if (!imageResponse.ok) {
      return new Response("Failed to fetch image", { status: imageResponse.status });
    }

    return new Response(imageResponse.body, {
      headers: {
        "Content-Type": imageResponse.headers.get("Content-Type") || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000",
      },
    });
  } catch (error) {
    console.error("Image proxy error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
