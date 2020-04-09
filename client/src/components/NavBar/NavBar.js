import React, { useContext } from 'react';
import { BrowserRouter as Router, Link, useHistory } from 'react-router-dom';
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
      <Router>
        <div className='logo'><Link to={'/main'}>BROKKOLY</Link></div>
        <div className="collapse navbar-collapse custom" id="navbarColor01">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Главная <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Pricing</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About</a>
            </li>
          </ul>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <div className="nav-link" onClick={logoutHandler}>Выйти <span className="sr-only">(current)</span></div>
            </li>
          </ul>
        </div>
      </Router>
    </nav>
  )
}

export default Navbar;
