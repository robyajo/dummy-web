import { createCookieSessionStorage, type Session } from "react-router";
import type { Auth } from "types";
const baseUrl = import.meta.env.VITE_API_URL;

type Token = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

type SessionData = {
  auth?: {
    user: Auth;
    token: Token;
  };
};

type SessionFlashData = {
  error: string;
  success?: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: "__session",
      httpOnly: true,
      maxAge: 3600,
      path: "/",
      sameSite: "lax",
      secrets: ["s3cret1"],
      secure: process.env.NODE_ENV === "production",
    },
  });

export async function refreshSession(
  session: Session<SessionData, SessionFlashData>
) {
  const auth = session.get("auth");
  if (!auth?.token?.access_token) return false;

  try {
    const response = await fetch(`${baseUrl}/api/auth/refresh`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth.token.access_token}`,
        Accept: "application/json",
      },
    });

    if (response.ok) {
      const json = await response.json();
      if (json.status === "success" && json.data) {
        const newToken = json.data.token || json.data;

        session.set("auth", {
          ...auth,
          token: {
            ...auth.token,
            ...newToken,
          },
        });
        return true;
      } else {
        console.error(
          "Refresh failed: API returned success but invalid data",
          json
        );
      }
    } else {
      const text = await response.text();
      console.error(`Refresh failed: API returned ${response.status}`, text);
    }
  } catch (error) {
    console.error("Failed to refresh session:", error);
  }
  return false;
}

export { getSession, commitSession, destroySession };
