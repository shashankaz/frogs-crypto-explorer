import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalCount: number;
  limit: number;
  setLimit: (limit: number) => void;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  totalCount,
  limit,
  setLimit,
  totalPages,
  hasNextPage,
  hasPrevPage,
}) => {
  return (
    <div className="px-2 py-4 text-xs border-t flex flex-col gap-4 md:flex-row items-center justify-between w-full">
      <div>
        Showing
        <select
          name="limit"
          id="limit"
          className="border mx-2 rounded px-1"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
        >
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        of {totalCount} records
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => setCurrentPage(1)} disabled={!hasPrevPage}>
          <ChevronsLeft
            className={`size-4 cursor-pointer ${
              !hasPrevPage ? "text-gray-400" : "text-blue-500"
            }`}
          />
        </button>
        <button
          onClick={() => hasPrevPage && setCurrentPage(currentPage - 1)}
          disabled={!hasPrevPage}
        >
          <ChevronLeft
            className={`size-4 cursor-pointer ${
              !hasPrevPage ? "text-gray-400" : "text-blue-500"
            }`}
          />
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => hasNextPage && setCurrentPage(currentPage + 1)}
          disabled={!hasNextPage}
        >
          <ChevronRight
            className={`size-4 cursor-pointer ${
              !hasNextPage ? "text-gray-400" : "text-blue-500"
            }`}
          />
        </button>
        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={!hasNextPage}
        >
          <ChevronsRight
            className={`size-4 cursor-pointer ${
              !hasNextPage ? "text-gray-400" : "text-blue-500"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
