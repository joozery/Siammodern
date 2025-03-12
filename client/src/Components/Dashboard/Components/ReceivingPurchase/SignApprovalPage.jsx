import React, { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

const SignApprovalPage = () => {
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [selectedSignature, setSelectedSignature] = useState(null);
  const [savedSignature, setSavedSignature] = useState(null);

  // Reference to the signature pad
  const sigPadRef = useRef();

  const handleSign = (signatureType) => {
    setSelectedSignature(signatureType);
    setShowSignatureModal(true);
  };

  const handleCloseModal = () => {
    setShowSignatureModal(false);
    setSelectedSignature(null);
  };

  const handleSaveSignature = () => {
    // Save signature as a base64 image
    if (sigPadRef.current.isEmpty()) {
      alert("Please provide a signature before saving.");
      return;
    }
    const signatureData = sigPadRef.current.getTrimmedCanvas().toDataURL("image/png");
    setSavedSignature(signatureData);
    setShowSignatureModal(false);
    alert("Signature saved successfully!");
  };

  const handleClearSignature = () => {
    sigPadRef.current.clear();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="bg-white p-6 shadow-md rounded-lg mb-6">
        <h1 className="text-3xl font-bold text-gray-800">เลขที่ PR: 19440</h1>
      </div>

      {/* Stepper */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">กระบวนการ</h2>
        <div className="flex items-center space-x-6 overflow-x-auto no-scrollbar">
          {[
            "สร้างใบขอซื้อ",
            "ผู้ขอซื้อ",
            "หัวหน้าแผนกต้นสังกัด /ตรวจเช็ค",
            "ผู้จัดการฝ่ายต้นสังกัด /อนุมัติ",
            "คลังสินค้า /ตรวจเช็ค",
            "ผู้จัดซื้อ /ตรวจเช็ค",
            "กรรมการ/รองกรรมการ /อนุมัติ",
            "อนุมัติแล้ว",
          ].map((step, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 last:space-x-0"
            >
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold ${
                  index === 0
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`${
                  index === 0 ? "font-bold text-gray-900" : "text-gray-500"
                } text-sm`}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* PDF Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">เอกสารที่เกี่ยวข้อง</h2>
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 flex items-center justify-center bg-red-100 text-red-600 rounded-lg">
              PDF
            </div>
            <div>
              <p className="text-base font-semibold text-gray-800">PR_19440.pdf</p>
              <p className="text-sm text-gray-500">ไฟล์ PDF</p>
            </div>
          </div>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700">
            ดาวน์โหลด
          </button>
        </div>
      </div>

      {/* Signature Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">การเซ็นอนุมัติ</h2>
        <div className="grid gap-6">
          {[
            "ลายเซ็นผู้ขอซื้อ",
            "ลายเซ็นหัวหน้าแผนก",
            "ลายเซ็นกรรมการ",
          ].map((label, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm"
            >
              <span className="text-sm font-semibold text-gray-800">{label}</span>
              <button
                onClick={() => handleSign(label)}
                className="px-6 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700"
              >
                เซ็น
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Signature Modal */}
      {showSignatureModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              วาดลายเซ็น ({selectedSignature})
            </h2>
            <SignatureCanvas
              ref={sigPadRef}
              penColor="black"
              canvasProps={{
                className: "w-full h-40 border border-gray-300 rounded-md",
              }}
            />
            <p className="text-sm text-gray-600 text-center mt-4">
              I understand this is a legal representation of my signature.
            </p>
            <div className="flex justify-between mt-6">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md shadow hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleClearSignature}
                className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
              >
                Clear All
              </button>
              <button
                onClick={handleSaveSignature}
                className="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignApprovalPage;