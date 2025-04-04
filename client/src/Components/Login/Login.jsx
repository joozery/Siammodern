import React, { useState } from "react";
import "./Login.css";
import "../../App.css";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

// Import assets
import video from "../../LoginAssets/palm.mp4";
import logo from "../../LoginAssets/coverlogo.png";

// Imported Icons
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";

const API_BASE_URL = "https://servsiam-backend-a61de3db6766.herokuapp.com/api/auth/login";

const Login = () => {
  const [loginUserName, setLoginUserName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [statusHolder, setStatusHolder] = useState("message");
  const [loading, setLoading] = useState(false); // ✅ เพิ่ม loading state
  const navigateTo = useNavigate();

  // ✅ Handle login request
  const loginUser = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!loginUserName || !loginPassword) {
      setLoginStatus("⚠️ โปรดกรอกข้อมูลให้ครบถ้วน");
      setStatusHolder("showMessage");
      setTimeout(() => setStatusHolder("message"), 4000);
      return;
    }

    setLoading(true); // ✅ แสดงสถานะ loading

    try {
      const response = await Axios.post(
        API_BASE_URL,
        {
          user_name: loginUserName,
          password: loginPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("📌 API Response:", response.data);

      if (response.data.success) {
        // ✅ เก็บ Token และข้อมูลผู้ใช้
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        setLoginStatus("✅ เข้าสู่ระบบสำเร็จ! กำลังเปลี่ยนหน้า...");
        setStatusHolder("showMessage");

        // Redirect ไปหน้า Dashboard
        setTimeout(() => {
          navigateTo("/dashboard");
        }, 2000);
      } else {
        setLoginStatus("❌ " + (response.data.message || "เกิดข้อผิดพลาด"));
        setStatusHolder("showMessage");
      }
    } catch (error) {
      console.error("❌ Login Error:", error);
      setLoginStatus(
        "⚠️ " + (error.response?.data?.message || "เกิดข้อผิดพลาด โปรดลองใหม่")
      );
      setStatusHolder("showMessage");
    }

    setLoading(false); // ✅ ปิดสถานะ loading
    setTimeout(() => setStatusHolder("message"), 4000);
  };

  return (
    <div className="loginPage flex">
      <div className="container flex">
        {/* ✅ Video Section */}
        <div className="videoDiv">
          <video src={video} autoPlay muted loop className="rounded-lg shadow-md"></video>
          <div className="textDiv">
            <h2 className="title">SIAM MODERN PALM COMPANY LIMITED</h2>
            <p>บริษัท สยามโมเดิร์นปาล์ม จำกัด</p>
          </div>
        </div>

        {/* ✅ Form Section */}
        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Logo" className="w-20 mx-auto mb-2" />
            <h3 className="text-xl font-semibold">ยินดีต้อนรับสู่ระบบ</h3>
          </div>

          <form className="form grid gap-4" onSubmit={loginUser}>
            <span className={`${statusHolder} text-red-500 text-sm`}>{loginStatus}</span>

            <div className="inputDiv">
              <label htmlFor="username" className="font-medium">Username</label>
              <div className="input flex items-center border rounded-md p-2">
                <FaUserShield className="text-gray-500 mr-2" />
                <input
                  type="text"
                  id="username"
                  placeholder="Enter Username"
                  value={loginUserName}
                  onChange={(e) => setLoginUserName(e.target.value)}
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password" className="font-medium">Password</label>
              <div className="input flex items-center border rounded-md p-2">
                <BsFillShieldLockFill className="text-gray-500 mr-2" />
                <input
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            {/* ✅ Login Button */}
            <button
              type="submit"
              className="btn flex items-center justify-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              disabled={loading} // ✅ ป้องกันการกดซ้ำ
            >
              {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
            </button>

            {/* ✅ Forgot Password */}
            <span className="forgotPassword text-sm text-gray-500">
              Forgot your password? <Link to="/reset-password" className="text-blue-500">Click Here</Link>
              <p className="text-xs text-gray-400 mt-2">by woo you creative</p>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;