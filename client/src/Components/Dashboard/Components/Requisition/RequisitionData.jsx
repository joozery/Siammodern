import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";

const RequisitionData = () => {
    return (
        <>
            {/* <!-- Form --> */}
            <form className="">
                <div className="w-full bg-white rounded-none border border-gray-300 shadow-md">
                    <div className="bg-green-100 px-4 h-16 flex items-center mb-6">
                        <h1 className="text-lg sm:text-xl font-bold text-gray-800">ใบเบิกพัสดุ/วัตถุดิบ/สินค้าสำเร็จรูป</h1>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 p-2 sm:p-6 sm:pt-2 gap-5">
                        {/* <!-- Left Section --> */}
                        <div className="flex flex-row">
                            <label for="pr-no" className="w-1/3 block text-gray-700 font-medium">หน่วยงานที่เบิก</label>
                            <input type="text" id="pr-no" name="pr-no" className="w-full h-10 px-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
                        </div>
                        <div className="flex flex-row">
                            <label for="doc-code" className="w-1/3 block text-gray-700 font-medium">รหัสหน่วยงาน</label>
                            <input type="text" id="pr-no" name="pr-no" className="w-full h-10 px-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
                        </div>
                        <div className="flex flex-row">
                            <label for="pr-no" className="w-1/3 block text-gray-700 font-medium">รหัสเอกสาร</label>
                            <select id="doc-code" name="doc-code"
                                className="w-full h-10 px-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500">
                                <option value="">Select</option>
                            </select>
                        </div>
                        <div className="flex flex-row">
                            <label for="pr-no" className="w-1/3 block text-gray-700 font-medium">แก้ไขครั้งที่</label>
                            <select id="doc-code" name="doc-code"
                                className="w-full h-10 px-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500">
                                <option value="">Select</option>
                            </select>
                        </div>

                        <div className="flex flex-row">
                            <label for="desired-date" className="w-1/3 block text-gray-700 font-medium">ต้องการใช้</label>
                            <input type="date" id="desired-date" name="desired-date" value="2024-08-20"
                                className="w-full h-10 px-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
                        </div>
                        <div className="flex flex-row">
                            <label for="desired-date" className="w-1/3 block text-gray-700 font-medium">สามารถเบิกได้</label>
                            <input type="date" id="desired-date" name="desired-date" value="2024-08-20"
                                className="w-full h-10 px-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
                        </div>
                        <div className="flex flex-row">
                            <label for="revision" className="w-1/3 block text-gray-700 font-medium">วันที่รับ</label>
                            <select id="revision" name="revision"
                                className="w-full h-10 px-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500">
                                <option value="">Select</option>
                            </select>
                        </div>

                        <div className="flex flex-row">
                            <label for="effective-date" className="w-1/3 block text-gray-700 font-medium">เล่มที่</label>
                            <input type="date" id="effective-date" name="effective-date" value="2024-08-20" className="w-full h-10 px-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
                        </div>
                        <div className="flex flex-row">
                            <label for="effective-date" className="w-1/3 block text-gray-700 font-medium">เลขที่</label>
                            <input type="date" id="effective-date" name="effective-date" value="2024-08-20" className="w-full h-10 px-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
                        </div>
                        <div className="flex flex-row">
                            <label for="agency" className="w-1/3 block text-gray-700 font-medium">No.ตัด บ/ช คลังสินค้า</label>
                            <input type="text" id="agency" name="agency"
                                className="w-full h-10 px-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
                        </div>
                    </div>
                </div>

                {/* ส่วนเลือกสินค้า */}
                <div className="bg-gray-100 pt-4">
                    <div className="w-full border border-gray-300 bg-white p-2 sm:p-6 rounded-none shadow-md">
                        <div className="border-b-2 pb-4 mb-6">
                            <h1 className="text-xl font-bold text-gray-800">เลือกรายการสินค้า</h1>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Left Section */}
                            <div className="col-span-2 space-y-4">
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
                                        <label className="block text-gray-700 font-medium">จำนวนเบิก</label>
                                        <input type="text" className="w-full border p-2 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-medium">หน่วย</label>
                                        <input type="text" className="w-full border p-2 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label className="block text-gray-700 font-medium">Pm,Bm,Cm EA,PA</label>
                                        <input type="text" className="w-full border p-2 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-medium">วัตถุประสงค์หรือรายละเอียดที่ต้องใช้</label>
                                        <input type="text" className="w-full border p-2 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
                                    </div>
                                </div>

                                {/* <div className="flex space-x-3"> */}
                                {/* <label className="text-gray-700 font-medium">ยอดแสดงการรับ</label>
                                    <label className="text-gray-700 font-medium">รับ</label>
                                    <input type="text" className="border border-gray-300 p-2 w-20 rounded-md shadow-sm" />
                                    <label className="text-gray-700 font-medium">ส่ง</label>
                                    <input type="text" className="border border-gray-300 p-2 w-20 rounded-md shadow-sm" /> */}
                                <label className="flex items-center space-x-2">
                                    <input type="radio" name="refund" value="refund" className="text-green-600 focus:ring-green-500" />
                                    <span>ไม่ต้องคืนซาก</span>
                                </label>
                                <label className="items-center space-x-2 mt-2 space-y-2">
                                    <input type="radio" name="not-refund" value="not-refund" className="text-green-600 focus:ring-green-500" />
                                    <span>คืนซาก</span>
                                </label>
                                <div className="grid grid-cols-3 px-2">
                                    <span className="">มีซาก</span>
                                    <input type="text" value="" className="w-24 h-10 border p-2 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
                                </div>
                                <div className="grid grid-cols-3 px-2">
                                    <span>ออกใบตาม</span>
                                    <input type="text" value="" className="w-24 h-10 border p-2 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
                                </div>
                                {/* </div> */}
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
                                <div className="mt-2">
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
                                <th rowSpan="2" className="border px-4 py-2">รหัสสินค้า</th>
                                <th rowSpan="2" className="border px-4 py-2">ชื่อสินค้า</th>
                                <th rowSpan="2" className="border px-4 py-2">จำนวน</th>
                                <th rowSpan="2" className="border px-4 py-2">หน่วย</th>
                                <th rowSpan="2" className="border px-4 py-2">Pm,Bm,CmEA,PA</th>
                                <th rowSpan="2" className="border px-4 py-2">วัตถุประสงค์หรือรายละเอียดที่ใช้</th>
                                <th rowSpan="2" className="border px-4 py-2">ไม่ต้องคืนซาก</th>
                                <th colSpan="2" className="border px-4 py-2">คืนซาก</th>
                            </tr>
                            <tr className="bg-green-100 text-gray-900 text-center">
                                <th className="border px-4 py-2">มีซาก</th>
                                <th className="border px-4 py-2">ออกใบตาม</th>
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
                                        <td className="border px-4 py-2 text-center"></td>
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
                                        <td className="border px-4 py-2"></td>
                                        <td className="border px-4 py-2"></td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>


                <div className="py-4">
                    <div className="bg-green-100 p-2 rounded">
                        <span className="font-semibold">ลงชื่อผู้ทำรายการ</span>
                    </div>
                    <div className="flex mb-4 p-4 p border border-t-0 rounded-none bg-white">
                        <div className="flex flex-wrap gap-4 items-center">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 border-gray-300"
                                />
                                <span>อัตโนมัติ (Automatic)</span>
                            </label>
                            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                                <input
                                    type="text"
                                    placeholder="ชื่อ (Name)"
                                    className="border h-10 rounded p-2 w-full md:w-40 lg:w-60 focus:outline-green-500"
                                />
                                <input
                                    type="text"
                                    placeholder="นามสกุล (Last Name)"
                                    className="border h-10 rounded p-2 w-full md:w-40 lg:w-60 focus:outline-green-500"
                                />
                                <input
                                    type="text"
                                    placeholder="ตำแหน่ง (Position)"
                                    className="border h-10 rounded p-2 w-full md:w-40 lg:w-60 focus:outline-green-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-wrap justify-end gap-3">
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
            </form>
        </>
    )
}

export default RequisitionData