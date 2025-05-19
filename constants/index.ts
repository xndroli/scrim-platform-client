export const adminSideBarLinks = [
    {
        img: "/icons/admin/home.svg", 
        route: "/admin",
        text: "Home" 
    },
    { 
        img: "/icons/admin/users.svg", 
        route: "/admin/players",
        label: "All Players" 
    },
    { 
        img: "/icons/admin/dashboard.svg", 
        route: "/admin/teams",
        label: "All Teams" 
    },
    { 
        img: "/icons/admin/dashboard.svg", 
        route: "/admin/events",
        label: "All Events" 
    },
];

export const FIELD_NAMES = {
    fullName: "Full name",
    email: "Email",
    teamId: "Team ID Number",
    password: "Password",
};

export const FIELD_TYPES = {
    fullName: "text",
    email: "email",
    teamId: "number",
    password: "password",
};

export const sampleEvents = [
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