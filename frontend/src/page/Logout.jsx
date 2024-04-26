import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import UserContextApi from "../../context/UserContextApi";

const Logout = () => {
  const { setCurrentUser } = useContext(UserContextApi);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUser(null);
    navigate("/login");
  }, [setCurrentUser, navigate]);

  return null;
};

export default Logout;
