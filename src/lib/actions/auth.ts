"use server";

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import ratelimit from "@/lib/ratelimit";
import { redirect } from "next/navigation";
import config from "@/lib/config";
import { workflowClient } from "@/lib/workflow";

export const signInWithCredentials = async (params: Pick<AuthCredentials, "email" | "password">) => {
    const { email, password } = params;

    const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
    const { success } = await ratelimit.limit(ip);

    if (!success) return redirect("/too-fast");

    try {
        const result = await signIn("credentials", {
            email, 
            password, 
            redirect: false,
        });
        // Check if sign-in was successful
        if (result?.error) {
            return { success: false, error: result.error };
        };

        return { success: true };
    } catch (error) {
        console.log(error, "Sign-in error");
        return { success: false, error: "Sign-in failed" };
    };
};

export const signUp = async (params: AuthCredentials ) => {
    const { fullName, email, teamId, password } = params;

    const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
    const { success } = await ratelimit.limit(ip);

    if (!success) return redirect("/too-fast");

    // Check if user already exists
    const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

    // If user already exists
    if (existingUser.length > 0) {
        return { success: false, error: "User already exists" };
    };
    // If user doesn't exist hash password
    const hashedPassword = await hash(password, 10);
    // Create user
    try {
        await db.insert(users).values({
            fullName,
            email,
            teamId,
            password: hashedPassword,
        });

        await workflowClient.trigger({
            url: `${config.env.prodApiEndpoint}/api/workflow/onboarding`,
            body: {
                email,
                fullName,
            },
        });

        // Automatically sign user in
        await signInWithCredentials({ email, password });

        return { success: true };
    } catch (error) {
        console.log(error, "Sign-up error");
        return { success: false, error: "Sign-up failed" };
    };
};