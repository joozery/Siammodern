import React, { useState, useEffect } from "react";
import { FaCog } from "react-icons/fa"; // Import icon ฟันเฟือง
import CreateUserPopup from "./CreateUserPopup";
import './ContentUserManagement.css';

function ContentUserManagement() {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState(""); // ตัวกรอง Roles
    const [searchQuery, setSearchQuery] = useState(""); // ตัวกรอง Search
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const itemsPerPage = 10;

    // Fetch users from the backend
    const fetchUsers = async (page = 1, roleFilter = "", search = "") => {
        try {
            const response = await fetch(
                `http://localhost:3002/users?page=${page}&limit=${itemsPerPage}&role=${roleFilter}&search=${search}`
            );
            const data = await response.json();
            if (data.data && Array.isArray(data.data)) {
                setUsers(data.data);
                setTotalPages(data.totalPages);
            } else {
                console.error("Unexpected response format:", data);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers(currentPage, roles, searchQuery);
    }, [currentPage, roles, searchQuery]);

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    const handleSaveUser = async (userData) => {
        try {
            const response = await fetch("http://localhost:3002/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });
            if (response.ok) {
                console.log("User saved successfully");
                fetchUsers(currentPage, roles, searchQuery);
            } else {
                console.error("Failed to save user");
            }
        } catch (error) {
            console.error("Error saving user:", error);
        }
        closePopup();
    };

    const changePage = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <>
            <div className="flex justify-between border-b border-black pb-4 mb-6 mt-6">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-800">
                    การจัดการผู้ใช้ <span className="text-lg">(Manage users)</span>
                </h1>
                <button
                    onClick={openPopup}
                    className="text-sm sm:text-lg bg-green-700 text-white py-2 px-4 sm:py-2 sm:px-4 rounded-lg shadow hover:bg-green-800"
                >
                    <span className="mr-1">+</span>Create new user
                </button>
            </div>

            <div className="bg-white shadow-md rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                    <select
                        className="border p-2 rounded"
                        value={roles}
                        onChange={(e) => setRoles(e.target.value)}
                    >
                        <option value="">All Roles</option>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                    </select>
                    <input
                        type="text"
                        className="border p-2 rounded"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <table className="user-manage min-w-full bg-white border rounded-md">
                    <thead className="bg-green-500/50">
                        <tr>
                            <th className="py-2 px-2 text-left">Actions</th>
                            <th className="py-2 px-2 text-left">Profile</th>
                            <th className="py-2 px-2 text-left">User name</th>
                            <th className="py-2 px-2 text-left">Name</th>
                            <th className="py-2 px-2 text-left">Surname</th>
                            <th className="py-2 px-2 text-left">Job Position</th>
                            <th className="py-2 px-2 text-left">Email address</th>
                            <th className="py-2 px-2 text-left">Creation time</th>
                            <th className="py-2 px-2 text-left">Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id} className="border-t hover:bg-gray-100">
                                    <td className="py-2 px-2">
                                        <button className="bg-green-700 text-white text-sm px-2 py-1 rounded flex items-center">
                                            <FaCog className="mr-2" /> Settings
                                        </button>
                                    </td>
                                    <td className="py-2 px-2">
                                        <img
                                            src={user.profile_image || "/default-profile.png"}
                                            alt="Profile"
                                            className="w-10 h-10 rounded-full border"
                                        />
                                    </td>
                                    <td className="py-2 px-2">{user.user_name}</td>
                                    <td className="py-2 px-2">{user.name}</td>
                                    <td className="py-2 px-2">{user.surname}</td>
                                    <td className="py-2 px-2">{user.job_position}</td>
                                    <td className="py-2 px-2">{user.email_address}</td>
                                    <td className="py-2 px-2">{user.created_at}</td>
                                    <td className="py-2 px-2">
                                        {user.active ? (
                                            <span className="text-green-700 font-bold">กำลังใช้งาน</span>
                                        ) : (
                                            <span className="text-gray-500 font-bold">ไม่ใช้งาน</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center py-4">
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="flex justify-between mt-4">
                    <button
                        onClick={() => changePage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-600 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => changePage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-600 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>

            {isPopupOpen && (
                <CreateUserPopup onClose={closePopup} onSave={handleSaveUser} />
            )}
        </>
    );
}

export default ContentUserManagement;
