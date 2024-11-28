import React, { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";

function SupplierData() {
  // ตัวอย่างข้อมูล (สามารถเปลี่ยนเป็นดึงจาก API ได้)
  const [data, setData] = useState(
    Array.from({ length: 50 }, (_, i) => ({
      runno: i + 1, // mockup runno
      gcoor: `G${i + 1}`,
      code: `C${i + 1}`,
      name: `Supplier ${i + 1}`,
      type: "Type A",
      description: "Lorem ipsum",
      subhdlevel: "Level 1",
      subheadmsg: "Message",
      unused1: "-",
    }))
  );

  // State สำหรับ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // คำนวณข้อมูลที่ต้องแสดงในแต่ละหน้า
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = data.slice(indexOfFirstRow, indexOfLastRow);

  // คำนวณจำนวนหน้าทั้งหมด
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // เปลี่ยนหน้า
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center border-b border-black pb-5">
        <h1 className="text-lg md:text-xl font-bold">ซัพพลายเออร์ (Suppliers)</h1>
        <div className="flex space-x-2">
          <button className="px-2 h-10 lg:p-3 bg-white text-white rounded-md shadow-md hover:bg-gray-50">
            <RiDeleteBin5Line className="text-red-700" />
          </button>
          <button className="px-4 h-10 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700">
            <span className="me-1">+</span>Add
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mt-4">
        <div className="relative mt-1">
                <input
                  type="text"
                  name="number"
                  className="block w-full md:w-60 h-10 pl-3 pr-10 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  placeholder="Search"
                />
                <FiSearch className="absolute right-3 md:left-52 top-3 text-gray-400" />
              </div>
      </div>

      {/* Table */}
      <div className="mt-6">
        <div className="overflow-x-auto">
          <table className="w-full bg-white border-collapse border border-gray-300">
            <thead>
              <tr className="bg-green-200">
                <th className="border border-gray-300 px-4 py-2 text-center">
                  <input type="checkbox" className="form-checkbox" />
                </th>
                <th className="border border-gray-300 px-4 py-2">Run No</th>
                <th className="border border-gray-300 px-4 py-2">Gcoor</th>
                <th className="border border-gray-300 px-4 py-2">Code</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Type</th>
                <th className="border border-gray-300 px-4 py-2">Description</th>
                <th className="border border-gray-300 px-4 py-2">SubHD Level</th>
                <th className="border border-gray-300 px-4 py-2">Subhead Msg</th>
                <th className="border border-gray-300 px-4 py-2">Unused1</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50 odd:bg-white odd:dark:bg-green-50">
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <input type="checkbox" className="form-checkbox" />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {row.runno}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{row.gcoor}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.code}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.type}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.description}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.subhdlevel}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.subheadmsg}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.unused1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <div>
          Showing {indexOfFirstRow + 1} to{" "}
          {indexOfLastRow > data.length ? data.length : indexOfLastRow} of{" "}
          {data.length} entries
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-3 py-1 ${currentPage === 1
                ? "bg-gray-200 text-gray-400"
                : "bg-gray-200 hover:bg-gray-300"
              } rounded-md`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 ${currentPage === totalPages
                ? "bg-gray-200 text-gray-400"
                : "bg-gray-200 hover:bg-gray-300"
              } rounded-md`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default SupplierData;
