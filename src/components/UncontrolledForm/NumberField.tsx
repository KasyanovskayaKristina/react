import React from 'react';
import styles from '../ControlledForm/ControlledForm.module.css';
interface NumberFieldProps {
  fieldName: string;
  inputRef: React.RefObject<HTMLInputElement>;
  formErrors: { [key: string]: string };
}

const NumberField: React.FC<NumberFieldProps> = ({
  fieldName,
  inputRef,
  formErrors,
}) => (
  <div className={styles.formLine}>
    <label className={styles.label}>{fieldName}:</label>
    <input
      className={styles.input}
      type="number"
      name={fieldName}
      ref={inputRef}
    />
    {formErrors[fieldName] && (
      <p className={styles.p}>{formErrors[fieldName]}</p>
    )}
  </div>
);

export default NumberField;
