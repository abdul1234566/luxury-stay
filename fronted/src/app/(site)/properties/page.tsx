// import HeroSub from "@/components/shared/HeroSub";
// import PropertiesListing from "@/components/Properties/PropertyList";
// import React from "react";
// import { Metadata } from "next";
// export const metadata: Metadata = {
//     title: "Property List | Homely",
// };

// const page = () => {
//     return (
//         <>
//             <HeroSub
//                 title="Discover inspiring designed homes."
//                 description="Experience elegance and comfort with our exclusive luxury  villas, designed for sophisticated living."
//                 badge="Properties"
//             />
//             <PropertiesListing />
//         </>
//     );
// };

// export default page;




// import HeroSub from "@/components/shared/HeroSub";
// import PropertiesListing from "@/components/Properties/PropertyList";
// import { Metadata } from "next";
// import ThemeWrapper from "./themeWraper";


// export const metadata: Metadata = {
//     title: "Property List | Homely",
// };

// const Page = () => {
//     return (
//         <>
//             <ThemeWrapper>
//                 <section className="pt-44 pb-20">
//                     <div className="container mx-auto max-w-6xl">
//                         <HeroSub
//                             title="Discover inspiring designed homes."
//                             description="Experience elegance and comfort with our exclusive luxury villas, designed for sophisticated living."
//                             badge="Properties"
//                         />
//                         <div className="mt-12">
//                             <PropertiesListing />
//                         </div>
//                     </div>
//                 </section>
//             </ThemeWrapper>
//         </>
//     );
// };

// export default Page;








// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { useTheme } from "next-themes";

// export default function RoomsPage() {
//   const { theme } = useTheme();
//   const isDark = theme === "dark";

//   // Same premium theme colors
//   const colors = {
//     bg: isDark ? "#1E1B18" : "#F5F0E1",
//     heroFrom: isDark ? "#2C2723" : "#F5EAD6",
//     heroTo: isDark ? "#3A352F" : "#EADFC2",
//     buttonBg: isDark ? "#A78256" : "#DCCAB0",
//     buttonText: isDark ? "#FFF5E1" : "#3B2F2F",
//     buttonHover: isDark ? "#8F6948" : "#CBB292",
//     text: isDark ? "#F2E9E1" : "#3B2F2F",
//   };

//   return (
//     <div className="transition-colors duration-500" style={{ background: colors.bg, color: colors.text }}>
      

//       {/* Hero Section */}
//       <section
//         className="relative py-36 text-center"
//         style={{
//           background: `linear-gradient(to right, ${colors.heroFrom}, ${colors.heroTo})`,
//         }}
//       >
//         <h1 className="text-5xl font-bold mb-4">Explore Our Luxurious Rooms</h1>
//         <p className="text-xl max-w-2xl mx-auto mb-8">
//           Choose from a wide range of elegantly designed rooms with comfort and premium amenities.
//         </p>
//         <Link href="/properties/book">
//           <button
//             className="px-10 py-4 font-semibold rounded-full transition-opacity duration-300 hover:opacity-90"
//             style={{
//               background: colors.buttonBg,
//               color: colors.buttonText,
//             }}
//           >
//             View Rooms
//           </button>
//         </Link>
//       </section>

      
//     </div>
//   );
// }





"use client";

import React from "react";
import { useTheme } from "next-themes";
import { useRooms } from "@/hooks/useRooms";
import PropertyCard from "@/components/Home/Properties/Card/Card";

export default function RoomsPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { rooms, loading, error } = useRooms(); // Fetch actual rooms

  // Premium theme colors
  const colors = {
    bg: isDark ? "#1E1B18" : "#F5F0E1",
    heroFrom: isDark ? "#2C2723" : "#F5EAD6",
    heroTo: isDark ? "#3A352F" : "#EADFC2",
    buttonBg: isDark ? "#A78256" : "#DCCAB0",
    buttonText: isDark ? "#FFF5E1" : "#3B2F2F",
    text: isDark ? "#F2E9E1" : "#3B2F2F",
  };

  return (
    <div className="transition-colors duration-500" style={{ background: colors.bg, color: colors.text }}>
      {/* Hero Section */}
      <section
        className="relative py-36 text-center"
        style={{ background: `linear-gradient(to right, ${colors.heroFrom}, ${colors.heroTo})` }}
      >
        <h1 className="text-5xl font-bold mb-4">Explore Our Luxurious Rooms</h1>
        <p className="text-xl max-w-2xl mx-auto mb-8">
          Choose from a wide range of elegantly designed rooms with comfort and premium amenities.
        </p>
        <a href="#rooms">
          <button
            className="px-10 py-4 font-semibold rounded-full transition-opacity duration-300 hover:opacity-90"
            style={{ background: colors.buttonBg, color: colors.buttonText }}
          >
            View Rooms
          </button>
        </a>
      </section>

      {/* Rooms Section */}
      <section id="rooms" className="container mx-auto px-5 max-w-7xl mt-10">
        <h2 className="text-3xl font-bold text-center mb-10">Our Luxury Rooms</h2>

        {loading ? (
          <p className="text-center text-lg">Loading rooms...</p>
        ) : error ? (
          <p className="text-center text-lg text-red-600">{error}</p>
        ) : rooms.length === 0 ? (
          <p className="text-center text-lg">No rooms available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <PropertyCard key={room._id} item={room} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
