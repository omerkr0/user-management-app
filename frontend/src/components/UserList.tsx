// UserList.tsx

// Importing the useUserContext hook from the UserContext module
import { useUserContext } from "@/context/UserContext";

// Importing React for creating functional components
import React from "react";

// Defining the UserList functional component
const UserList: React.FC = () => {
  // Destructuring values from the useUserContext hook
  const { users, selectedUserId, handleUserClick, responseMessage, handlePageClick } =
    useUserContext();

  // Rendering the component
  return (
    // Container div with click event handler to handle page click
    <div onClick={handlePageClick}>
      {/* Displaying response message, if any */}
      <p className="text-green-600">{responseMessage}</p>

      {/* Checking if there are users to display */}
      {users.length > 0 && (
        <div>
          {/* Heading for the list of users */}
          <h2 className="text-xl font-bold text-black mt-4">Kullanıcılar:</h2>

          {/* Container with scroll for the user table */}
          <div className="overflow-auto">
            {/* Table to display user information */}
            <table className="w-full bg-white border border-gray-300 mt-4">
              <thead>
                {/* Table header with column names */}
                <tr className="text-black text-left">
                  <th className="py-2 px-4 border-b">ID</th>
                  <th className="py-2 px-4 border-b">Kullanıcı Adı</th>
                  <th className="py-2 px-4 border-b">Ad Soyad</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Doğum Tarihi</th>
                </tr>
              </thead>

              {/* Table body with user data */}
              <tbody className="text-black">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    onClick={() => handleUserClick(user.id)}
                    className={selectedUserId === user.id ? "bg-gray-200" : ""}
                  >
                    <td className="py-2 px-4 border-b">{user.id}</td>
                    <td className="py-2 px-4 border-b">{user.username}</td>
                    <td className="py-2 px-4 border-b">{user.fullname}</td>
                    <td className="py-2 px-4 border-b">{user.email}</td>
                    <td className="py-2 px-4 border-b">{user.birthdate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// Exporting the UserList component as the default export
export default UserList;
