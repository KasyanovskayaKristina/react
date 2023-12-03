import React from 'react';
import styles from './ControlledForm.module.css';

interface AgeInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | undefined;
}

const AgeInput: React.FC<AgeInputProps> = ({ value, onChange, error }) => (
  <div className={styles.formLine}>
    <label className={styles.label}>Age:</label>
    <input
      type="number"
      name="age"
      value={value}
      onChange={onChange}
      className={styles.input}
    />
    {error && <p className={styles.p}>{error}</p>}
  </div>
);

export default AgeInput;
