import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useEffect, useState } from 'react';
import styles from './Home.module.css';

const Home = () => {
  const formDataArray = useSelector(
    (state: RootState) => state.form.formDataArray
  );
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);

  useEffect(() => {
    if (highlightIndex !== null) {
      const timer = setTimeout(() => {
        setHighlightIndex(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [highlightIndex]);

  return (
    <div>
      <h1>Main Page</h1>
      <div className={styles.cards}>
        <div className={styles.card}>
          {formDataArray.map((formData, index) => (
            <div
              key={index}
              style={{
                border:
                  highlightIndex === index ? '2px solid red' : '1px solid #ccc',
                padding: '10px',
                marginBottom: '10px',
              }}
            >
              <h2>{formData.name}</h2>
              <p>Email: {formData.email}</p>
              <p>Age: {formData.age}</p>
              <p>Gender: {formData.gender}</p>
              <p>Country: {formData.country}</p>
              {formData.image && (
                <img src={formData.image} alt="User" className={styles.img} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
