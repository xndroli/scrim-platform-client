import React from "react";
//import { match } from "assert";
//import { redirect } from "next/navigation";
// import { auth } from "@/auth";
// import EventOverview from "@/components/EventOverview";
// import EventVideo from "@/components/EventVideo";

const Page = async () => {
    //const id = (await params).id;
    // const session = await auth();

    // Fetch data based on id
    const matchDetails = [
    {
        id: 1,
        title: "The Midnight Battle",
        creator: "Raijin",
        game: "Apex Legends",
        rating: 4.6,
        total_slots: 20,
        available_slots: 10,
        description:
            "A dazzling novel about all the choices that go into a life well lived, The Midnight Battle tells the story of ready player one as they find themselves between life and death.",
        color: "#1c1f40",
        cover: "https://m.media-amazon.com/images/I/81J6APjwxlL.jpg",
        video: "/sample-video.mp4?updatedAt=1722593504152",
        summary:
            "A dazzling event about all the choices that go into a life well lived, The Midnight Battle tells the story of ready player one as they find themselves between life and death.",
    },
    {
        id: 2,
        title: "The Morning Battle",
        creator: "Raijin",
        game: "Apex Legends",
        rating: 4.6,
        total_slots: 20,
        available_slots: 10,
        description:
            "A dazzling novel about all the choices that go into a life well lived, The Midnight Battle tells the story of ready player one as they find themselves between life and death.",
        color: "#1c1f40",
        cover: "https://m.media-amazon.com/images/I/81J6APjwxlL.jpg",
        video: "/sample-video.mp4?updatedAt=1722593504152",
        summary:
            "A dazzling event about all the choices that go into a life well lived, The Midnight Battle tells the story of ready player one as they find themselves between life and death.",
    },
    {
        id: 3,
        title: "The Dawn Battle",
        creator: "Raijin",
        game: "Apex Legends",
        rating: 4.6,
        total_slots: 20,
        available_slots: 10,
        description:
            "A dazzling novel about all the choices that go into a life well lived, The Midnight Battle tells the story of ready player one as they find themselves between life and death.",
        color: "#1c1f40",
        cover: "https://m.media-amazon.com/images/I/81J6APjwxlL.jpg",
        video: "/sample-video.mp4?updatedAt=1722593504152",
        summary:
            "A dazzling event about all the choices that go into a life well lived, The Midnight Battle tells the story of ready player one as they find themselves between life and death.",
    },
    {
        id: 4,
        title: "The Dusk Battle",
        creator: "Raijin",
        game: "Apex Legends",
        rating: 4.6,
        total_slots: 20,
        available_slots: 10,
        description:
            "A dazzling novel about all the choices that go into a life well lived, The Midnight Battle tells the story of ready player one as they find themselves between life and death.",
        color: "#1c1f40",
        cover: "https://m.media-amazon.com/images/I/81J6APjwxlL.jpg",
        video: "/sample-video.mp4?updatedAt=1722593504152",
        summary:
            "A dazzling event about all the choices that go into a life well lived, The Midnight Battle tells the story of ready player one as they find themselves between life and death.",
    },
];

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
                            {matchDetails.map((matchDetail, i) => (
                                <div key={i}>
                                    {matchDetail.title.split("\n").map((line, i) => (
                                        <p key={i}>{line}</p>
                                    ))}
                                </div>
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