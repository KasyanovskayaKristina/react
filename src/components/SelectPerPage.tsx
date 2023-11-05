import React from "react";
import './Selectpage.css'
import { SelectPerPageProps } from "../interface/interface";

const SelectPerPage: React.FC<SelectPerPageProps> = ({
  perPageOptions,
  selectedPerPage,
  onChangePerPage,
}) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = parseInt(e.target.value, 10);
    onChangePerPage(newPerPage);
  };

  return (
    <div >
      <label htmlFor="perPageSelect"></label>
      <select
        id="perPageSelect"
        value={selectedPerPage}
        onChange={handleSelectChange}
      >
        {perPageOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectPerPage;
