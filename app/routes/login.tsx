import { LoginForm } from "~/components/auth/login-form";
import type { Route } from "./+types/login";
import { redirect } from "react-router";
import { getSession, commitSession } from "../../session.server";
import { z } from "zod";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Login" }, { name: "description", content: "Login" }];
}
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const raw = Object.fromEntries(formData);

  const schema = z.object({
    email: z
      .string()
      .trim()
      .min(1, "Email is required.")
      .email("Email tidak valid."),
    password: z.string().trim().min(1, "Password is required."),
  });

  const parsed = schema.safeParse({
    email: raw.email?.toString(),
    password: raw.password?.toString(),
  });

  if (!parsed.success) {
    const zodErrors = parsed.error.flatten().fieldErrors;
    const normalizeErrors = (errs: Record<string, string[] | undefined>) => {
      const parts: string[] = [];
      for (const [key, arr] of Object.entries(errs)) {
        if (arr && arr.length) parts.push(`${key}: ${arr.join(", ")}`);
      }
      return parts.join(" | ");
    };
    return {
      error: "Validasi gagal",
      fieldErrors: normalizeErrors(zodErrors),
      errors: zodErrors,
    };
  }

  const { email, password } = parsed.data;
  const baseUrl = import.meta.env.VITE_API_URL;
  try {
    const res = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await res.json().catch(() => null);
    const normalizeErrors = (errors: any) => {
      if (!errors || typeof errors !== "object") return undefined;
      const parts: string[] = [];
      for (const key of Object.keys(errors)) {
        const val = errors[key];
        if (Array.isArray(val)) {
          parts.push(`${key}: ${val.join(", ")}`);
        } else if (typeof val === "string") {
          parts.push(`${key}: ${val}`);
        }
      }
      return parts.join(" | ");
    };
    if (!res.ok || json?.status === "error") {
      return {
        error: json?.message || "Login gagal",
        fieldErrors: normalizeErrors(json?.errors),
        errors: json?.errors,
      };
    }

    const session = await getSession(request.headers.get("Cookie"));
    session.set("auth", json.data);
    const msg = encodeURIComponent(json?.message || "Login successful");
    session.flash("success", decodeURIComponent(msg));
    return redirect(`/dashboard`, {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  } catch {
    return {
      error: "Tidak dapat menghubungi server",
      fieldErrors: "Silakan coba lagi",
    };
  }
}

export default function LoginPage() {
  return <LoginForm />;
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const success = session.get("success") || undefined;
  const error = session.get("error") || undefined;
  const headers = new Headers();
  if (success || error) {
    headers.append("Set-Cookie", await commitSession(session));
  }
  headers.append("Content-Type", "application/json");
  return new Response(JSON.stringify({ success, error }), {
    headers,
    status: 200,
  });
}
