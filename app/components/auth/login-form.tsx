import { GalleryVerticalEnd } from "lucide-react";
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { PasswordInput } from "~/components/ui/password-input";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldError,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const actionData = useActionData();
  const loaderData = useLoaderData<{ success?: string; error?: string }>();
  const errors = (actionData?.errors || {}) as Record<string, string[]>;
  const navigation = useNavigation();
  const pending = navigation.state === "submitting";
  const lastRef = useRef<{ success?: string; error?: string }>({});

  useEffect(() => {
    if (actionData?.error) {
      toast.error(actionData.error, {
        description: actionData.fieldErrors,
      });
    }
  }, [actionData]);
  useEffect(() => {
    if (loaderData?.success && lastRef.current.success !== loaderData.success) {
      toast.success(loaderData.success);
      lastRef.current.success = loaderData.success;
    }
    if (loaderData?.error && lastRef.current.error !== loaderData.error) {
      toast.error(loaderData.error);
      lastRef.current.error = loaderData.error;
    }
  }, [loaderData]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form method="post">
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <Link
              to="/"
              className="flex flex-col items-center gap-2 font-medium"
              viewTransition
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </Link>
            <h1 className="text-xl font-bold">Welcome to Acme Inc.</h1>
            <FieldDescription>
              Don&apos;t have an account?{" "}
              <Link to="/register" viewTransition>
                Sign up
              </Link>
            </FieldDescription>
          </div>
          <Field data-invalid={!!errors?.email?.length}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
              disabled={pending}
            />
            <FieldError
              errors={errors?.email?.map((m) => ({ message: m })) || []}
            />
          </Field>
          <Field data-invalid={!!errors?.password?.length}>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <PasswordInput
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              disabled={pending}
            />
            <FieldError
              errors={errors?.password?.map((m) => ({ message: m })) || []}
            />
          </Field>
          <Field>
            <Button type="submit" disabled={pending}>
              {pending ? "Logging in..." : "Login"}
            </Button>
          </Field>
        </FieldGroup>
      </Form>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
