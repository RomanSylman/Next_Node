import React, { useState, useEffect } from "react";
import axios from "axios";
import CardComponent from "@/components/CardComponent";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
  });
  const [updateUser, setUpdateUser] = useState({
    id: 0,
    name: "",
    email: "",
  });

  //fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users`);
        setUsers(response.data.reverse());
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [apiUrl]);

  //create new user
  const createUser = async () => {
    try {
      const response = await axios.post(`${apiUrl}/users`, newUser);
      setUsers([...users, response.data]);
      setNewUser({ name: "", email: "" });
    } catch (error) {
      console.log(error);
    }
  };

  //delete user
  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`${apiUrl}/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(`${apiUrl}/users/${updateUser.id}`, {
        name: updateUser.name,
        email: updateUser.email,
      });
      setUpdateUser({ id: 0, name: "", email: "" });
      setUsers(
        users.map((user) => {
          if (user.id === updateUser.id) {
            return { ...user, name: updateUser.name, email: updateUser.email };
          } else {
            return user;
          }
        })
      );
    } catch (error) {
      console.log("Error updating user", error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="space-y-4 w-full max-w-2xl">
        <h1 className="text-2x1 font-bold text-gray-800 text-center">
          User Managment
        </h1>

        {/* Create user form */}

        <div className="space-y-2 w-full flex flex-col bg-blue-100 rounded-lg p-4 gap-3">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="rounded-lg shadow-lg p-2 bg-white hover:bg-gray-300 transition-all duration-300 text-black"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="rounded-lg shadow-lg p-2 bg-white hover:bg-gray-300 transition-all duration-300 text-black"
          />

          <button
            onClick={createUser}
            className="shadow-lg rouded-lg p-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-300"
          >
            Add User
          </button>
        </div>

        {/* Update user form */}

        <form
          onSubmit={handleUpdateUser}
          className="space-y-2 w-full flex flex-col gap-3 p-4 bg-green-100 rounded shadow-lg"
        >
          <input
            placeholder="User ID"
            value={updateUser.id || ""}
            onChange={(e) =>
              setUpdateUser({ ...updateUser, id: Number(e.target.value) })
            }
            className="rounded-lg shadow-lg p-2 bg-white hover:bg-gray-300 transition-all duration-300 text-black"
          />

          <input
            placeholder="New Name"
            value={updateUser.name}
            onChange={(e) =>
              setUpdateUser({ ...updateUser, name: e.target.value })
            }
            className="rounded-lg shadow-lg p-2 bg-white hover:bg-gray-300 transition-all duration-300 text-black"
          />

          <input
            placeholder="New Email"
            value={updateUser.email}
            onChange={(e) =>
              setUpdateUser({ ...updateUser, email: e.target.value })
            }
            className="rounded-lg shadow-lg p-2 bg-white hover:bg-gray-300 transition-all duration-300 text-black"
          />

          <button className="shadow-lg rouded-lg p-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-all duration-300">
            Update
          </button>
        </form>

        {/* Display all users */}

        {users.map((user) => (
          <div className="space-y-2" key={user.id}>
            <div className="flex items-center justify-between bg-white shadow-lg rounded-lg p-2 mb-2">
              <CardComponent card={user} />
              <button
                onClick={() => deleteUser(user.id)}
                className="shadow-lg rouded-lg p-2 m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-all duration-300"
              >
                Delete User
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
