// EditUser.tsx

// Importing the useUserContext hook from the UserContext module
import { useUserContext } from "@/context/UserContext";

// Importing React for creating functional components
import React from "react";

// Defining the EditUser functional component
const EditUser: React.FC = () => {
  // Destructuring values from the useUserContext hook
  const {
    newUser,
    setNewUser,
    selectedUserId,
    setIsEditModalOpen,
    handleEditUser,
    isEditModalOpen,
  } = useUserContext();

  // Rendering the component only if isEditModalOpen is true
  return (
    isEditModalOpen && (
      // Modal overlay and content
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gray-800 opacity-75"></div>

        {/* Edit user modal content */}
        <div className="relative z-50 text-black bg-white p-6 rounded-lg shadow-lg">
          <p className="mb-4">Kullanıcı ID: {selectedUserId}</p>

          {/* Input fields for editing user information */}
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

          {/* Buttons for updating and canceling the edit */}
          <div className="flex justify-end mt-4">
            <button
              onClick={handleEditUser}
              disabled={!selectedUserId}
              className="mr-2 px-4 py-2 text-white bg-yellow-400 rounded hover:bg-yellow-500 focus:outline-none focus:shadow-outline-blue"
            >
              Kullanıcıyı Düzenle {/* Edit User */}
            </button>
            <button
              onClick={() => setIsEditModalOpen(false)}
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

// Exporting the EditUser component as the default export
export default EditUser;
