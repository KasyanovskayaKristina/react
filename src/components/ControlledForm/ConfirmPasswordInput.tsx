import React from 'react';
import styles from './ControlledForm.module.css';

interface ConfirmPasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | undefined;
}

const ConfirmPasswordInput: React.FC<ConfirmPasswordInputProps> = ({
  value,
  onChange,
  error,
}) => (
  <div className={styles.formLine}>
    <label className={styles.label}>Confirm:</label>
    <input
      type="password"
      name="confirmPassword"
      value={value}
      onChange={onChange}
      className={styles.input}
    />
    {error && <p className={styles.p}>{error}</p>}
  </div>
);

export default ConfirmPasswordInput;
