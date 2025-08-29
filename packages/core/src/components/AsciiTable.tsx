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
      
      {/* Table Container */}
      <div className="border border-white">
        {/* Header Row */}
        <div className="border-b border-white bg-white text-black flex">
          {columns.map((column, index) => (
            <div
              key={column.key}
              className={`
                px-2 py-1 flex-1 border-r border-black last:border-r-0
                font-bold ${getAlignClass(column.align)}
                ${column.width || ''}
              `}
            >
              {column.header}
            </div>
          ))}
        </div>

        {/* Data Rows */}
        {data.map((row, rowIndex) => (
          <div key={rowIndex} className="flex border-b border-white last:border-b-0">
            {columns.map((column, colIndex) => (
              <div
                key={`${rowIndex}-${column.key}`}
                className={`
                  px-2 py-1 flex-1 border-r border-white last:border-r-0
                  ${getAlignClass(column.align)}
                  ${column.width || ''}
                `}
              >
                {formatCellContent(row[column.key])}
              </div>
            ))}
          </div>
        ))}

        {/* Empty State */}
        {data.length === 0 && (
          <div className="px-4 py-8 text-center text-gray-400 border-t border-white">
            No data available
          </div>
        )}
      </div>
    </div>
  );
};