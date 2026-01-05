// "use client";
// import React, { useState } from "react";
// import { useRooms } from "@/hooks/useRooms";
// import HeroSub from "@/components/shared/HeroSub";
// import ProtectedRoute from "@/components/Auth/ProtectedRoute";
// import RoomForm from "@/components/Properties/RoomForm";
// import { useRole } from "@/hooks/useRole";
// import ConfirmationModal from "@/components/ui/confirmation-modal";

// const PAGE_SIZE = 5;

// const RoomsTablePage = () => {
//   const { rooms, loading, error, deleteRoom, refreshRooms } = useRooms();
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState("");
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [selectedRoom, setSelectedRoom] = useState<any>(null);
//   const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [roomToDelete, setRoomToDelete] = useState<any>(null);
//   const { userRole } = useRole();

//   // Filter rooms by name
//   const filteredRooms = rooms.filter(room =>
//     room.name.toLowerCase().includes(search.toLowerCase())
//   );
//   const totalPages = Math.ceil(filteredRooms.length / PAGE_SIZE) || 1;
//   const paginatedRooms = filteredRooms.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

//   // Reset to page 1 if search changes
//   React.useEffect(() => { setPage(1); }, [search]);

//   const handleEdit = (room: any) => {
//     // Convert the mapped room back to the format expected by RoomForm
//     const roomData = {
//       _id: room.slug,
//       name: room.name,
//       description: room.description || '',
//       rate: room.rate,
//       beds: room.beds,
//       baths: room.baths,
//       area: room.area,
//       availability: room.availability || 'Available',
//       status: room.status || 'Clean',
//       capacity: room.capacity || 1,
//       roomType: room.roomType,
//       images: room.images.map((img: any) => img.src)
//     };
//     setSelectedRoom(roomData);
//     setShowEditModal(true);
//   };

//   const handleDeleteClick = (room: any) => {
//     setRoomToDelete(room);
//     setShowDeleteModal(true);
//   };

//   const handleDeleteConfirm = async () => {
//     if (!roomToDelete) return;
    
//     setDeleteLoading(roomToDelete.slug);
//     const result = await deleteRoom(roomToDelete.slug);
//     setDeleteLoading(null);
//     setShowDeleteModal(false);
//     setRoomToDelete(null);
    
//     if (!result.success) {
//       alert(`Failed to delete room: ${result.error}`);
//     }
//   };

//   const handleEditSuccess = () => {
//     setShowEditModal(false);
//     setSelectedRoom(null);
//     refreshRooms();
//   };

//   const handleStatusChange = async (roomId: string, newStatus: string) => {
//     await fetch(`http://localhost:3001/rooms/update-status/${roomId}`, {
//       method: 'PATCH',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ status: newStatus }),
//     });
//     refreshRooms();
//   };

//   if (loading) return <div>Loading rooms...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <ProtectedRoute allowedRoles={['admin', 'manager', 'housekeeping']}>
//       <>
//         <HeroSub
//           title="Rooms"
//           description="Discover our premium rooms, offering modern amenities and refined comfort for an unforgettable stay."
//           badge="Rooms"
//         />
//         <div className="p-6">
//           <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
//             <input
//               className="p-2 border rounded w-full max-w-xs"
//               placeholder="Search by name..."
//               value={search}
//               onChange={e => setSearch(e.target.value)}
//             />
//             {userRole !== 'housekeeping' && (
//               <a
//                 href="http://localhost:3000/properties/add-room"
//                 className="bg-primary text-base font-semibold py-4 px-8 text-white hover:bg-white hover:text-dark duration-300 hover:cursor-pointer"
//                 style={{borderRadius: '10px', padding: '10px 20px'}}>
//                 Add Room
//               </a>
//             )}
//           </div>
//           <div className="overflow-x-auto">
//             <table className="min-w-full border border-gray-200">
//               <thead>
//                 <tr className="bg-gray-100 dark:bg-gray-800">
//                   <th className="px-4 py-2 border">Name</th>
//                   <th className="px-4 py-2 border">Room Type</th>
//                   <th className="px-4 py-2 border">Rate</th>
//                   <th className="px-4 py-2 border">Beds</th>
//                   <th className="px-4 py-2 border">Baths</th>
//                   <th className="px-4 py-2 border">Area</th>
//                   <th className="px-4 py-2 border">Image</th>
//                   <th className="px-4 py-2 border">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginatedRooms.map((room) => (
//                   <tr key={room.slug} className="hover:bg-gray-00">
//                     <td className="px-4 py-2 border">{room.name}</td>
//                     <td className="px-4 py-2 border">{room.roomType}</td>
//                     <td className="px-4 py-2 border">{room.rate}</td>
//                     <td className="px-4 py-2 border">{room.beds}</td>
//                     <td className="px-4 py-2 border">{room.baths}</td>
//                     <td className="px-4 py-2 border">{room.area}</td>
//                     <td className="px-4 py-2 border">
//                       {room.images[0] && (
//                         <img src={room.images[0].src} alt={room.name} className="w-16 h-12 object-cover rounded" />
//                       )}
//                     </td>
//                     <td className="px-4 py-2 border">
//                       {userRole === 'housekeeping' || userRole === 'manager' ? (
//                         <select
//                           value={room.status}
//                           onChange={e => handleStatusChange(room.slug, e.target.value)}
//                           className="border rounded px-2 py-1"
//                         >
//                           <option value="Available">Available</option>
//                           <option value="Occupied">Occupied</option>
//                           <option value="Clean">Clean</option>
//                           <option value="Dirty">Dirty</option>
//                           <option value="Maintenance">Maintenance</option>
//                           <option value="Cleaning">Cleaning</option>
//                         </select>
//                       ) : (
//                         <div className="flex gap-2">
//                            <select
//                           value={room.status}
//                           onChange={e => handleStatusChange(room.slug, e.target.value)}
//                           className="border rounded px-2 py-1"
//                         >
//                           <option value="Available">Available</option>
//                           <option value="Occupied">Occupied</option>
//                           <option value="Clean">Clean</option>
//                           <option value="Dirty">Dirty</option>
//                           <option value="Maintenance">Maintenance</option>
//                           <option value="Cleaning">Cleaning</option>
//                         </select>
//                           <button
//                             onClick={() => handleEdit(room)}
//                             className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => handleDeleteClick(room)}
//                             disabled={deleteLoading === room.slug}
//                             className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 disabled:opacity-50"
//                           >
//                             {deleteLoading === room.slug ? 'Deleting...' : 'Delete'}
//                           </button>
//                         </div>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//                 {paginatedRooms.length === 0 && (
//                   <tr>
//                     <td colSpan={8} className="text-center py-4">No rooms found.</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//           <div className="flex items-center justify-between mt-4">
//             <button
//               className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
//               onClick={() => setPage((p) => Math.max(1, p - 1))}
//               disabled={page === 1}
//             >
//               Previous
//             </button>
//             <span>
//               Page {page} of {totalPages}
//             </span>
//             <button
//               className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
//               onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//               disabled={page === totalPages}
//             >
//               Next
//             </button>
//           </div>
//         </div>

//         {/* Edit Modal */}
//         {showEditModal && selectedRoom && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold">Edit Room</h2>
//                 <button
//                   onClick={() => setShowEditModal(false)}
//                   className="text-gray-500 hover:text-gray-700 text-2xl"
//                 >
//                   ×
//                 </button>
//               </div>
//               <RoomForm
//                 isEditMode={true}
//                 roomData={selectedRoom}
//                 onSuccess={handleEditSuccess}
//               />
//             </div>
//           </div>
//         )}

//         {/* Delete Confirmation Modal */}
//         <ConfirmationModal
//           isOpen={showDeleteModal}
//           onClose={() => {
//             setShowDeleteModal(false);
//             setRoomToDelete(null);
//           }}
//           onConfirm={handleDeleteConfirm}
//           title="Delete Room"
//           message={`Are you sure you want to delete "${roomToDelete?.name}"? This action cannot be undone.`}
//           confirmText="Delete Room"
//           cancelText="Cancel"
//           type="danger"
//           loading={deleteLoading === roomToDelete?.slug}
//         />
//       </>
//     </ProtectedRoute>
//   );
// };

// export default RoomsTablePage; 






// "use client";
// import React, { useState } from "react";
// import { useRooms } from "@/hooks/useRooms";
// import HeroSub from "@/components/shared/HeroSub";
// import ProtectedRoute from "@/components/Auth/ProtectedRoute";
// import RoomForm from "@/components/Properties/RoomForm";
// import { useRole } from "@/hooks/useRole";
// import ConfirmationModal from "@/components/ui/confirmation-modal";



// const PAGE_SIZE = 5;

// const RoomsTablePage = () => {
//   const { rooms, loading, error, deleteRoom, refreshRooms } = useRooms();
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState("");
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [selectedRoom, setSelectedRoom] = useState<any>(null);
//   const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [roomToDelete, setRoomToDelete] = useState<any>(null);
//   const { userRole } = useRole();

//   const safeRooms = Array.isArray(rooms) ? rooms : [];

//   // Filter rooms by name
//   const filteredRooms = safeRooms.filter(room =>
//     room.name?.toLowerCase().includes(search.toLowerCase())
//   );
//   const totalPages = Math.ceil(filteredRooms.length / PAGE_SIZE) || 1;
//   const paginatedRooms = filteredRooms.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

//   React.useEffect(() => { setPage(1); }, [search]);

//   // const handleEdit = (room: any) => {
//   //   const roomData = {
//   //     _id: room.slug || room._id,
//   //     name: room.name,
//   //     description: room.description || '',
//   //     rate: room.rate,
//   //     beds: room.beds,
//   //     baths: room.baths,
//   //     area: room.area,
//   //     availability: room.availability || 'Available',
//   //     status: room.status || 'Clean',
//   //     capacity: room.capacity || 1,
//   //     roomType: room.roomType,
//   //     images: room.images.map((img: any) => typeof img === 'string' ? img : img.src)
//   //   };
//   //   setSelectedRoom(roomData);
//   //   setShowEditModal(true);
//   // };


//   const handleEdit = (room: any) => {
//   const roomData = {
//     _id: room.slug || room._id, // fallback both
//     name: room.name || "",
//     description: room.description || "",
//     rate: room.rate || room.roomType?.rate || 0,
//     beds: room.beds || room.roomType?.beds || 1,
//     baths: room.baths || room.roomType?.baths || 1,
//     area: room.area || room.roomType?.area || "N/A",
//     availability: room.availability || "Available",
//     status: room.status || "Clean",
//     capacity: room.capacity || room.roomType?.capacity || 1,

//     // FIXED: If roomType is an object → pass ID
//     // If roomType is already string → keep it
//     roomType: typeof room.roomType === "object"
//       ? room.roomType._id
//       : room.roomType,

//     // FIXED: Safe image extraction
//     images: Array.isArray(room.images)
//       ? room.images.map((img: any) =>
//           typeof img === "string" ? img : img.src
//         )
//       : [],
//   };

//   setSelectedRoom(roomData);
//   setShowEditModal(true);
// };


//   const handleDeleteClick = (room: any) => {
//     setRoomToDelete(room);
//     setShowDeleteModal(true);
//   };

//   const handleDeleteConfirm = async () => {
//     if (!roomToDelete) return;
//     setDeleteLoading(roomToDelete.slug || roomToDelete._id);
//     const result = await deleteRoom(roomToDelete.slug || roomToDelete._id);
//     setDeleteLoading(null);
//     setShowDeleteModal(false);
//     setRoomToDelete(null);
//     if (!result.success) alert(`Failed to delete room: ${result.error}`);
//   };

//   const handleEditSuccess = () => {
//     setShowEditModal(false);
//     setSelectedRoom(null);
//     refreshRooms();
//   };

//   const handleStatusChange = async (roomId: string, newStatus: string) => {
//     await fetch(`http://localhost:3001/rooms/update-status/${roomId}`, {
//       method: 'put',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ status: newStatus }),
//     });
//     refreshRooms();
//   };

//   if (loading) return <div>Loading rooms...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <ProtectedRoute allowedRoles={['admin', 'manager', 'housekeeping']}>
//       <>
//         <HeroSub
//           title="Rooms"
//           description="Discover our premium rooms, offering modern amenities and refined comfort for an unforgettable stay."
//           badge="Rooms"
//         />
//         <div className="p-6">
//           <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
//             <input
//               className="p-2 border rounded w-full max-w-xs"
//               placeholder="Search by name..."
//               value={search}
//               onChange={e => setSearch(e.target.value)}
//             />
//             {userRole !== 'housekeeping' && (
//               <a
//                 href="http://localhost:3000/properties/add-room"
//                 className="bg-primary text-base font-semibold py-4 px-8 text-white hover:bg-white hover:text-dark duration-300 hover:cursor-pointer"
//                 style={{ borderRadius: '10px', padding: '10px 20px' }}
//               >
//                 Add Room
//               </a>
//             )}
//           </div>
//           <div className="overflow-x-auto">
//             <table className="min-w-full border border-gray-200">
//               <thead>
//                 <tr className="bg-gray-100 dark:bg-gray-800">
//                   <th className="px-4 py-2 border">Name</th>
//                   <th className="px-4 py-2 border">Room Type</th>
//                   <th className="px-4 py-2 border">Rate</th>
//                   <th className="px-4 py-2 border">Beds</th>
//                   <th className="px-4 py-2 border">Baths</th>
//                   <th className="px-4 py-2 border">Area</th>
//                   <th className="px-4 py-2 border">Image</th>
//                   <th className="px-4 py-2 border">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginatedRooms.map(room => (
//                   <tr key={room.slug || room._id} className="hover:bg-gray-50">
//                     <td className="px-4 py-2 border">{room.name}</td>
//                     <td className="px-4 py-2 border">{room.roomType}</td>
//                     <td className="px-4 py-2 border">{room.rate}</td>
//                     <td className="px-4 py-2 border">{room.beds}</td>
//                     <td className="px-4 py-2 border">{room.baths}</td>
//                     <td className="px-4 py-2 border">{room.area}</td>
//                     <td className="px-4 py-2 border">
//                       {room.images[0] && (
//                         <img src={typeof room.images[0] === 'string' ? room.images[0] : room.images[0].src} alt={room.name} className="w-16 h-12 object-cover rounded" />
//                       )}
//                     </td>
//                     <td className="px-4 py-2 border">
//                       <div className="flex gap-2 items-center">
//                         <select
//                           value={room.status}
//                           onChange={e => handleStatusChange(room.slug || room._id, e.target.value)}
//                           className="border rounded px-2 py-1"
//                         >
//                           <option value="Available">Available</option>
//                           <option value="Occupied">Occupied</option>
//                           <option value="Clean">Clean</option>
//                           <option value="Dirty">Dirty</option>
//                           <option value="Maintenance">Maintenance</option>
//                           <option value="Cleaning">Cleaning</option>
//                         </select>
//                         {userRole !== 'housekeeping' && (
//                           <>
//                             <button onClick={() => handleEdit(room)} className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">Edit</button>
//                             <button
//                               onClick={() => handleDeleteClick(room)}
//                               disabled={deleteLoading === (room.slug || room._id)}
//                               className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 disabled:opacity-50"
//                             >
//                               {deleteLoading === (room.slug || room._id) ? 'Deleting...' : 'Delete'}
//                             </button>
//                           </>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//                 {paginatedRooms.length === 0 && (
//                   <tr>
//                     <td colSpan={8} className="text-center py-4">No rooms found.</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="flex items-center justify-between mt-4">
//             <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Previous</button>
//             <span>Page {page} of {totalPages}</span>
//             <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
//           </div>
//         </div>

//         {/* Edit Modal */}
//         {showEditModal && selectedRoom && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold">Edit Room</h2>
//                 <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
//               </div>
//               <RoomForm isEditMode={true} roomData={selectedRoom} onSuccess={handleEditSuccess} />
//             </div>
//           </div>
//         )}

//         {/* Delete Modal */}
//         <ConfirmationModal
//           isOpen={showDeleteModal}
//           onClose={() => { setShowDeleteModal(false); setRoomToDelete(null); }}
//           onConfirm={handleDeleteConfirm}
//           title="Delete Room"
//           message={`Are you sure you want to delete "${roomToDelete?.name}"? This action cannot be undone.`}
//           confirmText="Delete Room"
//           cancelText="Cancel"
//           type="danger"
//           loading={deleteLoading === (roomToDelete?.slug || roomToDelete?._id)}
//         />
//       </>
//     </ProtectedRoute>
//   );
// };

// export default RoomsTablePage;















// "use client";
// import React, { useState } from "react";
// import { useRooms } from "@/hooks/useRooms";
// import HeroSub from "@/components/shared/HeroSub";
// import ProtectedRoute from "@/components/Auth/ProtectedRoute";
// import RoomForm from "@/components/Properties/RoomForm";
// import { useRole } from "@/hooks/useRole";
// import ConfirmationModal from "@/components/ui/confirmation-modal";

// const RoomsTablePage = () => {
//   const { rooms, loading, error, deleteRoom, refreshRooms } = useRooms();
//   const [search, setSearch] = useState("");
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [selectedRoom, setSelectedRoom] = useState<any>(null);
//   const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [roomToDelete, setRoomToDelete] = useState<any>(null);
//   const { userRole } = useRole();

//   const safeRooms = Array.isArray(rooms) ? rooms : [];
//   const filteredRooms = safeRooms.filter(room =>
//     room.name?.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleEdit = (room: any) => {
//     const roomData = {
//       _id: room.slug || room._id,
//       name: room.name || "",
//       description: room.description || "",
//       rate: room.rate || room.roomType?.rate || 0,
//       beds: room.beds || room.roomType?.beds || 1,
//       baths: room.baths || room.roomType?.baths || 1,
//       area: room.area || room.roomType?.area || "N/A",
//       availability: room.availability || "Available",
//       status: room.status || "Clean",
//       capacity: room.capacity || room.roomType?.capacity || 1,
//       roomType: typeof room.roomType === "object" ? room.roomType._id : room.roomType,
//       images: Array.isArray(room.images)
//         ? room.images.map((img: any) => typeof img === "string" ? img : img.src)
//         : [],
//     };
//     setSelectedRoom(roomData);
//     setShowEditModal(true);
//   };

//   const handleDeleteClick = (room: any) => {
//     setRoomToDelete(room);
//     setShowDeleteModal(true);
//   };

//   const handleDeleteConfirm = async () => {
//     if (!roomToDelete) return;
//     setDeleteLoading(roomToDelete.slug || roomToDelete._id);
//     const result = await deleteRoom(roomToDelete.slug || roomToDelete._id);
//     setDeleteLoading(null);
//     setShowDeleteModal(false);
//     setRoomToDelete(null);
//     if (!result.success) alert(`Failed to delete room: ${result.error}`);
//   };

//   const handleEditSuccess = () => {
//     setShowEditModal(false);
//     setSelectedRoom(null);
//     refreshRooms();
//   };

//   const handleStatusChange = async (roomId: string, newStatus: string) => {
//     await fetch(`http://localhost:3001/rooms/update-status/${roomId}`, {
//       method: 'put',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ status: newStatus }),
//     });
//     refreshRooms();
//   };

//   if (loading) return <div className="text-center py-20 text-gray-700 dark:text-gray-300">Loading rooms...</div>;
//   if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;

//   return (
//     <ProtectedRoute allowedRoles={['admin', 'manager', 'housekeeping']}>
//       <div className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-500">

//         {/* Hero Section */}
//         <HeroSub
//           title="Rooms"
//           description="Discover our premium rooms, offering modern amenities and refined comfort for an unforgettable stay."
//           badge="Rooms"
//         />

//         {/* Search + Add Room */}
//         <div className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-4xl mx-auto py-6 px-5">
//           <input
//             type="text"
//             placeholder="Search by name..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full md:w-2/3 p-3 rounded-lg border border-transparent shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400"
//           />
//           {userRole !== 'housekeeping' && (
//             <a
//               href="/properties/add-room"
//               className="px-6 py-3 rounded-lg bg-gradient-to-br from-amber-400 to-amber-700 text-gray-900 font-semibold shadow-lg hover:opacity-90 transition-opacity"
//             >
//               Add Room
//             </a>
//           )}
//         </div>

//         {/* Table Section */}
//         <div className="max-w-7xl mx-auto px-5 py-8 overflow-x-auto">
//           <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl overflow-hidden">
//             <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//               <thead className="bg-amber-300 dark:bg-amber-900 text-gray-900 dark:text-gray-100">
//                 <tr>
//                   {["Name", "Room Type", "Rate", "Beds", "Baths", "Area", "Image", "Actions"].map((head) => (
//                     <th
//                       key={head}
//                       className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
//                     >
//                       {head}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//                 {filteredRooms.length > 0 ? filteredRooms.map(room => (
//                   <tr key={room.slug || room._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
//                     <td className="px-6 py-4 whitespace-nowrap">{room.name}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{room.roomType}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{room.rate}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{room.beds}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{room.baths}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{room.area}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {room.images[0] && (
//                         <img
//                           src={typeof room.images[0] === 'string' ? room.images[0] : room.images[0].src}
//                           alt={room.name}
//                           className="w-20 h-16 object-cover rounded-lg"
//                         />
//                       )}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex flex-wrap items-center gap-2">
//                         <select
//                           value={room.status}
//                           onChange={e => handleStatusChange(room.slug || room._id, e.target.value)}
//                           className="border rounded px-2 py-1 text-sm"
//                         >
//                           <option value="Available">Available</option>
//                           <option value="Occupied">Occupied</option>
//                           <option value="Clean">Clean</option>
//                           <option value="Dirty">Dirty</option>
//                           <option value="Maintenance">Maintenance</option>
//                           <option value="Cleaning">Cleaning</option>
//                         </select>
//                         {userRole !== 'housekeeping' && (
//                           <>
//                             <button
//                               onClick={() => handleEdit(room)}
//                               className="px-3 py-1 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white hover:opacity-90 transition"
//                             >
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => handleDeleteClick(room)}
//                               disabled={deleteLoading === (room.slug || room._id)}
//                               className="px-3 py-1 rounded-full bg-gradient-to-br from-red-400 to-red-600 text-white hover:opacity-90 disabled:opacity-50 transition"
//                             >
//                               {deleteLoading === (room.slug || room._id) ? 'Deleting...' : 'Delete'}
//                             </button>
//                           </>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 )) : (
//                   <tr>
//                     <td colSpan={8} className="text-center py-6 text-gray-500 dark:text-gray-300">
//                       No rooms found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Edit Modal */}
//         {showEditModal && selectedRoom && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white dark:bg-gray-900 p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-lg">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Edit Room</h2>
//                 <button onClick={() => setShowEditModal(false)} className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white text-2xl">×</button>
//               </div>
//               <RoomForm isEditMode={true} roomData={selectedRoom} onSuccess={handleEditSuccess} />
//             </div>
//           </div>
//         )}

//         {/* Delete Confirmation Modal */}
//         <ConfirmationModal
//           isOpen={showDeleteModal}
//           onClose={() => { setShowDeleteModal(false); setRoomToDelete(null); }}
//           onConfirm={handleDeleteConfirm}
//           title="Delete Room"
//           message={`Are you sure you want to delete "${roomToDelete?.name}"? This action cannot be undone.`}
//           confirmText="Delete Room"
//           cancelText="Cancel"
//           type="danger"
//           loading={deleteLoading === (roomToDelete?.slug || roomToDelete?._id)}
//         />
//       </div>
//     </ProtectedRoute>
//   );
// };

// export default RoomsTablePage;










"use client";
import React, { useState } from "react";
import { useRooms } from "@/hooks/useRooms";
import HeroSub from "@/components/shared/HeroSub";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";
import RoomForm from "@/components/Properties/RoomForm";
import { useRole } from "@/hooks/useRole";
import ConfirmationModal from "@/components/ui/confirmation-modal";

const PAGE_SIZE = 10;

const RoomsTablePage = () => {
  const { rooms, loading, error, deleteRoom, refreshRooms } = useRooms();
  const [search, setSearch] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState<any>(null);
  const [page, setPage] = useState(1);
  const { userRole } = useRole();

  const safeRooms = Array.isArray(rooms) ? rooms : [];
  const filteredRooms = safeRooms.filter(room =>
    room.name?.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredRooms.length / PAGE_SIZE) || 1;
  const paginatedRooms = filteredRooms.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleEdit = (room: any) => {
    const roomData = {
      _id: room.slug || room._id,
      name: room.name || "",
      description: room.description || "",
      rate: room.rate || room.roomType?.rate || 0,
      beds: room.beds || room.roomType?.beds || 1,
      baths: room.baths || room.roomType?.baths || 1,
      area: room.area || room.roomType?.area || "N/A",
      availability: room.availability || "Available",
      status: room.status || "Clean",
      capacity: room.capacity || room.roomType?.capacity || 1,
      roomType: typeof room.roomType === "object" ? room.roomType._id : room.roomType,
      images: Array.isArray(room.images)
        ? room.images.map((img: any) => typeof img === "string" ? img : img.src)
        : [],
    };
    setSelectedRoom(roomData);
    setShowEditModal(true);
  };

  const handleDeleteClick = (room: any) => {
    setRoomToDelete(room);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!roomToDelete) return;
    setDeleteLoading(roomToDelete.slug || roomToDelete._id);
    const result = await deleteRoom(roomToDelete.slug || roomToDelete._id);
    setDeleteLoading(null);
    setShowDeleteModal(false);
    setRoomToDelete(null);
    if (!result.success) alert(`Failed to delete room: ${result.error}`);
  };

  const handleEditSuccess = () => {
    setShowEditModal(false);
    setSelectedRoom(null);
    refreshRooms();
  };

  const handleStatusChange = async (roomId: string, newStatus: string) => {
    await fetch(`http://localhost:3001/rooms/update-status/${roomId}`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    refreshRooms();
  };

  if (loading) return <div className="text-center py-20">Loading rooms...</div>;
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;

  return (
    <ProtectedRoute allowedRoles={['admin', 'manager', 'housekeeping']}>
      <div className="transition-colors bg-[#F5F0E1] dark:bg-[#1E1B18] text-[#3B2F2F] dark:text-[#F2E9E1] min-h-screen">

        {/* Hero Section */}
        <HeroSub
          title="Rooms"
          description="Discover our premium rooms, offering modern amenities and refined comfort for an unforgettable stay."
          badge="Rooms"
        />

        {/* Search + Add Room */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-3xl mx-auto py-6 px-5">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-2/3 p-3 rounded-lg shadow-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-[#DCCAB0] dark:bg-[#3A352F] dark:text-[#FFF5E1] dark:placeholder:text-[#CFC5B7]"
          />
          {userRole !== 'housekeeping' && (
            <a
              href="/properties/add-room"
              className="px-6 py-3 rounded-lg bg-gradient-to-br from-[#FFD700] to-[#A78256] text-[#1E1B18] font-semibold hover:opacity-90 transition-opacity shadow-lg"
            >
              Add Room
            </a>
          )}
        </div>

        {/* Table Section */}
        <div className="max-w-7xl mx-auto px-5 py-16 overflow-x-auto">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse rounded-2xl overflow-hidden shadow-2xl">
              <thead>
                <tr className="bg-[#DCCAB0] dark:bg-[#5B4E43] text-[#3B2F2F] dark:text-[#FFF5E1]">
                  {["Name", "Room Type", "Rate", "Beds", "Baths", "Area", "Image", "Status", "Actions"].map(head => (
                    <th key={head} className="px-6 py-3 text-left">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedRooms.length === 0 ? (
                  <tr><td colSpan={9} className="text-center py-6">No rooms found.</td></tr>
                ) : paginatedRooms.map(room => (
                  <tr key={room.slug || room._id} className="hover:scale-105 transform transition-all duration-300 bg-[#F0E3D6] dark:bg-[#3A352F] border-b border-[#DCCAB0] 
                  dark:border-[#5B4E43]">
                    <td className="px-6 py-4">{room.name}</td>
                    <td className="px-6 py-4">{room.roomType}</td>
                    <td className="px-6 py-4">{room.rate}</td>
                    <td className="px-6 py-4">{room.beds}</td>
                    <td className="px-6 py-4">{room.baths}</td>
                    <td className="px-6 py-4">{room.area}</td>
                    <td className="px-6 py-4">
                      {room.images[0] && (
                        <img
                          src={typeof room.images[0] === 'string' ? room.images[0] : room.images[0].src}
                          alt={room.name}
                          className="w-20 h-16 object-cover rounded-lg"
                        />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={room.status}
                        onChange={e => handleStatusChange(room.slug || room._id, e.target.value)}
                        className="border rounded px-2 py-1 text-sm"
                      >
                        <option value="Available">Available</option>
                        <option value="Occupied">Occupied</option>
                        <option value="Clean">Clean</option>
                        <option value="Dirty">Dirty</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Cleaning">Cleaning</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {userRole !== 'housekeeping' && (
                          <>
                            <button
                              onClick={() => handleEdit(room)}
                              className="px-3 py-1 rounded-full bg-gradient-to-br from-[#F0E3D6] to-[#DCCAB0] dark:from-[#3A352F] dark:to-[#5B4E43] hover:opacity-90
                               transition-opacity text-[#3B2F2F] dark:text-[#FFF5E1]"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteClick(room)}
                              disabled={deleteLoading === (room.slug || room._id)}
                              className="px-3 py-1 rounded-full bg-gradient-to-br from-[#FF5E5E] to-[#D62E2E] hover:opacity-90 transition-opacity text-[#FFF5E1]"
                            >
                              {deleteLoading === (room.slug || room._id) ? "Deleting..." : "Delete"}
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <button
              className="px-4 py-2 rounded-full bg-[#DCCAB0] dark:bg-[#5B4E43] text-[#3B2F2F] dark:text-[#FFF5E1] disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
            >Previous</button>
            <span>Page {page} of {totalPages}</span>
            <button
              className="px-4 py-2 rounded-full bg-[#DCCAB0] dark:bg-[#5B4E43] text-[#3B2F2F] dark:text-[#FFF5E1] disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            >Next</button>
          </div>
        </div>

        {/* Edit Modal */}
        {showEditModal && selectedRoom && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#F5F0E1] dark:bg-[#1E1B18] p-6 rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-[#3B2F2F] dark:text-[#F2E9E1]">Edit Room</h2>
                <button onClick={() => setShowEditModal(false)} className="text-[#3B2F2F] dark:text-[#F2E9E1] hover:opacity-70 text-2xl">×</button>
              </div>
              <RoomForm isEditMode={true} roomData={selectedRoom} onSuccess={handleEditSuccess} />
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <ConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => { setShowDeleteModal(false); setRoomToDelete(null); }}
          onConfirm={handleDeleteConfirm}
          title="Delete Room"
          message={`Are you sure you want to delete "${roomToDelete?.name}"? This action cannot be undone.`}
          confirmText="Delete Room"
          cancelText="Cancel"
          type="danger"
          loading={deleteLoading === (roomToDelete?.slug || roomToDelete?._id)}
        />

      </div>
    </ProtectedRoute>
  );
};

export default RoomsTablePage;
