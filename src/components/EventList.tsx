import React from "react";
import EventCard from "@/components/EventCard";

interface Props {
    title: string;
    events: Event[];
    containerClassName?: string;
};

const EventList = ({ title, events, containerClassName }: Props) => {
    if (events.length < 2) return;

    return (
        <section className={containerClassName}>
            <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>

            <ul className="event-list">
                {events.map((event) => (
                    <EventCard key={event.title} {...event} />
                ))}
            </ul>
        </section>
    );
};

export default EventList;