// DeleteUser.tsx
import { useUserContext } from "@/context/UserContext";
import React from "react";

const DeleteUser: React.FC = () => {
  const { newUser, selectedUserId, setIsDeleteModalOpen, isDeleteModalOpen, handleDeleteUser } =
    useUserContext();

  return (
    isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
          <div className="relative z-50 text-black bg-white p-6 rounded-lg shadow-lg">
            <p className="mb-4">Kullanıcı ID: {newUser.id}</p>
            <p className="mb-4">Kullanıcı Adı: {newUser.username}</p>
            <p className="mb-4">Ad Soyad: {newUser.fullname}</p>
            <p className="mb-4">Email: {newUser.email}</p>
            <p className="mb-4">Doğum Tarihi: {newUser.birthdate}</p>
            <p className="mb-4">
              Bu kullanıcıyı silmek istediğinizden emin misiniz?
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleDeleteUser}
                disabled={!selectedUserId}
                className="mr-2 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline-red"
              >
                Kullanıcıyı Sil
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
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

export default DeleteUser;
