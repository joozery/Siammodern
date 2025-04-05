import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";


const SafetyStock = () => {
  const [filters, setFilters] = useState({
    productCode: "",
    itemName: "",
  });

  // Handle filter input change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Dummy data for demonstration
  const safetyStockData = [
    { id: "ST-001", productName: "ถุงมือกันสารเคมี", remaining: 50, safetyStock: 30, status: "✅ เพียงพอ" },
    { id: "ST-002", productName: "หน้ากากกันฝุ่น", remaining: 10, safetyStock: 20, status: "⚠ ต่ำกว่าระดับ Safety Stock" },
  ];

  // Filter the data based on user input
  const filteredData = safetyStockData.filter((item) => {
    return (
      (filters.productCode === "" || item.id.toLowerCase().includes(filters.productCode.toLowerCase())) &&
      (filters.itemName === "" || item.productName.toLowerCase().includes(filters.itemName.toLowerCase()))
    );
  });

  return (
    <div className="flex flex-col space-y-4 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between w-full border-b border-black pb-4">
        <h1 className="text-md sm:text-xl font-bold text-gray-800">📦 Safety Stock Management</h1>
        <div className="flex flex-row space-x-3 h-full">
          <button className="flex items-center justify-center bg-white rounded-lg shadow w-12 h-10 hover:bg-gray-50">
            <RiDeleteBin5Line />
          </button>
          <button className="flex items-center justify-center bg-green-500 text-white rounded-lg shadow hover:bg-green-600 w-20 h-10">
            <span className="text-lg font-semibold">Add</span>
          </button>
        </div>
      </div>

      {/* Search Section */}
      <div className="w-full">
        <div className="flex items-center px-4 py-2 bg-green-200 w-full"><span className="text-lg font-medium">ค้นหา</span></div>
        <div className="justify-center flex bg-white shadow px-2 pt-2 pb-8 sm:pt-4 sm:pb-4 md:p-6 w-full">
          <div className="grid grid-cols-12 gap-4">
            {/* หมวดหมู่ */}
            <div className="col-span-12 sm:col-span-4">
              <label className="block text-sm font-medium text-gray-700">หมวดหมู่</label>
              <div className="relative mt-1">
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="block w-full h-10 pl-3 pr-10 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">เลือกหมวดหมู่</option>
                  <option value="หมวดหมู่1">หมวดหมู่1</option>
                  <option value="หมวดหมู่2">หมวดหมู่2</option>
                  {/* เพิ่ม options ตามต้องการ */}
                </select>
              </div>
            </div>

            {/* เบอร์ */}
            <div className="col-span-12 sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">เบอร์</label>
              <div className="relative mt-1">
                <input
                  type="text"
                  name="number"
                  value={filters.number}
                  onChange={handleFilterChange}
                  className="block w-full h-10 pl-3 pr-10 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  placeholder="เบอร์"
                />
                <FiSearch className="absolute right-3 top-2.5 text-gray-400" />
              </div>
            </div>

            {/* รุ่น */}
            <div className="col-span-12 sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">รุ่น</label>
              <div className="relative mt-1">
                <select
                  name="model"
                  value={filters.model}
                  onChange={handleFilterChange}
                  className="block w-full h-10 pl-3 pr-10 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">เลือกรุ่น</option>
                  <option value="รุ่นA">รุ่นA</option>
                  <option value="รุ่นB">รุ่นB</option>
                  {/* เพิ่ม options ตามต้องการ */}
                </select>
              </div>
            </div>

            {/* สี */}
            <div className="col-span-12 sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">สี</label>
              <div className="relative mt-1">
                <select
                  name="color"
                  value={filters.color}
                  onChange={handleFilterChange}
                  className="block w-full h-10 pl-3 pr-10 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">เลือกสี</option>
                  <option value="สีดำ">สีดำ</option>
                  <option value="สีขาว">สีขาว</option>
                  {/* เพิ่ม options ตามต้องการ */}
                </select>
              </div>
            </div>

            {/* ขนาด */}
            <div className="col-span-12 sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">ขนาด</label>
              <div className="relative mt-1">
                <select
                  name="size"
                  value={filters.size}
                  onChange={handleFilterChange}
                  className="block w-full h-10 pl-3 pr-10 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">เลือกขนาด</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  {/* เพิ่ม options ตามต้องการ */}
                </select>
              </div>
            </div>

            {/* รหัสสินค้า */}
            <div className="col-span-12 sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">รหัสสินค้า</label>
              <div className="relative mt-1">
                <input
                  type="text"
                  name="productCode"
                  value={filters.productCode}
                  onChange={handleFilterChange}
                  className="block w-full h-10 pl-3 pr-10 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  placeholder="รหัสสินค้า"
                />
                <FiSearch className="absolute right-3 top-2.5 text-gray-400" />
              </div>
            </div>

            {/* รายการ */}
            <div className="col-span-12 sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">รายการ</label>
              <div className="relative mt-1">
                <input
                  type="text"
                  name="itemName"
                  value={filters.itemName}
                  onChange={handleFilterChange}
                  className="block w-full h-10 pl-3 pr-10 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  placeholder="รายการ"
                />
                <FiSearch className="absolute right-3 top-2.5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-gray-300 shadow overflow-auto w-full">
        <div className="p-4 border-b bg-gray-50">
          <span className="text-lg font-semibold text-gray-700">หมวดหมู่สินค้า</span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="bg-green-200">
                <th scope="col" className="px-4 py-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                </th>
                <th scope="col" className="text-sm font-medium text-gray-700">รหัสสินค้า</th>
                <th scope="col" className="text-sm font-medium text-gray-700">รายการ</th>
                <th scope="col" className="text-sm font-medium text-gray-700">จำนวนคงเหลือ</th>
                <th scope="col" className="text-sm font-medium text-gray-700">Safety Stock</th>
                <th scope="col" className="text-sm font-medium text-gray-700">สถานะ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredData.map((item) => (
                <tr key={item.id} className="odd:bg-white odd:dark:bg-green-50">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                  </td>
                  <td className="text-sm text-gray-900">{item.id}</td>
                  <td className="text-sm text-gray-900">{item.productName}</td>
                  <td className="text-sm text-gray-900">{item.remaining}</td>
                  <td className="text-sm text-gray-900">{item.safetyStock}</td>
                  <td className="text-sm text-gray-900">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SafetyStock;
