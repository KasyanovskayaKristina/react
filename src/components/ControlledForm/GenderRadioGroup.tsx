import React from 'react';
import styles from './ControlledForm.module.css';

interface GenderRadioGroupProps {
  selectedValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | undefined;
}

const GenderRadioGroup: React.FC<GenderRadioGroupProps> = ({
  selectedValue,
  onChange,
  error,
}) => (
  <div className={styles.gender}>
    <label className={styles.label}>
      Male
      <input
        className={styles.input}
        type="radio"
        name="gender"
        value="male"
        checked={selectedValue === 'male'}
        onChange={onChange}
      />
    </label>
    <label className={styles.label}>
      Female
      <input
        className={styles.input}
        type="radio"
        name="gender"
        value="female"
        checked={selectedValue === 'female'}
        onChange={onChange}
      />
    </label>
    <label className={styles.label}>
      Other
      <input
        className={styles.input}
        type="radio"
        name="gender"
        value="other"
        checked={selectedValue === 'other'}
        onChange={onChange}
      />
    </label>
    {error && <p className={styles.p}>{error}</p>}
  </div>
);

export default GenderRadioGroup;
