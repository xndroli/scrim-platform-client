import React from "react";
import { db } from "@/database/drizzle";
import { matches } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
// import { auth } from "@/auth";
// import EventOverview from "@/components/EventOverview";
// import EventVideo from "@/components/EventVideo";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;
    // const session = await auth();

    // Fetch data based on id
    const [matchDetails] = await db
        .select()
        .from(matches)
        .where(eq(matches.match_id, id))
        .limit(1);

    if (!matchDetails) redirect("/404");

    return (
        <>
            {/* <EventOverview {...eventDetails} userId={session?.user?.id as string} /> */}

            <div className="Event-details">
                <div className="flex-[1.5]">
                    <section className="flex flex-col gap-7">
                        <h3>Video</h3>

                        {/* <EventVideo videoUrl={eventDetails.videoUrl} /> */}
                    </section>
                    <section className="mt-10 flex flex-col gap-7">
                        <h3>Summary</h3>

                        <div className="space-y-5 text-xl text-light-100">
                            {matchDetails.title.split("\n").map((line, i) => (
                                <p key={i}>{line}</p>
                            ))}
                        </div>
                    </section>
                </div>

                {/*  SIMILAR*/}
            </div>
        </>
    );
};
export default Page;