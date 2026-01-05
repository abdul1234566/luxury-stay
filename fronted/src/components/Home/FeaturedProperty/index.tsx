// "use client";
// import * as React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { useFeaturedRoom } from "@/hooks/useFeaturedRoom";
// import { Icon } from "@iconify/react";
// import { useSystemSettings } from "@/hooks/useSystemSettings";
// import { getCurrentRoomRate, formatCurrency } from "@/lib/roomPricing";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   type CarouselApi,
// } from "@/components/ui/carousel";

// const FeaturedProperty: React.FC = () => {
//   const { featuredRoom, loading, error } = useFeaturedRoom();
//   const { settings: systemSettings } = useSystemSettings();
//   const [api, setApi] = React.useState<CarouselApi | undefined>(undefined);
//   const [current, setCurrent] = React.useState(0);
//   const [count, setCount] = React.useState(0);
  
//   React.useEffect(() => {
//     if (!api) {
//       return;
//     }
//     setCount(api.scrollSnapList().length);
//     setCurrent(api.selectedScrollSnap() + 1);

//     api.on("select", () => {
//       setCurrent(api.selectedScrollSnap() + 1);
//     });
//   }, [api]);

//   const handleDotClick = (index: number) => {
//     if (api) {
//       api.scrollTo(index);
//     }
//   };

//   if (loading) {
//     return (
//       <section>
//         <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
//           <div className="text-center py-20">
//             <p className="text-lg">Loading featured room...</p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (error || !featuredRoom) {
//     return (
//       <section>
//         <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
//           <div className="text-center py-20">
//             <p className="text-lg text-red-500">Error: {error || 'No featured room found'}</p>
//           </div>
//         </div>
//       </section>
//     );
//   }


//   return (
//     <section>
//       <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
//         <div className="grid lg:grid-cols-2 gap-10">
//           <div className="relative">
//             <Carousel
//               setApi={setApi}
//               opts={{
//                 loop: true,
//               }}
//             >
//               <CarouselContent>
//                 {featuredRoom.images.map((image, index) => (
//                   <CarouselItem key={index}>
//                     <Image
//                       src={image}
//                       alt={`${featuredRoom.name} - Image ${index + 1}`}
//                       width={680}
//                       height={530}
//                       className="rounded-2xl w-full h-540"
//                       unoptimized={true}
//                     />
//                   </CarouselItem>
//                 ))}
//               </CarouselContent>
//             </Carousel>
//             <div className="absolute left-2/5 bg-dark/50 rounded-full py-2.5 bottom-10 flex justify-center mt-4 gap-2.5 px-2.5">
//               {Array.from({ length: count }).map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleDotClick(index)}
//                   className={`w-2.5 h-2.5 rounded-full ${current === index + 1 ? "bg-white" : "bg-white/50"}`}
//                 />
//               ))}
//             </div>
//           </div>
//           <div className="flex flex-col gap-10">
//             <div>
//               <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2">
//                 <Icon icon="ph:house-simple-fill" className="text-2xl text-primary " />
//                 Featured {featuredRoom.roomType}
//               </p>
//               <h2 className="lg:text-52 text-40 font-medium text-dark dark:text-white">
//                 {featuredRoom.name}
//               </h2>
//               <div className="flex items-center gap-2.5">
//                 <Icon icon="ph:map-pin" width={28} height={26} className="text-dark/50 dark:text-white/50" />
//                 <p className="text-dark/50 dark:text-white/50 text-base">
//                   Floor 25, Ocean View
//                 </p>
//               </div>
//             </div>
//             <p className="text-base text-dark/50 dark:text-white/50">
//               Experience unparalleled luxury in our Presidential Suite, located on the 25th floor with breathtaking ocean views. Priced at $1,200 per night, this 2,500 ft² suite offers 2 master bedrooms,
//               3 bathrooms, a private terrace, butler service, and exclusive access to our VIP amenities. Perfect for discerning travelers seeking the ultimate hotel experience.
//             </p>
//             <div className="grid grid-cols-2 gap-10">
//               <div className="flex items-center gap-4">
//                 <div className="bg-dark/5 dark:bg-white/5 p-2.5 rounded-[6px]">
//                   <Image
//                     src={'/images/hero/sofa.svg'}
//                     alt='sofa'
//                     width={24}
//                     height={24}
//                     className='block dark:hidden'
//                     unoptimized={true}
//                   />
//                   <Image
//                     src={'/images/hero/dark-sofa.svg'}
//                     alt='sofa'
//                     width={24}
//                     height={24}
//                     className='hidden dark:block'
//                     unoptimized={true}
//                   />
//                 </div>
//                 <h6 className="">{featuredRoom.beds} Bedrooms</h6>
//               </div>
//               <div className="flex items-center gap-4">
//                 <div className="bg-dark/5 dark:bg-white/5 p-2.5 rounded-[6px]">
//                   <Image
//                     src={'/images/hero/tube.svg'}
//                     alt='tube'
//                     width={24}
//                     height={24}
//                     className='block dark:hidden'
//                     unoptimized={true}
//                   />
//                   <Image
//                     src={'/images/hero/dark-tube.svg'}
//                     alt='tube'
//                     width={24}
//                     height={24}
//                     className='hidden dark:block'
//                     unoptimized={true}
//                   />
//                 </div>
//                 <h6 className="">{featuredRoom.baths} Bathrooms</h6>
//               </div>
//               <div className="flex items-center gap-4">
//                 <div className="bg-dark/5 dark:bg-white/5 p-2.5 rounded-[6px]">
//                   <Image
//                     src={'/images/hero/parking.svg'}
//                     alt='parking'
//                     width={24}
//                     height={24}
//                     className='block dark:hidden'
//                     unoptimized={true}
//                   />
//                   <Image
//                     src={'/images/hero/dark-parking.svg'}
//                     alt='parking'
//                     width={24}
//                     height={24}
//                     className='hidden dark:block'
//                     unoptimized={true}
//                   />
//                 </div>
//                 <h6 className="">Butler Service</h6>
//               </div>
//               <div className="flex items-center gap-4">
//                 <div className="bg-dark/5 dark:bg-white/5 p-2.5 rounded-[6px]">
//                   <Image
//                     src={'/images/hero/bar.svg'}
//                     alt='bar'
//                     width={24}
//                     height={24}
//                     className='block dark:hidden'
//                     unoptimized={true}
//                   />
//                   <Image
//                     src={'/images/hero/dark-bar.svg'}
//                     alt='bar'
//                     width={24}
//                     height={24}
//                     className='hidden dark:block'
//                     unoptimized={true}
//                   />
//                 </div>
//                 <h6 className="">Private Terrace</h6>
//               </div>
//             </div>
//             <div className="flex gap-10">
//               <Link href={`/properties/book?room=${featuredRoom.id}`} className="py-4 px-8 bg-primary hover:bg-dark duration-300 rounded-full text-white">
//                 Book Now
//               </Link>
//               <div>
//                 <h4 className="text-3xl text-dark dark:text-white font-medium">
//                   {systemSettings && featuredRoom.roomType 
//                     ? formatCurrency(getCurrentRoomRate(featuredRoom.roomType, systemSettings), systemSettings)
//                     : `$${featuredRoom.rate}`
//                   }
//                 </h4>
//                 <p className="text-base text-dark/50">
//                   Per night
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturedProperty;




"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useFeaturedRoom } from "@/hooks/useFeaturedRoom";
import { Icon } from "@iconify/react";
import { useSystemSettings } from "@/hooks/useSystemSettings";
import { useTheme } from "next-themes";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { getCurrentRoomRate, formatCurrency } from "@/lib/roomPricing";

const FeaturedProperty: React.FC = () => {
  const { featuredRoom, loading, error } = useFeaturedRoom();
  const { settings: systemSettings } = useSystemSettings();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // DIRECT THEME (NO THEME FILE)
  const colors = {
    bg: isDark ? "#2C2420" : "#F5F0E1",
    heading: isDark ? "#F5F0E1" : "#3B2F2F",
    label: isDark ? "#D6C6B5" : "#A78256",
    text: isDark ? "#E8DCCB" : "#5B4E43",
    textMuted: isDark ? "#C7B8A6" : "#7A6C5F",
    icon: isDark ? "#E4C89C" : "#A78256",
    iconBg: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
    cardBg: isDark ? "#3A302A" : "#FDFBF6",
    buttonBg: isDark ? "#C9A36B" : "#A78256",
    buttonHover: isDark ? "#E0BC7D" : "#C9A36B",
  };

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => setCurrent(api.selectedScrollSnap() + 1));
  }, [api]);

  const handleDotClick = (index: number) => api?.scrollTo(index);

  if (loading) {
    return (
      <section className="py-20 text-center">
        <p className="text-lg">Loading featured room...</p>
      </section>
    );
  }

  if (error || !featuredRoom) {
    return (
      <section className="py-20 text-center">
        <p className="text-lg text-red-500">
          Error: {error || "No featured room found"}
        </p>
      </section>
    );
  }

  return (
    <section
      className="py-32"
      style={{ background: colors.bg }}
    >
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* IMAGE SECTION */}
          <div className="relative group">
            <Carousel setApi={setApi} opts={{ loop: true }}>
              <CarouselContent>
                {featuredRoom.images.map((image, i) => (
                  <CarouselItem key={i}>
                    <div
                      className="rounded-3xl overflow-hidden shadow-2xl duration-500"
                      style={{ background: colors.cardBg }}
                    >
                      <Image
                        src={image}
                        alt="Featured Room"
                        width={680}
                        height={530}
                        unoptimized
                        className="rounded-3xl w-full h-540 object-cover group-hover:scale-105 duration-500"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* DOTS */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-6 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full flex gap-2">
              {Array.from({ length: count }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleDotClick(i)}
                  className={`w-3 h-3 rounded-full duration-300 ${
                    current === i + 1 ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* TEXT SECTION */}
          <div className="flex flex-col gap-8">

            {/* LABEL */}
            <p
              className="flex items-center gap-2 text-lg font-medium"
              style={{ color: colors.label }}
            >
              <Icon icon="ph:house-simple-fill" className="text-2xl" />
              Featured {featuredRoom.roomType}
            </p>

            {/* TITLE */}
            <h2
              className="text-5xl lg:text-6xl font-semibold leading-snug"
              style={{ color: colors.heading }}
            >
              {featuredRoom.name}
            </h2>

            {/* LOCATION */}
            <div className="flex items-center gap-3">
              <Icon
                icon="ph:map-pin"
                width={26}
                height={26}
                style={{ color: colors.icon }}
              />
              <p className="text-lg" style={{ color: colors.textMuted }}>
                Floor 25 · Ocean View
              </p>
            </div>

            {/* DESCRIPTION */}
            <p
              className="text-lg leading-8"
              style={{ color: colors.text }}
            >
              Experience world-class luxury in our Presidential Suite with
              breathtaking ocean views, a private terrace, exclusive VIP
              lounge access, and premium butler service.
            </p>

            {/* FEATURES */}
            <div className="grid grid-cols-2 gap-8">
              {[
                { icon: "sofa", label: `${featuredRoom.beds} Bedrooms` },
                { icon: "tube", label: `${featuredRoom.baths} Bathrooms` },
                { icon: "parking", label: "Butler Service" },
                { icon: "bar", label: "Private Terrace" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{ background: colors.iconBg }}
                  >
                    <Image
                      src={`/images/hero/${item.icon}.svg`}
                      width={26}
                      height={26}
                      alt="icon"
                      className="block dark:hidden"
                    />
                    <Image
                      src={`/images/hero/dark-${item.icon}.svg`}
                      width={26}
                      height={26}
                      alt="icon"
                      className="hidden dark:block"
                    />
                  </div>
                  <h6
                    className="text-lg font-semibold"
                    style={{ color: colors.text }}
                  >
                    {item.label}
                  </h6>
                </div>
              ))}
            </div>

            {/* PRICE + BOOK BUTTON */}
            <div className="flex items-center gap-10 mt-6">
              <Link
                href={`/properties/book?room=${featuredRoom.id}`}
                className="py-4 px-10 rounded-full text-white text-lg font-semibold duration-300"
                style={{
                  background: colors.buttonBg,
                }}
              >
                Book Now
              </Link>

              <div>
                <h4
                  className="text-4xl font-semibold"
                  style={{ color: colors.heading }}
                >
                  {systemSettings && featuredRoom.roomType
                    ? formatCurrency(
                        getCurrentRoomRate(
                          featuredRoom.roomType,
                          systemSettings
                        ),
                        systemSettings
                      )
                    : `$${featuredRoom.rate}`}
                </h4>
                <p style={{ color: colors.textMuted }}>Per night</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperty;
