import React from "react";
import { CardPerPageSelectorProps } from "../types";

const CardPerPageSelector: React.FC<CardPerPageSelectorProps> = ({
  limit,
  onLimitChange,
}) => {
  return (
    <div>
      Show:
      <select
        value={limit}
        onChange={(e) => onLimitChange(parseInt(e.target.value, 10))}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
      cards per page
    </div>
  );
};

export default CardPerPageSelector;