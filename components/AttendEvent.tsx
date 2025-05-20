"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
// import { useRouter } from "next/navigation";
import { toast } from "sonner";
// import { attendTournament } from "@/lib/actions/event";

interface Props {
    userId: string;
    tournamentId: string;
    attendingEligibility: {
        isEligible: boolean;
        message: string;
    };
}

const AttendEvent = ({
    //userId,
    //tournamentId,
    attendingEligibility: { isEligible, message },
}: Props) => {
    // const router = useRouter();
    const [attending, setAttending] = useState(false);

    const handleAttendEvent = async () => {
        if (!isEligible) {
            toast.error("Error", {
                description: message,
            });
        }

        setAttending(true);

        // try {
        // const result = await attendTournament({ tournamentId, userId, teamId: "" });

        // if (result.success) {
        //     toast("Success", {
        //         description: "Book borrowed successfully",
        //     });

        //     router.push("/");
        // } else {
        //     toast.error("Error", {
        //         description: message,
        //     });
        // }
        // } catch (error) {
        // toast("Error", { 
        //     description: "An error occurred while borrowing the book",
        // });
        // } finally {
        // setAttending(false);
        // }
    };

    return (
        <Button
        className="book-overview_btn"
        onClick={handleAttendEvent}
        disabled={attending}
        >
        <Image src="/icons/book.svg" alt="book" width={20} height={20} />
        <p className="font-bebas-neue text-xl text-dark-100">
            {attending ? "Attending ..." : "Attend Event"}
        </p>
        </Button>
    );
};

export default AttendEvent;