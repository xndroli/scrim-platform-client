"use server";

import { tournaments } from "@/database/schema";
import { db } from "@/database/drizzle";

export const createTournament = async (params: EventParams) => {
    try {
        const newEvent = await db
            .insert(tournaments)
            .values({
                ...params,
                max_teams: params.totalSlots,
            })
            .returning();

        return {
            success: true,
            data: JSON.parse(JSON.stringify(newEvent[0])),
        };
    } catch (error) {
        console.log(error);

        return {
            success: false,
            message: "An error occurred while creating the event.",
        };
    }
};