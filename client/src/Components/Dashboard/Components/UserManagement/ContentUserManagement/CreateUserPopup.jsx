import React, { useState } from "react";
import "./CreateUserPopup.css";
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
        access_permissions: ["เพิ่มสินค้า", "ลายเซ็น คลังสินค้า/ตรวจเช็ค"],
        address_number: "",
        address_lane: "",
        address_road: "",
        address_subdistrict: "",
        address_area: "",
        address_province: "",
        address_postcode: "",
        profile_picture: "",
    });

    const [notification, setNotification] = useState({ show: false, success: false, message: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setFormData({ ...formData, profile_picture: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddPermission = () => {
        setFormData({
            ...formData,
            access_permissions: [...formData.access_permissions, ""],
        });
    };

    const handlePermissionChange = (index, value) => {
        const updatedPermissions = [...formData.access_permissions];
        updatedPermissions[index] = value;
        setFormData({ ...formData, access_permissions: updatedPermissions });
    };

    const handleRemovePermission = (index) => {
        const updatedPermissions = formData.access_permissions.filter(
            (_, i) => i !== index
        );
        setFormData({ ...formData, access_permissions: updatedPermissions });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3002/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
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
                    access_permissions: ["เพิ่มสินค้า", "ลายเซ็น คลังสินค้า/ตรวจเช็ค"],
                    address_number: "",
                    address_lane: "",
                    address_road: "",
                    address_subdistrict: "",
                    address_area: "",
                    address_province: "",
                    address_postcode: "",
                    profile_picture: "",
                });
            } else {
                setNotification({ show: true, success: false, message: data.message || "Failed to register user." });
            }
        } catch (error) {
            setNotification({ show: true, success: false, message: "Error during registration. Please try again." });
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2 className="popup-title">Creat User Proflie</h2>
                <form onSubmit={handleSubmit}>
                    <div className="profile-header">
                        <div className="profile-picture">
                            <label htmlFor="profile-upload">
                                <img
                                    src={
                                        formData.profile_picture ||
                                        "https://via.placeholder.com/70"
                                    }
                                    alt="Profile"
                                />
                                <span className="edit-icon">✏️</span>
                            </label>
                            <input
                                type="file"
                                id="profile-upload"
                                style={{ display: "none" }}
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="profile-info">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="profile-name-input"
                                placeholder="Enter name"
                            />
                            <p>{formData.job_position}</p>
                        </div>
                    </div>

                    <div className="form-section">
                        <h3>Information</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>User</label>
                                <input
                                    type="text"
                                    name="user_name"
                                    value={formData.user_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Surname</label>
                                <input
                                    type="text"
                                    name="surname"
                                    value={formData.surname}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email_address"
                                    value={formData.email_address}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Job Position</label>
                                <input
                                    type="text"
                                    name="job_position"
                                    value={formData.job_position}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Role</label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                >
                                    <option value="User">User</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group permissions">
                            <label>Access Permissions</label>
                            <div className="permissions-container">
                                {formData.access_permissions.map(
                                    (permission, index) => (
                                        <div key={index} className="permission-item">
                                            <input
                                                type="text"
                                                value={permission}
                                                onChange={(e) =>
                                                    handlePermissionChange(
                                                        index,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleRemovePermission(index)
                                                }
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    )
                                )}
                                <button type="button" onClick={handleAddPermission}>
                                    +
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h3>Address</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Number</label>
                                <input
                                    type="text"
                                    name="address_number"
                                    value={formData.address_number}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Lane</label>
                                <input
                                    type="text"
                                    name="address_lane"
                                    value={formData.address_lane}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Road</label>
                                <input
                                    type="text"
                                    name="address_road"
                                    value={formData.address_road}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Sub-district</label>
                                <input
                                    type="text"
                                    name="address_subdistrict"
                                    value={formData.address_subdistrict}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Province</label>
                                <input
                                    type="text"
                                    name="address_province"
                                    value={formData.address_province}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Postal Code</label>
                                <input
                                    type="text"
                                    name="address_postcode"
                                    value={formData.address_postcode}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit">Save</button>
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
