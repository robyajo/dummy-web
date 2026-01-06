import { createCookieSessionStorage } from "react-router";

type User = {
  id: number;
  uuid: string;
  name: string;
  email: string;
  avatar: string;
  avatar_url: string;
  role: string;
  active: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
};

type Token = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

type SessionData = {
  auth?: {
    user: User;
    token: Token;
  };
};

type SessionFlashData = {
  error: string;
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

export { getSession, commitSession, destroySession };
