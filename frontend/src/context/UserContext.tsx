// UserProvider.ts

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  listUsers,
  addUser,
  editUser,
  deleteUser,
} from "../services/UserService";

interface User {
  id: number;
  username: string;
  fullname: string;
  email: string;
  birthdate: string;
}

interface UserContextProps {
  newUser: User;
  setNewUser: React.Dispatch<React.SetStateAction<User>>;
  responseMessage: string;
  setResponseMessage: React.Dispatch<React.SetStateAction<string>>;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  selectedUserId: number | null;
  setSelectedUserId: React.Dispatch<React.SetStateAction<number | null>>;
  isEditModalOpen: boolean;
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAddModalOpen: boolean;
  setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fetchUsers: () => Promise<void>;
  handleAddUser: () => Promise<void>;
  handleEditUser: () => Promise<void>;
  handleDeleteUser: () => Promise<void>;
  handleUserClick: (userId: number) => void;
  handlePageClick: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUserContext = (): UserContextProps => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return context;
};

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [newUser, setNewUser] = useState<User>({
    id: 0,
    username: "",
    fullname: "",
    email: "",
    birthdate: "",
  });

  const [responseMessage, setResponseMessage] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  const fetchUsers = async () => {
    try {
      const data = await listUsers();
      setUsers(data);
      setSelectedUserId(null);
    } catch (error) {
      setResponseMessage("Kullanıcılar getirilirken hata oluştu.");
    }
  };

  const handleAddUser = async () => {
    try {
      const data = await addUser(newUser);
      setResponseMessage(data.message);

      if (data.userID) {
        fetchUsers();
        setIsAddModalOpen(false);
        setNewUser({
          id: 0,
          username: "",
          fullname: "",
          email: "",
          birthdate: "",
        });
      }
    } catch (error) {
      setResponseMessage("Kullanıcı eklenirken hata oluştu.");
    }
  };

  const handleEditUser = async () => {
    if (!selectedUserId) {
      console.error("Düzenlenecek kullanıcı seçilmedi.");
      return;
    }

    try {
      await editUser(selectedUserId, newUser);
      fetchUsers();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Kullanıcı güncellenirken hata oluştu:", error);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUserId) {
      console.error("Silinecek kullanıcı seçilmedi.");
      return;
    }

    try {
      await deleteUser(selectedUserId);
      fetchUsers();
    } catch (error) {
      console.error("Kullanıcıyı silerken hata oluştu:", error);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };
  // Kullanıcıya tıklama olayını ele alan fonksiyon
  const handleUserClick = (userId: number) => {
    setSelectedUserId(userId);
    const selectedUser = users.find((user) => user.id === userId);
    setNewUser({
      id: selectedUser?.id || 0,
      username: selectedUser?.username || "",
      fullname: selectedUser?.fullname || "",
      email: selectedUser?.email || "",
      birthdate: selectedUser?.birthdate || "",
    });
  };

  const handlePageClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // Boş bir alana tıklanınca seçimi iptal et
    if (event.target === event.currentTarget && selectedUserId !== null) {
      setSelectedUserId(null);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const contextValue: UserContextProps = {
    newUser,
    setNewUser,
    responseMessage,
    setResponseMessage,
    users,
    setUsers,
    selectedUserId,
    setSelectedUserId,
    isEditModalOpen,
    setIsEditModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    isAddModalOpen,
    setIsAddModalOpen,
    fetchUsers,
    handleAddUser,
    handleEditUser,
    handleDeleteUser,
    handleUserClick,
    handlePageClick,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
