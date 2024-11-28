import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

function ContentUserManagement() {
    // ข้อมูลสมมุติ
    const users = [
        { id: 1, username: "Admin", name: "John", surname: "Doe", jobPosition: "HR", email: "admin1@gmail.com", creationTime: "12/02/2020", isActive: true },
        { id: 2, username: "Admin", name: "Jane", surname: "Smith", jobPosition: "HR", email: "admin2@gmail.com", creationTime: "14/02/2020", isActive: false },
        { id: 3, username: "User", name: "Alice", surname: "Johnson", jobPosition: "Developer", email: "alice@gmail.com", creationTime: "15/03/2021", isActive: true },
        { id: 4, username: "User", name: "Bob", surname: "Brown", jobPosition: "Designer", email: "bob@gmail.com", creationTime: "01/06/2021", isActive: false },
        // เพิ่มข้อมูลตัวอย่างสำหรับทดสอบ
        ...Array.from({ length: 50 }, (_, index) => ({
            id: index + 5,
            username: `User${index + 5}`,
            name: `UserName${index + 5}`,
            surname: `Surname${index + 5}`,
            jobPosition: index % 2 === 0 ? "Developer" : "Designer",
            email: `user${index + 5}@gmail.com`,
            creationTime: `01/01/202${index % 9}`,
            isActive: index % 2 === 0,
        })),
    ];

    // State สำหรับจัดการ Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // จำนวนรายการต่อหน้า

    // คำนวณรายการที่จะแสดงในแต่ละหน้า
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = users.slice(startIndex, endIndex);

    // คำนวณจำนวนหน้าทั้งหมด
    const totalPages = Math.ceil(users.length / itemsPerPage);

    return (
        <>
            <div className="flex justify-between border-b border-black pb-4 mb-6 mt-6">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-800">
                    การจัดการผู้ใช้ <span className="text-lg">(Manage users)</span>
                </h1>
                <button className="text-sm sm:text-lg bg-green-700 text-white py-2 px-4 sm:py-2 sm:px-4 rounded-lg shadow hover:bg-green-800">
                    <span className="mr-1">+</span>Create new user
                </button>
            </div>

            {/* Container */}
            <div className="bg-white shadow-md rounded-lg p-4">
                {/* Title */}
                <h1 className="text-lg sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                    ผู้ใช้ <span className="text-gray-400 text-base sm:text-lg">(Users)</span>
                </h1>

                {/* Filters */}
                <div className="flex items-center gap-4 mb-4">
                    <div>
                        <label className="block text-gray-600 text-sm mb-1" htmlFor="roles">Roles</label>
                        <select id="roles" className="border rounded-md shadow-sm text-black-600 p-2 w-100">
                            <option value="all">All Roles</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-600 text-sm mb-1" htmlFor="search">Search</label>
                        <div className="border rounded-md shadow-sm text-black-600 p-0 w-100 flex" styles="height: 1px;">
                            <input id="search" type="text" placeholder="Search" className="p-2 w-full rounded-r-md focus:outline-none" />
                            <button className="bg-green-700 text-white p-3 rounded-r-md">
                                <FaSearch />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="user-manage min-w-full bg-white border rounded-md">
                        <thead className="bg-green-500/50">
                            <tr>
                                <th className="py-2 px-2 text-left">Actions</th>
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
                            {currentUsers.map((user) => (
                                <tr key={user.id} className="border-t hover:bg-gray-100">
                                    <td className="py-2 px-2">
                                        <button className="bg-green-700 text-white text-sm px-2 py-1 rounded">Actions</button>
                                    </td>
                                    <td className="py-2 px-2">{user.username}</td>
                                    <td className="py-2 px-2">{user.name}</td>
                                    <td className="py-2 px-2">{user.surname}</td>
                                    <td className="py-2 px-2">{user.jobPosition}</td>
                                    <td className="py-2 px-2">{user.email}</td>
                                    <td className="py-2 px-2">{user.creationTime}</td>
                                    <td className="py-2 px-2 text-center">
                                        <div className={`w-4 h-4 ${user.isActive ? "bg-green-500" : "bg-gray-500"}`}></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                    <span className="text-gray-500 text-sm">
                        Showing {startIndex + 1} to {Math.min(endIndex, users.length)} of {users.length} entries
                    </span>
                    <div className="flex items-center space-x-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            className={`px-3 py-1 rounded ${currentPage === 1 ? "bg-gray-300 text-gray-500" : "bg-gray-200 text-gray-700"}`}
                        >
                            Previous
                        </button>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            className={`px-3 py-1 rounded ${currentPage === totalPages ? "bg-gray-300 text-gray-500" : "bg-green-700 text-white"}`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContentUserManagement;
