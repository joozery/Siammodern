//ทำให้ใช้ Pagenation ได้
import React, { useState } from "react";

const ReceivingPurchaseHistoryData = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // จำนวนรายการต่อหน้า
    const totalItems = 50; // จำนวนรายการทั้งหมด (สมมุติ)
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const dataList = [
        {
            id: 1,
            date1: "27/08/67",
            number: "fs-p-005",
            date2: "03/09/67",
            itemlist: "มอเตอร์พัด",
            files: [
                { name: "file1.pdf", url: "https://example.com/file1.pdf" },
                { name: "file2.pdf", url: "https://example.com/file2.pdf" },
                { name: "file3.pdf", url: "https://example.com/file3.pdf" },
            ],
            plan: "วิศวกรรม",
            fileCount: 3,
            status: "รอการอนุมัติ",
            view: "เปิดไฟล์",
        },
        {
            id: 2,
            date1: "27/08/67",
            number: "fs-p-005",
            date2: "03/09/67",
            itemlist: "มอเตอร์พัด",
            files: [
                { name: "file4.pdf", url: "https://example.com/file4.pdf" },
                { name: "file5.pdf", url: "https://example.com/file5.pdf" },
                { name: "file6.pdf", url: "https://example.com/file6.pdf" },
            ],
            plan: "วิศวกรรม",
            fileCount: 3,
            status: "อนุมัติแล้ว",
            view: "เส้น",
        },
    ];

    // คำนวณรายการที่ต้องแสดงในแต่ละหน้า
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = dataList.slice(startIndex, startIndex + itemsPerPage);
    // const currentItems = dataList

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
                <div className="text-xl font-bold mb-3">ประวัติเปรียบเทียบราคา</div>
            </div>

            {/* Table */}
            <div className="bg-white shadow-md overflow-x-auto">
                <table className="table-siammodern table-auto text-left border-collapse w-full">
                    <thead className="text-sm">
                        <tr className="bg-green-300">
                            <th colSpan="13" className="border-b py-2 px-4 text-start py-3 text-2xl">ประวัติเปรียบเทียบราคา</th>
                        </tr>
                        <tr className="bg-gray-100">
                            {/* <th>
                <input
                  type="checkbox"
                  className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
              </th> */}
                            <th className="">ลำดับที่</th>
                            <th className="">ว.ด.ป.</th>
                            <th className="">เลขที่ PR</th>
                            <th className="">ว.ด.ป.</th>
                            <th className="">รายการ</th>
                            <th className="">เอกสารประกอบ</th>
                            <th className="">แผนก</th>
                            <th className="">จำนวนเอกสาร</th>
                            <th className="">ดูรายการ</th>
                            <th className="">สถานะ</th>
                        </tr>
                    </thead>
                    <tbody className="text-center text-sm">
                        {dataList.map((item) => (
                            <tr key={item.id}>
                                {/* <td>
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                </td> */}
                                <td className=" whitespace-nowrap">{item.id}</td>
                                <td className=" whitespace-nowrap">{item.date1}</td>
                                <td className=" whitespace-nowrap">{item.number}</td>
                                <td className=" whitespace-nowrap">{item.date2}</td>
                                <td className=" whitespace-nowrap">{item.itemlist}</td>
                                <td className=" whitespace-nowrap flex justify-center">
                                    {item.files.map((file, index) => (
                                        <a
                                            key={index}
                                            href={file.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title={file.name}
                                            style={{ marginRight: "8px", textDecoration: "none", color: "red" }}
                                        >
                                            {/* <img src={IconPDF}/> */}
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625Z" />
                                                <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                                            </svg>

                                        </a>
                                    ))}
                                </td>
                                <td className=" whitespace-nowrap">{item.plan}</td>
                                <td className=" whitespace-nowrap">{item.fileCount}</td>  
                                <td className=" whitespace-nowrap">{item.view}</td>
                                <td className=" whitespace-nowrap">
                                    <span
                                        className={`font-medium ${item.status === "อนุมัติแล้ว" ? "text-green-500" : "text-yellow-500"
                                            }`}
                                    >
                                        {item.status}
                                    </span>
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

export default ReceivingPurchaseHistoryData;

