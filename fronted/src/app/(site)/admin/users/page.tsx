// "use client"
// import React, { useEffect, useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import HeroSub from "@/components/shared/HeroSub";
// import ProtectedRoute from "@/components/Auth/ProtectedRoute";

// const roles = [
//   { value: '', label: 'Select Role' },
//   { value: 'receptionist', label: 'Receptionist' },
//   { value: 'housekeeping', label: 'Housekeeping' },
//   { value: 'manager', label: 'Manager' },
//   { value: 'maintenance', label: 'Maintenance' },
// ];

// export default function CreateOrEditStaffPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const id = searchParams.get('id');
//   const isEdit = Boolean(id);

//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: roles[0].value,
//     isActive: true,
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     if (isEdit && id) {
//       setLoading(true);
//       fetch(`http://localhost:3001/users/${id}`)
//         .then(res => res.json())
//         .then(data => {
//           if (data.user) {
//             setForm({
//               name: data.user.name,
//               email: data.user.email,
//               password: '', // Don't prefill password
//               role: data.user.role,
//               isActive: data.user.isActive,
//             });
//           } else {
//             setMessage(data.message || 'Failed to fetch user.');
//           }
//         })
//         .catch(() => setMessage('Error fetching user.'))
//         .finally(() => setLoading(false));
//     }
//   }, [isEdit, id]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');
//     try {
//       let res, data;
//       if (isEdit && id) {
//         res = await fetch(`http://localhost:3001/users/${id}`, {
//           method: 'put',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(form),
//         });
//         data = await res.json();
//         if (res.ok) {
//           setMessage('Staff profile updated successfully!');
//           router.push('/staff-table');
//         } else {
//           setMessage(data.message || 'Failed to update staff profile.');
//         }
//       } else {
//         res = await fetch('http://localhost:3001/signup/adduser', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(form),
//         });
//         if (res.ok) {
//           setMessage('Staff profile created successfully!');
//           setForm({
//             name: '',
//             email: '',
//             password: '',
//             role: roles[0].value,
//             isActive: true,
//           });
//           router.push('/staff-table');
//         } else {
//           data = await res.json();
//           setMessage(data.message || 'Failed to create staff profile.');
//         }
//       }
//     } catch (err) {
//       setMessage('Error occurred.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ProtectedRoute allowedRoles={['admin', 'manager']}>
//       <>
//         <HeroSub
//           title={isEdit ? 'Edit Staff Profile' : 'Create Staff Profile'}
//           description={isEdit ? 'Edit an existing staff profile.' : 'Create a new staff profile for your hotel.'}
//           badge="Staff"
//         />
//         <div className="max-w-xl mx-auto p-6 rounded shadow mb-5">
//           <h1 className="text-2xl font-bold mb-4">{isEdit ? 'Edit Staff Profile' : 'Create Staff Profile'}</h1>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block mb-1 font-medium">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={form.name}
//                 onChange={handleChange}
//                 required
//                 className="w-full border px-3 py-2 rounded"
//               />
//             </div>
//             <div>
//               <label className="block mb-1 font-medium">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 required
//                 className="w-full border px-3 py-2 rounded"
//                 disabled={isEdit} // Email should not be changed on edit
//               />
//             </div>
//             <div>
//               <label className="block mb-1 font-medium">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={form.password}
//                 onChange={handleChange}
//                 required={!isEdit}
//                 className="w-full border px-3 py-2 rounded"
//                 placeholder={isEdit ? 'Leave blank to keep unchanged' : ''}
//               />
//             </div>
//             <div>
//               <label className="block mb-1 font-medium ">Role</label>
//               <select
//                 name="role"
//                 required
//                 value={form.role}
//                 onChange={handleChange}
//                 className="w-full border px-3 py-2 rounded bg-gray-100 dark:bg-gray-800"
//               >
//                 {roles.map((role) => (
//                   <option key={role.value} value={role.value}>{role.label}</option>
//                 ))}
//               </select>
//             </div>
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 name="isActive"
//                 checked={form.isActive}
//                 onChange={handleChange}
//                 className="mr-2"
//               />
//               <label className="font-medium">Active</label>
//             </div>
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//               disabled={loading}
//             >
//               {loading ? (isEdit ? 'Updating...' : 'Creating...') : (isEdit ? 'Update Staff' : 'Create Staff')}
//             </button>
//             {message && (
//               <div
//                 className={`mt-2 text-center text-sm ${/success/i.test(message) ? 'text-green-600' : 'text-red-600'}`}
//               >
//                 {message}
//               </div>
//             )}
//           </form>
//         </div>
//       </>
//     </ProtectedRoute>
//   );
// } 







"use client"
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import HeroSub from "@/components/shared/HeroSub";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";
import { useTheme } from "next-themes";

const roles = [
  { value: '', label: 'Select Role' },
  { value: 'receptionist', label: 'Receptionist' },
  { value: 'housekeeping', label: 'Housekeeping' },
  { value: 'manager', label: 'Manager' },
  { value: 'maintenance', label: 'Maintenance' },
];

export default function CreateOrEditStaffPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const colors = {
    bg: isDark ? "#1E1B18" : "#F5F0E1",
    cardBg: isDark ? "#2C2723" : "#FFFFFF",
    inputBg: isDark ? "#3A332F" : "#FDFCFA",
    inputBorder: isDark ? "#5C524B" : "#D8D1C8",
    text: isDark ? "#F2E9E1" : "#3B2F2F",
    buttonBg: isDark ? "#A78256" : "#DCCAB0",
    buttonText: isDark ? "#FFF5E1" : "#3B2F2F",
    buttonHover: isDark ? "#8F6948" : "#CBB292",
    link: isDark ? "#FFD700" : "#A78256",
    shadow: isDark
      ? "0 20px 40px rgba(0,0,0,0.35)"
      : "0 20px 40px rgba(0,0,0,0.12)",
  };

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: roles[0].value,
    isActive: true,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isEdit && id) {
      setLoading(true);
      fetch(`http://localhost:3001/users/${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.user) {
            setForm({
              name: data.user.name,
              email: data.user.email,
              password: '',
              role: data.user.role,
              isActive: data.user.isActive,
            });
          } else {
            setMessage(data.message || 'Failed to fetch user.');
          }
        })
        .catch(() => setMessage('Error fetching user.'))
        .finally(() => setLoading(false));
    }
  }, [isEdit, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      let res, data;
      if (isEdit && id) {
        res = await fetch(`http://localhost:3001/users/${id}`, {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        data = await res.json();
        if (res.ok) {
          setMessage('Staff profile updated successfully!');
          router.push('/staff-table');
        } else {
          setMessage(data.message || 'Failed to update staff profile.');
        }
      } else {
        res = await fetch('http://localhost:3001/signup/adduser', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        data = await res.json();
        if (res.ok) {
          setMessage('Staff profile created successfully!');
          setForm({
            name: '',
            email: '',
            password: '',
            role: roles[0].value,
            isActive: true,
          });
          router.push('/staff-table');
        } else {
          setMessage(data.message || 'Failed to create staff profile.');
        }
      }
    } catch (err) {
      setMessage('Error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute allowedRoles={['admin', 'manager']}>
      <section
        className="pt-44 min-h-screen transition-colors duration-500"
        style={{ background: colors.bg }}
      >
        <HeroSub
          title={isEdit ? 'Edit Staff Profile' : 'Create Staff Profile'}
          description={isEdit ? 'Edit an existing staff profile.' : 'Create a new staff profile for your hotel.'}
          badge="Staff"
        />

        <div
          className="max-w-xl mx-auto p-12 rounded-2xl shadow-2xl transition-all"
          style={{
            background: colors.cardBg,
            color: colors.text,
            boxShadow: colors.shadow,
          }}
        >
          <style>{`
            .staff-theme-wrapper input,
            .staff-theme-wrapper select {
              background: ${colors.inputBg};
              color: ${colors.text};
              border: 1px solid ${colors.inputBorder};
              padding: 14px;
              border-radius: 14px;
              font-size: 16px;
              width: 100%;
              transition: 0.3s ease;
            }
            .staff-theme-wrapper input:focus,
            .staff-theme-wrapper select:focus {
              border-color: ${colors.buttonBg};
              outline: none;
              box-shadow: 0 0 0 3px ${colors.buttonBg}30;
            }
            .staff-theme-wrapper button {
              background: ${colors.buttonBg};
              color: ${colors.buttonText};
              padding: 14px;
              width: 100%;
              border-radius: 14px;
              font-weight: 600;
              transition: 0.3s ease;
            }
            .staff-theme-wrapper button:hover {
              background: ${colors.buttonHover};
              transform: scale(1.02);
            }
            .staff-theme-wrapper a {
              color: ${colors.link};
              font-weight: 500;
              transition: 0.3s ease;
            }
            .staff-theme-wrapper a:hover {
              opacity: 0.8;
            }
          `}</style>

          <div className="staff-theme-wrapper">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  disabled={isEdit}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required={!isEdit}
                  placeholder={isEdit ? 'Leave blank to keep unchanged' : ''}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Role</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  required
                >
                  {roles.map((role) => (
                    <option key={role.value} value={role.value}>{role.label}</option>
                  ))}
                </select>
              </div>

              {/* <div className="flex items-center ">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={form.isActive}
                  onChange={handleChange}
                  className="accent-[#A78256] dark:accent-[#FFD700]"
                />
                <label className="font-medium">Active</label>
              </div> */}
             

              <button type="submit" disabled={loading}>
                {loading ? (isEdit ? 'Updating...' : 'Creating...') : (isEdit ? 'Update Staff' : 'Create Staff')}
              </button>

              {message && (
                <div className={`mt-2 text-center text-sm ${/success/i.test(message) ? 'text-green-600' : 'text-red-600'}`}>
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </ProtectedRoute>
  );
}
