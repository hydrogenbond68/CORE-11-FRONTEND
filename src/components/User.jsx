import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";

const User = () => {
  const [expanded, setExpanded] = useState(null);

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Driver",
      activity: ["Booked a bus ticket", "Updated profile", "Viewed routes"],
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Passenger",
      activity: ["Signed up", "Booked a bus ticket", "Posted a review"],
    },
  ];

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">Manage Users</h2>
        <input
          type="text"
          placeholder="Search users..."
          className="p-2 rounded-lg shadow-md border border-gray-300"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white p-6 rounded-lg shadow-lg relative hover:shadow-xl transition-shadow duration-300"
          >
            <div className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer">
              <FaEllipsisV />
            </div>
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 text-white w-16 h-16 flex items-center justify-center rounded-full mr-4 text-2xl font-semibold">
                {user.name[0]}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
                <span
                  className={`text-sm font-semibold inline-block py-1 px-2 rounded-full ${
                    user.role === "Driver"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {user.role}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <h4
                className="text-md font-bold text-blue-500 cursor-pointer"
                onClick={() => toggleExpand(user.id)}
              >
                Recent Activity{" "}
                <span className="text-gray-500 text-sm">
                  {expanded === user.id ? "▲" : "▼"}
                </span>
              </h4>
              {expanded === user.id && (
                <ul className="list-disc ml-5 mt-2 text-gray-700 max-h-24 overflow-y-auto custom-scrollbar">
                  {user.activity.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;