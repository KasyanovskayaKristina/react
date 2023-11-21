import React from "react";
import { Link, useLocation } from "react-router-dom";

interface PaginationProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pageSize,
  totalItems,
  onPageChange,
  currentPage,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const location = useLocation();

  const handlePageChange = (newPage: number) => {
    onPageChange(newPage);
    console.log(newPage);
  };

  return (
    <div>
      {currentPage > 1 && (
        <Link
          to={`${location.pathname}?page=${
            currentPage - 1
          }&pageSize=${pageSize}`}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Prev
        </Link>
      )}
      <span>Page: {currentPage}</span>
      {currentPage < totalPages && (
        <Link
          to={`${location.pathname}?page=${
            currentPage + 1
          }&pageSize=${pageSize}`}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Link>
      )}
    </div>
  );
};

export default Pagination;
