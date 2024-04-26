/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContextApi from "../../context/UserContextApi";

const Login = () => {

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  // const changeInputHandle = (e) => {
  //   setUserData((pre) => {
  //     return { ...pre, [e.target.name]: e.target.value };
  //   });
  // };

  const [error, setError] = useState(
    "Due to a security issue, please enter your email and password to log in."
  );
  // const [success, setSuccess] = useState("Fill the form to register.");
  const navigate = useNavigate();

  const { setCurrentUser } = useContext(UserContextApi);

  const changeInputHandle = (e) => {
    setUserData((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // console.log(userData);
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/users/login`,
        userData
      );
      const currentUser = response.data;
      // console.log(currentUser);
      if (!currentUser) {
        setError("Couldn't log in user. Please try again after some time.");
      } else {
        setCurrentUser(currentUser)
        setError("welcome to our website. Redirecting to home page...");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      setError(error.response.data.message);
      // setSuccess("");
      // console.log(error);
    }
  };

  return (
    <section className="login">
      <div className="container">
        <h2>Log In</h2>
        <form action="" className="form login_form" onSubmit={loginUser}>
          {error && <marquee behavior="alternate" className="form_error_message">{error}</marquee>}

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={changeInputHandle}
            autoFocus
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={userData.password}
            onChange={changeInputHandle}
          />
          <button type="submit" className="btn primary">
            Log In
          </button>
        </form>
        <small>
          Don't have an account? <Link to={"/signup"}>Sign Up</Link>{" "}
        </small>
      </div>
    </section>
  );
};

export default Login;
