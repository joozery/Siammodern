import React, { useState } from "react";
import './ProductDetailPopup.css'; // สำหรับ CSS ของ Popup

const ProductDetailPopup = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
        >
          &times;
        </button>
        <h2 className="text-lg font-bold mb-4 text-gray-700">
          รหัสสินค้า {product.sku}
        </h2>
        <img
          src={product.image_path || "/placeholder-image.png"} // ใช้ภาพแทนหากไม่มี
          alt={product.product_name}
          className="w-full h-40 object-cover rounded-md mb-4"
        />
        <div>
          <h3 className="text-md font-semibold mb-2 text-gray-600">ข้อมูลสินค้า</h3>
          <p><strong>หมวดหมู่:</strong> {product.category}</p>
          <p><strong>รหัสสินค้า:</strong> {product.sku}</p>
          <p><strong>รายการ:</strong> {product.product_name}</p>
        </div>
        <div className="mt-4">
          <h3 className="text-md font-semibold mb-2 text-gray-600">รายละเอียดสินค้า</h3>
          <p><strong>เบอร์:</strong> {product.number}</p>
          <p><strong>รุ่น:</strong> {product.model}</p>
          <p><strong>สี:</strong> {product.color}</p>
          <p><strong>ขนาด:</strong> {product.size}</p>
          <p><strong>จำนวนสินค้า:</strong> {product.quantity}</p>
          <p><strong>หน่วยสินค้า:</strong> {product.unit}</p>
        </div>
        <div className="mt-4">
          <h3 className="text-md font-semibold mb-2 text-gray-600">การจัดเก็บ</h3>
          <p><strong>สถานที่จัดเก็บ:</strong> {product.storage_location}</p>
          <p><strong>หมายเลขการสั่งซื้อ:</strong> {product.remark}</p>
          <p><strong>วันที่รับเข้า:</strong> {product.purchase_date || "-"}</p>
          <p><strong>วันหมดอายุ:</strong> {product.expiration_date || "-"}</p>
        </div>
      </div>
    </div>
  );
};

const Stock = () => {
  const [products, setProducts] = useState([
    // ตัวอย่างข้อมูล
    {
      id: 1,
      sku: "0724003",
      product_name: "ท่อเหล็กดำ",
      category: "เหล็ก",
      number: "1",
      model: "A",
      color: "ดำ",
      size: "3 นิ้ว",
      quantity: 100,
      unit: "เส้น",
      storage_location: "โกดัง1",
      image_path: "/example-product.jpg",
      remark: "-",
      purchase_date: "2024-12-01",
      expiration_date: "",
    },
  ]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="flex flex-col space-y-4 bg-gray-100 min-h-screen p-6">
      <h1 className="text-xl font-bold text-gray-800">สต็อกสินค้า</h1>
      <table className="min-w-full divide-y divide-gray-200 bg-white shadow rounded-md">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              รหัสสินค้า
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              รายการสินค้า
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              จำนวน
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((product) => (
            <tr
              key={product.id}
              className="hover:bg-gray-100 cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <td className="px-4 py-2">{product.sku}</td>
              <td className="px-4 py-2">{product.product_name}</td>
              <td className="px-4 py-2">{product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedProduct && (
        <ProductDetailPopup
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default Stock;
