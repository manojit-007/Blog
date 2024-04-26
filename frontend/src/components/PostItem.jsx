/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
const PostItem = ({
  postId,
  thumbnail,
  description,
  category,
  title,
  creator,
  createdAt
}) => {
  return (
    <article className="post">
      <div className="post_thumbnail">
        <img src={thumbnail} alt={title} />
      </div>
      <div className="post_content">
        <Link to={`/post/${postId}`}>
          <h3>{title}</h3>
        </Link>
        <p>{description}</p>
        <div className="post_footer">
          <PostAuthor authorID={creator} createdAt={createdAt} />
          <Link to={`/posts/categories/$(category)`} className="btn category">
            {category}
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostItem;
