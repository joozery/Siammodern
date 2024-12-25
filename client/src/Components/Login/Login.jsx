import React, { useEffect, useState } from "react";
import "./Login.css";
import "../../App.css";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

// Import assets
import video from "../../LoginAssets/palm.mp4";
import logo from "../../LoginAssets/logopalm.png";

// Imported Icons
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";

const Login = () => {
  const [loginUserName, setLoginUserName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [statusHolder, setStatusHolder] = useState("message");
  const navigateTo = useNavigate();

  // Handle login request
  const loginUser = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!loginUserName || !loginPassword) {
      setLoginStatus("Please fill out all fields");
      setStatusHolder("showMessage");
      setTimeout(() => setStatusHolder("message"), 4000);
      return;
    }

    try {
      const response = await Axios.post("http://localhost:3002/login", {
        user_name: loginUserName,
        password: loginPassword,
      });

      console.log("Response from server:", response.data);

      if (response.data.error) {
        // If server returns an error
        setLoginStatus(response.data.error);
        setStatusHolder("showMessage");
      } else if (response.data.message) {
        // If server sends success message
        setLoginStatus(response.data.message);
        setStatusHolder("showMessage");
        setTimeout(() => {
          navigateTo("/dashboard"); // Redirect to dashboard
        }, 2000); // Wait for 2 seconds before redirect
      }
    } catch (error) {
      console.error("Error during login:", error);
      setLoginStatus("An error occurred. Please try again.");
      setStatusHolder("showMessage");
    }

    // Hide the message after 4 seconds
    setTimeout(() => setStatusHolder("message"), 4000);
  };

  // Clear form after successful login
  const onSubmit = () => {
    setLoginUserName("");
    setLoginPassword("");
  };

  return (
    <div className="loginPage flex">
      <div className="container flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>
          <div className="textDiv">
            <h2 className="title">SIAM MODERN PALM COMPANY LIMITED</h2>
            <p>บริษัท สยามโมเดิร์นปาล์ม จำกัด</p>
          </div>
          <div className="footerDiv flex">
            <span className="text">หากคุณยังไม่มีบัญชีใช้งาน ?</span>
            <Link to={"/register"}>
              <button className="btn">ติดต่อผู้ดูแลระบบ</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Logo" />
            <h3>ยินดีต้อนรับสู่ระบบ</h3>
          </div>

          <form className="form grid" onSubmit={onSubmit}>
            <span className={statusHolder}>{loginStatus}</span>

            <div className="inputDiv">
              <label htmlFor="username">Username</label>
              <div className="input flex">
                <FaUserShield className="icon" />
                <input
                  type="text"
                  id="username"
                  placeholder="Enter Username"
                  value={loginUserName}
                  onChange={(e) => setLoginUserName(e.target.value)}
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input flex">
                <BsFillShieldLockFill className="icon" />
                <input
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="btn flex" onClick={loginUser}>
              <span>เข้าสู่ระบบ</span>
              <AiOutlineSwapRight className="icon" />
            </button>

            <span className="forgotPassword">
              Forgot your password? <a href="">Click Here</a>
              <p>by woo you creative</p>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
