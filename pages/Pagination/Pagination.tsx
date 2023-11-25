import React from "react";
import { PaginationProps } from "../types";

const Pagination: React.FC<PaginationProps> = ({
  page,
  total,
  onPageChange,
}) => {
  return (
    <div>
      <p>Page: {page}</p>
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
        Previous Page
      </button>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page * 20 >= total}
      >
        Next Page
      </button>
    </div>
  );
};

export default Pagination;
