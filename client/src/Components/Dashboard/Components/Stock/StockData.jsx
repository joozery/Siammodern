// Stock.js
import React, { useState } from "react";
import { stockData } from "./mockData";
import { FiSearch } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import './StockData.css'

export default function Stock() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    number: "",
    model: "",
    color: "",
    size: "",
    productCode: "",
    itemName: "",
  });

  // ฟังก์ชันจัดการการกรองข้อมูล
  const filteredData = stockData.filter((item) => {
    return (
      (filters.category === "" || item.category.toLowerCase().includes(filters.category.toLowerCase())) &&
      (filters.number === "" || item.number.toLowerCase().includes(filters.number.toLowerCase())) &&
      (filters.model === "" || item.model.toLowerCase().includes(filters.model.toLowerCase())) &&
      (filters.color === "" || item.color.toLowerCase().includes(filters.color.toLowerCase())) &&
      (filters.size === "" || item.size.toLowerCase().includes(filters.size.toLowerCase())) &&
      (filters.productCode === "" || item.productCode.toLowerCase().includes(filters.productCode.toLowerCase())) &&
      (filters.itemName === "" || item.itemName.toLowerCase().includes(filters.itemName.toLowerCase()))
    );
  });

  // Handle checkbox selection
  const handleCheckboxChange = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Handle select all checkbox
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(filteredData.map((item) => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  // Handle filter input change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col space-y-4 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between w-full border-b border-black pb-4">
        <h1 className="text-md sm:text-xl font-bold text-gray-800">สต็อกสินค้า (Stock Management)</h1>
        <div className="flex flex-row space-x-3 h-full">
          <button className="flex items-center justify-center bg-white rounded-lg shadow w-12 h-10 hover:bg-gray-50"><RiDeleteBin5Line /></button>
          <button className="flex items-center justify-center bg-green-500 text-white rounded-lg shadow hover:bg-green-600 w-20 h-10">
            <span className="text-lg font-semibold">+ Add</span>
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
          <span className="text-lg font-semibold text-gray-700">หมวดหมู่1</span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="bg-green-200">
                {/* Checkbox Header */}
                <th scope="col" className="px-4 py-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    onChange={handleSelectAll}
                    checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                  />
                </th>
                {/* รหัสสินค้า */}
                <th scope="col" className="text-sm font-medium text-gray-700 w-24">
                  <div className="flex flex-col">
                    <span>รหัสสินค้า</span>
                    <span className="text-xs text-gray-500">Product Code</span>
                  </div>
                </th>
                {/* รายการ */}
                <th scope="col" className="text-sm font-medium text-gray-700 w-32">
                  <div className="flex flex-col">
                    <span>รายการ</span>
                    <span className="text-xs text-gray-500">Item</span>
                  </div>
                </th>
                {/* เบอร์ */}
                <th scope="col" className="text-sm font-medium text-gray-700">
                  <div className="flex flex-col">
                    <span>เบอร์</span>
                    <span className="text-xs text-gray-500">Number</span>
                  </div>
                </th>
                {/* รุ่น */}
                <th scope="col" className="text-sm font-medium text-gray-700">
                  <div className="flex flex-col">
                    <span>รุ่น</span>
                    <span className="text-xs text-gray-500">Model</span>
                  </div>
                </th>
                {/* สี */}
                <th scope="col" className="text-sm font-medium text-gray-700">
                  <div className="flex flex-col">
                    <span>สี</span>
                    <span className="text-xs text-gray-500">Color</span>
                  </div>
                </th>
                {/* ขนาด */}
                <th scope="col" className="text-sm font-medium text-gray-700">
                  <div className="flex flex-col">
                    <span>ขนาด</span>
                    <span className="text-xs text-gray-500">Size</span>
                  </div>
                </th>
                {/* ราคาต้นทุน (ต่อหน่วย) */}
                <th scope="col" className="text-sm font-medium text-gray-700 w-32">
                  <div className="flex flex-col">
                    <span>ราคาต้นทุน (ต่อหน่วย)</span>
                    <span className="text-xs text-gray-500">Cost Price</span>
                  </div>
                </th>
                {/* สถานที่จัดเก็บ */}
                <th scope="col" className="text-sm font-medium text-gray-700 w-32">
                  <div className="flex flex-col">
                    <span>สถานที่จัดเก็บ</span>
                    <span className="text-xs text-gray-500">Storage Location</span>
                  </div>
                </th>
                {/* สถานะสต๊อก */}
                <th scope="col" className="text-sm font-medium text-gray-700">
                  <div className="flex flex-col">
                    <span>สถานะสต๊อก</span>
                    <span className="text-xs text-gray-500">Stock Status</span>
                  </div>
                </th>
                {/* จำนวน */}
                <th scope="col" className="text-sm font-medium text-gray-700">
                  <div className="flex flex-col">
                    <span>จำนวน</span>
                    <span className="text-xs text-gray-500">Quantity</span>
                  </div>
                </th>
                {/* หน่วย */}
                <th scope="col" className="text-sm font-medium text-gray-700">
                  <div className="flex flex-col">
                    <span>หน่วย</span>
                    <span className="text-xs text-gray-500">Unit</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredData.map((item) => (
                <tr key={item.id} className="odd:bg-white odd:dark:bg-green-50">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      checked={selectedRows.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                  </td>
                  <td className=" text-sm text-gray-900">{item.productCode}</td>
                  <td className=" text-sm text-gray-900">{item.itemName}</td>
                  <td className=" text-sm text-gray-900">{item.number}</td>
                  <td className=" text-sm text-gray-900">{item.model}</td>
                  <td className=" text-sm text-gray-900">{item.color}</td>
                  <td className=" text-sm text-gray-900">{item.size}</td>
                  <td className=" text-sm text-gray-900">{item.costPrice}</td>
                  <td className=" text-sm text-gray-900">{item.storageLocation}</td>
                  <td className=" text-sm text-gray-900">{item.stockStatus}</td>
                  <td className=" text-sm text-gray-900">
                    {item.quantity} {item.unit}
                  </td>
                  <td className=" text-sm text-gray-900">{item.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
