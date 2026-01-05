// "use client";
// import React, { useState } from "react";
// import { useRoomTypes } from "@/hooks/useRoomTypes";
// import HeroSub from "@/components/shared/HeroSub";
// import ProtectedRoute from "@/components/Auth/ProtectedRoute";
// import RoomTypeForm from "@/components/Properties/RoomTypeForm";
// import ConfirmationModal from "@/components/ui/confirmation-modal";

// const PAGE_SIZE = 5;

// const RoomTypeTablePage = () => {
//   const { roomTypes, loading, error, deleteRoomType, refreshRoomTypes } = useRoomTypes();
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState("");
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [selectedRoomType, setSelectedRoomType] = useState<any>(null);
//   const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [roomTypeToDelete, setRoomTypeToDelete] = useState<any>(null);

//   // Filter room types by name
//   const filteredRoomTypes = roomTypes.filter(type =>
//     type.name.toLowerCase().includes(search.toLowerCase())
//   );
//   const totalPages = Math.ceil(filteredRoomTypes.length / PAGE_SIZE) || 1;
//   const paginatedRoomTypes = filteredRoomTypes.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

//   // Reset to page 1 if search changes
//   React.useEffect(() => { setPage(1); }, [search]);

//   const handleEdit = (roomType: any) => {
//     // Convert the mapped room type back to the format expected by RoomTypeForm
//     const roomTypeData = {
//       _id: roomType.slug,
//       name: roomType.name,
//       description: roomType.description,
//       image: roomType.image
//     };
//     setSelectedRoomType(roomTypeData);
//     setShowEditModal(true);
//   };

//   const handleDeleteClick = (roomType: any) => {
//     setRoomTypeToDelete(roomType);
//     setShowDeleteModal(true);
//   };

//   const handleDeleteConfirm = async () => {
//     if (!roomTypeToDelete) return;
    
//     setDeleteLoading(roomTypeToDelete.slug);
//     const result = await deleteRoomType(roomTypeToDelete.slug);
//     setDeleteLoading(null);
//     setShowDeleteModal(false);
//     setRoomTypeToDelete(null);
    
//     if (!result.success) {
//       alert(`Failed to delete room type: ${result.error}`);
//     }
//   };

//   const handleEditSuccess = () => {
//     setShowEditModal(false);
//     setSelectedRoomType(null);
//     refreshRoomTypes();
//   };

//   if (loading) return <div>Loading room types...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <ProtectedRoute allowedRoles={['admin', 'manager']}>
//       <>
//         <HeroSub
//           title="Room Types"
//           description="Discover our premium room types, offering modern amenities and refined comfort for an unforgettable stay."
//           badge="Room Types"
//         />
//         <div className="p-6">
//           <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
//             <input
//               className="p-2 border rounded w-full max-w-xs"
//               placeholder="Search by name..."
//               value={search}
//               onChange={e => setSearch(e.target.value)}
//             />
//             <a
//               href="http://localhost:3000/properties/add-roomtype"
//               className="bg-primary text-base font-semibold py-4 px-8 text-white hover:bg-white hover:text-dark duration-300 hover:cursor-pointer"
//               style={{borderRadius: '10px', padding: '10px 20px'}}>
//               Add Room Type
//             </a>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="min-w-full border border-gray-200">
//               <thead>
//                 <tr className="bg-gray-100 dark:bg-gray-800">
//                   <th className="px-4 py-2 border">Name</th>
//                   <th className="px-4 py-2 border">Description</th>
//                   <th className="px-4 py-2 border">Image</th>
//                   <th className="px-4 py-2 border">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginatedRoomTypes.map((type) => (
//                   <tr key={type.slug} className="hover:bg-gray-50">
//                     <td className="px-4 py-2 border">{type.name}</td>
//                     <td className="px-4 py-2 border">{type.description}</td>
//                     <td className="px-4 py-2 border">
//                       {type.image && (
//                         <img src={type.image} alt={type.name} className="w-16 h-12 object-cover rounded" />
//                       )}
//                     </td>
//                     <td className="px-4 py-2 border">
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => handleEdit(type)}
//                           className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDeleteClick(type)}
//                           disabled={deleteLoading === type.slug}
//                           className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 disabled:opacity-50"
//                         >
//                           {deleteLoading === type.slug ? 'Deleting...' : 'Delete'}
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//                 {paginatedRoomTypes.length === 0 && (
//                   <tr>
//                     <td colSpan={4} className="text-center py-4">No room types found.</td>
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
//         {showEditModal && selectedRoomType && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold">Edit Room Type</h2>
//                 <button
//                   onClick={() => setShowEditModal(false)}
//                   className="text-gray-500 hover:text-gray-700 text-2xl"
//                 >
//                   ×
//                 </button>
//               </div>
//               <RoomTypeForm
//                 isEditMode={true}
//                 roomTypeData={selectedRoomType}
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
//             setRoomTypeToDelete(null);
//           }}
//           onConfirm={handleDeleteConfirm}
//           title="Delete Room Type"
//           message={`Are you sure you want to delete "${roomTypeToDelete?.name}"? This action cannot be undone.`}
//           confirmText="Delete Room Type"
//           cancelText="Cancel"
//           type="danger"
//           loading={deleteLoading === roomTypeToDelete?.slug}
//         />
//       </>
//     </ProtectedRoute>
//   );
// };

// export default RoomTypeTablePage; 





"use client";
import React, { useState, useEffect } from "react";
import HeroSub from "@/components/shared/HeroSub";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";
import RoomTypeForm from "@/components/Properties/RoomTypeForm";
import ConfirmationModal from "@/components/ui/confirmation-modal";
import { useRoomTypes } from "@/hooks/useRoomTypes";

const RoomTypeTablePage = () => {
  const { roomTypes, loading, error, deleteRoomType, refreshRoomTypes } = useRoomTypes();
  const [search, setSearch] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState<any>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [roomTypeToDelete, setRoomTypeToDelete] = useState<any>(null);

  // Filter room types by name
  const filteredRoomTypes = roomTypes.filter(type =>
    type.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (roomType: any) => {
    const roomTypeData = {
      _id: roomType.slug,
      name: roomType.name,
      description: roomType.description,
      image: roomType.image
    };
    setSelectedRoomType(roomTypeData);
    setShowEditModal(true);
  };

  const handleDeleteClick = (roomType: any) => {
    setRoomTypeToDelete(roomType);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!roomTypeToDelete) return;
    
    setDeleteLoading(roomTypeToDelete.slug);
    const result = await deleteRoomType(roomTypeToDelete.slug);
    setDeleteLoading(null);
    setShowDeleteModal(false);
    setRoomTypeToDelete(null);
    
    if (!result.success) {
      alert(`Failed to delete room type: ${result.error}`);
    }
  };

  const handleEditSuccess = () => {
    setShowEditModal(false);
    setSelectedRoomType(null);
    refreshRoomTypes();
  };

  if (loading) return <div className="text-center py-20">Loading room types...</div>;
  if (error) return <div className="text-center py-20 text-red-600">Error: {error}</div>;

  return (
    <ProtectedRoute allowedRoles={['admin', 'manager']}>
      <div className="transition-colors bg-[#F5F0E1] dark:bg-[#1E1B18] text-[#3B2F2F] dark:text-[#F2E9E1] min-h-screen">

        {/* Hero Section */}
        <HeroSub
          title="Room Types"
          description="Discover our premium room types, offering modern amenities and refined comfort for an unforgettable stay."
          badge="Room Types"
        />

        {/* Search + Add Room Type */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-4xl mx-auto py-6 px-5">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search room types..."
            className="w-full md:w-2/3 p-3 rounded-lg shadow-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-[#DCCAB0] dark:bg-[#3A352F] dark:text-[#FFF5E1] dark:placeholder:text-[#CFC5B7]"
          />
          <a
            href="http://localhost:3000/properties/add-roomtype"
            className="px-6 py-3 rounded-lg bg-gradient-to-br from-[#FFD700] to-[#A78256] text-[#1E1B18] font-semibold hover:opacity-90 transition-opacity shadow-lg"
          >
            Add Room Type
          </a>
        </div>

        {/* Table Section */}
        <div className="max-w-7xl mx-auto px-5 py-8 overflow-x-auto">
          <table className="min-w-full border-collapse rounded-2xl overflow-hidden shadow-2xl">
            <thead>
              <tr className="bg-[#DCCAB0] dark:bg-[#5B4E43] text-[#3B2F2F] dark:text-[#FFF5E1]">
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Description</th>
                <th className="px-6 py-3 text-left">Image</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoomTypes.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-6">No room types found.</td></tr>
              ) : filteredRoomTypes.map((type) => (
                <tr key={type.slug} className="hover:scale-105 transform transition-all duration-300 bg-[#F0E3D6] dark:bg-[#3A352F] border-b border-[#DCCAB0] dark:border-[#5B4E43]">
                  <td className="px-6 py-4">{type.name}</td>
                  <td className="px-6 py-4">{type.description}</td>
                  <td className="px-6 py-4">
                    {type.image && (
                      <img src={type.image} alt={type.name} className="w-20 h-14 object-cover rounded" />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleEdit(type)}
                        className="px-3 py-1 rounded-full bg-gradient-to-br from-[#F0E3D6] to-[#DCCAB0] dark:from-[#3A352F] dark:to-[#5B4E43] text-[#3B2F2F] dark:text-[#FFF5E1] hover:opacity-90 transition-opacity"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(type)}
                        disabled={deleteLoading === type.slug}
                        className="px-3 py-1 rounded-full bg-gradient-to-br from-[#FF5E5E] to-[#D62E2E] text-[#FFF5E1] hover:opacity-90 transition-opacity disabled:opacity-50"
                      >
                        {deleteLoading === type.slug ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Modal */}
        {showEditModal && selectedRoomType && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#F5F0E1] dark:bg-[#1E1B18] p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold dark:text-[#F2E9E1] text-[#3B2F2F]">Edit Room Type</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-500 dark:text-[#FFF5E1] hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <RoomTypeForm
                isEditMode={true}
                roomTypeData={selectedRoomType}
                onSuccess={handleEditSuccess}
              />
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <ConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => { setShowDeleteModal(false); setRoomTypeToDelete(null); }}
          onConfirm={handleDeleteConfirm}
          title="Delete Room Type"
          message={`Are you sure you want to delete "${roomTypeToDelete?.name}"? This action cannot be undone.`}
          confirmText="Delete Room Type"
          cancelText="Cancel"
          type="danger"
          loading={deleteLoading === roomTypeToDelete?.slug}
        />
      </div>
    </ProtectedRoute>
  );
};

export default RoomTypeTablePage;








// "use client";
// import React, { useState, useEffect } from "react";
// import { useRoomTypes } from "@/hooks/useRoomTypes";
// import HeroSub from "@/components/shared/HeroSub";
// import ProtectedRoute from "@/components/Auth/ProtectedRoute";
// import RoomTypeForm from "@/components/Properties/RoomTypeForm";
// import ConfirmationModal from "@/components/ui/confirmation-modal";

// const PAGE_SIZE = 5;

// const RoomTypeTablePage = () => {
//   const { roomTypes = [], loading, error, deleteRoomType, refreshRoomTypes } = useRoomTypes();
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState("");
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [selectedRoomType, setSelectedRoomType] = useState<any>(null);
//   const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [roomTypeToDelete, setRoomTypeToDelete] = useState<any>(null);

//   // Filter room types by name safely
//   const filteredRoomTypes = Array.isArray(roomTypes)
//     ? roomTypes.filter((type) =>
//         type.name?.toLowerCase().includes(search.toLowerCase())
//       )
//     : [];

//   const totalPages = Math.ceil(filteredRoomTypes.length / PAGE_SIZE) || 1;
//   const paginatedRoomTypes = filteredRoomTypes.slice(
//     (page - 1) * PAGE_SIZE,
//     page * PAGE_SIZE
//   );

//   useEffect(() => {
//     setPage(1);
//   }, [search]);

//   const handleEdit = (roomType: any) => {
//     const roomTypeData = {
//       _id: roomType._id || roomType.slug,
//       name: roomType.name || "",
//       description: roomType.description || "",
//       image: roomType.image || "",
//     };
//     setSelectedRoomType(roomTypeData);
//     setShowEditModal(true);
//   };

//   const handleDeleteClick = (roomType: any) => {
//     setRoomTypeToDelete(roomType);
//     setShowDeleteModal(true);
//   };

//   const handleDeleteConfirm = async () => {
//     if (!roomTypeToDelete) return;
//     setDeleteLoading(roomTypeToDelete._id || roomTypeToDelete.slug);
//     const result = await deleteRoomType(roomTypeToDelete._id || roomTypeToDelete.slug);
//     setDeleteLoading(null);
//     setShowDeleteModal(false);
//     setRoomTypeToDelete(null);

//     if (!result.success) {
//       alert(`Failed to delete room type: ${result.error}`);
//     } else {
//       refreshRoomTypes();
//     }
//   };

//   const handleEditSuccess = () => {
//     setShowEditModal(false);
//     setSelectedRoomType(null);
//     refreshRoomTypes();
//   };

//   if (loading) return <div>Loading room types...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <ProtectedRoute allowedRoles={["admin", "manager"]}>
//       <>
//         <HeroSub
//           title="Room Types"
//           description="Discover our premium room types, offering modern amenities and refined comfort for an unforgettable stay."
//           badge="Room Types"
//         />
//         <div className="p-6">
//           <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
//             <input
//               className="p-2 border rounded w-full max-w-xs"
//               placeholder="Search by name..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//             <a
//               href="http://localhost:3000/properties/add-roomtype"
//               className="bg-primary text-base font-semibold py-4 px-8 text-white hover:bg-white hover:text-dark duration-300 hover:cursor-pointer"
//               style={{ borderRadius: "10px", padding: "10px 20px" }}
//             >
//               Add Room Type
//             </a>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="min-w-full border border-gray-200">
//               <thead>
//                 <tr className="bg-gray-100 dark:bg-gray-800">
//                   <th className="px-4 py-2 border">Name</th>
//                   <th className="px-4 py-2 border">Description</th>
//                   <th className="px-4 py-2 border">Image</th>
//                   <th className="px-4 py-2 border">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginatedRoomTypes.length > 0 ? (
//                   paginatedRoomTypes.map((type, index) => (
//                     <tr key={type._id || type.slug || index} className="hover:bg-gray-50">
//                       <td className="px-4 py-2 border">{type.name || "N/A"}</td>
//                       <td className="px-4 py-2 border">{type.description || "N/A"}</td>
//                       <td className="px-4 py-2 border">
//                         {type.image && (
//                           <img
//                             src={type.image}
//                             alt={type.name || "Room"}
//                             className="w-16 h-12 object-cover rounded"
//                           />
//                         )}
//                       </td>
//                       <td className="px-4 py-2 border">
//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => handleEdit(type)}
//                             className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => handleDeleteClick(type)}
//                             disabled={deleteLoading === (type._id || type.slug)}
//                             className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 disabled:opacity-50"
//                           >
//                             {deleteLoading === (type._id || type.slug) ? "Deleting..." : "Delete"}
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={4} className="text-center py-4">
//                       No room types found.
//                     </td>
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
//         {showEditModal && selectedRoomType && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold">Edit Room Type</h2>
//                 <button
//                   onClick={() => setShowEditModal(false)}
//                   className="text-gray-500 hover:text-gray-700 text-2xl"
//                 >
//                   ×
//                 </button>
//               </div>
//               <RoomTypeForm
//                 isEditMode={true}
//                 roomTypeData={selectedRoomType}
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
//             setRoomTypeToDelete(null);
//           }}
//           onConfirm={handleDeleteConfirm}
//           title="Delete Room Type"
//           message={`Are you sure you want to delete "${roomTypeToDelete?.name}"? This action cannot be undone.`}
//           confirmText="Delete Room Type"
//           cancelText="Cancel"
//           type="danger"
//           loading={deleteLoading === (roomTypeToDelete?._id || roomTypeToDelete?.slug)}
//         />
//       </>
//     </ProtectedRoute>
//   );
// };

// export default RoomTypeTablePage;

















// "use client";
// import React, { useState, useEffect } from "react";
// import HeroSub from "@/components/shared/HeroSub";
// import ProtectedRoute from "@/components/Auth/ProtectedRoute";
// import RoomTypeForm from "@/components/Properties/RoomTypeForm";
// import ConfirmationModal from "@/components/ui/confirmation-modal";

// const PAGE_SIZE = 5;

// const RoomTypeTablePage = () => {
//   const [roomTypes, setRoomTypes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState("");
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [selectedRoomType, setSelectedRoomType] = useState(null);
//   const [deleteLoading, setDeleteLoading] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [roomTypeToDelete, setRoomTypeToDelete] = useState(null);

//   // ⭐⭐⭐ FETCH FROM THE CORRECT ENDPOINT ONLY HERE ⭐⭐⭐
//   const fetchRoomTypes = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("http://localhost:3001/roomtypes/limited");
//       const data = await response.json();

//       // Make sure it's an array
//       setRoomTypes(Array.isArray(data.roomtype) ? data.roomtype : []);
//       setError(null);
//     } catch (err) {
//       setError("Failed to load room types");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRoomTypes();
//   }, []);

//   const filteredRoomTypes = roomTypes.filter((type) =>
//     type.name?.toLowerCase().includes(search.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredRoomTypes.length / PAGE_SIZE) || 1;
//   const paginatedRoomTypes = filteredRoomTypes.slice(
//     (page - 1) * PAGE_SIZE,
//     page * PAGE_SIZE
//   );

//   useEffect(() => setPage(1), [search]);

//   const handleEdit = (roomType) => {
//     setSelectedRoomType({
//       _id: roomType._id,
//       name: roomType.name,
//       description: roomType.description,
//       image: roomType.image,
//     });
//     setShowEditModal(true);
//   };

//   const handleDeleteClick = (roomType) => {
//     setRoomTypeToDelete(roomType);
//     setShowDeleteModal(true);
//   };

//   const handleDeleteConfirm = async () => {
//     if (!roomTypeToDelete) return;

//     setDeleteLoading(roomTypeToDelete._id);

//     await fetch(`http://localhost:3001/deleteroomtype/${roomTypeToDelete._id}`, {
//       method: "DELETE",
//     });

//     setDeleteLoading(null);
//     setShowDeleteModal(false);
//     setRoomTypeToDelete(null);

//     fetchRoomTypes();
//   };

//   const handleEditSuccess = () => {
//     setShowEditModal(false);
//     fetchRoomTypes();
//   };

//   if (loading) return <div>Loading room types...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <ProtectedRoute allowedRoles={["admin", "manager"]}>
//       <>
//         <HeroSub
//           title="Room Types"
//           description="Discover our premium room types, offering modern amenities and refined comfort."
//           badge="Room Types"
//         />

//         <div className="p-6">
//           {/* Search + Add */}
//           <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
//             <input
//               className="p-2 border rounded w-full max-w-xs"
//               placeholder="Search by name..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//             <a
//               href="/properties/add-roomtype"
//               className="bg-primary text-base font-semibold py-4 px-8 text-white rounded-lg"
//             >
//               Add Room Type
//             </a>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="min-w-full border border-gray-200">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="px-4 py-2 border">Name</th>
//                   <th className="px-4 py-2 border">Description</th>
//                   <th className="px-4 py-2 border">Image</th>
//                   <th className="px-4 py-2 border">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginatedRoomTypes.length ? (
//                   paginatedRoomTypes.map((type) => (
//                     <tr key={type._id} className="hover:bg-gray-50">
//                       <td className="px-4 py-2 border">{type.name}</td>
//                       <td className="px-4 py-2 border">{type.description}</td>
//                       <td className="px-4 py-2 border">
//                         <img
//                           src={type.image}
//                           className="w-16 h-12 object-cover rounded"
//                         />
//                       </td>
//                       <td className="px-4 py-2 border">
//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => handleEdit(type)}
//                             className="bg-blue-500 text-white px-3 py-1 rounded"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => handleDeleteClick(type)}
//                             disabled={deleteLoading === type._id}
//                             className="bg-red-500 text-white px-3 py-1 rounded disabled:opacity-50"
//                           >
//                             {deleteLoading === type._id ? "Deleting..." : "Delete"}
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={4} className="text-center py-4">
//                       No room types found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="flex items-center justify-between mt-4">
//             <button
//               className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//               onClick={() => setPage((p) => Math.max(1, p - 1))}
//               disabled={page === 1}
//             >
//               Previous
//             </button>
//             <span>
//               Page {page} of {totalPages}
//             </span>
//             <button
//               className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//               onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//               disabled={page === totalPages}
//             >
//               Next
//             </button>
//           </div>
//         </div>

//         {/* Edit Modal */}
//         {showEditModal && selectedRoomType && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4">
//               <div className="flex justify-between mb-4">
//                 <h2 className="text-xl font-bold">Edit Room Type</h2>
//                 <button
//                   onClick={() => setShowEditModal(false)}
//                   className="text-gray-500 text-2xl"
//                 >
//                   ×
//                 </button>
//               </div>
//               <RoomTypeForm
//                 isEditMode={true}
//                 roomTypeData={selectedRoomType}
//                 onSuccess={handleEditSuccess}
//               />
//             </div>
//           </div>
//         )}

//         {/* Delete Modal */}
//         <ConfirmationModal
//           isOpen={showDeleteModal}
//           onClose={() => setShowDeleteModal(false)}
//           onConfirm={handleDeleteConfirm}
//           title="Delete Room Type"
//           message={`Are you sure you want to delete "${roomTypeToDelete?.name}"?`}
//           confirmText="Delete Room Type"
//           cancelText="Cancel"
//           type="danger"
//           loading={deleteLoading === roomTypeToDelete?._id}
//         />
//       </>
//     </ProtectedRoute>
//   );
// };

// export default RoomTypeTablePage;
