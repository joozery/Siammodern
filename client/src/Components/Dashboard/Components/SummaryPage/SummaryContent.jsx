import React from "react";
import { FaClipboardList, FaShoppingCart, FaChartLine, FaUsers } from "react-icons/fa";

const stats = [
  { icon: <FaClipboardList className="text-blue-600 text-4xl" />, title: "ใบขอเบิกพัสดุ", value: 10 },
  { icon: <FaShoppingCart className="text-green-600 text-4xl" />, title: "ใบขอซื้อ", value: 8 },
  { icon: <FaChartLine className="text-orange-600 text-4xl" />, title: "เปรียบเทียบราคา", value: 5 },
  { icon: <FaUsers className="text-purple-600 text-4xl" />, title: "จำนวนผู้ใช้งาน", value: 20 },
];

const recentUpdates = [
  { id: 1, action: "เพิ่มผู้ใช้ใหม่", date: "2025-03-17" },
  { id: 2, action: "อัปเดตสินค้า", date: "2025-03-16" },
];

const SummaryContent = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold flex items-center gap-2">📊 สรุปรายการในระบบ ERP</h1>

      {/* ✅ แสดงสถิติ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between hover:shadow-lg transition">
            {stat.icon}
            <div className="text-right">
              <h2 className="text-lg font-semibold">{stat.title}</h2>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ รายการอัปเดตล่าสุด */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">🔄 รายการอัปเดตล่าสุด</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border text-left">ลำดับ</th>
              <th className="p-2 border text-left">รายการ</th>
              <th className="p-2 border text-left">วันที่</th>
            </tr>
          </thead>
          <tbody>
            {recentUpdates.length > 0 ? (
              recentUpdates.map((update, index) => (
                <tr key={index} className="hover:bg-gray-100 transition">
                  <td className="p-3 border text-center">{update.id}</td>
                  <td className="p-3 border">{update.action}</td>
                  <td className="p-3 border">{update.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-3 border text-center text-gray-500">ไม่มีรายการล่าสุด</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SummaryContent;