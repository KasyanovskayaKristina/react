import React from "react";
import { PaginationProps } from "../types";
import styles from "./Pagination.module.css";

const Pagination: React.FC<PaginationProps> = ({
  page,
  total,
  onPageChange,
}) => {
  return (
    <div className={styles.container}>
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        data-testid="page-2-button"
        className={styles.button}
      >
        Prev
      </button>
      <p className={styles.p}>Page: {page}</p>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page * 20 >= total}
        className={styles.button}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
