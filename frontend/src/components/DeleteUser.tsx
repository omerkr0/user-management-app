// DeleteUser.tsx

// Importing the useUserContext hook from the UserContext module
import { useUserContext } from "@/context/UserContext";

// Importing React for creating functional components
import React from "react";

// Defining the DeleteUser functional component
const DeleteUser: React.FC = () => {
  // Destructuring values from the useUserContext hook
  const { newUser, selectedUserId, setIsDeleteModalOpen, isDeleteModalOpen, handleDeleteUser } =
    useUserContext();

  // Rendering the component only if isDeleteModalOpen is true
  return (
    isDeleteModalOpen && (
      // Modal overlay and content
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gray-800 opacity-75"></div>

        {/* Delete user modal content */}
        <div className="relative z-50 text-black bg-white p-6 rounded-lg shadow-lg">
          {/* Displaying user information to confirm deletion */}
          <p className="mb-4">Kullanıcı ID: {newUser.id}</p>
          <p className="mb-4">Kullanıcı Adı: {newUser.username}</p>
          <p className="mb-4">Ad Soyad: {newUser.fullname}</p>
          <p className="mb-4">Email: {newUser.email}</p>
          <p className="mb-4">Doğum Tarihi: {newUser.birthdate}</p>
          <p className="mb-4">
            Bu kullanıcıyı silmek istediğinizden emin misiniz? {/* Are you sure you want to delete this user? */}
          </p>

          {/* Buttons for confirming deletion and canceling */}
          <div className="flex justify-end mt-4">
            <button
              onClick={handleDeleteUser}
              disabled={!selectedUserId}
              className="mr-2 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline-red"
            >
              Kullanıcıyı Sil {/* Delete User */}
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 text-gray-700 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:shadow-outline-gray"
            >
              Geri {/* Back */}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

// Exporting the DeleteUser component as the default export
export default DeleteUser;
