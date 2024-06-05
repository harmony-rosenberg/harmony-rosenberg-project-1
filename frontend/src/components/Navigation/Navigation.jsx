import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul style={{listStyle: 'none'}} className='nav-bar'>
      <li>
        <Link to='/'>
          <img src="../public/Logo.png" alt="Logo" />
        </Link>
        {/* <NavLink to="/">Home</NavLink> */}
      </li>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
