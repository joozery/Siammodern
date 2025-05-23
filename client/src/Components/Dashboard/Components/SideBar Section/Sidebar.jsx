import React from "react";
import "./sidebar.css";

// Imported Images ==========>
import logo from "../../Assets/coverlogo.png";

// imported Icons ===========>
import { IoMdSpeedometer } from "react-icons/io";
import { MdDeliveryDining } from "react-icons/md";
import { MdOutlineExplore } from "react-icons/md";
import { BsTrophy } from "react-icons/bs";
import { FaWarehouse, FaShieldAlt } from "react-icons/fa"; // คลังสินค้า
import { AiOutlinePieChart } from "react-icons/ai";
import { FaTruck } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { AiOutlineFileDone } from "react-icons/ai";
import { FaFileInvoice } from "react-icons/fa"; // บันทึกใบขอซื้อ
import { MdShoppingCart } from "react-icons/md";
import { BiTrendingUp } from "react-icons/bi";
import { MdOutlinePermContactCalendar } from "react-icons/md";
import { BsCreditCard2Front } from "react-icons/bs";
import { BsQuestionCircle } from "react-icons/bs";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sideBar grid gap-4">
      <div className="logoDiv flex">
        <img src={logo} alt="Image Name" />
      </div>

      <div className="menuDiv">
        <h3 className="divTitle font-bold">QUICK MENU</h3>
        <ul className="menuLists grid gap-7">
          <li className="listItem">
            <Link to="/dashboard" className="menuLink flex">
              <IoMdSpeedometer className="icon" />
              <span className="smallText">Dashboard</span>
            </Link>
          </li>

          <li className="listItem">
            <Link to="/Stock" className="menuLink flex">
              <FaWarehouse className="icon" />
              <span className="smallText">คลังสินค้า</span>
            </Link>
          </li>

          <li className="listItem">
            <Link to="/SafetyStock" className="menuLink flex">
              <FaShieldAlt className="icon" />
              <span className="smallText">Safety Stock</span>
            </Link>
          </li>

          <li className="listItem">
            <Link to="/Suppier" className="menuLink flex">
              <FaTruck className="icon" />
              <span className="smallText">suppliers</span>
            </Link>
          </li>

          <li className="listItem">
            <Link to="/Purchase" className="menuLink flex">
              <MdShoppingCart className="icon" />
              <span className="smallText">แผนกจัดซื้อ</span>
            </Link>
          </li>

          <li className="listItem">
            <Link to="/UserManagement" className="menuLink flex">
              <FaUsers className="icon" />
              <span className="smallText">การจัดการผู้ใช้งาน</span>
            </Link>
          </li>

          <li className="listItem">
            <Link to="/Requisition" className="menuLink flex">
              <FaClipboardList className="icon" />
              <span className="smallText">ใบขอเบิกพัสดุ</span>
            </Link>
          </li>

          <li className="listItem">
            <Link to="/summary" className="menuLink flex">
              <AiOutlineFileDone className="icon" />
              <span className="smallText">สรุปรายการ</span>
            </Link>
          </li>

          <li className="listItem">
            <Link to="/Receipt" className="menuLink flex">
              <FaFileInvoice className="icon" />
              <span className="smallText">บันทึกใบขอซื้อ</span>
            </Link>
          </li>

          <li className="listItem">
            <Link to="/Receipt" className="menuLink flex">
              <FaFileInvoice className="icon" />
              <span className="smallText">รายการคำขออนุมัติ</span>
            </Link>
          </li>

          <li className="listItem">
            <Link to="/Priceparsion" className="menuLink flex">
              <FaFileInvoice className="icon" />
              <span className="smallText">เปรียบเทียบราคา</span>
            </Link>
          </li>

          <li className="listItem">
            <Link to="/PriceparsionHistory" className="menuLink flex">
              <FaFileInvoice className="icon" />
              <span className="smallText">ประวัติเปรียบเทียบราคา</span>
            </Link>
          </li>
          {/* <li className="listItem">
            <Link to="/PriceparsionEdit" className="menuLink flex">
              <FaFileInvoice className="icon" />
              <span className="smallText">แก้ไขเปรียบเทียบราคา</span>
            </Link>
          </li> */}
          <div className="pt-10">
          <li className="listItem logOutBtn">
            <button
              onClick={() => {
                localStorage.removeItem("token"); // ลบ token
                localStorage.removeItem("user"); // ลบข้อมูลผู้ใช้
                window.location.href = "/"; // Redirect ไปหน้า Login
              }}
              className="menuLink flex w-full text-left"
            >
              <BsFillArrowLeftCircleFill className="icon" />
              <span className="smallText">ออกจากระบบ</span>
            </button>
          </li>
          </div>
        </ul>
      </div>

      {/* <div className="settingsDiv">
        <h3 className="divTitle font-bold"></h3>
        <ul className="menuLists grid gap-4">
          <li className="listItem logOutBtn">
            <button
              onClick={() => {
                localStorage.removeItem("token"); // ลบ token
                localStorage.removeItem("user"); // ลบข้อมูลผู้ใช้
                window.location.href = "/"; // Redirect ไปหน้า Login
              }}
              className="menuLink flex w-full text-left"
            >
              <BsFillArrowLeftCircleFill className="icon" />
              <span className="smallText">ออกจากระบบ</span>
            </button>
          </li>
        </ul>
      </div> */}

      {/* <div className="sideBarCard">
        <BsQuestionCircle className="icon" />
        <div className="cardContent">
          <div className="circle1"></div>
          <div className="circle2"></div>

          <h3>Help Center</h3>
          <p>Having trouble in , please contact us from for more questions.</p>

          <button className="btn">Go to help center</button>
        </div>
      </div> */}
    </div>
  );
};

export default Sidebar;
