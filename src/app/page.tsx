/** @format */

"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

const BarcodeScanner = dynamic(
  () => {
    import("react-barcode-scanner/polyfill");
    return import("react-barcode-scanner").then((mod) => mod.BarcodeScanner);
  },
  { ssr: false }
);

function MyBarcodeScannerPage() {
  // Explicitly set the type of the state to string[]
  const [scannedItems, setScannedItems] = useState<string[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  // The `barcodes` parameter can also be typed for better safety
  const handleCapture = (barcodes: { rawValue: string }[]) => {
    if (barcodes.length > 0) {
      const newBarcode = barcodes[0].rawValue;

      if (!scannedItems.includes(newBarcode)) {
        setScannedItems((prevItems) => [...prevItems, newBarcode]);
        console.log("New barcode captured:", newBarcode);
      }
    }
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <div>
      <h1>Scan a Product Barcode</h1>

      <div style={{ position: "relative", width: "100%", height: "300px" }}>
        <BarcodeScanner onCapture={handleCapture} paused={isPaused} />
        {isPaused && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            Scanning Paused
          </div>
        )}
      </div>

      <button onClick={togglePause}>
        {isPaused ? "Resume Scanning" : "Pause Scanning"}
      </button>

      <h2>Scanned Items:</h2>
      <ul>
        {scannedItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default MyBarcodeScannerPage;
