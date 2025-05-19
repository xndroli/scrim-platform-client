import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { sendEmail } from "@/lib/workflow";
import { serve } from "@upstash/workflow/nextjs";
import { eq } from "drizzle-orm";

type UserState = "active" | "non-active";

type InitialData = {
    email: string;
    fullName: string;
};

// 1 day in milliseconds (24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS;
const THIRTY_DAYS_IN_MS = 30 * ONE_DAY_IN_MS;

const getUserState = async (email: string): Promise<UserState> => {
    // Get the user and see if last activity date is today
    const user = await db
        .select()
        .from(users)
        .where(eq(users.user_id, email))
        .limit(1);
    // If no user, return "non-active"
    if (user.length === 0) return "non-active";

    const lastActivityDate = new Date(user[0].lastActivityDate!);
    const now = new Date();
    const timeDifference = now.getTime() - lastActivityDate.getTime();

    if (
        timeDifference > THREE_DAYS_IN_MS && 
        timeDifference <= THIRTY_DAYS_IN_MS
    ) {
        return "non-active";
    }

    return "active";
};

export const { POST } = serve<InitialData>(async (context) => {
    const { email, fullName } = context.requestPayload

    // Welcome Email
    await context.run("new-signup", async () => {
        await sendEmail({
            email, 
            subject: `Welcome to Raijin, ${fullName}!`, 
            message: 'Let the games begin!',
        });
    });

    await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3);

    while (true) {
        const state = await context.run("check-user-state", async () => {
            return await getUserState(email);
        });

        if (state === "non-active") {
            await context.run("send-email-non-active", async () => {
                await sendEmail({
                    email, 
                    subject: "Are you still there?", 
                    message: `Hey ${fullName}, your team needs you!`,
                });
            });
        } else if (state === "active") {
            await context.run("send-email-active", async () => {
                await sendEmail({
                    email,
                    subject: "Welcome Back!",
                    message: `Hey ${fullName}, it's good to see you active!`,
                });
            });
        };

        await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30);
    }
});