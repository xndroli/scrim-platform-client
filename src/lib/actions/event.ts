"use server";

import { db } from "@/database/drizzle";
import { tournaments, tournament_attendees } from "@/database/schema";
import { eq, sql } from "drizzle-orm";
import dayjs from "dayjs";

export const attendTournament = async (params: AttendTournamentParams) => {
    const { tournamentId, userId, teamId } = params;

    try {
        // First, get the tournament details
        const tournament = await db
            .select({
                maxTeams: tournaments.max_teams,
                id: tournaments.tournament_id
            })
            .from(tournaments)
            .where(eq(tournaments.tournament_id, tournamentId))
            .limit(1);

        if (!tournament.length) {
            return {
                success: false,
                error: "Tournament not found.",
            };
        }

        // Count current attendees to determine available slots
        const attendeeCount = await db
            .select({
                count: sql`count(*)`
            })
            .from(tournament_attendees)
            .where(eq(tournament_attendees.tournament_id, tournamentId));
        
        const currentAttendees = Number(attendeeCount[0]?.count || 0);
        const maxTeams = tournament[0].maxTeams || 0;
        const availableSlots = maxTeams - currentAttendees;

        if (availableSlots <= 0) {
            return {
                success: false,
                error: "Tournament is full. No available slots.",
            };
        }

        // Calculate end date (7 days from now)
        const endDate = dayjs().add(7, "day").toDate();

        // Insert record into tournament_attendees table
        const record = await db.insert(tournament_attendees).values({
            user_id: userId,
            tournament_id: tournamentId,
            team_id: teamId, // Optional
            start_date: dayjs().toDate(),
            end_date: endDate,
            status: "ATTENDING",
        });

        return {
            success: true,
            data: JSON.parse(JSON.stringify(record)),
        };
    } catch (error) {
        console.log(error);

        return {
            success: false,
            error: "An error occurred while attending the event",
        };
    }
};