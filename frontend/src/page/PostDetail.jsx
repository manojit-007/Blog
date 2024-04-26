import { Link } from "react-router-dom";
import PostAuthor from "../components/PostAuthor";
import Avatar from "../assets/logo.png"; // Update the path accordingly

const PostDetail = () => {
  return (
    <section className="post_detail">
      <div className="container post_detail_container">
        <div className="post_detail_header">
          <PostAuthor />
          <div className="post_detail_buttons">
            <Link to={`/posts/viewer/edit`} className="btn sm primary">
              Edit
            </Link>
            <Link to={`/posts/viewer/delete`} className="btn sm danger">
              Delete
            </Link>
          </div>
        </div>
        <h1>This is the post title</h1>
        <div className="post_detail_thumbnail">
          <img src={Avatar} alt="" />
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
          necessitatibus?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum ipsum eum
          repellendus eos impedit porro nobis iure laboriosam ullam est.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          recusandae nisi amet expedita eligendi tempora porro suscipit nemo
          quae quos aliquid sapiente ipsam, ad natus iusto voluptatum voluptatem
          omnis. Vero. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Pariatur recusandae nisi amet expedita eligendi tempora porro suscipit
          nemo quae quos aliquid sapiente ipsam, ad natus iusto voluptatum
          voluptatem omnis. Vero.
        </p>
      </div>
    </section>
  );
};

export default PostDetail;
