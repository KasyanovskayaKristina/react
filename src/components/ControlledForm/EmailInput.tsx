import React from 'react';
import styles from './ControlledForm.module.css';

interface EmailInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | undefined;
}

const EmailInput: React.FC<EmailInputProps> = ({ value, onChange, error }) => (
  <div className={styles.formLine}>
    <label className={styles.label}>Email:</label>
    <input
      name="email"
      placeholder="email"
      type="email"
      autoComplete="email"
      value={value}
      onChange={onChange}
      className={styles.input}
    />
    {error && <p className={styles.p}>{error}</p>}
  </div>
);

export default EmailInput;
