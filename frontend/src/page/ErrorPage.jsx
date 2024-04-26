import { Link } from "react-router-dom";
import Error from "../assets/Error.svg";

const ErrorPage = () => {
  return (
    <section className="error">
      <div className="error_svg">
        <img className="error_img" src={Error} alt="" />
      </div>
      <div className="error_center">
        <Link to="/" className="btn primary err_btn">
          Go Back Home
        </Link>
        <h2>Page not found.</h2>
      </div>
    </section>
  );
};

export default ErrorPage;
