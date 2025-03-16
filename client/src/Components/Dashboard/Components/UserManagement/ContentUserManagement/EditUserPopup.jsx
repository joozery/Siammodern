import React, { useState, useEffect } from "react";

const EditUserPopup = ({ userId, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        user_name: "",
        surname: "",
        job_position: "",
        email_address: "",
        role: "User",
    });

    const API_BASE_URL = "https://servsiam-backend-a61de3db6766.herokuapp.com/api/auth";

    // ✅ โหลดข้อมูลผู้ใช้จาก API
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/users/${userId}`);
                const data = await response.json();

                if (data.success) {
                    setFormData({
                        user_name: data.user.user_name || "",
                        surname: data.user.surname || "",
                        job_position: data.user.job_position || "",
                        email_address: data.user.email_address || "",
                        role: data.user.role || "User",
                    });
                }
            } catch (error) {
                console.error("❌ Error fetching user data:", error);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    // ✅ อัปเดตค่าฟอร์มเมื่อมีการแก้ไข
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // ✅ บันทึกข้อมูลที่แก้ไข
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                onSave();
                onClose();
            } else {
                console.error("❌ Failed to update user");
            }
        } catch (error) {
            console.error("❌ Error updating user:", error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Edit User</h2>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                        {[
                            { label: "Username", name: "user_name", type: "text" },
                            { label: "Surname", name: "surname", type: "text" },
                            { label: "Job Position", name: "job_position", type: "text" },
                            { label: "Email Address", name: "email_address", type: "email" },
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

                        {/* Role Selection */}
                        <div>
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
                    </div>

                    <div className="mt-6 flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUserPopup;