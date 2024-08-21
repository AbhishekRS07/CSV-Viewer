import React, { useState } from "react";
import Papa from "papaparse";

const FileUpload = ({ onDataParsed }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleFileUpload = (file) => {
    if (file) {
      if (file.type !== "text/csv") {
        alert("Please upload a CSV file");
        return;
      }

      Papa.parse(file, {
        complete: (result) => {
          if (result.data.length > 0) {
            onDataParsed(result.data);
          } else {
            alert("The CSV file is empty");
          }
        },
        header: true,
        error: (error) => {
          console.error("Error parsing CSV:", error);
          alert("An error occurred while parsing the CSV file");
        },
      });
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`mb-4 p-4 border-2 rounded-md transition-colors duration-300 ${
        isDragOver ? "border-blue-500" : "border-gray-300"
      }`}
    >
      <label className="block text-sm font-medium text-gray-700">
        Upload CSV File
      </label>
      <input
        type="file"
        accept=".csv"
        onChange={(event) => handleFileUpload(event.target.files[0])}
        className="mt-1 block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};

export default FileUpload;
