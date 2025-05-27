"use server";

import type { RegisterFormValues } from "@/components/auth/register-form";

export async function registerUser(data: RegisterFormValues) {
    try {
        console.log(data);

        return {
            success: true,
            data: data,
            error: null,
        }
    } catch (error) {
        console.log(error);

        return {
            success: false,
            data: null,
            error: "Something went wrong",
        }
    }
}