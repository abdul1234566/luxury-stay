import { useState, useEffect, useCallback } from 'react';

// Define the backend room type structure
export interface BackendRoomType {
  _id: string;
  name: string;
  description: string;
  image: string;
}

// Define the mapped structure for RoomType
export interface MappedRoomType {
  name: string;
  description: string;
  image: string;
  slug: string;
}

export const useRoomTypes = () => {
  const [roomTypes, setRoomTypes] = useState<MappedRoomType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRoomTypes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/roomtypes/limited');
      if (!response.ok) {
        throw new Error('Failed to fetch room types');
      }
      const data = await response.json();
      // Map backend data to frontend structure
      const mappedRoomTypes: MappedRoomType[] = (data.roomtype || data || []).map((roomType: any) => ({
        name: roomType.name,
        description: roomType.description,
        image: roomType.image,
        slug: roomType._id,
      }));
      setRoomTypes(mappedRoomTypes);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteRoomType = useCallback(async (roomTypeId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/deleteroomtype/${roomTypeId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete room type');
      }

      // Refresh the room types list after successful deletion
      await fetchRoomTypes();
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Failed to delete room type'
      };
    }
  }, [fetchRoomTypes]);

  useEffect(() => {
    fetchRoomTypes();
  }, [fetchRoomTypes]);

  return { roomTypes, loading, error, deleteRoomType, refreshRoomTypes: fetchRoomTypes };
};



// import { useState, useEffect } from "react";
// import axios from "axios";

// export const useRoomTypes = () => {
//   const [roomTypes, setRoomTypes] = useState<any[]>([]); // initialize as empty array
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch room types from correct backend endpoint
//   const fetchRoomTypes = async () => {
//     try {
//       setLoading(true);
//       // const res = await axios.get("http://localhost:3001/roomtypes/allroomtype");
//       const res = await axios.get("http://localhost:3001/roomtypes/limited");
//       setRoomTypes(res.data); // ensure backend returns an array
//       setLoading(false);
//     } catch (err: any) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   const deleteRoomType = async (id: string) => {
//     try {
//       await axios.delete(`http://localhost:3001/roomtypes/${id}`);
//       setRoomTypes(prev => prev.filter(rt => rt._id !== id));
//       return { success: true };
//     } catch (err: any) {
//       return { success: false, error: err.message };
//     }
//   };

//   const refreshRoomTypes = () => fetchRoomTypes();

//   useEffect(() => {
//     fetchRoomTypes();
//   }, []);

//   return { roomTypes, loading, error, deleteRoomType, refreshRoomTypes };
// };
