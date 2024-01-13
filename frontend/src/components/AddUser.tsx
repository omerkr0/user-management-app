// AddUser.tsx

// Importing the useUserContext hook from the UserContext module
import { useUserContext } from "@/context/UserContext";

// Importing React for creating functional components
import React from "react";

// Defining the AddUser functional component
const AddUser: React.FC = () => {
  // Destructuring values from the useUserContext hook
  const {
    newUser,
    setNewUser,
    setIsAddModalOpen,
    isAddModalOpen,
    handleAddUser,
  } = useUserContext();

  // Rendering the component only if isAddModalOpen is true
  return (
    isAddModalOpen && (
      // Modal overlay and content
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gray-800 opacity-75"></div>

        {/* Add user modal content */}
        <div className="relative z-50 text-black bg-white p-6 rounded-lg shadow-lg">
          {/* Input fields for adding a new user */}
          <label className="block mb-2">
            Kullanıcı Adı:
            <input
              type="text"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
              className="border p-2 w-full"
              required
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

          {/* Buttons for adding the user and canceling */}
          <div className="flex justify-end mt-4">
            <button
              className="mr-2 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
              onClick={handleAddUser}
            >
              Kullanıcı Ekle {/* Add User */}
            </button>
            <button
              className="px-4 py-2 text-gray-700 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:shadow-outline-gray"
              onClick={() => setIsAddModalOpen(false)}
            >
              Geri {/* Back */}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

// Exporting the AddUser component as the default export
export default AddUser;
