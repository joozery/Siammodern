import React, { useState, useEffect } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { TbMessageCircle } from "react-icons/tb";
import { MdOutlineNotificationsNone } from "react-icons/md";

// Default Avatar Image
import defaultAvatar from "../../../Assets/user (1).jpg";

export default function Navtop() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Get user info from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      console.warn("No user logged in!");
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(
          `https://servsiam-backend-a61de3db6766.herokuapp.com/api/auth/users/${storedUser.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ Send token for authentication
            },
          }
        );

        const data = await response.json();

        if (data.success) {
          setUser(data.user);
        } else {
          console.error("Failed to fetch user data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <div className="flex justify-between items-center">
        {/* ✅ Welcome Text */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            ยินดีต้อนรับสู่ระบบ ERP
          </h1>
          <p className="text-sm text-gray-500">พร้อมจะเริ่มงานกันหรือยังครับ</p>
        </div>

        {/* ✅ Search Bar */}
        <div className="flex items-center border rounded-full py-2 px-4 bg-gray-100 w-1/3 max-w-sm">
          <input
            type="text"
            placeholder="Search Dashboard"
            className="w-full px-2 py-1 bg-transparent text-sm outline-none"
          />
          <BiSearchAlt className="text-lg text-gray-600" />
        </div>

        {/* ✅ Admin Section */}
        <div className="flex items-center gap-6">
          <TbMessageCircle className="text-2xl text-gray-600 cursor-pointer hover:text-blue-600 transition duration-200" />
          <MdOutlineNotificationsNone className="text-2xl text-gray-600 cursor-pointer hover:text-blue-600 transition duration-200" />

          {/* ✅ Profile Image */}
          <div className="relative">
            {loading ? (
              <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
            ) : (
              <img
                src={user?.profile_picture || defaultAvatar}
                alt="User Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
              />
            )}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>{" "}
            {/* Online status */}
          </div>
        </div>
      </div>
    </div>
  );
}