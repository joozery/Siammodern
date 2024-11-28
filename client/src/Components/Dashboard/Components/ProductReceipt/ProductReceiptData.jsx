import React from "react"
import { useState } from "react";



const ProductReceiptData = () => {

    const [fileName, setFileName] = useState("Choose File");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFileName(file ? file.name : "Choose File");
    };


    return (
        <>
            {/* <!-- Form --> */}
            <form className="">
                <div className="w-full bg-white rounded-none border border-gray-300 shadow-md">
                    <div className="bg-green-100 px-4 h-16 flex items-center mb-6">
                        <h1 className="text-lg sm:text-xl font-bold text-gray-800">ใบตรวจรับสินค้าและแจ้งการชำระเงิน</h1>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 p-2 sm:p-6 sm:pt-2 gap-3">
                        {/* <!-- Left Section --> */}
                        <div className="flex flex-row">
                            <label for="desired-date" className="w-1/2 sm:w-1/3 block text-gray-700 font-medium">วันที่</label>
                            <input type="date" id="desired-date" name="desired-date" value="2024-08-20"
                                className="w-full h-10 px-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
                        </div>
                        <div className="flex flex-row">
                            <label for="pr-no" className="w-1/2 sm:w-1/3 block text-gray-700 font-medium">รหัสเอกสาร</label>
                            <select id="revision" name="revision"
                                className="w-full h-10 px-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500">
                                <option value="">Select</option>
                            </select>
                        </div>
                        <div className="flex flex-row">
                            <label for="doc-code" className="w-1/3 block text-gray-700 font-medium">ถึง</label>
                            <label value={'แผนกบัญชีและการเงิน'}>แผนกบัญชีและการเงิน</label>
                        </div>

                        <div className="flex flex-row">
                            <label for="desired-date" className="w-1/2 sm:w-1/3 block text-gray-700 font-medium">แก้ไขครั้งที่</label>
                            <select id="revision" name="revision"
                                className="w-full h-10 px-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500">
                                <option value="">Select</option>
                            </select>
                        </div>
                        <div className="flex flex-row">
                            <label for="revision" className="w-1/3 block text-gray-700 font-medium">เรื่อง</label>
                            <label value={'แจ้งการชำระเงิน'}>แจ้งการชำระเงิน</label>
                        </div>
                        <div className="flex flex-row">
                            <label for="effective-date" className="w-1/2 sm:w-1/3 block text-gray-700 font-medium">วันที่บังคับใช้</label>
                            <input type="date" id="effective-date" name="effective-date" value="2024-08-20" className="w-full h-10 px-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row p-2 sm:p-6 lg:pt-1 space-y-4 sm:space-y-0 sm:space-x-5">
                        <div className="flex justify-start w-full sm:w-1/3 lg:w-auto">
                            <span for="agency" className="block text-gray-700 font-medium">อ้างถึง</span>
                        </div>
                        <div className="space-x-4">
                            <label >ใบขอซื้อเลขที่</label>
                            <input type="text" id="agency" name="agency"
                                className="h-10 px-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
                        </div>
                        <div className="space-x-4">
                            <label >ใบสั่งซื้อเลขที่</label>
                            <input type="text" id="agency" name="agency"
                                className="h-10 px-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
                        </div>
                    </div>

                    <div className="flex p-2 md:p-6 md:pt-0 space-x-3 pb-5 sm:space-y-0 sm:space-x-4">
                        <label for="desired-date" className="w-auto block text-gray-700 font-medium">ลงวันที่</label>
                        <input type="date" id="desired-date" name="desired-date" value="2024-08-20"
                            className="w-auto h-10 px-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
                    </div>


                </div>
                {/* หน่วยงานเจ้าของโครงการตรวจรับงาน/ตรวจรับสินค้า */}
                <div className="bg-gray-100 py-4">
                    <div className="w-full border border-gray-300 bg-white p-2 sm:p-6 rounded-none shadow-md">
                        <div className="border-b-2 pb-4 mb-6">
                            <h1 className="text-md sm:text-xl font-bold text-gray-800">หน่วยงานเจ้าของโครงการตรวจรับงาน/ตรวจรับสินค้า</h1>
                        </div>

                        {/* <!-- Purpose Section --> */}
                        <div className="p-2 md:p-6 md:pt-0 ">
                            <div className="flex space-x-4">
                                <label className="w-1/3 block text-gray-700 font-medium">วัตถุประสงค์ในการ</label>
                                <input type="text" className="border h-10 w-full rounded-md" />
                            </div>
                            <div className="w-full space-y-3 mt-4">
                                <label className="flex items-center space-x-2">
                                    <input type="radio" name="purpose" value="buy" className="text-green-600 focus:ring-green-500" />
                                    <span>ซื้อ (Buy)</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input type="radio" name="purpose" value="build" className="text-green-600 focus:ring-green-500" />
                                    <span>สร้าง (Build)</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input type="radio" name="purpose" value="repair" className="text-green-600 focus:ring-green-500" />
                                    <span>ซ่อม (Repair)</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-100 mb-10">
                    <div className="border bg-white px-4 py-3">
                        <span className="text-lg font-medium">รูปภาพ</span>
                    </div>
                    <div className="w-full border border-t-0 bg-white p-2 sm:p-6 rounded-none shadow-md space-y-4">
                        {/* brfore  */}
                        <div className="mb-2">
                            <label className="">ภาพ Before</label>
                            <div className="relative flex items-center w-full max-w-md border rounded-md bg-gray-50 px-4 py-2 my-2 text-sm text-gray-500">
                                {/* File input */}
                                <input
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={handleFileChange}
                                />
                                {/* File name */}
                                <span className="truncate">{fileName}</span>
                                {/* Browse button */}
                                <span className="ml-auto px-3 py-1 text-white bg-gray-200 rounded-md border border-gray-300 text-sm">
                                    Browse
                                </span>
                            </div>
                        </div>
                        {/* after */}
                        <div className="mb-2">
                            <label className="">ภาพ After</label>
                            <div className="relative flex items-center w-full max-w-md border rounded-md bg-gray-50 px-4 py-2 my-2 text-sm text-gray-500">
                                {/* File input */}
                                <input
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={handleFileChange}
                                />
                                {/* File name */}
                                <span className="truncate">{fileName}</span>
                                {/* Browse button */}
                                <span className="ml-auto px-3 py-1 text-white bg-gray-200 rounded-md border border-gray-300 text-sm">
                                    Browse
                                </span>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Sign Name Section */}

                <div className="bg-green-100 p-2 rounded">
                    <span className="font-semibold">ลงชื่อผู้ทำรายการ</span>
                </div>
                <div className="flex mb-6 p-4 p border border-t-0 rounded-none bg-white">
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
            </form >

        </>
    )
}

export default ProductReceiptData;