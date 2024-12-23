import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./print.css";

const Priceparisonform = () => {
    const [items, setItems] = useState([]);
    const [supplierHeaders, setSupplierHeaders] = useState(["ผู้จัดจำหน่าย 1", "ผู้จัดจำหน่าย 2", "ผู้จัดจำหน่าย 3"]);
    const [formInput, setFormInput] = useState({
        productName: "",
        suppliers: [
            { seller: "", price: "", remark: "" },
            { seller: "", price: "", remark: "" },
            { seller: "", price: "", remark: "" },
        ],
        comment: "",
        files: [], // ใช้ array เก็บไฟล์ที่แนบ
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (field, value) => {
        setFormInput({ ...formInput, [field]: value });
        if (errors[field]) setErrors({ ...errors, [field]: null });
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files); // รับไฟล์ที่เลือกทั้งหมด
        setFormInput({ ...formInput, files: [...formInput.files, ...selectedFiles] }); // เพิ่มไฟล์ลงใน array
    };

    const handleRemoveFile = (index) => {
        const updatedFiles = formInput.files.filter((_, i) => i !== index);
        setFormInput({ ...formInput, files: updatedFiles });
    };

    const handleSupplierChange = (index, field, value) => {
        const updatedSuppliers = formInput.suppliers.map((supplier, i) =>
            i === index ? { ...supplier, [field]: value } : supplier
        );

        const updatedHeaders = supplierHeaders.map((header, i) =>
            i === index && field === "seller" && value.trim() !== "" ? value : header
        );

        setSupplierHeaders(updatedHeaders); // อัปเดตหัวตาราง
        setFormInput({ ...formInput, suppliers: updatedSuppliers });

        if (errors[`supplier_${index}_${field}`]) {
            setErrors({ ...errors, [`supplier_${index}_${field}`]: null });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formInput.productName.trim()) newErrors.productName = "กรุณากรอกชื่อสินค้า";
        formInput.suppliers.forEach((supplier, index) => {
            if (!supplier.seller.trim()) newErrors[`supplier_${index}_seller`] = `กรุณากรอกชื่อผู้จำหน่าย ${index + 1}`;
            if (!supplier.price.trim()) newErrors[`supplier_${index}_price`] = `กรุณากรอกราคา ${index + 1}`;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const addItemToTable = () => {
        if (!validateForm()) return;
        setItems([...items, { ...formInput, id: items.length + 1 }]);
        setFormInput({
            productName: "",
            suppliers: formInput.suppliers.map(() => ({
                seller: "", price: "", remark: "",
            })),
            comment: "",
            files: [], // รีเซ็ตไฟล์
        });
    };

    const handleDeleteItem = (id) => setItems(items.filter((item) => item.id !== id));

    const resetForm = () => {
        setFormInput({
            productName: "",
            suppliers: [
                { seller: "", price: "", remark: "" },
                { seller: "", price: "", remark: "" },
                { seller: "", price: "", remark: "" },
            ],
            comment: "",
            files: [],
        });
        setSupplierHeaders(["ผู้จัดจำหน่าย 1", "ผู้จัดจำหน่าย 2", "ผู้จัดจำหน่าย 3"]); // รีเซ็ตหัวตาราง
        setItems([]);
    };

    const generatePDF = () => {
        const input = document.getElementById("table-to-pdf");
        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("comparison_table.pdf");
        });
    };

    const handlePrint = () => window.print();

    return (
        <div className="min-h-screen bg-gray-100 space-y-4 p-4">
            <h2 className="text-center text-xl mb-4">ฟอร์มกรอกข้อมูลเปรียบเทียบราคา</h2>

            {/* ฟอร์มกรอกข้อมูล */}
            <div className="border rounded-md shadow-lg p-4 bg-white">
                <h3 className="text-lg font-semibold mb-4">กรอกข้อมูลสินค้า *</h3>
                <div className="mb-4">
                    <label className="text-lg">รายการสินค้า:</label>
                    <input
                        type="text"
                        value={formInput.productName}
                        onChange={(e) => handleInputChange("productName", e.target.value)}
                        className={`border rounded p-2 w-full ${errors.productName ? "border-red-500" : "border-gray-300"}`}
                    />
                </div>
                {formInput.suppliers.map((supplier, index) => (
                    <div key={index} className="flex space-x-4 mb-2">
                        <input
                            type="text"
                            placeholder={`ผู้จัดจำหน่าย ${index + 1}`}
                            value={supplier.seller}
                            onChange={(e) => handleSupplierChange(index, "seller", e.target.value)}
                            className="border rounded p-2 w-1/3"
                        />
                        <input
                            type="number"
                            placeholder="ราคา"
                            value={supplier.price}
                            onChange={(e) => handleSupplierChange(index, "price", e.target.value)}
                            className="border rounded p-2 w-1/3"
                        />
                        <input
                            type="text"
                            placeholder="หมายเหตุ"
                            value={supplier.remark}
                            onChange={(e) => handleSupplierChange(index, "remark", e.target.value)}
                            className="border rounded p-2 w-1/3"
                        />
                    </div>
                ))}
                <div className="mb-4">
                    <label className="text-lg">แนบไฟล์เอกสารที่เกี่ยวข้อง:</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="border rounded p-2 w-full"
                    />
                    <ul className="mt-2">
                        {formInput.files.map((file, index) => (
                            <li key={index} className="flex items-center space-x-2">
                                <span>{file.name}</span>
                                <button
                                    type="button"
                                    className="text-red-500"
                                    onClick={() => handleRemoveFile(index)}
                                >
                                    ลบ
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex space-x-4">
                    <button onClick={addItemToTable} className="bg-green-500 text-white px-4 py-2 rounded">เพิ่มรายการ</button>
                    <button onClick={resetForm} className="bg-red-500 text-white px-4 py-2 rounded">รีเซ็ตข้อมูล</button>
                </div>
            </div>

            {/* ตาราง */}
            <div id="table-to-pdf" className="bg-white p-4 rounded shadow-lg">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">ลำดับ</th>
                            <th className="border p-2">รายการสินค้า</th>
                            {supplierHeaders.map((header, i) => (
                                <th key={i} className="border p-2 text-center">{header}</th>
                            ))}
                            <th className="border p-2">หมายเหตุ</th>
                            <th className="border p-2">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td className="border p-2 text-center">{index + 1}</td>
                                <td className="border p-2">{item.productName}</td>
                                {item.suppliers.map((supplier, i) => (
                                    <td key={i} className="border p-2 text-center">
                                        ราคา: {supplier.price || "-"} <br />
                                        Remark {supplier.remark || ""}
                                    </td>
                                ))}
                                <td className="border p-2">{item.comment || "-"}</td>
                                <td className="border p-2 text-center">
                                    <button
                                        onClick={() => handleDeleteItem(item.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        ลบ
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ปุ่ม */}
            <div className="flex justify-end space-x-4 mt-4 no-print">
                <button onClick={handlePrint} className="bg-blue-500 text-white px-4 py-2 rounded">พิมพ์เอกสาร </button>
                <button onClick={generatePDF} className="bg-green-500 text-white px-4 py-2 rounded">ดาวน์โหลด PDF</button>
            </div>
        </div>
    );
};

export default Priceparisonform;