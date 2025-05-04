import React, { useState } from "react";
import axios from "axios";
import { _ApiSafyStock } from "../../../../api/saftyStock";
// import "./AddProductPopup.css";

export const AddSaftyStockPopup = ({ onClose , reloadData }) => {
  const [formData, setFormData] = useState({
    category: "",
    sku: "",
    productName: "",
    remark: "",
    image: null,
    details: {
      number: "",
      model: "",
      color: "",
      size: "",
      quantity: "",
      unit: "",
      costPrice: "",
    },
    storageLocation: "",
    purchaseDate: "",
    expirationDate: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.details) {
      setFormData((prevState) => ({
        ...prevState,
        details: { ...prevState.details, [name]: value },
      }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevState) => ({ ...prevState, image: file }));
    }
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();

    // ✅ Append ข้อมูลสินค้า
    formDataToSend.append("product_category", formData.category || "");
    formDataToSend.append("product_code", formData.sku || "");
    formDataToSend.append("product_list", formData.productName || "");
    formDataToSend.append("remark", formData.remark || "");
    formDataToSend.append("number", formData.details.number || 0);
    formDataToSend.append("model", formData.details.model || "");
    formDataToSend.append("color", formData.details.color || "");
    formDataToSend.append("size", formData.details.size || "");
    formDataToSend.append("qty", formData.details.quantity || 0);
    formDataToSend.append("unit", formData.details.unit || "");
    formDataToSend.append("cost_price", formData.details.costPrice || 0);
    formDataToSend.append("storage_location", formData.storageLocation || "");
    formDataToSend.append("date_purchase", formData.purchaseDate || null);
    formDataToSend.append("date_expiration", formData.expirationDate || null);
    formDataToSend.append("product_status", formData.status || "");

    // ✅ Append รูปภาพถ้ามี
    if (formData.image) {
        formDataToSend.append("url_Image_product", formData.image);
    }
    // Log ข้อมูลทั้งหมดใน formDataToSend
for (let pair of formDataToSend.entries()) {
    console.log(pair[0] + ": " + pair[1]);
}
// return
    try {
        const response = await _ApiSafyStock().Create(formDataToSend);
        if (response.success === true) {
            alert("✅ เพิ่มสินค้าสำเร็จ!");
            onClose(); // ปิด Popup
            reloadData();
        } else {
            alert("❌ เกิดข้อผิดพลาดในการเพิ่มสินค้า");
        }
    } catch (error) {
        console.error("❌ Error submitting the form:", error);
        alert("❌ Failed to add product.");
    }
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white border rounded-lg p-6 w-full max-w-4xl shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-blue-800">เพิ่ม (Safety Stock)</h2>
        <div className="grid grid-cols-12 gap-4">
          {/* Image Upload */}
          <div className="col-span-12 md:col-span-4 flex flex-col items-center">
            <div className="w-32 h-32 border border-gray-300 flex items-center justify-center mb-4 bg-gray-100">
              {formData.image ? (
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Product"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <span className="text-gray-500">อัพโหลดภาพ</span>
              )}
            </div>
            <label className="bg-gray-300 text-sm px-4 py-1 rounded-md cursor-pointer">
              Browse
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Product Details */}
          <div className="col-span-12 md:col-span-8">
            <h3 className="font-bold text-gray-800 mb-2">ข้อมูลสินค้า</h3>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <label className="block text-sm font-medium mb-2">หมวดหมู่ <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                  placeholder="หมวดหมู่สินค้า"
                />
              </div>
              <div className="col-span-6">
                <label className="block text-sm font-medium mb-2">รหัสสินค้า <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                  placeholder="รหัสสินค้า"
                />
              </div>
              <div className="col-span-12">
                <label className="block text-sm font-medium mb-2">รายการ <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                  placeholder="ชื่อสินค้า"
                />
              </div>
            </div>
          </div>

          {/* Remarks */}
          <div className="col-span-12">
            <label className="block text-sm font-medium mb-2">หมายเหตุ</label>
            <textarea
              name="remark"
              value={formData.remark}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              placeholder="หมายเหตุ"
            />
          </div>

          {/* Product Details - Extended */}
          <div className="col-span-6">
            <label className="block text-sm font-medium mb-2">เบอร์</label>
            <input
              type="text"
              name="number"
              value={formData.details.number}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="col-span-6">
            <label className="block text-sm font-medium mb-2">รุ่น</label>
            <input
              type="text"
              name="model"
              value={formData.details.model}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="col-span-6">
            <label className="block text-sm font-medium mb-2">สี</label>
            <input
              type="text"
              name="color"
              value={formData.details.color}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="col-span-6">
            <label className="block text-sm font-medium mb-2">ขนาด</label>
            <input
              type="text"
              name="size"
              value={formData.details.size}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="col-span-6">
            <label className="block text-sm font-medium mb-2">จำนวน</label>
            <input
              type="text"
              name="quantity"
              value={formData.details.quantity}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="col-span-6">
            <label className="block text-sm font-medium mb-2">หน่วย</label>
            <input
              type="text"
              name="unit"
              value={formData.details.unit}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="col-span-6">
            <label className="block text-sm font-medium mb-2">ราคาต้นทุน (ต่อหน่วย)</label>
            <input
              type="text"
              name="costPrice"
              value={formData.details.costPrice}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>
          {/* Product Details - Extended */}
          <div className="col-span-6">
            <label className="block text-sm font-medium mb-2">สถานที่จัดเก็บ <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="storageLocation"
              value={formData.storageLocation}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              placeholder="สถานที่จัดเก็บ"
            />
          </div>
          <div className="col-span-6">
            <label className="block text-sm font-medium mb-2">วันที่ซื้อ <span className="text-red-500">*</span></label>
            <input
              type="date"
              name="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="col-span-6">
            <label className="block text-sm font-medium mb-2">วันหมดอายุ <span className="text-red-500">*</span></label>
            <input
              type="date"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="col-span-6">
            <label className="block text-sm font-medium mb-2">สถานะสินค้า <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              placeholder="สถานะสินค้า"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};
