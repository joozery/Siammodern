import React, { useState } from "react";
import PropTypes from "prop-types";

const Pagination = ({ data, rowsPerPage, children }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  return (
    <div>
      {/* แสดงผลผ่าน render-prop */}
      {children(currentItems, currentPage, rowsPerPage)}

      {/* ปุ่ม Pagination */}
      <div className="flex justify-center space-x-2 py-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="h-8 px-3 text-sm bg-gray-300 rounded disabled:opacity-50 flex items-center"
        >
          ก่อน
        </button>

        <span className="px-2 py-1 text-gray-600">
          {currentPage} / {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="h-8 px-3 text-sm bg-gray-300 rounded disabled:opacity-50 flex items-center"
        >
          ถัดไป
        </button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  data: PropTypes.array.isRequired,
  rowsPerPage: PropTypes.number,
  children: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  rowsPerPage: 10,
};

export default Pagination;
