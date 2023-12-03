import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/page1">PageOne</Link>
        </li>
        <li>
          <Link to="/page2">PageTwo</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Header;
