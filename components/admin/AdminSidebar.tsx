// "use client";

// // import { adminSideBarLinks } from '@/constants';
// // import { cn, getInitials } from '@/lib/utils';
// // import Image from 'next/image';
// // import Link from 'next/link';
// // import { usePathname } from 'next/navigation';
// import React from 'react'
// // import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// // import { Session } from 'next-auth';

// // import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

// import {
//     Sidebar,
//     SidebarContent,
//     SidebarGroup,
//     SidebarGroupContent,
//     SidebarGroupLabel,
//     SidebarMenu,
//     SidebarMenuButton,
//     SidebarMenuItem,
// } from "@/components/ui/sidebar"
// import HomeIcon from "/icons/admin/home.svg";
// import PlayerIcon from "/icons/admin/users.svg";
// import TeamIcon from "/icons/admin/dashboard.svg";
// import EventIcon from "/icons/admin/dashboard.svg";

// export const adminSideBarLinks = [
//     {
//         img: HomeIcon, 
//         route: "/admin",
//         text: "Home" 
//     },
//     { 
//         img: PlayerIcon, 
//         route: "/admin/players",
//         label: "All Players" 
//     },
//     { 
//         img: TeamIcon, 
//         route: "/admin/teams",
//         label: "All Teams" 
//     },
//     { 
//         img: EventIcon, 
//         route: "/admin/events",
//         label: "All Events" 
//     },
// ];

// // const Sidebar = ({ session }: {session: Session}) => {
// const AdminSidebar = () => {
//     // const pathName = usePathname();

//     return (
//         <Sidebar collapsible='icon'>
//             <SidebarContent>
//                 <SidebarGroup>
//                     <SidebarGroupLabel>Application</SidebarGroupLabel>
//                     <SidebarGroupContent>
//                         <SidebarMenu>
//                         {adminSideBarLinks.map((item) => (
//                             <SidebarMenuItem key={item.label}>
//                                 <SidebarMenuButton asChild>
//                                     <a href={item.route}>
//                                         <item.img />
//                                         <span>{item.label}</span>
//                                     </a>
//                                 </SidebarMenuButton>
//                             </SidebarMenuItem>
//                         ))}
//                         </SidebarMenu>
//                     </SidebarGroupContent>
//                 </SidebarGroup>
//             </SidebarContent>
//         </Sidebar>
//     );
// };

// export default AdminSidebar;