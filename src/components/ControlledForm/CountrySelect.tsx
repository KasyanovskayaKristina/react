import React from 'react';
import styles from './ControlledForm.module.css';
interface CountrySelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  countries: { id: string; name: string }[];
  error: string | undefined;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange,
  countries,
  error,
}) => (
  <div className="countryPart">
    <label htmlFor="country" className={styles.label}>
      Country
    </label>
    <select
      id="country"
      name="country"
      value={value}
      onChange={onChange}
      className={styles.selectWrapper}
      required
    >
      <option value="" disabled>
        Choose country
      </option>
      {countries.map((country) => (
        <option key={country.id} value={country.name}>
          {country.name}
        </option>
      ))}
    </select>
    {error && <p className={styles.p}>{error}</p>}
  </div>
);

export default CountrySelect;
