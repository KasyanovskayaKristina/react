import React from 'react';
import styles from './ControlledForm.module.css';

interface TermsCheckboxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | undefined;
}

const TermsCheckbox: React.FC<TermsCheckboxProps> = ({
  checked,
  onChange,
  error,
}) => (
  <div className={styles.checkedTerms}>
    <input
      className={styles.inputCheck}
      type="checkbox"
      name="terms"
      checked={checked}
      onChange={onChange}
    />
    <label htmlFor="terms" className={styles.label}>
      I accept the terms and conditions
    </label>
    {error && <p className={styles.p}>{error}</p>}
  </div>
);

export default TermsCheckbox;
