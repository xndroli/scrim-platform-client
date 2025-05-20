"use client";

// import { adminSideBarLinks } from '@/constants';
import { cn, getInitials } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import { Session } from 'next-auth';

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

// const Sidebar = ({ session }: {session: Session}) => {
const Sidebar = () => {
    const pathName = usePathname();

    return (
        <div className="admin-sidebar">
            <div>
                <div className="logo">
                    <Image src="/images/logo.png" alt="logo" width={64} height={64} />
                    <h1>Raijin</h1>
                </div>

                <div className="mt-10 flex flex-col gap-5">
                    {adminSideBarLinks.map((link) => {
                        const isSelected = (link.route !== '/admin' 
                            && pathName.includes(link.route) 
                            && link.route.length > 1
                        ) || pathName === link.route;

                        return (
                            <Link href={link.route} key={link.route} className="link">
                                <div className={cn("link", isSelected && "bg-primary-admin shadow-sm")}>
                                    <div className="relative size-5">
                                        <Image 
                                            src={link.img} 
                                            alt="icon" 
                                            fill 
                                            className={`${isSelected} 
                                                ? "brightness-0 invert" 
                                                : "" object-contain`
                                            } 
                                        />
                                    </div>

                                    <p className={cn(isSelected ? "text-white" : "text-dark")}>
                                        {link.text}
                                    </p>
                                </div>
                            </Link>
                        );
                    })};
                </div>
            </div>

            <div className="user">
                <Avatar>
                    <AvatarFallback className="bg-amber-100">
                        {/* {getInitials(session?.user?.name || "RN")} */}
                        {getInitials("Raijin Ascendancy")}
                    </AvatarFallback>
                </Avatar>

                <div className="flex flex-col max-md:hidden">
                    {/* <p className="font-semibold text-dark-200">{session?.user?.name || "Raijin Admin" }</p> */}
                    {/* <p className="text-light-500 text-xs">{session?.user?.email || "admin@raijinascendancy.com" }</p> */}
                    <p className="font-semibold text-dark-200">{"Raijin Admin" }</p>
                    <p className="text-light-500 text-xs">{"admin@raijinascendancy.com" }</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;