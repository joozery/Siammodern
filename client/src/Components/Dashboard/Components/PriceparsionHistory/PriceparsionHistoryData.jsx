import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ReceivingPurchaseHistoryData = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataList, setDataList] = useState([]);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(dataList.length / itemsPerPage);

  const navigate = useNavigate();
  const handleViewDetails = (id) => {
    navigate(`/PriceparsionEdit`, { state: { id } });
  };

  const GetData = async () => {
    try {
      const response = await fetch(
        "https://servsiam-backend-a61de3db6766.herokuapp.com/api/compare_prices/all",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setDataList(result.data); // data is already an array
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    GetData();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = dataList.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 space-y-2">
      <div className="border-b border-black mb-5">
        <div className="text-xl font-bold mb-3">ประวัติเปรียบเทียบราคา</div>
      </div>

      <div className="bg-white shadow-md overflow-x-auto">
        <table className="table-siammodern table-auto text-left border-collapse w-full">
          <thead className="text-sm">
            <tr className="bg-green-300">
              <th
                colSpan="10"
                className="border-b py-2 px-4 text-start py-3 text-2xl"
              >
                ประวัติเปรียบเทียบราคา
              </th>
            </tr>
            <tr className="bg-gray-100">
              <th>ลำดับที่</th>
              <th>วันที่สร้าง</th>
              <th>เลขที่เอกสาร</th>
              <th>วันที่อนุมัติ</th>
              <th>รายการ</th>
              <th>เอกสารประกอบ</th>
              <th>แผนก</th>
              <th>ดูรายการ</th>
              <th>สถานะ</th>
            </tr>
          </thead>
          <tbody className="text-center text-sm">
            {currentPageData.map((item, index) => (
              <tr key={item.id}>
                <td>{startIndex + index + 1}</td>
                <td>{item.createdAt}</td>
                <td>{item.documentNo}</td>
                <td>-</td>
                <td></td>
                {/* <td>{item.purchasingDate?.slice(0, 10)}</td>
                <td>{item.managerDate?.slice(0, 10)}</td>
                <td>{item.departmentHeadDate?.slice(0, 10)}</td> */}
                <td className="flex justify-center space-x-1">
                  {[item.files1, item.files2, item.files3].map((file, idx) => (
                    <a
                      key={idx}
                      href={file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-500"
                      title={`ไฟล์ ${idx + 1}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625Z" />
                        <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                      </svg>
                    </a>
                  ))}
                </td>
                <td>{item.department}</td>
                <td>
                  <div className="flex justify-center gap-2">
                  <div
                    className="underline text-green-600 cursor-pointer"
                    onClick={() => handleViewDetails(item.id)}
                  >
                    แก้ไข
                  </div>
                  <div
                    className="underline text-green-600 cursor-pointer"
                    onClick={() => handleViewDetails(item.id)}
                  >
                    ดูข้อมูล
                  </div>
                  </div>
                </td>
                <td>{item.status === 0 ? "รออนุมัติ" : "อนุมัติ"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center pt-2">
        <span>
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + itemsPerPage, dataList.length)} of{" "}
          {dataList.length} entries
        </span>
        <div className="flex space-x-2">
          <button
            onClick={goToPreviousPage}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={goToNextPage}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300"
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
