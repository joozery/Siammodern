import React, { useState, useRef } from "react";

const SignaturePopup = ({ isOpen, onClose, onSave }) => {
  const canvasRef = useRef(null);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    const signature = canvas.toDataURL("image/png");
    onSave(signature);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white w-[90%] max-w-lg rounded-md shadow-md p-6">
        <h2 className="text-lg font-bold text-center mb-4">วาดลายเซ็น</h2>
        <canvas
          ref={canvasRef}
          className="border w-full h-40 bg-gray-100 rounded-md"
          width={600}
          height={200}
          style={{ touchAction: "none" }}
          onMouseDown={(e) => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            ctx.beginPath();
            ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
            canvas.isDrawing = true;
          }}
          onMouseMove={(e) => {
            const canvas = canvasRef.current;
            if (!canvas.isDrawing) return;
            const ctx = canvas.getContext("2d");
            ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
            ctx.stroke();
          }}
          onMouseUp={() => {
            const canvas = canvasRef.current;
            canvas.isDrawing = false;
          }}
          onMouseOut={() => {
            const canvas = canvasRef.current;
            canvas.isDrawing = false;
          }}
        ></canvas>
        <p className="text-sm text-gray-500 text-center mt-2">
          I understand this is a legal representation of my signature.
        </p>
        <div className="flex justify-between mt-6">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md shadow-md hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
            onClick={clearCanvas}
          >
            Clear All
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignaturePopup;