"use client";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";

// create formSchema
const formSchema = z.object({
  username: z.string().min(3, "At least 3 characters"),
  email: z.string().email("Email must add with @"),
  full_name: z.string().min(1, "Full name is required"),
  password: z
    .string()
    .min(8, "At least 8 characters")
});

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  // connect formSchema with react hook form
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      full_name: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await fetch("https://sombobaeb.cheat.casa/auth/register", {
      // method, body
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      toast.success("Registration Successfully!");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } else {
      toast.error("Please check your email and password again");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Toaster />
      <Card>
        <CardHeader>
          <CardTitle>Register for an account</CardTitle>
          <CardDescription>
            Enter your email and password below to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="register-submit-form"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FieldGroup>
              <FieldGroup>
                <Controller
                  name="username"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-username">
                        Username
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-username"
                        type="text"
                        aria-invalid={fieldState.invalid}
                        placeholder="Kenn"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="full_name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-fullname">
                        Full Name
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-fullname"
                        type="text"
                        aria-invalid={fieldState.invalid}
                        placeholder="Gon Kenn"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-email">
                        Email
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-email"
                        type="email"
                        aria-invalid={fieldState.invalid}
                        placeholder="Kenn@gmail.com"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-password">
                        Password
                      </FieldLabel>
                      <Input
                        {...field}
                        type="password"
                        id="form-rhf-demo-description"
                        placeholder="QWER123$$"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
              <Field>
                <Button type="submit" form="register-submit-form">
                  Register
                </Button>
                <Button variant="outline" type="button">
                  Register with Google
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <a href="/Login">Login</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
