import React from 'react';
import styles from './ControlledForm.module.css';

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | undefined;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  error,
}) => (
  <div className={styles.formLine}>
    <label className={styles.label}>Password:</label>
    <input
      className={styles.input}
      type="password"
      name="password"
      value={value}
      onChange={onChange}
    />
    {error && <p className={styles.p}>{error}</p>}
  </div>
);

export default PasswordInput;
