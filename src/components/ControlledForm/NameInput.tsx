import React from 'react';
import styles from './ControlledForm.module.css';

interface NameInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | undefined;
}

const NameInput: React.FC<NameInputProps> = ({ value, onChange, error }) => (
  <div className={styles.formLine}>
    <label className={styles.label}>Name:</label>
    <input
      type="text"
      name="name"
      value={value}
      onChange={onChange}
      className={styles.input}
    />
    {error && <p className={styles.p}>{error}</p>}
  </div>
);

export default NameInput;
