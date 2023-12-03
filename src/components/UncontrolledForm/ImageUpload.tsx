import React from 'react';
import styles from '../ControlledForm/ControlledForm.module.css';
interface ImageUploadProps {
  imageRef: React.RefObject<HTMLInputElement>;
  formErrors: {
    image?: string;
  };
}

const ImageUpload: React.FC<ImageUploadProps> = ({ imageRef, formErrors }) => (
  <div className={styles.imageFrom}>
    <label className={styles.label} htmlFor="image">
      Загрузите изображение
    </label>
    <input
      type="file"
      id="image"
      name="image"
      accept=".jpeg, .jpg, .png"
      ref={imageRef}
      className={styles.input}
    />
    {formErrors.image && <p className={styles.p}>{formErrors.image}</p>}
  </div>
);

export default ImageUpload;
