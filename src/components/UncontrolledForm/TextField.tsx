import React from 'react';
import styles from '../ControlledForm/ControlledForm.module.css';
interface TextFieldProps {
  fieldName: string;
  inputRef: React.RefObject<HTMLInputElement>;
  formErrors: { [key: string]: string };
}

const TextField: React.FC<TextFieldProps> = ({
  fieldName,
  inputRef,
  formErrors,
}) => (
  <div className={styles.formLine}>
    <label className={styles.label}>{fieldName}:</label>
    <input
      className={styles.input}
      type="text"
      name={fieldName}
      ref={inputRef}
    />
    {formErrors[fieldName] && (
      <p className={styles.p}>{formErrors[fieldName]}</p>
    )}
  </div>
);

export default TextField;
