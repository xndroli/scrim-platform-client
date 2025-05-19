"use client";

import React from "react";
import { cn } from "@/lib/utils";
import EventCoverSvg from "@/components/EventCoverSvg";
import { IKImage } from "imagekitio-next";
import config from "@/lib/config";

type EventCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

const variantStyles: Record<EventCoverVariant, string> = {
    extraSmall: "Event-cover_extra_small",
    small: "Event-cover_small",
    medium: "Event-cover_medium",
    regular: "Event-cover_regular",
    wide: "Event-cover_wide",
};

interface Props {
    className?: string;
    variant?: EventCoverVariant;
    coverColor: string;
    coverImage: string;
}

const EventCover = ({
    className,
    variant = "regular",
    coverColor = "#012B48",
    coverImage = "https://placehold.co/400x600.png",
}: Props) => {
    return (
        <div
            className={cn(
                "relative transition-all duration-300",
                variantStyles[variant],
                className,
            )}
        >
            <EventCoverSvg coverColor={coverColor} />

            <div
                className="absolute z-10"
                style={{ left: "12%", width: "87.5%", height: "88%" }}
            >
                <IKImage
                    path={coverImage}
                    urlEndpoint={config.env.imagekit.urlEndpoint}
                    alt="Event cover"
                    fill
                    className="rounded-sm object-fill"
                    loading="lazy"
                    lqip={{ active: true }}
                />
            </div>
        </div>
    );
};
export default EventCover;