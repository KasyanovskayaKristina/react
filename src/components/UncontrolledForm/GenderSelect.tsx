import React from 'react';
import styles from '../ControlledForm/ControlledForm.module.css';
interface GenderSelectProps {
  genderRef: React.RefObject<HTMLSelectElement>;
  formErrors: { [key: string]: string };
}

const GenderSelect: React.FC<GenderSelectProps> = ({
  genderRef,
  formErrors,
}) => (
  <div className={styles.gender}>
    <label className={styles.label}>Gender:</label>
    <select className={styles.select} name="gender" ref={genderRef}>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </select>
    {formErrors.gender && <p className={styles.p}>{formErrors.gender}</p>}
  </div>
);

export default GenderSelect;
