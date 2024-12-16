import { useState } from "react";

const Priceparisonform = () => {
    const [items, setItems] = useState([]);

    const [formInput, setFormInput] = useState({
        productName: "",
        suppliers: [
            { seller: "", price: "", remark: "" },
            { seller: "", price: "", remark: "" },
            { seller: "", price: "", remark: "" },
        ],
        comment: "",
    });

    const [errors, setErrors] = useState({});

    // ฟังก์ชันสำหรับอัปเดตฟิลด์หลัก
    const handleInputChange = (field, value) => {
        setFormInput({ ...formInput, [field]: value });

        // เคลียร์ error เมื่อแก้ไข
        if (errors[field]) {
            setErrors({ ...errors, [field]: null });
        }
    };

    // ฟังก์ชันสำหรับอัปเดตข้อมูลผู้จำหน่าย
    const handleSupplierChange = (index, field, value) => {
        // Trim ค่าของ seller ก่อนที่จะบันทึก
        const updatedSuppliers = formInput.suppliers.map((supplier, i) =>
            i === index ? { ...supplier, [field]: field === "seller" ? value.trim() : value } : supplier
        );
        setFormInput({ ...formInput, suppliers: updatedSuppliers });

        // เคลียร์ error เมื่อแก้ไข
        if (errors[`supplier_${index}_${field}`]) {
            setErrors({ ...errors, [`supplier_${index}_${field}`]: null });
        }
    };

    const handleDeleteItem = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };

    // ฟังก์ชันตรวจสอบข้อมูลก่อนเพิ่ม
    const validateForm = () => {
        // // ตรวจสอบว่า "ชื่อสินค้า" ถูกกรอกหรือไม่
        // if (!formInput.productName.trim()) {
        //     alert("กรุณากรอกชื่อสินค้า");
        //     return false;
        // }

        // // ตรวจสอบว่าผู้จัดจำหน่ายครบ 3 รายมีการกรอกข้อมูล seller หรือไม่
        // const allSuppliersValid = formInput.suppliers.every(
        //     (supplier) => supplier.seller.trim() !== "" && supplier.price.trim() !== ""
        // );

        // if (!allSuppliersValid) {
        //     alert("กรุณากรอกข้อมูลผู้จัดจำหน่ายและราคาสำหรับผู้จำหน่ายทุกคน");
        //     return false;
        // }

        // return true;
        const newErrors = {};

        if (!formInput.productName.trim()) {
            newErrors.productName = "กรุณากรอกชื่อสินค้า";
        }

        formInput.suppliers.forEach((supplier, index) => {
            if (!supplier.seller.trim()) {
                newErrors[`supplier_${index}_seller`] = `กรุณากรอกชื่อผู้จำหน่าย ${index + 1}`;
            }
            if (!supplier.price.trim()) {
                newErrors[`supplier_${index}_price`] = `กรุณากรอกราคาของผู้จำหน่าย ${index + 1}`;
            }
        });

        setErrors(newErrors);

        // ถ้าไม่มี error คืนค่า true
        return Object.keys(newErrors).length === 0;
    };

    // ฟังก์ชันเพิ่มรายการใหม่
    const addItemToTable = () => {
        if (!validateForm()) {
            return; // หยุดการทำงานถ้าข้อมูลไม่ครบ
        }

        // เพิ่มรายการใหม่โดยไม่ต้อง `trim` ข้อมูลซ้ำ
        setItems([...items, { ...formInput, id: items.length + 1 }]);

        setFormInput({
            productName: "",
            suppliers: formInput.suppliers.map((supplier) => ({
                seller: supplier.seller, // คงค่า seller เดิมไว้
                price: "", // รีเซ็ตเฉพาะ price
                remark: "", // รีเซ็ตเฉพาะ remark
            })),
            comment: "",
        });

        // console.log("เพิ่มรายการสำเร็จ", formInput);

        // if (!validateForm()) {
        //     return; // หยุดถ้าข้อมูลไม่ครบ
        // }

        // // เพิ่มรายการใหม่โดยไม่ต้อง `trim` ข้อมูลซ้ำ
        // setItems([...items, { ...formInput, id: items.length + 1 }]);

        // // รีเซ็ตฟอร์มหลังจากเพิ่มรายการ
        // setFormInput({
        //     productName: "",
        //     suppliers: formInput.suppliers.map((supplier) => ({
        //         seller: supplier.seller, // คงค่า seller เดิมไว้
        //         price: "", // รีเซ็ตเฉพาะ price
        //         remark: "", // รีเซ็ตเฉพาะ remark
        //     })),
        //     remark: "",
        // });
    };

    // ฟังก์ชันสำหรับดอกจันสีแดง
    const RequiredIndicator = () => <span className="text-red-500"> *</span>;

    const addToConsole = () => {
        console.log("ข้อมูลในตาราง", items)
    }

    const resetForm = () => {
        setFormInput({
            productName: "",
            suppliers: [
                { seller: "", price: "", remark: "" },
                { seller: "", price: "", remark: "" },
                { seller: "", price: "", remark: "" },
            ],
            comment: "",
        });

        setItems([]); //ลบข้อมูลในตารางทั้งหมด
    };


    return (
        <div className="min-h-screen bg-gray-100 space-y-4 p-0 lg:p-4 ">
            <h2 className="text-center text-xl mb-4">ฟอร์มกรอกข้อมูลเปรียบเทียบราคา</h2>

            {/* ฟอร์มกรอกข้อมูล */}
            <div className="border rounded-md shadow-lg p-4 bg-white">
                <h3 className="text-base md:text-xl font-semibold mb-4">กรอกข้อมูลสินค้า<RequiredIndicator /></h3>
                <div className="mb-4 space-x-2">
                    <label className="text-lg">รายการสินค้า:</label>
                    <input
                        type="text"
                        value={formInput.productName}
                        onChange={(e) => handleInputChange("productName", e.target.value)}
                        placeholder="ชื่อสินค้า"
                        className={`border rounded p-2 w-full sm:w-2/3 ${errors.productName ? "border-red-500" : "border-gray-300"
                            }`}
                    />
                </div>
                <div className="mb-4 space-y-2 space-x-3">
                    <h4 className="text-base md:text-xl font-semibold mb-2">ข้อมูลผู้จำหน่าย<RequiredIndicator /></h4>
                    {formInput.suppliers.map((supplier, index) => (
                        <div
                            key={index}
                            className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 mb-2"
                        >
                            <input
                                type="text"
                                placeholder={`ผู้จัดจำหน่าย ${index + 1}`}
                                value={supplier.seller}
                                onChange={(e) => handleSupplierChange(index, "seller", e.target.value)}
                                className={`border rounded p-2 mr-2 w-1/4 ${errors[`supplier_${index}_seller`] ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            {/* {errors[`supplier_${index}_seller`] && (
                                <span className="text-red-500 text-sm">
                                    {errors[`supplier_${index}_seller`]}
                                </span>
                            )} */}
                            <input
                                type="text"
                                placeholder="ราคา"
                                value={supplier.price}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d*$/.test(value)) {
                                        handleSupplierChange(index, "price", value);
                                    }
                                }}
                                className={`border rounded p-2 mr-2 w-1/4 ${errors[`supplier_${index}_price`] ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            {/* {errors[`supplier_${index}_price`] && (
                                <span className="text-red-500 text-sm">
                                    {errors[`supplier_${index}_price`]}
                                </span>
                            )} */}
                            <input
                                type="text"
                                placeholder="Remark"
                                value={supplier.remark}
                                onChange={(e) => handleSupplierChange(index, "remark", e.target.value)}
                                className="p-2 border rounded w-full sm:w-1/3"
                            />
                        </div>
                    ))}
                </div>
                <div className="mb-4">
                    <label className="text-lg">หมายเหตุรายการ:</label>
                    <input
                        type="text"
                        value={formInput.comment}
                        onChange={(e) => handleInputChange("comment", e.target.value)}
                        placeholder="หมายเหตุสำหรับรายการ"
                        className="ml-2 p-2 border rounded w-full sm:w-2/3"
                    />
                </div>
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={addItemToTable}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        เพิ่มรายการ
                    </button>
                    <button
                        onClick={resetForm}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        รีเซ็ตข้อมูล
                    </button>
                </div>
            </div>

            {/* ตารางแสดงข้อมูล */}
            <div className="overflow-auto">
                <table className="table-auto w-full border-collapse border border-gray-300 text-center mt-4">
                    {/* <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">ลำดับ</th>
                            <th className="border border-gray-300 p-2">รายการสินค้า</th>
                            {formInput.suppliers.map((supplier, index) => (
                                <th key={index} className="border border-gray-300 p-2">
                                    {supplier.seller.trim() !== ""
                                        ? supplier.seller
                                        : `ผู้จำหน่าย ${index + 1}`
                                    }
                                </th>
                            ))}
                            <th className="border border-gray-300 p-2">หมายเหตุ</th>
                            <th className="border border-gray-300 p-2">จัดการ</th>
                        </tr>
                    </thead> */}
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2" rowSpan={2}>
                                ลำดับ
                            </th>
                            <th className="border border-gray-300 p-2" rowSpan={2}>
                                รายการสินค้า
                            </th>
                            <th
                                className="border border-gray-300 p-2"
                                colSpan={formInput.suppliers.length}
                            >
                                ผู้จัดจำหน่าย
                            </th>
                            <th className="border border-gray-300 p-2" rowSpan={2}>
                                หมายเหตุ
                            </th>
                            <th className="border border-gray-300 p-2" rowSpan={2}>
                                จัดการ
                            </th>
                        </tr>
                        <tr className="bg-gray-200">
                            {formInput.suppliers.map((supplier, index) => (
                                <th key={index} className="border border-gray-300 p-2">
                                    {supplier.seller.trim() !== ""
                                        ? supplier.seller
                                        : `ผู้จำหน่าย ${index + 1}`}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {items.map((item, index) => (
                            <tr key={item.id} className="odd:bg-white even:bg-gray-100">
                                <td className="border border-gray-300 p-2">{index + 1}</td>
                                <td className="border border-gray-300 p-2">{item.productName}</td>
                                {item.suppliers.map((supplier, i) => (
                                    <td key={i} className="border border-gray-300 p-2">
                                        {/* <div>ชื่อ: {supplier.seller}</div> */}
                                        <div>ราคา: {supplier.price}</div>
                                        <div>- {supplier.remark}</div>
                                    </td>
                                ))}
                                <td className="border border-gray-300 p-2">{item.comment}</td>
                                <td className="border border-gray-300 p-2">
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                        onClick={() => handleDeleteItem(item.id)}
                                    >
                                        ลบ
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-end">
                <button
                    onClick={addToConsole}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    ส่งข้อมุลไปยังต่อไป - console.log
                </button>
            </div>
        </div>

    );
};

export default Priceparisonform;
