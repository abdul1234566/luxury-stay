// "use client";
// import { Icon } from '@iconify/react';
// import Image from 'next/image';
// import { useState, useEffect } from 'react';
// import Link from 'next/link';

// export default function AboutPage() {
//   const [stats, setStats] = useState([
//     { number: "0", label: "Happy Guests" },
//     { number: "0", label: "Luxury Rooms" },
//     { number: "15+", label: "Years Experience" },
//     { number: "0.0", label: "Guest Rating" }
//   ]);
//   const [loading, setLoading] = useState(true);

//   // Fetch dynamic statistics
//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         console.log('Fetching statistics...');
        
//         // Fetch total unique guests (from users table where role is guest)
//         const usersRes = await fetch('http://localhost:3001/users/allusers');
//         const usersData = await usersRes.json();
//         console.log('Users data:', usersData);
//         const totalGuests = usersData.users?.filter((user: any) => user.role === 'guest').length || 0;
//         console.log('Total guests:', totalGuests);

//         // Fetch total rooms
//         const roomsRes = await fetch('http://localhost:3001/allrooms');
//         const roomsData = await roomsRes.json();
//         console.log('Rooms data:', roomsData);
//         const totalRooms = roomsData.rooms?.length || 0;
//         console.log('Total rooms:', totalRooms);

//         // Fetch total reservations
//         const reservationsRes = await fetch('http://localhost:3001/reservations/all');
//         const reservationsData = await reservationsRes.json();
//         console.log('Reservations data:', reservationsData);
//         const totalReservations = reservationsData.reservations?.length || 0;
//         console.log('Total reservations:', totalReservations);

//         // Fetch average rating from feedback
//         const feedbackRes = await fetch('http://localhost:3001/feedback/all');
//         const feedbackData = await feedbackRes.json();
//         console.log('Feedback data:', feedbackData);
//         const feedbacks = feedbackData.feedback || [];
        
//         let averageRating = 0;
//         if (feedbacks.length > 0) {
//           const totalRating = feedbacks.reduce((sum: number, feedback: any) => sum + (feedback.rating || 0), 0);
//           averageRating = parseFloat((totalRating / feedbacks.length).toFixed(1));
//         }
//         console.log('Average rating:', averageRating);

//         setStats([
//           { number: `${totalGuests}+`, label: "Happy Guests" },
//           { number: `${totalRooms}`, label: "Luxury Rooms" },
//           { number: `${totalReservations}+`, label: "Total Reservations" },
//           { number: averageRating.toString(), label: "Guest Rating" }
//         ]);
//       } catch (error) {
//         console.error('Error fetching stats:', error);
//         // Keep default values if fetch fails
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   const teamMembers = [
//     {
//       name: "Sarah Johnson",
//       role: "General Manager",
//       image: "/images/users/alkesh.jpg", // Using existing image
//       description: "With over 15 years of hospitality experience, Sarah leads our team with passion and dedication."
//     },
//     {
//       name: "Michael Chen",
//       role: "Operations Manager",
//       image: "/images/users/george.jpg", // Using existing image
//       description: "Michael ensures smooth day-to-day operations and exceptional guest experiences."
//     },
//     {
//       name: "Emily Rodriguez",
//       role: "Guest Relations Manager",
//       image: "/images/users/arlene.jpg", // Using existing image
//       description: "Emily specializes in creating personalized experiences for our valued guests."
//     },
//     {
//       name: "David Thompson",
//       role: "Maintenance Supervisor",
//       image: "/images/users/mark.jpg", // Using existing image
//       description: "David and his team maintain our facilities to the highest standards."
//     }
//   ];

//   const values = [
//     {
//       icon: "ph:heart",
//       title: "Excellence",
//       description: "We strive for excellence in every aspect of our service delivery."
//     },
//     {
//       icon: "ph:users",
//       title: "Hospitality",
//       description: "Genuine care and warmth in every guest interaction."
//     },
//     {
//       icon: "ph:shield-check",
//       title: "Quality",
//       description: "Maintaining the highest standards of cleanliness and comfort."
//     },
//     {
//       icon: "ph:star",
//       title: "Innovation",
//       description: "Continuously improving our services and guest experience."
//     }
//   ];

//   return (
//     <div className="container max-w-8xl mx-auto px-5 2xl:px-0 pt-32 md:pt-44 pb-14 md:pb-28">
//       {/* Hero Section */}
//       <div className="mb-16">
//         <div className="flex gap-2.5 items-center justify-center mb-3">
//           <span>
//             <Icon
//               icon={'ph:house-simple-fill'}
//               width={20}
//               height={20}
//               className='text-primary'
//             />
//           </span>
//           <p className='text-base font-semibold text-badge dark:text-white/90'>
//             About Us
//           </p>
//         </div>
//         <div className='text-center'>
//           <h3 className='text-4xl sm:text-52 font-medium tracking-tighter text-black dark:text-white mb-3 leading-10 sm:leading-14'>
//             Welcome to Our Luxury Hotel
//           </h3>
//           <p className='text-xm font-normal tracking-tight text-black/50 dark:text-white/50 leading-6 max-w-3xl mx-auto'>
//             Discover the perfect blend of luxury, comfort, and exceptional service. 
//             Our hotel has been serving guests with dedication and warmth for over 15 years.
//           </p>
//         </div>
//       </div>

//       {/* Stats Section */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
//         {loading ? (
//           // Loading state - show 4 loading cards
//           <>
//             {[1, 2, 3, 4].map((index) => (
//               <div key={index} className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
//                 <div className="animate-pulse">
//                   <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
//                   <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
//                 </div>
//               </div>
//             ))}
//           </>
//         ) : (
//           stats.map((stat, index) => (
//             <div key={index} className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
//               <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
//               <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Story Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
//         <div>
//           <h2 className="text-3xl font-bold text-dark dark:text-white mb-6">Our Story</h2>
//           <div className="space-y-4 text-gray-600 dark:text-gray-300">
//             <p>
//               Founded in 2008, our hotel began as a small family-owned establishment with a simple mission: 
//               to provide exceptional hospitality experiences that make every guest feel at home.
//             </p>
//             <p>
//               Over the years, we've grown from a modest 10-room inn to a luxurious 25-room hotel, 
//               but our commitment to personalized service and attention to detail has never wavered.
//             </p>
//             <p>
//               Today, we continue to blend modern amenities with traditional hospitality values, 
//               creating memorable experiences for guests from around the world.
//             </p>
//           </div>
//         </div>
//         <div className="relative">
//           <Image
//             src="/images/hero/heroBanner.png"
//             alt="Hotel Exterior"
//             width={600}
//             height={400}
//             className="rounded-xl shadow-lg"
//             unoptimized={true}
//           />
//         </div>
//       </div>

//       {/* Values Section */}
//       <div className="mb-16">
//         <h2 className="text-3xl font-bold text-dark dark:text-white text-center mb-12">Our Values</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {values.map((value, index) => (
//             <div key={index} className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
//               <div className="flex justify-center mb-4">
//                 <Icon
//                   icon={value.icon}
//                   width={40}
//                   height={40}
//                   className="text-primary"
//                 />
//               </div>
//               <h3 className="text-xl font-semibold text-dark dark:text-white mb-3">{value.title}</h3>
//               <p className="text-sm text-gray-600 dark:text-gray-400">{value.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Team Section */}
//       <div className="mb-16">
//         <h2 className="text-3xl font-bold text-dark dark:text-white text-center mb-12">Meet Our Team</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {teamMembers.map((member, index) => (
//             <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
//               <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
//                 <Image
//                   src={member.image}
//                   alt={member.name}
//                   fill
//                   className="object-cover"
//                   unoptimized={true}
//                 />
//               </div>
//               <div className="p-6">
//                 <h3 className="text-lg font-semibold text-dark dark:text-white mb-1">{member.name}</h3>
//                 <p className="text-primary font-medium mb-3">{member.role}</p>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">{member.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Mission Section */}
//       <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-8 mb-16">
//         <div className="text-center">
//           <h2 className="text-3xl font-bold text-dark dark:text-white mb-6">Our Mission</h2>
//           <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
//             To provide exceptional hospitality experiences that exceed expectations, 
//             creating lasting memories for our guests while maintaining the highest standards 
//             of service, comfort, and luxury in every aspect of our operations.
//           </p>
//         </div>
//       </div>

//       {/* Contact CTA */}
//       <div className="text-center">
//         <h2 className="text-3xl font-bold text-dark dark:text-white mb-4">Ready to Experience Luxury?</h2>
//         <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
//           Book your stay with us and discover the perfect blend of comfort, luxury, and exceptional service.
//         </p>
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <Link href="/properties/book">
//             <button className="px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors">
//               Book Now
//             </button>
//           </Link>
//           <Link href="/contactus">
//             <button className="px-8 py-3 border border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-white transition-colors">
//               Contact Us
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// } 





// "use client";
// import { Icon } from '@iconify/react';
// import Image from 'next/image';
// import { useState, useEffect } from 'react';
// import Link from 'next/link';

// export default function AboutPage() {
//   const [stats, setStats] = useState([
//     { number: "0", label: "Happy Guests" },
//     { number: "0", label: "Luxury Rooms" },
//     { number: "15+", label: "Years Experience" },
//     { number: "0.0", label: "Guest Rating" }
//   ]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const usersRes = await fetch('http://localhost:3001/users/allusers');
//         const usersData = await usersRes.json();
//         const totalGuests = usersData.users?.filter((user: any) => user.role === 'guest').length || 0;

//         const roomsRes = await fetch('http://localhost:3001/allrooms');
//         const roomsData = await roomsRes.json();
//         const totalRooms = roomsData.rooms?.length || 0;

//         const reservationsRes = await fetch('http://localhost:3001/reservations/all');
//         const reservationsData = await reservationsRes.json();
//         const totalReservations = reservationsData.reservations?.length || 0;

//         const feedbackRes = await fetch('http://localhost:3001/feedback/all');
//         const feedbackData = await feedbackRes.json();
//         const feedbacks = feedbackData.feedback || [];

//         let averageRating = 0;
//         if (feedbacks.length > 0) {
//           const totalRating = feedbacks.reduce((sum: number, feedback: any) => sum + (feedback.rating || 0), 0);
//           averageRating = parseFloat((totalRating / feedbacks.length).toFixed(1));
//         }

//         setStats([
//           { number: `${totalGuests}+`, label: "Happy Guests" },
//           { number: `${totalRooms}`, label: "Luxury Rooms" },
//           { number: `${totalReservations}+`, label: "Total Reservations" },
//           { number: averageRating.toString(), label: "Guest Rating" }
//         ]);
//       } catch (error) {
//         console.error('Error fetching stats:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   const teamMembers = [
//     {
//       name: "Sarah Johnson",
//       role: "General Manager",
//       image: "/images/users/alkesh.jpg",
//       description: "With over 15 years of hospitality experience, Sarah leads our team with passion and dedication."
//     },
//     {
//       name: "Michael Chen",
//       role: "Operations Manager",
//       image: "/images/users/george.jpg",
//       description: "Michael ensures smooth day-to-day operations and exceptional guest experiences."
//     },
//     {
//       name: "Emily Rodriguez",
//       role: "Guest Relations Manager",
//       image: "/images/users/arlene.jpg",
//       description: "Emily specializes in creating personalized experiences for our valued guests."
//     },
//     {
//       name: "David Thompson",
//       role: "Maintenance Supervisor",
//       image: "/images/users/mark.jpg",
//       description: "David and his team maintain our facilities to the highest standards."
//     }
//   ];

//   const values = [
//     {
//       icon: "ph:heart",
//       title: "Excellence",
//       description: "We strive for excellence in every aspect of our service delivery."
//     },
//     {
//       icon: "ph:users",
//       title: "Hospitality",
//       description: "Genuine care and warmth in every guest interaction."
//     },
//     {
//       icon: "ph:shield-check",
//       title: "Quality",
//       description: "Maintaining the highest standards of cleanliness and comfort."
//     },
//     {
//       icon: "ph:star",
//       title: "Innovation",
//       description: "Continuously improving our services and guest experience."
//     }
//   ];

//   return (
//     <div className="container max-w-8xl mx-auto px-5 2xl:px-0 pt-32 md:pt-44 pb-14 md:pb-28 bg-white dark:bg-[#0D1117] transition-colors">
//       {/* Hero Section */}
//       <div className="mb-16">
//         <div className="flex gap-2.5 items-center justify-center mb-3">
//           <span>
//             <Icon
//               icon={'ph:house-simple-fill'}
//               width={20}
//               height={20}
//               className='text-[#1A73E8] dark:text-[#1A73E8]'
//             />
//           </span>
//           <p className='text-base font-semibold text-[#0B5ED7] dark:text-[#3D8BFF]'>
//             About Us
//           </p>
//         </div>
//         <div className='text-center'>
//           <h3 className='text-4xl sm:text-5xl font-medium tracking-tight text-[#1F1F1F] dark:text-[#E6E6E6] mb-3 leading-10 sm:leading-14'>
//             Welcome to Our Luxury Hotel
//           </h3>
//           <p className='text-lg font-normal text-[#1F1F1F]/80 dark:text-[#E6E6E6]/80 leading-7 max-w-3xl mx-auto'>
//             Discover the perfect blend of luxury, comfort, and exceptional service. 
//             Our hotel has been serving guests with dedication and warmth for over 15 years.
//           </p>
//         </div>
//       </div>

//       {/* Stats Section */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
//         {loading ? (
//           <>
//             {[1,2,3,4].map((index) => (
//               <div key={index} className="text-center p-6 bg-[#F5F5F5] dark:bg-[#161B22] rounded-xl shadow-lg">
//                 <div className="animate-pulse">
//                   <div className="h-8 bg-[#E0E0E0] dark:bg-[#2C2F36] rounded mb-2"></div>
//                   <div className="h-4 bg-[#E0E0E0] dark:bg-[#2C2F36] rounded"></div>
//                 </div>
//               </div>
//             ))}
//           </>
//         ) : (
//           stats.map((stat, index) => (
//             <div key={index} className="text-center p-6 bg-[#FFFFFF] dark:bg-[#161B22] rounded-xl shadow-lg transition-colors">
//               <div className="text-3xl font-bold text-[#1A73E8] dark:text-[#1A73E8] mb-2">{stat.number}</div>
//               <div className="text-sm text-[#1F1F1F]/80 dark:text-[#E6E6E6]/80">{stat.label}</div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Story Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
//         <div>
//           <h2 className="text-3xl font-bold text-[#1F1F1F] dark:text-[#E6E6E6] mb-6">Our Story</h2>
//           <div className="space-y-4 text-[#1F1F1F]/80 dark:text-[#E6E6E6]/80">
//             <p>
//               Founded in 2008, our hotel began as a small family-owned establishment with a simple mission: 
//               to provide exceptional hospitality experiences that make every guest feel at home.
//             </p>
//             <p>
//               Over the years, we've grown from a modest 10-room inn to a luxurious 25-room hotel, 
//               but our commitment to personalized service and attention to detail has never wavered.
//             </p>
//             <p>
//               Today, we continue to blend modern amenities with traditional hospitality values, 
//               creating memorable experiences for guests from around the world.
//             </p>
//           </div>
//         </div>
//         <div className="relative">
//           <Image
//             src="/images/hero/heroBanner.png"
//             alt="Hotel Exterior"
//             width={600}
//             height={400}
//             className="rounded-xl shadow-lg"
//             unoptimized
//           />
//         </div>
//       </div>

//       {/* Values Section */}
//       <div className="mb-16">
//         <h2 className="text-3xl font-bold text-[#1F1F1F] dark:text-[#E6E6E6] text-center mb-12">Our Values</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {values.map((value, index) => (
//             <div key={index} className="text-center p-6 bg-[#FFFFFF] dark:bg-[#161B22] rounded-xl shadow-lg transition-colors">
//               <div className="flex justify-center mb-4">
//                 <Icon
//                   icon={value.icon}
//                   width={40}
//                   height={40}
//                   className="text-[#1A73E8] dark:text-[#1A73E8]"
//                 />
//               </div>
//               <h3 className="text-xl font-semibold text-[#1F1F1F] dark:text-[#E6E6E6] mb-3">{value.title}</h3>
//               <p className="text-sm text-[#1F1F1F]/80 dark:text-[#E6E6E6]/80">{value.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Team Section */}
//       <div className="mb-16">
//         <h2 className="text-3xl font-bold text-[#1F1F1F] dark:text-[#E6E6E6] text-center mb-12">Meet Our Team</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {teamMembers.map((member, index) => (
//             <div key={index} className="bg-[#FFFFFF] dark:bg-[#161B22] rounded-xl shadow-lg overflow-hidden transition-colors">
//               <div className="relative h-48 bg-[#F5F5F5] dark:bg-[#2C2F36]">
//                 <Image
//                   src={member.image}
//                   alt={member.name}
//                   fill
//                   className="object-cover"
//                   unoptimized
//                 />
//               </div>
//               <div className="p-6">
//                 <h3 className="text-lg font-semibold text-[#1F1F1F] dark:text-[#E6E6E6] mb-1">{member.name}</h3>
//                 <p className="text-[#1A73E8] font-medium mb-3">{member.role}</p>
//                 <p className="text-sm text-[#1F1F1F]/80 dark:text-[#E6E6E6]/80">{member.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Mission Section */}
//       <div className="bg-[#1A73E8]/10 dark:bg-[#3D8BFF]/10 rounded-2xl p-8 mb-16 transition-colors">
//         <div className="text-center">
//           <h2 className="text-3xl font-bold text-[#1F1F1F] dark:text-[#E6E6E6] mb-6">Our Mission</h2>
//           <p className="text-lg text-[#1F1F1F]/80 dark:text-[#E6E6E6]/80 max-w-4xl mx-auto">
//             To provide exceptional hospitality experiences that exceed expectations, 
//             creating lasting memories for our guests while maintaining the highest standards 
//             of service, comfort, and luxury in every aspect of our operations.
//           </p>
//         </div>
//       </div>

//       {/* Contact CTA */}
//       <div className="text-center">
//         <h2 className="text-3xl font-bold text-[#1F1F1F] dark:text-[#E6E6E6] mb-4">Ready to Experience Luxury?</h2>
//         <p className="text-[#1F1F1F]/80 dark:text-[#E6E6E6]/80 mb-8 max-w-2xl mx-auto">
//           Book your stay with us and discover the perfect blend of comfort, luxury, and exceptional service.
//         </p>
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <Link href="/properties/book">
//             <button className="px-8 py-3 bg-[#1A73E8] text-white rounded-full font-semibold hover:opacity-90 transition-opacity">
//               Book Now
//             </button>
//           </Link>
//           <Link href="/contactus">
//             <button className="px-8 py-3 border border-[#1A73E8] text-[#1A73E8] rounded-full font-semibold hover:bg-[#1A73E8] hover:text-white transition-colors">
//               Contact Us
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }









// "use client";
// import { Icon } from '@iconify/react';
// import Image from 'next/image';
// import { useState, useEffect } from 'react';
// import Link from 'next/link';

// export default function AboutPageAlt() {
//   const [stats, setStats] = useState([
//     { number: "0", label: "Happy Guests", icon: "ph:smiley" },
//     { number: "0", label: "Luxury Rooms", icon: "ph:door" },
//     { number: "15+", label: "Years Experience", icon: "ph:clock" },
//     { number: "0.0", label: "Guest Rating", icon: "ph:star" }
//   ]);

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const usersRes = await fetch('http://localhost:3001/users/allusers');
//         const usersData = await usersRes.json();
//         const totalGuests = usersData.users?.filter((u:any) => u.role === 'guest').length || 0;

//         const roomsRes = await fetch('http://localhost:3001/allrooms');
//         const roomsData = await roomsRes.json();
//         const totalRooms = roomsData.rooms?.length || 0;

//         const reservationsRes = await fetch('http://localhost:3001/reservations/all');
//         const reservationsData = await reservationsRes.json();
//         const totalReservations = reservationsData.reservations?.length || 0;

//         const feedbackRes = await fetch('http://localhost:3001/feedback/all');
//         const feedbackData = await feedbackRes.json();
//         const feedbacks = feedbackData.feedback || [];

//         let avgRating = 0;
//         if (feedbacks.length > 0) {
//           const totalRating = feedbacks.reduce((sum:any, f:any) => sum + (f.rating || 0), 0);
//           avgRating = parseFloat((totalRating / feedbacks.length).toFixed(1));
//         }

//         setStats([
//           { number: `${totalGuests}+`, label: "Happy Guests", icon: "ph:smiley" },
//           { number: `${totalRooms}`, label: "Luxury Rooms", icon: "ph:door" },
//           { number: `${totalReservations}+`, label: "Total Reservations", icon: "ph:clock" },
//           { number: avgRating.toString(), label: "Guest Rating", icon: "ph:star" }
//         ]);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStats();
//   }, []);

//   const team = [
//     { name: "Sarah Johnson", role: "General Manager", image: "/images/users/alkesh.jpg" },
//     { name: "Michael Chen", role: "Operations Manager", image: "/images/users/george.jpg" },
//     { name: "Emily Rodriguez", role: "Guest Relations Manager", image: "/images/users/arlene.jpg" },
//     { name: "David Thompson", role: "Maintenance Supervisor", image: "/images/users/mark.jpg" }
//   ];

//   const values = [
//     { title: "Excellence", icon: "ph:diamond", description: "Strive for perfection in all services." },
//     { title: "Hospitality", icon: "ph:users", description: "Warmth and care in every interaction." },
//     { title: "Innovation", icon: "ph:lightbulb", description: "Always improving guest experience." },
//     { title: "Integrity", icon: "ph:shield-check", description: "Honest and reliable service standards." }
//   ];

//   return (
//     <div className="transition-colors">
//       {/* Hero Section */}
//       <section className="relative bg-gradient-to-r from-[#1A73E8]/90 to-[#0B5ED7]/90 text-white py-36 text-center">
//         <h1 className="text-5xl font-bold mb-4">Discover True Luxury</h1>
//         <p className="text-xl max-w-2xl mx-auto mb-8">Experience the perfect blend of elegance, comfort, and premium service at our hotel.</p>
//         <Link href="/properties/book">
//           <button className="px-10 py-4 bg-white text-[#1A73E8] font-semibold rounded-full hover:opacity-90 transition-opacity">Book Your Stay</button>
//         </Link>
//       </section>

//       {/* Stats Section */}
//       <section className="bg-[#F5F8FF] dark:bg-[#0D1117] py-20">
//         <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
//           {loading ? (
//             [1,2,3,4].map(i => (
//               <div key={i} className="animate-pulse h-40 rounded-xl bg-[#E0E0E0] dark:bg-[#2C2F36]"></div>
//             ))
//           ) : (
//             stats.map((stat, idx) => (
//               <div key={idx} className="bg-white dark:bg-[#161B22] p-6 rounded-full shadow-lg flex flex-col items-center justify-center hover:scale-105 transform transition-all">
//                 <Icon icon={stat.icon} width={40} height={40} className="text-[#1A73E8] mb-2"/>
//                 <h3 className="text-3xl font-bold text-[#1F1F1F] dark:text-[#E6E6E6]">{stat.number}</h3>
//                 <p className="text-[#1F1F1F]/70 dark:text-[#E6E6E6]/70 mt-1">{stat.label}</p>
//               </div>
//             ))
//           )}
//         </div>
//       </section>

//       {/* Story Section */}
//       <section className="py-28 max-w-6xl mx-auto space-y-20">
//         <div className="grid md:grid-cols-2 gap-12 items-center">
//           <div>
//             <h2 className="text-4xl font-bold text-[#1F1F1F] dark:text-[#E6E6E6] mb-4">Our Legacy</h2>
//             <p className="text-[#1F1F1F]/80 dark:text-[#E6E6E6]/80 mb-2">
//               Founded in 2008, we have grown from a cozy inn to a luxurious retreat, blending comfort with world-class hospitality.
//             </p>
//             <p className="text-[#1F1F1F]/80 dark:text-[#E6E6E6]/80">
//               Every guest is treated with care, ensuring an unforgettable stay with premium experiences.
//             </p>
//           </div>
//           <div className="rounded-xl overflow-hidden shadow-lg">
//             <Image src="/images/hero/heroBanner.png" width={600} height={400} className="object-cover" alt="Hotel" unoptimized />
//           </div>
//         </div>

//         <div className="grid md:grid-cols-2 gap-12 items-center">
//           <div className="rounded-xl overflow-hidden shadow-lg order-2 md:order-1">
//             <Image src="/images/hero/heroBanner.png" width={600} height={400} className="object-cover" alt="Hotel Interior" unoptimized />
//           </div>
//           <div className="order-1 md:order-2">
//             <h2 className="text-4xl font-bold text-[#1F1F1F] dark:text-[#E6E6E6] mb-4">Our Philosophy</h2>
//             <p className="text-[#1F1F1F]/80 dark:text-[#E6E6E6]/80 mb-2">
//               Every detail matters. From personalized service to luxurious amenities, we ensure every guest feels valued.
//             </p>
//             <p className="text-[#1F1F1F]/80 dark:text-[#E6E6E6]/80">
//               Innovation, comfort, and excellence guide our hospitality philosophy.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Values Section */}
//       <section className="bg-[#1A73E8]/10 dark:bg-[#3D8BFF]/10 py-24">
//         <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
//           {values.map((val, idx) => (
//             <div key={idx} className="bg-white dark:bg-[#161B22] p-8 rounded-xl shadow-lg hover:scale-105 transform transition-all">
//               <Icon icon={val.icon} width={50} height={50} className="text-[#1A73E8] mb-4"/>
//               <h3 className="text-2xl font-bold text-[#1F1F1F] dark:text-[#E6E6E6] mb-2">{val.title}</h3>
//               <p className="text-[#1F1F1F]/70 dark:text-[#E6E6E6]/70">{val.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Team Section */}
//       <section className="py-28 max-w-6xl mx-auto text-center">
//         <h2 className="text-4xl font-bold text-[#1F1F1F] dark:text-[#E6E6E6] mb-12">Meet Our Team</h2>
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
//           {team.map((member, idx) => (
//             <div key={idx} className="bg-[#F5F8FF] dark:bg-[#161B22] rounded-xl shadow-lg p-6 hover:scale-105 transform transition-all">
//               <div className="relative h-52 w-full mb-4 rounded-xl overflow-hidden">
//                 <Image src={member.image} alt={member.name} fill className="object-cover" unoptimized/>
//               </div>
//               <h3 className="text-xl font-semibold text-[#1F1F1F] dark:text-[#E6E6E6]">{member.name}</h3>
//               <p className="text-[#1A73E8] font-medium">{member.role}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="bg-[#1A73E8] dark:bg-[#1A73E8] py-20 text-center text-white">
//         <h2 className="text-4xl font-bold mb-4">Join Us for an Unforgettable Experience</h2>
//         <p className="text-lg mb-8 max-w-2xl mx-auto">Luxury, comfort, and exceptional service await you at our hotel.</p>
//         <Link href="/properties/book">
//           <button className="px-10 py-4 bg-white text-[#1A73E8] font-semibold rounded-full hover:opacity-90 transition-opacity">Book Now</button>
//         </Link>
//       </section>
//     </div>
//   );
// }




"use client";
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AboutPagePremiumFinal() {
  const [stats, setStats] = useState([
    { number: "0", label: "Happy Guests", icon: "ph:smiley" },
    { number: "0", label: "Luxury Rooms", icon: "ph:door" },
    { number: "15+", label: "Years Experience", icon: "ph:clock" },
    { number: "0.0", label: "Guest Rating", icon: "ph:star" }
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const usersRes = await fetch('http://localhost:3001/users/allusers');
        const usersData = await usersRes.json();
        const totalGuests = usersData.users?.filter((u: any) => u.role === 'guest').length || 0;

        const roomsRes = await fetch('http://localhost:3001/allrooms');
        const roomsData = await roomsRes.json();
        const totalRooms = roomsData.rooms?.length || 0;

        const reservationsRes = await fetch('http://localhost:3001/reservations/all');
        const reservationsData = await reservationsRes.json();
        const totalReservations = reservationsData.reservations?.length || 0;

        const feedbackRes = await fetch('http://localhost:3001/feedback/all');
        const feedbackData = await feedbackRes.json();
        const feedbacks = feedbackData.feedback || [];

        let avgRating = 0;
        if (feedbacks.length > 0) {
          const totalRating = feedbacks.reduce((sum: any, f: any) => sum + (f.rating || 0), 0);
          avgRating = parseFloat((totalRating / feedbacks.length).toFixed(1));
        }

        setStats([
          { number: `${totalGuests}+`, label: "Happy Guests", icon: "ph:smiley" },
          { number: `${totalRooms}`, label: "Luxury Rooms", icon: "ph:door" },
          { number: `${totalReservations}+`, label: "Total Reservations", icon: "ph:clock" },
          { number: avgRating.toString(), label: "Guest Rating", icon: "ph:star" }
        ]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const team = [
    { name: "Abdullah", role: "General Manager", image: "/images/users/user.jpg" },
    { name: "Abdullah Rao", role: "Operations Manager", image: "/images/users/user.jpg" },
    { name: "Ashhad Aijazi", role: "Guest Relations Manager", image: "/images/users/user.jpg" },
    { name: "Atifuddin", role: "Maintenance Supervisor", image: "/images/users/user.jpg" }
  ];

  const values = [
    { title: "Excellence", icon: "ph:diamond", description: "Strive for perfection in all services." },
    { title: "Hospitality", icon: "ph:users", description: "Warmth and care in every interaction." },
    { title: "Innovation", icon: "ph:lightbulb", description: "Always improving guest experience." },
    { title: "Integrity", icon: "ph:shield-check", description: "Honest and reliable service standards." }
  ];

  return (
    <div className="transition-colors bg-[#F5F0E1] text-[#3B2F2F] dark:bg-[#1E1B18] dark:text-[#F2E9E1]">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#F5EAD6] to-[#EADFC2] py-36 text-center dark:from-[#2C2723] dark:to-[#3A352F]">
        <h1 className="text-5xl font-bold mb-4">Discover True Luxury</h1>
        <p className="text-xl max-w-2xl mx-auto mb-8">Experience the perfect blend of elegance, comfort, and premium service at our hotel.</p>
        <Link href="/properties/book">
          <button className="px-10 py-4 bg-[#DCCAB0] text-[#3B2F2F] font-semibold rounded-full hover:opacity-90 transition-opacity dark:bg-[#A78256] dark:text-[#FFF5E1]">
            Book Your Stay
          </button>
        </Link>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {loading ? (
            [1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse h-44 rounded-2xl bg-[#E0E0E0] dark:bg-[#2C2B28]"></div>
            ))
          ) : (
            stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="bg-gradient-to-br from-[#F0E3D6] to-[#DCCAB0] dark:from-[#3A352F] dark:to-[#5B4E43]
                  p-8 rounded-2xl shadow-2xl flex flex-col items-center justify-center
                  hover:scale-105 transform transition-all duration-300"
              >
                <Icon icon={stat.icon} width={50} height={50} className="mb-3 text-[#A78256] dark:text-[#FFD700]" />
                <h3 className="text-3xl font-bold">{stat.number}</h3>
                <p className="mt-1 text-lg">{stat.label}</p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Story Section */}
      <section className="py-28 max-w-6xl mx-auto space-y-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-4">Our Legacy</h2>
            <p className="mb-2">
              Founded in 2008, we have grown from a cozy inn to a luxurious retreat, blending comfort with world-class hospitality.
            </p>
            <p>
              Every guest is treated with care, ensuring an unforgettable stay with premium experiences.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl bg-[#E0E0E0] dark:bg-[#2C2B28] p-2 hover:scale-105 transition-transform">
            <Image src="/images/hero/hotelfront.png" width={600} height={400} className="object-cover rounded-2xl" alt="Hotel" unoptimized />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden shadow-2xl bg-[#E0E0E0] dark:bg-[#2C2B28] p-2 hover:scale-105 transition-transform order-2 md:order-1">
            <Image src="/images/hero/hotelfront.png" width={600} height={400} className="object-cover rounded-2xl" alt="Hotel Interior" unoptimized />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-4xl font-bold mb-4">Our Philosophy</h2>
            <p className="mb-2">
              Every detail matters. From personalized service to luxurious amenities, we ensure every guest feels valued.
            </p>
            <p>
              Innovation, comfort, and excellence guide our hospitality philosophy.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
          {values.map((val, idx) => (
            <div 
              key={idx} 
              className="bg-gradient-to-br from-[#F0E3D6] to-[#DCCAB0] dark:from-[#3A352F] dark:to-[#5B4E43]
                p-8 rounded-2xl shadow-2xl hover:scale-105 transform transition-all duration-300"
            >
              <Icon icon={val.icon} width={50} height={50} className="mb-4 text-[#A78256] dark:text-[#FFD700]" />
              <h3 className="text-2xl font-bold mb-2">{val.title}</h3>
              <p>{val.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-28 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">Meet Our Team</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {team.map((member, idx) => (
            <div 
              key={idx} 
              className="bg-[#F0E8E0] dark:bg-[#3A352F] rounded-2xl shadow-2xl p-6 hover:scale-105 transition-transform hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)]"
            >
              <div className="relative h-52 w-full mb-4 rounded-2xl overflow-hidden p-2 bg-[#E0E0E0] dark:bg-[#2C2B28] hover:brightness-110 transition-all">
                <Image src={member.image} alt={member.name} fill className="object-cover rounded-2xl" unoptimized />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-[#3B2F2F] dark:text-[#FFD700] font-medium">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-20 text-center">
        <h2 className="text-4xl font-bold mb-4">Join Us for an Unforgettable Experience</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">Luxury, comfort, and exceptional service await you at our hotel.</p>
        <Link href="/properties/book">
          <button className="px-10 py-4 bg-[#CBB292] text-[#3B2F2F] font-semibold rounded-full hover:opacity-90 transition-opacity dark:bg-[#A78256] dark:text-[#FFF5E1]">Book Now</button>
        </Link>
      </section> */}
    </div>
  );
}
