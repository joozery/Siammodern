import React from "react";
import "./PurchasePreview.css";

const PurchasePreview = ({ onClose }) => {
  return (
    <div className="purchase-preview-overlay">
      <div className="purchase-preview-container">
        {/* Popup Header */}
        <div className="purchase-preview-header">
          <h2 className="purchase-preview-title">Preview Purchase Requisition</h2>
          <button onClick={onClose} className="close-button">
            ✕
          </button>
        </div>

        {/* Popup Content */}
        <div className="purchase-preview-content">
          <h3 className="purchase-preview-subtitle">
            ใบขอซื้อเลขที่: <span className="font-normal">19346</span>
          </h3>
          <table className="purchase-preview-table">
            <thead>
              <tr>
                <th>ลำดับที่</th>
                <th>รหัสสินค้า</th>
                <th>รายการ</th>
                <th>จำนวน</th>
                <th>หน่วย</th>
              </tr>
            </thead>
            <tbody>
              {Array(3)
                .fill(null)
                .map((_, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>SCH40</td>
                    <td>ท่อเหล็ก</td>
                    <td>10</td>
                    <td>เส้น</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Popup Footer */}
        <div className="purchase-preview-footer">
          <button onClick={onClose} className="purchase-preview-close-button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchasePreview;
