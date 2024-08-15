import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import User from '../components/User'; // Importing User component
import Admin from '../components/Admin'; // Importing Admin component
import axios from 'axios';

const Admind = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '' });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/users'); // Adjust the URL as needed
                console.log(response.data); // Log the response data for debugging
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/users', newUser); // Adjust the URL as needed
            setUsers([...users, response.data]); // Add the new user to the state
            setShowModal(false); // Close the modal
            setNewUser({ name: '', email: '' }); // Reset form fields
        } catch (error) {
            console.error('Error adding user', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`/api/users/${userId}`); // Adjust the URL as needed
            setUsers(users.filter((user) => user.id !== userId)); // Remove the user from the state
        } catch (error) {
            console.error('Error deleting user', error);
        }
    };

    return (
        <div className="p-6">
            {/* Sidebar Toggle Button */}
            <button
                data-drawer-target="separator-sidebar"
                data-drawer-toggle="separator-sidebar"
                aria-controls="separator-sidebar"
                type="button"
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            {/* Sidebar */}
            <aside id="separator-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    {/* Sidebar Links */}
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link to="/admin" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                Admin
                            </Link>
                        </li>
                        {/* Add more sidebar links as needed */}
                    </ul>
                    {/* Logout Button */}
                    <div className="absolute bottom-4 left-3 right-3">
                        <ul className="space-y-2 font-medium">
                            <li>
                                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M3.5 2.5A1.5 1.5 0 0 1 5 1h10a1.5 1.5 0 0 1 1.5 1.5v15A1.5 1.5 0 0 1 15 18H5a1.5 1.5 0 0 1-1.5-1.5V2.5ZM5 0a2.5 2.5 0 0 0-2.5 2.5V18A2.5 2.5 0 0 0 5 20h10a2.5 2.5 0 0 0 2.5-2.5V2.5A2.5 2.5 0 0 0 15 0H5Zm6 1v3H9V1h2Zm-2 0h2v2H9V1Z" />
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </aside>

            {/* User List Section */}
            <div className="mt-4">
                <h2 className="text-xl font-bold">User List</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="mt-4 bg-blue-500 text-white p-2 rounded"
                >
                    Add User
                </button>
                {loading ? (
                    <p>Loading users...</p>
                ) : (
                    <ul className="mt-2">
                        {Array.isArray(users) && users.length > 0 ? (
                            users.map((user) => (
                                <li key={user.id} className="flex justify-between items-center p-2 border-b">
                                    <User name={user.name} email={user.email} />
                                    <button
                                        onClick={() => handleDeleteUser(user.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))
                        ) : (
                            <p>No users found.</p>
                        )}
                    </ul>
                )}
            </div>

            {/* Modal for Adding User */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded shadow-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Add New User</h2>
                        <form onSubmit={handleAddUser}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={newUser.name}
                                    onChange={handleInputChange}
                                    className="border rounded w-full p-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={newUser.email}
                                    onChange={handleInputChange}
                                    className="border rounded w-full p-2"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white p-2 rounded"
                            >
                                Add User
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="ml-2 bg-gray-300 text-gray-700 p-2 rounded"
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admind;
