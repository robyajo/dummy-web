import { RegisterForm } from "~/components/auth/register-form";
import type { Route } from "./+types/register";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Register" }, { name: "description", content: "Register" }];
}

export default function Register() {
  return <RegisterForm />;
}
