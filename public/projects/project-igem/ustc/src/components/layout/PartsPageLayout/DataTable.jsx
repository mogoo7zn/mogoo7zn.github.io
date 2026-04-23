// components/DataTable.jsx
import React from 'react';

// Helper function: parse %...% into <i>...</i>
const parseItalics = (text) => {
  if (typeof text !== 'string') return text;

  const parts = text.split('%');
  return parts.map((part, i) =>
    i % 2 === 1 ? <i key={i} className="italic">{part}</i> : part
  );
};

const DataTable = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 table-auto">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                style={col.width ? { width: col.width } : {}}
                className={`px-6 py-3 border-b border-gray-300 text-sm font-medium text-gray-700 ${
                  col.align === 'center' ? 'text-center' : 'text-left'
                }`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${
                rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              } hover:bg-gray-200`}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  style={col.width ? { width: col.width } : {}}
                  className={`px-2 py-3 border-b border-gray-200 text-sm text-gray-600 ${
                    col.align === 'center' ? 'text-center' : 'text-left'
                  }`}
                >
                  {parseItalics(row[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
