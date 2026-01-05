// "use client";
// import React, { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import { useRole } from "@/hooks/useRole";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";
// import ProtectedRoute from "@/components/Auth/ProtectedRoute";

// type Reservation = {
//   _id: string;
//   room?: { name?: string; roomType?: string; _id?: string };
//   checkin: string;
//   checkout: string;
//   guests: number;
//   guestPhone: string;
//   guestEmail: string;
//   additionalServices?: {
//     spa?: boolean;
//     wakeup?: boolean;
//     wakeupTime?: string;
//     airport?: boolean;
//     airportTime?: string;
//   };
//   status?: string;
//   cancelledBy?: { name: string; role: string };
//   reservationId?: string;
//   price?: number; // Added price to the type
//   invoiceHtml?: string;
//   bill?: any;
// };

// export default function ReservationTablePage() {
//   const { data: session } = useSession();
//   const { userRole } = useRole();
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const created = searchParams.get("created");
//   const [reservations, setReservations] = useState<Reservation[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [actionLoading, setActionLoading] = useState<string | null>(null);
//   const [completedMsg, setCompletedMsg] = useState("");
//   const [cancelMsg, setCancelMsg] = useState("");
//   const [feedbackStatus, setFeedbackStatus] = useState<{[key: string]: boolean}>({});

//   // Handler for check-in
//   const handleCheckIn = async (id: string) => {
//     setActionLoading(id + '-checkin');
//     try {
//       const res = await fetch(`http://localhost:3001/reservations/${id}/checkin`, { method: 'PATCH' });
//       if (!res.ok) throw new Error('Check-in failed');
//       // Refresh reservations
//       setReservations((prev) => prev.map(r => r._id === id ? { ...r, status: 'Checked In' } : r));
//     } catch (e) {
//       alert('Check-in failed');
//     } finally {
//       setActionLoading(null);
//     }
//   };
//   // Handler for payment
//   const handlePayment = async (id: string, reservationId: string, price: number) => {
//     setActionLoading(id + '-pay');
//     try {
//       // Call backend to create Stripe session
//       const stripeRes = await fetch("http://localhost:3001/create-checkout-session", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           amount: price,
//           reservationId: reservationId,
//         }),
//       });
//       const stripeData = await stripeRes.json();
//       if (!stripeRes.ok) throw new Error(stripeData.error || "Failed to create Stripe session");
//       window.location.href = stripeData.url;
//     } catch (e) {
//       alert('Payment initiation failed');
//     } finally {
//       setActionLoading(null);
//     }
//   };
//   // Handler for cancel
//   const handleCancel = async (id: string) => {
//     setActionLoading(id + '-cancel');
//     try {
//       const res = await fetch(`http://localhost:3001/reservations/${id}/cancel`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           userId: session?.user?.id,
//           name: session?.user?.name,
//           role: userRole
//         })
//       });
//       if (!res.ok) throw new Error('Cancel failed');
//       const data = await res.json();
//       setReservations((prev) => prev.map(r => r._id === id ? { ...r, status: 'Cancelled', cancelledBy: data.reservation.cancelledBy } : r));
//     } catch (e) {
//       alert('Cancel failed');
//     } finally {
//       setActionLoading(null);
//     }
//   };
//   // Handler for check-out
//   const handleCheckOut = async (id: string) => {
//     setActionLoading(id + '-checkout');
//     try {
//       const res = await fetch(`http://localhost:3001/reservations/${id}/checkout`, { method: 'PATCH' });
//       if (!res.ok) throw new Error('Check-out failed');
//       setReservations((prev) => prev.map(r => r._id === id ? { ...r, status: 'Checked Out' } : r));
//       setCompletedMsg('Reservation completed successfully!');
//       setTimeout(() => setCompletedMsg(''), 4000);
//     } catch (e) {
//       alert('Check-out failed');
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   // Helper: show Check In button only between checkin and checkout (inclusive)
//   const canShowCheckIn = (r: Reservation) => {
//     if (r.status !== 'Confirmed') return false;
//     const today = new Date();
//     today.setHours(0,0,0,0);
//     const checkinDate = new Date(r.checkin);
//     checkinDate.setHours(0,0,0,0);
//     const checkoutDate = new Date(r.checkout);
//     checkoutDate.setHours(0,0,0,0);
//     return today >= checkinDate && today <= checkoutDate;
//   };

//   // Add a function to fetch a single reservation by ID
//   const fetchReservationById = async (id: string) => {
//     const res = await fetch(`http://localhost:3001/reservations/by-id/${id}`);
//     if (!res.ok) throw new Error("Failed to fetch reservation");
//     const data = await res.json();
//     return data.reservation;
//   };

//   // Check feedback status for reservations
//   const checkFeedbackStatus = async (reservationId: string) => {
//     try {
//       const res = await fetch(`http://localhost:3001/feedback/check/${reservationId}`);
//       const data = await res.json();
//       setFeedbackStatus(prev => ({
//         ...prev,
//         [reservationId]: data.exists
//       }));
//     } catch (error) {
//       console.error('Error checking feedback status:', error);
//     }
//   };

//   useEffect(() => {
//     if (!session?.user) return;
//     const fetchReservations = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         let url = "";
//         if (userRole === "guest") {
//           const id = session.user.id;
//           const email = encodeURIComponent(session.user.email || "");
//           url = `http://localhost:3001/reservations/guest/${id}?email=${email}`;
//         } else if (userRole === "receptionist" || userRole === "admin" || userRole === "manager") {
//           url = `http://localhost:3001/reservations/all`;
//         } else {
//           setReservations([]);
//           setLoading(false);
//           return;
//         }
//         const res = await fetch(url);
//         const data = await res.json();
//         if (!res.ok) throw new Error(data.message || "Failed to fetch reservations");
//         const fetchedReservations = data.reservations || data.allReservations || [];
//         setReservations(fetchedReservations);

//         // Check feedback status for checked out reservations
//         if (userRole === "guest") {
//           fetchedReservations.forEach((r: Reservation) => {
//             if (r.status === 'Checked Out' && r.reservationId) {
//               checkFeedbackStatus(r.reservationId);
//             }
//           });
//         }
//       } catch (e) {
//         setError(e instanceof Error ? e.message : "Error fetching reservations");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchReservations();
//   }, [session?.user, userRole]);

//   if (!session?.user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
//         Please sign in to view your reservations.
//       </div>
//     );
//   }

//   return (
//     <ProtectedRoute allowedRoles={['guest','receptionist','admin', 'manager']}>
//       <>
//     <section className="!pt-44 pb-20 min-h-screen bg-gray-50 dark:bg-gray-900">
//       <div className="container mx-auto max-w-6xl px-5 2xl:px-0">
//         <h1 className="text-3xl font-bold mb-8 text-dark dark:text-white text-center">Reservations</h1>
//         {created === "1" && (
//           <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4 font-semibold text-center">
//             Reservation created successfully!
//           </div>
//         )}
//         {loading ? (
//           <div className="text-center py-10 text-lg">Loading...</div>
//         ) : error ? (
//           <div className="text-center text-red-500 font-medium py-10">{error}</div>
//         ) : reservations.length === 0 ? (
//           <div className="text-center text-dark/60 dark:text-white/60 py-10">No reservations found.</div>
//         ) : (
//           <div className="overflow-x-auto rounded-xl shadow-lg bg-white dark:bg-gray-900">
//             <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//               <thead className="bg-gray-100 dark:bg-gray-800">
//                 <tr>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">Reservation Id</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">Room</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">Check-in</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">Check-out</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">Guests</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">Phone</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">Email</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">Additional Services</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">Status</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
//                 {reservations.map((r, idx) => (
//                   <tr key={r._id || idx}>
//                     <td className="px-4 py-3 whitespace-nowrap">{r.reservationId}</td>
//                     <td className="px-4 py-3 whitespace-nowrap">
//                       <div className="font-semibold text-dark dark:text-white">{r.room?.name || "-"}</div>
//                       <div className="text-xs text-dark/60 dark:text-white/60">{r.room?.roomType || "-"}</div>
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap">{new Date(r.checkin).toLocaleDateString()}</td>
//                     <td className="px-4 py-3 whitespace-nowrap">{new Date(r.checkout).toLocaleDateString()}</td>
//                     <td className="px-4 py-3 whitespace-nowrap">{r.guests}</td>
//                     <td className="px-4 py-3 whitespace-nowrap">{r.guestPhone}</td>
//                     <td className="px-4 py-3 whitespace-nowrap">{r.guestEmail}</td>
//                     <td className="px-4 py-3 whitespace-nowrap">
//                       <ul className="text-xs text-dark/70 dark:text-white/70">
//                         <li><b>Spa:</b> {r.additionalServices?.spa ? "Yes" : "No"}</li>
//                         <li><b>Wake-up Call:</b> {r.additionalServices?.wakeup ? `Yes, at ${r.additionalServices?.wakeupTime || "-"}` : "No"}</li>
//                         <li><b>Airport Pickup:</b> {r.additionalServices?.airport ? `Yes, at ${r.additionalServices?.airportTime || "-"}` : "No"}</li>
//                       </ul>
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap">{r.status}</td>
//                     <td className="px-4 py-3 whitespace-nowrap">
//                       {/* Pending actions for guest, receptionist, admin, and manager */}
//                       {r.status === 'Pending' && (
//                         <>
//                           {userRole === 'guest' && (
//                             <button
//                               className="py-1 px-4 bg-yellow-500 text-white rounded-full text-sm font-semibold hover:bg-yellow-600 disabled:opacity-60 mr-2"
//                               onClick={() => handlePayment(r._id, r.reservationId || '', (r as any).price || 0)}
//                               disabled={actionLoading === r._id + '-pay'}
//                             >
//                               {actionLoading === r._id + '-pay' ? 'Redirecting...' : 'Pay Now'}
//                             </button>
//                           )}
//                           {(userRole === 'guest' || userRole === 'receptionist' || userRole === 'admin' || userRole === 'manager') && (
//                             <button
//                               className="py-1 px-4 bg-red-600 text-white rounded-full text-sm font-semibold hover:bg-red-700 disabled:opacity-60"
//                               onClick={() => handleCancel(r._id)}
//                               disabled={actionLoading === r._id + '-cancel'}
//                             >
//                               {actionLoading === r._id + '-cancel' ? 'Cancelling...' : 'Cancel'}
//                             </button>
//                           )}
//                         </>
//                       )}

//                       {/* Confirmed reservations - only guest can check-in, staff can cancel */}
//                       {r.status === 'Confirmed' && (
//                         <>
//                           {/* Guest can check-in if it's their check-in date */}
//                           {userRole === 'guest' && (
//                             canShowCheckIn(r) ? (
//                               <button
//                                 className="py-1 px-4 bg-green-600 text-white rounded-full text-sm font-semibold hover:bg-green-700 disabled:opacity-60"
//                                 onClick={() => handleCheckIn(r._id)}
//                                 disabled={actionLoading === r._id + '-checkin'}
//                               >
//                                 {actionLoading === r._id + '-checkin' ? 'Checking In...' : 'Check In'}
//                               </button>
//                             ) : (
//                               <div className="text-red-500 font-semibold">Your check-in date is not today.</div>
//                             )
//                           )}

//                           {/* Staff can cancel confirmed reservations if guest doesn't come */}
//                           {(userRole === 'receptionist' || userRole === 'admin' || userRole === 'manager') && (
//                             <button
//                               className="py-1 px-4 bg-red-600 text-white rounded-full text-sm font-semibold hover:bg-red-700 disabled:opacity-60"
//                               onClick={() => handleCancel(r._id)}
//                               disabled={actionLoading === r._id + '-cancel'}
//                             >
//                               {actionLoading === r._id + '-cancel' ? 'Cancelling...' : 'Cancel (Guest No Come)'}
//                             </button>
//                           )}
//                         </>
//                       )}

//                       {/* Checked In reservations - only guest can check-out */}
//                       {r.status === 'Checked In' && (
//                         <>
//                           {/* Only guest can check-out */}
//                           {userRole === 'guest' && (
//                             <>
//                               <button
//                                 className="py-1 px-4 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 disabled:opacity-60 mr-2"
//                                 onClick={() => handleCheckOut(r._id)}
//                                 disabled={actionLoading === r.reservationId + '-checkout'}
//                               >
//                                 {actionLoading === r._id + '-checkout' ? 'Checking Out...' : 'Check Out'}
//                               </button>
//                               <Link
//                                 href={`/report?reservationId=${r.reservationId}`}
//                                 className="py-1 px-4 bg-indigo-600 text-white rounded-full text-sm font-semibold hover:bg-indigo-700 disabled:opacity-60"
//                               >
//                                 Maintenance Request
//                               </Link>
//                             </>
//                           )}

//                           {/* Staff can see status but cannot check-out */}
//                           {(userRole === 'receptionist' || userRole === 'admin' || userRole === 'manager') && (
//                             <span className="text-blue-700 font-semibold">Guest Checked In</span>
//                           )}
//                         </>
//                       )}

//                       {/* Completed reservations for guest, receptionist, admin, and manager */}
//                       {(userRole === 'guest' || userRole === 'receptionist' || userRole === 'admin' || userRole === 'manager') && r.status === 'Checked Out' && (
//                         <>
//                           <span className="text-green-700 font-semibold">Reservation Completed</span>
//                           <Link
//                             href={`/invoice/${r._id}`}
//                             className="ml-2 py-1 px-4 bg-gray-700 text-white rounded-full text-sm font-semibold hover:bg-gray-900 disabled:opacity-60 inline-block"
//                           >
//                             View Invoice
//                           </Link>
//                           {userRole === 'guest' && r.room?._id && (
//                             <Link
//                               href={`/feedback/room/${r.room._id}?reservationId=${r.reservationId}`}
//                               className={`ml-2 py-1 px-4 rounded-full text-sm font-semibold inline-block ${
//                                 feedbackStatus[r.reservationId || '']
//                                   ? 'bg-green-600 text-white cursor-not-allowed opacity-60'
//                                   : 'bg-blue-600 text-white hover:bg-blue-700'
//                               }`}
//                             >
//                               {feedbackStatus[r.reservationId || ''] ? 'Feedback Submitted' : 'Leave Feedback'}
//                             </Link>
//                           )}
//                         </>
//                       )}

//                       {/* Status display for receptionist, admin, and manager */}
//                       {(userRole === 'receptionist' || userRole === 'admin' || userRole === 'manager') && r.status !== 'Pending' && r.status !== 'Confirmed' && r.status !== 'Checked In' && r.status !== 'Checked Out' && (
//                         <span className={
//                           r.status === 'Cancelled' ? 'text-red-700 font-semibold' :
//                           r.status === 'Checked Out' ? 'text-green-700 font-semibold' :
//                           r.status === 'Checked In' ? 'text-blue-700 font-semibold' :
//                           'text-gray-700 font-semibold'
//                         }>
//                           {r.status === 'Cancelled'
//                             ? `Reservation cancelled by ${r.cancelledBy?.name || 'Unknown'} (${r.cancelledBy?.role || 'role'})`
//                             : r.status === 'Checked In'
//                             ? 'Checked In'
//                             : r.status === 'Confirmed'
//                             ? 'Confirmed'
//                             : r.status}
//                         </span>
//                       )}

//                       {userRole === 'guest' && r.status === 'Cancelled' && (
//                         <span className="text-red-700 font-semibold">Reservation cancelled by {r.cancelledBy?.name || 'Unknown'} ({r.cancelledBy?.role || 'role'})</span>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//         {completedMsg && (
//           <div className="text-center text-green-600 font-semibold mb-4">{completedMsg}</div>
//         )}
//         {cancelMsg && (
//           <div className="text-center text-red-600 font-semibold mb-4">{cancelMsg}</div>
//         )}
//       </div>

//     </section>
//     </>
//     </ProtectedRoute>
//   );
// } 










"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRole } from "@/hooks/useRole";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";

type Reservation = {
  _id: string;
  room?: { name?: string; roomType?: string; _id?: string };
  checkin: string;
  checkout: string;
  guests: number;
  guestPhone: string;
  guestEmail: string;
  additionalServices?: {
    spa?: boolean;
    wakeup?: boolean;
    wakeupTime?: string;
    airport?: boolean;
    airportTime?: string;
  };
  status?: string;
  cancelledBy?: { name: string; role: string };
  reservationId?: string;
  price?: number;
  invoiceHtml?: string;
  bill?: any;
};

export default function ReservationTablePage() {
  const { data: session } = useSession();
  const { userRole } = useRole();
  const router = useRouter();
  const searchParams = useSearchParams();
  const created = searchParams.get("created");

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [completedMsg, setCompletedMsg] = useState("");
  const [cancelMsg, setCancelMsg] = useState("");
  const [feedbackStatus, setFeedbackStatus] = useState<{ [key: string]: boolean }>({});

  /* ================= EXISTING LOGIC (UNCHANGED) ================= */
  const handleCheckIn = async (id: string) => {
    setActionLoading(id + "-checkin");
    try {
      const res = await fetch(`http://localhost:3001/reservations/${id}/checkin`, { method: "PATCH" });
      if (!res.ok) throw new Error();
      setReservations(prev => prev.map(r => r._id === id ? { ...r, status: "Checked In" } : r));
    } catch {
      alert("Check-in failed");
    } finally {
      setActionLoading(null);
    }
  };

  const handlePayment = async (id: string, reservationId: string, price: number) => {
    setActionLoading(id + "-pay");
    try {
      const res = await fetch("http://localhost:3001/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: price, reservationId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error();
      window.location.href = data.url;
    } catch {
      alert("Payment failed");
    } finally {
      setActionLoading(null);
    }
  };

  const handleCancel = async (id: string) => {
    setActionLoading(id + "-cancel");
    try {
      const res = await fetch(`http://localhost:3001/reservations/${id}/cancel`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session?.user?.id,
          name: session?.user?.name,
          role: userRole,
        }),
      });
      const data = await res.json();
      setReservations(prev =>
        prev.map(r =>
          r._id === id ? { ...r, status: "Cancelled", cancelledBy: data.reservation.cancelledBy } : r
        )
      );
    } catch {
      alert("Cancel failed");
    } finally {
      setActionLoading(null);
    }
  };

  const handleCheckOut = async (id: string) => {
    setActionLoading(id + "-checkout");
    try {
      const res = await fetch(`http://localhost:3001/reservations/${id}/checkout`, { method: "PATCH" });
      if (!res.ok) throw new Error();
      setReservations(prev => prev.map(r => r._id === id ? { ...r, status: "Checked Out" } : r));
      setCompletedMsg("Reservation completed successfully!");
      setTimeout(() => setCompletedMsg(""), 4000);
    } catch {
      alert("Check-out failed");
    } finally {
      setActionLoading(null);
    }
  };

  const canShowCheckIn = (r: Reservation) => {
    if (r.status !== "Confirmed") return false;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const ci = new Date(r.checkin); ci.setHours(0, 0, 0, 0);
    const co = new Date(r.checkout); co.setHours(0, 0, 0, 0);
    return today >= ci && today <= co;
  };

  const checkFeedbackStatus = async (reservationId: string) => {
    const res = await fetch(`http://localhost:3001/feedback/check/${reservationId}`);
    const data = await res.json();
    setFeedbackStatus(prev => ({ ...prev, [reservationId]: data.exists }));
  };

  useEffect(() => {
    if (!session?.user) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        let url = "";
        if (userRole === "guest") {
          url = `http://localhost:3001/reservations/guest/${session.user.id}?email=${encodeURIComponent(session.user.email || "")}`;
        } else {
          url = `http://localhost:3001/reservations/all`;
        }
        const res = await fetch(url);
        const data = await res.json();
        setReservations(data.reservations || data.allReservations || []);
        if (userRole === "guest") {
          data.reservations?.forEach((r: Reservation) => {
            if (r.status === "Checked Out" && r.reservationId) checkFeedbackStatus(r.reservationId);
          });
        }
      } catch (e) {
        setError("Failed to load reservations");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [session?.user, userRole]);

  if (!session?.user) {
    return <div className="min-h-screen flex items-center justify-center">Please sign in</div>;
  }

  return (
    <ProtectedRoute allowedRoles={["guest", "receptionist", "admin", "manager"]}>
      <section className="pt-44 pb-20 min-h-screen bg-[#F5F0E1] dark:bg-[#1E1B18] text-[#3B2F2F] dark:text-[#F2E9E1] transition-colors">
        <div className="max-w-7xl mx-auto px-5">
          <h1 className="text-3xl font-bold mb-8 text-center">Reservations</h1>

          {created === "1" && (
            <div className="bg-green-200 text-green-900 px-4 py-2 rounded-lg mb-4 text-center font-semibold">
              Reservation created successfully!
            </div>
          )}

          {loading ? (
            <div className="text-center py-10">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-600 py-10">{error}</div>
          ) : (
            <div className="overflow-x-auto rounded-2xl shadow-2xl">
              <table className="min-w-full border-collapse">
                <thead className="bg-[#DCCAB0] dark:bg-[#5B4E43]">
                  <tr>
                    {["Reservation Id", "Room", "Check-in", "Check-out", "Guests", "Phone", "Email", "Services", "Status", "Action"].map(h => (
                      <th key={h} className="px-4 py-3 text-left">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((r, i) => (
                    <tr
                      key={r._id || i}
                      className="bg-[#F0E3D6] dark:bg-[#3A352F] border-b border-[#DCCAB0] dark:border-[#5B4E43] hover:scale-[1.01] transition"
                    >
                      <td className="px-4 py-3">{r.reservationId}</td>
                      <td className="px-4 py-3">
                        <div className="font-semibold">{r.room?.name}</div>
                        <div className="text-xs opacity-70">{r.room?.roomType}</div>
                      </td>
                      <td className="px-4 py-3">{new Date(r.checkin).toLocaleDateString()}</td>
                      <td className="px-4 py-3">{new Date(r.checkout).toLocaleDateString()}</td>
                      <td className="px-4 py-3">{r.guests}</td>
                      <td className="px-4 py-3">{r.guestPhone}</td>
                      <td className="px-4 py-3">{r.guestEmail}</td>
                      <td className="px-4 py-3 text-xs">
                        Spa: {r.additionalServices?.spa ? "Yes" : "No"} <br />
                        Wakeup: {r.additionalServices?.wakeup ? "Yes" : "No"} <br />
                        Airport: {r.additionalServices?.airport ? "Yes" : "No"}
                      </td>
                      <td className="px-4 py-3 font-semibold">{r.status}</td>
                      <td className="px-4 py-3">
                        {/* ACTIONS — COMPLETELY UNCHANGED */}
                        {/* Pending actions for guest, receptionist, admin, and manager */}
                        {r.status === 'Pending' && (
                          <>
                            {userRole === 'guest' && (
                              <button
                                className="py-1 px-4 bg-yellow-500 text-white rounded-full text-sm font-semibold hover:bg-yellow-600 disabled:opacity-60 mr-2"
                                onClick={() => handlePayment(r._id, r.reservationId || '', (r as any).price || 0)}
                                disabled={actionLoading === r._id + '-pay'}
                              >
                                {actionLoading === r._id + '-pay' ? 'Redirecting...' : 'Pay Now'}
                              </button>
                            )}
                            {(userRole === 'guest' || userRole === 'receptionist' || userRole === 'admin' || userRole === 'manager') && (
                              <button
                                className="py-1 px-4 bg-red-600 text-white rounded-full text-sm font-semibold hover:bg-red-700 disabled:opacity-60"
                                onClick={() => handleCancel(r._id)}
                                disabled={actionLoading === r._id + '-cancel'}
                              >
                                {actionLoading === r._id + '-cancel' ? 'Cancelling...' : 'Cancel'}
                              </button>
                            )}
                          </>
                        )}

                        {/* Confirmed reservations */}
                        {r.status === 'Confirmed' && (
                          <>
                            {userRole === 'guest' && (
                              canShowCheckIn(r) ? (
                                <button
                                  className="py-1 px-4 bg-green-600 text-white rounded-full text-sm font-semibold hover:bg-green-700 disabled:opacity-60"
                                  onClick={() => handleCheckIn(r._id)}
                                  disabled={actionLoading === r._id + '-checkin'}
                                >
                                  {actionLoading === r._id + '-checkin' ? 'Checking In...' : 'Check In'}
                                </button>
                              ) : (
                                <div className="text-red-500 font-semibold">
                                  Your check-in date is not today.
                                </div>
                              )
                            )}

                            {(userRole === 'receptionist' || userRole === 'admin' || userRole === 'manager') && (
                              <button
                                className="py-1 px-4 bg-red-600 text-white rounded-full text-sm font-semibold hover:bg-red-700 disabled:opacity-60"
                                onClick={() => handleCancel(r._id)}
                                disabled={actionLoading === r._id + '-cancel'}
                              >
                                {actionLoading === r._id + '-cancel' ? 'Cancelling...' : 'Cancel (Guest No Come)'}
                              </button>
                            )}
                          </>
                        )}

                        {/* Checked In reservations */}
                        {r.status === 'Checked In' && (
                          <>
                            {userRole === 'guest' && (
                              <>
                                <button
                                  className="py-1 px-4 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 disabled:opacity-60 mr-2"
                                  onClick={() => handleCheckOut(r._id)}
                                  disabled={actionLoading === r._id + '-checkout'}
                                >
                                  {actionLoading === r._id + '-checkout' ? 'Checking Out...' : 'Check Out'}
                                </button>
                                <Link
                                  href={`/report?reservationId=${r.reservationId}`}
                                  className="py-1 px-4 bg-indigo-600 text-white rounded-full text-sm font-semibold hover:bg-indigo-700"
                                >
                                  Maintenance Request
                                </Link>
                              </>
                            )}

                            {(userRole === 'receptionist' || userRole === 'admin' || userRole === 'manager') && (
                              <span className="text-blue-700 font-semibold">Guest Checked In</span>
                            )}
                          </>
                        )}

                        {/* Checked Out reservations */}
                        {(userRole === 'guest' || userRole === 'receptionist' || userRole === 'admin' || userRole === 'manager') && r.status === 'Checked Out' && (
                          <>
                            <span className="text-green-700 font-semibold">Reservation Completed</span>
                            <Link
                              href={`/invoice/${r._id}`}
                              className="ml-2 py-1 px-4 bg-gray-700 text-white rounded-full text-sm font-semibold hover:bg-gray-900 inline-block"
                            >
                              View Invoice
                            </Link>

                            {userRole === 'guest' && r.room?._id && (
                              <Link
                                href={`/feedback/room/${r.room._id}?reservationId=${r.reservationId}`}
                                className={`ml-2 py-1 px-4 rounded-full text-sm font-semibold inline-block ${feedbackStatus[r.reservationId || '']
                                    ? 'bg-green-600 text-white cursor-not-allowed opacity-60'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                  }`}
                              >
                                {feedbackStatus[r.reservationId || ''] ? 'Feedback Submitted' : 'Leave Feedback'}
                              </Link>
                            )}
                          </>
                        )}

                        {/* Cancelled status */}
                        {userRole === 'guest' && r.status === 'Cancelled' && (
                          <span className="text-red-700 font-semibold">
                            Reservation cancelled by {r.cancelledBy?.name || 'Unknown'} ({r.cancelledBy?.role || 'role'})
                          </span>
                        )}

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {completedMsg && <div className="text-green-600 text-center mt-4 font-semibold">{completedMsg}</div>}
          {cancelMsg && <div className="text-red-600 text-center mt-4 font-semibold">{cancelMsg}</div>}
        </div>
      </section>
    </ProtectedRoute>
  );
}









// "use client";
// import React, { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import { useRole } from "@/hooks/useRole";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";
// import ProtectedRoute from "@/components/Auth/ProtectedRoute";

// type Reservation = {
//   _id: string;
//   room?: { name?: string; roomType?: string; _id?: string };
//   checkin: string;
//   checkout: string;
//   guests: number;
//   guestPhone: string;
//   guestEmail: string;
//   additionalServices?: {
//     spa?: boolean;
//     wakeup?: boolean;
//     wakeupTime?: string;
//     airport?: boolean;
//     airportTime?: string;
//   };
//   status?: string;
//   cancelledBy?: { name: string; role: string };
//   reservationId?: string;
//   price?: number;
// };

// export default function ReservationTablePage() {
//   const { data: session } = useSession();
//   const { userRole } = useRole();
//   const searchParams = useSearchParams();
//   const created = searchParams.get("created");
//   const [reservations, setReservations] = useState<Reservation[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [actionLoading, setActionLoading] = useState<string | null>(null);

//   const [checkInDates, setCheckInDates] = useState<{ [key: string]: string }>({});
//   const [checkOutDates, setCheckOutDates] = useState<{ [key: string]: string }>({});
//   const [checkedInReservations, setCheckedInReservations] = useState<Set<string>>(new Set());

//   // Manual check-in
//   const handleManualCheckIn = (id: string) => {
//     const dateTime = checkInDates[id];
//     if (!dateTime) return alert("Please enter check-in date and time.");

//     setCheckedInReservations(prev => new Set(prev).add(id));
//     setReservations(prev =>
//       prev.map(r =>
//         r._id === id
//           ? { ...r, status: `Checked In on ${dateTime}`, checkin: dateTime }
//           : r
//       )
//     );
//   };

//   // Manual check-out
//   const handleManualCheckOut = (id: string) => {
//     const dateTime = checkOutDates[id];
//     if (!dateTime) return alert("Please enter check-out date and time.");

//     setReservations(prev =>
//       prev.map(r =>
//         r._id === id
//           ? { ...r, status: `Checked Out on ${dateTime}`, checkout: dateTime }
//           : r
//       )
//     );
//     setCheckedInReservations(prev => {
//       const newSet = new Set(prev);
//       newSet.delete(id);
//       return newSet;
//     });
//   };

//   const handleCancel = async (id: string) => {
//     setActionLoading(id + "-cancel");
//     try {
//       const res = await fetch(`http://localhost:3001/reservations/${id}/cancel`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: session?.user?.id,
//           name: session?.user?.name,
//           role: userRole,
//         }),
//       });
//       if (!res.ok) throw new Error("Cancel failed");
//       const data = await res.json();
//       setReservations(prev =>
//         prev.map(r =>
//           r._id === id
//             ? { ...r, status: "Cancelled", cancelledBy: data.reservation.cancelledBy }
//             : r
//         )
//       );
//     } catch {
//       alert("Cancel failed");
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const handlePayment = async (id: string, reservationId: string, price: number) => {
//     setActionLoading(id + "-pay");
//     try {
//       const stripeRes = await fetch("http://localhost:3001/create-checkout-session", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ amount: price, reservationId }),
//       });
//       const stripeData = await stripeRes.json();
//       if (!stripeRes.ok) throw new Error(stripeData.error || "Failed to create Stripe session");
//       window.location.href = stripeData.url;
//     } catch {
//       alert("Payment initiation failed");
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   useEffect(() => {
//     if (!session?.user) return;
//     const fetchReservations = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         let url = "";
//         if (userRole === "guest") {
//           const id = session.user.id;
//           url = `http://localhost:3001/reservations/guest/${id}`;
//         } else if (["receptionist", "admin", "manager"].includes(userRole)) {
//           url = `http://localhost:3001/reservations/all`;
//         } else {
//           setReservations([]);
//           setLoading(false);
//           return;
//         }
//         const res = await fetch(url);
//         const data = await res.json();
//         if (!res.ok) throw new Error(data.message || "Failed to fetch reservations");
//         const fetchedReservations = data.reservations || data.allReservations || [];
//         setReservations(fetchedReservations);
//       } catch (e) {
//         setError(e instanceof Error ? e.message : "Error fetching reservations");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchReservations();
//   }, [session?.user, userRole]);

//   if (!session?.user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
//         Please sign in to view your reservations.
//       </div>
//     );
//   }

//   return (
//     <ProtectedRoute allowedRoles={["guest", "receptionist", "admin", "manager"]}>
//       <section className="!pt-36 pb-20 min-h-screen bg-[#F5F0E1] dark:bg-[#1E1B18] transition-colors">
//         <div className="container mx-auto max-w-6xl px-5 2xl:px-0">
//           <h1 className="text-3xl font-bold mb-8 text-[#3B2F2F] dark:text-[#F2E9E1] text-center">
//             Reservations
//           </h1>
//           {loading ? (
//             <div className="text-center py-10 text-lg">Loading...</div>
//           ) : error ? (
//             <div className="text-center text-red-600 font-semibold py-10">{error}</div>
//           ) : reservations.length === 0 ? (
//             <div className="text-center text-[#3B2F2F]/60 dark:text-[#F2E9E1]/60 py-10">
//               No reservations found.
//             </div>
//           ) : (
//             <div className="overflow-x-auto rounded-xl shadow-lg bg-[#FFF5E1] dark:bg-[#3A352F]">
//               <table className="min-w-full divide-y divide-[#D8D1C8] dark:divide-[#5C524B]">
//                 <thead className="bg-[#F0E3D6] dark:bg-[#5B4E43]">
//                   <tr>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-[#3B2F2F] dark:text-[#F2E9E1] uppercase tracking-wider">
//                       Reservation Id
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-[#3B2F2F] dark:text-[#F2E9E1] uppercase tracking-wider">
//                       Room
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-[#3B2F2F] dark:text-[#F2E9E1] uppercase tracking-wider">
//                       Check-in
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-[#3B2F2F] dark:text-[#F2E9E1] uppercase tracking-wider">
//                       Check-out
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-[#3B2F2F] dark:text-[#F2E9E1] uppercase tracking-wider">
//                       Guests
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-[#3B2F2F] dark:text-[#F2E9E1] uppercase tracking-wider">
//                       Phone
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-[#3B2F2F] dark:text-[#F2E9E1] uppercase tracking-wider">
//                       Email
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-[#3B2F2F] dark:text-[#F2E9E1] uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-[#FFF5E1] dark:bg-[#3A352F] divide-y divide-[#D8D1C8] dark:divide-[#5C524B]">
//                   {reservations.map((r) => {
//                     const showCheckIn = ["Pending", "Cancelled"].includes(r.status ?? "") && !checkedInReservations.has(r._id);
//                     const showCheckOut = checkedInReservations.has(r._id);
//                     return (
//                       <tr key={r._id}>
//                         <td className="px-4 py-3">{r.reservationId}</td>
//                         <td className="px-4 py-3">{r.room?.name} ({r.room?.roomType})</td>
//                         <td className="px-4 py-3">
//                           {["Pending", "Cancelled"].includes(r.status ?? "")
//                             ? "--"
//                             : new Date(r.checkin).toLocaleString()}
//                         </td>
//                         <td className="px-4 py-3">
//                           {["Pending", "Cancelled"].includes(r.status ?? "")
//                             ? "--"
//                             : new Date(r.checkout).toLocaleString()}
//                         </td>
//                         <td className="px-4 py-3">{r.guests}</td>
//                         <td className="px-4 py-3">{r.guestPhone}</td>
//                         <td className="px-4 py-3">{r.guestEmail}</td>
//                         <td className="px-4 py-3 space-y-2">
//                           {userRole === "guest" && (
//                             <>
//                               <button
//                                 className="py-1 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:opacity-60 w-full"
//                                 onClick={() => handlePayment(r._id, r.reservationId || "", r.price || 0)}
//                                 disabled={actionLoading === r._id + "-pay"}
//                               >
//                                 Pay Now
//                               </button>
//                             </>
//                           )}

//                           {["receptionist", "admin", "manager"].includes(userRole) && (
//                             <>
//                               {showCheckIn && (
//                                 <>
//                                   <input
//                                     type="datetime-local"
//                                     className="w-full border rounded px-2 py-1"
//                                     value={checkInDates[r._id] || ""}
//                                     onChange={(e) =>
//                                       setCheckInDates({ ...checkInDates, [r._id]: e.target.value })
//                                     }
//                                   />
//                                   <button
//                                     className="py-1 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 w-full"
//                                     onClick={() => handleManualCheckIn(r._id)}
//                                   >
//                                     Confirm Check-in
//                                   </button>
//                                 </>
//                               )}

//                               {showCheckOut && (
//                                 <>
//                                   <input
//                                     type="datetime-local"
//                                     className="w-full border rounded px-2 py-1"
//                                     value={checkOutDates[r._id] || ""}
//                                     onChange={(e) =>
//                                       setCheckOutDates({ ...checkOutDates, [r._id]: e.target.value })
//                                     }
//                                   />
//                                   <button
//                                     className="py-1 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full"
//                                     onClick={() => handleManualCheckOut(r._id)}
//                                   >
//                                     Confirm Check-out
//                                   </button>
//                                 </>
//                               )}

//                               {r.status !== "Checked Out" && (
//                                 <button
//                                   className="py-1 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 w-full"
//                                   onClick={() => handleCancel(r._id)}
//                                 >
//                                   Cancel Reservation
//                                 </button>
//                               )}
//                             </>
//                           )}
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </section>
//     </ProtectedRoute>
//   );
// }















// "use client";
// import React, { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import { useRole } from "@/hooks/useRole";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";
// import ProtectedRoute from "@/components/Auth/ProtectedRoute";

// type Reservation = {
//   _id: string;
//   room?: { name?: string; roomType?: string; _id?: string };
//   checkin: string;
//   checkout: string;
//   guests: number;
//   guestPhone: string;
//   guestEmail: string;
//   additionalServices?: {
//     spa?: boolean;
//     wakeup?: boolean;
//     wakeupTime?: string;
//     airport?: boolean;
//     airportTime?: string;
//   };
//   status?: string;
//   cancelledBy?: { name: string; role: string };
//   reservationId?: string;
//   price?: number;
// };

// export default function ReservationTablePage() {
//   const { data: session } = useSession();
//   const { userRole } = useRole();
//   const searchParams = useSearchParams();
//   const created = searchParams.get("created");
//   const [reservations, setReservations] = useState<Reservation[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [actionLoading, setActionLoading] = useState<string | null>(null);

//   const fetchReservations = async () => {
//     if (!session?.user) return;
//     setLoading(true);
//     setError("");
//     try {
//       let url = "";
//       if (userRole === "guest") {
//         const id = session.user.id;
//         url = `http://localhost:3001/reservations/guest/${id}`;
//       } else if (["receptionist", "admin", "manager"].includes(userRole)) {
//         url = `http://localhost:3001/reservations/all`;
//       } else {
//         setReservations([]);
//         setLoading(false);
//         return;
//       }
//       const res = await fetch(url);
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Failed to fetch reservations");
//       const fetchedReservations = data.reservations || data.allReservations || [];
//       setReservations(fetchedReservations);
//     } catch (e) {
//       setError(e instanceof Error ? e.message : "Error fetching reservations");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchReservations();
//   }, [session?.user, userRole]);

//   const handleCancel = async (id: string) => {
//     setActionLoading(id + "-cancel");
//     try {
//       const res = await fetch(`http://localhost:3001/reservations/${id}/cancel`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: session?.user?.id,
//           name: session?.user?.name,
//           role: userRole,
//         }),
//       });
//       if (!res.ok) throw new Error("Cancel failed");
//       const data = await res.json();
//       setReservations((prev) =>
//         prev.map((r) =>
//           r._id === id
//             ? { ...r, status: "Cancelled", cancelledBy: data.reservation.cancelledBy }
//             : r
//         )
//       );
//     } catch {
//       alert("Cancel failed");
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const handleCheckIn = async (id: string) => {
//     setActionLoading(id + "-checkin");
//     try {
//       const res = await fetch(`http://localhost:3001/reservations/${id}/checkin`, { method: "PATCH" });
//       if (!res.ok) throw new Error("Check-in failed");
//       setReservations((prev) =>
//         prev.map((r) => (r._id === id ? { ...r, status: "Checked In" } : r))
//       );
//     } catch {
//       alert("Check-in failed");
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const handleCheckOut = async (id: string) => {
//     setActionLoading(id + "-checkout");
//     try {
//       const res = await fetch(`http://localhost:3001/reservations/${id}/checkout`, { method: "PATCH" });
//       if (!res.ok) throw new Error("Check-out failed");
//       setReservations((prev) =>
//         prev.map((r) => (r._id === id ? { ...r, status: "Checked Out" } : r))
//       );
//     } catch {
//       alert("Check-out failed");
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const handlePayment = async (id: string, reservationId: string, price: number) => {
//     setActionLoading(id + "-pay");
//     try {
//       const stripeRes = await fetch("http://localhost:3001/create-checkout-session", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ amount: price, reservationId }),
//       });
//       const stripeData = await stripeRes.json();
//       if (!stripeRes.ok) throw new Error(stripeData.error || "Failed to create Stripe session");
//       window.location.href = stripeData.url;
//     } catch {
//       alert("Payment initiation failed");
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   if (!session?.user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
//         Please sign in to view your reservations.
//       </div>
//     );
//   }

//   return (
//     <ProtectedRoute allowedRoles={["guest", "receptionist", "admin", "manager"]}>
//       <section className="!pt-36 pb-20 min-h-screen bg-[#F5F0E1] dark:bg-[#1E1B18] transition-colors">
//         <div className="container mx-auto max-w-6xl px-5 2xl:px-0">
//           <h1 className="text-3xl font-bold mb-8 text-[#3B2F2F] dark:text-[#F2E9E1] text-center">
//             Reservations
//           </h1>

//           {created === "1" && (
//             <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4 font-semibold text-center">
//               Reservation created successfully!
//             </div>
//           )}

//           {loading ? (
//             <div className="text-center py-10 text-lg">Loading...</div>
//           ) : error ? (
//             <div className="text-center text-red-600 font-semibold py-10">{error}</div>
//           ) : reservations.length === 0 ? (
//             <div className="text-center text-[#3B2F2F]/60 dark:text-[#F2E9E1]/60 py-10">
//               No reservations found.
//             </div>
//           ) : (
//             <div className="overflow-x-auto rounded-xl shadow-lg bg-[#FFF5E1] dark:bg-[#3A352F]">
//               <table className="min-w-full divide-y divide-[#D8D1C8] dark:divide-[#5C524B]">
//                 <thead className="bg-[#F0E3D6] dark:bg-[#5B4E43]">
//                   <tr>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-[#3B2F2F] dark:text-[#F2E9E1] uppercase tracking-wider">Reservation Id</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-[#3B2F2F] dark:text-[#F2E9E1] uppercase tracking-wider">Room</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-[#3B2F2F] dark:text-[#F2E9E1] uppercase tracking-wider">Check-in</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-[#3B2F2F] dark:text-[#F2E9E1] uppercase tracking-wider">Check-out</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-[#3B2F2F] dark:text-[#F2E9E1] uppercase tracking-wider">Guests</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-[#3B2F2F] dark:text-[#F2E9E1] uppercase tracking-wider">Phone</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-[#3B2F2F] dark:text-[#F2E9E1] uppercase tracking-wider">Email</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-[#3B2F2F] dark:text-[#F2E9E1] uppercase tracking-wider">Status</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-[#3B2F2F] dark:text-[#F2E9E1] uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-[#FFF5E1] dark:bg-[#3A352F] divide-y divide-[#D8D1C8] dark:divide-[#5C524B]">
//                   {reservations.map((r) => (
//                     <tr key={r._id}>
//                       <td className="px-4 py-3">{r.reservationId}</td>
//                       <td className="px-4 py-3">{r.room?.name} ({r.room?.roomType})</td>
//                       <td className="px-4 py-3">{r.checkin ? new Date(r.checkin).toLocaleString() : "--"}</td>
//                       <td className="px-4 py-3">{r.checkout ? new Date(r.checkout).toLocaleString() : "--"}</td>
//                       <td className="px-4 py-3">{r.guests}</td>
//                       <td className="px-4 py-3">{r.guestPhone}</td>
//                       <td className="px-4 py-3">{r.guestEmail}</td>
//                       <td className="px-4 py-3">
//                         {r.status === "Cancelled" ? (
//                           <span className="text-red-700 font-semibold">
//                             Cancelled by {r.cancelledBy?.name || "Unknown"} ({r.cancelledBy?.role || "role"})
//                           </span>
//                         ) : r.status === "Checked In" ? (
//                           <span className="text-blue-700 font-semibold">{r.status}</span>
//                         ) : r.status === "Checked Out" ? (
//                           <span className="text-green-700 font-semibold">{r.status}</span>
//                         ) : (
//                           <span className="text-gray-700 font-semibold">{r.status}</span>
//                         )}
//                       </td>
//                       <td className="px-4 py-3 space-y-2">
//                         {r.status !== "Cancelled" && (
//                           <>
//                             {r.status === "Pending" && userRole === "guest" && (
//                               <button
//                                 className="py-1 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 w-full"
//                                 onClick={() => handlePayment(r._id, r.reservationId || "", r.price || 0)}
//                                 disabled={actionLoading === r._id + "-pay"}
//                               >
//                                 Pay Now
//                               </button>
//                             )}

//                             {r.status === "Confirmed" && userRole === "guest" && (
//                               <button
//                                 className="py-1 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 w-full"
//                                 onClick={() => handleCheckIn(r._id)}
//                                 disabled={actionLoading === r._id + "-checkin"}
//                               >
//                                 {actionLoading === r._id + "-checkin" ? "Checking In..." : "Check In"}
//                               </button>
//                             )}

//                             {r.status === "Checked In" && userRole === "guest" && (
//                               <button
//                                 className="py-1 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full"
//                                 onClick={() => handleCheckOut(r._id)}
//                                 disabled={actionLoading === r._id + "-checkout"}
//                               >
//                                 {actionLoading === r._id + "-checkout" ? "Checking Out..." : "Check Out"}
//                               </button>
//                             )}

//                             {["receptionist", "admin", "manager"].includes(userRole) && (
//                               <button
//                                 className="py-1 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 w-full"
//                                 onClick={() => handleCancel(r._id)}
//                                 disabled={actionLoading === r._id + "-cancel"}
//                               >
//                                 {actionLoading === r._id + "-cancel" ? "Cancelling..." : "Cancel Reservation"}
//                               </button>
//                             )}
//                           </>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </section>
//     </ProtectedRoute>
//   );
// }







// "use client";
// import React, { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import { useRole } from "@/hooks/useRole";
// import { useRouter } from "next/navigation";
// import ProtectedRoute from "@/components/Auth/ProtectedRoute";
// import { Icon } from "@iconify/react";
// import Link from "next/link";

// type Reservation = {
//   _id: string;
//   reservationId?: string;
//   room?: { name?: string; roomType?: string };
//   checkin: string;
//   checkout: string;
//   guests: number;
//   guestPhone: string;
//   guestEmail: string;
//   additionalServices?: {
//     spa?: boolean;
//     wakeup?: boolean;
//     wakeupTime?: string;
//     airport?: boolean;
//     airportTime?: string;
//   };
//   status?: string;
// };

// export default function ReservationPagePremium() {
//   const { data: session } = useSession();
//   const { userRole } = useRole();
//   const router = useRouter();
//   const [reservations, setReservations] = useState<Reservation[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchReservations = async () => {
//       setLoading(true);
//       try {
//         let url = "http://localhost:3001/reservations/all";
//         if (userRole === "guest") {
//           url = `http://localhost:3001/reservations/guest/${session?.user?.id}`;
//         }
//         const res = await fetch(url);
//         const data = await res.json();
//         setReservations(data.reservations || []);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchReservations();
//   }, [session, userRole]);

//   if (!session?.user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-gray-800 dark:text-gray-200">
//         Please sign in to view reservations.
//       </div>
//     );
//   }

//   return (
//     <ProtectedRoute allowedRoles={["guest", "receptionist", "admin", "manager"]}>
//       <div className="transition-colors bg-[#F5F0E1] dark:bg-[#1E1B18] text-[#3B2F2F] dark:text-[#F2E9E1] min-h-screen py-20">
//         <div className="max-w-7xl mx-auto px-5">
//           <h1 className="text-5xl font-bold mb-12 text-center">Reservations</h1>

//           {loading ? (
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {[1, 2, 3, 4].map((i) => (
//                 <div
//                   key={i}
//                   className="animate-pulse h-64 rounded-2xl bg-[#E0E0E0] dark:bg-[#2C2B28]"
//                 ></div>
//               ))}
//             </div>
//           ) : reservations.length === 0 ? (
//             <p className="text-center text-lg">No reservations found.</p>
//           ) : (
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {reservations.map((r, idx) => (
//                 <div
//                   key={r._id || idx}
//                   className="bg-gradient-to-br from-[#F0E3D6] to-[#DCCAB0] dark:from-[#3A352F] dark:to-[#5B4E43]
//                     p-6 rounded-2xl shadow-2xl hover:scale-105 transform transition-all duration-300"
//                 >
//                   <h2 className="text-xl font-bold mb-2">{r.room?.name || "Room"}</h2>
//                   <p className="mb-1"><b>Type:</b> {r.room?.roomType || "-"}</p>
//                   <p className="mb-1"><b>Check-in:</b> {new Date(r.checkin).toLocaleDateString()}</p>
//                   <p className="mb-1"><b>Check-out:</b> {new Date(r.checkout).toLocaleDateString()}</p>
//                   <p className="mb-1"><b>Guests:</b> {r.guests}</p>
//                   <p className="mb-1"><b>Phone:</b> {r.guestPhone}</p>
//                   <p className="mb-1"><b>Email:</b> {r.guestEmail}</p>
//                   <div className="mb-2">
//                     <b>Services:</b>
//                     <ul className="text-sm mt-1">
//                       <li>Spa: {r.additionalServices?.spa ? "Yes" : "No"}</li>
//                       <li>Wake-up: {r.additionalServices?.wakeup ? `Yes at ${r.additionalServices?.wakeupTime}` : "No"}</li>
//                       <li>Airport: {r.additionalServices?.airport ? `Yes at ${r.additionalServices?.airportTime}` : "No"}</li>
//                     </ul>
//                   </div>
//                   <p className="mb-4"><b>Status:</b> {r.status || "Pending"}</p>

//                   <div className="flex flex-wrap gap-2">
//                     <Link href={`/reservations/view/${r._id}`}>
//                       <button className="px-4 py-2 bg-[#DCCAB0] dark:bg-[#A78256] text-[#3B2F2F] dark:text-[#FFF5E1] rounded-lg font-semibold hover:opacity-90 transition-opacity">
//                         View
//                       </button>
//                     </Link>
//                     <button className="px-4 py-2 bg-[#A78256] dark:bg-[#DCCAB0] text-[#FFF5E1] dark:text-[#3B2F2F] rounded-lg font-semibold hover:opacity-90 transition-opacity">
//                       Action
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// }
