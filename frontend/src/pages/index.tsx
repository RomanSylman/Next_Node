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
  }, []);

  //create new user
  const createUser = async () => {
    try {
      const response = await axios.post(`${apiUrl}/users`, newUser);
      setUsers([...users, response.data]);
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

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="space-y-4 w-full max-w-2xl">
        <h1 className="text-2x1 font-bold text-gray-800 text-center">
          User Managment
        </h1>

        {/* Display all users */}

        {users.map((user) => (
          <div className="space-y-2">
            <div
              key={user.id}
              className="flex items-center justify-between bg-white shadow-lg rounded-lg p-2 mb-2"
            >
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
