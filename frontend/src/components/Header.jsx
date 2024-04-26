/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useState, useEffect, useContext } from "react";
import UserContextApi from "../../context/UserContextApi";

const Header = () => {
  const [status, setStatus] = useState(false);

  const { currentUser } = useContext(UserContextApi);

  useEffect(() => {
    const handleResize = () => {
      setStatus(window.innerWidth > 800);
    };

    handleResize(); // Initialize status based on initial window width
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const closeMenu = () => {
    if(window.innerWidth < 800){
      setStatus(false);
    }
  };

  return (
    <div>
      <nav>
        <div className="container nav-container">
          <Link to="/" className="nav_logo" onClick={closeMenu}>
            <img src={Logo} alt="Blog-logo" />
          </Link>
          {currentUser?.id && status && (
            <ul className="nav_menu">
              <li>
                <Link to="/profile/:id" onClick={closeMenu}>
                  diligent achiever
                </Link>
              </li>
              <li>
                <Link to="/create" onClick={closeMenu}>
                  Create post
                </Link>
              </li>
              <li>
                <Link to="/authors" onClick={closeMenu}>
                  Authors
                </Link>
              </li>
              <li>
                <Link to="/logout" onClick={closeMenu}>
                  Log Out
                </Link>
              </li>
            </ul>
          )}
          {!currentUser?.id && status && (
            <ul className="nav_menu">
              <li>
                <Link to="/authors" onClick={closeMenu}>
                  Authors
                </Link>
              </li>
              <li>
                <Link to="/login" onClick={closeMenu}>
                  Log In
                </Link>
              </li>
            </ul>
          )}
      
          <button
            className="nav_toggle-btn btn"
            onClick={() => setStatus(!status)}
          >
            {status ? <AiOutlineClose /> : <FaBars />}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
