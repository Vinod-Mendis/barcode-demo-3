/** @format */

"use client";

import React, { useState, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { useTorch } from "react-barcode-scanner";
import "react-barcode-scanner/polyfill";
import { BarcodeFormatSelector } from "./components/BarcodeFormatSelector";

// ✅ Dynamically import BarcodeScanner (no SSR)
const BarcodeScanner = dynamic(
  async () => {
    await import("react-barcode-scanner/polyfill"); // preload polyfill
    const mod = await import("react-barcode-scanner");
    return mod.BarcodeScanner;
  },
  { ssr: false }
);

// Main Page Component
export default function BarcodeScannerPage() {
  const { isTorchSupported, setIsTorchOn, isTorchOn } = useTorch();
  const [formats, setFormats] = useState(["qr_code"]);
  const [delay, setDelay] = useState("500");
  const [paused, setPaused] = useState(false);

  const options = useMemo(
    () => ({
      delay: Number(delay),
      formats,
    }),
    [delay, formats]
  );

  const onDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, "");
    setDelay(value);
  };

  const onCapture = useCallback((barcodes: { rawValue: string }[]) => {
    if (barcodes) {
      window.alert(barcodes.map((barcode) => barcode.rawValue).join("\n"));
    }
  }, []);

  const onPause = () => {
    setPaused((prev) => !prev);
  };

  return (
    <div style={{ padding: "16px" }}>
      <h3>Props</h3>

      <div style={{ marginTop: "12px" }}>
        <label>
          Delay (ms):
          <input
            type="text"
            value={delay}
            onChange={onDelayChange}
            style={{
              marginLeft: "8px",
              border: "1px solid #ccc",
              padding: "4px",
            }}
          />
        </label>
      </div>

      <div style={{ marginTop: "12px" }}>
        <label>Barcode Formats:</label>
        <BarcodeFormatSelector
          selected={formats}
          onSelectFormats={setFormats}
        />
      </div>

      <div style={{ marginTop: "12px" }}>
        <label>Status:</label>
        <button onClick={onPause} style={{ marginLeft: "8px" }}>
          {paused ? "Play" : "Pause"}
        </button>
      </div>

      <h3 style={{ marginTop: "24px" }}>Result</h3>
      <div style={{ position: "relative", width: "100%", height: "440px" }}>
        <BarcodeScanner
          options={options}
          onCapture={onCapture}
          paused={paused}
        />
        {isTorchSupported && (
          <button
            onClick={() => setIsTorchOn(!isTorchOn)}
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              zIndex: 10,
              padding: "6px 12px",
              border: "none",
              background: "#000",
              color: "#fff",
              borderRadius: "4px",
            }}>
            Toggle Torch
          </button>
        )}
      </div>
    </div>
  );
}
