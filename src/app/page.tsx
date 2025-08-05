/** @format */

"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const BarcodeScanner = dynamic(
  () => {
    import("react-barcode-scanner/polyfill");
    return import("react-barcode-scanner").then((mod) => mod.BarcodeScanner);
  },
  { ssr: false }
);

export default () => {
  const [capturedBarcodes, setCapturedBarcodes] = useState([]);

  const handleCapture = (barcodes: any) => {
    setCapturedBarcodes(barcodes);
    console.log("Captured barcodes:", barcodes); // Optional: log the captured barcodes to the console
  };

  return (
    <div>
      <div className="w-[600px]">
        <BarcodeScanner onCapture={handleCapture} />
      </div>
      <h3>Captured Barcode(s):</h3>
      {capturedBarcodes.length > 0 && (
        <div>
          <ul>
            {capturedBarcodes.map((barcode, index) => (
              <li key={index}>
                <strong>Format:</strong> {barcode.format},{" "}
                <strong>Content:</strong> {barcode.rawValue}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
