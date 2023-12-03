import React from 'react';
import styles from '../ControlledForm/ControlledForm.module.css';
interface TermsCheckboxProps {
  termsRef: React.RefObject<HTMLInputElement>;
  formErrors: { [key: string]: string };
}

const TermsCheckbox: React.FC<TermsCheckboxProps> = ({
  termsRef,
  formErrors,
}) => (
  <div className={styles.checkedTerms}>
    <label className={styles.label}>
      <input
        className={styles.inputCheck}
        type="checkbox"
        name="terms"
        ref={termsRef}
      />
      I agree
    </label>
    {formErrors.terms && <p className={styles.p}>{formErrors.terms}</p>}
  </div>
);

export default TermsCheckbox;
