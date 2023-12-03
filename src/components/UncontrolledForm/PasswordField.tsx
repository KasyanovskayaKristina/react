import React from 'react';
import styles from '../ControlledForm/ControlledForm.module.css';
interface PasswordFieldProps {
  fieldName: string;
  inputRef: React.RefObject<HTMLInputElement>;
  formErrors: { [key: string]: string };
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  fieldName,
  inputRef,
  formErrors,
}) => (
  <div className={styles.formLine}>
    <label className={styles.label}>{fieldName}:</label>
    <input
      className={styles.input}
      type="password"
      name={fieldName}
      ref={inputRef}
    />
    {formErrors[fieldName] && (
      <p className={styles.p}>{formErrors[fieldName]}</p>
    )}
  </div>
);

export default PasswordField;
