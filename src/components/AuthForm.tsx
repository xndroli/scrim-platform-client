"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { 
    DefaultValues, 
    SubmitHandler, 
    useForm, 
    UseFormReturn, 
    FieldValues, 
    Path
} from "react-hook-form";
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
import { FIELD_NAMES, FIELD_TYPES } from "../constants";
// import ImageUpload from "@/components/ImageUpload";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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

    // Form submit handler
    const handleSubmit: SubmitHandler<T> = async(data) =>{
        const result = await onSubmit(data);

        if (result.success) {
            toast.success( "Success", {
                description: isSignIn 
                    ? "You have successfully signed in"
                    : "You have successfully signed up",
            });

            router.push("/dashboard");
        } else {
            toast.error(`Error ${isSignIn ? "signing in" : "signing up"}`, {
                description: result.error ?? "An error occurred.",
            });
        };
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
                    <Button type="submit" className="form-btn">
                        {isSignIn ? "Sign in" : "Sign up"}
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