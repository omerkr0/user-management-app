// Home.tsx
import { useUserContext } from "@/context/UserContext";
import React from "react";
import UserList from "./UserList";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";

const Home: React.FC = () => {
  const {
    newUser,
    setNewUser,
    users,
    selectedUserId,
    setIsEditModalOpen,
    setIsDeleteModalOpen,
    setIsAddModalOpen,
    handleAddUser,
    handleEditUser,
    handleDeleteUser,
    handleUserClick,
    handlePageClick
  } = useUserContext();

  return (
    <div onClick={handlePageClick} className="container mx-auto px-5 lg:px-10 my-8">
      <h1 className="text-3xl font-bold mb-4">User List</h1>
      <div className="mb-4 flex space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setIsAddModalOpen(true)}
          disabled={selectedUserId !== null}
        >
          Kullanıcı Ekle
        </button>
        <button
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded"
          onClick={() => setIsEditModalOpen(true)}
          disabled={!selectedUserId}
        >
          Kullanıcı Düzenle
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => setIsDeleteModalOpen(true)}
          disabled={!selectedUserId}
        >
          Kullanıcı Sil
        </button>
      </div>
      <div>
        {/* UserList bileşeni */}
        <UserList
          users={users}
          selectedUserId={selectedUserId}
          handleUserClick={handleUserClick}
        />
        {/* AddUser bileşeni */}

        <AddUser
          newUser={newUser}
          setNewUser={setNewUser}
          handleAddUser={handleAddUser}
          setIsAddModalOpen={setIsAddModalOpen}
        />
        {/* EditUser bileşeni */}

        <EditUser
          newUser={newUser}
          setNewUser={setNewUser}
          handleEditUser={handleEditUser}
          setIsEditModalOpen={setIsEditModalOpen}
          selectedUserId={selectedUserId}
        />

        {/* DeleteUser bileşeni */}

        <DeleteUser
          newUser={newUser}
          handleDeleteUser={handleDeleteUser}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          selectedUserId={selectedUserId}
        />
      </div>
    </div>
  );
};

export default Home;
