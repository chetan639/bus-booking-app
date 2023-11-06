import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router
import '../styles/NavBar.css';
import {connect} from 'react-redux';
import { actionLogout } from '../redux';

const NavBar = ({isLoggedIn,actionLogout}) => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/userProfile" className="nav-link">
            UserProfile
          </Link>
        </li>
        {isLoggedIn && <li className="nav-item">
          <button className="nav-link" onClick={actionLogout}>
            Logout
          </button>
        </li>}
      </ul>
    </nav>
  );
};

const mapStateToProps = state => {
    return{
        isLoggedIn: state.isLoggedIn
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        actionLogout: ()=>{dispatch(actionLogout())}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NavBar);
