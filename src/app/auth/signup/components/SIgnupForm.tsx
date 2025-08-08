"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Eye, EyeOff, Loader2, AlertCircle, Mail, Lock, User } from "lucide-react";
import { createUser } from "@/lib/db/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const signupSchema = z
  .object({
    fullname: z.string().min(1, "Full name is required"),
    email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    setError,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onTouched",
  });

  const handleFormSubmit = async (data: SignupFormData) => {
    try {
      setSubmitError(null);
      const response = await createUser(data.fullname, data.email, data.password);

      if (response.error) {
        setSubmitError(response.error as string);
        setError("root", {
          type: "manual",
          message: response.error as string,
        });
        return;
      }

      toast.success("Confirmation email sent! Please check your inbox.");
      router.push("/auth/confirm");
      reset();
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "An unexpected error occurred. Please try again."
      );
    }
  };

  return (
    
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {submitError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullname">Full Name *</Label>
              <Input
                id="fullname"
                type="text"
                placeholder="john doe"
                {...register("fullname")}
                className={errors.fullname ? "border-destructive py-3 h-fit" : "py-3 h-fit"}
              />
           
            {errors.fullname && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.fullname.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
       
              <Input
                id="email"
                type="email"
                placeholder="johndoe@example.com"
                {...register("email")}
                className={errors.email ? "border-destructive py-3 h-fit" : "py-3 h-fit"}
              />
         
            {errors.email && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                {...register("password")}
                className={errors.password ? "border-destructive py-3 h-fit" : "py-3 h-fit"}
              />
            
            {errors.password && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                {...register("confirmPassword")}
                className={errors.confirmPassword ? "border-destructive py-3 h-fit" : "py-3 h-fit"}
              />
        
            {errors.confirmPassword && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" size={'lg'} disabled={isSubmitting || !isValid}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </div>
      </form>
  
  );
}

export default SignupForm;
