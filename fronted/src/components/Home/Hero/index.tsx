// import Image from 'next/image'
// import Link from 'next/link'

// const Hero: React.FC = () => {
//   return (
//     <section className='!py-0'>
//       <div className='bg-gradient-to-b from-skyblue via-lightskyblue dark:via-[#4298b0] to-white/10 dark:to-black/10 overflow-hidden relative'>
//         <div className='container max-w-8xl mx-auto px-5 2xl:px-0 pt-32 md:pt-60 md:pb-68'>
//           <div className='relative text-white dark:text-dark text-center md:text-start z-10'>
//             <p className='text-inherit text-xm font-medium'>Downtown Miami, FL</p>
//             <h1 className='text-inherit text-6xl sm:text-9xl font-semibold -tracking-wider md:max-w-45p mt-4 mb-6'>
//               Luxury Hotel Haven
//             </h1>
//             <div className='flex flex-col xs:flex-row justify-center md:justify-start gap-4'>
//               <Link href="/properties/book" className='px-8 py-4 border border-white dark:border-dark bg-white dark:bg-dark text-dark dark:text-white duration-300 dark:hover:text-dark hover:bg-transparent hover:text-white text-base font-semibold rounded-full hover:cursor-pointer'>
//                 Book Online
//               </Link>
//               <Link href="/contactus" className='px-8 py-4 border border-white dark:border-dark bg-transparent text-white dark:text-dark hover:bg-white dark:hover:bg-dark dark:hover:text-white hover:text-dark duration-300 text-base font-semibold rounded-full hover:cursor-pointer'>
//                 Contact Us
//               </Link>
//             </div>
//           </div>
//           <div className='hidden md:block absolute -top-2 -right-68'>
//             <Image
//               src={'/images/hero/heroBanner.png'}
//               alt='heroImg'
//               width={1082}
//               height={1016}
//               priority={false}
//               unoptimized={true}
//             />
//           </div>
//         </div>
//         <div className='md:absolute bottom-0 md:-right-68 xl:right-0 bg-white dark:bg-black py-12 px-8 mobile:px-16 md:pl-16 md:pr-[295px] rounded-2xl md:rounded-none md:rounded-tl-2xl mt-24'>
//           <div className='grid grid-cols-2 sm:grid-cols-4 md:flex gap-16 md:gap-24 sm:text-center dark:text-white text-black'>
//             <div className='flex flex-col sm:items-center gap-3'>
//               <Image
//                 src={'/images/hero/sofa.svg'}
//                 alt='sofa'
//                 width={32}
//                 height={32}
//                 className='block dark:hidden'
//                 unoptimized={true}
//               />
//               <Image
//                 src={'/images/hero/dark-sofa.svg'}
//                 alt='sofa'
//                 width={32}
//                 height={32}
//                 className='hidden dark:block'
//                 unoptimized={true}
//               />
//               <p className='text-sm sm:text-base font-normal text-inherit'>
//                 150 Rooms
//               </p>
//             </div>
//             <div className='flex flex-col sm:items-center gap-3'>
//               <Image
//                 src={'/images/hero/tube.svg'}
//                 alt='sofa'
//                 width={32}
//                 height={32}
//                 className='block dark:hidden'
//                 unoptimized={true}
//               />
//               <Image
//                 src={'/images/hero/dark-tube.svg'}
//                 alt='sofa'
//                 width={32}
//                 height={32}
//                 className='hidden dark:block'
//                 unoptimized={true}
//               />
//               <p className='text-sm sm:text-base font-normal text-inherit'>
//                 Spa & Pool
//               </p>
//             </div>
//             <div className='flex flex-col sm:items-center gap-3'>
//               <Image
//                 src={'/images/hero/parking.svg'}
//                 alt='sofa'
//                 width={32}
//                 height={32}
//                 className='block dark:hidden'
//                 unoptimized={true}
//               />
//               <Image
//                 src={'/images/hero/dark-parking.svg'}
//                 alt='sofa'
//                 width={32}
//                 height={32}
//                 className='hidden dark:block'
//                 unoptimized={true}
//               />
//               <p className='text-sm sm:text-base font-normal text-inherit'>
//                 Free Parking
//               </p>
//             </div>
//             <div className='flex flex-col sm:items-center gap-3'>
//               <p className='text-2xl sm:text-3xl font-medium text-inherit'>
//                 From $299
//               </p>
//               <p className='text-sm sm:text-base font-normal text-black/50 dark:text-white/50'>
//                 Per night
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default Hero






// import Image from 'next/image'
// import Link from 'next/link'

// const Hero: React.FC = () => {
//   return (
//     <section className='!py-0'>
//       <div className='bg-gradient-to-b from-skyblue via-lightskyblue dark:via-[#4298b0] to-white/10 dark:to-black/10 overflow-hidden relative'>

//         <div className='container max-w-8xl mx-auto px-5 2xl:px-0 pt-32 md:pt-60 md:pb-68'>

//           {/* TEXT SECTION */}
//           <div className='relative text-white dark:text-dark text-center md:text-start z-10 font-[Poppins]'>

//             <p className='text-inherit text-xm font-medium'>
//               Downtown Miami, FL
//             </p>

//             <h1 className='text-inherit text-6xl sm:text-9xl font-semibold -tracking-wider md:max-w-45p mt-4 mb-6 font-[Cinzel]'>
//               Luxury Hotel Haven
//             </h1>

//             {/* BUTTONS */}
//             <div className='flex flex-col xs:flex-row justify-center md:justify-start gap-4'>

//               <Link
//                 href="/properties/book"
//                 className='px-8 py-4 border border-[#D4AF37] bg-[#D4AF37] text-black 
//                 dark:bg-[#D4AF37] dark:text-black duration-300 
//                 hover:bg-transparent hover:text-[#D4AF37] 
//                 dark:hover:text-[#D4AF37] dark:hover:bg-transparent
//                 text-base font-semibold rounded-full shadow-md hover:shadow-lg'
//               >
//                 Book Online
//               </Link>

//               <Link
//                 href="/aboutus"
//                 className='px-8 py-4 border border-white dark:border-dark bg-transparent text-white 
//                 dark:text-dark hover:bg-white dark:hover:bg-dark 
//                 hover:text-dark dark:hover:text-white duration-300 
//                 text-base font-semibold rounded-full hover:cursor-pointer'
//               >
//                 About Us
//               </Link>

//               <Link
//                 href="/contactus"
//                 className='px-8 py-4 border border-white dark:border-dark bg-transparent text-white 
//                 dark:text-dark hover:bg-white dark:hover:bg-dark 
//                 hover:text-dark dark:hover:text-white duration-300 
//                 text-base font-semibold rounded-full hover:cursor-pointer'
//               >
//                 Contact Us
//               </Link>

//             </div>
//           </div>

//           {/* HERO IMAGE */}
//           <div className='hidden md:block absolute -top-2 -right-68'>
//             <Image
//               src={'/images/hero/heroBanner.png'}
//               alt='heroImg'
//               width={1082}
//               height={1016}
//               priority={false}
//               unoptimized={true}
//             />
//           </div>
//         </div>

//         {/* BOTTOM AMENITIES BAR */}
//         <div className='md:absolute bottom-0 md:-right-68 xl:right-0 
//         bg-white dark:bg-black py-12 px-8 mobile:px-16 md:pl-16 
//         md:pr-[295px] rounded-2xl md:rounded-none md:rounded-tl-2xl mt-24 
//         border-t border-[#D4AF3750]'>

//           <div className='grid grid-cols-2 sm:grid-cols-4 md:flex gap-16 md:gap-24 
//           sm:text-center dark:text-white text-black'>

//             <div className='flex flex-col sm:items-center gap-3'>
//               <Image src={'/images/hero/sofa.svg'} alt='sofa' width={32} height={32} className='block dark:hidden' unoptimized />
//               <Image src={'/images/hero/dark-sofa.svg'} alt='sofa' width={32} height={32} className='hidden dark:block' unoptimized />
//               <p className='text-sm sm:text-base font-normal text-inherit'>150 Rooms</p>
//             </div>

//             <div className='flex flex-col sm:items-center gap-3'>
//               <Image src={'/images/hero/tube.svg'} alt='sofa' width={32} height={32} className='block dark:hidden' unoptimized />
//               <Image src={'/images/hero/dark-tube.svg'} alt='sofa' width={32} height={32} className='hidden dark:block' unoptimized />
//               <p className='text-sm sm:text-base font-normal text-inherit'>Spa & Pool</p>
//             </div>

//             <div className='flex flex-col sm:items-center gap-3'>
//               <Image src={'/images/hero/parking.svg'} alt='sofa' width={32} height={32} className='block dark:hidden' unoptimized />
//               <Image src={'/images/hero/dark-parking.svg'} alt='sofa' width={32} height={32} className='hidden dark:block' unoptimized />
//               <p className='text-sm sm:text-base font-normal text-inherit'>Free Parking</p>
//             </div>

//             <div className='flex flex-col sm:items-center gap-3'>
//               <p className='text-2xl sm:text-3xl font-medium text-[#D4AF37]'>From $299</p>
//               <p className='text-sm sm:text-base font-normal text-black/50 dark:text-white/50'>
//                 Per night
//               </p>
//             </div>

//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default Hero









// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useTheme } from "next-themes";

// const Hero: React.FC = () => {
//   const { theme } = useTheme();
//   const isDark = theme === "dark";

//   return (
//     <section className="!py-0">
//       <div
//         className={`bg-gradient-to-b ${
//           isDark
//             ? "from-[#2C2B28] via-[#1E1B18] to-black/10"
//             : "from-[#F5F0E1] via-[#EDE3D1] to-white/10"
//         } overflow-hidden relative`}
//       >
//         <div className="container max-w-8xl mx-auto px-5 2xl:px-0 pt-32 md:pt-60 md:pb-68">
//           {/* TEXT SECTION */}
//           <div
//             className={`relative text-center md:text-start z-10 font-[Poppins] ${
//               isDark ? "text-[#F2E9E1]" : "text-[#3B2F2F]"
//             }`}
//           >
//             <p className="text-xm font-medium">Downtown Miami, FL</p>

//             <h1 className="text-6xl sm:text-9xl font-semibold -tracking-wider md:max-w-45p mt-4 mb-6 font-[Cinzel]">
//               Luxury Hotel Haven
//             </h1>

//             {/* BUTTONS */}
//             <div className="flex flex-col xs:flex-row justify-center md:justify-start gap-4">
//               <Link
//                 href="/properties/book"
//                 className={`px-8 py-4 text-base font-semibold rounded-full shadow-md duration-300 hover:shadow-lg ${
//                   isDark
//                     ? "bg-[#C9A36B] text-black hover:bg-transparent hover:text-[#FFD700]"
//                     : "bg-[#A78256] text-black hover:bg-transparent hover:text-[#6A4E23]"
//                 }`}
//               >
//                 Book Online
//               </Link>

//               <Link
//                 href="/aboutus"
//                 className={`px-8 py-4 text-base font-semibold rounded-full duration-300 hover:cursor-pointer ${
//                   isDark
//                     ? "border border-[#F2E9E1] bg-transparent text-[#F2E9E1] hover:bg-[#C9A36B] hover:text-black"
//                     : "border border-black bg-transparent text-black hover:bg-[#A78256] hover:text-white"
//                 }`}
//               >
//                 About Us
//               </Link>

//               <Link
//                 href="/contactus"
//                 className={`px-8 py-4 text-base font-semibold rounded-full duration-300 hover:cursor-pointer ${
//                   isDark
//                     ? "border border-[#F2E9E1] bg-transparent text-[#F2E9E1] hover:bg-[#C9A36B] hover:text-black"
//                     : "border border-black bg-transparent text-black hover:bg-[#A78256] hover:text-white"
//                 }`}
//               >
//                 Contact Us
//               </Link>
//             </div>
//           </div>

//           {/* HERO IMAGE */}
//           <div className="hidden md:block absolute -top-2 -right-68">
//             <Image
//               src={"/images/hero/heroBanner.png"}
//               alt="heroImg"
//               width={1082}
//               height={1016}
//               priority={false}
//               unoptimized={true}
//             />
//           </div>
//         </div>

//         {/* BOTTOM AMENITIES BAR */}
//         <div
//           className={`md:absolute bottom-0 md:-right-68 xl:right-0 py-12 px-8 mobile:px-16 md:pl-16 md:pr-[295px] rounded-2xl md:rounded-none md:rounded-tl-2xl mt-24 border-t ${
//             isDark
//               ? "bg-[#2C2B28] border-[#C9A36B50]"
//               : "bg-[#F5F0E1] border-[#A7825650]"
//           }`}
//         >
//           <div className="grid grid-cols-2 sm:grid-cols-4 md:flex gap-16 md:gap-24 sm:text-center">
//             <div className="flex flex-col sm:items-center gap-3">
//               <Image
//                 src={isDark ? "/images/hero/dark-sofa.svg" : "/images/hero/sofa.svg"}
//                 alt="sofa"
//                 width={32}
//                 height={32}
//                 unoptimized
//               />
//               <p className={`text-sm sm:text-base font-normal ${isDark ? "text-[#F2E9E1]" : "text-[#3B2F2F]"}`}>
//                 150 Rooms
//               </p>
//             </div>

//             <div className="flex flex-col sm:items-center gap-3">
//               <Image
//                 src={isDark ? "/images/hero/dark-tube.svg" : "/images/hero/tube.svg"}
//                 alt="spa"
//                 width={32}
//                 height={32}
//                 unoptimized
//               />
//               <p className={`text-sm sm:text-base font-normal ${isDark ? "text-[#F2E9E1]" : "text-[#3B2F2F]"}`}>
//                 Spa & Pool
//               </p>
//             </div>

//             <div className="flex flex-col sm:items-center gap-3">
//               <Image
//                 src={isDark ? "/images/hero/dark-parking.svg" : "/images/hero/parking.svg"}
//                 alt="parking"
//                 width={32}
//                 height={32}
//                 unoptimized
//               />
//               <p className={`text-sm sm:text-base font-normal ${isDark ? "text-[#F2E9E1]" : "text-[#3B2F2F]"}`}>
//                 Free Parking
//               </p>
//             </div>

//             <div className="flex flex-col sm:items-center gap-3">
//               <p className={`text-2xl sm:text-3xl font-medium ${isDark ? "text-[#C9A36B]" : "text-[#A78256]"}`}>
//                 From $299
//               </p>
//               <p className={`text-sm sm:text-base font-normal ${isDark ? "text-[#F2E9E1]/50" : "text-[#3B2F2F]/50"}`}>
//                 Per night
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;









// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useTheme } from "next-themes";

// const Hero: React.FC = () => {
//   const { theme } = useTheme();
//   const isDark = theme === "dark";

//   // Colors matching FAQ/Testimonial UI
//   const colors = {
//     bg: isDark ? "#1E1B18" : "#F5F0E1",
//     text: isDark ? "#F2E9E1" : "#3B2F2F",
//     cardBg: isDark ? "#3A352F" : "#F0E8E0",
//     accent: isDark ? "#FFD700" : "#A78256",
//     accentText: isDark ? "#1E1B18" : "#FFF",
//     accentHover: isDark ? "#FFD700" : "#A78256",
//     border: isDark ? "rgba(242,233,225,0.2)" : "rgba(59,47,47,0.1)",
//   };

//   return (
//     <section className="!py-0 transition-colors duration-500" style={{ background: colors.bg }}>
//       <div className="overflow-hidden relative">
//         <div className="container max-w-8xl mx-auto px-5 2xl:px-0 pt-32 md:pt-60 md:pb-68">
//           {/* TEXT SECTION */}
//           <div className="relative text-center md:text-start z-10 font-[Poppins]" style={{ color: colors.text }}>
//             <p className="text-xm font-medium">{`Downtown Miami, FL`}</p>

//             <h1
//               className="text-6xl sm:text-9xl font-semibold -tracking-wider md:max-w-45p mt-4 mb-6 font-[Cinzel]"
//               style={{ color: colors.text }}
//             >
//               Luxury Hotel Haven
//             </h1>

//             {/* BUTTONS */}
//             <div className="flex flex-col xs:flex-row justify-center md:justify-start gap-4">
//               <Link
//                 href="/properties/book"
//                 className="px-8 py-4 text-base font-semibold rounded-full shadow-lg transition-all duration-300"
//                 style={{ backgroundColor: colors.accent, color: colors.accentText }}
//                 onMouseOver={(e) => {
//                   (e.currentTarget as HTMLAnchorElement).style.backgroundColor = colors.accentHover;
//                 }}
//                 onMouseOut={(e) => {
//                   (e.currentTarget as HTMLAnchorElement).style.backgroundColor = colors.accent;
//                 }}
//               >
//                 Book Now
//               </Link>
//             </div>
//           </div>

//           {/* HERO IMAGE */}
//           <div className="hidden md:block absolute -top-2 -right-68">
//             <Image
//               src={"/images/hero/heroBanner.png"}
//               alt="heroImg"
//               width={1082}
//               height={1016}
//               priority={false}
//               unoptimized={true}
//             />
//           </div>
//         </div>

//         {/* BOTTOM AMENITIES BAR */}
//         <div
//           className="md:absolute bottom-0 md:-right-68 xl:right-0 py-12 px-8 mobile:px-16 md:pl-16 md:pr-[295px] rounded-2xl md:rounded-none md:rounded-tl-2xl mt-24 border-t transition-colors duration-500"
//           style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}
//         >
//           <div className="grid grid-cols-2 sm:grid-cols-4 md:flex gap-16 md:gap-24 sm:text-center">
//             {[
//               { icon: "/images/hero/sofa.svg", label: "150 Rooms" },
//               { icon: "/images/hero/tube.svg", label: "Spa & Pool" },
//               { icon: "/images/hero/parking.svg", label: "Free Parking" },
//             ].map((item, idx) => (
//               <div key={idx} className="flex flex-col sm:items-center gap-3">
//                 <Image src={item.icon} alt={item.label} width={32} height={32} unoptimized />
//                 <p className="text-sm sm:text-base font-normal" style={{ color: colors.text }}>
//                   {item.label}
//                 </p>
//               </div>
//             ))}

//             <div className="flex flex-col sm:items-center gap-3">
//               <p className="text-2xl sm:text-3xl font-medium" style={{ color: colors.accent }}>
//                 From $299
//               </p>
//               <p className="text-sm sm:text-base font-normal" style={{ color: colors.text + "80" }}>
//                 Per night
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;








"use client";

import Link from "next/link";
import { useTheme } from "next-themes";

const Hero: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Colors for text and button
  const colors = {
    text: "#F2E9E1", // light text for readability
    accent: "#FFD700",
    accentText: "#1E1B18",
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/vedios/hotel-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay for text readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 container max-w-7xl mx-auto px-5 h-full flex flex-col justify-center">
        <div className="text-left md:text-left text-center md:max-w-lg">
          <p className="text-base md:text-lg font-medium text-white/90">
            Downtown Miami, FL
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mt-4 mb-6 text-white leading-tight">
            Luxury Hotel Haven
          </h1>

          <p className="text-sm md:text-base text-white/80 mb-8">
            Discover our premium rooms, spa, pool, and parking facilities for the ultimate comfort.
          </p>

          <Link
            href="/properties/book"
            className="px-8 py-4 text-base font-semibold rounded-full shadow-lg inline-block transition-all duration-300"
            style={{ backgroundColor: colors.accent, color: colors.accentText }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#E6C200";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = colors.accent;
            }}
          >
            Book Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
