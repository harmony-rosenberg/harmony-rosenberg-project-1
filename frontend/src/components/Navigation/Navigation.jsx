import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let createBtn = sessionUser ? 'create-btn' : 'hidden'

  return (
    <ul style={{listStyle: 'none'}} className='nav-bar'>
      <li>
        <Link to='/'>
          <img src="../Logo.png" alt="Logo" />
        </Link>
      </li>
      <div className='nav-right'>
        <div className={createBtn}>
      <li>
        <NavLink to='./spots/new'>Create New Spot</NavLink>
      </li>
        </div>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
      </div>
    </ul>
  );
}

export default Navigation;
