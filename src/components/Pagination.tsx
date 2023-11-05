import React from "react";
import "./Pagination.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = new Array(totalPages).fill(0).map((_, index) => index + 1);

  return (
    <div className="pagination">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{ fontWeight: currentPage === page ? "bold" : "normal" }}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
