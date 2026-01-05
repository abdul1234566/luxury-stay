// "use client";
// import * as React from "react";
// import Image from "next/image";
// import { Icon } from "@iconify/react";
// import {
//     Carousel,
//     CarouselContent,
//     CarouselItem,
//     type CarouselApi,
// } from "@/components/ui/carousel";
// import { testimonials } from "@/app/api/testimonial";

// // Define the review type
// interface Review {
//     _id: string;
//     guestName: string;
//     guestImage: string | null;
//     rating: number;
//     comment: string;
//     cleanliness: number;
//     comfort: number;
//     service: number;
//     value: number;
//     createdAt: string;
// }

// const Testimonial = () => {
//     const [api, setApi] = React.useState<CarouselApi | undefined>(undefined);
//     const [current, setCurrent] = React.useState(0);
//     const [count, setCount] = React.useState(0);
//     const [reviews, setReviews] = React.useState<Review[]>([]);
//     const [loading, setLoading] = React.useState(true);

//     // Fetch all reviews for testimonials
//     React.useEffect(() => {
//         fetch('http://localhost:3001/feedback/all')
//             .then(res => res.json())
//             .then(data => {
//                 console.log('Fetched reviews:', data.feedback?.length || 0, 'reviews');
//                 console.log('Reviews data:', data.feedback);
//                 setReviews(data.feedback || []);
//                 setLoading(false);
//             })
//             .catch(err => {
//                 console.error('Error fetching reviews:', err);
//                 setLoading(false);
//             });
//     }, []);

//     React.useEffect(() => {
//         if (!api) return;

//         setCount(api.scrollSnapList().length);
//         setCurrent(api.selectedScrollSnap() + 1);

//         api.on("select", () => {
//             setCurrent(api.selectedScrollSnap() + 1);
//         });
//     }, [api]);

//     // Force carousel to update when reviews change
//     React.useEffect(() => {
//         if (api && reviews.length > 0) {
//             console.log('Carousel API available, reviews length:', reviews.length);
//             console.log('Carousel scroll snap list length:', api.scrollSnapList().length);
//             // Small delay to ensure carousel updates
//             setTimeout(() => {
//                 const snapListLength = api.scrollSnapList().length;
//                 console.log('Updated carousel count to:', snapListLength);
//                 setCount(snapListLength);
//             }, 100);
//         }
//     }, [reviews.length, api]);

//     const handleDotClick = (index: number) => {
//         if (api) {
//             api.scrollTo(index);
//         }
//     };

//     return (
//         <section className="bg-dark relative overflow-hidden" id="testimonial">
//             <div className="absolute right-0">
//                 <Image
//                     src="/images/testimonial/Vector.png"
//                     alt="victor"
//                     width={700}
//                     height={1039}
//                     unoptimized={true}
//                 />
//             </div>
//             <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
//                 <div>
//                     <p className="text-white text-base font-semibold flex gap-2">
//                         <Icon icon="ph:house-simple-fill" className="text-2xl text-primary" />
//                         Guest Reviews
//                     </p>
//                     <h2 className="lg:text-52 text-40 font-medium text-white">
//                         What our guests say
//                     </h2>
//                     {!loading && reviews.length > 0 && (
//                         <p className="text-white/60 text-sm mt-2">
//                             Showing {reviews.length} guest reviews
//                         </p>
//                     )}
//                 </div>
//                 <Carousel
//                     key={`carousel-${reviews.length}`}
//                     setApi={setApi}
//                     opts={{
//                         loop: true,
//                     }}
//                 >
//                     <CarouselContent>
//                         {loading ? (
//                             <CarouselItem className="mt-9">
//                                 <div className="lg:flex items-center gap-11">
//                                     <div className="flex items-start gap-11 lg:pr-20">
//                                         <div>
//                                             <Icon icon="ph:house-simple" width={32} height={32} className="text-primary" />
//                                         </div>
//                                         <div>
//                                             <h4 className="text-white lg:text-3xl text-2xl">Loading reviews...</h4>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </CarouselItem>
//                         ) : reviews.length > 0 ? (
//                             reviews.map((review, index) => (
//                                 <CarouselItem key={`review-${review._id}-${index}`} className="mt-9">
//                                     <div className="lg:flex items-center gap-11">
//                                         <div className="flex items-start gap-11 lg:pr-20">
//                                             <div>
//                                                 <Icon icon="ph:house-simple" width={32} height={32} className="text-primary" />
//                                             </div>
//                                             <div>
//                                                 <h4 className="text-white lg:text-3xl text-2xl">"{review.comment}"</h4>
//                                                 <div className="flex items-center mt-8 gap-6">
//                                                     <Image
//                                                         src={testimonials[index % testimonials.length].image}
//                                                         alt={review.guestName}
//                                                         width={80}
//                                                         height={80}
//                                                         className="rounded-full lg:hidden block"
//                                                         unoptimized={true}
//                                                     />
//                                                     <div>
//                                                         <h6 className="text-white text-xm font-medium">{review.guestName}</h6>
//                                                         <p className="text-white/40">Guest</p>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="w-full h-full rounded-2xl overflow-hidden">
//                                             <Image
//                                                 src={testimonials[index % testimonials.length].image}
//                                                 alt={review.guestName}
//                                                 width={440}
//                                                 height={440}
//                                                 className="lg:block hidden"
//                                                 unoptimized={true}
//                                             />
//                                         </div>
//                                     </div>
//                                 </CarouselItem>
//                             ))
//                         ) : (
//                             testimonials.map((item, index) => (
//                                 <CarouselItem key={index} className="mt-9">
//                                     <div className="lg:flex items-center gap-11">
//                                         <div className="flex items-start gap-11 lg:pr-20">
//                                             <div>
//                                                 <Icon icon="ph:house-simple" width={32} height={32} className="text-primary" />
//                                             </div>
//                                             <div>
//                                                 <h4 className="text-white lg:text-3xl text-2xl">{item.review}</h4>
//                                                 <div className="flex items-center mt-8 gap-6">
//                                                     <Image
//                                                         src={item.image}
//                                                         alt={item.name}
//                                                         width={80}
//                                                         height={80}
//                                                         className="rounded-full lg:hidden block"
//                                                         unoptimized={true}
//                                                     />
//                                                     <div>
//                                                         <h6 className="text-white text-xm font-medium">{item.name}</h6>
//                                                         <p className="text-white/40">{item.position}</p>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="w-full h-full rounded-2xl overflow-hidden">
//                                             <Image
//                                                 src={item.image}
//                                                 alt={item.name}
//                                                 width={440}
//                                                 height={440}
//                                                 className="lg:block hidden"
//                                                 unoptimized={true}
//                                             />
//                                         </div>
//                                     </div>
//                                 </CarouselItem>
//                             ))
//                         )}
//                     </CarouselContent>
//                 </Carousel>
//                 <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex gap-2.5 p-2.5 bg-white/20 rounded-full">
//                     {Array.from({ length: count }).map((_, index) => (
//                         <button
//                             key={index}
//                             onClick={() => handleDotClick(index)}
//                             className={`w-2.5 h-2.5 rounded-full ${current === index + 1 ? "bg-white" : "bg-white/50"
//                                 }`}
//                             aria-label={`Go to slide ${index + 1}`}
//                         />
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Testimonial;















// "use client";
// import * as React from "react";
// import Image from "next/image";
// import { Icon } from "@iconify/react";
// import {
//     Carousel,
//     CarouselContent,
//     CarouselItem,
//     type CarouselApi,
// } from "@/components/ui/carousel";
// import { testimonials } from "@/app/api/testimonial";

// interface Review {
//     _id: string;
//     guestName: string;
//     guestImage: string | null;
//     rating: number;
//     comment: string;
//     cleanliness: number;
//     comfort: number;
//     service: number;
//     value: number;
//     createdAt: string;
// }

// const Testimonial = () => {
//     const [api, setApi] = React.useState<CarouselApi | undefined>(undefined);
//     const [current, setCurrent] = React.useState(0);
//     const [count, setCount] = React.useState(0);
//     const [reviews, setReviews] = React.useState<Review[]>([]);
//     const [loading, setLoading] = React.useState(true);

//     React.useEffect(() => {
//         fetch("http://localhost:3001/feedback/all")
//             .then(res => res.json())
//             .then(data => {
//                 setReviews(data.feedback || []);
//                 setLoading(false);
//             })
//             .catch(() => setLoading(false));
//     }, []);

//     React.useEffect(() => {
//         if (!api) return;
//         setCount(api.scrollSnapList().length);
//         setCurrent(api.selectedScrollSnap() + 1);

//         api.on("select", () => setCurrent(api.selectedScrollSnap() + 1));
//     }, [api]);

//     return (
//         <section
//             className="relative overflow-hidden bg-[#0f0f0f] py-24"
//             id="testimonial"
//         >
//             {/* Elegant Gold Overlay */}
//             <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1a1a1a] to-black opacity-90 pointer-events-none"></div>

//             {/* Gold Glow Effect */}
//             <div className="absolute -right-32 top-0 w-[600px] h-[600px] bg-[#e4c59022] blur-[120px] rounded-full"></div>

//             <div className="container relative z-10 max-w-7xl mx-auto px-6">
//                 {/* Section Header */}
//                 <div className="text-center mb-12">
//                     <p className="text-[#e4c590] text-base font-semibold flex items-center justify-center gap-2">
//                         <Icon icon="ph:house-simple-fill" className="text-2xl text-[#e4c590]" />
//                         Guest Experiences
//                     </p>

//                     <h2 className="text-4xl lg:text-5xl font-semibold text-white mt-3 leading-tight">
//                         What Our Guests Say
//                     </h2>

//                     {!loading && (
//                         <p className="text-[#ffffff88] text-sm mt-2 tracking-wide">
//                             {reviews.length} Verified Testimonials
//                         </p>
//                     )}
//                 </div>

//                 {/* Carousel */}
//                 <Carousel setApi={setApi} opts={{ loop: true }}>
//                     <CarouselContent>
//                         {loading ? (
//                             <CarouselItem className="flex justify-center">
//                                 <p className="text-white text-xl">Loading...</p>
//                             </CarouselItem>
//                         ) : reviews.length > 0 ? (
//                             reviews.map((review, index) => (
//                                 <CarouselItem key={index} className="px-4">
//                                     <div className="lg:flex items-center gap-10 bg-[#1a1a1a] p-10 rounded-2xl shadow-xl border border-[#2b2b2b] hover:border-[#e4c590] transition-all duration-300">
                                        
//                                         {/* Icon & Review */}
//                                         <div className="flex-1">
//                                             <Icon
//                                                 icon="ph:quotes-fill"
//                                                 className="text-[#e4c590] text-4xl mb-4"
//                                             />
//                                             <p className="text-white text-xl lg:text-2xl leading-relaxed">
//                                                 "{review.comment}"
//                                             </p>

//                                             <div className="flex items-center gap-4 mt-8">
//                                                 <Image
//                                                     src={
//                                                         testimonials[index % testimonials.length].image
//                                                     }
//                                                     alt={review.guestName}
//                                                     width={70}
//                                                     height={70}
//                                                     className="rounded-full border-2 border-[#e4c590]"
//                                                     unoptimized
//                                                 />
//                                                 <div>
//                                                     <h6 className="text-white text-lg font-medium">
//                                                         {review.guestName}
//                                                     </h6>
//                                                     <p className="text-[#e4c590] text-sm">Guest</p>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         {/* Right Image */}
//                                         <div className="hidden lg:block w-[380px] h-[380px] rounded-2xl overflow-hidden shadow-lg">
//                                             <Image
//                                                 src={
//                                                     testimonials[index % testimonials.length].image
//                                                 }
//                                                 alt={review.guestName}
//                                                 width={380}
//                                                 height={380}
//                                                 className="object-cover"
//                                                 unoptimized
//                                             />
//                                         </div>
//                                     </div>
//                                 </CarouselItem>
//                             ))
//                         ) : (
//                             testimonials.map((item, index) => (
//                                 <CarouselItem key={index} className="px-4">
//                                     <div className="lg:flex items-center gap-10 bg-[#1a1a1a] p-10 rounded-2xl shadow-xl border border-[#2b2b2b]">
//                                         <div className="flex-1">
//                                             <Icon
//                                                 icon="ph:quotes-fill"
//                                                 className="text-[#e4c590] text-4xl mb-4"
//                                             />
//                                             <p className="text-white text-xl">{item.review}</p>

//                                             <div className="flex items-center gap-4 mt-8">
//                                                 <Image
//                                                     src={item.image}
//                                                     alt={item.name}
//                                                     width={70}
//                                                     height={70}
//                                                     className="rounded-full border-2 border-[#e4c590]"
//                                                     unoptimized
//                                                 />
//                                                 <div>
//                                                     <h6 className="text-white text-lg font-medium">
//                                                         {item.name}
//                                                     </h6>
//                                                     <p className="text-[#e4c590] text-sm">
//                                                         {item.position}
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="hidden lg:block w-[380px] h-[380px] rounded-2xl overflow-hidden shadow-lg">
//                                             <Image
//                                                 src={item.image}
//                                                 alt={item.name}
//                                                 width={380}
//                                                 height={380}
//                                                 className="object-cover"
//                                                 unoptimized
//                                             />
//                                         </div>
//                                     </div>
//                                 </CarouselItem>
//                             ))
//                         )}
//                     </CarouselContent>
//                 </Carousel>

//                 {/* Carousel Dots */}
//                 <div className="mt-10 flex justify-center gap-3">
//                     {Array.from({ length: count }).map((_, index) => (
//                         <button
//                             key={index}
//                             onClick={() => api?.scrollTo(index)}
//                             className={`w-3 h-3 rounded-full transition-all ${
//                                 current === index + 1
//                                     ? "bg-[#e4c590] scale-110"
//                                     : "bg-[#ffffff55]"
//                             }`}
//                         />
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Testimonial;









// "use client";
// import * as React from "react";
// import Image from "next/image";
// import { Icon } from "@iconify/react";
// import { useTheme } from "next-themes";

// import {
//     Carousel,
//     CarouselContent,
//     CarouselItem,
//     type CarouselApi,
// } from "@/components/ui/carousel";

// import { testimonials } from "@/app/api/testimonial";

// interface Review {
//     _id: string;
//     guestName: string;
//     guestImage: string | null;
//     rating: number;
//     comment: string;
//     cleanliness: number;
//     comfort: number;
//     service: number;
//     value: number;
//     createdAt: string;
// }

// const Testimonial = () => {

//     const { theme } = useTheme();
//     const isDark = theme === "dark";

//     const [api, setApi] = React.useState<CarouselApi | undefined>(undefined);
//     const [current, setCurrent] = React.useState(0);
//     const [count, setCount] = React.useState(0);

//     const [reviews, setReviews] = React.useState<Review[]>([]);
//     const [loading, setLoading] = React.useState(true);

//     React.useEffect(() => {
//         fetch("http://localhost:3001/feedback/all")
//             .then((res) => res.json())
//             .then((data) => {
//                 setReviews(data.feedback || []);
//                 setLoading(false);
//             })
//             .catch(() => setLoading(false));
//     }, []);

//     React.useEffect(() => {
//         if (!api) return;

//         setCount(api.scrollSnapList().length);
//         setCurrent(api.selectedScrollSnap() + 1);

//         api.on("select", () => {
//             setCurrent(api.selectedScrollSnap() + 1);
//         });
//     }, [api]);

//     const handleDotClick = (index: number) => {
//         api?.scrollTo(index);
//     };

//     return (
//         <section
//             id="testimonial"
//             className={`
//         relative overflow-hidden py-20 transition-all duration-500
//         ${isDark
//                 ? "bg-gradient-to-br from-black via-[#0e0e0e] to-[#1a1a1a]"
//                 : "bg-gradient-to-br from-[#f8f3ea] via-[#f7f2e9] to-[#f0e8d9]"
//             }
//         `}
//         >
//             {/* Glow */}
//             <div
//                 className={`absolute inset-0 pointer-events-none opacity-30 blur-3xl
//         ${isDark ? "bg-[#d4af37]" : "bg-[#c79b2b]"}
//         `}
//             ></div>

//             <div className="container max-w-7xl mx-auto px-6 relative z-10">
//                 {/* Heading */}
//                 <div className="mb-14">
//                     <p
//                         className={`text-base font-semibold flex items-center gap-2 
//             ${isDark ? "text-white/70" : "text-black/70"}
//           `}
//                     >
//                         <Icon
//                             icon="ph:house-simple-fill"
//                             className="text-2xl"
//                             style={{ color: isDark ? "#d4af37" : "#b48a1e" }}
//                         />
//                         Guest Reviews
//                     </p>

//                     <h2
//                         className={`lg:text-5xl text-4xl font-bold leading-tight
//             ${isDark ? "text-white" : "text-black"}
//           `}
//                     >
//                         What our guests say
//                     </h2>

//                     {!loading && reviews.length > 0 && (
//                         <p className={`${isDark ? "text-white/60" : "text-black/60"} mt-2`}>
//                             Showing {reviews.length} guest reviews
//                         </p>
//                     )}
//                 </div>

//                 {/* Carousel */}
//                 <Carousel key={`carousel-${reviews.length}`} setApi={setApi} opts={{ loop: true }}>
//                     <CarouselContent>
//                         {/* LOADING */}
//                         {loading ? (
//                             <CarouselItem className="mt-9">
//                                 <div className="flex items-center gap-6">
//                                     <Icon
//                                         icon="ph:spinner"
//                                         width={38}
//                                         height={38}
//                                         className={`${isDark ? "text-[#d4af37]" : "text-[#b48a1e]"} animate-spin`}
//                                     />
//                                     <h4
//                                         className={`lg:text-3xl text-2xl 
//                     ${isDark ? "text-white" : "text-black"}
//                   `}
//                                     >
//                                         Loading reviews…
//                                     </h4>
//                                 </div>
//                             </CarouselItem>
//                         ) : reviews.length > 0 ? (
//                             /* DATABASE REVIEWS */
//                             reviews.map((review, index) => (
//                                 <CarouselItem key={review._id} className="mt-9">
//                                     <div className="lg:flex items-center gap-11">
//                                         {/* TEXT CARD */}
//                                         <div
//                                             className={`
//                         flex items-start gap-11 lg:pr-20 rounded-2xl p-8 backdrop-blur-lg shadow-xl
//                         ${isDark ? "bg-white/5" : "bg-black/5"}
//                         transition-all duration-700
//                       `}
//                                         >
//                                             <Icon
//                                                 icon="ph:house-simple"
//                                                 width={34}
//                                                 height={34}
//                                                 style={{ color: isDark ? "#d4af37" : "#b48a1e" }}
//                                             />

//                                             <div>
//                                                 <h4
//                                                     className={`lg:text-3xl text-2xl font-semibold
//                           ${isDark ? "text-white" : "text-black"}
//                         `}
//                                                 >
//                                                     "{review.comment}"
//                                                 </h4>

//                                                 <div className="flex items-center mt-8 gap-6">
//                                                     <Image
//                                                         src={testimonials[index % testimonials.length].image}
//                                                         alt={review.guestName}
//                                                         width={80}
//                                                         height={80}
//                                                         className="rounded-full lg:hidden block"
//                                                         unoptimized
//                                                     />

//                                                     <div>
//                                                         <h6
//                                                             className={`text-lg font-medium
//                               ${isDark ? "text-white" : "text-black"}
//                             `}
//                                                         >
//                                                             {review.guestName}
//                                                         </h6>
//                                                         <p
//                                                             className={`${isDark ? "text-white/40" : "text-black/40"
//                                                                 }`}
//                                                         >
//                                                             Guest
//                                                         </p>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         {/* IMAGE */}
//                                         <div className="w-full h-full rounded-2xl overflow-hidden shadow-xl">
//                                             <Image
//                                                 src={testimonials[index % testimonials.length].image}
//                                                 alt={review.guestName}
//                                                 width={440}
//                                                 height={440}
//                                                 className="hidden lg:block object-cover"
//                                                 unoptimized
//                                             />
//                                         </div>
//                                     </div>
//                                 </CarouselItem>
//                             ))
//                         ) : (
//                             /* STATIC BACKUP REVIEWS */
//                             testimonials.map((item, index) => (
//                                 <CarouselItem key={index} className="mt-9">
//                                     <div className="lg:flex items-center gap-11">
//                                         <div
//                                             className={`
//                         flex items-start gap-11 lg:pr-20 rounded-2xl p-8 backdrop-blur-lg shadow-xl
//                         ${isDark ? "bg-white/5" : "bg-black/5"}
//                       `}
//                                         >
//                                             <Icon
//                                                 icon="ph:house-simple"
//                                                 width={34}
//                                                 height={34}
//                                                 style={{ color: isDark ? "#d4af37" : "#b48a1e" }}
//                                             />

//                                             <div>
//                                                 <h4
//                                                     className={`lg:text-3xl text-2xl font-semibold
//                           ${isDark ? "text-white" : "text-black"}
//                         `}
//                                                 >
//                                                     {item.review}
//                                                 </h4>

//                                                 <div className="flex items-center mt-8 gap-6">
//                                                     <Image
//                                                         src={item.image}
//                                                         alt={item.name}
//                                                         width={80}
//                                                         height={80}
//                                                         className="rounded-full lg:hidden block"
//                                                         unoptimized
//                                                     />
//                                                     <div>
//                                                         <h6
//                                                             className={`text-lg font-medium
//                               ${isDark ? "text-white" : "text-black"}
//                             `}
//                                                         >
//                                                             {item.name}
//                                                         </h6>
//                                                         <p
//                                                             className={`${isDark ? "text-white/40" : "text-black/40"
//                                                                 }`}
//                                                         >
//                                                             {item.position}
//                                                         </p>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <div className="w-full h-full rounded-2xl overflow-hidden shadow-xl">
//                                             <Image
//                                                 src={item.image}
//                                                 alt={item.name}
//                                                 width={440}
//                                                 height={440}
//                                                 className="hidden lg:block object-cover"
//                                                 unoptimized
//                                             />
//                                         </div>
//                                     </div>
//                                 </CarouselItem>
//                             ))
//                         )}
//                     </CarouselContent>
//                 </Carousel>

//                 {/* DOTS */}
//                 <div className="flex justify-center mt-10">
//                     <div
//                         className={`flex gap-2.5 p-2.5 rounded-full shadow-lg
//             ${isDark ? "bg-white/10" : "bg-black/10"}
//           `}
//                     >
//                         {Array.from({ length: count }).map((_, index) => (
//                             <button
//                                 key={index}
//                                 onClick={() => handleDotClick(index)}
//                                 className={`
//                   w-3 h-3 rounded-full transition-all 
//                   ${current === index + 1
//                                         ? isDark
//                                             ? "bg-[#d4af37]"
//                                             : "bg-[#b48a1e]"
//                                         : isDark
//                                             ? "bg-white/40"
//                                             : "bg-black/30"}
//                 `}
//                             />
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Testimonial;



// "use client";
// import * as React from "react";
// import Image from "next/image";
// import { Icon } from "@iconify/react";
// import { useTheme } from "next-themes";

// import {
//     Carousel,
//     CarouselContent,
//     CarouselItem,
//     type CarouselApi,
// } from "@/components/ui/carousel";

// import { testimonials } from "@/app/api/testimonial";

// interface Review {
//     _id: string;
//     guestName: string;
//     guestImage: string | null;
//     rating: number;
//     comment: string;
//     cleanliness: number;
//     comfort: number;
//     service: number;
//     value: number;
//     createdAt: string;
// }

// const Testimonial = () => {
//     const { theme } = useTheme();
//     const isDark = theme === "dark";

//     const [api, setApi] = React.useState<CarouselApi | undefined>(undefined);
//     const [current, setCurrent] = React.useState(0);
//     const [count, setCount] = React.useState(0);

//     const [reviews, setReviews] = React.useState<Review[]>([]);
//     const [loading, setLoading] = React.useState(true);

//     React.useEffect(() => {
//         fetch("http://localhost:3001/feedback/all")
//             .then((res) => res.json())
//             .then((data) => {
//                 setReviews(data.feedback || []);
//                 setLoading(false);
//             })
//             .catch(() => setLoading(false));
//     }, []);

//     React.useEffect(() => {
//         if (!api) return;
//         setCount(api.scrollSnapList().length);
//         setCurrent(api.selectedScrollSnap() + 1);
//         api.on("select", () => setCurrent(api.selectedScrollSnap() + 1));
//     }, [api]);

//     const handleDotClick = (index: number) => api?.scrollTo(index);

//     return (
//         <section
//             id="testimonial"
//             className={`relative overflow-hidden py-20 transition-all duration-500
//                 ${isDark ? "bg-[#1E1B18]" : "bg-[#F5F0E1]"}
//             `}
//         >
//             {/* Glow / Accent */}
//             <div
//                 className={`absolute inset-0 pointer-events-none opacity-30 blur-3xl
//                     ${isDark ? "bg-[#FFD700]" : "bg-[#A78256]"}
//                 `}
//             ></div>

//             <div className="container max-w-7xl mx-auto px-6 relative z-10">
//                 {/* Heading */}
//                 <div className="mb-14">
//                     <p
//                         className={`text-base font-semibold flex items-center gap-2 
//                             ${isDark ? "text-[#F2E9E1]/70" : "text-[#5B4E43]"}
//                         `}
//                     >
//                         <Icon
//                             icon="ph:house-simple-fill"
//                             className="text-2xl"
//                             style={{ color: isDark ? "#FFD700" : "#A78256" }}
//                         />
//                         Guest Reviews
//                     </p>

//                     <h2
//                         className={`lg:text-5xl text-4xl font-bold leading-tight
//                             ${isDark ? "text-[#F2E9E1]" : "text-[#3B2F2F]"}
//                         `}
//                     >
//                         What our guests say
//                     </h2>

//                     {!loading && reviews.length > 0 && (
//                         <p className={`${isDark ? "text-[#F2E9E1]/60" : "text-[#5B4E43]/60"} mt-2`}>
//                             Showing {reviews.length} guest reviews
//                         </p>
//                     )}
//                 </div>

//                 {/* Carousel */}
//                 <Carousel key={`carousel-${reviews.length}`} setApi={setApi} opts={{ loop: true }}>
//                     <CarouselContent>
//                         {loading ? (
//                             <CarouselItem className="mt-9">
//                                 <div className="flex items-center gap-6">
//                                     <Icon
//                                         icon="ph:spinner"
//                                         width={38}
//                                         height={38}
//                                         className={`${isDark ? "text-[#FFD700]" : "text-[#A78256]"} animate-spin`}
//                                     />
//                                     <h4 className={`lg:text-3xl text-2xl ${isDark ? "text-[#F2E9E1]" : "text-[#3B2F2F]"}`}>
//                                         Loading reviews…
//                                     </h4>
//                                 </div>
//                             </CarouselItem>
//                         ) : reviews.length > 0 ? (
//                             reviews.map((review, index) => (
//                                 <CarouselItem key={review._id} className="mt-9">
//                                     <div className="lg:flex items-center gap-11">
//                                         {/* TEXT CARD */}
//                                         <div
//                                             className={`flex items-start gap-11 lg:pr-20 rounded-2xl p-8 shadow-xl transition-all duration-700
//                                                 ${isDark ? "bg-[#2C2B28]" : "bg-[#E0E0E0]"}
//                                             `}
//                                         >
//                                             <Icon
//                                                 icon="ph:house-simple"
//                                                 width={34}
//                                                 height={34}
//                                                 style={{ color: isDark ? "#FFD700" : "#A78256" }}
//                                             />

//                                             <div>
//                                                 <h4
//                                                     className={`lg:text-3xl text-2xl font-semibold
//                                                         ${isDark ? "text-[#F2E9E1]" : "text-[#3B2F2F]"}
//                                                     `}
//                                                 >
//                                                     "{review.comment}"
//                                                 </h4>

//                                                 <div className="flex items-center mt-8 gap-6">
//                                                     <Image
//                                                         src={testimonials[index % testimonials.length].image}
//                                                         alt={review.guestName}
//                                                         width={80}
//                                                         height={80}
//                                                         className="rounded-full lg:hidden block"
//                                                         unoptimized
//                                                     />

//                                                     <div>
//                                                         <h6
//                                                             className={`text-lg font-medium
//                                                                 ${isDark ? "text-[#F2E9E1]" : "text-[#3B2F2F]"}
//                                                             `}
//                                                         >
//                                                             {review.guestName}
//                                                         </h6>
//                                                         <p className={`${isDark ? "text-[#FFD700]" : "text-[#5B4E43]"}`}>
//                                                             Guest
//                                                         </p>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         {/* IMAGE */}
//                                         <div className="w-full h-full rounded-2xl overflow-hidden shadow-xl">
//                                             <Image
//                                                 src={testimonials[index % testimonials.length].image}
//                                                 alt={review.guestName}
//                                                 width={440}
//                                                 height={440}
//                                                 className="hidden lg:block object-cover"
//                                                 unoptimized
//                                             />
//                                         </div>
//                                     </div>
//                                 </CarouselItem>
//                             ))
//                         ) : (
//                             testimonials.map((item, index) => (
//                                 <CarouselItem key={index} className="mt-9">
//                                     <div className="lg:flex items-center gap-11">
//                                         <div
//                                             className={`flex items-start gap-11 lg:pr-20 rounded-2xl p-8 shadow-xl
//                                                 ${isDark ? "bg-[#2C2B28]" : "bg-[#E0E0E0]"}
//                                             `}
//                                         >
//                                             <Icon
//                                                 icon="ph:house-simple"
//                                                 width={34}
//                                                 height={34}
//                                                 style={{ color: isDark ? "#FFD700" : "#A78256" }}
//                                             />

//                                             <div>
//                                                 <h4
//                                                     className={`lg:text-3xl text-2xl font-semibold
//                                                         ${isDark ? "text-[#F2E9E1]" : "text-[#3B2F2F]"}
//                                                     `}
//                                                 >
//                                                     {item.review}
//                                                 </h4>

//                                                 <div className="flex items-center mt-8 gap-6">
//                                                     <Image
//                                                         src={item.image}
//                                                         alt={item.name}
//                                                         width={80}
//                                                         height={80}
//                                                         className="rounded-full lg:hidden block"
//                                                         unoptimized
//                                                     />
//                                                     <div>
//                                                         <h6
//                                                             className={`text-lg font-medium
//                                                                 ${isDark ? "text-[#F2E9E1]" : "text-[#3B2F2F]"}
//                                                             `}
//                                                         >
//                                                             {item.name}
//                                                         </h6>
//                                                         <p className={`${isDark ? "text-[#FFD700]" : "text-[#5B4E43]"}`}>
//                                                             {item.position}
//                                                         </p>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <div className="w-full h-full rounded-2xl overflow-hidden shadow-xl">
//                                             <Image
//                                                 src={item.image}
//                                                 alt={item.name}
//                                                 width={440}
//                                                 height={440}
//                                                 className="hidden lg:block object-cover"
//                                                 unoptimized
//                                             />
//                                         </div>
//                                     </div>
//                                 </CarouselItem>
//                             ))
//                         )}
//                     </CarouselContent>
//                 </Carousel>

//                 {/* DOTS */}
//                 <div className="flex justify-center mt-10">
//                     <div
//                         className={`flex gap-2.5 p-2.5 rounded-full shadow-lg
//                             ${isDark ? "bg-white/10" : "bg-black/10"}
//                         `}
//                     >
//                         {Array.from({ length: count }).map((_, index) => (
//                             <button
//                                 key={index}
//                                 onClick={() => handleDotClick(index)}
//                                 className={`w-3 h-3 rounded-full transition-all 
//                                     ${current === index + 1
//                                         ? isDark
//                                             ? "bg-[#FFD700]"
//                                             : "bg-[#A78256]"
//                                         : isDark
//                                             ? "bg-white/40"
//                                             : "bg-black/30"}
//                                 `}
//                             />
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Testimonial;











// "use client";
// import * as React from "react";
// import Image from "next/image";
// import { Icon } from "@iconify/react";
// import { useTheme } from "next-themes";

// import {
//     Carousel,
//     CarouselContent,
//     CarouselItem,
//     type CarouselApi,
// } from "@/components/ui/carousel";

// import { testimonials } from "@/app/api/testimonial";

// interface Review {
//     _id: string;
//     guestName: string;
//     guestImage: string | null;
//     rating: number;
//     comment: string;
//     cleanliness: number;
//     comfort: number;
//     service: number;
//     value: number;
//     createdAt: string;
// }

// const Testimonial = () => {
//     const { theme } = useTheme();
//     const isDark = theme === "dark";

//     const [api, setApi] = React.useState<CarouselApi | undefined>(undefined);
//     const [current, setCurrent] = React.useState(0);
//     const [count, setCount] = React.useState(0);

//     const [reviews, setReviews] = React.useState<Review[]>([]);
//     const [loading, setLoading] = React.useState(true);

//     React.useEffect(() => {
//         fetch("http://localhost:3001/feedback/all")
//             .then((res) => res.json())
//             .then((data) => {
//                 setReviews(data.feedback || []);
//                 setLoading(false);
//             })
//             .catch(() => setLoading(false));
//     }, []);

//     React.useEffect(() => {
//         if (!api) return;
//         setCount(api.scrollSnapList().length);
//         setCurrent(api.selectedScrollSnap() + 1);
//         api.on("select", () => setCurrent(api.selectedScrollSnap() + 1));
//     }, [api]);

//     const handleDotClick = (index: number) => api?.scrollTo(index);

//     return (
//         <section
//             id="testimonial"
//             className={`relative overflow-hidden py-20 transition-all duration-500
//                 ${isDark ? "bg-[#1E1B18]" : "bg-[#F5F0E1]"}
//             `}
//         >
//             {/* Glow / Accent */}
//             <div
//                 className={`absolute inset-0 pointer-events-none opacity-30 blur-3xl
//                     ${isDark ? "bg-[#6A4E23]" : "bg-[#A78256]"}
//                 `}
//             ></div>

//             <div className="container max-w-7xl mx-auto px-6 relative z-10">
//                 {/* Heading */}
//                 <div className="mb-14">
//                     <p
//                         className={`text-base font-semibold flex items-center gap-2 
//                             ${isDark ? "text-[#F2E9E1]/70" : "text-[#5B4E43]"}
//                         `}
//                     >
//                         <Icon
//                             icon="ph:house-simple-fill"
//                             className="text-2xl"
//                             style={{ color: isDark ? "#C9A36B" : "#6A4E23" }}
//                         />
//                         Guest Reviews
//                     </p>

//                     <h2
//                         className={`lg:text-5xl text-4xl font-bold leading-tight
//                             ${isDark ? "text-[#F2E9E1]" : "text-[#3B2F2F]"}
//                         `}
//                     >
//                         What our guests say
//                     </h2>

//                     {!loading && reviews.length > 0 && (
//                         <p className={`${isDark ? "text-[#F2E9E1]/60" : "text-[#5B4E43]/60"} mt-2`}>
//                             Showing {reviews.length} guest reviews
//                         </p>
//                     )}
//                 </div>

//                 {/* Carousel */}
//                 <Carousel key={`carousel-${reviews.length}`} setApi={setApi} opts={{ loop: true }}>
//                     <CarouselContent>
//                         {loading ? (
//                             <CarouselItem className="mt-9">
//                                 <div className="flex items-center gap-6">
//                                     <Icon
//                                         icon="ph:spinner"
//                                         width={38}
//                                         height={38}
//                                         className={`${isDark ? "text-[#C9A36B]" : "text-[#6A4E23]"} animate-spin`}
//                                     />
//                                     <h4 className={`lg:text-3xl text-2xl ${isDark ? "text-[#F2E9E1]" : "text-[#3B2F2F]"}`}>
//                                         Loading reviews…
//                                     </h4>
//                                 </div>
//                             </CarouselItem>
//                         ) : reviews.length > 0 ? (
//                             reviews.map((review, index) => (
//                                 <CarouselItem key={review._id} className="mt-9">
//                                     <div className="lg:flex items-center gap-11">
//                                         {/* TEXT CARD */}
//                                         <div
//                                             className={`flex items-start gap-11 lg:pr-20 rounded-2xl p-8 shadow-xl transition-all duration-700
//                                                 ${isDark ? "bg-[#2C2B28]" : "bg-[#E0E0E0]"}
//                                             `}
//                                         >
//                                             <Icon
//                                                 icon="ph:house-simple"
//                                                 width={34}
//                                                 height={34}
//                                                 style={{ color: isDark ? "#C9A36B" : "#6A4E23" }}
//                                             />

//                                             <div>
//                                                 <h4
//                                                     className={`lg:text-3xl text-2xl font-semibold
//                                                         ${isDark ? "text-[#F2E9E1]" : "text-[#3B2F2F]"}
//                                                     `}
//                                                 >
//                                                     "{review.comment}"
//                                                 </h4>

//                                                 <div className="flex items-center mt-8 gap-6">
//                                                     <Image
//                                                         src={testimonials[index % testimonials.length].image}
//                                                         alt={review.guestName}
//                                                         width={80}
//                                                         height={80}
//                                                         className="rounded-full lg:hidden block"
//                                                         unoptimized
//                                                     />

//                                                     <div>
//                                                         <h6
//                                                             className={`text-lg font-medium
//                                                                 ${isDark ? "text-[#F2E9E1]" : "text-[#3B2F2F]"}
//                                                             `}
//                                                         >
//                                                             {review.guestName}
//                                                         </h6>
//                                                         <p className={`${isDark ? "text-[#C9A36B]" : "text-[#6A4E23]"}`}>
//                                                             Guest
//                                                         </p>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         {/* IMAGE */}
//                                         <div className="w-full h-full rounded-2xl overflow-hidden shadow-xl">
//                                             <Image
//                                                 src={testimonials[index % testimonials.length].image}
//                                                 alt={review.guestName}
//                                                 width={440}
//                                                 height={440}
//                                                 className="hidden lg:block object-cover"
//                                                 unoptimized
//                                             />
//                                         </div>
//                                     </div>
//                                 </CarouselItem>
//                             ))
//                         ) : (
//                             testimonials.map((item, index) => (
//                                 <CarouselItem key={index} className="mt-9">
//                                     <div className="lg:flex items-center gap-11">
//                                         <div
//                                             className={`flex items-start gap-11 lg:pr-20 rounded-2xl p-8 shadow-xl
//                                                 ${isDark ? "bg-[#2C2B28]" : "bg-[#E0E0E0]"}
//                                             `}
//                                         >
//                                             <Icon
//                                                 icon="ph:house-simple"
//                                                 width={34}
//                                                 height={34}
//                                                 style={{ color: isDark ? "#C9A36B" : "#6A4E23" }}
//                                             />

//                                             <div>
//                                                 <h4
//                                                     className={`lg:text-3xl text-2xl font-semibold
//                                                         ${isDark ? "text-[#F2E9E1]" : "text-[#3B2F2F]"}
//                                                     `}
//                                                 >
//                                                     {item.review}
//                                                 </h4>

//                                                 <div className="flex items-center mt-8 gap-6">
//                                                     <Image
//                                                         src={item.image}
//                                                         alt={item.name}
//                                                         width={80}
//                                                         height={80}
//                                                         className="rounded-full lg:hidden block"
//                                                         unoptimized
//                                                     />
//                                                     <div>
//                                                         <h6
//                                                             className={`text-lg font-medium
//                                                                 ${isDark ? "text-[#F2E9E1]" : "text-[#3B2F2F]"}
//                                                             `}
//                                                         >
//                                                             {item.name}
//                                                         </h6>
//                                                         <p className={`${isDark ? "text-[#C9A36B]" : "text-[#6A4E23]"}`}>
//                                                             {item.position}
//                                                         </p>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <div className="w-full h-full rounded-2xl overflow-hidden shadow-xl">
//                                             <Image
//                                                 src={item.image}
//                                                 alt={item.name}
//                                                 width={440}
//                                                 height={440}
//                                                 className="hidden lg:block object-cover"
//                                                 unoptimized
//                                             />
//                                         </div>
//                                     </div>
//                                 </CarouselItem>
//                             ))
//                         )}
//                     </CarouselContent>
//                 </Carousel>

//                 {/* DOTS */}
//                 <div className="flex justify-center mt-10">
//                     <div
//                         className={`flex gap-2.5 p-2.5 rounded-full shadow-lg
//                             ${isDark ? "bg-white/10" : "bg-black/10"}
//                         `}
//                     >
//                         {Array.from({ length: count }).map((_, index) => (
//                             <button
//                                 key={index}
//                                 onClick={() => handleDotClick(index)}
//                                 className={`w-3 h-3 rounded-full transition-all 
//                                     ${current === index + 1
//                                         ? isDark
//                                             ? "bg-[#C9A36B]"
//                                             : "bg-[#6A4E23]"
//                                         : isDark
//                                             ? "bg-white/40"
//                                             : "bg-black/30"}
//                                 `}
//                             />
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Testimonial;








// "use client";
// import * as React from "react";
// import Image from "next/image";
// import { Icon } from "@iconify/react";
// import { useTheme } from "next-themes";

// import {
//     Carousel,
//     CarouselContent,
//     CarouselItem,
//     type CarouselApi,
// } from "@/components/ui/carousel";

// import { testimonials } from "@/app/api/testimonial";
// import { Theme } from "@/theme";



// interface Review {
//     _id: string;
//     guestName: string;
//     guestImage: string | null;
//     rating: number;
//     comment: string;
//     cleanliness: number;
//     comfort: number;
//     service: number;
//     value: number;
//     createdAt: string;
// }

// const Testimonial = () => {
//     const { theme } = useTheme();
//     const currentTheme = theme === "dark" ? Theme.dark : Theme.light;

//     const [api, setApi] = React.useState<CarouselApi | undefined>(undefined);
//     const [current, setCurrent] = React.useState(0);
//     const [count, setCount] = React.useState(0);

//     const [reviews, setReviews] = React.useState<Review[]>([]);
//     const [loading, setLoading] = React.useState(true);

//     React.useEffect(() => {
//         fetch("http://localhost:3001/feedback/all")
//             .then((res) => res.json())
//             .then((data) => {
//                 setReviews(data.feedback || []);
//                 setLoading(false);
//             })
//             .catch(() => setLoading(false));
//     }, []);

//     React.useEffect(() => {
//         if (!api) return;
//         setCount(api.scrollSnapList().length);
//         setCurrent(api.selectedScrollSnap() + 1);
//         api.on("select", () => setCurrent(api.selectedScrollSnap() + 1));
//     }, [api]);

//     const handleDotClick = (index: number) => api?.scrollTo(index);

//     return (
//         <section
//             id="testimonial"
//             className="relative overflow-hidden py-20 transition-all duration-500"
//             style={{ background: currentTheme.bg }}
//         >
//             {/* Glow / Accent */}
//             <div
//                 className="absolute inset-0 pointer-events-none opacity-30 blur-3xl"
//                 style={{ background: currentTheme.accent }}
//             ></div>

//             <div className="container max-w-7xl mx-auto px-6 relative z-10">
//                 {/* Heading */}
//                 <div className="mb-14">
//                     <p
//                         className="text-base font-semibold flex items-center gap-2"
//                         style={{ color: currentTheme.textSecondary }}
//                     >
//                         <Icon
//                             icon="ph:house-simple-fill"
//                             className="text-2xl"
//                             style={{ color: currentTheme.accent }}
//                         />
//                         Guest Reviews
//                     </p>

//                     <h2
//                         className="lg:text-5xl text-4xl font-bold leading-tight"
//                         style={{ color: currentTheme.text }}
//                     >
//                         What our guests say
//                     </h2>

//                     {!loading && reviews.length > 0 && (
//                         <p
//                             className="mt-2"
//                             style={{ color: currentTheme.textSecondary + "99" }}
//                         >
//                             Showing {reviews.length} guest reviews
//                         </p>
//                     )}
//                 </div>

//                 {/* Carousel */}
//                 <Carousel key={`carousel-${reviews.length}`} setApi={setApi} opts={{ loop: true }}>
//                     <CarouselContent>
//                         {loading ? (
//                             <CarouselItem className="mt-9 flex items-center gap-6">
//                                 <Icon
//                                     icon="ph:spinner"
//                                     width={38}
//                                     height={38}
//                                     className="animate-spin"
//                                     style={{ color: currentTheme.accent }}
//                                 />
//                                 <h4
//                                     className="lg:text-3xl text-2xl"
//                                     style={{ color: currentTheme.text }}
//                                 >
//                                     Loading reviews…
//                                 </h4>
//                             </CarouselItem>
//                         ) : reviews.length > 0 ? (
//                             reviews.map((review, index) => (
//                                 <CarouselItem key={review._id} className="mt-9">
//                                     <div className="lg:flex items-center gap-11">
//                                         {/* TEXT CARD */}
//                                         <div
//                                             className="flex items-start gap-11 lg:pr-20 rounded-2xl p-8 shadow-xl transition-all duration-700"
//                                             style={{ background: currentTheme.cardBg }}
//                                         >
//                                             <Icon
//                                                 icon="ph:house-simple"
//                                                 width={34}
//                                                 height={34}
//                                                 style={{ color: currentTheme.accent }}
//                                             />

//                                             <div>
//                                                 <h4
//                                                     className="lg:text-3xl text-2xl font-semibold"
//                                                     style={{ color: currentTheme.text }}
//                                                 >
//                                                     "{review.comment}"
//                                                 </h4>

//                                                 <div className="flex items-center mt-8 gap-6">
//                                                     <Image
//                                                         src={
//                                                             review.guestImage ||
//                                                             testimonials[index % testimonials.length].image
//                                                         }
//                                                         alt={review.guestName}
//                                                         width={80}
//                                                         height={80}
//                                                         className="rounded-full lg:hidden block"
//                                                         unoptimized
//                                                     />

//                                                     <div>
//                                                         <h6
//                                                             className="text-lg font-medium"
//                                                             style={{ color: currentTheme.text }}
//                                                         >
//                                                             {review.guestName}
//                                                         </h6>
//                                                         <p style={{ color: currentTheme.accent }}>Guest</p>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         {/* IMAGE */}
//                                         <div className="w-full h-full rounded-2xl overflow-hidden shadow-xl">
//                                             <Image
//                                                 src={
//                                                     review.guestImage ||
//                                                     testimonials[index % testimonials.length].image
//                                                 }
//                                                 alt={review.guestName}
//                                                 width={440}
//                                                 height={440}
//                                                 className="hidden lg:block object-cover"
//                                                 unoptimized
//                                             />
//                                         </div>
//                                     </div>
//                                 </CarouselItem>
//                             ))
//                         ) : (
//                             testimonials.map((item, index) => (
//                                 <CarouselItem key={index} className="mt-9">
//                                     <div className="lg:flex items-center gap-11">
//                                         <div
//                                             className="flex items-start gap-11 lg:pr-20 rounded-2xl p-8 shadow-xl"
//                                             style={{ background: currentTheme.cardBg }}
//                                         >
//                                             <Icon
//                                                 icon="ph:house-simple"
//                                                 width={34}
//                                                 height={34}
//                                                 style={{ color: currentTheme.accent }}
//                                             />

//                                             <div>
//                                                 <h4
//                                                     className="lg:text-3xl text-2xl font-semibold"
//                                                     style={{ color: currentTheme.text }}
//                                                 >
//                                                     {item.review}
//                                                 </h4>

//                                                 <div className="flex items-center mt-8 gap-6">
//                                                     <Image
//                                                         src={item.image}
//                                                         alt={item.name}
//                                                         width={80}
//                                                         height={80}
//                                                         className="rounded-full lg:hidden block"
//                                                         unoptimized
//                                                     />
//                                                     <div>
//                                                         <h6
//                                                             className="text-lg font-medium"
//                                                             style={{ color: currentTheme.text }}
//                                                         >
//                                                             {item.name}
//                                                         </h6>
//                                                         <p style={{ color: currentTheme.accent }}>
//                                                             {item.position}
//                                                         </p>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <div className="w-full h-full rounded-2xl overflow-hidden shadow-xl">
//                                             <Image
//                                                 src={item.image}
//                                                 alt={item.name}
//                                                 width={440}
//                                                 height={440}
//                                                 className="hidden lg:block object-cover"
//                                                 unoptimized
//                                             />
//                                         </div>
//                                     </div>
//                                 </CarouselItem>
//                             ))
//                         )}
//                     </CarouselContent>
//                 </Carousel>

//                 {/* DOTS */}
//                 <div className="flex justify-center mt-10">
//                     <div
//                         className="flex gap-2.5 p-2.5 rounded-full shadow-lg"
//                         style={{ background: currentTheme.text + "10" }}
//                     >
//                         {Array.from({ length: count }).map((_, index) => (
//                             <button
//                                 key={index}
//                                 onClick={() => handleDotClick(index)}
//                                 className="w-3 h-3 rounded-full transition-all"
//                                 style={{
//                                     background:
//                                         current === index + 1
//                                             ? currentTheme.accent
//                                             : currentTheme.text + "40",
//                                 }}
//                             />
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Testimonial;
















// "use client";
// import * as React from "react";
// import Image from "next/image";
// import { Icon } from "@iconify/react";
// import { useTheme } from "next-themes";

// import {
//     Carousel,
//     CarouselContent,
//     CarouselItem,
//     type CarouselApi,
// } from "@/components/ui/carousel";

// import { testimonials } from "@/app/api/testimonial";

// interface Review {
//     _id: string;
//     guestName: string | null;
//     guestImage: string | null;
//     rating: number;
//     comment: string;
//     cleanliness: number;
//     comfort: number;
//     service: number;
//     value: number;
//     createdAt: string;
// }

// const Testimonial: React.FC = () => {
//     const { theme } = useTheme();
//     const isDark = theme === "dark";

//     // Colors to match FAQ section
//     const colors = {
//         bg: isDark ? "#1E1B18" : "#F5F0E1",
//         text: isDark ? "#F2E9E1" : "#3B2F2F",
//         textSecondary: isDark ? "#F2E9E1/70" : "#3B2F2F/70",
//         cardBg: isDark ? "#2C2B28" : "#E0E0E0",
//         accent: isDark ? "#FFD700" : "#DCCAB0",
//         blurAccent: isDark ? "rgba(255,215,0,0.2)" : "rgba(220,202,176,0.15)",
//         cardShadow: isDark ? "0 12px 28px rgba(0,0,0,0.5)" : "0 12px 28px rgba(0,0,0,0.1)",
//     };

//     const [api, setApi] = React.useState<CarouselApi | undefined>(undefined);
//     const [current, setCurrent] = React.useState(0);
//     const [count, setCount] = React.useState(0);
//     const [reviews, setReviews] = React.useState<Review[]>([]);
//     const [loading, setLoading] = React.useState(true);

//     React.useEffect(() => {
//         fetch("http://localhost:3001/feedback/all")
//             .then((res) => res.json())
//             .then((data) => {
//                 setReviews(data.feedback || []);
//                 setLoading(false);
//             })
//             .catch(() => setLoading(false));
//     }, []);

//     React.useEffect(() => {
//         if (!api) return;
//         setCount(api.scrollSnapList().length);
//         setCurrent(api.selectedScrollSnap() + 1);
//         api.on("select", () => setCurrent(api.selectedScrollSnap() + 1));
//     }, [api]);

//     const handleDotClick = (index: number) => api?.scrollTo(index);

//     return (
//         <section
//             id="testimonial"
//             className="py-28 relative transition-colors"
//             style={{ background: colors.bg }}
//         >
//             <div className="container max-w-8xl mx-auto px-5 2xl:px-0 relative z-10">
//                 {/* Top Label */}
//                 <div className="flex items-center gap-2 mb-10">
//                     <Icon
//                         icon="ph:house-simple-fill"
//                         className="text-2xl"
//                         style={{ color: colors.accent }}
//                     />
//                     <span className="text-base font-semibold" style={{ color: colors.textSecondary }}>
//                         Guest Reviews
//                     </span>
//                 </div>

//                 {/* Title */}
//                 <h2 className="text-46 lg:text-58 font-semibold leading-tight mb-4" style={{ color: colors.text }}>
//                     What Our Guests Say
//                 </h2>

//                 <p className="text-lg mb-20 max-w-xl" style={{ color: colors.textSecondary }}>
//                     Find answers to what our guests think about their stay and experiences.
//                 </p>

//                 {/* Carousel */}
//                 <Carousel key={`carousel-${reviews.length}`} setApi={setApi} opts={{ loop: true }}>
//                     <CarouselContent>
//                         {loading ? (
//                             <CarouselItem className="flex items-center gap-6 mt-9">
//                                 <Icon
//                                     icon="ph:spinner"
//                                     width={38}
//                                     height={38}
//                                     className="animate-spin"
//                                     style={{ color: colors.accent }}
//                                 />
//                                 <h4 className="lg:text-3xl text-2xl" style={{ color: colors.text }}>
//                                     Loading reviews…
//                                 </h4>
//                             </CarouselItem>
//                         ) : reviews.length > 0 ? (
//                             reviews.map((review, index) => (
//                                 <CarouselItem key={review._id} className="mt-9">
//                                     <div className="lg:flex items-center gap-11">
//                                         {/* Card */}
//                                         <div
//                                             className="flex items-start gap-8 lg:pr-20 rounded-2xl p-8 shadow-lg transition-all duration-700"
//                                             style={{ background: colors.cardBg, boxShadow: colors.cardShadow }}
//                                         >
//                                             <Icon
//                                                 icon="ph:house-simple"
//                                                 width={34}
//                                                 height={34}
//                                                 style={{ color: colors.accent }}
//                                             />
//                                             <div>
//                                                 <h4 className="lg:text-3xl text-2xl font-semibold" style={{ color: colors.text }}>
//                                                     "{review.comment}"
//                                                 </h4>
//                                                 <div className="flex items-center mt-6 gap-4">
//                                                     {/* <Image
//                                                         src={review.guestImage || testimonials[index % testimonials.length].image}
//                                                         alt={review.guestName || "Guest"}
//                                                         width={80}
//                                                         height={80}
//                                                         className="rounded-full lg:hidden block"
//                                                         unoptimized
//                                                     /> */}
//                                                     <div>
//                                                         <h6 className="text-lg font-medium" style={{ color: colors.text }}>
//                                                             {review.guestName || "Guest"}
//                                                         </h6>
//                                                         <p style={{ color: colors.accent }}>Guest</p>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         {/* Right Image */}
//                                         <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg">
//                                             <Image
//                                                 src={review.guestImage || testimonials[index % testimonials.length].image}
//                                                 alt={review.guestName || "Guest"}
//                                                 width={40}
//                                                 height={70}
//                                                 className="rounded-xl object-cover w-full h-auto"
//                                                 unoptimized
//                                             />
//                                         </div>
//                                     </div>
//                                 </CarouselItem>
//                             ))
//                         ) : (
//                             testimonials.map((item, index) => (
//                                 <CarouselItem key={index} className="mt-9">
//                                     <div className="lg:flex items-center gap-11">
//                                         <div
//                                             className="flex items-start gap-8 lg:pr-20 rounded-2xl p-8 shadow-lg"
//                                             style={{ background: colors.cardBg, boxShadow: colors.cardShadow }}
//                                         >
//                                             <Icon
//                                                 icon="ph:house-simple"
//                                                 width={34}
//                                                 height={34}
//                                                 style={{ color: colors.accent }}
//                                             />
//                                             <div>
//                                                 <h4 className="lg:text-3xl text-2xl font-semibold" style={{ color: colors.text }}>
//                                                     {item.review}
//                                                 </h4>
//                                                 <div className="flex items-center mt-6 gap-4">
//                                                     <Image
//                                                         src={item.image}
//                                                         alt={item.name}
//                                                         width={80}
//                                                         height={80}
//                                                         className="rounded-full lg:hidden block"
//                                                         unoptimized
//                                                     />
//                                                     <div>
//                                                         <h6 className="text-lg font-medium" style={{ color: colors.text }}>
//                                                             {item.name}
//                                                         </h6>
//                                                         <p style={{ color: colors.accent }}>{item.position}</p>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         {/* <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg">
//                                             <Image
//                                                 src={item.image}
//                                                 alt={item.name}
//                                                 width={40}
//                                                 height={70}
//                                                 className="rounded-xl object-cover w-full h-auto"
//                                                 unoptimized
//                                             />
//                                         </div> */}
//                                     </div>
//                                 </CarouselItem>
//                             ))
//                         )}
//                     </CarouselContent>
//                 </Carousel>

//                 {/* Dots */}
//                 <div className="flex justify-center mt-10">
//                     <div
//                         className="flex gap-2.5 p-2.5 rounded-full shadow-lg"
//                         style={{ background: colors.text + "10" }}
//                     >
//                         {Array.from({ length: count }).map((_, index) => (
//                             <button
//                                 key={index}
//                                 onClick={() => handleDotClick(index)}
//                                 className="w-3 h-3 rounded-full transition-all"
//                                 style={{
//                                     background:
//                                         current === index + 1 ? colors.accent : colors.text + "40",
//                                 }}
//                             />
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Testimonial;







"use client";
import * as React from "react";
import { Icon } from "@iconify/react";
import { useTheme } from "next-themes";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

import { testimonials } from "@/app/api/testimonial";

interface Review {
  _id: string;
  guestName: string | null;
  guestImage: string | null;
  rating: number;
  comment: string;
  cleanliness: number;
  comfort: number;
  service: number;
  value: number;
  createdAt: string;
}

const Testimonial: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const colors = {
    bg: isDark ? "#1E1B18" : "#F5F0E1",
    text: isDark ? "#F2E9E1" : "#3B2F2F",
    textSecondary: isDark ? "#F2E9E1/70" : "#3B2F2F/70",
    cardBg: isDark ? "#2C2B28" : "#E0E0E0",
    accent: isDark ? "#FFD700" : "#DCCAB0",
    cardShadow: isDark
      ? "0 12px 28px rgba(0,0,0,0.5)"
      : "0 12px 28px rgba(0,0,0,0.1)",
  };

  const [api, setApi] = React.useState<CarouselApi | undefined>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [reviews, setReviews] = React.useState<Review[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("http://localhost:3001/feedback/all")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.feedback || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () =>
      setCurrent(api.selectedScrollSnap() + 1)
    );
  }, [api]);

  const handleDotClick = (index: number) => api?.scrollTo(index);

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }).map((_, i) => (
      <Icon
        key={i}
        icon={i < rating ? "ph:star-fill" : "ph:star"}
        className="text-xl"
        style={{ color: colors.accent }}
      />
    ));

  return (
    <section
      id="testimonial"
      className="py-28"
      style={{ background: colors.bg }}
    >
      <div className="container max-w-7xl mx-auto px-5">
        {/* Header */}
        <div className="flex items-center gap-2 mb-10">
          <Icon
            icon="ph:house-simple-fill"
            className="text-2xl"
            style={{ color: colors.accent }}
          />
          <span
            className="font-semibold"
            style={{ color: colors.textSecondary }}
          >
            Guest Reviews
          </span>
        </div>

        <h2
          className="text-46 lg:text-58 font-semibold mb-4"
          style={{ color: colors.text }}
        >
          What Our Guests Say
        </h2>

        <p
          className="text-lg mb-20 max-w-xl"
          style={{ color: colors.textSecondary }}
        >
          Honest feedback from guests who stayed with us.
        </p>

        {/* Carousel */}
        <Carousel setApi={setApi} opts={{ loop: true }}>
          <CarouselContent>
            {loading ? (
              <CarouselItem>
                <span style={{ color: colors.text }}>
                  Loading reviews…
                </span>
              </CarouselItem>
            ) : reviews.length > 0 ? (
              reviews.map((review) => (
                <CarouselItem key={review._id}>
                  <div
                    className="w-full rounded-2xl p-8 shadow-lg"
                    style={{
                      background: colors.cardBg,
                      boxShadow: colors.cardShadow,
                    }}
                  >
                    {/* Guest Name */}
                    <h4
                      className="text-xl font-semibold mb-6"
                      style={{ color: colors.text }}
                    >
                      {review.guestName || "Guest"}
                    </h4>

                    {/* Content */}
                    <div className="flex flex-col lg:flex-row items-start gap-10">
                      {/* Left Rating Block */}
                      <div className="shrink-0 text-center">
                        <div className="flex justify-center gap-1 mb-1">
                          {renderStars(review.rating)}
                        </div>
                        <p
                          className="text-sm font-medium"
                          style={{ color: colors.textSecondary }}
                        >
                          {review.rating.toFixed(1)} / 5
                        </p>
                      </div>

                      {/* Right Review Text */}
                      <p
                        className="text-lg leading-relaxed flex-1"
                        style={{ color: colors.text }}
                      >
                        {review.comment}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))
            ) : (
              testimonials.map((item, index) => (
                <CarouselItem key={index}>
                  <div
                    className="w-full rounded-2xl p-8 shadow-lg"
                    style={{
                      background: colors.cardBg,
                      boxShadow: colors.cardShadow,
                    }}
                  >
                    <h4
                      className="text-xl font-semibold mb-6"
                      style={{ color: colors.text }}
                    >
                      {item.name}
                    </h4>

                    <div className="flex flex-col lg:flex-row gap-10">
                      <div className="shrink-0 text-center">
                        <div className="flex justify-center gap-1 mb-1">
                          {renderStars(5)}
                        </div>
                        <p
                          className="text-sm"
                          style={{ color: colors.textSecondary }}
                        >
                          5.0 / 5
                        </p>
                      </div>

                      <p
                        className="text-lg flex-1"
                        style={{ color: colors.text }}
                      >
                        {item.review}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))
            )}
          </CarouselContent>
        </Carousel>

        {/* Dots */}
        <div className="flex justify-center mt-10">
          <div className="flex gap-2 p-2 rounded-full">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className="w-3 h-3 rounded-full"
                style={{
                  background:
                    current === index + 1
                      ? colors.accent
                      : colors.text + "40",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
