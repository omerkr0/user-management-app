// UserService.ts

// Defining the User interface for user object
interface User {
    id: number;
    username: string;
    fullname: string;
    email: string;
    birthdate: string;
  }
  
  // Base URL for the API
  const BASE_URL = "http://localhost:8000";
  
  // Function to fetch the list of users from the server
  export const listUsers = async (): Promise<User[]> => {
    try {
      const response = await fetch(`${BASE_URL}/listusers`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Kullanıcılar getirilirken hata oluştu:", error);
      throw error;
    }
  };
  
  // Function to add a new user to the server
  export const addUser = async (newUser: User) => {
    try {
      const response = await fetch(`${BASE_URL}/adduser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
        mode: "cors",
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Kullanıcı eklenirken hata oluştu:", error);
      throw error;
    }
  };
  
  // Function to edit an existing user on the server
  export const editUser = async (userId: number, updatedUser: User) => {
    try {
      const response = await fetch(`${BASE_URL}/edituser/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
        mode: "cors",
      });
  
      if (!response.ok) {
        console.error("Kullanıcı güncelleme başarısız");
      }
    } catch (error) {
      console.error("Kullanıcı güncellenirken hata oluştu:", error);
      throw error;
    }
  };
  
  // Function to delete an existing user from the server
  export const deleteUser = async (userId: number) => {
    try {
      const response = await fetch(`${BASE_URL}/deleteuser/${userId}`, {
        method: "DELETE",
        mode: "cors",
      });
  
      if (!response.ok) {
        console.error("Kullanıcıyı silme başarısız oldu");
      }
    } catch (error) {
      console.error("Kullanıcıyı silerken hata oluştu:", error);
      throw error;
    }
  };
  