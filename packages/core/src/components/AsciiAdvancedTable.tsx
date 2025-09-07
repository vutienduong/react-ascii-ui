import React, { useState, useMemo, useCallback } from 'react';
import { useAsciiTheme } from '../contexts/ThemeContext';

export interface AsciiTableColumn {
  key: string;
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: any, index: number) => React.ReactNode;
}

export interface AsciiAdvancedTableProps extends React.HTMLAttributes<HTMLDivElement> {
  columns: AsciiTableColumn[];
  data: Record<string, any>[];
  caption?: string;
  sortable?: boolean;
  filterable?: boolean;
  paginated?: boolean;
  pageSize?: number;
  searchable?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: any, index: number) => void;
}

type SortDirection = 'asc' | 'desc' | null;

interface SortState {
  column: string | null;
  direction: SortDirection;
}

export const AsciiAdvancedTable: React.FC<AsciiAdvancedTableProps> = ({
  columns,
  data,
  caption,
  sortable = true,
  filterable = true,
  paginated = true,
  pageSize = 10,
  searchable = true,
  loading = false,
  emptyMessage = 'No data available',
  onRowClick,
  className = '',
  style,
  ...props
}) => {
  const { theme } = useAsciiTheme();
  const [sortState, setSortState] = useState<SortState>({ column: null, direction: null });
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [globalSearch, setGlobalSearch] = useState('');

  // Apply global search
  const searchFilteredData = useMemo(() => {
    if (!globalSearch.trim()) return data;
    
    return data.filter(row =>
      Object.values(row).some(value =>
        String(value).toLowerCase().includes(globalSearch.toLowerCase())
      )
    );
  }, [data, globalSearch]);

  // Apply column filters
  const columnFilteredData = useMemo(() => {
    return searchFilteredData.filter(row => {
      return Object.entries(filters).every(([column, filterValue]) => {
        if (!filterValue.trim()) return true;
        const cellValue = String(row[column] || '').toLowerCase();
        return cellValue.includes(filterValue.toLowerCase());
      });
    });
  }, [searchFilteredData, filters]);

  // Apply sorting
  const sortedData = useMemo(() => {
    if (!sortState.column || !sortState.direction) return columnFilteredData;

    return [...columnFilteredData].sort((a, b) => {
      const aValue = a[sortState.column!];
      const bValue = b[sortState.column!];

      // Handle null/undefined values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return sortState.direction === 'asc' ? -1 : 1;
      if (bValue == null) return sortState.direction === 'asc' ? 1 : -1;

      // Sort by type
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortState.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();
      
      if (aStr < bStr) return sortState.direction === 'asc' ? -1 : 1;
      if (aStr > bStr) return sortState.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [columnFilteredData, sortState]);

  // Apply pagination
  const paginatedData = useMemo(() => {
    if (!paginated) return sortedData;
    
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize, paginated]);

  const totalPages = paginated ? Math.ceil(sortedData.length / pageSize) : 1;

  const handleSort = useCallback((columnKey: string) => {
    const column = columns.find(col => col.key === columnKey);
    if (!column?.sortable && !sortable) return;

    setSortState(prev => {
      if (prev.column === columnKey) {
        // Cycle through: asc -> desc -> null
        const nextDirection: SortDirection = 
          prev.direction === 'asc' ? 'desc' :
          prev.direction === 'desc' ? null : 'asc';
        return { column: nextDirection ? columnKey : null, direction: nextDirection };
      } else {
        return { column: columnKey, direction: 'asc' };
      }
    });
  }, [columns, sortable]);

  const handleFilter = useCallback((columnKey: string, value: string) => {
    setFilters(prev => ({ ...prev, [columnKey]: value }));
    setCurrentPage(1); // Reset to first page when filtering
  }, []);

  const getSortIcon = (columnKey: string) => {
    if (sortState.column !== columnKey) return '↕';
    return sortState.direction === 'asc' ? '↑' : '↓';
  };

  const getAlignClass = (align?: string) => {
    switch (align) {
      case 'center': return 'text-center';
      case 'right': return 'text-right';
      case 'left':
      default: return 'text-left';
    }
  };

  const formatCellContent = (value: any, column: AsciiTableColumn, row: any, index: number) => {
    if (column.render) {
      return column.render(value, row, index);
    }
    if (value === null || value === undefined) return '';
    if (typeof value === 'boolean') return value ? '✓' : '✗';
    return String(value);
  };

  if (loading) {
    return (
      <div 
        className={`font-mono ${className}`}
        style={{ fontFamily: theme.typography.fontFamily, color: theme.colors.text, ...style }}
      >
        <div className="text-center py-8">
          <div className="animate-spin inline-block" style={{ color: theme.colors.primary }}>
            ⟳
          </div>
          <div className="mt-2">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div
      {...props}
      className={`font-mono ${className}`}
      style={{ fontFamily: theme.typography.fontFamily, color: theme.colors.text, ...style }}
    >
      {caption && (
        <div 
          className="mb-4 font-bold text-center text-lg"
          style={{ color: theme.colors.primary }}
        >
          {caption}
        </div>
      )}

      {/* Search Bar */}
      {searchable && (
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <span style={{ color: theme.colors.textSecondary }}>🔍</span>
            <input
              type="text"
              placeholder="Search all columns..."
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              className="flex-1 bg-transparent border-b px-2 py-1 focus:outline-none focus:border-opacity-100"
              style={{ 
                borderColor: theme.colors.border,
                color: theme.colors.text 
              }}
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div 
        className="border"
        style={{ borderColor: theme.colors.border }}
      >
        {/* Table Header */}
        <div 
          className="flex"
          style={{ backgroundColor: theme.colors.surface }}
        >
          {columns.map((column, index) => (
            <div
              key={column.key}
              className={`px-3 py-2 font-bold border-r last:border-r-0 ${getAlignClass(column.align)}`}
              style={{ 
                width: column.width || `${100 / columns.length}%`,
                borderColor: theme.colors.border,
                color: theme.colors.text
              }}
            >
              <div className="flex items-center justify-between">
                <span>{column.header}</span>
                {(column.sortable !== false && sortable) && (
                  <button
                    onClick={() => handleSort(column.key)}
                    className="ml-2 hover:opacity-70 focus:outline-none"
                    style={{ color: theme.colors.primary }}
                  >
                    {getSortIcon(column.key)}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Column Filters */}
        {filterable && (
          <div 
            className="flex border-t"
            style={{ 
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.background 
            }}
          >
            {columns.map((column) => (
              <div
                key={`filter-${column.key}`}
                className="px-2 py-1 border-r last:border-r-0"
                style={{ 
                  width: column.width || `${100 / columns.length}%`,
                  borderColor: theme.colors.border
                }}
              >
                {column.filterable !== false && (
                  <input
                    type="text"
                    placeholder="Filter..."
                    value={filters[column.key] || ''}
                    onChange={(e) => handleFilter(column.key, e.target.value)}
                    className="w-full bg-transparent text-xs px-1 py-1 focus:outline-none"
                    style={{ color: theme.colors.textSecondary }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Table Body */}
        <div>
          {paginatedData.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`flex border-t hover:opacity-80 ${onRowClick ? 'cursor-pointer' : ''}`}
              style={{ borderColor: theme.colors.border }}
              onClick={() => onRowClick?.(row, rowIndex)}
            >
              {columns.map((column) => (
                <div
                  key={`${rowIndex}-${column.key}`}
                  className={`px-3 py-2 border-r last:border-r-0 ${getAlignClass(column.align)}`}
                  style={{ 
                    width: column.width || `${100 / columns.length}%`,
                    borderColor: theme.colors.border,
                    color: theme.colors.text
                  }}
                >
                  {formatCellContent(row[column.key], column, row, rowIndex)}
                </div>
              ))}
            </div>
          ))}

          {/* Empty State */}
          {paginatedData.length === 0 && (
            <div 
              className="text-center py-8"
              style={{ color: theme.colors.textSecondary }}
            >
              {emptyMessage}
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {paginated && totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div style={{ color: theme.colors.textSecondary }}>
            Showing {Math.min((currentPage - 1) * pageSize + 1, sortedData.length)}-
            {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} entries
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 border disabled:opacity-50 hover:opacity-70 focus:outline-none"
              style={{ 
                borderColor: theme.colors.border,
                color: theme.colors.text,
                opacity: currentPage === 1 ? 0.5 : 1
              }}
            >
              ‹
            </button>

            <span style={{ color: theme.colors.text }}>
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-2 py-1 border disabled:opacity-50 hover:opacity-70 focus:outline-none"
              style={{ 
                borderColor: theme.colors.border,
                color: theme.colors.text,
                opacity: currentPage === totalPages ? 0.5 : 1
              }}
            >
              ›
            </button>
          </div>
        </div>
      )}

      {/* Stats */}
      {(filterable || searchable) && (
        <div className="mt-2 text-xs" style={{ color: theme.colors.textSecondary }}>
          {sortedData.length !== data.length && (
            <span>Filtered: {sortedData.length} / {data.length} entries</span>
          )}
        </div>
      )}
    </div>
  );
};