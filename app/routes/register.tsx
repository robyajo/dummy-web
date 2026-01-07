import { RegisterForm } from "~/components/auth/register-form";
import type { Route } from "./+types/register";
import { redirect } from "react-router";
import { z } from "zod";
import { getSession, commitSession } from "../../session.server";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Register" }, { name: "description", content: "Register" }];
}

export default function Register() {
  return <RegisterForm />;
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const raw = Object.fromEntries(formData);

  const schema = z
    .object({
      name: z.string().trim().min(1, "Name is required."),
      email: z
        .string()
        .trim()
        .min(1, "Email is required.")
        .email("Email tidak valid."),
      password: z.string().trim().min(1, "Password is required."),
      confirmPassword: z
        .string()
        .trim()
        .min(1, "Confirm password is required."),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["confirmPassword"],
          message: "Confirm password must match.",
        });
      }
    });

  const parsed = schema.safeParse({
    name: raw.name?.toString(),
    email: raw.email?.toString(),
    password: raw.password?.toString(),
    confirmPassword: raw.confirmPassword?.toString(),
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

  const baseUrl = import.meta.env.VITE_API_URL;
  try {
    const res = await fetch(`${baseUrl}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: parsed.data.name,
        email: parsed.data.email,
        password: parsed.data.password,
        password_confirmation: parsed.data.confirmPassword,
      }),
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
        error: json?.message || "Registrasi gagal",
        fieldErrors: normalizeErrors(json?.errors),
        errors: json?.errors,
      };
    }

    const msg = json?.message || "Register berhasil";
    const session = await getSession(request.headers.get("Cookie"));
    session.flash("success", msg);
    return redirect(`/`, {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  } catch {
    return {
      error: "Tidak dapat menghubungi server",
      fieldErrors: "Silakan coba lagi",
    };
  }
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const success = session.get("success") || undefined;
  return { success };
}
