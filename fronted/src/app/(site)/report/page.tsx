// "use client";
// import React, { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
// import { useRole } from "@/hooks/useRole";
// import { useRouter } from "next/navigation";
// import { useSearchParams } from "next/navigation";
// import ProtectedRoute from "@/components/Auth/ProtectedRoute";

// export default function ReportMaintenanceRequestPage() {
//   const { data: session } = useSession();
//   const { userRole } = useRole();
//   const router = useRouter();
//   const [rooms, setRooms] = useState([]);
//   const [room, setRoom] = useState("");
//   const [description, setDescription] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [successMsg, setSuccessMsg] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const searchParams = useSearchParams();
//   const reservationId = searchParams.get("reservationId");
//   // Additional fields
//   const [urgency, setUrgency] = useState("Medium");
//   const [location, setLocation] = useState("");
//   const [allowAccess, setAllowAccess] = useState(false);
//   const [issueType, setIssueType] = useState("");

//   useEffect(() => {
//     // For manager, fetch all rooms
//     if (userRole === "manager" || userRole === "housekeeping" || userRole === "admin") {
//       fetch("http://localhost:3001/allrooms")
//         .then(res => res.json())
//         .then(data => setRooms(data.rooms || []));
//     } else if (userRole === "guest" && reservationId) {
//       // For guest, fetch reservation by reservationId
//       fetch(`http://localhost:3001/reservations/${reservationId}`)
//         .then(res => res.json())
//         .then(data => {
//           if (data.reservation && data.reservation.room) {
//             setRoom(data.reservation.room._id || "");
//           }
//         });
//     } 
//   }, [userRole, session?.user, reservationId]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMsg("");
//     setSuccessMsg("");
//     try {
//       const res = await fetch("http://localhost:3001/maintenance/requests", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           room,
//           description,
//           urgency,
//           location,
//           allowAccess,
//           issueType,
//           reportedBy: session?.user?.id,
//           role: userRole,
//         }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Failed to submit request");
//       setSuccessMsg("Maintenance request submitted successfully!");
//       setDescription("");
//       setTimeout(() => router.push("/maintenance-requests"), 2000);
//     } catch (e: any) {
//       setErrorMsg(e.message || "Error submitting request");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!session?.user) {
//     return <div className="min-h-screen flex items-center justify-center text-lg font-semibold">Please sign in to report a maintenance issue.</div>;
//   }

//   return (
//     <ProtectedRoute allowedRoles={['guest', 'housekeeping', 'maintenance', 'admin', 'manager']}>
//       <>
//     <section className="!pt-44 pb-20 min-h-screen bg-gray-50 dark:bg-gray-900">
//       <div className="container mx-auto max-w-lg px-5 2xl:px-0">
//         <h1 className="text-3xl font-bold mb-8 text-dark dark:text-white text-center">Report Maintenance Issue</h1>
//         <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
//           {userRole === "manager" || userRole === "housekeeping" || userRole === "admin" && (
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-1">Room</label>
//               <select
//                 className="w-full border rounded px-3 py-2"
//                 value={room}
//                 onChange={e => setRoom(e.target.value)}
//                 required
//               >
//                 <option value="">Select a room</option>
//                 {rooms.map((r: any) => (
//                   <option key={r._id} value={r._id}>{r.name} ({r.roomType})</option>
//                 ))}
//               </select>
//             </div>
//           )}
//           {userRole === "guest" && (
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-1">Reservation Id</label>
//               <input
//                 className="w-full border rounded px-3 py-2 bg-gray-100 dark:bg-gray-700"
//                 value={reservationId || ""}
//                 disabled
//                 readOnly
//               />
//             </div>
//           )}
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-1">Description</label>
//             <textarea
//               className="w-full border rounded px-3 py-2"
//               value={description}
//               onChange={e => setDescription(e.target.value)}
//               required
//               rows={4}
//               placeholder="Describe the maintenance issue..."
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-1">Type of Issue</label>
//             <select
//               className="w-full border rounded px-3 py-2"
//               value={issueType}
//               onChange={e => setIssueType(e.target.value)}
//               required
//             >
//               <option value="">Select issue type</option>
//               <option value="Plumbing">Plumbing</option>
//               <option value="Electrical">Electrical</option>
//               <option value="Cleaning">Cleaning</option>
//               <option value="Furniture">Furniture</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-1">Urgency Level</label>
//             <select
//               className="w-full border rounded px-3 py-2"
//               value={urgency}
//               onChange={e => setUrgency(e.target.value)}
//               required
//             >
//               <option value="Low">Low</option>
//               <option value="Medium">Medium</option>
//               <option value="High">High</option>
//             </select>
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-1">Location in Room</label>
//             <input
//               type="text"
//               className="w-full border rounded px-3 py-2"
//               value={location}
//               onChange={e => setLocation(e.target.value)}
//               placeholder="e.g. Bathroom, Window, Desk"
//             />
//           </div>
//           <div className="mb-4 flex items-center">
//             <input
//               type="checkbox"
//               id="allowAccess"
//               checked={allowAccess}
//               onChange={e => setAllowAccess(e.target.checked)}
//               className="mr-2"
//             />
//             <label htmlFor="allowAccess" className="text-sm font-medium">Allow maintenance staff to enter if I am absent</label>
//           </div>
//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 disabled:opacity-60"
//             disabled={loading || !room || !description}
//           >
//             {loading ? "Submitting..." : "Submit Request"}
//           </button>
//           {successMsg && <div className="text-green-600 font-semibold mt-4 text-center">{successMsg}</div>}
//           {errorMsg && <div className="text-red-600 font-semibold mt-4 text-center">{errorMsg}</div>}
//         </form>
//       </div>
//     </section>
//     </>
//     </ProtectedRoute>
//   );
// } 










"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRole } from "@/hooks/useRole";
import { useRouter, useSearchParams } from "next/navigation";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";

export default function ReportMaintenanceRequestPage() {
  const { data: session } = useSession();
  const { userRole } = useRole();
  const router = useRouter();
  const searchParams = useSearchParams();
  const reservationIdParam = searchParams.get("reservationId");

  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [urgency, setUrgency] = useState("Medium");
  const [location, setLocation] = useState("");
  const [allowAccess, setAllowAccess] = useState(false);
  const [issueType, setIssueType] = useState("");

  // Fetch rooms for managers/admin/housekeeping OR guest reservation
 useEffect(() => {
  if (!session?.user) return;

  if (userRole === "manager" || userRole === "housekeeping" || userRole === "admin") {
    fetch("http://localhost:3001/allrooms")
      .then(res => res.json())
      .then(data => setRooms(data.rooms || []))
      .catch(() => setErrorMsg("Failed to fetch rooms."));
  } else if (userRole === "guest") {
    if (reservationIdParam) {
      // Use reservationId from query param
      fetch(`http://localhost:3001/reservations/${reservationIdParam}`)
        .then(res => res.json())
        .then(data => {
          if (data.reservation?.room?._id) {
            setRoom(data.reservation.room._id);
          } else {
            setErrorMsg("Reservation not found.");
          }
        })
        .catch(() => setErrorMsg("Failed to fetch reservation info."));
    } else {
      // Fetch all reservations for the guest and pick latest
      fetch(`http://localhost:3001/reservations/guest/${session.user.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.reservations && data.reservations.length > 0) {
            const latest: Reservation = data.reservations[data.reservations.length - 1];
            if (latest.room?._id) setRoom(latest.room._id);
          } else {
            setErrorMsg("No reservation found for guest.");
          }
        })
        .catch(() => setErrorMsg("Failed to fetch guest reservations."));
    }
  }
}, [userRole, session?.user, reservationIdParam]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!room || !description) return;

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch("http://localhost:3001/maintenance/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          room,
          description,
          urgency,
          location,
          allowAccess,
          issueType,
          reportedBy: session?.user?.id,
          role: userRole,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit request");

      setSuccessMsg("Maintenance request submitted successfully!");
      setDescription("");
      setTimeout(() => router.push("/maintenance-requests"), 2000);
    } catch (e: any) {
      setErrorMsg(e.message || "Error submitting request");
    } finally {
      setLoading(false);
    }
  };

  if (!session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-dark dark:text-[#F2E9E1]">
        Please sign in to report a maintenance issue.
      </div>
    );
  }

  return (
    <ProtectedRoute allowedRoles={['guest', 'housekeeping', 'maintenance', 'admin', 'manager']}>
      <section className="!pt-36 pb-20 min-h-screen bg-[#F5F0E1] dark:bg-[#1E1B18] transition-colors">
        <div className="container mx-auto max-w-lg px-5 2xl:px-0">
          <h1 className="text-3xl font-bold mb-8 text-[#3B2F2F] dark:text-[#F2E9E1] text-center">
            Report Maintenance Issue
          </h1>

          <form 
            onSubmit={handleSubmit} 
            className="bg-gradient-to-br from-[#F0E3D6] to-[#DCCAB0] dark:from-[#3A352F] dark:to-[#5B4E43] rounded-2xl shadow-2xl p-8 flex flex-col gap-4 transition-colors"
          >
            {/* Manager/Admin/Housekeeping: Select Room */}
            {(userRole === "manager" || userRole === "housekeeping" || userRole === "admin") && (
              <div>
                <label className="block text-sm font-medium mb-1">Room</label>
                <select
                  value={room}
                  onChange={e => setRoom(e.target.value)}
                  required
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Select a room</option>
                  {rooms.map((r: any) => (
                    <option key={r._id} value={r._id}>{r.name} ({r.roomType})</option>
                  ))}
                </select>
              </div>
            )}

            {/* Guest: Show Reservation ID */}
            {userRole === "guest" && (
              <div>
                <label className="block text-sm font-medium mb-1">Reservation ID</label>
                <input
                  value={reservationIdParam || room ? room : ""}
                  disabled
                  readOnly
                  className="w-full border rounded px-3 py-2 bg-gray-100 dark:bg-gray-700"
                />
              </div>
            )}

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={4}
                placeholder="Describe the maintenance issue..."
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* Issue Type */}
            <div>
              <label className="block text-sm font-medium mb-1">Type of Issue</label>
              <select
                value={issueType}
                onChange={e => setIssueType(e.target.value)}
                required
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select issue type</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Furniture">Furniture</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Urgency */}
            <div>
              <label className="block text-sm font-medium mb-1">Urgency Level</label>
              <select
                value={urgency}
                onChange={e => setUrgency(e.target.value)}
                required
                className="w-full border rounded px-3 py-2"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium mb-1">Location in Room</label>
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="e.g. Bathroom, Window, Desk"
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* Allow Access */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="allowAccess"
                checked={allowAccess}
                onChange={e => setAllowAccess(e.target.checked)}
                className="mr-[2px] accent-[#A78256] dark:accent-[#FFD700]"
              />
              <label htmlFor="allowAccess" className="text-sm font-medium">Allow maintenance staff to enter if I am absent</label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !room || !description}
              className="w-full py-2 px-4 bg-[#A78256] text-white rounded-xl font-semibold hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>

            {/* Messages */}
            {successMsg && <div className="text-green-600 font-semibold mt-4 text-center">{successMsg}</div>}
            {errorMsg && <div className="text-red-600 font-semibold mt-4 text-center">{errorMsg}</div>}
          </form>
        </div>
      </section>
    </ProtectedRoute>
  );
}







// "use client";
// import React, { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
// import { useRole } from "@/hooks/useRole";
// import { useRouter, useSearchParams } from "next/navigation";
// import ProtectedRoute from "@/components/Auth/ProtectedRoute";

// export default function ReportMaintenanceRequestPage() {
//   const { data: session } = useSession();
//   const { userRole } = useRole();
//   const router = useRouter();
//   const [rooms, setRooms] = useState([]);
//   const [room, setRoom] = useState("");
//   const [description, setDescription] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [successMsg, setSuccessMsg] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const searchParams = useSearchParams();
//   const reservationId = searchParams.get("reservationId");

//   const [urgency, setUrgency] = useState("Medium");
//   const [location, setLocation] = useState("");
//   const [allowAccess, setAllowAccess] = useState(false);
//   const [issueType, setIssueType] = useState("");

//   useEffect(() => {
//     if (userRole === "manager" || userRole === "housekeeping" || userRole === "admin") {
//       fetch("http://localhost:3001/allrooms")
//         .then(res => res.json())
//         .then(data => setRooms(data.rooms || []));
//     } else if (userRole === "guest" && reservationId) {
//       fetch(`http://localhost:3001/reservations/${reservationId}`)
//         .then(res => res.json())
//         .then(data => {
//           if (data.reservation && data.reservation.room) {
//             setRoom(data.reservation.room._id || "");
//           }
//         });
//     }
//   }, [userRole, session?.user, reservationId]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMsg("");
//     setSuccessMsg("");
//     try {
//       const res = await fetch("http://localhost:3001/maintenance/requests", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           room,
//           description,
//           urgency,
//           location,
//           allowAccess,
//           issueType,
//           reportedBy: session?.user?.id,
//           role: userRole,
//         }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Failed to submit request");
//       setSuccessMsg("Maintenance request submitted successfully!");
//       setDescription("");
//       setTimeout(() => router.push("/maintenance-requests"), 2000);
//     } catch (e: any) {
//       setErrorMsg(e.message || "Error submitting request");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!session?.user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-dark dark:text-[#F2E9E1]">
//         Please sign in to report a maintenance issue.
//       </div>
//     );
//   }

//   return (
//     <ProtectedRoute allowedRoles={['guest', 'housekeeping', 'maintenance', 'admin', 'manager']}>
//       <section className="!pt-36 pb-20 min-h-screen bg-[#F5F0E1] dark:bg-[#1E1B18] transition-colors">
//         <div className="container mx-auto max-w-lg px-5 2xl:px-0">
//           <h1 className="text-3xl font-bold mb-8 text-[#3B2F2F] dark:text-[#F2E9E1] text-center">
//             Report Maintenance Issue
//           </h1>

//           <form 
//             onSubmit={handleSubmit} 
//             className="bg-gradient-to-br from-[#F0E3D6] to-[#DCCAB0] dark:from-[#3A352F] dark:to-[#5B4E43] rounded-2xl shadow-2xl p-8 flex flex-col gap-4 transition-colors"
//           >
//             <style>{`
//               .maintenance-theme input,
//               .maintenance-theme select,
//               .maintenance-theme textarea {
//                 background: #FFF5E1;
//                 color: #3B2F2F;
//                 border: 1px solid #D8D1C8;
//                 border-radius: 14px;
//                 padding: 14px;
//                 width: 100%;
//                 font-size: 16px;
//                 transition: 0.3s ease;
//               }
//               .dark .maintenance-theme input,
//               .dark .maintenance-theme select,
//               .dark .maintenance-theme textarea {
//                 background: #2C2B28;
//                 color: #F2E9E1;
//                 border: 1px solid #5C524B;
//               }
//               .maintenance-theme input:focus,
//               .maintenance-theme select:focus,
//               .maintenance-theme textarea:focus {
//                 outline: none;
//                 box-shadow: 0 0 0 3px #A7825630;
//               }
//               .maintenance-theme button {
//                 background: #A78256;
//                 color: #FFF5E1;
//                 padding: 14px;
//                 border-radius: 14px;
//                 font-weight: 600;
//                 transition: 0.3s ease;
//                 width: 100%;
//               }
//               .dark .maintenance-theme button {
//                 background: #DCCAB0;
//                 color: #3B2F2F;
//               }
//               .maintenance-theme button:hover {
//                 opacity: 0.9;
//                 transform: scale(1.02);
//               }
//             `}</style>

//             <div className="maintenance-theme">
//               {(userRole === "manager" || userRole === "housekeeping" || userRole === "admin") && (
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Room</label>
//                   <select value={room} onChange={e => setRoom(e.target.value)} required>
//                     <option value="">Select a room</option>
//                     {rooms.map((r: any) => (
//                       <option key={r._id} value={r._id}>{r.name} ({r.roomType})</option>
//                     ))}
//                   </select>
//                 </div>
//               )}

//               {userRole === "guest" && (
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Reservation Id</label>
//                   <input value={reservationId || ""} disabled readOnly />
//                 </div>
//               )}

//               <div>
//                 <label className="block text-sm font-medium mb-1">Description</label>
//                 <textarea
//                   value={description}
//                   onChange={e => setDescription(e.target.value)}
//                   rows={4}
//                   placeholder="Describe the maintenance issue..."
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Type of Issue</label>
//                 <select value={issueType} onChange={e => setIssueType(e.target.value)} required>
//                   <option value="">Select issue type</option>
//                   <option value="Plumbing">Plumbing</option>
//                   <option value="Electrical">Electrical</option>
//                   <option value="Cleaning">Cleaning</option>
//                   <option value="Furniture">Furniture</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Urgency Level</label>
//                 <select value={urgency} onChange={e => setUrgency(e.target.value)} required>
//                   <option value="Low">Low</option>
//                   <option value="Medium">Medium</option>
//                   <option value="High">High</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Location in Room</label>
//                 <input
//                   type="text"
//                   value={location}
//                   onChange={e => setLocation(e.target.value)}
//                   placeholder="e.g. Bathroom, Window, Desk"
//                 />
//               </div>

//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id="allowAccess"
//                   checked={allowAccess}
//                   onChange={e => setAllowAccess(e.target.checked)}
//                   className="mr-[2px] accent-[#A78256] dark:accent-[#FFD700]"
//                 />
//                 <label htmlFor="allowAccess" className="text-sm font-medium">Allow maintenance staff to enter if I am absent</label>
//               </div>

//               <button type="submit" disabled={loading || !room || !description}>
//                 {loading ? "Submitting..." : "Submit Request"}
//               </button>

//               {successMsg && <div className="text-green-600 font-semibold mt-4 text-center">{successMsg}</div>}
//               {errorMsg && <div className="text-red-600 font-semibold mt-4 text-center">{errorMsg}</div>}
//             </div>
//           </form>
//         </div>
//       </section>
//     </ProtectedRoute>
//   );
// }
