import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import editIcon from "../../Assets/edit.svg";
import { RiDeleteBin5Line } from "react-icons/ri";
import { _ApiSafyStock } from "../../../../api/saftyStock";
import { AddSaftyStockPopup } from "./AddSaftyStockPopup";
import ReactLoading from "react-loading";
import Pagination from "../../../components/pagination";
import Swal from "sweetalert2";

const API = import.meta.env.VITE_URL_API;

const SafetyStock = () => {
  const [filters, setFilters] = useState({
    product_category: "",
    number: "",
    model: "",
    color: "",
    size: "",
    product_code: "",
    product_list: "",
  });

  const [products, setProducts] = useState([]);
  const [dropdownData, setDropdownData] = useState({
    product_categories: [],
    numbers: [],
    models: [],
    colors: [],
    sizes: [],
    product_codes: [],
    product_lists: [],
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]); // Store selected IDs for API
  const [SelectEditId, setSelectEditId] = useState(null);
  const [Status, setStatus] = useState("create");

  // Handle filter input change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const GetDataStock = async () => {
    setLoading(true);
    try {
      const response = await _ApiSafyStock().Getlist(filters);
      setProducts(response.data);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDropdownData = async () => {
    try {
      const response = await _ApiSafyStock().DDL();
      setDropdownData(response.data);
    } catch (error) {
      console.error("❌ Error fetching dropdown data:", error);
    }
  };

  useEffect(() => {
    GetDataStock();
    fetchDropdownData();
  }, []);

  useEffect(() => {
    console.log("products", products);
    console.log("selectedIds", selectedIds);
  }, [products, selectedIds]);

  const handleSearch = () => {
    GetDataStock();
  };

  const handleClear = () => {
    setFilters({
      product_category: "",
      number: "",
      model: "",
      color: "",
      size: "",
      product_code: "",
      product_list: "",
    });
  };

  // Handle checkbox selection
  const handleCheckboxChange = (id) => {
    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
  };

  // Handle API call to delete selected products
  const handleDelete = async () => {
    if (selectedIds.length === 0) {
      return Swal.fire({
        icon: "info",
        title: "ไม่มีรายการให้ลบ",
        text: "กรุณาเลือกอย่างน้อยหนึ่งรายการ",
        confirmButtonText: "ตกลง",
      });
    }

    const result = await Swal.fire({
      title: "ยืนยันการลบ",
      text: `คุณต้องการลบ ${selectedIds.length} รายการใช่หรือไม่?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ใช่ ลบเลย",
      cancelButtonText: "ยกเลิก",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        const bodyData = { ids: selectedIds };
        const response = await _ApiSafyStock().Delete(bodyData);

        Swal.fire({
          icon: "success",
          title: "ลบเรียบร้อย",
          text: `${selectedIds.length} รายการถูกลบแล้ว`,
          timer: 1500,
          showConfirmButton: false,
        });

        // Refresh data & clear selection
        GetDataStock();
        setSelectedIds([]);
      } catch (error) {
        console.error("❌ Error deleting products:", error);
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถลบรายการได้ กรุณาลองใหม่อีกครั้ง",
        });
      }
    }
  };

  // Handle Edit button click to pass data to popup modal
  const handleEdit = (data) => {
    setIsPopupOpen(true);
    setStatus("edit");
    setSelectEditId(data);
  };

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between w-full border-b border-black pb-4">
        <h1 className="text-md sm:text-xl font-bold text-gray-800">
          📦 Safety Stock Management
        </h1>
        <div className="flex flex-row space-x-3 h-full">
          <button
            onClick={handleDelete}
            className="flex items-center justify-center bg-white rounded-lg shadow w-12 h-10 hover:bg-gray-50"
          >
            <RiDeleteBin5Line />
          </button>
          <button
            onClick={() => {
              setIsPopupOpen(true);
              setStatus("create");
            }}
            className="flex items-center justify-center bg-green-500 text-white rounded-lg shadow hover:bg-green-600 w-20 h-10"
          >
            <span className="text-lg font-semibold">Add</span>
          </button>
        </div>
      </div>

      {/* Search Section */}
      <div className="w-full">
        <div className="flex items-center px-4 py-2 bg-green-200 w-full">
          <span className="text-lg font-medium">ค้นหา</span>
        </div>
        <div className="flex flex-col bg-white shadow px-2 pt-2 pb-8 sm:pt-4 sm:pb-4 md:p-6 w-full gap-3">
          <div className="grid grid-cols-12 gap-3 w-full">
            {/* หมวดหมู่ */}
            <div className="col-span-12 sm:col-span-4">
              <label className="block text-sm font-medium text-gray-700">
                หมวดหมู่
              </label>
              <div className="relative mt-1">
                <select
                  name="product_category"
                  value={filters.product_category}
                  onChange={handleFilterChange}
                  className="block w-full h-10 pl-3 pr-10 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">เลือกหมวดหมู่</option>
                  {dropdownData.product_categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* เบอร์ */}
            <div className="col-span-12 sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                เบอร์
              </label>
              <div className="relative mt-1">
                <select
                  name="number"
                  value={filters.number}
                  onChange={handleFilterChange}
                  className="block w-full h-10 pl-3 pr-10 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">เลือกเบอร์</option>
                  {dropdownData.numbers.map((numbers, index) => (
                    <option key={index} value={numbers}>
                      {numbers}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* รุ่น */}
            <div className="col-span-12 sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                รุ่น
              </label>
              <div className="relative mt-1">
                <select
                  name="model"
                  value={filters.model}
                  onChange={handleFilterChange}
                  className="block w-full h-10 pl-3 pr-10 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">เลือกรุ่น</option>
                  {dropdownData.models.map((models, index) => (
                    <option key={index} value={models}>
                      {models}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* สี */}
            <div className="col-span-12 sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                สี
              </label>
              <div className="relative mt-1">
                <select
                  name="color"
                  value={filters.color}
                  onChange={handleFilterChange}
                  className="block w-full h-10 pl-3 pr-10 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">เลือกรุ่น</option>
                  {dropdownData.colors.map((colors, index) => (
                    <option key={index} value={colors}>
                      {colors}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* ขนาด */}
            <div className="col-span-12 sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                ขนาด
              </label>
              <div className="relative mt-1">
                <select
                  name="size"
                  value={filters.size}
                  onChange={handleFilterChange}
                  className="block w-full h-10 pl-3 pr-10 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">เลือกรุ่น</option>
                  {dropdownData.sizes.map((sizes, index) => (
                    <option key={index} value={sizes}>
                      {sizes}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* รหัสสินค้า */}
            <div className="col-span-12 sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                รหัสสินค้า
              </label>
              <div className="relative mt-1">
                <input
                  type="text"
                  name="product_code"
                  value={filters.product_code}
                  onChange={handleFilterChange}
                  className="block w-full h-10 pl-3 pr-10 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  placeholder="รหัสสินค้า"
                />
                {/* <FiSearch className="absolute right-3 top-2.5 text-gray-400" /> */}
              </div>
            </div>

            {/* รายการ */}
            <div className="col-span-12 sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                รายการ
              </label>
              <div className="relative mt-1">
                <input
                  type="text"
                  name="product_list"
                  value={filters.product_list}
                  onChange={handleFilterChange}
                  className="block w-full h-10 pl-3 pr-10 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  placeholder="รายการ"
                />
                {/* <FiSearch className="absolute right-3 top-2.5 text-gray-400" /> */}
              </div>
            </div>
          </div>

          <div className="flex w-full justify-start gap-2">
            <div
              onClick={handleSearch}
              className="bg-lime-300 hover:bg-lime-400 cursor-pointer h-10 w-24 flex justify-center items-center rounded-lg"
            >
              ค้นหา
            </div>
            <div
              onClick={handleClear}
              className="bg-gray-300 hover:bg-gray-400 cursor-pointer h-10 w-24 flex justify-center items-center rounded-lg"
            >
              ล้าง
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      {loading ? (
        <div className="w-full flex justify-center items-center">
          <ReactLoading type="spin" color="#4CAF50" height={30} width={30} />
        </div>
      ) : (
        <div className="bg-white border border-gray-300 shadow overflow-auto w-full">
          <div className="p-4 border-b bg-gray-50">
            <span className="text-lg font-semibold text-gray-700">
              หมวดหมู่สินค้า
            </span>
          </div>
          <div className="overflow-x-auto">
            <Pagination data={products} rowsPerPage={10}>
              {(currentItems, currentPage, rowsPerPage) => (
                <>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr className="bg-green-200">
                        <th scope="col" className="px-4 py-3">
                          <input
                            type="checkbox"
                            // ถ้าทุกรายการในหน้า ถูกเลือกไว้ใน selectedIds แล้ว ให้หัว checkbox = true
                            checked={
                              currentItems.length > 0 &&
                              currentItems.every((item) =>
                                selectedIds.includes(item.id)
                              )
                            }
                            // ถ้าเช็ค ให้เพิ่ม ids ของ currentItems ที่ยังไม่ถูกเลือก
                            // ถ้าไม่เช็ค ให้เอา ids ของ currentItems ออก
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedIds((prev) => [
                                  ...prev,
                                  ...currentItems
                                    .map((item) => item.id)
                                    .filter((id) => !prev.includes(id)),
                                ]);
                              } else {
                                setSelectedIds((prev) =>
                                  prev.filter(
                                    (id) =>
                                      !currentItems
                                        .map((i) => i.id)
                                        .includes(id)
                                  )
                                );
                              }
                            }}
                            className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                          />
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-700"
                        >
                          รหัสสินค้า
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-700"
                        >
                          รายการ
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-700"
                        >
                          รุ่น
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-700"
                        >
                          สี
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-700"
                        >
                          เบอร์
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-700"
                        >
                          ขนาด
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-700"
                        >
                          จำนวนคงเหลือ
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-700"
                        >
                          สถานะ
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-700"
                        >
                          แก้ไข
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {Array.isArray(currentItems) &&
                        currentItems.map((item, index) => (
                          <tr
                            key={index}
                            className="odd:bg-white odd:dark:bg-green-50 text-left"
                          >
                            <td className="px-4 py-4">
                              <input
                                type="checkbox"
                                checked={selectedIds.includes(item.id)}
                                onChange={() => handleCheckboxChange(item.id)}
                                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                              />
                            </td>
                            <td className="text-sm text-gray-900">
                              {item.product_code}
                            </td>
                            <td className="text-sm text-gray-900">
                              {item.product_list}
                            </td>
                            <td className="text-sm text-gray-900">
                              {item.model}
                            </td>
                            <td className="text-sm text-gray-900">
                              {item.color}
                            </td>
                            <td className="text-sm text-gray-900">
                              {item.number}
                            </td>
                            <td className="text-sm text-gray-900">
                              {item.size}
                            </td>
                            <td className="text-sm text-gray-900">
                              {item.qty <= 10 ? (
                                <span className="text-red-600">{item.qty}</span>
                              ) : (
                                <span className="text-black">{item.qty}</span>
                              )}
                            </td>
                            <td className="text-sm text-gray-900">
                              {item.product_status}
                            </td>
                            <td className="text-sm text-gray-900">
                              <button onClick={() => handleEdit(item)}>
                                <img
                                  className="w-6 h-6"
                                  src={editIcon}
                                  alt="Edit"
                                />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </>
              )}
            </Pagination>
          </div>
        </div>
      )}

      {/* Popup Section */}
      {isPopupOpen && (
        <AddSaftyStockPopup
          onClose={() => setIsPopupOpen(false)}
          reloadData={GetDataStock}
          data={SelectEditId}
          status={Status}
        />
      )}
    </div>
  );
};

export default SafetyStock;
