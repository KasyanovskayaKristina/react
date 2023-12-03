import React from 'react';
import styles from '../ControlledForm/ControlledForm.module.css';

interface YourCountryType {
  id: string;
  name: string;
}

interface CountrySelectProps {
  inputRef: React.RefObject<HTMLInputElement>;
  countryRef: React.RefObject<HTMLSelectElement>;
  handleInputChange: () => void;
  filteredCountries: YourCountryType[];
  formErrors: {
    country?: string;
  };
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  inputRef,
  countryRef,
  handleInputChange,
  filteredCountries,
  formErrors,
}) => (
  <div className="countryPartTwo">
    <label className={styles.label}>Country:</label>
    <input
      type="text"
      placeholder="Search for a country"
      ref={inputRef}
      onChange={handleInputChange}
      className={styles.inputSearch}
    />
    <select name="country" ref={countryRef} className={styles.selectWrapper}>
      {filteredCountries.map((country) => (
        <option key={country.id} value={country.id}>
          {country.name}
        </option>
      ))}
    </select>
    {formErrors.country && <p className={styles.p}>{formErrors.country}</p>}
  </div>
);

export default CountrySelect;
