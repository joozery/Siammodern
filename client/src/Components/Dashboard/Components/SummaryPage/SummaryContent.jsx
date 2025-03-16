import React from "react";
import { FaUsers, FaFileAlt, FaProjectDiagram, FaBuilding } from "react-icons/fa";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

// ✅ ข้อมูลการ์ดสถิติ
const stats = [
  { icon: <FaUsers className="text-blue-600 text-3xl" />, title: "Total number of staff", value: 250, change: "+12 more than last quarter" },
  { icon: <FaFileAlt className="text-purple-600 text-3xl" />, title: "Total application", value: 100, change: "-0.2% lower than last quarter" },
  { icon: <FaProjectDiagram className="text-green-600 text-3xl" />, title: "Total projects", value: 10, change: "+2% more than last quarter" },
  { icon: <FaBuilding className="text-orange-600 text-3xl" />, title: "Total departments", value: 10, change: "" },
];

// ✅ ข้อมูล Memo
const memoData = [
  { id: "01", title: "Operations memo", from: "Otor John", to: "Ibrahim Sadiq", status: "Approved" },
  { id: "02", title: "Operations project memo", from: "Fatima Fanuk", to: "Shola Abiola", status: "Approved" },
  { id: "03", title: "Project onboard notice", from: "Otor John", to: "James Emeka", status: "Approved" },
  { id: "04", title: "Operations memo", from: "Ibrahim Musa", to: "Otor John", status: "Approved" },
];

// ✅ ข้อมูล Staff List
const staffList = [
  { id: "01", name: "Abubakar Ismaila Goje", role: "Admin", designation: "Human Resource Dept." },
  { id: "02", name: "Ihenayi Obinna", role: "Admin", designation: "Management" },
  { id: "03", name: "Bankole Olanrewaju", role: "HOD IT", designation: "Peoples and Operation" },
  { id: "04", name: "Chidinma Ebere", role: "HOD Account", designation: "Accounts" },
];

// ✅ ข้อมูล Payment Vouchers
const paymentVouchers = [
  { id: "01", subject: "Request for FARS for October 2022", date: "25/01/2023", status: "Pending" },
  { id: "02", subject: "Request for project proposal fee", date: "19/01/2023", status: "Approved" },
  { id: "03", subject: "Request for FARS for October 2022", date: "13/01/2023", status: "Approved" },
  { id: "04", subject: "Request for project proposal fee", date: "03/01/2023", status: "Pending" },
];

// ✅ ข้อมูลกราฟ Pie Chart
const applicationStats = {
  labels: ["Pending", "Approved", "Rejected"],
  datasets: [
    {
      data: [80, 370, 50],
      backgroundColor: ["#FFA500", "#4CAF50", "#FF3333"],
      hoverBackgroundColor: ["#FFCC80", "#66BB6A", "#FF6666"],
    },
  ],
};

const SummaryContent = () => {
  return (
    <div className="p-6 space-y-6 bg-gray-100">
      {/* ✅ การ์ดสถิติ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between hover:shadow-lg transition">
            {stat.icon}
            <div className="text-right">
              <h2 className="text-sm text-gray-600">{stat.title}</h2>
              <p className="text-2xl font-bold">{stat.value}</p>
              <span className="text-xs text-gray-500">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Memo & Staff List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">📜 Memo</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border text-left">S/N</th>
                <th className="p-2 border text-left">Memo Title</th>
                <th className="p-2 border text-left">From</th>
                <th className="p-2 border text-left">To</th>
                <th className="p-2 border text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {memoData.map((memo, index) => (
                <tr key={index} className="hover:bg-gray-100 transition">
                  <td className="p-3 border">{memo.id}</td>
                  <td className="p-3 border">{memo.title}</td>
                  <td className="p-3 border">{memo.from}</td>
                  <td className="p-3 border">{memo.to}</td>
                  <td className="p-3 border text-green-600">{memo.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">👥 Staff List</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border text-left">S/N</th>
                <th className="p-2 border text-left">Staff Name</th>
                <th className="p-2 border text-left">Staff Role</th>
                <th className="p-2 border text-left">Designation</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((staff, index) => (
                <tr key={index} className="hover:bg-gray-100 transition">
                  <td className="p-3 border">{staff.id}</td>
                  <td className="p-3 border">{staff.name}</td>
                  <td className="p-3 border">{staff.role}</td>
                  <td className="p-3 border">{staff.designation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ Payment Vouchers & Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">💰 Payment Vouchers</h2>
          <table className="w-full border-collapse">
            <tbody>
              {paymentVouchers.map((voucher, index) => (
                <tr key={index} className="hover:bg-gray-100 transition">
                  <td className="p-3 border">{voucher.id}</td>
                  <td className="p-3 border">{voucher.subject}</td>
                  <td className="p-3 border">{voucher.date}</td>
                  <td className={`p-3 border ${voucher.status === "Approved" ? "text-green-600" : "text-orange-500"}`}>{voucher.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ✅ Pie Chart (เล็กลง) */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-4">📊 Staff Applications</h2>
          <div className="w-64 h-64">
            <Pie data={applicationStats} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryContent;