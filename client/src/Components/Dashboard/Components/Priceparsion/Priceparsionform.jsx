import React, { useState, useRef, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
// import "./print.css";
import "./pricetable.css";
const Priceparisonform = () => {
  const formRef = useRef(null);

  const [items, setItems] = useState({
    documentNo: "",
    purchasingDate: "",
    departmentHeadDate: "",
    managerDate: "",
    files1: [],
    files2: [],
    files3: [],
    comment: "",
    suppliers: [], // เพิ่มทีละ product
  });

  const [isSellerDisabled, setIsSellerDisabled] = useState(false);
  const [supplierHeaders, setSupplierHeaders] = useState([
    "ผู้จัดจำหน่าย 1",
    "ผู้จัดจำหน่าย 2",
    "ผู้จัดจำหน่าย 3",
  ]);
  const fileInputRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);
  const tableToPdfRef = useRef(null); // สร้าง ref เพื่อเก็บการอ้างอิงของเนื้อหาสำหรับ PDF

  const [formInput, setFormInput] = useState({
    productName: "",
    documentNo: "",
    purchasingDate: "",
    departmentHeadDate: "",
    managerDate: "",
    suppliers: [
      { seller: "", price: "", remark: "" },
      { seller: "", price: "", remark: "" },
      { seller: "", price: "", remark: "" },
    ],
    files1: [], // สำหรับ supplier คนที่ 1
    files2: [], // สำหรับ supplier คนที่ 2
    files3: [], // สำหรับ supplier คนที่ 3
    comment: "",
  });

  // useEffect(() => {
  //   console.log(items);
  //   console.log(formInput);
  // }, [items]);

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormInput({ ...formInput, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: null });
  };

  const handleFileChange = (index, e) => {
    const selectedFiles = e.target.files;

    // ตรวจสอบจำนวนไฟล์
    if (selectedFiles.length > 1) {
      alert("กรุณาเลือกไฟล์แค่ 1 ไฟล์เท่านั้น");
      e.target.value = null;
      return;
    }

    const selectedFile = selectedFiles[0];

    // ตรวจสอบประเภทไฟล์
    if (selectedFile && selectedFile.type !== "application/pdf") {
      alert("กรุณาเลือกไฟล์ PDF เท่านั้น");
      e.target.value = null;
      return;
    }

    // ตั้งชื่อ key: files1, files2, files3
    const fileKey = `files${index + 1}`;

    // อัปเดตใน formInput
    setFormInput((prev) => ({
      ...prev,
      [fileKey]: [selectedFile],
    }));
  };

  const handleRemoveFile = (index) => {
    const fileKey = `files${index + 1}`;
    setFormInput((prev) => ({
      ...prev,
      [fileKey]: [],
    }));
  };

  const handleSupplierChange = (index, field, value) => {
    const updatedSuppliers = formInput.suppliers.map((supplier, i) =>
      i === index ? { ...supplier, [field]: value } : supplier
    );

    const updatedHeaders = supplierHeaders.map((header, i) =>
      i === index && field === "seller" && value.trim() !== "" ? value : header
    );

    setFormInput({ ...formInput, suppliers: updatedSuppliers });
    setSupplierHeaders(updatedHeaders);

    // // ✅ ล็อก seller ถ้ากรอกครบทั้ง 3 คนแล้ว
    // if (field === "seller") {
    //   const allSellersFilled = updatedSuppliers.every(
    //     (supplier) => supplier.seller.trim() !== ""
    //   );
    //   if (allSellersFilled) {
    //     setIsSellerDisabled(true);
    //   }
    // }

    // ล้าง error
    if (errors[`supplier_${index}_${field}`]) {
      setErrors({ ...errors, [`supplier_${index}_${field}`]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formInput.productName.trim())
      newErrors.productName = "กรุณากรอกชื่อสินค้า";
    if (!formInput.documentNo.trim())
      newErrors.documentNo = "กรุณากรอกเลขที่หนังสือ";
    if (!formInput.purchasingDate.trim())
      newErrors.purchasingDate = "กรุณากรอกวันที่เจ้าหน้าที่จัดซื้อ";
    if (!formInput.departmentHeadDate.trim())
      newErrors.departmentHeadDate = "กรุณากรอกวันที่หัวหน้าแผนกบริการจัดซื้อ";
    if (!formInput.managerDate.trim())
      newErrors.managerDate = "กรุณากรอกวันที่ผู้จัดการฝ่าย";

    formInput.suppliers.forEach((supplier, index) => {
      if (!supplier.seller.trim())
        newErrors[`supplier_${index}_seller`] = `กรุณากรอกชื่อผู้จำหน่าย ${
          index + 1
        }`;
      if (!supplier.price.trim())
        newErrors[`supplier_${index}_price`] = `กรุณากรอกราคา ${index + 1}`;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [editIndex, setEditIndex] = useState(null); // null = กำลังเพิ่ม, ไม่ใช่ null = แก้ไข

  const addItemToTable = () => {
    // ตรวจ validate เฉพาะตอนยังไม่มี supplier
    if (items.suppliers?.length === 0 && !validateForm()) return;

    if (!formInput.productName.trim()) {
      alert("กรุณากรอกชื่อสินค้า");
      return;
    }

    const missingIndex = supplierHeaders.findIndex(
      (_, index) => !formInput[`files${index + 1}`]?.length
    );
    if (missingIndex !== -1) {
      alert(`กรุณาอัพโหลดไฟล์สำหรับผู้จัดจำหน่าย ${missingIndex + 1}`);
      return;
    }

    const newSupplierEntry = {
      productName: formInput.productName,
      items: formInput.suppliers.map((supplier) => ({
        seller: supplier.seller,
        price: supplier.price,
        remark: supplier.remark,
      })),
    };

    if (editIndex !== null) {
      // ✅ แก้ไขรายการเดิม
      const updatedSuppliers = [...items.suppliers];
      updatedSuppliers[editIndex] = newSupplierEntry;

      setItems((prev) => ({
        ...prev,
        suppliers: updatedSuppliers,
        comment: formInput.comment,
        files1: formInput.files1,
        files2: formInput.files2,
        files3: formInput.files3,
      }));

      setEditIndex(null); // ✅ reset หลังแก้ไข
    } else {
      // ✅ เพิ่มใหม่
      setItems((prev) => ({
        ...prev,
        documentNo: formInput.documentNo,
        purchasingDate: formInput.purchasingDate,
        departmentHeadDate: formInput.departmentHeadDate,
        managerDate: formInput.managerDate,
        comment: formInput.comment,
        files1: formInput.files1,
        files2: formInput.files2,
        files3: formInput.files3,
        suppliers: [...(prev.suppliers || []), newSupplierEntry],
      }));
    }

    // ✅ รีเซตฟอร์ม
    setFormInput((prev) => ({
      ...prev,
      productName: "",
      suppliers: prev.suppliers.map((s) => ({
        seller: s.seller,
        price: "",
        remark: "",
      })),
      comment: "",
    }));

    setIsSellerDisabled(true);
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const resetForm = () => {
    // setFormInput({
    //   productName: "",
    //   documentNo: "",
    //   purchasingDate: "",
    //   departmentHeadDate: "",
    //   managerDate: "",
    //   suppliers: [
    //     { seller: "", price: "", remark: "", files: [] },
    //     { seller: "", price: "", remark: "", files: [] },
    //     { seller: "", price: "", remark: "", files: [] },
    //   ],
    //   comment: "",
    // });
    // setSupplierFiles([[], [], []]);
    // setSupplierHeaders([
    //   "ผู้จัดจำหน่าย 1",
    //   "ผู้จัดจำหน่าย 2",
    //   "ผู้จัดจำหน่าย 3",
    // ]);
    // setItems([]);

    setFormInput({
      productName: "",
      documentNo: "",
      purchasingDate: "",
      departmentHeadDate: "",
      managerDate: "",
      suppliers: [
        { seller: "", price: "", remark: "" },
        { seller: "", price: "", remark: "" },
        { seller: "", price: "", remark: "" },
      ],
      files1: [], // สำหรับ supplier คนที่ 1
      files2: [], // สำหรับ supplier คนที่ 2
      files3: [], // สำหรับ supplier คนที่ 3
      comment: "",
    });

    setItems({
      documentNo: "",
      purchasingDate: "",
      departmentHeadDate: "",
      managerDate: "",
      files1: [],
      files2: [],
      files3: [],
      comment: "",
      suppliers: [], // เพิ่มทีละ product
    });

    // ล้างค่า input file ทุกอัน
    fileInputRefs.current.forEach((ref) => {
      if (ref.current) {
        ref.current.value = null;
      }
    });

    setIsSellerDisabled(false);
  };

  const generatePDF = () => {
    const input = tableToPdfRef.current; // อ้างอิงถึง DOM ของส่วนที่ต้องการ
    // const input = document.getElementById("table-to-pdf");
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, pdfHeight); // เพิ่มข้อมูลใน PDF
      pdf.save("comparison_table.pdf");
    });
  };

  const handlePrint = () => window.print();

  const dateformat = (date) => {
    const dateString = date;
    const dateObject = new Date(dateString);
    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
    const year = dateObject.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    // console.log(formattedDate || 'ไม่มีวันที่'); // Output: 04 04 2025

    return formattedDate === "NaN/NaN/NaN" ? "-" : formattedDate;
  };

  const SendData = () => {
    console.log(items);
  };

  const sendDataToBackend = async () => {
    const formData = new FormData();
  
    // ✅ ข้อมูลธรรมดา
    formData.append("documentNo", items.documentNo);
    formData.append("purchasingDate", items.purchasingDate);
    formData.append("departmentHeadDate", items.departmentHeadDate);
    formData.append("managerDate", items.managerDate);
    formData.append("comment", items.comment);
  
    // ✅ ไฟล์แนบ (แนบแบบ field ชัดเจน)
    if (items.files1?.length) formData.append("files1", items.files1[0]);
    if (items.files2?.length) formData.append("files2", items.files2[0]);
    if (items.files3?.length) formData.append("files3", items.files3[0]);
  
    // ✅ แนบข้อมูล supplier ทั้งหมดเป็น JSON string
    formData.append("suppliers", JSON.stringify(items.suppliers));
  
    // ✅ ส่งออกด้วย fetch หรือ axios
    try {
      const res = await fetch("/api/your-endpoint", {
        method: "POST",
        body: formData,
      });
  
      const result = await res.json();
      console.log("✅ ส่งข้อมูลสำเร็จ:", result);
    } catch (error) {
      console.error("❌ เกิดข้อผิดพลาด:", error);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 space-y-4 p-4">
      <h2 className="text-center text-xl mb-4">
        ฟอร์มกรอกข้อมูลเปรียบเทียบราคา
      </h2>

      <div ref={formRef} className="border rounded-md shadow-lg p-4 bg-white">
        <h3 className="text-lg font-semibold mb-4">กรอกข้อมูลสินค้า</h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="">
            <div className="mb-4">
              <label className="text-lg">รายการสินค้า:</label>
              <input
                type="text"
                value={formInput.productName}
                onChange={(e) =>
                  handleInputChange("productName", e.target.value)
                }
                className={`border rounded p-2 w-full ${
                  errors.productName ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>

            <div className="mb-4">
              <label className="text-lg">วันที่ผู้จัดการฝ่าย:</label>
              <input
                type="date"
                value={formInput.managerDate}
                disabled={isSellerDisabled}
                onChange={(e) =>
                  handleInputChange("managerDate", e.target.value)
                }
                className={`border rounded p-2 w-full ${
                  errors.managerDate ? "border-red-500" : "border-gray-300"
                }`}
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
                    onChange={(e) =>
                      handleSupplierChange(index, "seller", e.target.value)
                    }
                    disabled={isSellerDisabled}
                    className="border rounded p-2 w-1/3"
                  />
                  <input
                    type="number"
                    placeholder="ราคา"
                    value={supplier.price}
                    onChange={(e) =>
                      handleSupplierChange(index, "price", e.target.value)
                    }
                    className="border rounded p-2 w-1/3"
                  />
                  <input
                    type="text"
                    placeholder="หมายเหตุ"
                    value={supplier.remark}
                    onChange={(e) =>
                      handleSupplierChange(index, "remark", e.target.value)
                    }
                    className="border rounded p-2 w-1/3"
                  />
                </div>
                {/* <div className="mt-2">
                  <label className="text-sm">
                    แนบไฟล์เอกสารสำหรับผู้จัดจำหน่าย {index + 1}:
                  </label>
                  <input
                    type="file"
                    accept="application/pdf"
                    multiple
                    ref={fileInputRefs.current[index]}
                    onChange={(e) => handleFileChange(index, e)}
                    className="border rounded p-2 w-full"
                  />
                  <ul className="mt-2">
                    {supplierFiles[index]?.map((file, i) => (
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
                </div> */}
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
                disabled={isSellerDisabled}
                onChange={(e) =>
                  handleInputChange("documentNo", e.target.value)
                }
                className={`border rounded p-2 w-full ${
                  errors.documentNo ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>

            <div className="mb-4">
              <label className="text-lg">วันที่เจ้าหน้าที่จัดซื้อ:</label>
              <input
                type="date"
                value={formInput.purchasingDate}
                disabled={isSellerDisabled}
                onChange={(e) =>
                  handleInputChange("purchasingDate", e.target.value)
                }
                className={`border rounded p-2 w-full ${
                  errors.purchasingDate ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>

            <div className="mb-4">
              <label className="text-lg">วันที่หัวหน้าแผนกบริการจัดซื้อ:</label>
              <input
                type="date"
                value={formInput.departmentHeadDate}
                disabled={isSellerDisabled}
                onChange={(e) =>
                  handleInputChange("departmentHeadDate", e.target.value)
                }
                className={`border rounded p-2 w-full ${
                  errors.departmentHeadDate
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
            </div>

            <div className="mb-4">
              <label className="text-lg">หมายเหตุ:</label>
              <input
                type="text"
                value={formInput.comment}
                onChange={(e) => handleInputChange("comment", e.target.value)}
                className={`border rounded p-2 w-full ${
                  errors.comment ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
          </div>

          <div className="col-span-2 border-t mt-6 pt-4">
            <h3 className="text-lg font-semibold mb-2">
              แนบไฟล์เอกสารสำหรับผู้จัดจำหน่าย
            </h3>
            <div className="grid grid-cols-3 gap-4">
            {supplierHeaders.map((header, index) => {
              const fileKey = `files${index + 1}`;
              const selectedFiles = formInput[fileKey] || [];

              return (
                <div key={index} className="mb-4">
                  <label className="text-md font-semibold">{header}:</label>
                  <input
                    type="file"
                    accept="application/pdf"
                    ref={fileInputRefs.current[index]}
                    onChange={(e) => handleFileChange(index, e)}
                    className="border rounded p-2 w-full mt-1"
                  />

                  <ul className="mt-2">
                    {selectedFiles.map((file, i) => (
                      <li key={i} className="flex items-center space-x-2">
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
              );
            })}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={addItemToTable}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {editIndex !== null ? "บันทึกการแก้ไข" : "เพิ่มข้อมูล"}
          </button>

          <button
            onClick={resetForm}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            ล้างข้อมูล
          </button>
        </div>
      </div>

      <div className="mt-4">
        <div className="border bg-white rounded-lg shadow-md pb-10">
          <table
            id="table-to-pdf"
            className="min-w-full text-center border-collapse"
          >
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 border">#</th>
                <th className="py-2 px-4 border">ชื่อสินค้า</th>
                {/* <th className="py-2 px-4 border">เลขที่หนังสือ</th>
                <th className="py-2 px-4 border">วันที่เจ้าหน้าที่จัดซื้อ</th>
                <th className="py-2 px-4 border">
                  วันที่หัวหน้าแผนกบริการจัดซื้อ
                </th>
                <th className="py-2 px-4 border">วันที่ผู้จัดการฝ่าย</th> */}
                {supplierHeaders.map((header, index) => (
                  <th key={index} className="py-2 px-4 border">
                    {header}
                  </th>
                ))}
                <th className="py-2 px-4 border">หมายเหตุ</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.suppliers.map((supplierEntry, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border">
                    {supplierEntry.productName}
                  </td>
                  {/* <td className="py-2 px-4 border">{items.documentNo}</td> */}
                  {/*
                  <td className="py-2 px-4 border">{items.purchasingDate}</td>
                  <td className="py-2 px-4 border">
                    {items.departmentHeadDate}
                  </td>
                  <td className="py-2 px-4 border">{items.managerDate}</td> */}

                  {supplierEntry.items.map((supplier, i) => (
                    <td key={i} className="py-2 px-4 border">
                      <div>
                        <strong>ราคา:</strong>{" "}
                        {supplier.price ? `${supplier.price} บาท` : "N/A"}
                      </div>
                      <div>
                        <strong>หมายเหตุ:</strong> {supplier.remark || "-"}
                      </div>
                    </td>
                  ))}

                  <td className="py-2 px-4 border">{items.comment}</td>
                  <td className="py-2 px-4 border space-x-2">
                    <button
                      className="px-4 py-2 bg-blue-500 rounded-lg border text-white"
                      onClick={() => {
                        setFormInput({
                          productName: supplierEntry.productName,
                          suppliers: supplierEntry.items,
                          comment: items.comment,
                          documentNo: items.documentNo,
                          purchasingDate: items.purchasingDate,
                          departmentHeadDate: items.departmentHeadDate,
                          managerDate: items.managerDate,
                          files1: items.files1,
                          files2: items.files2,
                          files3: items.files3,
                        });
                        setEditIndex(index); // ✅ สำคัญมาก
                        setIsSellerDisabled(true);

                        // ✅ เลื่อนกลับขึ้นไปหาฟอร์ม
                        formRef.current?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }}
                    >
                      แก้ไข
                    </button>

                    <button
                      className="px-4 py-2 bg-red-500 rounded-lg border text-white"
                      onClick={() => {
                        const updated = [...items.suppliers];
                        updated.splice(index, 1);
                        setItems({ ...items, suppliers: updated });
                      }}
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ฟอรฺม PDF  */}
        <div ref={tableToPdfRef} className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-lg font-bold">
                แบบฟอร์มการเปรียบเทียบราคาของ
              </h1>
              <p>ผู้จำหน่าย/ผู้รับจ้าง</p>
            </div>
            <div className="text-right">
              <p className="font-bold">{items.documentNo}</p>
            </div>
          </div>

          <div className="">
            <table className="table-auto table-export-pdf w-full">
              <thead>
                <tr className="text-center font-bold">
                  <th className="p-2">
                    <p>ลำดับที่</p>
                    <p className="text-sm text-gray-600">Item No.</p>
                  </th>
                  <th className="p-2">
                    <p>รายการสินค้า</p>
                    <p className="text-sm text-gray-600">List Product</p>
                  </th>
                  <th className="p-2" colSpan="3">
                    <p className="seller-field">ผู้จำหน่าย</p>
                    <div className="grid grid-cols-3 box-seller">
                      {supplierHeaders.map((header, index) => (
                        <div key={index} className="">
                          {header}
                        </div>
                      ))}
                    </div>
                  </th>
                  <th className="p-2">
                    <p>หมายเหตุ</p>
                    <p className="text-sm text-gray-600">Note</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.suppliers.map((product, index) => (
                  <tr key={index} className="text-center">
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{product.productName || "-"}</td>
                    <td className="p-0" colSpan="3">
                      <table className="info w-full">
                        <tbody>
                          <tr className="grid grid-cols-3">
                            {product.items.map((supplier, i) => (
                              <td key={i} className="p-2">
                                <div>
                                  <strong>ผู้จำหน่าย:</strong> {supplier.seller}
                                </div>
                                <div>
                                  <strong>ราคา:</strong>{" "}
                                  {supplier.price
                                    ? `${supplier.price} บาท`
                                    : "N/A"}
                                </div>
                                <div>
                                  <strong>หมายเหตุ:</strong>{" "}
                                  {supplier.remark || "-"}
                                </div>
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td className="p-2">{items.comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-end mt-3 space-y-2">
            <div className="font-bold">
              จนท.จัดซื้อ : วันที่ {dateformat(items.purchasingDate)}
            </div>
            <div className="font-bold">
              หน.แผนกบริการจัดซื้อ : วันที่{" "}
              {dateformat(items.departmentHeadDate)}
            </div>
            <div className="font-bold">
              ผู้จัดการฝ่าย : วันที่ {dateformat(items.managerDate)}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-4">
        <button
          onClick={generatePDF}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          ดาวน์โหลด PDF
        </button>
        <button
          onClick={SendData}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          ส่งข้อมูล
        </button>
        <button
          onClick={handlePrint}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          พิมพ์
        </button>
      </div>
    </div>
  );
};

export default Priceparisonform;
