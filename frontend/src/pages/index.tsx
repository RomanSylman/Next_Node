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

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="space-y-4 w-full max-w-2xl">
        <h1 className="text-2x1 font-bold text-gray-800 text-center">
          User Managment
        </h1>


      {/* Display all users */}

        {users.map((user) => (
          <CardComponent
            key={user.id}
            card={user}
            setUpdateUser={setUpdateUser}
            setUsers={setUsers}
          />
        ))}

      </div>
    </main>
  );
}
