import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import DataTable from './components/Table';

function App() {
  const [data, setData] = useState([]);

  const handleDataParsed = (parsedData) => {
    setData(parsedData);
  };

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-3xl font-bold mb-4 flex justify-center">CSV Viewer</h1>
      <FileUpload onDataParsed={handleDataParsed} />
      {data.length > 0 && <DataTable data={data} />}
    </div>
  );
}

export default App;