"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React, { useState } from "react";
import { signInUser } from "@/lib/db/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const signinSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

type SigninFormData = z.infer<typeof signinSchema>;

export default function SigninForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: SigninFormData) => {
    try {
      setSubmitError(null);
      const authResult = await signInUser(data.email, data.password);

      if (!authResult.success) {
        if (authResult.code === "user_not_found") {
          form.setError("email", {
            type: "manual",
            message: "No account found with this email address",
          });
        } else if (authResult.code === "invalid_password") {
          form.setError("password", {
            type: "manual",
            message: "Incorrect password",
          });
        } else {
          setSubmitError(authResult.error || "Invalid email or password");
        }
        return;
      }

      toast.success("Signed in successfully!");
      router.push("/chat");
      form.reset();
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again."
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {submitError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-5">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                    className="py-3 h-fit"
                  />
                </FormControl>
                <FormDescription>
                  We&apos;ll never share your email with anyone else.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...field}
                    className="py-3 h-fit"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Continue with Email
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
