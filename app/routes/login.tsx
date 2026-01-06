import { LoginForm } from "~/components/auth/login-form";
import type { Route } from "./+types/login";
import { redirect } from "react-router";
import { getSession, commitSession } from "../../session.server";

import { toast } from "sonner";
export function meta({}: Route.MetaArgs) {
  return [{ title: "Login" }, { name: "description", content: "Login" }];
}
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";
  if (!email || !password) {
    return {
      error: "Masukkan email dan password",
      fieldErrors: "Field wajib diisi",
    };
  }
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
      };
    }

    const session = await getSession(request.headers.get("Cookie"));
    session.set("auth", json.data);
    const msg = encodeURIComponent(json?.message || "Login successful");
    toast.success(msg);
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
