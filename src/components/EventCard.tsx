import React from "react";
import Link from "next/link";
import EventCover from "@/components/EventCover";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface EventCardProps extends Event {
    isAttendingEvent?: boolean;
};

const EventCard = ({
    id,
    title,
    game,
    coverColor,
    coverUrl,
    isAttendingEvent = false,
}: EventCardProps) => (
    <li className={cn(isAttendingEvent && "xs:w-52 w-full")}>
        <Link
            href={`/events/${id}`}
            className={cn(isAttendingEvent && "w-full flex flex-col items-center")}
        >
            <EventCover coverColor={coverColor} coverImage={coverUrl} />

            <div className={cn("mt-4", !isAttendingEvent && "xs:max-w-40 max-w-28")}>
                <p className="event-title">{title}</p>
                <p className="event-game">{game}</p>
            </div>

            {isAttendingEvent && (
                <div className="mt-3 w-full">
                    <div className="event-enrolled">
                        <Image
                            src="/icons/calendar.svg"
                            alt="calendar"
                            width={18}
                            height={18}
                            className="object-contain"
                        />
                        <p className="text-light-100">11 days left to prep</p>
                    </div>

                    <Button className="event-btn">Download results</Button>
                </div>
            )}
        </Link>
    </li>
);

export default EventCard;