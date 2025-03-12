//ทำให้ใช้ Pagenation ได้
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoPrint } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";



const ReceivingPurchaseData = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // จำนวนรายการต่อหน้า
  const totalItems = 50; // จำนวนรายการทั้งหมด (สมมุติ)
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const departments = ["ฝ่ายผลิต", "สต๊อกสินค้า", "ขนส่ง"]
  const countList = ["10", "5", "100"]
  const list = ["น้ำมันปาล์ม", "น้ำส้ม", "ปาล์ม", "ส้ม"]
  const statuslist = ["อนุมัติแล้ว", "รอการอนุมัติ", "ไม่อนุมัติ"]

  // สร้างข้อมูลตัวอย่าง
  const data = [...Array(totalItems).keys()].map((_, index) => ({
    id: index + 1,
    receivePrDate: "27/08/67",
    prNumber: `${index + 1}`,
    requireDate: "03/09/67",
    receiveDate: "04/09/67",
    poType: index % 2 === 0 ? "PO" : "สด",
    manufacturer: "ModernPalm",
    department: departments[Math.floor(Math.random() * departments.length)],
    count: countList[Math.floor(Math.random() * departments.length)],
    unitType: "แพ็ค",
    list: list[Math.floor(Math.random() * departments.length)],
    status: statuslist[Math.floor(Math.random() * departments.length)],
  }));


  // คำนวณรายการที่ต้องแสดงในแต่ละหน้า
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 space-y-2">
      {/* Header */}
      <div className="border-b border-black mb-5">
        <div className="text-xl font-bold mb-3">บันทึกการรับใบขอซื้อ</div>
      </div>

      {/* Form */}
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="md:col-span-2 bg-white rounded-none border">
            <div className="bg-green-200 border border-gray-200 w-full px-3 py-2">
              <h1>รายละเอียดเอกสาร</h1>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 space-x-0 md:space-x-2 w-full">
                  <label className="block text-sm font-medium text-gray-700 w-full md:w-1/3">
                    ใบขอซื้อเลขที่ PR No.
                  </label>
                  <div className="relative mt-1 w-full">
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md h-10 p-2 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="PR No."
                    />
                    <FiSearch className="absolute right-2 top-3.5 text-gray-400" />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 space-x-0 md:space-x-2 items-center">
                  <label className="block text-sm font-medium text-gray-700 w-full md:w-1/3">
                    วันที่ต้องการ
                  </label>
                  <input
                    type="date"
                    className="mt-1 block w-full rounded-md h-10 p-2 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 space-x-0 md:space-x-2 my-3">
                <label className="block text-sm font-medium text-gray-700 w-full">
                  หน่วยงานที่ขอซื้อ (Agency requesting to buy)
                </label>
                <div className="relative mt-1 w-full">
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md h-10 p-2 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder=""
                  />
                  <FiSearch className="absolute right-2 top-3.5 text-gray-400 bg-white w-5" />
                </div>
              </div>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 space-x-0 md:space-x-2 w-full">
                <div className="w-full md:w-1/3">
                  <span className="text-sm">วัตถุประสงค์ในการ</span>
                </div>
                <div className="flex flex-col md:flex-row space-y-2 md:space-x-4 w-full py-1">
                  <div className="flex items-center justify-start space-x-2 w-full">
                    <input type="radio" name="purpose" className="" />
                    <span className="text-sm sm:text-md">ซื้อ (Buy)</span>
                  </div>
                  <div className="flex items-center justify-start space-x-2 w-full">
                    <input type="radio" name="purpose" className="" />
                    <span className="text-sm sm:text-md">สร้าง (Build)</span>
                  </div>
                  <div className="flex items-center justify-start space-x-2 w-full">
                    <input type="radio" name="purpose" className="" />
                    <span className="text-sm sm:text-md">ซ่อม (Repair)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1 bg-white">
            <div className="flex flex-col">
              <div className="bg-green-200 border border-gray-200 w-full px-3 py-2">
                <h1>หัวเอกสาร</h1>
              </div>
              <div className="bg-white p-5 border border-gray-200 w-full space-y-3 md:space-y-2">
                <div className="flex flex-col md:flex-row items-center md:space-x-3">
                  <label className="w-full md:w-1/3">รหัสเอกสาร</label>
                  <select className="mt-1 px-2 block w-full border h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                    <option>เลือก</option>
                    <option>test1</option>
                    <option>test2</option>
                  </select>
                </div>
                <div className="flex flex-col md:flex-row items-center md:space-x-3">
                  <label className="w-full md:w-1/3">แก้ไขครั้งที่</label>
                  <select className="mt-1 px-2 block w-full border h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                    <option>เลือก</option>
                    <option>test1</option>
                    <option>test2</option>
                  </select>
                </div>
                <div className="flex flex-col md:flex-row items-center md:space-x-3">
                  <label className="w-full md:w-1/3">วันที่บังคับใช้</label>
                  <input
                    type="date"
                    name="reqire-date"
                    id="reqire-date"
                    className="mt-1 block px-2 w-full border h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-2">
        <p className="ms-1">สถานะ</p>
        <div className="flex items-center justify-between space-x-4">
          <select className="mt-1 block w-1/6 border px-2 h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            <option>เลือก</option>
            <option>test1</option>
            <option>test2</option>
          </select>
          <div className="flex flex-row space-x-3">
            <button className="h-10 flex items-center px-4 py-2 text-white bg-white rounded-md shadow-md hover:bg-gray-50">
              <IoPrint className="text-black" />
            </button>
            <button className="h-10 flex items-center px-4 py-2 text-white bg-white rounded-md shadow-md hover:bg-gray-50">
              <RiDeleteBin5Line className="text-red-700" />
            </button>
            <button className="h-10 flex items-center px-4 py-2 text-white bg-green-600 rounded-md shadow-md hover:bg-green-700">
              <span>+ Add</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md overflow-x-auto">
        <table className="table-auto text-left border-collapse w-full">
          <thead className="text-sm">
            <tr className="bg-green-300">
              <th colSpan="13" className="border-b py-2 px-4 text-start py-3 text-2xl">บันทึกการรับใบขอซื้อ</th>
            </tr>
            <tr className="bg-gray-200">
              <th>
                <input
                  type="checkbox"
                  className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
              </th>
              <th className="border-b py-2 px-2">ลำดับที่</th>
              <th className="border-b py-2 px-4">ว.ด.ป. ที่รับPR</th>
              <th className="border-b py-2 px-4">เลขที่ PR</th>
              <th className="border-b py-2 px-4">ว.ด.ป. ที่ต้องการ</th>
              <th className="border-b py-2 px-4">ว.ด.ป. ที่รับของ</th>
              <th className="border-b py-2 px-4">PO/สด/ไม่มี PO</th>
              <th className="border-b py-2 px-4">ผู้จัดจำหน่าย</th>
              <th className="border-b py-2 px-4">รายการ</th>
              <th className="border-b py-2 px-4">แผนก</th>
              <th className="border-b py-2 px-4">จำนวน</th>
              <th className="border-b py-2 px-4">หน่วย</th>
              <th className="border-b py-2 px-4">สถานะ</th>
            </tr>
          </thead>
          <tbody className="text-center text-sm">
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                </td>
                <td className="border-b py-2 px-4 whitespace-nowrap">{item.id}</td>
                <td className="border-b py-2 px-4 whitespace-nowrap">{item.receivePrDate}</td>
                <td className="border-b py-2 px-4 whitespace-nowrap">{item.prNumber}</td>
                <td className="border-b py-2 px-4 whitespace-nowrap">{item.requireDate}</td>
                <td className="border-b py-2 px-4 whitespace-nowrap">{item.receiveDate}</td>
                <td className="border-b py-2 px-4 whitespace-nowrap">{item.poType}</td>
                <td className="border-b py-2 px-4 whitespace-nowrap">{item.manufacturer}</td>
                <td className="border-b py-2 px-4 whitespace-nowrap overflow-hidden">{item.list}</td>
                <td className="border-b py-2 px-4 whitespace-nowrap">{item.department}</td>
                <td className="border-b py-2 px-4 whitespace-nowrap">{item.count}</td>
                <td className="border-b py-2 px-4 whitespace-nowrap">{item.unitType}</td>
                <td className="border-b py-2 px-4 whitespace-nowrap">
                <select
  className={`px-2 py-1 rounded-md border ${
    item.status === "อนุมัติแล้ว"
      ? "border-green-500 text-green-500"
      : item.status === "ไม่อนุมัติ"
      ? "border-red-500 text-red-500"
      : "border-yellow-500 text-yellow-500"
  }`}
  defaultValue={item.status}
  onChange={(e) => {
    const updatedStatus = e.target.value;

    // ตรวจสอบสถานะที่ถูกเลือก
    if (updatedStatus === "อนุมัติแล้ว" || updatedStatus === "รอการอนุมัติ") {
      // เปลี่ยนเส้นทางไปยังหน้าเซ็นอนุมัติ
      window.location.href = `/sign/${item.id}`;
    }

    console.log(`สถานะใหม่ของ ID ${item.id}:`, updatedStatus);
  }}
>
  <option value="อนุมัติแล้ว">อนุมัติแล้ว</option>
  <option value="รอการอนุมัติ">รอการอนุมัติ</option>
  <option value="ไม่อนุมัติ">ไม่อนุมัติ</option>
</select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center pt-2">
        <span>
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} entries
        </span>
        <div className="flex space-x-2">
          <button
            onClick={goToPreviousPage}
            className={`px-3 py-1 rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"
              }`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={goToNextPage}
            className={`px-3 py-1 rounded ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"
              }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceivingPurchaseData;

