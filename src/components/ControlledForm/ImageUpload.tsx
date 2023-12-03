import React from 'react';
import styles from './ControlledForm.module.css';

interface ImageUploadProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | undefined;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, error }) => (
  <div className={styles.imageFrom}>
    <label htmlFor="image" className={styles.label}>
      Download Image
    </label>
    <input
      type="file"
      id="image"
      name="image"
      accept=".jpeg, .jpg, .png"
      onChange={onChange}
      className={styles.input}
    />
    {error && <p className={styles.p}>{error}</p>}
  </div>
);

export default ImageUpload;
