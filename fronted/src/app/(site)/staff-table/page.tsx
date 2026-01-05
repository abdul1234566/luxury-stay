// "use client";
// import React, { useEffect, useState } from "react";
// import HeroSub from "@/components/shared/HeroSub";
// import ProtectedRoute from "@/components/Auth/ProtectedRoute";
// import { useRole } from "@/hooks/useRole";
// import ConfirmationModal from "@/components/ui/confirmation-modal";

// type User = {
//   _id: string;
//   name: string;
//   email: string;
//   role: string;
//   isActive: boolean;
// };

// const PAGE_SIZE = 10;

// const roleLabel = (role: string) => {
//   switch (role) {
//     case 'receptionist': return 'Receptionist';
//     case 'housekeeping': return 'Housekeeping';
//     case 'manager': return 'Manager';
//     case 'maintenance': return 'Maintenance';
//     default: return role;
//   }
// };

// export default function StaffTablePage() {
//   const { isManager } = useRole();
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState("");
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showActivateModal, setShowActivateModal] = useState(false);
//   const [showDeactivateModal, setShowDeactivateModal] = useState(false);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [actionLoading, setActionLoading] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch("http://localhost:3001/users/allusers");
//         const data = await res.json();
//         if (res.ok) {
//           setUsers(data.users || []);
//         } else {
//           setError(data.message || "Failed to fetch users");
//         }
//       } catch (e) {
//         setError("Error fetching users");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   // Filter out admin and guest
//   const staffUsers = users.filter(u => u.role !== 'admin' && u.role !== 'guest');
//   // Filter by search
//   const filtered = staffUsers.filter(u =>
//     u.name.toLowerCase().includes(search.toLowerCase()) ||
//     u.email.toLowerCase().includes(search.toLowerCase())
//   );
//   const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
//   const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

//   // Reset to page 1 if search changes
//   useEffect(() => { setPage(1); }, [search]);

//   const handleDeactivateClick = (user: User) => {
//     setSelectedUser(user);
//     setShowDeactivateModal(true);
//   };

//   const handleDeactivateConfirm = async () => {
//     if (!selectedUser) return;
    
//     setActionLoading(selectedUser._id);
//     try {
//       const res = await fetch(`http://localhost:3001/deactivate/${selectedUser._id}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ isActive: false })
//       });
//       if (res.ok) {
//         setUsers(users => users.map(u => u._id === selectedUser._id ? { ...u, isActive: false } : u));
//       } else {
//         alert("Failed to deactivate user");
//       }
//     } catch {
//       alert("Error deactivating user");
//     } finally {
//       setActionLoading(null);
//       setShowDeactivateModal(false);
//       setSelectedUser(null);
//     }
//   };

//   const handleActivateClick = (user: User) => {
//     setSelectedUser(user);
//     setShowActivateModal(true);
//   };

//   const handleActivateConfirm = async () => {
//     if (!selectedUser) return;
    
//     setActionLoading(selectedUser._id);
//     try {
//       const res = await fetch(`http://localhost:3001/activate/${selectedUser._id}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ isActive: true })
//       });
//       if (res.ok) {
//         setUsers(users => users.map(u => u._id === selectedUser._id ? { ...u, isActive: true } : u));
//       } else {
//         alert("Failed to activate user");
//       }
//     } catch {
//       alert("Error activating user");
//     } finally {
//       setActionLoading(null);
//       setShowActivateModal(false);
//       setSelectedUser(null);
//     }
//   };

//   const handleDeleteClick = (user: User) => {
//     setSelectedUser(user);
//     setShowDeleteModal(true);
//   };

//   const handleDeleteConfirm = async () => {
//     if (!selectedUser) return;
    
//     setActionLoading(selectedUser._id);
//     try {
//       const res = await fetch(`http://localhost:3001/deleteuser/${selectedUser._id}`, {
//         method: 'DELETE',
//       });
//       if (res.ok) {
//         setUsers(users => users.filter(u => u._id !== selectedUser._id));
//       } else {
//         alert("Failed to delete user");
//       }
//     } catch {
//       alert("Error deleting user");
//     } finally {
//       setActionLoading(null);
//       setShowDeleteModal(false);
//       setSelectedUser(null);
//     }
//   };

//   const handleEdit = (id: string) => {
//     // Redirect to edit page (to be implemented)
//     window.location.href = `/admin/users?id=${id}`;
//   };

//   if (loading) return <div>Loading staff...</div>;
//   if (error) return <div className="text-red-600">{error}</div>;

//   return (
//     <ProtectedRoute allowedRoles={['admin', 'manager']}>
//       <>
//         <HeroSub
//                 title="Staff Profiles"
//                 description="View and manage your staff profiles."
//                 badge="Staff"
//             />
//     <div className="p-6">
//       <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
//         <input
//           className="p-2 border rounded w-full max-w-xs"
//           placeholder="Search by name or email..."
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//         />
//         <a
//           href="http://localhost:3000/admin/users"
//           className="bg-primary text-base font-semibold py-4 px-8 text-white hover:bg-white hover:text-dark duration-300 hover:cursor-pointer"
//         style={{borderRadius: '10px', padding: '10px 20px'}}>
//           Add Staff
//         </a>
//       </div>
//       <table className="min-w-full border border-gray-200">
//         <thead>
//           <tr className="bg-gray-100 dark:bg-gray-800">
//             <th className="px-4 py-2 border">Name</th>
//             <th className="px-4 py-2 border">Email</th>
//             <th className="px-4 py-2 border">Role</th>
//             <th className="px-4 py-2 border">Active</th>
//             <th className="px-4 py-2 border">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {paginated.map((user) => (
//             <tr key={user._id} className="hover:bg-gray-00">
//               <td className="px-4 py-2 border">{user.name}</td>
//               <td className="px-4 py-2 border">{user.email}</td>
//               <td className="px-4 py-2 border">{roleLabel(user.role)}</td>
//               <td className="px-4 py-2 border">{user.isActive ? 'Yes' : 'No'}</td>
//               <td className="px-4 py-2 border">
//                 <div className="flex gap-1">
//                   <button
//                     className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-white hover:text-dark border border-yellow-500 duration-300"
//                     onClick={() => handleEdit(user._id)}
//                     disabled={!user.isActive}
//                   >
//                     Edit
//                   </button>
//                   {user.isActive ? (
//                     <button
//                       className="bg-red-500 text-white px-3 py-1 rounded hover:bg-white hover:text-red-600 border border-red-500 duration-300"
//                       onClick={() => handleDeactivateClick(user)}
//                       disabled={actionLoading === user._id}
//                     >
//                       {actionLoading === user._id ? 'Deactivating...' : 'Deactivate'}
//                     </button>
//                   ) : (
//                     <button
//                       className="bg-green-600 text-white px-3 py-1 rounded hover:bg-white hover:text-green-600 border border-green-600 duration-300"
//                       onClick={() => handleActivateClick(user)}
//                       disabled={actionLoading === user._id}
//                     >
//                       {actionLoading === user._id ? 'Activating...' : 'Activate'}
//                     </button>
//                   )}
//                   <button
//                     className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-white hover:text-gray-700 border border-gray-700 duration-300"
//                     onClick={() => handleDeleteClick(user)}
//                     disabled={actionLoading === user._id}
//                   >
//                     {actionLoading === user._id ? 'Deleting...' : 'Delete'}
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//           {paginated.length === 0 && (
//             <tr>
//               <td colSpan={5} className="text-center py-4">No staff found.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//       <div className="flex items-center justify-between mt-4">
//         <button
//           className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
//           onClick={() => setPage((p) => Math.max(1, p - 1))}
//           disabled={page === 1}
//         >
//           Previous
//         </button>
//         <span>
//           Page {page} of {totalPages}
//         </span>
//         <button
//           className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
//           onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//           disabled={page === totalPages}
//         >
//           Next
//         </button>
//       </div>
//           </div>

//       {/* Delete Confirmation Modal */}
//       <ConfirmationModal
//         isOpen={showDeleteModal}
//         onClose={() => {
//           setShowDeleteModal(false);
//           setSelectedUser(null);
//         }}
//         onConfirm={handleDeleteConfirm}
//         title="Delete Staff Member"
//         message={`Are you sure you want to delete "${selectedUser?.name}"? This action cannot be undone.`}
//         confirmText="Delete Staff Member"
//         cancelText="Cancel"
//         type="danger"
//         loading={actionLoading === selectedUser?._id}
//       />

//       {/* Activate Confirmation Modal */}
//       <ConfirmationModal
//         isOpen={showActivateModal}
//         onClose={() => {
//           setShowActivateModal(false);
//           setSelectedUser(null);
//         }}
//         onConfirm={handleActivateConfirm}
//         title="Activate Staff Member"
//         message={`Are you sure you want to activate "${selectedUser?.name}"?`}
//         confirmText="Activate Staff Member"
//         cancelText="Cancel"
//         type="info"
//         loading={actionLoading === selectedUser?._id}
//       />

//       {/* Deactivate Confirmation Modal */}
//       <ConfirmationModal
//         isOpen={showDeactivateModal}
//         onClose={() => {
//           setShowDeactivateModal(false);
//           setSelectedUser(null);
//         }}
//         onConfirm={handleDeactivateConfirm}
//         title="Deactivate Staff Member"
//         message={`Are you sure you want to deactivate "${selectedUser?.name}"?`}
//         confirmText="Deactivate Staff Member"
//         cancelText="Cancel"
//         type="warning"
//         loading={actionLoading === selectedUser?._id}
//       />
//     </>
//     </ProtectedRoute>
//   );
// } 






"use client";
import React, { useEffect, useState } from "react";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";
import ConfirmationModal from "@/components/ui/confirmation-modal";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
};

const PAGE_SIZE = 10;

const roleLabel = (role: string) => {
  switch (role) {
    case "receptionist": return "Receptionist";
    case "housekeeping": return "Housekeeping";
    case "manager": return "Manager";
    case "maintenance": return "Maintenance";
    default: return role;
  }
};

export default function StaffTablePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showActivateModal, setShowActivateModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3001/users/allusers");
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users || []);
        } else {
          setError(data.message || "Failed to fetch users");
        }
      } catch {
        setError("Error fetching users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const staffUsers = users.filter((u) => u.role !== "admin" && u.role !== "guest");
  const filtered = staffUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => setPage(1), [search]);

  // --- Action handlers ---
  const handleDeactivateClick = (user: User) => { setSelectedUser(user); setShowDeactivateModal(true); };
  const handleDeactivateConfirm = async () => {
    if (!selectedUser) return;
    setActionLoading(selectedUser._id);
    try {
      const res = await fetch(`http://localhost:3001/deactivate/${selectedUser._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: false }),
      });
      if (res.ok) setUsers((u) => u.map((x) => x._id === selectedUser._id ? { ...x, isActive: false } : x));
    } catch { alert("Error deactivating user"); }
    finally { setActionLoading(null); setShowDeactivateModal(false); setSelectedUser(null); }
  };

  const handleActivateClick = (user: User) => { setSelectedUser(user); setShowActivateModal(true); };
  const handleActivateConfirm = async () => {
    if (!selectedUser) return;
    setActionLoading(selectedUser._id);
    try {
      const res = await fetch(`http://localhost:3001/activate/${selectedUser._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: true }),
      });
      if (res.ok) setUsers((u) => u.map((x) => x._id === selectedUser._id ? { ...x, isActive: true } : x));
    } catch { alert("Error activating user"); }
    finally { setActionLoading(null); setShowActivateModal(false); setSelectedUser(null); }
  };

  const handleDeleteClick = (user: User) => { setSelectedUser(user); setShowDeleteModal(true); };
  const handleDeleteConfirm = async () => {
    if (!selectedUser) return;
    setActionLoading(selectedUser._id);
    try {
      const res = await fetch(`http://localhost:3001/deleteuser/${selectedUser._id}`, { method: "DELETE" });
      if (res.ok) setUsers((u) => u.filter((x) => x._id !== selectedUser._id));
    } catch { alert("Error deleting user"); }
    finally { setActionLoading(null); setShowDeleteModal(false); setSelectedUser(null); }
  };

  const handleEdit = (id: string) => { window.location.href = `/admin/users?id=${id}`; };

  if (loading) return <div className="text-center py-20">Loading staff...</div>;
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;

  return (
    <ProtectedRoute allowedRoles={["admin", "manager"]}>
      <div className="transition-colors bg-[#F5F0E1] dark:bg-[#1E1B18] text-[#3B2F2F] dark:text-[#F2E9E1] min-h-screen">

        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-[#F5EAD6] to-[#EADFC2] py-32 text-center dark:from-[#2C2723] dark:to-[#3A352F]">
          <h1 className="text-5xl font-bold mb-4">Manage Your Team</h1>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            View, activate, deactivate, or edit your hotel staff members. Ensure smooth operations with premium management tools.
          </p>

          {/* Search + Add Staff */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-3xl mx-auto">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search staff by name or email..."
              className="w-full md:w-2/3 p-3 rounded-lg shadow-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-[#DCCAB0] dark:bg-[#3A352F] dark:text-[#FFF5E1] dark:placeholder:text-[#CFC5B7]"
            />
            <a
              href="http://localhost:3000/admin/users"
              className="px-6 py-3 rounded-lg bg-gradient-to-br from-[#FFD700] to-[#A78256] text-[#1E1B18] font-semibold hover:opacity-90 transition-opacity shadow-lg"
            >
              Add Staff
            </a>
          </div>
        </section>

        {/* Table Section */}
        <div className="max-w-7xl mx-auto px-5 py-16">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse rounded-2xl overflow-hidden shadow-2xl">
              <thead>
                <tr className="bg-[#DCCAB0] dark:bg-[#5B4E43] text-[#3B2F2F] dark:text-[#FFF5E1]">
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Role</th>
                  <th className="px-6 py-3 text-left">Active</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr><td colSpan={5} className="text-center py-6">No staff found.</td></tr>
                ) : paginated.map((user) => (
                  <tr key={user._id} className="hover:scale-105 transform transition-all duration-300 bg-[#F0E3D6] dark:bg-[#3A352F] border-b border-[#DCCAB0] dark:border-[#5B4E43]">
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{roleLabel(user.role)}</td>
                    <td className="px-6 py-4">{user.isActive ? "Yes" : "No"}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          className="px-3 py-1 rounded-full bg-gradient-to-br from-[#F0E3D6] to-[#DCCAB0] dark:from-[#3A352F] dark:to-[#5B4E43] hover:opacity-90 transition-opacity text-[#3B2F2F] dark:text-[#FFF5E1]"
                          onClick={() => handleEdit(user._id)} disabled={!user.isActive}
                        >Edit</button>

                        {user.isActive ? (
                          <button
                            className="px-3 py-1 rounded-full bg-gradient-to-br from-[#FFD700] to-[#A78256] hover:opacity-90 transition-opacity text-[#1E1B18]"
                            onClick={() => handleDeactivateClick(user)}
                            disabled={actionLoading === user._id}
                          >{actionLoading === user._id ? "Deactivating..." : "Deactivate"}</button>
                        ) : (
                          <button
                            className="px-3 py-1 rounded-full bg-gradient-to-br from-[#A78256] to-[#FFD700] hover:opacity-90 transition-opacity text-[#FFF5E1]"
                            onClick={() => handleActivateClick(user)}
                            disabled={actionLoading === user._id}
                          >{actionLoading === user._id ? "Activating..." : "Activate"}</button>
                        )}

                        <button
                          className="px-3 py-1 rounded-full bg-gradient-to-br from-[#FF5E5E] to-[#D62E2E] hover:opacity-90 transition-opacity text-[#FFF5E1]"
                          onClick={() => handleDeleteClick(user)}
                          disabled={actionLoading === user._id}
                        >{actionLoading === user._id ? "Deleting..." : "Delete"}</button>
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

        {/* Confirmation Modals */}
        <ConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => { setShowDeleteModal(false); setSelectedUser(null); }}
          onConfirm={handleDeleteConfirm}
          title="Delete Staff Member"
          message={`Are you sure you want to delete "${selectedUser?.name}"? This action cannot be undone.`}
          confirmText="Delete Staff Member"
          cancelText="Cancel"
          type="danger"
          loading={actionLoading === selectedUser?._id}
        />
        <ConfirmationModal
          isOpen={showActivateModal}
          onClose={() => { setShowActivateModal(false); setSelectedUser(null); }}
          onConfirm={handleActivateConfirm}
          title="Activate Staff Member"
          message={`Are you sure you want to activate "${selectedUser?.name}"?`}
          confirmText="Activate Staff Member"
          cancelText="Cancel"
          type="info"
          loading={actionLoading === selectedUser?._id}
        />
        <ConfirmationModal
          isOpen={showDeactivateModal}
          onClose={() => { setShowDeactivateModal(false); setSelectedUser(null); }}
          onConfirm={handleDeactivateConfirm}
          title="Deactivate Staff Member"
          message={`Are you sure you want to deactivate "${selectedUser?.name}"?`}
          confirmText="Deactivate Staff Member"
          cancelText="Cancel"
          type="warning"
          loading={actionLoading === selectedUser?._id}
        />
      </div>
    </ProtectedRoute>
  );
}