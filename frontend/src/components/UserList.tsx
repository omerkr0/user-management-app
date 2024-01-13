// UserList.tsx
import { useUserContext } from "@/context/UserContext";
import React from "react";

const UserList: React.FC = () => {
  const { users, selectedUserId, handleUserClick, responseMessage, handlePageClick } =
    useUserContext();

  return (
    <div onClick={handlePageClick}>
      <p className="text-green-600">{responseMessage}</p>
      {users.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-black mt-4">Kullanıcılar:</h2>
          <div className="overflow-auto">
            <table className="w-full bg-white border border-gray-300 mt-4">
              <thead>
                <tr className="text-black text-left">
                  <th className="py-2 px-4 border-b">ID</th>
                  <th className="py-2 px-4 border-b">Kullanıcı Adı</th>
                  <th className="py-2 px-4 border-b">Ad Soyad</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Doğum Tarihi</th>
                </tr>
              </thead>
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

export default UserList;
