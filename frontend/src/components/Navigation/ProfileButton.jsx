import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [credential] = useState("Demo-lition");
  const [password] = useState("password");
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const demoLogin = () => {
    return dispatch(sessionActions.login({ credential, password }))
  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
    <div className='profile-btn'>
      <button onClick={toggleMenu}>
        <FaUserCircle />
      </button>
    </div>
      <ul style={{listStyle: 'none'}} className={ulClassName} ref={ulRef}>
        {user ? (
          <div className='profile-dropdown'>
            <li>{user.username}</li>
            <li>Hello, {user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <li>
              <NavLink to='./spots/current'>Manage Spots</NavLink>
            </li>
            <li>
              <button className="log-out-btn" onClick={logout}>Log Out</button>
            </li>
          </div>
        ) : (
          <>
            <li>
              <OpenModalButton
                buttonText="Log In"
                onButtonClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </li>
            <li>
              <OpenModalButton
                buttonText="Sign Up"
                onButtonClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </li>
            <li>
              <button onClick={demoLogin}>Log in as Demo User</button>
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
