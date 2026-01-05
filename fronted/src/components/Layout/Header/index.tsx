// 'use client'
// import { Icon } from "@iconify/react";
// import Link from "next/link";
// import Image from "next/image";
// import { useState, useEffect, useRef, useCallback } from "react";
// import { useTheme } from "next-themes";
// import { useSession, signOut } from "next-auth/react";
// import { usePathname } from "next/navigation";
// import { useRole } from "@/hooks/useRole";
// import NavLink from "./Navigation/NavLink";
// import { getNavLinks } from "@/app/api/navlink";

// // ...keep imports the same

// const Header = () => {
//   const [sticky, setSticky] = useState(false);

//   const [navbarOpen, setNavbarOpen] = useState(false);
//   const { theme, setTheme } = useTheme();
//   const { data: session } = useSession();
//   const pathname = usePathname();
//   const { userRole } = useRole();

//   const allNavLinks = getNavLinks(userRole);

//   // Always show only first 4 links on desktop
//   const desktopNavLinks = allNavLinks.slice(0, 4);

//   const sideMenuRef = useRef(null);
//   const userDropdownRef = useRef(null);
//   const [userDropdownOpen, setUserDropdownOpen] = useState(false);

//   const isHomepage = pathname === "/";

//   const handleScroll = useCallback(() => {
//     setSticky(window.scrollY >= 50);
//   }, []);

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [handleScroll]);

//   return (
//     <header className={`fixed w-full z-50 transition-all duration-300 ${sticky ? "top-3" : "top-0"}`}>
//       <nav className={`mx-auto max-w-7xl px-6 py-4 flex items-center justify-between rounded-3xl shadow-lg transition-all duration-300 ${sticky ? "bg-[#F9F6F1]/80 backdrop-blur-xl border border-[#E5D7C4] dark:bg-[#1F1B17]/80 dark:border-[#3A342E]" : "bg-transparent"}`}>
        
//         {/* LEFT — LOGO */}
//         <Link href="/" className="flex items-center gap-2">
//           <Image src="/images/header/logo_light.png" alt="LuxuryStay" width={150} height={70} className="dark:hidden" />
//           <Image src="/images/header/logo_dark.png" alt="LuxuryStay" width={150} height={70} className="hidden dark:block" />
//         </Link>

//         {/* CENTER — NAV LINKS (Desktop) */}
//         <div className="hidden lg:flex items-center gap-10">
//           {desktopNavLinks.map((item, i) => (
//             <NavLink key={i} item={item} />
//           ))}
//         </div>

//         {/* RIGHT — ACTIONS */}
//         <div className="flex items-center gap-5">
//           {/* Theme Toggle */}
//           <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="hover:opacity-80">
//             <Icon icon="solar:sun-bold" width={28} height={28} className="dark:hidden text-[#1F1B17]" />
//             <Icon icon="solar:moon-bold" width={28} height={28} className="hidden dark:block text-[#F9F6F1]" />
//           </button>

//           {/* User */}
//           {session ? (
//             <div className="relative" ref={userDropdownRef}>
//               <button onClick={() => setUserDropdownOpen(!userDropdownOpen)} className="flex items-center gap-2 bg-[#D4A059] text-white px-4 py-2 rounded-full shadow-lg hover:bg-[#A67C42] transition-all">
//                 <Icon icon="ph:user" width={20} />
//                 <Icon icon="ph:caret-down" width={16} />
//               </button>

//               {userDropdownOpen && (
//                 <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-[#1F1B17] rounded-xl shadow-xl p-4 border border-[#E5D7C4] dark:border-[#3A342E]">
//                   <p className="text-sm text-gray-700 dark:text-gray-200">Signed in as</p>
//                   <p className="font-semibold mb-3 text-[#D4A059] dark:text-[#D4A059]">{session.user?.email}</p>
//                   <Link href="/profile" className="block py-2 text-sm hover:text-[#D4A059] transition">My Profile</Link>
//                   <button onClick={() => signOut({ callbackUrl: "/signin" })} className="text-left w-full py-2 text-sm text-red-600 hover:text-red-700">Logout</button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <Link href="/signin" className="bg-[#D4A059] text-white px-6 py-2 rounded-full shadow-lg hover:bg-[#A67C42] transition-all">Sign In</Link>
//           )}

//           {/* Hamburger Menu (always visible) */}
//           <button onClick={() => setNavbarOpen(true)} className="bg-[#D4A059] text-white p-3 rounded-full shadow-lg hover:bg-[#A67C42] transition-all">
//             <Icon icon="ph:list" width={24} />
//           </button>
//         </div>
//       </nav>

//       {/* SIDE MENU */}
//       {navbarOpen && (
//         <>
//           <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />
//           <div ref={sideMenuRef} className={`fixed top-0 right-0 w-full max-w-md h-full bg-[#1F1B17] text-white z-50 p-10 transition-transform duration-300 ${navbarOpen ? "translate-x-0" : "translate-x-full"}`}>
//             <div className="flex justify-end">
//               <button onClick={() => setNavbarOpen(false)} className="bg-white p-3 rounded-full text-black shadow">
//                 <Icon icon="ph:x" width={22} />
//               </button>
//             </div>

//             <ul className="mt-10 space-y-6 text-lg">
//               {allNavLinks.map((item, i) => (
//                 <NavLink key={i} item={item} onClick={() => setNavbarOpen(false)} />
//               ))}

//               {!session && (
//                 <>
//                   <Link href="/signin" className="block bg-[#D4A059] text-center py-3 rounded-full text-white font-semibold hover:bg-[#A67C42] transition">Sign In</Link>
//                   <Link href="/signup" className="block border border-[#D4A059] text-center py-3 rounded-full text-[#D4A059] font-semibold hover:bg-[#D4A059] hover:text-white transition">Sign Up</Link>
//                 </>
//               )}
//             </ul>

//             <div className="mt-20 text-sm text-white/60">
//               <p>Contact</p>
//               <p className="mt-2">LuxuryStay@gmail.com</p>
//               <p>+1 212 456 789</p>
//             </div>
//           </div>
//         </>
//       )}
//     </header>
//   );
// };

// export default Header;











'use client'
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRole } from "@/hooks/useRole";
import NavLink from "./Navigation/NavLink";
import { getNavLinks } from "@/app/api/navlink";

const Header = () => {
  const [sticky, setSticky] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const pathname = usePathname();
  const { userRole } = useRole();
  const allNavLinks = getNavLinks(userRole);

  const desktopNavLinks = allNavLinks.slice(0, 4);

  const sideMenuRef = useRef(null);
  const userDropdownRef = useRef(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  type Notification = {
    _id: string;
    message: string;
    read: boolean;
    createdAt: string;
  };
  
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notifOpen, setNotifOpen] = useState(false);
  

  const isHomepage = pathname === "/";

  const handleScroll = useCallback(() => {
    setSticky(window.scrollY >= 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!session?.user?.id) return;
  
    const fetchNotifications = async () => {
      try {
        const res = await fetch(`http://localhost:3001/notifications/${session.user.id}`);
        const data = await res.json();
        setNotifications(data.notifications || []);
      } catch (err) {
        console.error("Notification error", err);
      }
    };
  
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, [session?.user?.id]);
  

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${sticky ? "top-3" : "top-0"}`}>
      <nav className={`mx-auto max-w-7xl px-6 py-4 flex items-center justify-between rounded-3xl shadow-lg transition-all duration-300 ${sticky ? "bg-[#F9F6F1]/80 backdrop-blur-xl border border-[#E5D7C4] dark:bg-[#1F1B17]/80 dark:border-[#3A342E]" : "bg-transparent"}`}>
        
        {/* LEFT — LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/header/logo_light.png" alt="LuxuryStay" width={150} height={70} className="dark:hidden" />
          <Image src="/images/header/logo_dark.png" alt="LuxuryStay" width={150} height={70} className="hidden dark:block" />
        </Link>

        {/* NAV LINKS (Desktop) */}
        <div className="hidden lg:flex items-center gap-10">
          {desktopNavLinks.map((item, i) => (
            <NavLink key={i} item={item} />
          ))}
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-5">

          {/* Theme Toggle */}
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="hover:opacity-80">
            <Icon icon="solar:sun-bold" width={28} height={28} className="dark:hidden text-[#1F1B17]" />
            <Icon icon="solar:moon-bold" width={28} height={28} className="hidden dark:block text-[#F9F6F1]" />
          </button>
          {/* Notifications */}
{session && (
  <div className="relative">
    <button
      onClick={() => setNotifOpen(!notifOpen)}
      className="relative hover:opacity-80 transition"
    >
      <Icon
        icon="ph:bell"
        width={26}
        height={26}
        className="text-[#1F1B17] dark:text-[#F9F6F1]"
      />

      {/* Unread dot */}
      {notifications.some(n => !n.read) && (
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-[#1F1B17]" />
      )}
    </button>

    {/* Dropdown */}
    {notifOpen && (
      <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-[#1F1B17] rounded-xl shadow-xl border border-[#E5D7C4] dark:border-[#3A342E] overflow-hidden z-50">
        <div className="px-4 py-3 border-b border-[#E5D7C4] dark:border-[#3A342E] font-semibold">
          Notifications
        </div>

        {notifications.length === 0 ? (
          <p className="p-4 text-sm text-gray-500 dark:text-gray-400">
            No notifications
          </p>
        ) : (
          notifications.map((n) => (
            <div
              key={n._id}
              className={`px-4 py-3 text-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-[#2A241E] ${
                !n.read ? "bg-[#EEE4D3]/40 dark:bg-[#3A342E]" : ""
              }`}
            >
              {n.message}
              <p className="text-xs mt-1 text-gray-400">
                {new Date(n.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    )}
  </div>
)}


          {/* User Dropdown */}
          {session ? (
            <div className="relative" ref={userDropdownRef}>
              <button onClick={() => setUserDropdownOpen(!userDropdownOpen)} className="flex items-center gap-2 bg-[#D4A059] text-white px-4 py-2 rounded-full shadow-lg hover:bg-[#A67C42] transition-all">
                <Icon icon="ph:user" width={20} />
                <Icon icon="ph:caret-down" width={16} />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-[#1F1B17] rounded-xl shadow-xl p-4 border border-[#E5D7C4] dark:border-[#3A342E]">
                  <p className="text-sm text-gray-700 dark:text-gray-200">Signed in as</p>
                  <p className="font-semibold mb-3 text-[#D4A059] dark:text-[#D4A059]">{session.user?.email}</p>
                  <Link href="/profile" className="block py-2 text-sm hover:text-[#D4A059] transition">My Profile</Link>
                  <button onClick={() => signOut({ callbackUrl: "/signin" })} className="text-left w-full py-2 text-sm text-red-600 hover:text-red-700">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/signin" className="bg-[#D4A059] text-white px-6 py-2 rounded-full shadow-lg hover:bg-[#A67C42] transition-all">Sign In</Link>
          )}

          {/* Hamburger Menu */}
          <button onClick={() => setNavbarOpen(true)} className="bg-[#D4A059] text-white p-3 rounded-full shadow-lg hover:bg-[#A67C42] transition-all">
            <Icon icon="ph:list" width={24} />
          </button>
        </div>
      </nav>

      {/* SIDE MENU */}
      {navbarOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />

          {/* ⭐ SCROLL ENABLED + TOP MARGIN REDUCED ⭐ */}
          <div
            ref={sideMenuRef}
            className={`fixed top-0 right-0 w-full max-w-md h-full bg-[#1F1B17] text-white z-50 p-10 transition-transform duration-300 overflow-y-auto ${navbarOpen ? "translate-x-0" : "translate-x-full"}`}
          >
            <div className="flex justify-end">
              <button onClick={() => setNavbarOpen(false)} className="bg-white p-3 rounded-full text-black shadow">
                <Icon icon="ph:x" width={22} />
              </button>
            </div>

            {/* Reduced gap: mt-10 ➝ mt-4 */}
            <ul className="mt-1 space-y-6 text-lg">
              {allNavLinks.map((item, i) => (
                <NavLink key={i} item={item} onClick={() => setNavbarOpen(false)} />
              ))}

              {!session && (
                <>
                  <Link href="/signin" className="block bg-[#D4A059] text-center py-3 rounded-full text-white font-semibold hover:bg-[#A67C42] transition">Sign In</Link>
                  <Link href="/signup" className="block border border-[#D4A059] text-center py-3 rounded-full text-[#D4A059] font-semibold hover:bg-[#D4A059] hover:text-white transition">Sign Up</Link>
                </>
              )}
            </ul>

            <div className="mt-20 text-sm text-white/60">
              <p>Contact</p>
              <p className="mt-2">LuxuryStay@gmail.com</p>
              <p>+1 212 456 789</p>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;







// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { useSession, signOut } from "next-auth/react";
// import { useTheme } from "next-themes";
// import { Icon } from "@iconify/react";
// import { useEffect, useState } from "react";

// export default function Header() {
//   const { data: session } = useSession();
//   const { theme, setTheme } = useTheme();
//   const isDark = theme === "dark";

//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const beige = "#E8D8C3";
//   const lightBg = "#ffffff";
//   const darkBg = "#111111";
//   const lightText = "#F3F3F3";
//   const darkText = "#1A1A1A";

//   const scrolledBg = isDark ? lightBg : darkBg;
//   const scrolledText = isDark ? darkText : lightText;
//   const baseText = isDark ? lightText : darkText;

//   return (
//     <header
//       className={`fixed top-3 left-1/2 -translate-x-1/2 w-[98%] z-50 transition-all duration-300 
//       ${isScrolled ? "shadow-xl" : ""}`}
//       style={{
//         backgroundColor: isScrolled ? scrolledBg : "transparent",
//         borderRadius: "18px",
//       }}
//     >
//       <nav className="w-full flex items-center justify-between px-6 py-3">

//         {/* LOGO */}
//         <Link href="/" className="flex items-center">
//           <Image
//             src={"/images/header/logo_dark.png"}
//             alt="logo"
//             width={118}
//             height={118}
//             unoptimized
//             className="dark:hidden"
//           />
//           <Image
//             src={"/images/header/logo_light.png"}
//             alt="logo"
//             width={118}
//             height={118}
//             unoptimized
//             className="hidden dark:block"
//           />
//         </Link>

//         {/* CENTER NAV LINKS */}
//         <div className="hidden md:flex items-center gap-12 mx-auto">
//           {["Home", "About", "Rooms", "Contact"].map((item) => (
//             <Link
//               key={item}
//               href={`/${item.toLowerCase()}`}
//               className="text-base font-medium"
//               style={{ color: isScrolled ? scrolledText : baseText }}
//             >
//               {item}
//             </Link>
//           ))}
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="flex items-center gap-5">

//           {/* Theme Switch */}
//           <button
//             onClick={() => setTheme(isDark ? "light" : "dark")}
//             className="p-2 rounded-full hover:opacity-70 transition"
//           >
//             <Icon
//               icon={isDark ? "line-md:sun-rising-loop" : "line-md:moon-loop"}
//               width="26"
//               color={isScrolled ? scrolledText : baseText}
//             />
//           </button>

//           {/* SIGN IN BUTTON */}
//           {!session?.user && (
//             <Link
//               href="/signin"
//               className="px-6 py-2 rounded-full text-sm font-medium shadow-sm"
//               style={{
//                 backgroundColor: beige,
//                 color: "#111",
//               }}
//             >
//               Sign In
//             </Link>
//           )}

//           {/* LOGGED IN USER */}
//           {session?.user && (
//             <div className="flex items-center gap-4">

//               {/* Notification */}
//               <button className="relative hover:opacity-80 transition">
//                 <Icon
//                   icon="mdi:bell-outline"
//                   width="26"
//                   color={isScrolled ? scrolledText : baseText}
//                 />
//                 <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
//               </button>

//               {/* Avatar */}
//               <div className="group relative">
//                 <div
//                   className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-lg border cursor-pointer"
//                   style={{
//                     backgroundColor: beige,
//                     color: "#111",
//                     borderColor: "#c4b197",
//                   }}
//                 >
//                   {session.user.name?.charAt(0).toUpperCase() ?? "U"}
//                 </div>

//                 {/* Dropdown */}
//                 <div className="absolute right-0 mt-3 bg-white dark:bg-[#222] shadow-lg rounded-lg w-40 p-2 opacity-0 group-hover:opacity-100 transition pointer-events-none group-hover:pointer-events-auto">
//                   <Link
//                     href="/profile"
//                     className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#333] text-sm"
//                   >
//                     Profile
//                   </Link>
//                   <button
//                     onClick={() => signOut()}
//                     className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#333] text-sm"
//                   >
//                     Log out
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* MOBILE NAV ITEMS */}
//       <div className="md:hidden flex flex-col items-center gap-4 pb-4">
//         {["Home", "About", "Rooms", "Contact"].map((item) => (
//           <Link
//             key={item}
//             href={`/${item.toLowerCase()}`}
//             className="text-base font-medium"
//             style={{ color: isScrolled ? scrolledText : baseText }}
//           >
//             {item}
//           </Link>
//         ))}
//       </div>
//     </header>
//   );
// }















// 'use client';
// import { getNavLinks } from '@/app/api/navlink';
// import { Icon } from '@iconify/react';
// import Link from 'next/link';
// import { useEffect, useRef, useState, useCallback } from 'react';
// import NavLink from './Navigation/NavLink';
// import { useTheme } from 'next-themes';
// import { usePathname } from 'next/navigation';
// import { useSession, signOut } from 'next-auth/react';
// import { useRole } from '@/hooks/useRole';
// import Image from 'next/image'



// type Notification = {
//   _id: string;
//   userId: string;
//   type: string;
//   message: string;
//   data?: any;
//   read: boolean;
//   createdAt: string;
// };

// const Header: React.FC = () => {
//   const [sticky, setSticky] = useState(false);
//   const [navbarOpen, setNavbarOpen] = useState(false);
//   const { theme, setTheme } = useTheme();
//   const pathname = usePathname();
//   const { data: session } = useSession();
//   const { userRole } = useRole();
//   const [notifications, setNotifications] = useState<Notification[]>([]);
//   const [notifOpen, setNotifOpen] = useState(false);
//   const [userDropdownOpen, setUserDropdownOpen] = useState(false);

//   const navLinks = getNavLinks(userRole);

//   const fetchNotifications = useCallback(async () => {
//     if (!session?.user?.id) return;
//     try {
//       const res = await fetch(`http://localhost:3001/notifications/${session.user.id}`);
//       const data = await res.json();
//       if (res.ok) setNotifications(data.notifications || []);
//     } catch (err) {
//       console.error(err);
//     }
//   }, [session?.user?.id]);

//   const handleMarkRead = async (notifId: string) => {
//     try {
//       await fetch(`http://localhost:3001/notifications/read/${notifId}`, { method: 'PATCH' });
//       setNotifications(prev => prev.map(n => n._id === notifId ? { ...n, read: true } : n));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     if (!session?.user?.id) return;
//     fetchNotifications();
//     const interval = setInterval(fetchNotifications, 10000);
//     return () => clearInterval(interval);
//   }, [session?.user?.id, fetchNotifications]);

//   const sideMenuRef = useRef<HTMLDivElement>(null);
//   const userDropdownRef = useRef<HTMLDivElement>(null);

//   const handleClickOutside = (event: MouseEvent) => {
//     if (sideMenuRef.current && !sideMenuRef.current.contains(event.target as Node)) setNavbarOpen(false);
//     if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) setUserDropdownOpen(false);
//   };

//   const handleScroll = useCallback(() => setSticky(window.scrollY > 50), []);

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [handleScroll]);

//   const getUserInitials = (name: string) =>
//     name.split(' ').map(w => w.charAt(0)).join('').toUpperCase().slice(0, 2);

//   const isDark = theme === 'dark';
//   const golden = '#FFD700'; // golden color for both themes

//   return (
//     <header className={`fixed w-full z-50 transition-all duration-500 ${sticky ? 'backdrop-blur-md bg-white/95 dark:bg-gray-900/95 shadow-lg py-2' : 'bg-transparent py-4'}`}>
//       <nav className="container mx-auto flex items-center justify-between px-6 max-w-7xl">
//         {/* Logo as Text */}
//         <Link href="/" className="flex items-center gap-3">
//           {/* Logo */}
// <div className='flex items-center gap-3'>
//   <Link href='/'>
//     {/* Light mode logo */}
//     <Image
//       src={'/images/header/logo.png'}
//       alt='logo'
//       width={150}
//       height={45} // adjusted height for better aspect ratio
//       unoptimized={true}
//       className='dark:hidden'
//     />
//     {/* Dark mode logo */}
//     <Image
//       src={'/images/header/logo.png'}
//       alt='logo'
//       width={200}
//       height={65}
//       unoptimized={true}
//       className='hidden dark:block'
//     />
//   </Link>
// </div>

//         </Link>

//         {/* Desktop Nav */}
