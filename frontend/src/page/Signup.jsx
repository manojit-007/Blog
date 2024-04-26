/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_Password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("Fill the form to register.");
  const navigate = useNavigate();

  const changeInputHandle = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // console.log(userData);
      const response = await axios.post(
        "http://localhost:8000/api/users/register", // Updated URL
        userData
      );
      const newUser = response.data; // Access the response data
      // console.log(newUser);
      if (!newUser) {
        setError("Couldn't register user. Please try again after some time.");
      } else {
        setSuccess("User registered successfully. Redirecting to login page...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      setError(error.response.data.message);
      setSuccess("");
      // console.log(error);
    }
  };

  return (
    <section className="signUp">
      <div className="container">
        <h2>Sign Up</h2>
        <form action="" className="form signUp_form" onSubmit={registerUser}>
          {error && <marquee className="form_error_message default">{error}</marquee>}
          {success && <div className="form_success_message">{success}</div>}

          <input
            type="text"
            placeholder="Full name"
            name="name"
            value={userData.name}
            onChange={changeInputHandle}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={changeInputHandle}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={changeInputHandle}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirm_Password"
            value={userData.confirm_Password}
            onChange={changeInputHandle}
          />
          <button type="submit" className="btn primary">
            Sign up
          </button>
        </form>
        <small>
          Already have an account? <Link to="/login">Log In</Link>{" "}
        </small>
      </div>
    </section>
  );
};

export default SignUp;
