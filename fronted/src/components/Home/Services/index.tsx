// "use client";
// import Image from "next/image";
// import { Icon } from "@iconify/react/dist/iconify.js";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// const Categories = () => {
//   type RoomType = {
//     name?: string;
//     image?: string;
//     description?: string;
//   };
//   const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);

//   useEffect(() => {
//     // Update the URL below to match your backend endpoint
//     fetch("http://localhost:3001/roomtypes/limited")
//       .then((res) => res.json())
//       .then((data) => setRoomTypes(data.roomtype || []));
//   }, []);

//   return (
//     <section className="relative overflow-hidden">
//       <div className="absolute left-0 top-0">
//         <Image
//           src="/images/categories/Vector.svg"
//           alt="vector"
//           width={800}
//           height={1050}
//           className="dark:hidden"
//           unoptimized={true}
//         />
//         <Image
//           src="/images/categories/Vector-dark.svg"
//           alt="vector"
//           width={800}
//           height={1050}
//           className="hidden dark:block"
//           unoptimized={true}
//         />
//       </div>
//       <div className="container max-w-8xl mx-auto px-5 2xl:px-0 relative z-10">
//         <div className="grid grid-cols-12 items-center gap-10">
//           <div className="lg:col-span-6 col-span-12">
//             <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2.5">
//               <Icon icon="ph:house-simple-fill" className="text-2xl text-primary " />
//               Hotel Amenities
//             </p>
//             <h2 className="lg:text-52 text-40 mt-4 mb-2 lg:max-w-full font-medium leading-[1.2] text-dark dark:text-white">
//               Experience luxury hospitality
//               with world-class services.
//             </h2>
//             <p className="text-dark/50 dark:text-white/50 text-lg lg:max-w-full leading-[1.3] md:max-w-3/4">
//               Discover our premium hotel amenities, from elegant suites to fine dining, spa treatments, and exceptional service
//             </p>
//             <Link href="/properties" className="py-4 px-8 bg-primary text-base leading-4 block w-fit text-white rounded-full font-semibold mt-8 hover:bg-dark duration-300">
//               View amenities
//             </Link>
//           </div>
//           {roomTypes.map((room, idx) => {
//             // Determine grid and image size based on index
//             let gridClass = "lg:col-span-3 col-span-6";
//             let imgWidth = 320;
//             let imgHeight = 412;
//             if (idx === 0) {
//               gridClass = "lg:col-span-6 col-span-12";
//               imgWidth = 680;
//               imgHeight = 386;
//             } else if (idx === 1) {
//               gridClass = "lg:col-span-6 col-span-12";
//               imgWidth = 680;
//               imgHeight = 386;
//             } else if (idx === 2 || idx === 3) {
//               gridClass = "lg:col-span-3 col-span-6";
//               imgWidth = 320;
//               imgHeight = 412;
//             }
//             return (
//               <div key={idx} className={gridClass}>
//                 <div className="relative rounded-2xl overflow-hidden group">
//                   <Link href={`/${room.name?.toLowerCase().replace(/\s/g, "-") || "#"}`}>
//                     <Image
//                       src={room.image || "/images/categories/villas.jpg"}
//                       alt={room.name || "room"}
//                       width={imgWidth}
//                       height={imgHeight}
//                       className="w-full"
//                       unoptimized={true}
//                     />
//                   </Link>
//                   <Link href={`/${room.name?.toLowerCase().replace(/\s/g, "-") || "#"}`} className="absolute w-full h-full bg-gradient-to-b from-black/0 to-black/80 top-full flex flex-col justify-between pl-10 pb-10 group-hover:top-0 duration-500">
//                     <div className="flex justify-end mt-6 mr-6">
//                       <div className="bg-white text-dark rounded-full w-fit p-4">
//                         <Icon icon="ph:arrow-right" width={24} height={24} />
//                       </div>
//                     </div>
//                     <div className="flex flex-col gap-2.5">
//                       <h3 className="text-white text-2xl">{room.name || "Room Type"}</h3>
//                       <p className="text-white/80 text-base leading-6">{room.description || "No description available."}</p>
//                     </div>
//                   </Link>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Categories;









// "use client";

// import Image from "next/image";
// import { Icon } from "@iconify/react";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useTheme } from "next-themes";

// const Categories = () => {
//   type RoomType = {
//     name?: string;
//     image?: string;
//     description?: string;
//   };

//   const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
//   const { theme } = useTheme();
//   const isDark = theme === "dark";

//   useEffect(() => {
//     fetch("http://localhost:3001/roomtypes/limited")
//       .then((res) => res.json())
//       .then((data) => setRoomTypes(data.roomtype || []));
//   }, []);

//   return (
//     <section
//       className={`relative overflow-hidden py-20 transition-all duration-500 ${
//         isDark
//           ? "bg-gradient-to-br from-black via-[#0e0e0e] to-[#1a1a1a]"
//           : "bg-gradient-to-br from-[#f8f3ea] via-[#f7f2e9] to-[#f0e8d9]"
//       }`}
//     >
//       {/* Decorative Soft Glow */}
//       <div
//         className={`absolute inset-0 pointer-events-none opacity-30 blur-3xl ${
//           isDark ? "bg-[#d4af37]" : "bg-[#c79b2b]"
//         }`}
//       ></div>

//       <div className="container max-w-7xl mx-auto px-6 relative z-10">
//         {/* Left Content */}
//         <div className="grid grid-cols-12 items-start gap-16 mb-20">
//           <div className="lg:col-span-6 col-span-12 space-y-5">
//             <p
//               className={`text-base font-semibold flex items-center gap-2 ${
//                 isDark ? "text-white/70" : "text-black/70"
//               }`}
//             >
//               <Icon
//                 icon="ph:house-simple-fill"
//                 className="text-2xl"
//                 style={{ color: isDark ? "#d4af37" : "#b48a1e" }}
//               />
//               Hotel Amenities
//             </p>

//             <h2
//               className={`lg:text-5xl text-4xl font-bold leading-tight ${
//                 isDark ? "text-white" : "text-black"
//               }`}
//             >
//               Luxury amenities crafted for exceptional comfort
//             </h2>

//             <p
//               className={`text-lg ${
//                 isDark ? "text-white/60" : "text-black/60"
//               }`}
//             >
//               Explore world-class facilities — premium suites, fine dining,
//               wellness spa, infinity pools, and personalized guest services.
//             </p>

//             <Link
//               href="/properties"
//               className={`py-4 px-8 text-base rounded-full font-semibold shadow-lg transition-all ${
//                 isDark
//                   ? "bg-[#d4af37] text-black hover:bg-white"
//                   : "bg-black text-white hover:bg-[#b48a1e]"
//               }`}
//             >
//               View amenities
//             </Link>
//           </div>

//           {/* Right Images */}
//           <div className="lg:col-span-6 col-span-12 grid grid-cols-12 gap-6">
//             {roomTypes.length === 0 && (
//               <p
//                 className={`col-span-12 text-center ${
//                   isDark ? "text-white/60" : "text-black/60"
//                 }`}
//               >
//                 Loading amenities...
//               </p>
//             )}

//             {roomTypes.map((room, idx) => {
//               return (
//                 <div
//                   key={idx}
//                   className={`col-span-6 lg:col-span-6 group relative rounded-2xl overflow-hidden shadow-xl backdrop-blur-lg 
//                   ${isDark ? "bg-white/5" : "bg-black/5"}`}
//                 >
//                   {/* Image */}
//                   <Link
//                     href={`/${room.name
//                       ?.toLowerCase()
//                       .replace(/\s/g, "-") || "#"}`}
//                   >
//                     <Image
//                       src={room.image || "/images/categories/villas.jpg"}
//                       alt={room.name || "room"}
//                       width={600}
//                       height={380}
//                       className="w-full h-64 object-cover transition duration-700 group-hover:scale-110"
//                       unoptimized
//                     />
//                   </Link>

//                   {/* Overlay Info */}
//                   <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/70 opacity-0 group-hover:opacity-100 transition-all duration-700 p-6 flex flex-col justify-end">
//                     <h3 className="text-white text-2xl font-semibold mb-2">
//                       {room.name || "Room Type"}
//                     </h3>
//                     <p className="text-white/80 text-sm leading-relaxed">
//                       {room.description || "No description available."}
//                     </p>
//                   </div>

//                   {/* Arrow Button */}
//                   <div className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-all">
//                     <Icon
//                       icon="ph:arrow-right"
//                       width={22}
//                       height={22}
//                       className="text-black"
//                     />
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Categories;









// "use client";

// import Image from "next/image";
// import { Icon } from "@iconify/react";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useTheme } from "next-themes";

// const Categories = () => {
//   type RoomType = {
//     name?: string;
//     image?: string;
//     description?: string;
//   };

//   const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
//   const { theme } = useTheme();
//   const isDark = theme === "dark";

//   useEffect(() => {
//     fetch("http://localhost:3001/roomtypes/limited")
//       .then((res) => res.json())
//       .then((data) => setRoomTypes(data.roomtype || []));
//   }, []);

//   return (
//     <section
//       className={`relative overflow-hidden py-20 transition-all duration-500 ${
//         isDark
//           ? "bg-gradient-to-br from-[#1E1B18] via-[#1C1A17] to-[#2C2B28]"
//           : "bg-gradient-to-br from-[#F5F0E1] via-[#F3ECE0] to-[#EDE3D1]"
//       }`}
//     >
//       {/* Decorative Soft Glow */}
//       <div
//         className={`absolute inset-0 pointer-events-none opacity-30 blur-3xl ${
//           isDark ? "bg-[#C9A36B]" : "bg-[#A78256]"
//         }`}
//       ></div>

//       <div className="container max-w-7xl mx-auto px-6 relative z-10">
//         {/* Left Content */}
//         <div className="grid grid-cols-12 items-start gap-16 mb-20">
//           <div className="lg:col-span-6 col-span-12 space-y-5">
//             <p
//               className={`text-base font-semibold flex items-center gap-2 ${
//                 isDark ? "text-[#F2E9E1]/70" : "text-[#5B4E43]"
//               }`}
//             >
//               <Icon
//                 icon="ph:house-simple-fill"
//                 className="text-2xl"
//                 style={{ color: isDark ? "#C9A36B" : "#6A4E23" }}
//               />
//               Hotel Amenities
//             </p>

//             <h2
//               className={`lg:text-5xl text-4xl font-bold leading-tight ${
//                 isDark ? "text-[#F2E9E1]" : "text-[#3B2F2F]"
//               }`}
//             >
//               Luxury amenities crafted for exceptional comfort
//             </h2>

//             <p
//               className={`text-lg ${
//                 isDark ? "text-[#F2E9E1]/60" : "text-[#5B4E43]/60"
//               }`}
//             >
//               Explore world-class facilities — premium suites, fine dining,
//               wellness spa, infinity pools, and personalized guest services.
//             </p>

//             <Link
//               href="/properties"
//               className={`py-4 px-8 text-base rounded-full font-semibold shadow-lg transition-all ${
//                 isDark
//                   ? "bg-[#C9A36B] text-black hover:bg-[#FFD700]"
//                   : "bg-black text-white hover:bg-[#6A4E23]"
//               }`}
//             >
//               View amenities
//             </Link>
//           </div>

//           {/* Right Images */}
//           <div className="lg:col-span-6 col-span-12 grid grid-cols-12 gap-6">
//             {roomTypes.length === 0 && (
//               <p
//                 className={`col-span-12 text-center ${
//                   isDark ? "text-[#F2E9E1]/60" : "text-[#5B4E43]/60"
//                 }`}
//               >
//                 Loading amenities...
//               </p>
//             )}

//             {roomTypes.map((room, idx) => (
//               <div
//                 key={idx}
//                 className={`col-span-6 lg:col-span-6 group relative rounded-2xl overflow-hidden shadow-xl backdrop-blur-lg ${
//                   isDark ? "bg-[#2C2B28]" : "bg-[#E0E0E0]"
//                 }`}
//               >
//                 {/* Image */}
//                 <Link
//                   href={`/${room.name?.toLowerCase().replace(/\s/g, "-") || "#"}`}
//                 >
//                   <Image
//                     src={room.image || "/images/categories/villas.jpg"}
//                     alt={room.name || "room"}
//                     width={600}
//                     height={380}
//                     className="w-full h-64 object-cover transition duration-700 group-hover:scale-110"
//                     unoptimized
//                   />
//                 </Link>

//                 {/* Overlay Info */}
//                 <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/70 opacity-0 group-hover:opacity-100 transition-all duration-700 p-6 flex flex-col justify-end">
//                   <h3 className="text-white text-2xl font-semibold mb-2">
//                     {room.name || "Room Type"}
//                   </h3>
//                   <p className="text-white/80 text-sm leading-relaxed">
//                     {room.description || "No description available."}
//                   </p>
//                 </div>

//                 {/* Arrow Button */}
//                 <div className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-all">
//                   <Icon
//                     icon="ph:arrow-right"
//                     width={22}
//                     height={22}
//                     className="text-black"
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Categories;






"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const Categories = () => {
  type RoomType = {
    name?: string;
    image?: string;
    description?: string;
  };

  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Exact colors from Testimonial/FAQ UI
  const colors = {
    bg: isDark ? "#1E1B18" : "#F5F0E1",
    text: isDark ? "#F2E9E1" : "#3B2F2F",
    textSecondary: isDark ? "#F2E9E1" : "#3B2F2F",
    cardBg: isDark ? "#3A352F" : "#F0E8E0",
    accent: isDark ? "#FFD700" : "#A78256",
    cardShadow: isDark
      ? "0 12px 28px rgba(255,255,255,0.05)"
      : "0 12px 28px rgba(0,0,0,0.1)",
    blurAccent: isDark ? "rgba(255,215,0,0.2)" : "rgba(220,202,176,0.15)",
    buttonText: isDark ? "#1E1B18" : "#FFF",
    buttonHover: isDark ? "#FFD700" : "#A78256",
  };

  useEffect(() => {
    fetch("http://localhost:3001/roomtypes/limited")
      .then((res) => res.json())
      .then((data) => setRoomTypes(data.roomtype || []));
  }, []);

  return (
    <section
      className="relative overflow-hidden py-28 transition-colors duration-500"
      style={{ background: colors.bg }}
    >
      {/* Decorative Glow */}
      <div
        className="absolute -top-8 -right-4 w-24 h-24 rounded-full blur-3xl pointer-events-none"
        style={{ background: colors.blurAccent }}
      ></div>

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        {/* Left Content */}
        <div className="grid lg:grid-cols-12 grid-cols-1 items-start gap-16 mb-20">
          <div className="lg:col-span-6 space-y-5">
            <p
              className="text-base font-semibold flex items-center gap-2"
              style={{ color: colors.textSecondary + "70" }}
            >
              <Icon icon="ph:house-simple-fill" className="text-2xl" style={{ color: colors.accent }} />
              Hotel Amenities
            </p>

            <h2
              className="lg:text-5xl text-4xl font-semibold leading-tight"
              style={{ color: colors.text }}
            >
              Luxury amenities crafted for exceptional comfort
            </h2>

            <p className="text-lg" style={{ color: colors.text + "60" }}>
              Explore world-class facilities — premium suites, fine dining, wellness spa, infinity pools, and personalized guest services.
            </p>

            <Link
              href="/properties"
              className="py-4 px-8 text-base font-semibold rounded-full shadow-lg transition-all"
              style={{
                background: colors.accent,
                color: colors.buttonText,
              }}
            >
              View amenities
            </Link>
          </div>

          {/* Right Images */}
          <div className="lg:col-span-6 grid grid-cols-12 gap-6">
            {roomTypes.length === 0 && (
              <p
                className="col-span-12 text-center"
                style={{ color: colors.textSecondary + "60" }}
              >
                Loading amenities...
              </p>
            )}

            {roomTypes.map((room, idx) => (
              <div
                key={idx}
                className="col-span-6 relative group rounded-2xl overflow-hidden shadow-lg"
                style={{ background: colors.cardBg, boxShadow: colors.cardShadow }}
              >
                <Link href={`/${room.name?.toLowerCase().replace(/\s/g, "-") || "#"}`}>
                  <Image
                    src={room.image || "/images/categories/villas.jpg"}
                    alt={room.name || "Room Type"}
                    width={600}
                    height={380}
                    className="w-full h-64 object-cover transition duration-700 group-hover:scale-110"
                    unoptimized
                  />
                </Link>

                {/* Overlay Info */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/70 opacity-0 group-hover:opacity-100 transition-all duration-700 p-6 flex flex-col justify-end">
                  <h3 className="text-white text-2xl font-semibold mb-2">{room.name || "Room Type"}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {room.description || "No description available."}
                  </p>
                </div>

                {/* Arrow Button */}
                <div className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-all">
                  <Icon icon="ph:arrow-right" width={22} height={22} className="text-black" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
