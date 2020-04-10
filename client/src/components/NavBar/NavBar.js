import React, { useContext } from 'react';
import { NavLink , useHistory} from 'react-router-dom';
import AuthContext from '../../context/auth.context';

import './navbar.sass';

const Navbar = () => {
  const auth = useContext(AuthContext);

  const history = useHistory();

  const logoutHandler = () => {
    auth.logout();
    history.push('/')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className='logo'><NavLink to="/main">BROKKOLY</NavLink></div>
        <div className="collapse navbar-collapse custom" id="navbarColor01">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <NavLink to="/main" className="nav-link" >Главная <span className="sr-only">(current)</span></NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="/programs" className="nav-link" href="#">Программы</NavLink>
            </li>
          </ul>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <div className="nav-link" onClick={logoutHandler}>Выйти <span className="sr-only">(current)</span></div>
            </li>
          </ul>
        </div>
    </nav>
  )
}

export default Navbar;
