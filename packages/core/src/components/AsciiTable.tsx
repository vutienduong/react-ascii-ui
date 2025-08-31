import React from "react";

interface AsciiTableColumn {
  key: string;
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

interface AsciiTableProps extends React.HTMLAttributes<HTMLDivElement> {
  columns: AsciiTableColumn[];
  data: Record<string, any>[];
  caption?: string;
}

export const AsciiTable: React.FC<AsciiTableProps> = ({
  columns,
  data,
  caption,
  className = "",
  ...props
}) => {
  const getAlignClass = (align?: string) => {
    switch (align) {
      case 'center': return 'text-center';
      case 'right': return 'text-right';
      case 'left':
      default: return 'text-left';
    }
  };

  const formatCellContent = (value: any): string => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'boolean') return value ? 'true' : 'false';
    return String(value);
  };

  return (
    <div
      {...props}
      className={`font-mono text-white ${className}`}
    >
      {caption && (
        <div className="mb-2 font-bold text-center">
          {caption}
        </div>
      )}
      
      {/* HTML Table Structure */}
      <table className="w-full border-collapse border border-white">
        {/* Table Header */}
        <thead>
          <tr className="bg-white text-black">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`
                  px-2 py-1 border-r border-black last:border-r-0
                  font-bold ${getAlignClass(column.align)}
                `}
                style={{ width: column.width }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-white last:border-b-0">
              {columns.map((column) => (
                <td
                  key={`${rowIndex}-${column.key}`}
                  className={`
                    px-2 py-1 border-r border-white last:border-r-0
                    ${getAlignClass(column.align)}
                  `}
                >
                  {formatCellContent(row[column.key])}
                </td>
              ))}
            </tr>
          ))}

          {/* Empty State */}
          {data.length === 0 && (
            <tr>
              <td 
                colSpan={columns.length}
                className="px-4 py-8 text-center text-gray-400 border-t border-white"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};