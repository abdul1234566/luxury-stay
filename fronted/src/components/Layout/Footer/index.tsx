// "use client";
// import Link from "next/link";
// import { Icon } from "@iconify/react"
// import { getFooterLinks } from "@/app/api/footerlinks";
// import { useSession } from "next-auth/react";

// const Footer = () => {
//   const { data: session } = useSession();
//   const userRole = session?.user?.role;
//   const footerLinks = getFooterLinks(userRole);

//   return (
//     <footer className="relative z-10 bg-dark">
//       <div className="container mx-auto max-w-8xl pt-14 px-4 sm:px-6 lg:px-0">
//         <div className="flex lg:items-center justify-between items-end lg:gap-11 pb-14 border-b border-white/10 lg:flex-nowrap flex-wrap gap-6">
//           <p className="text-white text-sm lg:max-w-1/5">
//             Stay updated with the latest news,
//             promotions, and exclusive offers.
//           </p>
//           <div className="flex lg:flex-row flex-col items-center lg:gap-10 gap-3">
//             <div className="flex gap-2 lg:order-1 order-2">
//               <input type="email" placeholder="Enter Your Email" className="rounded-full py-4 px-6 bg-white/10 placeholder:text-white text-white focus-visible:outline-0" />
//               <button className="text-dark bg-white py-4 px-8 font-semibold rounded-full hover:bg-primary hover:text-white duration-300 hover:cursor-pointer">
//                 Subscribe
//               </button>
//             </div>
//             <p className="text-white/40 text-sm lg:max-w-[45%] order-1 lg:order-2">
//               By subscribing, you agree to receive our promotional emails. You can unsubscribe  at any time.
//             </p>
//           </div>
//           <div className="flex items-center gap-6">
//             <Link href="#">
//               <Icon icon="ph:x-logo-bold" width={24} height={24} className="text-white hover:text-primary duration-300" />
//             </Link>
//             <Link href="#">
//               <Icon icon="ph:facebook-logo-bold" width={24} height={24} className="text-white hover:text-primary duration-300" />
//             </Link>
//             <Link href="#">
//               <Icon icon="ph:instagram-logo-bold" width={24} height={24} className="text-white hover:text-primary duration-300" />
//             </Link>
//           </div>
//         </div>
//         <div className="py-16 border-b border-white/10">
//           <div className="grid grid-cols-12 sm:gap-10 gap-y-6">
//             <div className="md:col-span-7 col-span-12">
//               <h2 className="text-white leading-[1.2] text-40 font-medium mb-6 lg:max-w-3/4">
//                 Begin your path to
//                 success contact us today.
//               </h2>
//               <Link href="/contactus" className="bg-primary text-base font-semibold py-4 px-8 rounded-full text-white hover:bg-white hover:text-dark duration-300 hover:cursor-pointer">
//                 Get In Touch
//               </Link>
//             </div>
//             <div className="md:col-span-3 sm:col-span-6 col-span-12">
//               <div className="flex flex-col gap-4 w-fit">
//                 {footerLinks.slice(0, Math.ceil(footerLinks.length / 2)).map((item, index) => (
//                   <div key={index}>
//                     <Link href={item.href} className="text-white/40 text-xm hover:text-white">
//                       {item.label}
//                     </Link>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="md:col-span-2 sm:col-span-6 col-span-12">
//               <div className="flex flex-col gap-4 w-fit">
//                 {footerLinks.slice(Math.ceil(footerLinks.length / 2)).map((item, index) => (
//                   <div key={index}>
//                     <Link href={item.href} className="text-white/40 text-xm hover:text-white">
//                       {item.label}
//                     </Link>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="flex justify-between md:flex-nowrap flex-wrap items-center py-6 gap-6">
//           <p className="text-white/40 text-sm ">
//             ©2025 Homely - Design & Developed by <Link href="https://getnextjstemplates.com/" className="hover:text-primary" target="_blanck">GetNextJs Templates</Link>
//           </p>
//           <div className="flex gap-8 items-center">
//             <Link href="#" className="text-white/40 hover:text-primary text-sm">
//               Terms of service
//             </Link>
//             <Link href="#" className="text-white/40 hover:text-primary text-sm">
//               Privacy policy
//             </Link>
//           </div>
//         </div>
//       </div>
//     </footer >
//   );
// };

// export default Footer;







// "use client";
// import Link from "next/link";
// import { Icon } from "@iconify/react";
// import { getFooterLinks } from "@/app/api/footerlinks";
// import { useSession } from "next-auth/react";

// const Footer = () => {
//   const { data: session } = useSession();
//   const userRole = session?.user?.role;
//   const footerLinks = getFooterLinks(userRole);

//   return (
//     <footer className="bg-[#2C2C2C] dark:bg-black text-white pt-16 pb-10 font-poppins">
//       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-14">

//         {/* ===== Brand & Description ===== */}
//         <div>
//           <h3 className="text-[#D4AF37] text-2xl font-playfair tracking-wide">
//             LuxuryStay
//           </h3>

//           <p className="mt-5 text-gray-300 leading-relaxed max-w-xs">
//             Experience world-class hospitality with timeless elegance,
//             exceptional service, and unforgettable comfort in every stay.
//           </p>

//           {/* Social Icons */}
//           <div className="flex items-center gap-5 mt-7">
//             {[
//               "mdi:facebook",
//               "mdi:instagram",
//               "mdi:twitter",
//               "mdi:linkedin",
//             ].map((icon, i) => (
//               <a
//                 key={i}
//                 href="#"
//                 className="text-gray-300 hover:text-[#D4AF37] text-2xl transition-colors"
//               >
//                 <Icon icon={icon} />
//               </a>
//             ))}
//           </div>
//         </div>

//         {/* ===== Dynamic Links ===== */}
//         <div>
//           <h4 className="text-[#D4AF37] text-xl font-playfair mb-5 tracking-wide">
//             Quick Links
//           </h4>

//           <ul className="flex flex-col gap-3">
//             {footerLinks?.map((link: any, index: number) => (
//               <li key={index}>
//                 <Link
//                   href={link.href}
//                   className="text-gray-300 hover:text-[#D4AF37] transition-colors"
//                 >
//                   {link.label}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* ===== Support Section ===== */}
//         <div>
//           <h4 className="text-[#D4AF37] text-xl font-playfair mb-5 tracking-wide">
//             Support
//           </h4>

//           <ul className="flex flex-col gap-3 text-gray-300">
//             <li>
//               <a href="#" className="hover:text-[#D4AF37] transition-colors">
//                 Help Center
//               </a>
//             </li>
//             <li>
//               <a href="#" className="hover:text-[#D4AF37] transition-colors">
//                 Terms & Conditions
//               </a>
//             </li>
//             <li>
//               <a href="#" className="hover:text-[#D4AF37] transition-colors">
//                 Privacy Policy
//               </a>
//             </li>
//             <li>
//               <a href="#" className="hover:text-[#D4AF37] transition-colors">
//                 Contact Support
//               </a>
//             </li>
//           </ul>
//         </div>

//         {/* ===== Contact Info ===== */}
//         <div>
//           <h4 className="text-[#D4AF37] text-xl font-playfair mb-5 tracking-wide">
//             Contact Us
//           </h4>

//           <ul className="flex flex-col gap-3 text-gray-300">
//             <li>📍 123 Elite Street, Downtown City</li>
//             <li>📞 +92 300 1234567</li>
//             <li>📧 support@luxurystay.com</li>
//             <li>🕒 Open 24/7 – Always at your service</li>
//           </ul>
//         </div>
//       </div>

//       {/* ===== Elegant Gold Divider ===== */}
//       <div className="mt-12 flex justify-center">
//         <div className="w-3/4 h-[1px] bg-[#D4AF37]/40" />
//       </div>

//       {/* ===== Bottom Copyright ===== */}
//       <div className="text-center mt-6 text-gray-400 tracking-wide text-sm">
//         © {new Date().getFullYear()} LuxuryStay — Crafted with Excellence.
//       </div>
//     </footer>
//   );
// };

// export default Footer;













"use client";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { getFooterLinks } from "@/app/api/footerlinks";
import { useSession } from "next-auth/react";

const Footer = () => {
  const { data: session } = useSession();
  const userRole = session?.user?.role;
  const footerLinks = getFooterLinks(userRole);

  return (
    <footer className="transition-colors bg-[#F5F0E1] dark:bg-[#1E1B18] text-[#3B2F2F] dark:text-[#F2E9E1] pt-20 pb-10 font-poppins border-t border-[#DCCAB0]/30 dark:border-[#5B4E43]/40">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-14">

        {/* ===== Brand & Description ===== */}
        <div>
          <h3 className="text-[#A78256] dark:text-[#FFD700] text-2xl font-playfair tracking-wide">
            LuxuryStay
          </h3>

          <p className="mt-5 text-[#3B2F2F]/80 dark:text-[#F2E9E1]/80 leading-relaxed max-w-xs">
            Experience world-class hospitality with timeless elegance,
            exceptional service, and unforgettable comfort in every stay.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-5 mt-7">
            {[
              "mdi:facebook",
              "mdi:instagram",
              "mdi:twitter",
              "mdi:linkedin",
            ].map((icon, i) => (
              <a
                key={i}
                href="#"
                className="text-[#3B2F2F]/80 dark:text-[#F2E9E1]/80 hover:text-[#A78256] dark:hover:text-[#FFD700] text-2xl transition-colors"
              >
                <Icon icon={icon} />
              </a>
            ))}
          </div>
        </div>

        {/* ===== Dynamic Links ===== */}
        <div>
          <h4 className="text-[#A78256] dark:text-[#FFD700] text-xl font-playfair mb-5 tracking-wide">
            Quick Links
          </h4>

          <ul className="flex flex-col gap-3">
            {footerLinks?.map((link: any, index: number) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className="text-[#3B2F2F]/80 dark:text-[#F2E9E1]/80 hover:text-[#A78256] dark:hover:text-[#FFD700] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ===== Support Section ===== */}
        <div>
          <h4 className="text-[#A78256] dark:text-[#FFD700] text-xl font-playfair mb-5 tracking-wide">
            Support
          </h4>

          <ul className="flex flex-col gap-3 text-[#3B2F2F]/80 dark:text-[#F2E9E1]/80">
            <li>
              <a href="#" className="hover:text-[#A78256] dark:hover:text-[#FFD700] transition-colors">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#A78256] dark:hover:text-[#FFD700] transition-colors">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#A78256] dark:hover:text-[#FFD700] transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#A78256] dark:hover:text-[#FFD700] transition-colors">
                Contact Support
              </a>
            </li>
          </ul>
        </div>

        {/* ===== Contact Info ===== */}
        <div>
          <h4 className="text-[#A78256] dark:text-[#FFD700] text-xl font-playfair mb-5 tracking-wide">
            Contact Us
          </h4>

          <ul className="flex flex-col gap-3 text-[#3B2F2F]/80 dark:text-[#F2E9E1]/80">
            <li>📍 123 Elite Street, Downtown City</li>
            <li>📞 +92 300 1234567</li>
            <li>📧 support@luxurystay.com</li>
            <li>🕒 Open 24/7 – Always at your service</li>
          </ul>
        </div>
      </div>

      {/* ===== Elegant Divider ===== */}
      <div className="mt-12 flex justify-center">
        <div className="w-3/4 h-[1px] bg-[#A78256]/40 dark:bg-[#FFD700]/40" />
      </div>

      {/* ===== Bottom Copyright ===== */}
      <div className="text-center mt-6 text-[#3B2F2F]/60 dark:text-[#F2E9E1]/60 tracking-wide text-sm">
        © {new Date().getFullYear()} LuxuryStay — Crafted with Excellence.
      </div>
    </footer>
  );
};

export default Footer;
