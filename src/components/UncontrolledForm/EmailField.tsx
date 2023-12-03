import React from 'react';
import styles from '../ControlledForm/ControlledForm.module.css';
interface EmailFieldProps {
  fieldName: string;
  inputRef: React.RefObject<HTMLInputElement>;
  formErrors: { [key: string]: string };
}

const EmailField: React.FC<EmailFieldProps> = ({
  fieldName,
  inputRef,
  formErrors,
}) => (
  <div className={styles.formLine}>
    <label className={styles.label}>{fieldName}:</label>
    <input
      type="email"
      name={fieldName}
      ref={inputRef}
      className={styles.input}
    />
    {formErrors[fieldName] && (
      <p className={styles.p}>{formErrors[fieldName]}</p>
    )}
  </div>
);

export default EmailField;
