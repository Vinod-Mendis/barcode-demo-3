/** @format */

import React from "react";

// Define the props interface
interface BarcodeFormatSelectorProps {
  selected: string[];
  onSelectFormats: (formats: string[]) => void;
}

// Barcode Format Selector Component
export const BarcodeFormatSelector = ({
  selected,
  onSelectFormats,
}: BarcodeFormatSelectorProps) => {
  const formats = [
    "code_128",
    "code_39",
    "code_93",
    "codabar",
    "ean_13",
    "ean_8",
    "itf",
    "qr_code",
    "upc_a",
    "upc_e",
  ];

  const toggleFormat = (format: string) => {
    const newSelected = selected.includes(format)
      ? selected.filter((f: string) => f !== format)
      : [...selected, format];
    onSelectFormats(newSelected);
  };

  return (
    <div style={{ display: "flex", gap: "4px 8px", flexWrap: "wrap" }}>
      {formats.map((format) => (
        <label
          key={format}
          style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <input
            type="checkbox"
            checked={selected.includes(format)}
            onChange={() => toggleFormat(format)}
          />
          {format}
        </label>
      ))}
    </div>
  );
};
