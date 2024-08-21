import React from 'react';
import Papa from 'papaparse';

const FileUpload = ({ onDataParsed }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== 'text/csv') {
        alert('Please upload a CSV file');
        return;
      }

      Papa.parse(file, {
        complete: (result) => {
          if (result.data.length > 0) {
            onDataParsed(result.data);
          } else {
            alert('The CSV file is empty');
          }
        },
        header: true,
        error: (error) => {
          console.error('Error parsing CSV:', error);
          alert('An error occurred while parsing the CSV file');
        },
      });
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Upload CSV File</label>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="mt-1 block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100"
      />
    </div>
  );
};

export default FileUpload;