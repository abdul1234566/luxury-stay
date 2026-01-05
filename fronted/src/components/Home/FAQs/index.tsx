// import { Icon } from '@iconify/react';
// import Image from 'next/image';
// import {
//     Accordion,
//     AccordionContent,
//     AccordionItem,
//     AccordionTrigger,
// } from "@/components/ui/accordion"

// const FAQ: React.FC = () => {
//     return (
//         <section id='faqs'>
//             <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
//                 <div className="grid lg:grid-cols-2 gap-10 ">
//                     <div className='lg:mx-0 mx-auto'>
//                         <Image
//                             src="/images/faqs/faq-image.png"
//                             alt='image'
//                             width={680}
//                             height={644}
//                             className='lg:w-full'
//                             unoptimized={true}
//                         />
//                     </div>
//                     <div className='lg:px-12'>
//                         <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2">
//                             <Icon icon="ph:house-simple-fill" className="text-2xl text-primary " />
//                             FAQs
//                         </p>
//                         <h2 className='lg:text-52 text-40 leading-[1.2] font-medium text-dark dark:text-white'>
//                             Everything about our Hotel
//                         </h2>
//                         <p className='text-dark/50 dark:text-white/50 pr-20'>
//                             We understand that planning your stay can raise questions. Here are some frequently asked questions to help you make the most of your hotel experience.
//                         </p>
//                         <div className="my-8">
//                             <Accordion type="single" defaultValue="item-1" collapsible className="w-full flex flex-col gap-6">
//                                 <AccordionItem value="item-1">
//                                     <AccordionTrigger>1. What are the check-in and check-out times?</AccordionTrigger>
//                                     <AccordionContent>
//                                         Check-in time is 3:00 PM and check-out time is 11:00 AM. Early check-in and late check-out can be arranged based on availability and may incur additional charges.
//                                     </AccordionContent>
//                                 </AccordionItem>
//                                 <AccordionItem value="item-2">
//                                     <AccordionTrigger>2. Do you offer airport transportation?</AccordionTrigger>
//                                     <AccordionContent>
//                                         Yes, we provide airport shuttle service for our guests. Please contact our concierge at least 24 hours in advance to arrange transportation. Additional fees may apply.
//                                     </AccordionContent>
//                                 </AccordionItem>
//                                 <AccordionItem value="item-3">
//                                     <AccordionTrigger>3. What amenities are included in my stay?</AccordionTrigger>
//                                     <AccordionContent>
//                                         Your stay includes access to our fitness center, swimming pool, spa facilities, complimentary Wi-Fi, daily housekeeping, and access to our business center. Premium amenities may require additional fees.
//                                     </AccordionContent>
//                                 </AccordionItem>
//                             </Accordion>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default FAQ;



// import { Icon } from "@iconify/react";
// import Image from "next/image";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";

// const FAQ: React.FC = () => {
//   return (
//     <section id="faqs" className="py-28">
//       <div className="container max-w-8xl mx-auto px-5 2xl:px-0">

//         {/* Top Label */}
//         <div className="flex items-center gap-2 mb-10">
//           <Icon icon="ph:house-simple-fill" className="text-2xl text-primary" />
//           <span className="text-dark/70 dark:text-white/70 text-base font-semibold">
//             FAQs
//           </span>
//         </div>

//         {/* TITLE */}
//         <h2 className="text-46 lg:text-58 font-semibold leading-tight text-dark dark:text-white max-w-3xl mb-4">
//           Everything About LuxuryStay
//         </h2>

//         <p className="text-dark/60 dark:text-white/60 text-lg max-w-xl mb-20">
//           Find answers to the most popular questions our guests often ask before booking a room.
//         </p>

//         {/* NEW MODERN LAYOUT */}
//         <div className="grid lg:grid-cols-[120px_1fr_300px] gap-14 items-start">

//           {/* LEFT SIDE — Vertical Label */}
//           <div className="flex items-start justify-start">
//             <p className="rotate-180 writing-vertical-rl text-dark/50 dark:text-white/40 tracking-widest text-sm font-medium">
             
//             </p>
//           </div>

//           {/* MIDDLE — CLEAN ACCORDION LIST */}
//           <div className="space-y-10">

//             {/* Group 1 */}
//             <div>
//               <h3 className="text-20 font-semibold text-dark dark:text-white mb-3">
//                 Booking Information
//               </h3>

//               <Accordion type="single" collapsible className="space-y-5">
//                 <AccordionItem value="item-1">
//                   <AccordionTrigger className="text-lg font-medium">
//                     1. What are the check-in and check-out times?
//                   </AccordionTrigger>
//                   <AccordionContent className="text-dark/70 dark:text-white/60">
//                     Check-in starts at 3:00 PM and check-out is at 11:00 AM.
//                     Extended time is subject to availability.
//                   </AccordionContent>
//                 </AccordionItem>

//                 <AccordionItem value="item-2">
//                   <AccordionTrigger className="text-lg font-medium">
//                     2. Do you offer airport transport?
//                   </AccordionTrigger>
//                   <AccordionContent className="text-dark/70 dark:text-white/60">
//                     Yes, we provide airport pickup and drop-off on request.
//                     Contact reception 24 hours prior to arrival.
//                   </AccordionContent>
//                 </AccordionItem>
//               </Accordion>
//             </div>

//             {/* Group 2 */}
//             <div>
//               <h3 className="text-20 font-semibold text-dark dark:text-white mb-3">
//                 Facilities & Services
//               </h3>

//               <Accordion type="single" collapsible className="space-y-5">
//                 <AccordionItem value="item-3">
//                   <AccordionTrigger className="text-lg font-medium">
//                     3. What amenities are included with my stay?
//                   </AccordionTrigger>
//                   <AccordionContent className="text-dark/70 dark:text-white/60">
//                     Complimentary Wi-Fi, fitness center, pool access, spa options,
//                     and daily housekeeping services.
//                   </AccordionContent>
//                 </AccordionItem>
//               </Accordion>
//             </div>

//           </div>

//           {/* RIGHT SIDE — TALL IMAGE */}
//           <div className="relative w-full">
//             <div className="absolute -top-8 -right-4 w-24 h-24 rounded-full bg-primary/15 dark:bg-primary/20 blur-3xl"></div>

//             <Image
//               src="/images/faqs/faq-image.png"
//               alt="FAQ Illustration"
//               width={400}
//               height={700}
//               className="rounded-xl w-full h-auto object-cover"
//               unoptimized={true}
//             />

//             <div className="absolute bottom-4 -left-6 w-20 h-[2.5px] bg-primary/40 rounded-full"></div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default FAQ;



import { Icon } from "@iconify/react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ: React.FC = () => {
  return (
    <section
      id="faqs"
      className="py-28 bg-[#F5F0E1] dark:bg-[#1E1B18] transition-colors"
    >
      <div className="container max-w-8xl mx-auto px-5 2xl:px-0">

        {/* Top Label */}
        <div className="flex items-center gap-2 mb-10">
          <Icon
            icon="ph:house-simple-fill"
            className="text-2xl text-[#DCCAB0] dark:text-[#FFD700]"
          />
          <span className="text-[#3B2F2F]/70 dark:text-[#F2E9E1]/70 text-base font-semibold">
            FAQs
          </span>
        </div>

        {/* TITLE */}
        <h2 className="text-46 lg:text-58 font-semibold leading-tight text-[#3B2F2F] dark:text-[#F2E9E1] max-w-3xl mb-4">
          Everything About LuxuryStay
        </h2>

        <p className="text-[#3B2F2F]/60 dark:text-[#F2E9E1]/60 text-lg max-w-xl mb-20">
          Find answers to the most popular questions our guests often ask before booking a room.
        </p>

        {/* NEW MODERN LAYOUT */}
        <div className="grid lg:grid-cols-[120px_1fr_300px] gap-14 items-start">

          {/* LEFT SIDE — Vertical Label */}
          <div className="flex items-start justify-start">
            <p className="rotate-180 writing-vertical-rl text-[#3B2F2F]/50 dark:text-[#F2E9E1]/40 tracking-widest text-sm font-medium">
              {/* optional vertical label */}
            </p>
          </div>

          {/* MIDDLE — CLEAN ACCORDION LIST */}
          <div className="space-y-10">

            {/* Group 1 */}
            <div>
              <h3 className="text-20 font-semibold text-[#3B2F2F] dark:text-[#F2E9E1] mb-3">
                Booking Information
              </h3>

              <Accordion type="single" collapsible className="space-y-5">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-medium text-[#3B2F2F] dark:text-[#F2E9E1]">
                    1. What are the check-in and check-out times?
                  </AccordionTrigger>
                  <AccordionContent className="text-[#3B2F2F]/70 dark:text-[#F2E9E1]/60">
                    Check-in starts at 3:00 PM and check-out is at 11:00 AM.
                    Extended time is subject to availability.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg font-medium text-[#3B2F2F] dark:text-[#F2E9E1]">
                    2. Do you offer airport transport?
                  </AccordionTrigger>
                  <AccordionContent className="text-[#3B2F2F]/70 dark:text-[#F2E9E1]/60">
                    Yes, we provide airport pickup and drop-off on request.
                    Contact reception 24 hours prior to arrival.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Group 2 */}
            <div>
              <h3 className="text-20 font-semibold text-[#3B2F2F] dark:text-[#F2E9E1] mb-3">
                Facilities & Services
              </h3>

              <Accordion type="single" collapsible className="space-y-5">
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg font-medium text-[#3B2F2F] dark:text-[#F2E9E1]">
                    3. What amenities are included with my stay?
                  </AccordionTrigger>
                  <AccordionContent className="text-[#3B2F2F]/70 dark:text-[#F2E9E1]/60">
                    Complimentary Wi-Fi, fitness center, pool access, spa options,
                    and daily housekeeping services.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

          </div>

          {/* RIGHT SIDE — TALL IMAGE */}
          <div className="relative w-full">
            <div className="absolute -top-8 -right-4 w-24 h-24 rounded-full bg-[#DCCAB0]/15 dark:bg-[#FFD700]/20 blur-3xl"></div>

            <div className="rounded-xl overflow-hidden shadow-lg bg-[#E0E0E0] dark:bg-[#2C2B28] p-2">
              <Image
                src="/images/faqs/faq-image.png"
                alt="FAQ Illustration"
                width={400}
                height={700}
                className="rounded-xl object-cover w-full h-auto"
                unoptimized={true}
              />
            </div>

            {/* <div className="absolute bottom-4 -left-6 w-20 h-[2.5px] bg-[#DCCAB0]/40 dark:bg-[#FFD700]/40 rounded-full"></div> */}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;
