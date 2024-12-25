import React, { useState, useRef } from 'react';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./print.css";

const Priceparisonform = () => {
    const [items, setItems] = useState([]);
    const [isSellerDisabled, setIsSellerDisabled] = useState(false);
    const [supplierHeaders, setSupplierHeaders] = useState(["ผู้จัดจำหน่าย 1", "ผู้จัดจำหน่าย 2", "ผู้จัดจำหน่าย 3"]);
    const fileInputRefs = useRef([React.createRef(), React.createRef(), React.createRef()]);
    const [formInput, setFormInput] = useState({
        productName: "",
        documentNo: "", // เลขที่หนังสือ
        purchasingDate: "", // วันที่เจ้าหน้าที่จัดซื้อ
        departmentHeadDate: "", // วันที่หัวหน้าแผนกบริการจัดซื้อ
        managerDate: "", // วันที่ผู้จัดการฝ่าย
        suppliers: [
            { seller: "", price: "", remark: "", files: [] },
            { seller: "", price: "", remark: "", files: [] },
            { seller: "", price: "", remark: "", files: [] },
        ],
        comment: "",
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (field, value) => {
        setFormInput({ ...formInput, [field]: value });
        if (errors[field]) setErrors({ ...errors, [field]: null });
    };


    const handleFileChange = (supplierIndex, e) => {
        const selectedFiles = e.target.files;
        if (selectedFiles.length > 1) {
            alert("กรุณาเลือกไฟล์แค่ 1 ไฟล์เท่านั้น");
            e.target.value = null;
            return;
        }

        const selectedFile = selectedFiles[0];
        if (selectedFile && selectedFile.type !== "application/pdf") {
            alert("กรุณาเลือกไฟล์ PDF เท่านั้น");
            e.target.value = null;
            return;
        }

        const updatedSuppliers = formInput.suppliers.map((supplier, index) =>
            index === supplierIndex
                ? { ...supplier, files: [selectedFile] }
                : supplier
        );

        setFormInput({ ...formInput, suppliers: updatedSuppliers });
    };

    const handleRemoveFile = (supplierIndex, fileIndex) => {
        const updatedSuppliers = formInput.suppliers.map((supplier, index) =>
            index === supplierIndex
                ? { ...supplier, files: supplier.files.filter((_, i) => i !== fileIndex) }
                : supplier
        );

        if (fileInputRefs.current[supplierIndex] && fileInputRefs.current[supplierIndex].current) {
            fileInputRefs.current[supplierIndex].current.value = null;
        }

        setFormInput({ ...formInput, suppliers: updatedSuppliers });
    };

    const handleSupplierChange = (index, field, value) => {
        const updatedSuppliers = formInput.suppliers.map((supplier, i) =>
            i === index ? { ...supplier, [field]: value } : supplier
        );

        const updatedHeaders = supplierHeaders.map((header, i) =>
            i === index && field === "seller" && value.trim() !== "" ? value : header
        );

        setSupplierHeaders(updatedHeaders);
        setFormInput({ ...formInput, suppliers: updatedSuppliers });

        if (errors[`supplier_${index}_${field}`]) {
            setErrors({ ...errors, [`supplier_${index}_${field}`]: null });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formInput.productName.trim()) newErrors.productName = "กรุณากรอกชื่อสินค้า";
        if (!formInput.documentNo.trim()) newErrors.documentNo = "กรุณากรอกเลขที่หนังสือ";
        if (!formInput.purchasingDate.trim()) newErrors.purchasingDate = "กรุณากรอกวันที่เจ้าหน้าที่จัดซื้อ";
        if (!formInput.departmentHeadDate.trim()) newErrors.departmentHeadDate = "กรุณากรอกวันที่หัวหน้าแผนกบริการจัดซื้อ";
        if (!formInput.managerDate.trim()) newErrors.managerDate = "กรุณากรอกวันที่ผู้จัดการฝ่าย";

        formInput.suppliers.forEach((supplier, index) => {
            if (!supplier.seller.trim()) newErrors[`supplier_${index}_seller`] = `กรุณากรอกชื่อผู้จำหน่าย ${index + 1}`;
            if (!supplier.price.trim()) newErrors[`supplier_${index}_price`] = `กรุณากรอกราคา ${index + 1}`;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const addItemToTable = () => {
        if (!validateForm()) return;

        // ตรวจสอบว่าแต่ละ supplier มีการอัพโหลดไฟล์หรือไม่
        const missingFiles = formInput.suppliers.some((supplier, index) => {
            if (supplier.files.length === 0) {
                alert(`กรุณาอัพโหลดไฟล์สำหรับผู้จัดจำหน่าย ${index + 1}`);
                return true;
            }
            return false;
        });

        // ถ้ามี supplier ที่ไม่มีไฟล์ หยุดการทำงาน
        if (missingFiles) return;

        setItems([...items, { ...formInput, id: items.length + 1 }]);
        // console.log("check", formInput)
        // return
        setFormInput({
            productName: "",
            documentNo: "",
            purchasingDate: "",
            departmentHeadDate: "",
            managerDate: "",
            suppliers: formInput.suppliers.map(() => ({
                seller: "", price: "", remark: "", files: [],
            })),
            comment: "",
        });

        // ล้างค่า input file ทุกอัน
        fileInputRefs.current.forEach((ref) => {
            if (ref.current) {
                ref.current.value = null;
            }
        });

        // ปิดการแก้ไขช่อง seller
        setIsSellerDisabled(true)
    };

    const handleDeleteItem = (id) => {
        setItems(items.filter((item) => item.id !== id))
    }

    const resetForm = () => {
        setFormInput({
            productName: "",
            documentNo: "",
            purchasingDate: "",
            departmentHeadDate: "",
            managerDate: "",
            suppliers: [
                { seller: "", price: "", remark: "", files: [] },
                { seller: "", price: "", remark: "", files: [] },
                { seller: "", price: "", remark: "", files: [] },
            ],
            comment: "",
        });
        setSupplierHeaders(["ผู้จัดจำหน่าย 1", "ผู้จัดจำหน่าย 2", "ผู้จัดจำหน่าย 3"]);
        setItems([]);

        // ล้างค่า input file ทุกอัน
        fileInputRefs.current.forEach((ref) => {
            if (ref.current) {
                ref.current.value = null;
            }
        });

        setIsSellerDisabled(false)
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

            <div className="border rounded-md shadow-lg p-4 bg-white">
                <h3 className="text-lg font-semibold mb-4">กรอกข้อมูลสินค้า</h3>

                <div className="grid grid-cols-2 gap-4">
                    <div className="">
                        <div className="mb-4">
                            <label className="text-lg">รายการสินค้า:</label>
                            <input
                                type="text"
                                value={formInput.productName}
                                onChange={(e) => handleInputChange("productName", e.target.value)}
                                className={`border rounded p-2 w-full ${errors.productName ? "border-red-500" : "border-gray-300"}`}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="text-lg">วันที่ผู้จัดการฝ่าย:</label>
                            <input
                                type="date"
                                value={formInput.managerDate}
                                onChange={(e) => handleInputChange("managerDate", e.target.value)}
                                className={`border rounded p-2 w-full ${errors.managerDate ? "border-red-500" : "border-gray-300"}`}
                            />
                        </div>

                        {/* ฟอร์มผู้จัดจำหน่าย */}
                        {formInput.suppliers.map((supplier, index) => (
                            <div key={index} className="mb-4">
                                <div className="flex space-x-4">
                                    <input
                                        type="text"
                                        placeholder={`ผู้จัดจำหน่าย ${index + 1}`}
                                        value={supplier.seller}
                                        onChange={(e) => handleSupplierChange(index, "seller", e.target.value)}
                                        disabled={isSellerDisabled}
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
                                <div className="mt-2">
                                    <label className="text-sm">แนบไฟล์เอกสารสำหรับผู้จัดจำหน่าย {index + 1}:</label>
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        multiple
                                        ref={fileInputRefs.current[index]}
                                        onChange={(e) => handleFileChange(index, e)}
                                        className="border rounded p-2 w-full"
                                    />
                                    <ul className="mt-2">
                                        {supplier.files.map((file, i) => (
                                            <li key={i} className="flex items-center space-x-2">
                                                <span>{file.name}</span>
                                                <button
                                                    type="button"
                                                    className="text-red-500"
                                                    onClick={() => handleRemoveFile(index, i)}
                                                >
                                                    ลบ
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}

                    </div>

                    <div className="">
                        {/* เพิ่มฟิลด์ใหม่ */}
                        <div className="mb-4">
                            <label className="text-lg">เลขที่หนังสือ:</label>
                            <input
                                type="text"
                                value={formInput.documentNo}
                                onChange={(e) => handleInputChange("documentNo", e.target.value)}
                                className={`border rounded p-2 w-full ${errors.documentNo ? "border-red-500" : "border-gray-300"}`}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="text-lg">วันที่เจ้าหน้าที่จัดซื้อ:</label>
                            <input
                                type="date"
                                value={formInput.purchasingDate}
                                onChange={(e) => handleInputChange("purchasingDate", e.target.value)}
                                className={`border rounded p-2 w-full ${errors.purchasingDate ? "border-red-500" : "border-gray-300"}`}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="text-lg">วันที่หัวหน้าแผนกบริการจัดซื้อ:</label>
                            <input
                                type="date"
                                value={formInput.departmentHeadDate}
                                onChange={(e) => handleInputChange("departmentHeadDate", e.target.value)}
                                className={`border rounded p-2 w-full ${errors.departmentHeadDate ? "border-red-500" : "border-gray-300"}`}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="text-lg">หมายเหตุ:</label>
                            <input
                                type="date"
                                value={formInput.comment}
                                onChange={(e) => handleInputChange("comment", e.target.value)}
                                className={`border rounded p-2 w-full ${errors.comment ? "border-red-500" : "border-gray-300"}`}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <button onClick={addItemToTable} className="bg-green-500 text-white px-4 py-2 rounded">เพิ่มข้อมูล</button>
                    <button onClick={resetForm} className="bg-yellow-500 text-white px-4 py-2 rounded">ล้างข้อมูล</button>
                </div>
            </div>

            <div className="mt-4">
                <div className='border bg-white rounded-lg shadow-md pb-10'>
                    <table id="table-to-pdf" className="min-w-full border-collapse">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2 px-4 border">#</th>
                                <th className="py-2 px-4 border">ชื่อสินค้า</th>
                                <th className="py-2 px-4 border">เลขที่หนังสือ</th>
                                <th className="py-2 px-4 border">วันที่เจ้าหน้าที่จัดซื้อ</th>
                                <th className="py-2 px-4 border">วันที่หัวหน้าแผนกบริการจัดซื้อ</th>
                                <th className="py-2 px-4 border">วันที่ผู้จัดการฝ่าย</th>
                                {supplierHeaders.map((header, index) => (
                                    <th key={index} className="py-2 px-4 border">{header}</th>
                                ))}
                                <th className="py-2 px-4 border">หมายเหตุ</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4 border">{item.id}</td>
                                    <td className="py-2 px-4 border">{item.productName}</td>
                                    <td className="py-2 px-4 border">{item.documentNo}</td>
                                    <td className="py-2 px-4 border">{item.purchasingDate}</td>
                                    <td className="py-2 px-4 border">{item.departmentHeadDate}</td>
                                    <td className="py-2 px-4 border">{item.managerDate}</td>
                                    {item.suppliers.map((supplier, i) => (
                                        <td key={i} className="py-2 px-4 border">
                                            {/* {supplier.seller && `${supplier.seller} - ฿${supplier.price}`} */}
                                            <div>
                                                <strong>ชื่อผู้จัดจำหน่าย:</strong> {supplier.seller || "N/A"}
                                            </div>
                                            <div>
                                                <strong>ราคา:</strong> {supplier.price ? `฿${supplier.price}` : "N/A"}
                                            </div>
                                            <div>
                                                <strong>หมายเหตุ:</strong> {supplier.remark || "ไม่มีหมายเหตุ"}
                                            </div>
                                            <div>
                                                <strong>ไฟล์:</strong>{" "}
                                                {supplier.files.length > 0
                                                    ? supplier.files.map((file, index) => (
                                                        <a
                                                            key={index}
                                                            href={URL.createObjectURL(file)}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-500 underline"
                                                        >
                                                            {file.name}
                                                        </a>
                                                    ))
                                                    : "ไม่มีไฟล์"}
                                            </div>
                                        </td>
                                    ))}
                                    <td className="py-2 px-4 border">{item.comment}</td>
                                    <td className='py-2 px-4 border'><button className="px-4 py-2 bg-red-500 rounded-lg border text-white" onClick={() => handleDeleteItem(item.id)}>ลบ</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end space-x-4 mt-4">
                    <button onClick={generatePDF} className="bg-blue-500 text-white px-4 py-2 rounded">ดาวน์โหลด PDF</button>
                    <button onClick={handlePrint} className="bg-gray-500 text-white px-4 py-2 rounded">พิมพ์</button>
                </div>
            </div>
        </div>
    );
};

export default Priceparisonform;
