// UserProvider.ts

// Importing necessary React modules
import React, { createContext, useContext, useState, useEffect } from "react";

// Importing UserService functions for CRUD operations
import {
  listUsers,
  addUser,
  editUser,
  deleteUser,
} from "../services/UserService";

// Defining the User interface for user object
interface User {
  id: number;
  username: string;
  fullname: string;
  email: string;
  birthdate: string;
}

// Defining the UserContextProps interface for context values
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

// Creating a context for user-related data
const UserContext = createContext<UserContextProps | undefined>(undefined);

// Creating a custom hook to use the context
export const useUserContext = (): UserContextProps => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return context;
};

// Defining the UserProviderProps interface for provider props
interface UserProviderProps {
  children: React.ReactNode;
}

// Creating the UserProvider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  // State for the new user information
  const [newUser, setNewUser] = useState<User>({
    id: 0,
    username: "",
    fullname: "",
    email: "",
    birthdate: "",
  });

  // State for response messages from CRUD operations
  const [responseMessage, setResponseMessage] = useState<string>("");
  
  // State for the list of users
  const [users, setUsers] = useState<User[]>([]);

  // State for the selected user's ID
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  // States for modal visibility
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // Function to fetch users from the server
  const fetchUsers = async () => {
    try {
      const data = await listUsers();
      setUsers(data);
      setSelectedUserId(null);
    } catch (error) {
      setResponseMessage("Kullanıcılar getirilirken hata oluştu.");
    }
  };

  // Function to handle adding a new user
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

  // Function to handle editing an existing user
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

  // Function to handle deleting an existing user
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

  // Function to handle user click event
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

  // Function to handle page click event
  const handlePageClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // Cancel selection when clicking on an empty area
    if (event.target === event.currentTarget && selectedUserId !== null) {
      setSelectedUserId(null);
    }
  };

  // Fetching users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Context values
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

  // Providing the context value to the children components
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
