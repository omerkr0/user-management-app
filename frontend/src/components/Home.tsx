// Home.tsx

// Importing the useUserContext hook from the UserContext module
import { useUserContext } from "@/context/UserContext";

// Importing React for creating functional components
import React from "react";

// Importing the UserList, AddUser, EditUser, and DeleteUser components
import UserList from "./UserList";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";

// Defining the Home functional component
const Home: React.FC = () => {
  // Destructuring values from the useUserContext hook
  const {
    selectedUserId,
    setIsEditModalOpen,
    setIsDeleteModalOpen,
    setIsAddModalOpen,
    handlePageClick,
    handleKeyPress,
  } = useUserContext();

  // Rendering the component
  return (
    // Container div with click event handler to handle page click
    <div
      onClick={handlePageClick}
      onKeyDown={handleKeyPress}
      tabIndex={0}
      className="container mx-auto px-5 lg:px-10 my-8"
    >
      {/* Heading for the user list */}
      <h1 className="text-3xl font-bold mb-4">User List</h1>

      {/* Button section for adding, editing, and deleting users */}
      <div className="mb-4 flex space-x-4">
        {/* Add User button with click event handler */}
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setIsAddModalOpen(true)}
          disabled={selectedUserId !== null}
        >
          Kullanıcı Ekle {/* Add User */}
        </button>

        {/* Edit User button with click event handler */}
        <button
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded"
          onClick={() => setIsEditModalOpen(true)}
          disabled={!selectedUserId}
        >
          Kullanıcı Düzenle {/* Edit User */}
        </button>

        {/* Delete User button with click event handler */}
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => setIsDeleteModalOpen(true)}
          disabled={!selectedUserId}
        >
          Kullanıcı Sil {/* Delete User */}
        </button>
      </div>

      {/* Section to render UserList, AddUser, EditUser, and DeleteUser components */}
      <div>
        <UserList />
        <AddUser />
        <EditUser />
        <DeleteUser />
      </div>
    </div>
  );
};

// Exporting the Home component as the default export
export default Home;
