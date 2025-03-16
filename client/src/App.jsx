import "./App.css";
import "./Components/custom-table.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import Login from "./Components/Login/Login";
import UserManagement from "./Components/Dashboard/Components/UserManagement/UserManagement.jsx";
import StockPage from "./Components/Dashboard/Components/Stock/Stock.jsx";
import PurchasePage from "./Components/Dashboard/Components/Purchase/Purchase.jsx";
import SuppierPage from "./Components/Dashboard/Components/Suppier/Suppier.jsx";
import ProductReceiptPage from "./Components/Dashboard/Components/ProductReceipt/ProductReceipt.jsx";
import RequisitionPage from "./Components/Dashboard/Components/Requisition/Requisition.jsx";
import PriceparsionHistoryPage from "./Components/Dashboard/Components/PriceparsionHistory/PriceparsionHistory.jsx";
import PriceparsionPage from "./Components/Dashboard/Components/Priceparsion/Priceparsion.jsx";
import SignApprovalPage from "./Components/Dashboard/Components/ReceivingPurchase/SignApprovalPage";
import SummaryPage from "./Components/Dashboard/Components/SummaryPage/SummaryPage"; // ✅ Import หน้า Summary
import PrivateRoute from "./Components/PrivateRoute"; // ✅ เพิ่ม import 

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

// ✅ ฟังก์ชันตรวจสอบว่าผู้ใช้เข้าสู่ระบบหรือไม่
const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

// ✅ ป้องกันหน้าที่ต้องใช้การเข้าสู่ระบบ
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ อนุญาตให้เข้าถึงเฉพาะหน้า Login */}
        <Route path="/" element={<Login />} />

        {/* ✅ ป้องกันหน้าที่ต้องเข้าสู่ระบบ */}
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/Stock" element={<ProtectedRoute element={<StockPage />} />} />
        <Route path="/Requisition" element={<ProtectedRoute element={<RequisitionPage />} />} />
        <Route path="/Receipt" element={<ProtectedRoute element={<ProductReceiptPage />} />} />
        <Route path="/PriceparsionHistory" element={<ProtectedRoute element={<PriceparsionHistoryPage />} />} />
        <Route path="/Suppier" element={<ProtectedRoute element={<SuppierPage />} />} />
        <Route path="/purchase" element={<ProtectedRoute element={<PurchasePage />} />} />
        <Route path="/UserManagement" element={<ProtectedRoute element={<UserManagement />} />} />
        <Route path="/sign/:id" element={<ProtectedRoute element={<SignApprovalPage />} />} />
        <Route path="/Priceparsion" element={<ProtectedRoute element={<PriceparsionPage />} />} />
        <Route path="/summary" element={<PrivateRoute element={<SummaryPage />} />} /> {/* ✅ เพิ่มหน้า Summary */}

        {/* ✅ หากเข้า URL อื่นที่ไม่มี → Redirect ไปหน้า Login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;