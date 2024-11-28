import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";

function PurchaseData() {
  return (
    <>
      {/* <!-- Form --> */}
      <form className="">
        <div className="w-full bg-white rounded-none border border-gray-300 shadow-md">
          <div className="bg-green-100 px-4 h-16 flex items-center mb-6">
            <h1 className="text-lg sm:text-xl font-bold text-gray-800">ใบขอซื้อ <span className="text-lg font-light">PURCHASE REQUISITION</span></h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2 sm:p-6 sm:pt-2">
            {/* <!-- Left Section --> */}
            <div className="flex flex-row">
              <label for="pr-no" className="w-1/3 block text-gray-700 font-medium">ใบขอซื้อเลขที่</label>
              <input type="text" id="pr-no" name="pr-no" className="w-full h-10 px-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
            </div>
            <div className="flex flex-row">
              <label for="doc-code" className="w-1/3 block text-gray-700 font-medium">รหัสเอกสาร</label>
              <select id="doc-code" name="doc-code"
                className="w-full h-10 px-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500">
                <option value="">Select</option>
              </select>
            </div>

            <div className="flex flex-row">
              <label for="desired-date" className="w-1/3 block text-gray-700 font-medium">วันที่ต้องการ :</label>
              <input type="date" id="desired-date" name="desired-date" value="2024-08-20"
                className="w-full h-10 px-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
            </div>
            <div className="flex flex-row">
              <label for="revision" className="w-1/3 block text-gray-700 font-medium">แก้ไขครั้งที่</label>
              <select id="revision" name="revision"
                className="w-full h-10 px-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500">
                <option value="">Select</option>
              </select>
            </div>

            <div className="flex flex-row">
              <label for="agency" className="w-1/3 block text-gray-700 font-medium">หน่วยงานที่ขอซื้อ</label>
              <input type="text" id="agency" name="agency"
                className="w-full h-10 px-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
            </div>
            <div className="flex flex-row">
              <label for="effective-date" className="w-1/3 block text-gray-700 font-medium">วันที่บังคับใช้</label>
              <input type="date" id="effective-date" name="effective-date" value="2024-08-20" className="w-full h-10 px-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
            </div>
          </div>

          {/* <!-- Purpose Section --> */}
          <div className="p-2 md:p-6 md:pt-0 ">
            <label className="block text-gray-700 font-medium">วัตถุประสงค์ในการ</label>
            <div className="flex justify-center items-center space-x-3 sm:space-x-6 mt-4">
              <label className="flex items-center space-x-2">
                <input type="radio" name="purpose" value="buy" className="text-green-600 focus:ring-green-500" />
                <span className="text-sm sm:text-md">ซื้อ (Buy)</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="purpose" value="build" className="text-green-600 focus:ring-green-500" />
                <span className="text-sm sm:text-md">สร้าง (Build)</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="purpose" value="repair" className="text-green-600 focus:ring-green-500" />
                <span className="text-sm sm:text-md">ซ่อม (Repair)</span>
              </label>
            </div>
          </div>

          {/* <!-- Submit Button -->
          <div className="text-right">
            <button type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700">Submit</button>
          </div> */}

        </div>

        {/* ส่วนเลือกสินค้า */}
        <div className="bg-gray-100 mt-4">
          <div className="w-full border border-gray-300 bg-white p-2 sm:p-6 rounded-none shadow-md">
            <div className="border-b-2 pb-4 mb-6">
              <h1 className="text-xl font-bold text-gray-800">เลือกรายการสินค้า</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Section */}
              <div className="col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium">หมวดหมู่</label>
                    <select className="w-full border p-2 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500">
                      <option>เลือก</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">รหัสสินค้า</label>
                    <input type="text" className="w-full border p-2 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="col-span-2">
                    <label className="block text-gray-700 font-medium">รายการ</label>
                    <input type="text" className="w-full border p-2 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">จำนวน</label>
                    <input type="text" className="w-full border p-2 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">หน่วย</label>
                    <input type="text" className="w-full border p-2 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium">เบอร์</label>
                    <select className="w-full border p-2 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500">
                      <option>เลือก</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">รุ่น</label>
                    <input type="text" className="w-full border p-2 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">สี</label>
                    <select className="w-full border p-2 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500">
                      <option>เลือก</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">ขนาด</label>
                    <select className="w-full border p-2 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500">
                      <option>เลือก</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">ยี่ห้อ / ตรา</label>
                    <select className="w-full border p-2 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500">
                      <option>เลือก</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 md:flex-row sm:space-x-3 gap-3">
                  <div className="">
                    <label className="text-gray-700 font-medium">ยอดแสดงการรับ</label></div>
                  <div className="space-x-3 px-4 md:px-0">
                    <label className="text-gray-700 font-medium">รับ</label>
                    <input type="text" className="border border-gray-300 p-2 md:w-20 rounded-md shadow-sm" /></div>
                  <div className="space-x-3 px-4 md:px-0">
                    <label className="text-gray-700 font-medium">ส่ง</label>
                    <input type="text" className="border border-gray-300 p-2 md:w-20 rounded-md shadow-sm" /></div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-3">หมายเหตุ</label>
                  <input type="text" className="w-full border p-2 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
                </div>
              </div>

              {/* Right Section */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">รูปภาพ</label>
                <div className="w-full h-64 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 7l6 6-6 6M21 7l-6 6 6 6"
                    />
                  </svg>
                </div>
                <div className="mt-4">
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md shadow-sm hover:bg-gray-300">
                    Browse
                  </button>
                </div>
                <div className="mt-2 mb-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="text-green-600 focus:ring-green-500" />
                    <span>แนบรูปประกอบ</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="my-4 flex justify-end space-x-2">
            <button className="h-10 flex items-center px-4 py-2 text-white bg-white rounded-md shadow-md hover:bg-gray-50">
              <RiDeleteBin5Line className="text-red-700" />
            </button>
            <button className="h-10 flex items-center px-4 py-2 text-white bg-green-600 rounded-md shadow-md hover:bg-green-700">
              <span>+ Add</span>
            </button>
          </div>
        </div>

        {/* Table  */}
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse bg-white w-full text-sm text-gray-700">
            <thead>
              <tr className="bg-green-100 text-gray-900 text-center">
                <th rowSpan="2" className="border px-4 py-2"></th>
                <th rowSpan="2" className="border px-4 py-2">ลำดับที่ <br /><span className="text-xs text-gray-500">At live</span></th>
                <th rowSpan="2" className="border px-4 py-2">รหัสสินค้า <br /><span className="text-xs text-gray-500">Product code</span></th>
                <th rowSpan="2" className="border px-4 py-2">รายการ <br /><span className="text-xs text-gray-500">List</span></th>
                <th colSpan="4" className="border px-4 py-2">รายละเอียดสินค้า <br /><span className="text-xs text-gray-500">Product details</span></th>
                <th colSpan="2" className="border px-4 py-2">ยอดแสดงการรับ <br /><span className="text-xs text-gray-500">Awesome Show</span></th>
                <th rowSpan="2" className="border px-4 py-2">หมายเหตุ <br /><span className="text-xs text-gray-500">Note</span></th>
              </tr>
              <tr className="bg-green-100 text-gray-900 text-center">
                <th rowSpan="2" className="border px-4 py-2">เบอร์ <br /><span className="text-xs text-gray-500">Quantity</span></th>
                <th rowSpan="2" className="border px-4 py-2">รุ่น <br /><span className="text-xs text-gray-500">Unit</span></th>
                <th rowSpan="2" className="border px-4 py-2">สี <br /><span className="text-xs text-gray-500">Unit</span></th>
                <th rowSpan="2" className="border px-4 py-2">ขนาด <br /><span className="text-xs text-gray-500">Unit</span></th>
                <th className="border px-4 py-2">รับ <br /><span className="text-xs text-gray-500">Receive</span></th>
                <th className="border px-4 py-2">ส่ง <br /><span className="text-xs text-gray-500">Sent</span></th>
              </tr>
            </thead>
            <tbody>
              {Array(5)
                .fill(null)
                .map((_, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border px-4 py-2 text-center">
                      <input type="checkbox" />
                    </td>
                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                    <td className="border px-4 py-2"></td>
                    <td className="border px-4 py-2"></td>
                    <td className="border px-4 py-2">
                      <div className="grid grid-cols-4 gap-2">
                        <div className="col-span-1"></div>
                        <div className="col-span-1"></div>
                        <div className="col-span-1"></div>
                        <div className="col-span-1"></div>
                      </div>
                    </td>
                    <td className="border px-4 py-2 text-center"></td>
                    <td className="border px-4 py-2 text-center"></td>
                    <td className="border px-4 py-2 text-center"></td>
                    <td className="border px-4 py-2">50</td>
                    <td className="border px-4 py-2">100</td>
                    <td className="border px-4 py-2">หมาย</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="py-4 bg-gray-100 min-h-screen">
          {/* Place of Use */}
          <div className="mb-4 p-4 border rounded-none bg-white">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <label className="block text-md font-medium w-full sm:w-1/2">
                สถานที่ใช้งาน (Place of use)
              </label>
              <div className="flex flex-row items-center space-x-4 w-full">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="place"
                    className="h-4 border-gray-300"
                  />
                  <span className="text-xs sm:text-sm">เก็บสโตร์ (Store)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="place"
                    className="h-4 border-gray-300"
                  />
                  <span className="text-xs sm:text-sm">หน่วยงาน (Units)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="place"
                    className="h-4 border-gray-300"
                  />
                  <span className="text-xs sm:text-sm">อื่นๆ (Other)</span>
                </div>
              </div>
              <input
                type="text"
                placeholder="Specify Other" 
                className="border h-10 rounded p-2 focus:outline-green-500 w-full"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-start space-x-3 my-3">
              <label className="font-medium w-full sm:w-1/3">วัตถุประสงค์ที่ใช้ (Purpose used)</label>
              <input
                type="text"
                placeholder=""
                className="border h-10 rounded p-2 focus:outline-green-500 w-full"
              />
            </div>
          </div>


          {/* Sign Name Section */}
          <div className="mb-6 p-4 border rounded bg-white">
            <div className="bg-green-100 p-2 rounded mb-4">
              <span className="font-semibold">ลงชื่อผู้ทำรายการ</span>
            </div>
            <div className="flex flex-row justify-between items-center ">
              <div className="w-1/4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="border-gray-300"
                  />
                  <span className="">อัตโนมัติ (Automatic)</span>
                </label>
              </div>
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                <input
                  type="text"
                  placeholder="ชื่อ (Name)"
                  className="border rounded p-2 w-full focus:outline-green-500"
                />
                <input
                  type="text"
                  placeholder="นามสกุล (Last Name)"
                  className="border rounded p-2 w-full focus:outline-green-500"
                />
                <input
                  type="text"
                  placeholder="ตำแหน่ง (Position)"
                  className="border rounded p-2 w-full focus:outline-green-500"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap justify-end gap-4">
            <button className="px-4 py-2 border rounded-md shadow-lg bg-gray-200 text-gray-800 hover:bg-gray-300">
              Preview
            </button>
            <button className="px-4 py-2 border rounded-md shadow-lg bg-white text-black hover:bg-gray-50">
              Clear
            </button>
            <button className="px-4 py-2 border rounded-md shadow-lg bg-green-500 text-white hover:bg-green-600">
              Confirm
            </button>
          </div>
        </div>
      </form >

    </>
  )
}

export default PurchaseData;