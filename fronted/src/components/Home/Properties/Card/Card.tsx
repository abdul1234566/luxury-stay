// import { PropertyHomes } from '@/types/properyHomes'
// import { Icon } from '@iconify/react'
// import Image from 'next/image'
// import Link from 'next/link'
// import { useSystemSettings } from '@/hooks/useSystemSettings'
// import { getCurrentRoomRate, formatCurrency } from '@/lib/roomPricing'

// const PropertyCard: React.FC<{ item: PropertyHomes }> = ({ item }) => {
//   const { name, location, rate, beds, baths, area, slug, images, roomType } = item
//   const { settings: systemSettings } = useSystemSettings()

//   const mainImage = images[0]?.src;

//   return (
//     <div>
//       <div className='relative rounded-2xl border border-dark/10 dark:border-white/10 group hover:shadow-3xl duration-300 dark:hover:shadow-white/20'>
//         <div className='overflow-hidden rounded-t-2xl'>
//           <Link href={`/properties/${slug}`}>
//             {mainImage && (
//               <Image
//                 src={mainImage}
//                 alt={name}
//                 width={400}
//                 height={100}
//                 className='w-full rounded-t-2xl group-hover:brightness-50 group-hover:scale-125 transition duration-300 delay-75'
//                 unoptimized={true}
//               />
//             )}
//           </Link>
//           <div className='absolute top-6 right-6 p-4 bg-white rounded-full hidden group-hover:block'>
//             <Icon
//               icon={'solar:arrow-right-linear'}
//               width={24}
//               height={24}
//               className='text-black'
//             />
//           </div>
//         </div>
//         <div className='p-6'>
//           <div className='flex flex-col mobile:flex-row gap-5 mobile:gap-0 justify-between mb-6'>
//             <div>
//               <Link href={`/properties/${slug}`}>
//                 <h3 className='text-xl font-medium text-black dark:text-white duration-300 group-hover:text-primary'>
//                   {name}
//                 </h3>
//               </Link>
//               <p className='text-base font-normal text-black/50 dark:text-white/50'>
//                 {location}
//               </p>
//             </div>
//             <div>
//               <button className='text-base font-normal text-primary px-5 py-2 rounded-full bg-primary/10'>
//                 {systemSettings && roomType 
//                   ? formatCurrency(getCurrentRoomRate(roomType, systemSettings), systemSettings)
//                   : `${rate}`
//                 }
//               </button>
//             </div>
//           </div>
//           <div className='flex'>
//             <div className='flex flex-col gap-2 border-e border-black/10 dark:border-white/20 pr-2 xs:pr-4 mobile:pr-8'>
//               <Icon icon={'solar:bed-linear'} width={20} height={20} />
//               <p className='text-sm mobile:text-base font-normal text-black dark:text-white'>
//                 {beds} Bedrooms
//               </p>
//             </div>
//             <div className='flex flex-col gap-2 border-e border-black/10 dark:border-white/20 px-2 xs:px-4 mobile:px-8'>
//               <Icon icon={'solar:bath-linear'} width={20} height={20} />
//               <p className='text-sm mobile:text-base font-normal text-black dark:text-white'>
//                 {baths} Bathrooms
//               </p>
//             </div>
//             <div className='flex flex-col gap-2 pl-2 xs:pl-4 mobile:pl-8'>
//               <Icon
//                 icon={'lineicons:arrow-all-direction'}
//                 width={20}
//                 height={20}
//               />
//               <p className='text-sm mobile:text-base font-normal text-black dark:text-white'>
//                 {area}m<sup>2</sup>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PropertyCard










// import { PropertyHomes } from '@/types/properyHomes'
// import { Icon } from '@iconify/react'
// import Image from 'next/image'
// import Link from 'next/link'
// import { useSystemSettings } from '@/hooks/useSystemSettings'
// import { getCurrentRoomRate, formatCurrency } from '@/lib/roomPricing'

// const PropertyCard: React.FC<{ item: PropertyHomes }> = ({ item }) => {
//   const { name, location, rate, beds, baths, area, slug, images, roomType } = item
//   const { settings: systemSettings } = useSystemSettings()

//   const mainImage = images[0]?.src;

//   return (
//     <div>
//       <div className="relative rounded-2xl border border-dark/10 dark:border-white/10 
//       group hover:shadow-3xl duration-300 dark:hover:shadow-white/20 
//       h-[40
//       0px] flex flex-col overflow-hidden">

//         {/* Image Section */}
//         <div className="overflow-hidden rounded-t-2xl h-[240px]">
//           <Link href={`/properties/${slug}`}>
//             {mainImage && (
//               <Image
//                 src={mainImage}
//                 alt={name}
//                 width={400}
//                 height={300}
//                 className="w-full h-full object-cover rounded-t-2xl 
//                 group-hover:brightness-50 group-hover:scale-125 
//                 transition duration-300 delay-75"
//                 unoptimized={true}
//               />
//             )}
//           </Link>
//           <div className="absolute top-6 right-6 p-4 bg-white rounded-full hidden group-hover:block">
//             <Icon icon="solar:arrow-right-linear" width={24} height={24} className="text-black" />
//           </div>
//         </div>

//         {/* Content Section */}
//         <div className="p-6 flex flex-col justify-between h-full">
//           <div className="flex flex-col mobile:flex-row gap-5 mobile:gap-0 justify-between mb-6">
//             <div>
//               <Link href={`/properties/${slug}`}>
//                 <h3 className="text-xl font-medium text-black dark:text-white duration-300 group-hover:text-primary">
//                   {name}
//                 </h3>
//               </Link>
//               <p className="text-base font-normal text-black/50 dark:text-white/50">
//                 {location}
//               </p>
//             </div>
//             <div>
//               <button className="text-base font-normal text-primary px-5 py-2 rounded-full bg-primary/10">
//                 {systemSettings && roomType
//                   ? formatCurrency(getCurrentRoomRate(roomType, systemSettings), systemSettings)
//                   : `${rate}`}
//               </button>
//             </div>
//           </div>

//           <div className="flex">
//             <div className="flex flex-col gap-2 border-e border-black/10 dark:border-white/20 pr-2 xs:pr-4 mobile:pr-8">
//               <Icon icon="solar:bed-linear" width={20} height={20} />
//               <p className="text-sm mobile:text-base">{beds} Bedrooms</p>
//             </div>
//             <div className="flex flex-col gap-2 border-e border-black/10 dark:border-white/20 px-2 xs:px-4 mobile:px-8">
//               <Icon icon="solar:bath-linear" width={20} height={20} />
//               <p className="text-sm mobile:text-base">{baths} Bathrooms</p>
//             </div>
//             <div className="flex flex-col gap-2 pl-2 xs:pl-4 mobile:pl-8">
//               <Icon icon="lineicons:arrow-all-direction" width={20} height={20} />
//               <p className="text-sm mobile:text-base">{area}m²</p>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   )
// }

// export default PropertyCard






// "use client";
// import { PropertyHomes } from "@/types/properyHomes";
// import Image from "next/image";
// import Link from "next/link";
// import { Icon } from "@iconify/react";
// import { useSystemSettings } from "@/hooks/useSystemSettings";
// import { getCurrentRoomRate, formatCurrency } from "@/lib/roomPricing";
// import { useTheme } from "next-themes";

// interface PropertyCardProps {
//   item: PropertyHomes;
// }

// const PropertyCard: React.FC<PropertyCardProps> = ({ item }) => {
//   const { name, location, rate, beds, baths, area, slug, images, roomType } = item;
//   const { settings: systemSettings } = useSystemSettings();
//   const { theme: mode } = useTheme();
//   const isDark = mode === "dark";

//   const mainImage = images[0]?.src;

//   return (
//     <Link href={`/properties/${slug}`} className="group">
//       <div
//         className={`relative rounded-3xl overflow-hidden shadow-xl transition-all duration-500
//           ${isDark ? "bg-[#2C2B28] hover:shadow-[#C9A36B]/40" : "bg-[#F5F0E1] hover:shadow-[#A78256]/40"}
//         `}
//       >
//         {/* Image Section */}
//         <div className="relative h-[280px] overflow-hidden">
//           {mainImage && (
//             <Image
//               src={mainImage}
//               alt={name}
//               width={400}
//               height={300}
//               className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//               unoptimized
//             />
//           )}
//           {/* Gradient overlay for readability */}
//           <div className={`absolute inset-0 bg-gradient-to-t
//             ${isDark ? "from-black/50 to-transparent" : "from-black/30 to-transparent"}`}
//           />
//         </div>

//         {/* Content Section */}
//         <div className="p-6 flex flex-col gap-4">
//           <h3
//             className={`text-2xl font-semibold transition-colors duration-300
//               ${isDark ? "text-[#F2E9E1] group-hover:text-[#C9A36B]" : "text-[#3B2F2F] group-hover:text-[#A78256]"}
//             `}
//           >
//             {name}
//           </h3>
//           <p className={`text-sm ${isDark ? "text-[#F2E9E1]/70" : "text-[#5B4E43]/70"}`}>
//             {location}
//           </p>

//           {/* Features */}
//           <div className="flex items-center gap-4 mt-2">
//             <div className="flex items-center gap-1">
//               <Icon icon="solar:bed-linear" className={`${isDark ? "text-[#C9A36B]" : "text-[#A78256]"}`} />
//               <span className={`${isDark ? "text-[#F2E9E1]" : "text-[#3B2F2F]"}`}>{beds} Beds</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <Icon icon="solar:bath-linear" className={`${isDark ? "text-[#C9A36B]" : "text-[#A78256]"}`} />
//               <span className={`${isDark ? "text-[#F2E9E1]" : "text-[#3B2F2F]"}`}>{baths} Baths</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <Icon icon="lineicons:arrow-all-direction" className={`${isDark ? "text-[#C9A36B]" : "text-[#A78256]"}`} />
//               <span className={`${isDark ? "text-[#F2E9E1]" : "text-[#3B2F2F]"}`}>{area} m²</span>
//             </div>
//           </div>

//           {/* Price Badge */}
//           <div className="mt-4">
//             <span
//               className={`px-4 py-2 rounded-full font-medium text-sm
//                 ${isDark ? "bg-[#C9A36B] text-black" : "bg-[#A78256] text-black"}
//               `}
//             >
//               {systemSettings && roomType
//                 ? formatCurrency(getCurrentRoomRate(roomType, systemSettings), systemSettings)
//                 : `$${rate}`}
//             </span>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default PropertyCard;










"use client";
import { PropertyHomes } from "@/types/properyHomes";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useSystemSettings } from "@/hooks/useSystemSettings";
import { getCurrentRoomRate, formatCurrency } from "@/lib/roomPricing";
import { useTheme } from "next-themes";

interface PropertyCardProps {
  item: PropertyHomes;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ item }) => {
  const { name, location, rate, beds, baths, area, slug, images, image, roomType } = item;
  const { settings: systemSettings } = useSystemSettings();
  const { theme: mode } = useTheme();
  const isDark = mode === "dark";

  // Safe image handling
  const mainImage = images?.[0]?.src || image || "/default-room.jpg";

  return (
    <div className={`group rounded-3xl overflow-hidden shadow-xl transition-all duration-500
      ${isDark ? "bg-[#2C2B28] hover:shadow-[#C9A36B]/40" : "bg-[#F5F0E1] hover:shadow-[#A78256]/40"}`}
    >
      {/* Image Section */}
      <div className="relative h-[280px] overflow-hidden">
        <Image
          src={mainImage}
          alt={name}
          width={400}
          height={300}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          unoptimized
        />
        <div className={`absolute inset-0 bg-gradient-to-t
          ${isDark ? "from-black/50 to-transparent" : "from-black/30 to-transparent"}`}/>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col gap-4">
        <h3 className={`text-2xl font-semibold transition-colors duration-300
          ${isDark ? "text-[#F2E9E1] group-hover:text-[#C9A36B]" : "text-[#3B2F2F] group-hover:text-[#A78256]"}`}>
          {name}
        </h3>

        <p className={`text-sm ${isDark ? "text-[#F2E9E1]/70" : "text-[#5B4E43]/70"}`}>{location}</p>

        {/* Room Type */}
        {roomType && <p className={`text-sm font-medium ${isDark ? "text-[#F2E9E1]" : "text-[#3B2F2F]"}`}>Type: {roomType}</p>}

        {/* Features */}
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-1">
            <Icon icon="solar:bed-linear" className={`${isDark ? "text-[#C9A36B]" : "text-[#A78256]"}`} />
            <span className={`${isDark ? "text-[#F2E9E1]" : "text-[#3B2F2F]"}`}>{beds} Beds</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon icon="solar:bath-linear" className={`${isDark ? "text-[#C9A36B]" : "text-[#A78256]"}`} />
            <span className={`${isDark ? "text-[#F2E9E1]" : "text-[#3B2F2F]"}`}>{baths} Baths</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon icon="lineicons:arrow-all-direction" className={`${isDark ? "text-[#C9A36B]" : "text-[#A78256]"}`} />
            <span className={`${isDark ? "text-[#F2E9E1]" : "text-[#3B2F2F]"}`}>{area} m²</span>
          </div>
        </div>

        {/* Price Badge */}
        <div className="mt-4">
          <span className={`px-4 py-2 rounded-full font-medium text-sm
            ${isDark ? "bg-[#C9A36B] text-black" : "bg-[#A78256] text-black"}`}>
            {systemSettings && roomType
              ? formatCurrency(getCurrentRoomRate(roomType, systemSettings), systemSettings)
              : `$${rate}`}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-4">
          {/* <Link href={`/properties/book/${slug}`}>
            <button className="py-2 px-4 bg-[#A78256] text-[#FFF5E1] rounded-xl hover:bg-[#8B6A47] transition font-semibold">
              Book Now
            </button>
          </Link> */}
          <Link href={`/properties/${slug}`}>
            <button className="py-2 px-4 border border-[#A78256] text-[#A78256] rounded-xl hover:bg-[#DCCAB0] transition font-semibold
              dark:border-[#DCCAB0] dark:text-[#DCCAB0] dark:hover:bg-[#8B6A47]">
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
