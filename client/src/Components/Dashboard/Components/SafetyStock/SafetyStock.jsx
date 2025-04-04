import React from "react";

const SafetyStock = () => {
  return (
    <div className="flex flex-col p-6 w-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">📦 Safety Stock Management</h1>
      <p className="text-gray-600">
        ตรวจสอบระดับสินค้าคงคลังและปรับปรุงปริมาณ Safety Stock ให้เหมาะสม.
      </p>

      {/* ✅ ตารางข้อมูล Safety Stock */}
      <div className="bg-white shadow-md rounded-lg p-4 mt-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border text-left">รหัสสินค้า</th>
              <th className="p-2 border text-left">ชื่อสินค้า</th>
              <th className="p-2 border text-left">จำนวนคงเหลือ</th>
              <th className="p-2 border text-left">Safety Stock</th>
              <th className="p-2 border text-left">สถานะ</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100 transition">
              <td className="p-3 border">ST-001</td>
              <td className="p-3 border">ถุงมือกันสารเคมี</td>
              <td className="p-3 border">50</td>
              <td className="p-3 border">30</td>
              <td className="p-3 border text-green-600">✅ เพียงพอ</td>
            </tr>
            <tr className="hover:bg-gray-100 transition">
              <td className="p-3 border">ST-002</td>
              <td className="p-3 border">หน้ากากกันฝุ่น</td>
              <td className="p-3 border">10</td>
              <td className="p-3 border">20</td>
              <td className="p-3 border text-red-500">⚠ ต่ำกว่าระดับ Safety Stock</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SafetyStock;