import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <div className={styles.header}>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/page1">PageOne</Link>
      </div>
      <div>
        <Link to="/page2">PageTwo</Link>
      </div>
    </div>
  );
};
export default Header;
