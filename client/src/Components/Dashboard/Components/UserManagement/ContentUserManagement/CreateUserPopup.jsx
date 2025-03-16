import React, { useState } from "react";
import NotificationPopup from "./NotificationPopup"; // Import Popup แจ้งเตือน

const CreateUserPopup = ({ onClose }) => {
    const [formData, setFormData] = useState({
        user_name: "",
        password: "",
        name: "",
        surname: "",
        phone: "",
        email_address: "",
        job_position: "",
        role: "User",
        access_permissions: JSON.stringify(["เพิ่มสินค้า", "ลายเซ็น คลังสินค้า/ตรวจเช็ค"]), // ส่งเป็น JSON string
        address_number: "",
        address_lane: "",
        address_road: "",
        address_subdistrict: "",
        address_area: "",
        address_province: "",
        address_postcode: "",
        profile_picture: null,
    });

    const [notification, setNotification] = useState({ show: false, success: false, message: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, profile_picture: file });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
        });

        try {
            const response = await fetch("https://servsiam-backend-a61de3db6766.herokuapp.com/api/auth/register", {
                method: "POST",
                body: formDataToSend, // ใช้ FormData
            });

            const data = await response.json();

            if (response.ok) {
                setNotification({ show: true, success: true, message: "User registered successfully!" });
                setTimeout(() => setNotification({ show: false }), 3000);
                setFormData({
                    user_name: "",
                    password: "",
                    name: "",
                    surname: "",
                    phone: "",
                    email_address: "",
                    job_position: "",
                    role: "User",
                    access_permissions: JSON.stringify(["เพิ่มสินค้า", "ลายเซ็น คลังสินค้า/ตรวจเช็ค"]),
                    address_number: "",
                    address_lane: "",
                    address_road: "",
                    address_subdistrict: "",
                    address_area: "",
                    address_province: "",
                    address_postcode: "",
                    profile_picture: null,
                });
            } else {
                setNotification({ show: true, success: false, message: data.message || "Failed to register user." });
            }
        } catch (error) {
            setNotification({ show: true, success: false, message: "Error during registration. Please try again." });
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Create User Profile</h2>

                {/* Profile Picture */}
                <div className="flex items-center gap-4 mb-4">
                    <label htmlFor="profile-upload" className="cursor-pointer">
                        <img
                            src={
                                formData.profile_picture
                                    ? URL.createObjectURL(formData.profile_picture)
                                    : "https://via.placeholder.com/70"
                            }
                            alt="Profile"
                            className="w-16 h-16 rounded-full border border-gray-300"
                        />
                    </label>
                    <input
                        type="file"
                        id="profile-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>

                {/* Form Fields */}
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: "Username", name: "user_name", type: "text" },
                            { label: "Password", name: "password", type: "password" },
                            { label: "Surname", name: "surname", type: "text" },
                            { label: "Phone", name: "phone", type: "text" },
                            { label: "Email", name: "email_address", type: "email" },
                            { label: "Job Position", name: "job_position", type: "text" },
                        ].map(({ label, name, type }) => (
                            <div key={name}>
                                <label className="block text-sm font-medium text-gray-700">{label}</label>
                                <input
                                    type={type}
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        ))}
                    </div>

                    {/* Role Selection */}
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>

                    {/* Address Section */}
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold text-gray-800">Address</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: "Number", name: "address_number" },
                                { label: "Lane", name: "address_lane" },
                                { label: "Road", name: "address_road" },
                                { label: "Sub-district", name: "address_subdistrict" },
                                { label: "Province", name: "address_province" },
                                { label: "Postal Code", name: "address_postcode" },
                            ].map(({ label, name }) => (
                                <div key={name}>
                                    <label className="block text-sm font-medium text-gray-700">{label}</label>
                                    <input
                                        type="text"
                                        name={name}
                                        value={formData[name]}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>

            {notification.show && (
                <NotificationPopup
                    success={notification.success}
                    message={notification.message}
                    onClose={() => setNotification({ show: false })}
                />
            )}
        </div>
    );
};

export default CreateUserPopup;