// "use client";
// import React, { useState, useEffect } from "react";
// import { useRooms } from "@/hooks/useRooms";
// import Image from "next/image";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { MappedRoom } from "@/hooks/useRooms";
// import { useSearchParams } from "next/navigation";
// import { Dialog } from "@headlessui/react";
// import { useRole } from "@/hooks/useRole";
// import { useSystemSettings } from "@/hooks/useSystemSettings";
// import { calculateTotalPrice, getCurrentRoomRate, formatCurrency, calculateRoomRate } from "@/lib/roomPricing";
// export default function BookPage() {
//   const { rooms, loading } = useRooms();
//   const { data: session } = useSession();
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const urlRoomId = searchParams.get("room");
//   const { userRole } = useRole();
//   const { settings: systemSettings } = useSystemSettings();

//   // Helper to format date in Pakistan Standard Time (UTC+5)
//   function formatDatePakistan(date) {
//     // Get UTC time, then add 5 hours for Pakistan
//     const pkOffset = 5 * 60; // minutes
//     const local = new Date(date.getTime() + (pkOffset + date.getTimezoneOffset()) * 60000);
//     return local.toISOString().split("T")[0];
//   }

//   // Helper to get local date string in YYYY-MM-DD
//   function getLocalDateString(date) {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   }

//   const today = new Date();
//   const [dates, setDates] = useState({
//     checkin: getLocalDateString(today),
//     checkout: getLocalDateString(today),
//   });
//   const [availableRooms, setAvailableRooms] = useState<MappedRoom[]>([]);
//   const [checked, setChecked] = useState(false);
//   const [checking, setChecking] = useState(false);
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const [guests, setGuests] = useState(1);
//   const [confirming, setConfirming] = useState(false);
//   const [confirmed, setConfirmed] = useState(false);
//   const [error, setError] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [dateError, setDateError] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [modalRoom, setModalRoom] = useState<any>(null);
//   const [modalGuests, setModalGuests] = useState(1);
//   const [additionalServices, setAdditionalServices] = useState({
//     wakeup: false,
//     spa: false,
//     airport: false,
//     wakeupTime: "07:00",
//     airportTime: "09:00",
//   });
//   // Add state for guest/receptionist fields
//   const [guestPhone, setGuestPhone] = useState("");
//   const [recGuestName, setRecGuestName] = useState("");
//   const [recGuestEmail, setRecGuestEmail] = useState("");
//   const [recGuestPhone, setRecGuestPhone] = useState("");

//   useEffect(() => {
//     setChecked(false);
//     setAvailableRooms([]);
//     setSelectedRoom(null);
//     setError("");
//     setSuccessMsg("");
//     // Validate check-out date - must be equal to or greater than check-in
//     if (dates.checkout < dates.checkin) {
//       setDateError("Check-out date must be equal to or greater than check-in date.");
//     } else {
//       setDateError("");
//     }
//   }, [dates.checkin, dates.checkout]);

//   const handleDateChange = (e) => {
//     const { name, value } = e.target;
//     setDates((prev) => {
//       const newDates = { ...prev, [name]: value };

//       // Ensure checkout is always equal to or greater than checkin
//       if (name === 'checkin') {
//         // If checkout is now less than checkin, set it to checkin date (same day checkout allowed)
//         if (newDates.checkout < value) {
//           newDates.checkout = value;
//         }
//       } else if (name === 'checkout') {
//         // If checkout is set to a date before checkin, set it to checkin date
//         if (value < newDates.checkin) {
//           newDates.checkout = newDates.checkin;
//         }
//       }

//       return newDates;
//     });
//   };

//   // The checkAvailable function only fetches available rooms, does not create a reservation.
//   const checkAvailable = async () => {
//     if (dates.checkout < dates.checkin) {
//       setDateError("Check-out date must be equal to or greater than check-in date.");
//       return;
//     }
//     setChecking(true);
//     setChecked(false);
//     setAvailableRooms([]);
//     setError("");
//     setSuccessMsg("");
//     try {
//       const res = await fetch(
//         `http://localhost:3001/reservations/available?checkin=${dates.checkin}&checkout=${dates.checkout}`
//       );
//       if (!res.ok) throw new Error("Failed to check availability");
//       const data = await res.json();
//       console.log('🔍 Frontend - Available rooms response:', data);
//       console.log('🔍 Frontend - Available rooms count:', data.availableRooms?.length || 0);
//       // Use the data directly from backend - it should already filter out rooms with reservations
//       setAvailableRooms(data.availableRooms || []);
//       setChecked(true);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Error checking availability.");
//     } finally {
//       setChecking(false);
//     }
//   };

//   const openModal = (room: any) => {
//     setModalRoom(room);
//     setModalGuests(guests);
//     setShowModal(true);
//   };
//   const closeModal = () => {
//     setShowModal(false);
//     setModalRoom(null);
//     setAdditionalServices({ wakeup: false, spa: false, airport: false, wakeupTime: "07:00", airportTime: "09:00" });
//     setGuestPhone("");
//     setRecGuestName("");
//     setRecGuestEmail("");
//     setRecGuestPhone("");
//   };

//   const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, checked, value, type } = e.target;
//     setAdditionalServices((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   // Calculate nights and total price
//   const getNights = () => {
//     const d1 = new Date(dates.checkin);
//     const d2 = new Date(dates.checkout);
//     return Math.max(1, Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)));
//   };

//   // Calculate detailed breakdown of costs
//   const getDetailedBreakdown = (room: any) => {
//     const nights = getNights();

//     // Calculate room amount (nights × rate, not multiplied by guests)
//     let roomAmount = 0;
//     if (systemSettings && room.roomType) {
//       // Use dynamic pricing for each night
//       const currentDate = new Date(dates.checkin);
//       for (let i = 0; i < nights; i++) {
//         const nightlyRate = calculateRoomRate(room.roomType, new Date(currentDate), systemSettings);
//         roomAmount += nightlyRate;
//         currentDate.setDate(currentDate.getDate() + 1);
//       }
//     } else {
//       // Fallback to original calculation
//       roomAmount = Number(room.rate) * nights;
//     }

//     // Calculate additional services
//     let servicesAmount = 0;
//     const servicesBreakdown: Array<{ name: string; amount: number }> = [];

//     if (additionalServices.spa) {
//       servicesAmount += 50;
//       servicesBreakdown.push({ name: 'Spa Appointment', amount: 50 });
//     }
//     if (additionalServices.airport) {
//       servicesAmount += 30;
//       servicesBreakdown.push({ name: 'Airport Pickup', amount: 30 });
//     }
//     if (additionalServices.wakeup) {
//       servicesAmount += 10;
//       servicesBreakdown.push({ name: 'Wake-up Call', amount: 10 });
//     }

//     // Calculate tax from settings
//     let taxAmount = 0;
//     const taxBreakdown: Array<{ name: string; amount: number }> = [];
//     if (systemSettings && systemSettings.taxes) {
//       const taxes = systemSettings.taxes;
//       const subtotal = roomAmount + servicesAmount;

//       if (taxes.taxRate) {
//         const taxRate = taxes.taxRate;
//         taxAmount += (subtotal * taxRate) / 100;
//         taxBreakdown.push({ name: `Tax (${taxRate}%)`, amount: (subtotal * taxRate) / 100 });
//       }
//       if (taxes.serviceCharge) {
//         taxAmount += taxes.serviceCharge;
//         taxBreakdown.push({ name: 'Service Charge', amount: taxes.serviceCharge });
//       }
//       if (taxes.cityTax) {
//         taxAmount += taxes.cityTax;
//         taxBreakdown.push({ name: 'City Tax', amount: taxes.cityTax });
//       }
//       if (taxes.stateTax) {
//         taxAmount += taxes.stateTax;
//         taxBreakdown.push({ name: 'State Tax', amount: taxes.stateTax });
//       }
//     }

//     const total = roomAmount + servicesAmount + taxAmount;

//     return {
//       roomAmount,
//       servicesAmount,
//       servicesBreakdown,
//       taxAmount,
//       taxBreakdown,
//       total,
//       nights
//     };
//   };

//   const getTotal = (room: any) => {
//     // Use system settings for pricing if available, otherwise fallback to room.rate
//     if (systemSettings && room.roomType) {
//       return calculateTotalPrice(
//         room.roomType,
//         new Date(dates.checkin),
//         new Date(dates.checkout),
//         1, // Don't multiply by guests for room amount
//         additionalServices,
//         systemSettings
//       );
//     } else {
//       // Fallback to original calculation
//       let total = Number(room.rate) * getNights(); // Not multiplied by guests
//       if (additionalServices.spa) total += 50;
//       if (additionalServices.airport) total += 30;
//       if (additionalServices.wakeup) total += 10;
//       return total;
//     }
//   };

//   // Only allow guest and receptionist to book
//   const canBook = userRole === "guest" || userRole === "receptionist";

//   // The handleBook function is only called when the user clicks 'Confirm Booking' in the modal.
//   const handleBook = async () => {
//     if (!session?.user) {
//       setError("You must be signed in to book a room.");
//       return;
//     }
//     if (!canBook) {
//       setError("Only guests and receptionists can make reservations.");
//       return;
//     }
//     if (userRole === "guest" && !guestPhone) {
//       setError("Please enter your phone number.");
//       return;
//     }
//     if (userRole === "receptionist" && (!recGuestName || !recGuestEmail || !recGuestPhone)) {
//       setError("Please enter guest name, email, and phone number.");
//       return;
//     }
//     setConfirming(true);
//     setError("");
//     setSuccessMsg("");
//     try {
//       const breakdown = getDetailedBreakdown(modalRoom);
//       const total = breakdown.total;

//       // 1. Create reservation first (now includes price)
//       const reservationData = {
//           room: (modalRoom as any)._id || (modalRoom as any).slug,
//           guestName: userRole === "receptionist" ? recGuestName : session.user.name,
//           guestEmail: userRole === "receptionist" ? recGuestEmail : session.user.email,
//         guestId: session.user.id,
//           guestPhone: userRole === "guest" ? guestPhone : recGuestPhone,
//           checkin: dates.checkin,
//           checkout: dates.checkout,
//           guests: modalGuests,
//         additionalServices,
//         price: total,
//         role: userRole, // Send user role to backend
//       };

//       const reservationRes = await fetch("http://localhost:3001/reservations", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(reservationData),
//       });
//       const reservationResult = await reservationRes.json();
//       if (!reservationRes.ok) throw new Error(reservationResult.message || "Failed to create reservation");

//       if (userRole === "guest") {
//         // 2. Create Stripe session, pass reservationId
//         const stripeRes = await fetch("http://localhost:3001/create-checkout-session", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             amount: total,
//             reservationId: reservationResult.reservation.reservationId,
//           }),
//         });
//         const stripeData = await stripeRes.json();
//         if (!stripeRes.ok) throw new Error(stripeData.error || "Failed to create Stripe session");
//         // 3. Redirect to Stripe
//         window.location.href = stripeData.url;
//       } else if (userRole === "receptionist") {
//         // Redirect to reservations table with success message
//         router.push("/reservation-table?created=1");
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Booking failed.");
//     } finally {
//       setConfirming(false);
//     }
//   };

//   // Filter rooms if room ID is in URL
//   let displayRooms = rooms;
//   if (urlRoomId) {
//     displayRooms = rooms.filter((room) => (room as any)._id === urlRoomId || (room as any).slug === urlRoomId);
//   }
//   // If checked, show all displayRooms, but mark available/unavailable
//   let availableIds = availableRooms.map((r) => (r as any)._id || (r as any).slug);
//   const isSingleRoom = displayRooms.length === 1;
//   const isLoggedIn = !!session?.user;

//   // Helper for status label and color
//   const getStatusLabel = (status: string) => {
//     switch (status) {
//       case "Available":
//         return <span className="text-green-600 font-semibold">Available</span>;
//       case "Cleaning":
//         return <span className="text-yellow-500 font-semibold">Cleaning (Not Available)</span>;
//       case "Clean":
//         return <span className="text-blue-500 font-semibold">Clean</span>;
//       case "Maintenance":
//         return <span className="text-orange-500 font-semibold">Maintenance (Not Available)</span>;
//       case "Occupied":
//         return <span className="text-red-500 font-semibold">Occupied (Not Available)</span>;
//       default:
//         return <span className="text-gray-500 font-semibold">Unknown</span>;
//     }
//   };

//   return (
//     <section className="!pt-44 pb-20 min-h-screen bg-gray-50 dark:bg-gray-900">
//       <div className="container mx-auto max-w-5xl px-5 2xl:px-0">
//         <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 mb-10">
//           <h1 className="text-3xl font-bold mb-4 text-dark dark:text-white text-center">Book Your Stay</h1>
//           <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
//             <input
//               type="date"
//               name="checkin"
//               value={dates.checkin}
//               onChange={handleDateChange}
//               required
//               min={getLocalDateString(today)}
//               className="px-4 py-3 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full md:w-auto"
//             />
//             <input
//               type="date"
//               name="checkout"
//               value={dates.checkout}
//               onChange={handleDateChange}
//               required
//               min={dates.checkin}
//               className="px-4 py-3 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full md:w-auto"
//             />
//             <button
//               type="button"
//               onClick={checkAvailable}
//               className="py-3 px-8 bg-primary text-white rounded-full text-center hover:bg-dark duration-300 text-base font-semibold w-full md:w-auto"
//               disabled={checking || !dates.checkin || !dates.checkout || !!dateError}
//             >
//               {checking ? "Checking..." : "Check Available"}
//             </button>
//           </div>
//           {dateError && <div className="text-red-500 text-center font-medium mt-2">{dateError}</div>}
//         </div>
//         {error && <div className="text-red-500 text-center font-medium mb-4">{error}</div>}
//         {successMsg && <div className="text-green-600 text-center font-medium mb-4">{successMsg}</div>}
//         <div className={isSingleRoom ? "grid grid-cols-1" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"}>
//           {displayRooms.map((room) => {
//             const roomId = (room as any)._id || (room as any).slug;
//             const isAvailable = checked ? availableIds.includes(roomId) : true;
//             let imageSrc = "/images/properties/vector.svg";
//             if (room.images && room.images.length > 0) {
//               if (typeof room.images[0] === "string") imageSrc = room.images[0] as string;
//               else if (typeof room.images[0] === "object" && "src" in room.images[0]) imageSrc = (room.images[0] as any).src;
//             }
//             return (
//               <div key={roomId} className={isSingleRoom ? "bg-white dark:bg-gray-800 rounded-2xl shadow p-8 flex flex-col gap-4 w-full" : "bg-white dark:bg-gray-800 rounded-2xl shadow p-6 flex flex-col gap-4"}>
//                 <Image
//                   src={imageSrc}
//                   alt={room.name}
//                   width={isSingleRoom ? 600 : 320}
//                   height={isSingleRoom ? 350 : 200}
//                   className={isSingleRoom ? "rounded-xl w-full h-80 object-cover" : "rounded-xl w-full h-48 object-cover"}
//                   unoptimized={true}
//                 />
//                 <h2 className="text-xl font-semibold text-dark dark:text-white mb-1">{room.name}</h2>
//                 <p className="text-dark/60 dark:text-white/60 mb-1">{room.roomType}</p>
//                 <p className="text-dark/60 dark:text-white/60 mb-1">{room.beds} Beds • {room.baths} Baths • {room.area}m²</p>
//                 <p className="text-primary font-bold text-lg mb-2">
//                   {systemSettings && room.roomType 
//                     ? formatCurrency(getCurrentRoomRate(room.roomType, systemSettings), systemSettings) + ' / night'
//                     : `${room.rate} / night`
//                   }
//                 </p>
//                 {/* Show room status */}
//                 <div className="mb-2">Status: {getStatusLabel(room.status || "Unknown")}</div>
//                 {checked && (
//                   <div className="mb-2">
//                     {isAvailable ? (
//                       <span className="text-green-600 font-semibold">This room is available.</span>
//                     ) : (
//                       // Prioritize status first, then date, then both
//                       (() => {
//                         const status = room.status || "Unknown";
//                         const statusNotAvailableOrClean = status !== "Available" && status !== "Clean";
//                         const dateNotAvailable = !availableIds.includes(roomId);
//                         if (statusNotAvailableOrClean && dateNotAvailable) {
//                           return (
//                            <span className="text-red-500 font-semibold">
//   {status === 'Occupied' && 'This room is currently occupied.'}
//   {status === 'Cleaning' && 'This room is currently under cleaning.'}
//   {status === 'Maintenance' && 'This room is currently under maintenance.'}
// </span>
//                           );
//                         } else if (statusNotAvailableOrClean) {
//                           return (
//                             <span className="text-red-500 font-semibold">
//                               This room is under {status} now.
//                             </span>
//                           );
//                         } else if (dateNotAvailable) {
//                           return (
//                             <span className="text-red-500 font-semibold">
//                               This room is not available for the selected dates.
//                             </span>
//                           );
//                         } else {
//                           return null;
//                         }
//                       })()
//                     )}
//                   </div>
//                 )}
//                 {isAvailable && checked ? (
//                   <>
//                     <label className="block font-medium mb-1">Guests</label>
//                     <input
//                       type="number"
//                       min={1}
//                       max={room.capacity || 10}
//                       value={guests}
//                       onChange={(e) => setGuests(Number(e.target.value))}
//                       className="px-3 py-2 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full mb-2"
//                     />
//                     <button
//                       className="py-3 px-6 bg-primary text-white rounded-full text-center hover:bg-dark duration-300 text-base font-semibold w-full"
//                       onClick={() => isLoggedIn ? openModal(room) : setShowModal(true)}
//                       disabled={confirming}
//                     >
//                       Book Now
//                     </button>
//                   </>
//                 ) : checked ? null : null}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//       {showModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center">
//           <div className="fixed inset-0 bg-black bg-opacity-40" style={{ zIndex: 40 }} onClick={closeModal}></div>
//           <div className="relative z-50 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full mx-auto p-8 flex flex-col gap-4 animate-fade-in max-h-[80vh] overflow-y-auto">
//             <button onClick={closeModal} className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-dark dark:hover:text-white transition-colors">&times;</button>
//             {!isLoggedIn ? (
//               <div className="flex flex-col items-center justify-center gap-4 py-8">
//                 <h2 className="text-2xl font-bold text-dark dark:text-white mb-2">Sign in to Book</h2>
//                 <p className="text-dark/70 dark:text-white/70 mb-4">You must be logged in to book a room.</p>
//                 <a href="/signin" className="py-3 px-8 bg-primary text-white rounded-full text-center hover:bg-dark duration-300 text-base font-semibold">Login</a>
//               </div>
//             ) : modalRoom && canBook && (
//               <>
//                 <h2 className="text-2xl font-bold mb-4 text-dark dark:text-white text-center">Confirm Your Booking</h2>
//                 <div className="mb-4">
//                   <Image
//                     src={modalRoom.images && modalRoom.images.length > 0 && typeof modalRoom.images[0] === 'object' && 'src' in modalRoom.images[0] ? modalRoom.images[0].src : (typeof modalRoom.images[0] === 'string' ? modalRoom.images[0] : "/images/properties/vector.svg")}
//                     alt={modalRoom.name}
//                     width={400}
//                     height={250}
//                     className="rounded-xl w-full h-48 object-cover mb-2"
//                     unoptimized={true}
//                   />
//                   <div className="mb-2 text-dark dark:text-white">
//                     <b>Room:</b> {modalRoom.name}<br />
//                     <b>Type:</b> {modalRoom.roomType}<br />
//                     <b>Rate:</b> {modalRoom.rate} / night<br />
//                     <b>Guests:</b> {modalGuests}<br />
//                     <b>Check-in:</b> {dates.checkin}<br />
//                     <b>Check-out:</b> {dates.checkout}<br />
//                   </div>
//                   <div className="mb-4">
//                     <b>Additional Services:</b>
//                     <div className="flex flex-col gap-2 mt-2">
//                       <label className="flex items-center gap-2">
//                         <input type="checkbox" name="wakeup" checked={additionalServices.wakeup} onChange={handleServiceChange} />
//                         Wake-up Call
//                         {additionalServices.wakeup && (
//                           <input type="time" name="wakeupTime" value={additionalServices.wakeupTime} onChange={handleServiceChange} className="ml-2 px-2 py-1 border rounded" />
//                         )}
//                       </label>
//                       <label className="flex items-center gap-2">
//                         <input type="checkbox" name="spa" checked={additionalServices.spa} onChange={handleServiceChange} />
//                         Spa Appointment (+$50)
//                       </label>
//                       <label className="flex items-center gap-2">
//                         <input type="checkbox" name="airport" checked={additionalServices.airport} onChange={handleServiceChange} />
//                         Airport Pickup (+$30)
//                         {additionalServices.airport && (
//                           <input type="time" name="airportTime" value={additionalServices.airportTime} onChange={handleServiceChange} className="ml-2 px-2 py-1 border rounded" />
//                         )}
//                       </label>
//                     </div>
//                   </div>
//                   {/* Detailed Amount Breakdown */}
//                   <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
//                     <h3 className="font-bold text-dark dark:text-white mb-3">Amount Breakdown</h3>
//                     {(() => {
//                       const breakdown = getDetailedBreakdown(modalRoom);
//                       return (
//                         <div className="space-y-2 text-sm">
//                           {/* Room Amount */}
//                           <div className="flex justify-between">
//                             <span className="text-dark dark:text-white">
//                               Room ({breakdown.nights} nights):
//                             </span>
//                             <span className="font-semibold text-dark dark:text-white">
//                               ${breakdown.roomAmount.toFixed(2)}
//                             </span>
//                           </div>

//                           {/* Additional Services */}
//                           {breakdown.servicesBreakdown.length > 0 && (
//                             <>
//                               <div className="text-dark dark:text-white font-medium">Additional Services:</div>
//                               {breakdown.servicesBreakdown.map((service, index) => (
//                                 <div key={index} className="flex justify-between ml-4">
//                                   <span className="text-dark dark:text-white">{service.name}:</span>
//                                   <span className="font-semibold text-dark dark:text-white">${service.amount.toFixed(2)}</span>
//                                 </div>
//                               ))}
//                             </>
//                           )}

//                           {/* Tax Breakdown */}
//                           {breakdown.taxBreakdown.length > 0 && (
//                             <>
//                               <div className="text-dark dark:text-white font-medium">Taxes & Charges:</div>
//                               {breakdown.taxBreakdown.map((tax, index) => (
//                                 <div key={index} className="flex justify-between ml-4">
//                                   <span className="text-dark dark:text-white">{tax.name}:</span>
//                                   <span className="font-semibold text-dark dark:text-white">${tax.amount.toFixed(2)}</span>
//                                 </div>
//                               ))}
//                             </>
//                           )}

//                           {/* Total */}
//                           <div className="border-t border-gray-300 dark:border-gray-600 pt-2 mt-3">
//                             <div className="flex justify-between text-lg font-bold text-primary">
//                               <span>Total:</span>
//                               <span>${breakdown.total.toFixed(2)}</span>
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })()}
//                   </div>
//                   {/* Role-based fields */}
//                   {userRole === "guest" && (
//                     <div className="mb-2">
//                       <label className="block font-medium mb-1">Phone Number</label>
//                       <input
//                         type="tel"
//                         value={guestPhone}
//                         required
//                         onChange={e => setGuestPhone(e.target.value)}
//                         className="px-3 py-2 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full mb-2"
//                         placeholder="Enter your phone number"
//                       />
//                     </div>
//                   )}
//                   {userRole === "receptionist" && (
//                     <>
//                       <div className="mb-2">
//                         <label className="block font-medium mb-1">Guest Name</label>
//                         <input
//                           type="text"
//                           value={recGuestName}
//                           onChange={e => setRecGuestName(e.target.value)}
//                           required
//                           className="px-3 py-2 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full mb-2"
//                           placeholder="Enter guest name"
//                         />
//                       </div>
//                       <div className="mb-2">
//                         <label className="block font-medium mb-1">Guest Email</label>
//                         <input
//                           type="email"
//                           value={recGuestEmail}
//                           onChange={e => setRecGuestEmail(e.target.value)}
//                           required
//                           className="px-3 py-2 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full mb-2"
//                           placeholder="Enter guest email"
//                         />
//                       </div>
//                       <div className="mb-2">
//                         <label className="block font-medium mb-1">Guest Phone Number</label>
//                         <input
//                           type="tel"
//                           value={recGuestPhone}
//                           onChange={e => setRecGuestPhone(e.target.value)}
//                           required
//                           className="px-3 py-2 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full mb-2"
//                           placeholder="Enter guest phone number"
//                         />
//                       </div>
//                     </>
//                   )}
//                   <div className="flex gap-4">
//                     <button
//                       className="py-3 px-6 bg-primary text-white rounded-full text-center hover:bg-dark duration-300 text-base font-semibold w-full"
//                       onClick={handleBook}
//                       disabled={confirming}
//                     >
//                       {confirming ? "Booking..." : "Confirm Booking"}
//                     </button>
//                     <button
//                       className="py-3 px-6 bg-gray-300 text-dark rounded-full text-center hover:bg-gray-400 duration-300 text-base font-semibold w-full"
//                       onClick={closeModal}
//                       disabled={confirming}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               </>
//             )}
//             {/* If not allowed to book, show message */}
//             {modalRoom && !canBook && (
//               <div className="flex flex-col items-center justify-center gap-4 py-8">
//                 <h2 className="text-2xl font-bold text-dark dark:text-white mb-2">Not Allowed</h2>
//                 <p className="text-dark/70 dark:text-white/70 mb-4">Only guests and receptionists can make reservations.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }






// "use client";
// import React, { useState, useEffect } from "react";
// import { useRooms } from "@/hooks/useRooms";
// import Image from "next/image";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useSearchParams } from "next/navigation";
// import { useRole } from "@/hooks/useRole";
// import { useSystemSettings } from "@/hooks/useSystemSettings";
// import { calculateTotalPrice, getCurrentRoomRate, formatCurrency, calculateRoomRate } from "@/lib/roomPricing";

// export default function BookPage() {
//   const { rooms, loading } = useRooms();
//   const { data: session } = useSession();
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const urlRoomId = searchParams.get("room");
//   const { userRole } = useRole();
//   const { settings: systemSettings } = useSystemSettings();

//   function getLocalDateString(date) {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   }

//   const today = new Date();
//   const [dates, setDates] = useState({
//     checkin: getLocalDateString(today),
//     checkout: getLocalDateString(today),
//   });
//   const [availableRooms, setAvailableRooms] = useState([]);
//   const [checked, setChecked] = useState(false);
//   const [checking, setChecking] = useState(false);
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const [guests, setGuests] = useState(1);
//   const [confirming, setConfirming] = useState(false);
//   const [error, setError] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [dateError, setDateError] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [modalRoom, setModalRoom] = useState<any>(null);
//   const [modalGuests, setModalGuests] = useState(1);
//   const [additionalServices, setAdditionalServices] = useState({
//     wakeup: false,
//     spa: false,
//     airport: false,
//     wakeupTime: "07:00",
//     airportTime: "09:00",
//   });
//   const [guestPhone, setGuestPhone] = useState("");
//   const [recGuestName, setRecGuestName] = useState("");
//   const [recGuestEmail, setRecGuestEmail] = useState("");
//   const [recGuestPhone, setRecGuestPhone] = useState("");

//   useEffect(() => {
//     setChecked(false);
//     setAvailableRooms([]);
//     setSelectedRoom(null);
//     setError("");
//     setSuccessMsg("");
//     if (dates.checkout < dates.checkin) {
//       setDateError("Check-out date must be equal to or greater than check-in date.");
//     } else {
//       setDateError("");
//     }
//   }, [dates.checkin, dates.checkout]);

//   const handleDateChange = (e) => {
//     const { name, value } = e.target;
//     setDates((prev) => {
//       const newDates = { ...prev, [name]: value };
//       if (name === 'checkin' && newDates.checkout < value) newDates.checkout = value;
//       if (name === 'checkout' && value < newDates.checkin) newDates.checkout = newDates.checkin;
//       return newDates;
//     });
//   };

//   const checkAvailable = async () => {
//     if (dates.checkout < dates.checkin) {
//       setDateError("Check-out date must be equal to or greater than check-in date.");
//       return;
//     }
//     setChecking(true);
//     setChecked(false);
//     setAvailableRooms([]);
//     setError("");
//     setSuccessMsg("");
//     try {
//       const res = await fetch(
//         `http://localhost:3001/reservations/available?checkin=${dates.checkin}&checkout=${dates.checkout}`
//       );
//       if (!res.ok) throw new Error("Failed to check availability");
//       const data = await res.json();
//       setAvailableRooms(data.availableRooms || []);
//       setChecked(true);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Error checking availability.");
//     } finally {
//       setChecking(false);
//     }
//   };

//   const openModal = (room: any) => {
//     setModalRoom(room);
//     setModalGuests(guests);
//     setShowModal(true);
//   };
//   const closeModal = () => {
//     setShowModal(false);
//     setModalRoom(null);
//     setAdditionalServices({ wakeup: false, spa: false, airport: false, wakeupTime: "07:00", airportTime: "09:00" });
//     setGuestPhone("");
//     setRecGuestName("");
//     setRecGuestEmail("");
//     setRecGuestPhone("");
//   };

//   const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, checked, value, type } = e.target;
//     setAdditionalServices((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const getNights = () => {
//     const d1 = new Date(dates.checkin);
//     const d2 = new Date(dates.checkout);
//     return Math.max(1, Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)));
//   };

//   const getDetailedBreakdown = (room: any) => {
//     const nights = getNights();
//     let roomAmount = 0;
//     if (systemSettings && room.roomType) {
//       const currentDate = new Date(dates.checkin);
//       for (let i = 0; i < nights; i++) {
//         const nightlyRate = calculateRoomRate(room.roomType, new Date(currentDate), systemSettings);
//         roomAmount += nightlyRate;
//         currentDate.setDate(currentDate.getDate() + 1);
//       }
//     } else roomAmount = Number(room.rate) * nights;

//     let servicesAmount = 0;
//     const servicesBreakdown: Array<{ name: string; amount: number }> = [];
//     if (additionalServices.spa) { servicesAmount += 50; servicesBreakdown.push({ name: 'Spa Appointment', amount: 50 }); }
//     if (additionalServices.airport) { servicesAmount += 30; servicesBreakdown.push({ name: 'Airport Pickup', amount: 30 }); }
//     if (additionalServices.wakeup) { servicesAmount += 10; servicesBreakdown.push({ name: 'Wake-up Call', amount: 10 }); }

//     let taxAmount = 0;
//     const taxBreakdown: Array<{ name: string; amount: number }> = [];
//     if (systemSettings?.taxes) {
//       const taxes = systemSettings.taxes;
//       const subtotal = roomAmount + servicesAmount;
//       if (taxes.taxRate) { taxAmount += (subtotal * taxes.taxRate) / 100; taxBreakdown.push({ name: `Tax (${taxes.taxRate}%)`, amount: (subtotal * taxes.taxRate) / 100 }); }
//       if (taxes.serviceCharge) { taxAmount += taxes.serviceCharge; taxBreakdown.push({ name: 'Service Charge', amount: taxes.serviceCharge }); }
//       if (taxes.cityTax) { taxAmount += taxes.cityTax; taxBreakdown.push({ name: 'City Tax', amount: taxes.cityTax }); }
//       if (taxes.stateTax) { taxAmount += taxes.stateTax; taxBreakdown.push({ name: 'State Tax', amount: taxes.stateTax }); }
//     }

//     return { roomAmount, servicesAmount, servicesBreakdown, taxAmount, taxBreakdown, total: roomAmount + servicesAmount + taxAmount, nights };
//   };

//   const getTotal = (room: any) => {
//     if (systemSettings && room.roomType) {
//       return calculateTotalPrice(
//         room.roomType,
//         new Date(dates.checkin),
//         new Date(dates.checkout),
//         1,
//         additionalServices,
//         systemSettings
//       );
//     } else {
//       let total = Number(room.rate) * getNights();
//       if (additionalServices.spa) total += 50;
//       if (additionalServices.airport) total += 30;
//       if (additionalServices.wakeup) total += 10;
//       return total;
//     }
//   };

//   const canBook = userRole === "guest" || userRole === "receptionist";

//   const handleBook = async () => {
//     if (!session?.user) { setError("You must be signed in to book a room."); return; }
//     if (!canBook) { setError("Only guests and receptionists can make reservations."); return; }
//     if (userRole === "guest" && !guestPhone) { setError("Please enter your phone number."); return; }
//     if (userRole === "receptionist" && (!recGuestName || !recGuestEmail || !recGuestPhone)) { setError("Please enter guest name, email, and phone number."); return; }

//     setConfirming(true);
//     setError(""); setSuccessMsg("");

//     try {
//       const breakdown = getDetailedBreakdown(modalRoom);
//       const total = breakdown.total;

//       const reservationData = {
//         room: modalRoom._id || modalRoom.slug,
//         guestName: userRole === "receptionist" ? recGuestName : session.user.name,
//         guestEmail: userRole === "receptionist" ? recGuestEmail : session.user.email,
//         guestId: session.user.id,
//         guestPhone: userRole === "guest" ? guestPhone : recGuestPhone,
//         checkin: dates.checkin,
//         checkout: dates.checkout,
//         guests: modalGuests,
//         additionalServices,
//         price: total,
//         role: userRole,
//       };

//       const reservationRes = await fetch("http://localhost:3001/reservations", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(reservationData),
//       });
//       const reservationResult = await reservationRes.json();
//       if (!reservationRes.ok) throw new Error(reservationResult.message || "Failed to create reservation");

//       if (userRole === "guest") {
//         const stripeRes = await fetch("http://localhost:3001/create-checkout-session", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ amount: total, reservationId: reservationResult.reservation.reservationId }),
//         });
//         const stripeData = await stripeRes.json();
//         if (!stripeRes.ok) throw new Error(stripeData.error || "Failed to create Stripe session");
//         window.location.href = stripeData.url;
//       } else if (userRole === "receptionist") {
//         router.push("/reservation-table?created=1");
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Booking failed.");
//     } finally {
//       setConfirming(false);
//     }
//   };

//   let displayRooms = rooms;
//   if (urlRoomId) displayRooms = rooms.filter((room) => room._id === urlRoomId || room.slug === urlRoomId);

//   let availableIds = availableRooms.map((r) => r._id || r.slug);
//   const isSingleRoom = displayRooms.length === 1;
//   const isLoggedIn = !!session?.user;

//   const getStatusLabel = (status: string) => {
//     switch (status) {
//       case "Available": return <span className="text-green-600 font-semibold">Available</span>;
//       case "Cleaning": return <span className="text-yellow-500 font-semibold">Cleaning</span>;
//       case "Clean": return <span className="text-blue-500 font-semibold">Clean</span>;
//       case "Maintenance": return <span className="text-orange-500 font-semibold">Maintenance</span>;
//       case "Occupied": return <span className="text-red-500 font-semibold">Occupied</span>;
//       default: return <span className="text-gray-500 font-semibold">Unknown</span>;
//     }
//   };

//   return (
//     <section className="!pt-44 pb-20 min-h-screen bg-light dark:bg-dark">
//       <div className="container mx-auto max-w-6xl px-5 2xl:px-0">
//         <div className="bg-white dark:bg-darkCard rounded-2xl shadow-lg p-8 mb-10">
//           <h1 className="text-3xl font-bold mb-4 text-primary dark:text-primaryLight text-center">Book Your Stay</h1>
//           <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
//             <input
//               type="date"
//               name="checkin"
//               value={dates.checkin}
//               onChange={handleDateChange}
//               required
//               min={getLocalDateString(today)}
//               className="px-4 py-3 border border-lightBorder dark:border-darkBorder rounded-full outline-primary focus:outline w-full md:w-auto bg-lightInput dark:bg-darkInput text-dark dark:text-light"
//             />
//             <input
//               type="date"
//               name="checkout"
//               value={dates.checkout}
//               onChange={handleDateChange}
//               required
//               min={dates.checkin}
//               className="px-4 py-3 border border-lightBorder dark:border-darkBorder rounded-full outline-primary focus:outline w-full md:w-auto bg-lightInput dark:bg-darkInput text-dark dark:text-light"
//             />
//             <button
//               type="button"
//               onClick={checkAvailable}
//               className="py-3 px-8 bg-primary text-white rounded-full text-center hover:bg-primaryDark duration-300 text-base font-semibold w-full md:w-auto"
//               disabled={checking || !dates.checkin || !dates.checkout || !!dateError}
//             >
//               {checking ? "Checking..." : "Check Available"}
//             </button>
//           </div>
//           {dateError && <div className="text-red-500 text-center font-medium mt-2">{dateError}</div>}
//         </div>

//         {error && <div className="text-red-500 text-center font-medium mb-4">{error}</div>}
//         {successMsg && <div className="text-green-600 text-center font-medium mb-4">{successMsg}</div>}

//         <div className={isSingleRoom ? "grid grid-cols-1" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"}>
//           {displayRooms.map((room) => {
//             const roomId = room._id || room.slug;
//             const isAvailable = checked ? availableIds.includes(roomId) : true;
//             let imageSrc = "/images/properties/vector.svg";
//             if (room.images?.length > 0) imageSrc = typeof room.images[0] === "string" ? room.images[0] : room.images[0].src;

//             return (
//               <div key={roomId} className={isSingleRoom ? "bg-white dark:bg-darkCard rounded-2xl shadow p-8 flex flex-col gap-4 w-full md:w-[800px]" : "bg-white dark:bg-darkCard rounded-2xl shadow p-6 flex flex-col gap-4"}>
//                 <Image
//                   src={imageSrc}
//                   alt={room.name}
//                   width={isSingleRoom ? 700 : 320}
//                   height={isSingleRoom ? 400 : 200}
//                   className={isSingleRoom ? "rounded-xl w-full h-80 object-cover" : "rounded-xl w-full h-48 object-cover"}
//                   unoptimized={true}
//                 />
//                 <h2 className="text-xl font-semibold text-dark dark:text-light mb-1">{room.name}</h2>
//                 <p className="text-dark/70 dark:text-light/70 mb-1">{room.roomType}</p>
//                 <p className="text-dark/70 dark:text-light/70 mb-1">{room.beds} Beds • {room.baths} Baths • {room.area}m²</p>
//                 <p className="text-primary font-bold text-lg mb-2">
//                   {systemSettings && room.roomType
//                     ? formatCurrency(getCurrentRoomRate(room.roomType, systemSettings), systemSettings) + ' / night'
//                     : `${room.rate} / night`
//                   }
//                 </p>
//                 <div className="mb-2">Status: {getStatusLabel(room.status || "Unknown")}</div>
//                 {checked && (
//                   <div className="mb-2">
//                     {isAvailable ? (
//                       <span className="text-green-600 font-semibold">This room is available.</span>
//                     ) : (
//                       <span className="text-red-500 font-semibold">This room is not available for selected dates.</span>
//                     )}
//                   </div>
//                 )}
//                 {isAvailable && checked ? (
//                   <>
//                     <label className="block font-medium mb-1">Guests</label>
//                     <input
//                       type="number"
//                       min={1}
//                       max={room.capacity || 10}
//                       value={guests}
//                       onChange={(e) => setGuests(Number(e.target.value))}
//                       className="px-3 py-2 border border-lightBorder dark:border-darkBorder rounded-full outline-primary focus:outline w-full mb-2 bg-lightInput dark:bg-darkInput text-dark dark:text-light"
//                     />
//                     <button
//                       className="py-3 px-6 bg-primary text-white rounded-full text-center hover:bg-primaryDark duration-300 text-base font-semibold w-full"
//                       onClick={() => openModal(room)}
//                       disabled={confirming}
//                     >
//                       Book Now
//                     </button>
//                   </>
//                 ) : null}
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Booking Modal */}
//       {showModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center">
//           {/* Transparent blur background */}
//           <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={closeModal}></div>
//           <div className="relative z-50 bg-white dark:bg-darkCard rounded-2xl shadow-2xl max-w-lg w-full mx-auto p-8 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
//             {/* Modal content remains exactly same as before */}
//             <h2 className="text-2xl font-bold text-dark dark:text-light mb-4">{modalRoom?.name}</h2>
//             <p className="text-dark/70 dark:text-light/70 mb-2">{modalRoom?.roomType}</p>
//             <p className="text-dark/70 dark:text-light/70 mb-2">{modalRoom?.beds} Beds • {modalRoom?.baths} Baths • {modalRoom?.area}m²</p>
//             <p className="text-primary font-bold text-lg mb-4">
//               {systemSettings && modalRoom?.roomType
//                 ? formatCurrency(getCurrentRoomRate(modalRoom.roomType, systemSettings), systemSettings) + ' / night'
//                 : `${modalRoom?.rate} / night`
//               }
//             </p>

//             {/* Guests */}
//             <label className="block font-medium mb-1">Guests</label>
//             <input
//               type="number"
//               min={1}
//               max={modalRoom?.capacity || 10}
//               value={modalGuests}
//               onChange={(e) => setModalGuests(Number(e.target.value))}
//               className="px-3 py-2 border border-lightBorder dark:border-darkBorder rounded-full outline-primary focus:outline w-full mb-2 bg-lightInput dark:bg-darkInput text-dark dark:text-light"
//             />

//             {/* Additional Services */}
//             <div className="flex flex-col gap-2 mb-2">
//               <label className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   name="wakeup"
//                   checked={additionalServices.wakeup}
//                   onChange={handleServiceChange}
//                   className="accent-primary"
//                 />
//                 Wake-up Call
//               </label>
//               <label className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   name="spa"
//                   checked={additionalServices.spa}
//                   onChange={handleServiceChange}
//                   className="accent-primary"
//                 />
//                 Spa Appointment
//               </label>
//               <label className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   name="airport"
//                   checked={additionalServices.airport}
//                   onChange={handleServiceChange}
//                   className="accent-primary"
//                 />
//                 Airport Pickup
//               </label>
//             </div>

//             {/* Guest Details */}
//             {userRole === "guest" && (
//               <input
//                 type="text"
//                 placeholder="Phone Number"
//                 value={guestPhone}
//                 onChange={(e) => setGuestPhone(e.target.value)}
//                 className="px-3 py-2 border border-lightBorder dark:border-darkBorder rounded-full outline-primary focus:outline w-full mb-2 bg-lightInput dark:bg-darkInput text-dark dark:text-light"
//               />
//             )}
//             {userRole === "receptionist" && (
//               <>
//                 <input
//                   type="text"
//                   placeholder="Guest Name"
//                   value={recGuestName}
//                   onChange={(e) => setRecGuestName(e.target.value)}
//                   className="px-3 py-2 border border-lightBorder dark:border-darkBorder rounded-full outline-primary focus:outline w-full mb-2 bg-lightInput dark:bg-darkInput text-dark dark:text-light"
//                 />
//                 <input
//                   type="email"
//                   placeholder="Guest Email"
//                   value={recGuestEmail}
//                   onChange={(e) => setRecGuestEmail(e.target.value)}
//                   className="px-3 py-2 border border-lightBorder dark:border-darkBorder rounded-full outline-primary focus:outline w-full mb-2 bg-lightInput dark:bg-darkInput text-dark dark:text-light"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Guest Phone"
//                   value={recGuestPhone}
//                   onChange={(e) => setRecGuestPhone(e.target.value)}
//                   className="px-3 py-2 border border-lightBorder dark:border-darkBorder rounded-full outline-primary focus:outline w-full mb-2 bg-lightInput dark:bg-darkInput text-dark dark:text-light"
//                 />
//               </>
//             )}

//             {/* Error */}
//             {error && <p className="text-red-500 font-medium">{error}</p>}

//             {/* Total Price */}
//             <p className="text-dark font-semibold text-lg mt-2">
//               Total: {modalRoom && formatCurrency(getTotal(modalRoom), systemSettings)}
//             </p>

//             {/* Buttons */}
//             <div className="flex gap-4 mt-4">
//               <button
//                 className="flex-1 py-3 px-6 bg-primary text-white rounded-full hover:bg-primaryDark duration-300 font-semibold text-base"
//                 onClick={handleBook}
//                 disabled={confirming}
//               >
//                 {confirming ? "Booking..." : "Confirm Booking"}
//               </button>
//               <button
//                 className="flex-1 py-3 px-6 bg-gray-300 dark:bg-darkBorder text-dark dark:text-light rounded-full hover:bg-gray-400 dark:hover:bg-darkHover duration-300 font-semibold text-base"
//                 onClick={closeModal}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }






"use client";
import React, { useState, useEffect } from "react";
import { useRooms } from "@/hooks/useRooms";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRole } from "@/hooks/useRole";
import { useSystemSettings } from "@/hooks/useSystemSettings";
import { calculateTotalPrice, getCurrentRoomRate, formatCurrency } from "@/lib/roomPricing";

export default function BookPage() {
  const { rooms } = useRooms();
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlRoomId = searchParams.get("room");
  const { userRole } = useRole();
  const { settings: systemSettings } = useSystemSettings();

  const today = new Date();
  const [dates, setDates] = useState({
    checkin: today.toISOString().split("T")[0],
    checkout: today.toISOString().split("T")[0],
  });
  const [availableRooms, setAvailableRooms] = useState([]);
  const [checked, setChecked] = useState(false);
  const [checking, setChecking] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [guests, setGuests] = useState(1);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [dateError, setDateError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalRoom, setModalRoom] = useState<any>(null);
  const [modalGuests, setModalGuests] = useState(1);
  const [additionalServices, setAdditionalServices] = useState({
    wakeup: false,
    spa: false,
    airport: false,
    pet: false, 
    wakeupTime: "07:00",
    airportTime: "09:00",
  });

  const [guestPhone, setGuestPhone] = useState("");
  const [recGuestName, setRecGuestName] = useState("");
  const [recGuestEmail, setRecGuestEmail] = useState("");
  const [recGuestPhone, setRecGuestPhone] = useState("");

  useEffect(() => {
    if (dates.checkout < dates.checkin) {
      setDateError("Check-out date must be equal to or greater than check-in date.");
    } else setDateError("");
  }, [dates.checkin, dates.checkout]);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDates((prev) => {
      const newDates = { ...prev, [name]: value };
      if (name === "checkin" && newDates.checkout < value) newDates.checkout = value;
      if (name === "checkout" && value < newDates.checkin) newDates.checkout = newDates.checkin;
      return newDates;
    });
  };

  const checkAvailable = async () => {
    if (dates.checkout < dates.checkin) {
      setDateError("Check-out date must be equal to or greater than check-in date.");
      return;
    }
    setChecking(true);
    setChecked(false);
    setAvailableRooms([]);
    setError("");
    setSuccessMsg("");
    try {
      const res = await fetch(`http://localhost:3001/reservations/available?checkin=${dates.checkin}&checkout=${dates.checkout}`);
      if (!res.ok) throw new Error("Failed to check availability");
      const data = await res.json();
      setAvailableRooms(data.availableRooms || []);
      setChecked(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error checking availability.");
    } finally { setChecking(false); }
  };

  const openModal = (room: any) => {
    setModalRoom(room);
    setModalGuests(guests);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setModalRoom(null);
    setAdditionalServices({ wakeup: false, spa: false, airport: false, wakeupTime: "07:00", airportTime: "09:00" , pet: false });
    setGuestPhone(""); setRecGuestName(""); setRecGuestEmail(""); setRecGuestPhone("");
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, value, type } = e.target;
    setAdditionalServices((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const getNights = () => {
    const d1 = new Date(dates.checkin);
    const d2 = new Date(dates.checkout);
    return Math.max(1, Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)));
  };

  const getTotal = (room: any) => {
    if (systemSettings && room.roomType) {
      return calculateTotalPrice(room.roomType, new Date(dates.checkin), new Date(dates.checkout), 1, additionalServices, systemSettings);
    } else {
      let total = Number(room.rate) * getNights();
      if (additionalServices.spa) total += 50;
      if (additionalServices.airport) total += 30;
      if (additionalServices.wakeup) total += 10;
      if (additionalServices.pet) total += 25; 
      return total;
    }
  };

  const canBook = userRole === "guest" || userRole === "receptionist";

  const handleBook = async () => {
    if (!session?.user) { setError("You must be signed in to book a room."); return; }
    if (!canBook) { setError("Only guests and receptionists can make reservations."); return; }
    if (userRole === "guest" && !guestPhone) { setError("Please enter your phone number."); return; }
    if (userRole === "receptionist" && (!recGuestName || !recGuestEmail || !recGuestPhone)) { setError("Please enter guest name, email, and phone number."); return; }

    setConfirming(true); setError(""); setSuccessMsg("");
    try {
      const total = getTotal(modalRoom);
      const reservationData = {
        room: modalRoom._id || modalRoom.slug,
        guestName: userRole === "receptionist" ? recGuestName : session.user.name,
        guestEmail: userRole === "receptionist" ? recGuestEmail : session.user.email,
        guestId: session.user.id,
        guestPhone: userRole === "guest" ? guestPhone : recGuestPhone,
        checkin: dates.checkin,
        checkout: dates.checkout,
        guests: modalGuests,
        additionalServices,
        price: total,
        role: userRole,
      };

      const reservationRes = await fetch("http://localhost:3001/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservationData),
      });
      const reservationResult = await reservationRes.json();
      if (!reservationRes.ok) throw new Error(reservationResult.message || "Failed to create reservation");

      if (userRole === "guest") {
        const stripeRes = await fetch("http://localhost:3001/create-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: total, reservationId: reservationResult.reservation.reservationId }),
        });
        const stripeData = await stripeRes.json();
        if (!stripeRes.ok) throw new Error(stripeData.error || "Failed to create Stripe session");
        window.location.href = stripeData.url;
      } else if (userRole === "receptionist") {
        router.push("/reservation-table?created=1");
      }
    } catch (err) { setError(err instanceof Error ? err.message : "Booking failed."); }
    finally { setConfirming(false); }
  };

  let displayRooms = urlRoomId ? rooms.filter((room) => room._id === urlRoomId || room.slug === urlRoomId) : rooms;
  const availableIds = availableRooms.map((r) => r._id || r.slug);
  const isSingleRoom = displayRooms.length === 1;

  const getStatusLabel = (status: string) => {
    const colors = { Available: "green", Cleaning: "yellow", Clean: "blue", Maintenance: "orange", Occupied: "red" };
    return <span className={`text-${colors[status] || "gray"}-600 font-semibold`}>{status || "Unknown"}</span>;
  };

  return (
    <section className="!pt-36 pb-20 min-h-screen bg-[#F5F0E1] dark:bg-[#1E1B18] text-[#3B2F2F] dark:text-[#F2E9E1] transition-colors">
      <div className="container mx-auto max-w-6xl px-5 2xl:px-0">

        {/* Date Picker Card */}
        <div className="bg-gradient-to-br from-[#F0E3D6] to-[#DCCAB0] dark:from-[#3A352F] dark:to-[#5B4E43] rounded-2xl shadow-2xl p-8 mb-10 flex flex-col md:flex-row gap-4 items-center justify-center">
          <input type="date" name="checkin" value={dates.checkin} onChange={handleDateChange} required min={today.toISOString().split("T")[0]} className="px-4 py-3 border border-lightBorder dark:border-darkBorder rounded-full outline-primary focus:outline w-full md:w-auto bg-[#FFF5E1] dark:bg-[#2C2B28] text-dark dark:text-light" />
          <input type="date" name="checkout" value={dates.checkout} onChange={handleDateChange} required min={dates.checkin} className="px-4 py-3 border border-lightBorder dark:border-darkBorder rounded-full outline-primary focus:outline w-full md:w-auto bg-[#FFF5E1] dark:bg-[#2C2B28] text-dark dark:text-light" />
          <button type="button" onClick={checkAvailable} disabled={checking || !dates.checkin || !dates.checkout || !!dateError} className="py-3 px-8 bg-[#A78256] dark:bg-[#DCCAB0] text-[#FFF5E1] dark:text-[#3B2F2F] rounded-full hover:opacity-90 duration-300 font-semibold w-full md:w-auto">{checking ? "Checking..." : "Check Available"}</button>
        </div>

        {dateError && <div className="text-red-500 text-center font-medium mb-4">{dateError}</div>}
        {error && <div className="text-red-500 text-center font-medium mb-4">{error}</div>}
        {successMsg && <div className="text-green-600 text-center font-medium mb-4">{successMsg}</div>}

        {/* Rooms Grid */}
        <div className={isSingleRoom ? "grid grid-cols-1 gap-8" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"}>
          {displayRooms.map((room) => {
            const roomId = room._id || room.slug;
            const isAvailable = checked ? availableIds.includes(roomId) : true;
            const imageSrc = room.images?.length > 0 ? (typeof room.images[0] === "string" ? room.images[0] : room.images[0].src) : "/images/properties/vector.svg";
            return (
              <div key={roomId} className="bg-gradient-to-br from-[#F0E3D6] to-[#DCCAB0] dark:from-[#3A352F] dark:to-[#5B4E43] rounded-2xl shadow-2xl p-6 flex flex-col gap-4 hover:scale-105 transition-transform">
                <Image src={imageSrc} alt={room.name} width={320} height={200} className="rounded-2xl w-full h-48 object-cover" unoptimized={true} />
                <h2 className="text-xl font-bold">{room.name}</h2>
                <p className="text-dark/70 dark:text-light/70">{room.roomType}</p>
                <p className="text-dark/70 dark:text-light/70">{room.beds} Beds • {room.baths} Baths • {room.area}m²</p>
                <p className="text-primary font-bold text-lg">{systemSettings && room.roomType ? formatCurrency(getCurrentRoomRate(room.roomType, systemSettings), systemSettings) + " / night" : `${room.rate} / night`}</p>
                <div>Status: {getStatusLabel(room.status || "Unknown")}</div>
                {checked && <div>{isAvailable ? <span className="text-green-600 font-semibold">Available</span> : <span className="text-red-500 font-semibold">Not Available</span>}</div>}
                {isAvailable && checked && (
                  <>
                    <label className="font-medium">Guests</label>
                    <input type="number" min={1} max={room.capacity || 10} value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="px-3 py-2 border border-lightBorder dark:border-darkBorder rounded-full outline-primary focus:outline w-full mb-2 bg-[#FFF5E1] dark:bg-[#2C2B28] text-dark dark:text-light" />
                    <button className="py-3 px-6 bg-[#A78256] dark:bg-[#DCCAB0] text-[#FFF5E1] dark:text-[#3B2F2F] rounded-full hover:opacity-90 duration-300 font-semibold w-full" onClick={() => openModal(room)} disabled={confirming}>Book Now</button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="relative z-50 bg-gradient-to-br from-[#F0E3D6] to-[#DCCAB0] dark:from-[#3A352F] dark:to-[#5B4E43] rounded-2xl shadow-2xl max-w-lg w-full mx-auto p-8 flex flex-col gap-4 max-h-[80vh] overflow-y-auto overflow-x-auto">
            <h2 className="text-2xl font-bold mb-2">{modalRoom?.name}</h2>
            <p className="text-dark/70 dark:text-light/70">{modalRoom?.roomType}</p>
            <p className="text-dark/70 dark:text-light/70">{modalRoom?.beds} Beds • {modalRoom?.baths} Baths • {modalRoom?.area}m²</p>
            <p className="text-primary font-bold text-lg">{systemSettings && modalRoom?.roomType ? formatCurrency(getCurrentRoomRate(modalRoom.roomType, systemSettings), systemSettings) + ' / night' : `${modalRoom?.rate} / night`}</p>

            <label className="font-medium mb-1">Guests</label>
            <input type="number" min={1} max={modalRoom?.capacity || 10} value={modalGuests} onChange={(e) => setModalGuests(Number(e.target.value))} className="px-3 py-2 border border-lightBorder dark:border-darkBorder rounded-full outline-primary focus:outline w-full mb-2 bg-[#FFF5E1] dark:bg-[#2C2B28] text-dark dark:text-light" />

            <div className="flex flex-col gap-2 mb-2">
              {["wakeup", "spa", "airport", "pet"].map((service) => (
                <label key={service} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name={service}
                    checked={additionalServices[service]}
                    onChange={handleServiceChange}
                    className="accent-[#A78256] dark:accent-[#FFD700]"
                  />
                  {service === "wakeup" ? "Wake-up Call" :
                    service === "spa" ? "Spa Appointment" :
                      service === "airport" ? "Airport Pickup" :
                       service == "pet" ?  "Pet Service" : ""}
                </label>
              ))}
            </div>


            {userRole === "guest" && <input type="text" placeholder="Phone Number" value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} className="px-3 py-2 border border-lightBorder dark:border-darkBorder rounded-full outline-primary focus:outline w-full mb-2 bg-[#FFF5E1] dark:bg-[#2C2B28] text-dark dark:text-light" />}
            {userRole === "receptionist" && <>
              <input type="text" placeholder="Guest Name" value={recGuestName} onChange={(e) => setRecGuestName(e.target.value)} className="px-3 py-2 border border-lightBorder dark:border-darkBorder rounded-full outline-primary focus:outline w-full mb-2 bg-[#FFF5E1] dark:bg-[#2C2B28] text-dark dark:text-light" />
              <input type="email" placeholder="Guest Email" value={recGuestEmail} onChange={(e) => setRecGuestEmail(e.target.value)} className="px-3 py-2 border border-lightBorder dark:border-darkBorder rounded-full outline-primary focus:outline w-full mb-2 bg-[#FFF5E1] dark:bg-[#2C2B28] text-dark dark:text-light" />
              <input type="text" placeholder="Guest Phone" value={recGuestPhone} onChange={(e) => setRecGuestPhone(e.target.value)} className="px-3 py-2 border border-lightBorder dark:border-darkBorder rounded-full outline-primary focus:outline w-full mb-2 bg-[#FFF5E1] dark:bg-[#2C2B28] text-dark dark:text-light" />
            </>}

            {error && <p className="text-red-500 font-medium">{error}</p>}

            <p className="text-dark font-semibold text-lg mt-2">Total: {modalRoom && formatCurrency(getTotal(modalRoom), systemSettings)}</p>

            <div className="flex gap-4 mt-4">
              <button className="flex-1 py-3 px-6 bg-[#A78256] dark:bg-[#DCCAB0] text-[#FFF5E1] dark:text-[#3B2F2F] rounded-full hover:opacity-90 duration-300 font-semibold text-base" onClick={handleBook} disabled={confirming}>{confirming ? "Booking..." : "Confirm Booking"}</button>
              <button className="flex-1 py-3 px-6 bg-gray-300 dark:bg-darkBorder text-dark dark:text-light rounded-full hover:bg-gray-400 dark:hover:bg-darkHover duration-300 font-semibold text-base" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}












// "use client";
// import React, { useState, useEffect } from "react";
// import { useRooms } from "@/hooks/useRooms";
// import Image from "next/image";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useSearchParams } from "next/navigation";
// import { useRole } from "@/hooks/useRole";
// import { useSystemSettings } from "@/hooks/useSystemSettings";
// import { formatCurrency, getCurrentRoomRate } from "@/lib/roomPricing";

// const staticRooms = [
//   { id: 1, name: "Deluxe Room", price: "$120", image: "/images/featuredproperty/image-1.jpg" },
//   { id: 2, name: "Superior Room", price: "$150", image: "/images/featuredproperty/room2.jpg" },
//   { id: 3, name: "Executive Suite", price: "$200", image: "/images/featuredproperty/room3.jpg" },
//   { id: 4, name: "Family Room", price: "$180", image: "/images/featuredproperty/room4.jpg" },
//   { id: 5, name: "Single Room", price: "$90", image: "/images/featuredproperty/room5.jpg" },
//   { id: 6, name: "Presidential Suite", price: "$350", image: "/images/featuredproperty/room6.jpg" },
// ];

// export default function BookPage() {
//   const { rooms } = useRooms();
//   const { data: session } = useSession();
//   const { userRole } = useRole();
//   const { settings: systemSettings } = useSystemSettings();

//   const today = new Date();
//   const getLocalDateString = (date: Date) => {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   };

//   const [dates, setDates] = useState({ checkin: getLocalDateString(today), checkout: getLocalDateString(today) });
//   const [availableRooms, setAvailableRooms] = useState([]);
//   const [checked, setChecked] = useState(false);
//   const [checking, setChecking] = useState(false);
//   const [guests, setGuests] = useState(1);
//   const [error, setError] = useState("");
//   const [dateError, setDateError] = useState("");

//   useEffect(() => {
//     setChecked(false);
//     setAvailableRooms([]);
//     setError("");
//     if (dates.checkout < dates.checkin) {
//       setDateError("Check-out date must be equal to or greater than check-in date.");
//     } else setDateError("");
//   }, [dates.checkin, dates.checkout]);

//   const handleDateChange = (e) => {
//     const { name, value } = e.target;
//     setDates((prev) => {
//       const newDates = { ...prev, [name]: value };
//       if (name === "checkin" && newDates.checkout < value) newDates.checkout = value;
//       if (name === "checkout" && value < newDates.checkin) newDates.checkout = newDates.checkin;
//       return newDates;
//     });
//   };

//   const checkAvailable = async () => {
//     if (dates.checkout < dates.checkin) {
//       setDateError("Check-out date must be equal to or greater than check-in date.");
//       return;
//     }
//     setChecking(true);
//     setChecked(false);
//     setAvailableRooms([]);
//     setError("");
//     try {
//       const res = await fetch(
//         `http://localhost:3001/reservations/available?checkin=${dates.checkin}&checkout=${dates.checkout}`
//       );
//       if (!res.ok) throw new Error("Failed to check availability");
//       const data = await res.json();
//       setAvailableRooms(data.availableRooms || []);
//       setChecked(true);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Error checking availability.");
//     } finally {
//       setChecking(false);
//     }
//   };

//   const availableIds = availableRooms.map((r) => r._id || r.slug);
//   const isLoggedIn = !!session?.user;

//   return (
//     <section className="relative bg-[#F5F0E1] dark:bg-[#1E1B18] text-[#3B2F2F] dark:text-[#F2E9E1] !pt-36 pb-20 min-h-screen">

//       {/* Discover Section with Form */}
//       <div className="container mx-auto px-5 max-w-6xl mb-20">
//         <div className="bg-gradient-to-r from-[#F0E3D6] to-[#DCCAB0] dark:from-[#3A352F] dark:to-[#5B4E43] rounded-3xl shadow-2xl p-12 flex flex-col md:flex-row items-center justify-between gap-8">
//           <div className="flex-1 text-center md:text-left">
//             <h1 className="text-4xl font-bold mb-4">Discover Our Rooms</h1>
//             <p className="text-lg mb-6">Check availability for your stay and choose the perfect room for you.</p>
//           </div>

//           <div className="flex-1 flex flex-col md:flex-row gap-4 items-center justify-center">
//             <input
//               type="date"
//               name="checkin"
//               value={dates.checkin}
//               onChange={handleDateChange}
//               min={getLocalDateString(today)}
//               className="px-5 py-3 rounded-2xl border border-gray-300 dark:border-gray-600 outline-primary focus:ring-2 focus:ring-primary w-full md:w-auto transition"
//             />
//             <input
//               type="date"
//               name="checkout"
//               value={dates.checkout}
//               onChange={handleDateChange}
//               min={dates.checkin}
//               className="px-5 py-3 rounded-2xl border border-gray-300 dark:border-gray-600 outline-primary focus:ring-2 focus:ring-primary w-full md:w-auto transition"
//             />
//             <button
//               onClick={checkAvailable}
//               disabled={checking || !!dateError}
//               className="py-3 px-8 bg-[#DCCAB0] text-[#3B2F2F] rounded-2xl hover:opacity-90 transition font-semibold w-full md:w-auto dark:bg-[#A78256] dark:text-[#FFF5E1]"
//             >
//               {checking ? "Checking..." : "Check Availability"}
//             </button>
//           </div>

//           {dateError && <p className="mt-2 text-red-600 text-center font-medium">{dateError}</p>}
//           {error && <p className="mt-2 text-red-600 text-center font-medium">{error}</p>}
//         </div>
//       </div>

//       {/* Rooms Cards (Team style) */}
//       <div className="container mx-auto px-5 max-w-6xl">
//         <h2 className="text-3xl font-bold text-center mb-12">Available Rooms</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//           {(rooms || []).map((room) => {
//             const roomId = room.id || room.slug;
//             const isAvailable = checked ? availableIds.includes(roomId) : true;
//             let imageSrc = room.images && room.images.length > 0
//               ? typeof room.images[0] === "string" ? room.images[0] : room.images[0].src
//               : "/images/properties/vector.svg";

//             return (
//               <div
//                 key={roomId}
//                 className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition p-6 flex flex-col items-center text-center"
//               >
//                 <div className="w-52 h-52 mb-4 relative">
//                   <Image src={imageSrc} alt={room.name} fill className="object-cover rounded-2xl" />
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
//                 <p className="text-gray-600 dark:text-gray-300 mb-2">{room.roomType}</p>
//                 <p className="text-gray-600 dark:text-gray-300 mb-2">{room.beds} Beds • {room.baths} Baths • {room.area}m²</p>
//                 <p className="text-lg font-bold mb-2">
//                   {systemSettings && room.roomType
//                     ? formatCurrency(getCurrentRoomRate(room.roomType, systemSettings), systemSettings)
//                     : room.rate}{" "}
//                   / night
//                 </p>
//                 <p className={`mb-4 font-semibold ${isAvailable ? "text-green-600" : "text-red-500"}`}>
//                   {isAvailable ? "Available" : "Not Available"}
//                 </p>

//                 {isAvailable && checked && (
//                   <input
//                     type="number"
//                     min={1}
//                     max={room.capacity || 10}
//                     value={guests}
//                     onChange={(e) => setGuests(Number(e.target.value))}
//                     className="px-3 py-2 border rounded-2xl outline-primary focus:ring-2 focus:ring-primary mb-3 w-full"
//                   />
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Optional: Static Rooms */}
//       <div className="container mx-auto px-5 max-w-6xl mt-20">
//         <h2 className="text-3xl font-bold text-center mb-12">Our Rooms & Prices</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//           {staticRooms.map((room) => (
//             <div
//               key={room.id}
//               className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition p-6 flex flex-col items-center text-center"
//             >
//               <div className="w-52 h-52 mb-4 relative">
//                 <Image src={room.image} alt={room.name} fill className="object-cover rounded-2xl" />
//               </div>
//               <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
//               <p className="text-lg font-bold">{room.price} / night</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }







// "use client";
// import React, { useState, useEffect } from "react";
// import { useRooms } from "@/hooks/useRooms";
// import Image from "next/image";
// import { useSession } from "next-auth/react";
// import { useRole } from "@/hooks/useRole";

// export default function BookPage() {
//   const { rooms } = useRooms();
//   const { data: session } = useSession();
//   const { userRole } = useRole();

//   const today = new Date();
//   const getLocalDateString = (date: Date) => {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   };

//   const [dates, setDates] = useState({ checkin: getLocalDateString(today), checkout: getLocalDateString(today) });
//   const [checking, setChecking] = useState(false);
//   const [checked, setChecked] = useState(false);
//   const [availableRooms, setAvailableRooms] = useState([]);
//   const [dateError, setDateError] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (dates.checkout < dates.checkin) {
//       setDateError("Check-out date must be equal to or greater than check-in date.");
//     } else setDateError("");
//   }, [dates.checkin, dates.checkout]);

//   const handleDateChange = (e) => {
//     const { name, value } = e.target;
//     setDates((prev) => {
//       const newDates = { ...prev, [name]: value };
//       if (name === "checkin" && newDates.checkout < value) newDates.checkout = value;
//       if (name === "checkout" && value < newDates.checkin) newDates.checkout = newDates.checkin;
//       return newDates;
//     });
//   };

//   const checkAvailable = async () => {
//     if (dates.checkout < dates.checkin) {
//       setDateError("Check-out date must be equal to or greater than check-in date.");
//       return;
//     }
//     setChecking(true);
//     setChecked(false);
//     setAvailableRooms([]);
//     setError("");
//     try {
//       const res = await fetch(
//         `http://localhost:3001/reservations/available?checkin=${dates.checkin}&checkout=${dates.checkout}`
//       );
//       if (!res.ok) throw new Error("Failed to check availability");
//       const data = await res.json();
//       setAvailableRooms(data.availableRooms || []);
//       setChecked(true);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Error checking availability.");
//     } finally {
//       setChecking(false);
//     }
//   };

//   const availableIds = availableRooms.map((r) => r._id || r.slug);

//   return (
//     <section className="relative bg-[#F5F0E1] dark:bg-[#1E1B18] text-[#3B2F2F] dark:text-[#F2E9E1] !pt-36 pb-20 min-h-screen">

//       {/* Top Discover-style Section */}
//       <div className="relative bg-gradient-to-r from-[#F0E3D6] to-[#DCCAB0] dark:from-[#3A352F] dark:to-[#5B4E43] rounded-3xl shadow-2xl mx-auto max-w-6xl px-8 py-16 text-center flex flex-col gap-8">
//         <h1 className="text-5xl font-bold">Reserve Your Room Now</h1>
//         <p className="text-lg">Check availability for your stay and choose the perfect room.</p>
//         <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
//           <input
//             type="date"
//             name="checkin"
//             value={dates.checkin}
//             onChange={handleDateChange}
//             min={getLocalDateString(today)}
//             className="px-5 py-3 rounded-2xl border border-gray-300 dark:border-gray-600 outline-primary focus:ring-2 focus:ring-primary w-full md:w-auto transition"
//           />
//           <input
//             type="date"
//             name="checkout"
//             value={dates.checkout}
//             onChange={handleDateChange}
//             min={dates.checkin}
//             className="px-5 py-3 rounded-2xl border border-gray-300 dark:border-gray-600 outline-primary focus:ring-2 focus:ring-primary w-full md:w-auto transition"
//           />
//           <button
//             onClick={checkAvailable}
//             disabled={checking || !!dateError}
//             className="py-3 px-8 bg-[#DCCAB0] text-[#3B2F2F] rounded-2xl hover:opacity-90 transition font-semibold w-full md:w-auto dark:bg-[#A78256] dark:text-[#FFF5E1]"
//           >
//             {checking ? "Checking..." : "Check Availability"}
//           </button>
//         </div>
//         {dateError && <p className="mt-2 text-red-600 font-medium">{dateError}</p>}
//         {error && <p className="mt-2 text-red-600 font-medium">{error}</p>}
//       </div>

//       {/* Rooms Cards (Meet Our Team style, only name) */}
//       <div className="container mx-auto px-5 max-w-6xl mt-20">
//         <h2 className="text-3xl font-bold text-center mb-12">Available Rooms</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//           {(rooms || []).map((room) => {
//             const roomId = room.id || room.slug;
//             const isAvailable = checked ? availableIds.includes(roomId) : true;
//             let imageSrc = room.images && room.images.length > 0
//               ? typeof room.images[0] === "string" ? room.images[0] : room.images[0].src
//               : "/images/properties/vector.svg";

//             return (
//               <div
//                 key={roomId}
//                 className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition p-6 flex flex-col items-center text-center"
//               >
//                 <div className="w-48 h-48 mb-4 relative">
//                   <Image src={imageSrc} alt={room.name} fill className="object-cover rounded-full" />
//                 </div>
//                 <h3 className="text-xl font-semibold">{room.name}</h3>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }











// "use client";
// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { useSession } from "next-auth/react";
// import { useRole } from "@/hooks/useRole";

// // Static Rooms Data
// const staticRooms = [
//   { id: 1, name: "Deluxe Room", image: "/images/featuredproperty/image-1.jpg" },
//   { id: 2, name: "Superior Room", image: "/images/featuredproperty/image-2.jpg" },
//   { id: 3, name: "Executive Suite", image: "/images/featuredproperty/image-3.jpg" },
//   { id: 4, name: "Family Room", image: "/images/featuredproperty/room4.jpg" },
//   { id: 5, name: "Single Room", image: "/images/featuredproperty/room5.jpg" },
//   { id: 6, name: "Presidential Suite", image: "/images/featuredproperty/room6.jpg" },
// ];

// export default function BookPage() {
//   const { data: session } = useSession();
//   const { userRole } = useRole();

//   const today = new Date();
//   const getLocalDateString = (date: Date) => {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   };

//   const [dates, setDates] = useState({ checkin: getLocalDateString(today), checkout: getLocalDateString(today) });
//   const [checking, setChecking] = useState(false);
//   const [checked, setChecked] = useState(false);
//   const [dateError, setDateError] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (dates.checkout < dates.checkin) {
//       setDateError("Check-out date must be equal to or greater than check-in date.");
//     } else setDateError("");
//   }, [dates.checkin, dates.checkout]);

//   const handleDateChange = (e) => {
//     const { name, value } = e.target;
//     setDates((prev) => {
//       const newDates = { ...prev, [name]: value };
//       if (name === "checkin" && newDates.checkout < value) newDates.checkout = value;
//       if (name === "checkout" && value < newDates.checkin) newDates.checkout = newDates.checkin;
//       return newDates;
//     });
//   };

//   const checkAvailable = async () => {
//     if (dates.checkout < dates.checkin) {
//       setDateError("Check-out date must be equal to or greater than check-in date.");
//       return;
//     }
//     setChecking(true);
//     setChecked(false);
//     setError("");
//     setTimeout(() => setChecked(true), 500); // Simulate availability check
//   };

//   return (
//     <section className="relative bg-[#F5F0E1] dark:bg-[#1E1B18] text-[#3B2F2F] dark:text-[#F2E9E1] !pt-36 pb-20 min-h-screen">

//       {/* Top Discover-style Section */}
//       <div className="relative bg-gradient-to-r from-[#F0E3D6] to-[#DCCAB0] dark:from-[#3A352F] dark:to-[#5B4E43] rounded-3xl shadow-2xl mx-auto max-w-6xl px-8 py-16 text-center flex flex-col gap-8">
//         <h1 className="text-5xl font-bold">Reserve Your Room Now</h1>
//         <p className="text-lg">Check availability for your stay and choose the perfect room.</p>
//         <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
//           <input
//             type="date"
//             name="checkin"
//             value={dates.checkin}
//             onChange={handleDateChange}
//             min={getLocalDateString(today)}
//             className="px-5 py-3 rounded-2xl border border-gray-300 dark:border-gray-600 outline-primary focus:ring-2 focus:ring-primary w-full md:w-auto transition"
//           />
//           <input
//             type="date"
//             name="checkout"
//             value={dates.checkout}
//             onChange={handleDateChange}
//             min={dates.checkin}
//             className="px-5 py-3 rounded-2xl border border-gray-300 dark:border-gray-600 outline-primary focus:ring-2 focus:ring-primary w-full md:w-auto transition"
//           />
//           <button
//             onClick={checkAvailable}
//             disabled={checking || !!dateError}
//             className="py-3 px-8 bg-[#DCCAB0] text-[#3B2F2F] rounded-2xl hover:opacity-90 transition font-semibold w-full md:w-auto dark:bg-[#A78256] dark:text-[#FFF5E1]"
//           >
//             {checking ? "Checking..." : "Check Availability"}
//           </button>
//         </div>
//         {dateError && <p className="mt-2 text-red-600 font-medium">{dateError}</p>}
//         {error && <p className="mt-2 text-red-600 font-medium">{error}</p>}
//       </div>

//       {/* Rooms Cards (Meet Our Team style, only name) */}
//       <div className="container mx-auto px-5 max-w-6xl mt-20">
//         <h2 className="text-3xl font-bold text-center mb-12">Types of Rooms</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//           {staticRooms.map((room) => (
//             <div
//               key={room.id}
//               className="bg-gradient-to-br from-[#F0E3D6] to-[#DCCAB0] dark:from-[#3A352F] dark:to-[#5B4E43]
//                          rounded-3xl shadow-2xl hover:shadow-3xl transition p-6 flex flex-col items-center text-center"
//             >
//               <div className="w-65 h-38 relative overflow-hidden rounded-lg">
//                 <Image
//                   src={room.image}
//                   alt={room.name}
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//               <h3 className="text-xl font-semibold">{room.name}</h3>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }







// "use client";

// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { useSession } from "next-auth/react";
// import { useRole } from "@/hooks/useRole";


// export default function BookPage() {
//   const { data: session } = useSession();
//   const { userRole } = useRole();

//   const today = new Date();

//   const getLocalDateString = (date: Date) => {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   };

//   const [dates, setDates] = useState({
//     checkin: getLocalDateString(today),
//     checkout: getLocalDateString(today),
//   });

//   const [checking, setChecking] = useState(false);
//   const [checked, setChecked] = useState(false);
//   const [dateError, setDateError] = useState("");
//   const [error, setError] = useState("");

//   // ====== DYNAMIC ROOM TYPES ======
//   const [rooms, setRooms] = useState([]);

//   useEffect(() => {
//     const fetchRooms = async () => {
//       const res = await fetch("/api/roomtypes");
//       const data = await res.json();
//       setRooms(data);
//     };

//     fetchRooms();
//   }, []);


//   // ====== DATE VALIDATION ======
//   useEffect(() => {
//     if (dates.checkout < dates.checkin) {
//       setDateError("Check-out date must be equal to or greater than check-in date.");
//     } else setDateError("");
//   }, [dates.checkin, dates.checkout]);

//   const handleDateChange = (e: any) => {
//     const { name, value } = e.target;
//     setDates((prev) => {
//       const newDates = { ...prev, [name]: value };
//       if (name === "checkin" && newDates.checkout < value)
//         newDates.checkout = value;
//       if (name === "checkout" && value < newDates.checkin)
//         newDates.checkout = newDates.checkin;
//       return newDates;
//     });
//   };

//   const checkAvailable = async () => {
//     if (dates.checkout < dates.checkin) {
//       setDateError("Check-out date must be equal to or greater than check-in date.");
//       return;
//     }
//     setChecking(true);
//     setChecked(false);
//     setError("");

//     setTimeout(() => setChecked(true), 500); // Fake check
//   };

//   return (
//     <section className="relative bg-[#F5F0E1] dark:bg-[#1E1B18] text-[#3B2F2F] dark:text-[#F2E9E1] !pt-36 pb-20 min-h-screen">

//       {/* TOP DISCOVER STYLE SECTION */}
//       <div className="relative bg-gradient-to-r from-[#F0E3D6] to-[#DCCAB0] dark:from-[#3A352F] dark:to-[#5B4E43] rounded-3xl shadow-2xl mx-auto max-w-6xl px-8 py-16 text-center flex flex-col gap-8">
//         <h1 className="text-5xl font-bold">Reserve Your Room Now</h1>
//         <p className="text-lg">Check availability for your stay and choose the perfect room.</p>

//         <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
//           <input
//             type="date"
//             name="checkin"
//             value={dates.checkin}
//             onChange={handleDateChange}
//             min={getLocalDateString(today)}
//             className="px-5 py-3 rounded-2xl border border-gray-300 dark:border-gray-600 outline-primary focus:ring-2 focus:ring-primary w-full md:w-auto transition"
//           />

//           <input
//             type="date"
//             name="checkout"
//             value={dates.checkout}
//             onChange={handleDateChange}
//             min={dates.checkin}
//             className="px-5 py-3 rounded-2xl border border-gray-300 dark:border-gray-600 outline-primary focus:ring-2 focus:ring-primary w-full md:w-auto transition"
//           />

//           <button
//             onClick={checkAvailable}
//             disabled={checking || !!dateError}
//             className="py-3 px-8 bg-[#DCCAB0] text-[#3B2F2F] rounded-2xl hover:opacity-90 transition font-semibold w-full md:w-auto dark:bg-[#A78256] dark:text-[#FFF5E1]"
//           >
//             {checking ? "Checking..." : "Check Availability"}
//           </button>
//         </div>

//         {dateError && <p className="mt-2 text-red-600 font-medium">{dateError}</p>}
//         {error && <p className="mt-2 text-red-600 font-medium">{error}</p>}
//       </div>

//       {/* DYNAMIC ROOM TYPE CARDS (Meet Our Team style) */}
//       <div className="container mx-auto px-5 max-w-6xl mt-20">
//         <h2 className="text-3xl font-bold text-center mb-12">Types of Rooms</h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//           {rooms.map((room: any) => (
//             <div
//               key={room._id}
//               className="bg-gradient-to-br from-[#F0E3D6] to-[#DCCAB0] dark:from-[#3A352F] dark:to-[#5B4E43]
//                         rounded-3xl shadow-2xl hover:shadow-3xl transition p-6 flex flex-col items-center text-center"
//             >
//               <div className="w-65 h-38 relative overflow-hidden rounded-lg">
//                 <Image
//                   src={room.image}
//                   alt={room.name}
//                   fill
//                   className="object-cover"
//                 />
//               </div>

//               <h3 className="text-xl font-semibold mt-4">{room.name}</h3>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }












// "use client";

// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { useSession } from "next-auth/react";
// import { useRole } from "@/hooks/useRole";

// export default function BookPage() {
//   const { data: session } = useSession();
//   const { userRole } = useRole();

//   const today = new Date();

//   const getLocalDateString = (date: Date) => {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   };

//   const [dates, setDates] = useState({
//     checkin: getLocalDateString(today),
//     checkout: getLocalDateString(today),
//   });

//   const [checking, setChecking] = useState(false);
//   const [checked, setChecked] = useState(false);
//   const [dateError, setDateError] = useState("");
//   const [error, setError] = useState("");

//   // ====== DYNAMIC ROOM TYPES ======
//   const [rooms, setRooms] = useState([]);
//   const [loadingRooms, setLoadingRooms] = useState(true);
//   // const res = await fetch("http://localhost:3001/roomtypes/limited");

//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         const res = await fetch("http://localhost:3001/roomtypes/limited");
//         if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//         const data = await res.json();
//         console.log("Raw API response:", data);

//         // Handle both structures: { roomtype: [...] } or [...]
//         const roomsArray = Array.isArray(data.roomtype)
//           ? data.roomtype
//           : Array.isArray(data)
//             ? data
//             : [];

//         console.log("Rooms array after extraction:", roomsArray);

//         setRooms(roomsArray);
//       } catch (err) {
//         console.error("Error fetching rooms:", err);
//         setError("Failed to load room types. Please try again.");
//         setRooms([]);
//       } finally {
//         setLoadingRooms(false);
//       }
//     };

//     fetchRooms();
//   }, []);



//   // ====== DATE VALIDATION ======
//   useEffect(() => {
//     if (dates.checkout < dates.checkin) {
//       setDateError("Check-out date must be equal to or greater than check-in date.");
//     } else setDateError("");
//   }, [dates.checkin, dates.checkout]);

//   const handleDateChange = (e: any) => {
//     const { name, value } = e.target;
//     setDates((prev) => {
//       const newDates = { ...prev, [name]: value };
//       if (name === "checkin" && newDates.checkout < value)
//         newDates.checkout = value;
//       if (name === "checkout" && value < newDates.checkin)
//         newDates.checkout = newDates.checkin;
//       return newDates;
//     });
//   };

//   const checkAvailable = async () => {
//     if (dates.checkout < dates.checkin) {
//       setDateError("Check-out date must be equal to or greater than check-in date.");
//       return;
//     }
//     setChecking(true);
//     setChecked(false);
//     setError("");

//     setTimeout(() => setChecked(true), 500); // Fake check
//   };

//   return (
//     <section className="relative bg-[#F5F0E1] dark:bg-[#1E1B18] text-[#3B2F2F] dark:text-[#F2E9E1] !pt-36 pb-20 min-h-screen">
//       {/* TOP DISCOVER STYLE SECTION */}
//       <div className="relative bg-gradient-to-r from-[#F0E3D6] to-[#DCCAB0] dark:from-[#3A352F] dark:to-[#5B4E43] rounded-3xl shadow-2xl mx-auto max-w-6xl px-8 py-16 text-center flex flex-col gap-8">
//         <h1 className="text-5xl font-bold">Reserve Your Room Now</h1>
//         <p className="text-lg">Check availability for your stay and choose the perfect room.</p>

//         <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
//           <input
//             type="date"
//             name="checkin"
//             value={dates.checkin}
//             onChange={handleDateChange}
//             min={getLocalDateString(today)}
//             className="px-5 py-3 rounded-2xl border border-gray-300 dark:border-gray-600 outline-primary focus:ring-2 focus:ring-primary w-full md:w-auto transition"
//           />

//           <input
//             type="date"
//             name="checkout"
//             value={dates.checkout}
//             onChange={handleDateChange}
//             min={dates.checkin}
//             className="px-5 py-3 rounded-2xl border border-gray-300 dark:border-gray-600 outline-primary focus:ring-2 focus:ring-primary w-full md:w-auto transition"
//           />

//           <button
//             onClick={checkAvailable}
//             disabled={checking || !!dateError}
//             className="py-3 px-8 bg-[#DCCAB0] text-[#3B2F2F] rounded-2xl hover:opacity-90 transition font-semibold w-full md:w-auto dark:bg-[#A78256] dark:text-[#FFF5E1]"
//           >
//             {checking ? "Checking..." : "Check "}
//           </button>
//         </div>

//         {dateError && <p className="mt-2 text-red-600 font-medium">{dateError}</p>}
//         {error && <p className="mt-2 text-red-600 font-medium">{error}</p>}
//       </div>

//       {/* DYNAMIC ROOM TYPE CARDS (Enhanced for Beauty and Dynamics) */}
//       <div className="container mx-auto px-5 max-w-6xl mt-20">
//         <h2 className="text-3xl font-bold text-center mb-12">Types of Rooms</h2>

//         {loadingRooms ? (
//           <p className="text-center text-lg">Loading room types...</p>
//         ) : rooms.length === 0 ? (
//           <p className="text-center text-lg">No room types available at the moment.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//             {rooms.map((room: any) => (
//               <div
//                 key={room._id}
//                 className="bg-gradient-to-br from-[#F0E3D6] to-[#DCCAB0] dark:from-[#3A352F] dark:to-[#5B4E43]
//                           rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 p-6 flex flex-col items-center text-center overflow-hidden"
//               >
//                 {/* Image Section */}
//                 <div className="w-full h-48 relative overflow-hidden rounded-2xl mb-4">
//                   <Image
//                     src={room.image || "/default-room.jpg"} // Fallback image if none provided
//                     alt={room.name || "Room Image"}
//                     fill
//                     className="object-cover transition-transform duration-300 hover:scale-110"
//                   />
//                 </div>

//                 {/* Room Details */}
//                 <h3 className="text-2xl font-semibold mb-2">{room.name}</h3>
//                 {room.description && (
//                   <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-3">
//                     {room.description}
//                   </p>
//                 )}
//                 {room.capacity && (
//                   <p className="text-sm font-medium mb-2">
//                     Capacity: {room.capacity} guests
//                   </p>
//                 )}
//                 {room.price && (
//                   <p className="text-lg font-bold text-[#A78256] dark:text-[#DCCAB0] mb-4">
//                     ${room.price} / night
//                   </p>
//                 )}
//                 {room.features && room.features.length > 0 && (
//                   <ul className="text-xs text-gray-600 dark:text-gray-400 mb-4 space-y-1">
//                     {room.features.slice(0, 3).map((feature: string, index: number) => (
//                       <li key={index}>• {feature}</li>
//                     ))}
//                     {room.features.length > 3 && <li>• ...and more</li>}
//                   </ul>
//                 )}

//                 {/* Call-to-Action Button */}
//                 <button
//                   className="mt-auto py-2 px-6 bg-[#A78256] text-[#FFF5E1] rounded-xl hover:bg-[#8B6A47] transition font-semibold"
//                   onClick={() => {
//                     // Add logic here, e.g., navigate to booking form or open modal
//                     alert(`Booking ${room.name} from ${dates.checkin} to ${dates.checkout}`);
//                   }}
//                 >
//                   Book Now
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }