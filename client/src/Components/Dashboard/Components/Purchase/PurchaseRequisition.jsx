import React from "react";

function PurchaseRequisition({ formData }) {
  return (
    <div
      style={{
        width: "297mm", // A4 width
        height: "105mm", // Half of A4 height
        margin: "20px auto",
        padding: "20mm",
        backgroundColor: "white",
        border: "1px solid #ddd",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <h1 style={{ margin: "0", fontSize: "18px" }}>
          ใบขอซื้อ PURCHASE REQUISITION
        </h1>
        <p style={{ margin: "5px 0", fontSize: "14px" }}>
          เลขที่ใบขอซื้อ: {formData.prNo} &nbsp;&nbsp;&nbsp; วันที่ต้องการ: {formData.desiredDate}
        </p>
        <p style={{ margin: "5px 0", fontSize: "14px" }}>
          หน่วยงานที่ขอซื้อ: {formData.agency} &nbsp;&nbsp;&nbsp; วัตถุประสงค์: {formData.purpose}
        </p>
      </div>

      {/* Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "10px",
          fontSize: "12px",
        }}
      >
        <thead>
          <tr>
            <th style={styles.th}>ลำดับ</th>
            <th style={styles.th}>รหัสสินค้า</th>
            <th style={styles.th}>รายการ</th>
            <th style={styles.th}>รายละเอียด</th>
            <th style={styles.th}>จำนวน</th>
            <th style={styles.th}>หน่วย</th>
            <th style={styles.th}>หมายเหตุ</th>
          </tr>
        </thead>
        <tbody>
          {formData.items.map((item, index) => (
            <tr key={index}>
              <td style={styles.td}>{index + 1}</td>
              <td style={styles.td}>{item.code}</td>
              <td style={styles.td}>{item.name}</td>
              <td style={styles.td}>{item.details}</td>
              <td style={styles.td}>{item.quantity}</td>
              <td style={styles.td}>{item.unit}</td>
              <td style={styles.td}>{item.note}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Additional Information */}
      <div style={{ marginTop: "20px", fontSize: "12px" }}>
        <p>สถานที่ใช้งาน (Place of use): {formData.placeOfUse}</p>
        <p>วัตถุประสงค์ที่ใช้ (Purpose used): {formData.purposeUsed}</p>
      </div>

      {/* Signatures */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <div style={styles.signature}>
          ผู้ขอซื้อ
          <span style={styles.signatureLine}>{formData.requester}</span>
        </div>
        <div style={styles.signature}>
          หัวหน้าหน่วยงาน
          <span style={styles.signatureLine}>{formData.departmentHead}</span>
        </div>
        <div style={styles.signature}>
          เจ้าหน้าที่จัดซื้อ
          <span style={styles.signatureLine}>{formData.purchasingStaff}</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  th: {
    border: "1px solid #000",
    padding: "5px",
    textAlign: "center",
  },
  td: {
    border: "1px solid #000",
    padding: "5px",
    textAlign: "center",
  },
  signature: {
    textAlign: "center",
    fontSize: "12px",
    width: "30%",
  },
  signatureLine: {
    display: "block",
    marginTop: "50px",
    borderTop: "1px solid #000",
  },
};

export default PurchaseRequisition;
