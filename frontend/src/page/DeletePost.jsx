import { useContext, useEffect } from "react";
import UserContextApi from "../../context/UserContextApi";
import { useNavigate } from "react-router-dom";

const DeletePost = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContextApi);
  const token = currentUser?.token;
  // If token is not available, the user is considered not logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);
  return <section>DeletePost</section>;
};

export default DeletePost;
