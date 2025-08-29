import React from "react";

interface AsciiPaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
  showFirstLast?: boolean;
}

export const AsciiPagination: React.FC<AsciiPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
  showFirstLast = true,
  className = "",
  ...props
}) => {
  const getVisiblePages = (): (number | string)[] => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);

    if (endPage - startPage + 1 < maxVisiblePages) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      } else {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number' && page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const visiblePages = getVisiblePages();

  return (
    <div
      {...props}
      className={`font-mono flex items-center gap-1 text-white ${className}`}
    >
      {/* Previous Button */}
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`
          px-2 py-1 before:content-['['] after:content-[']']
          ${currentPage <= 1 
            ? 'text-gray-500 cursor-not-allowed' 
            : 'text-white hover:text-green-400 cursor-pointer'}
        `}
      >
        Prev
      </button>

      {/* First Page (if not visible and showFirstLast is true) */}
      {showFirstLast && visiblePages[0] !== 1 && (
        <>
          <button
            onClick={() => handlePageClick(1)}
            className="px-2 py-1 text-white hover:text-green-400 cursor-pointer"
          >
            1
          </button>
          {visiblePages[0] !== 2 && (
            <span className="px-1 text-gray-400">...</span>
          )}
        </>
      )}

      {/* Page Numbers */}
      {visiblePages.map((page, index) => (
        <React.Fragment key={index}>
          {typeof page === 'number' ? (
            <button
              onClick={() => handlePageClick(page)}
              className={`
                px-2 py-1 min-w-[2rem] text-center
                ${page === currentPage 
                  ? 'bg-white text-black font-bold' 
                  : 'text-white hover:text-green-400 cursor-pointer'}
              `}
            >
              {page}
            </button>
          ) : (
            <span className="px-1 text-gray-400">{page}</span>
          )}
        </React.Fragment>
      ))}

      {/* Last Page (if not visible and showFirstLast is true) */}
      {showFirstLast && visiblePages[visiblePages.length - 1] !== totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] !== totalPages - 1 && (
            <span className="px-1 text-gray-400">...</span>
          )}
          <button
            onClick={() => handlePageClick(totalPages)}
            className="px-2 py-1 text-white hover:text-green-400 cursor-pointer"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`
          px-2 py-1 before:content-['['] after:content-[']']
          ${currentPage >= totalPages 
            ? 'text-gray-500 cursor-not-allowed' 
            : 'text-white hover:text-green-400 cursor-pointer'}
        `}
      >
        Next
      </button>
    </div>
  );
};