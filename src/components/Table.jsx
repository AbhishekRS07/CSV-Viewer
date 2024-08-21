import React, { useState, useMemo } from 'react';
import { useTable, usePagination, useRowSelect } from 'react-table';
import {  SortAscendingIcon, SortDescendingIcon } from '@heroicons/react/solid';

const Table = ({ data }) => {
  const columns = useMemo(
    () => (data[0] ? Object.keys(data[0]).map((key) => ({ Header: key, accessor: key })) : []),
    [data]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <input type="checkbox" {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  const [selectedColumns, setSelectedColumns] = useState(new Set());
  const [sortDirection, setSortDirection] = useState({});

  const toggleColumnSelection = (columnId) => {
    setSelectedColumns((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(columnId)) {
        newSet.delete(columnId);
      } else {
        newSet.add(columnId);
      }
      return newSet;
    });
  };

  const handleColumnSort = (columnId) => {
    setSortDirection((prevState) => {
      const newDirection = prevState[columnId] === 'asc' ? 'desc' : 'asc';
      return { ...prevState, [columnId]: newDirection };
    });
  };

  return (
    <div className="overflow-x-auto">
        <div className="pagination mt-4 flex justify-between items-center">
        <div>
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className="mr-2 px-3 py-1 bg-gray-200 rounded transition-colors duration-300 hover:bg-gray-300"
          >
            {'<<'}
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="mr-2 px-3 py-1 bg-gray-200 rounded transition-colors duration-300 hover:bg-gray-300"
          >
            {'<'}
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="mr-2 px-3 py-1 bg-gray-200 rounded transition-colors duration-300 hover:bg-gray-300"
          >
            {'>'}
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className="mr-2 px-3 py-1 bg-gray-200 rounded transition-colors duration-300 hover:bg-gray-300"
          >
            {'>>'}
          </button>
        </div>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
          className="ml-2 px-3 py-1 bg-gray-200 rounded transition-colors duration-300 hover:bg-gray-300"
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer transition-colors duration-300 ${
                    selectedColumns.has(column.id) ? 'bg-blue-100' : ''
                  }`}
                  onClick={() => {
                    toggleColumnSelection(column.id);
                    handleColumnSort(column.id);
                  }}
                >
                  <div className="flex items-center">
                    {column.render('Header')}
                    {sortDirection[column.id] === 'asc' && <SortAscendingIcon className="w-4 h-4 ml-2" />}
                    {sortDirection[column.id] === 'desc' && <SortDescendingIcon className="w-4 h-4 ml-2" />}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className={`transition-colors duration-300 ${row.isSelected ? 'bg-blue-50' : ''}`}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className={`px-6 py-4 whitespace-nowrap transition-colors duration-300 ${
                        selectedColumns.has(cell.column.id) ? 'bg-blue-50' : ''
                      }`}
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    
    </div>
  );
};

export default Table;