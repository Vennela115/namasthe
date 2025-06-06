import { LOGO_URL } from '../utils/constants';
import { useState ,useEffect} from 'react';
import ReactDom from 'react-dom/client';
import { Link } from 'react-router-dom';


const Header = () => {
  //   let btnName = 'Login';

  const [btnNameReact, setBtnNameReact] = useState('Login');
  console.log('header render');
  //if no dependency array it will be called for every render
  // if dependency array is empty=[]=>useeffect is called on initial render
  //if any name given then it only renders for that function
  useEffect(()=>{
    console.log("useeffect called");
  },[]);

  return (
    <div className="header">
      <div className="logo-container">
        <img src={LOGO_URL} alt="App Logo" className="logo" />
      </div>
      <div className="nav-items">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li>Cart</li>
          <button
            className="loginBtn"
            onClick={() => {
              //   btnName = 'Logout';
              btnNameReact === 'Login'
                ? setBtnNameReact('Logout')
                : setBtnNameReact('Login');
              console.log(btnNameReact);
            }}
          >
            {btnNameReact}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
