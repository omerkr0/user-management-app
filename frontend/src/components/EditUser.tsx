// EditUser.tsx
import { useUserContext } from "@/context/UserContext";
import React from "react";

const EditUser: React.FC = () => {
  const {
    newUser,
    setNewUser,
    selectedUserId,
    setIsEditModalOpen,
    handleEditUser,
    isEditModalOpen,
  } = useUserContext();

  return (
    isEditModalOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
        <div className="relative z-50 text-black bg-white p-6 rounded-lg shadow-lg">
          <p className="mb-4">Kullanıcı ID: {selectedUserId}</p>
          <label className="block mb-2">
            Kullanıcı Adı:
            <input
              type="text"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
              className="border p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            Ad Soyad:
            <input
              type="text"
              value={newUser.fullname}
              onChange={(e) =>
                setNewUser({ ...newUser, fullname: e.target.value })
              }
              className="border p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            Email:
            <input
              type="email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="border p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            Doğum Tarihi:
            <input
              type="date"
              value={newUser.birthdate}
              onChange={(e) =>
                setNewUser({ ...newUser, birthdate: e.target.value })
              }
              className="border p-2 w-full"
            />
          </label>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleEditUser}
              disabled={!selectedUserId}
              className="mr-2 px-4 py-2 text-white bg-yellow-400 rounded hover:bg-yellow-500 focus:outline-none focus:shadow-outline-blue"
            >
              Kullanıcıyı Düzenle
            </button>
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 text-gray-700 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:shadow-outline-gray"
            >
              Geri
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default EditUser;
