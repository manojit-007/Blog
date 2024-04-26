/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Avatar from "../assets/logo.png"; // Update the path accordingly

const PostAuthor = ({ authorID, createdAt }) => {
  const createdAtDate = new Date(createdAt);
  return (
    <Link to={`/posts/user/${authorID}`} className="post_author">
      <div className="post_author_avatar">
        <img src={Avatar} alt="Avatar" />
      </div>
      <div className="post_author_details">
        <h5>By: Sammy </h5>
        <small>{createdAtDate.toDateString()}</small>
      </div>
    </Link>
  );
};

export default PostAuthor;
