// components/AuthForm.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { 
    DefaultValues, 
    SubmitHandler, 
    UseFormReturn, 
    FieldValues, 
    Path
} from "react-hook-form";
import { useForm } from "react-hook-form";
import { ZodType } from "zod";
import { Button } from "./ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/auth-client";

export const FIELD_NAMES = {
    fullName: "Full name",
    email: "Email",
    teamId: "Team ID Number",
    password: "Password",
};

export const FIELD_TYPES = {
    fullName: "text",
    email: "email",
    teamId: "number",
    password: "password",
};

interface Props<T extends FieldValues> {
    schema: ZodType<T>;
    defaultValues: T;
    onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
    type: "SIGN_IN" | "SIGN_UP" | "RESET_PASSWORD";
};

const AuthForm = <T extends FieldValues>({ 
    type, 
    schema, 
    defaultValues, 
    onSubmit,
}: Props<T>) => {
    const router = useRouter();
    const isSignIn = type === "SIGN_IN";

    // Form definition
    const form: UseFormReturn<T> = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultValues as DefaultValues<T>,
    });

    // Form submit handler - Updated to use Better-auth client
    const handleSubmit: SubmitHandler<T> = async(data) => {
        try {
            if (isSignIn) {
                // Use Better-auth signIn
                const result = await signIn.email({
                    email: (data as any).email,
                    password: (data as any).password,
                    callbackURL: "/dashboard"
                });

                if (result.error) {
                    toast.error("Sign in failed", {
                        description: result.error.message || "Invalid credentials",
                    });
                } else {
                    toast.success("Success", {
                        description: "You have successfully signed in",
                    });
                    router.push("/dashboard");
                }
            } else {
                // Use Better-auth signUp
                const result = await signUp.email({
                    email: (data as any).email,
                    password: (data as any).password,
                    name: (data as any).fullName,
                    callbackURL: "/dashboard"
                });

                if (result.error) {
                    toast.error("Sign up failed", {
                        description: result.error.message || "Failed to create account",
                    });
                } else {
                    toast.success("Success", {
                        description: "Account created successfully! Please check your email to verify your account.",
                    });
                    router.push("/login");
                }
            }
        } catch (error: any) {
            console.error('Auth error:', error);
            toast.error("Error", {
                description: error.message || "An unexpected error occurred",
            });
        }
    };

    return ( 
        <div className="flex flex-col gap-4">
            <h1 className="text-xl font-circular font-semibold text-white">
                { isSignIn ? "A social layer by Raijin" : "Create your Raijin account" }
            </h1>
            <p className="font-circular text-light-100">
                { isSignIn 
                    ? "Transforming social interactions into an immersive gaming experience."
                    : "Please complete all fields and upload a valid team ID to gain access to the library"
                }
            </p>
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(handleSubmit)} 
                    className="space-y-6 w-full"
                >
                    {Object.keys(defaultValues).map((field) => (
                        <FormField
                            key={field}
                            control={form.control}
                            name={field as Path<T>}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="capitalize">
                                        {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                                    </FormLabel>
                                    <FormControl>
                                        <Input 
                                            required 
                                            type={
                                                FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                                            }
                                            {...field} 
                                            className="form-input"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                    <Button 
                        type="submit" 
                        className="form-btn"
                        disabled={form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting 
                            ? (isSignIn ? "Signing in..." : "Creating account...") 
                            : (isSignIn ? "Sign in" : "Sign up")
                        }
                    </Button>
                </form>
            </Form>

            <p className="text-center text-base font-medium">
                { isSignIn ? "New to Raijin? " : "Already have an account? " }

                <Link 
                    href={ isSignIn ? "/register" : "/login" }
                    className="font-bold text-secondary hover:underline"
                >
                    { isSignIn ? "Create an account" : "Sign in" }
                </Link>
            </p>
        </div>
    );
};

export default AuthForm;