import React, { useState, useEffect } from "react";
import { FaCog } from "react-icons/fa";
import CreateUserPopup from "./CreateUserPopup";
import ReactLoading from "react-loading"; // ✅ ใช้ react-loading
import "./ContentUserManagement.css";

function ContentUserManagement() {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const itemsPerPage = 10;
    const API_BASE_URL = "https://servsiam-backend-a61de3db6766.herokuapp.com/api/auth";

    // ✅ ดึงข้อมูลผู้ใช้จาก Backend
    const fetchUsers = async (page = 1, roleFilter = "", search = "") => {
        setLoading(true);
        try {
            const response = await fetch(
                `${API_BASE_URL}/users?page=${page}&limit=${itemsPerPage}&role=${roleFilter}&search=${search}`
            );
            const data = await response.json();

            console.log("📌 API Response:", data);

            if (data.success && Array.isArray(data.users)) {
                setUsers(data.users);
                setTotalPages(data.totalPages);
            } else {
                console.error("Unexpected response format:", data);
                setUsers([]);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            setUsers([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers(currentPage, roles, searchQuery);
    }, [currentPage, roles, searchQuery]);

    // ✅ เปิด/ปิด Popup
    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

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
                <div className="flex flex-wrap justify-between items-center mb-4">
                    <select className="border p-2 rounded" value={roles} onChange={(e) => setRoles(e.target.value)}>
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

                <div className="overflow-auto">
                    <table className="user-manage min-w-full bg-white border rounded-md">
                        <thead className="bg-green-500/50">
                            <tr>
                                <th className="py-2 px-2 text-left">Actions</th>
                                <th className="py-2 px-2 text-left">Profile</th>
                                <th className="py-2 px-2 text-left">User name</th>
                                <th className="py-2 px-2 text-left">Surname</th>
                                <th className="py-2 px-2 text-left">Job Position</th>
                                <th className="py-2 px-2 text-left">Email address</th>
                                <th className="py-2 px-2 text-left">Active</th> {/* ✅ ลบ Creation Time ออก */}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-4">
                                        <ReactLoading type="spin" color="#4CAF50" height={40} width={40} />
                                    </td>
                                </tr>
                            ) : users.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user.id} className="border-t hover:bg-gray-100">
                                        <td className="py-2 px-2">
                                            <button className="bg-green-700 text-white text-sm px-2 py-1 rounded flex items-center">
                                                <FaCog className="mr-2" /> Settings
                                            </button>
                                        </td>
                                        <td className="py-2 px-2">
                                            <img
                                                src={user.profile_picture || "/default-profile.png"}
                                                alt="Profile"
                                                className="w-10 h-10 rounded-full border"
                                            />
                                        </td>
                                        <td className="py-2 px-2">{user.user_name}</td>
                                        <td className="py-2 px-2">{user.surname || "-"}</td>
                                        <td className="py-2 px-2">{user.job_position || "-"}</td>
                                        <td className="py-2 px-2">{user.email_address}</td>
                                        <td className="py-2 px-2">
                                            {user.active ? "✅ Active" : "❌ Inactive"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center py-4">
                                        ❌ No users found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isPopupOpen && <CreateUserPopup onClose={closePopup} />}
        </>
    );
}

export default ContentUserManagement;