/* eslint-disable no-unused-vars */

import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContextApi from "../../context/UserContextApi";
import { useNavigate } from "react-router-dom";
import { Dummy_posts } from "./Data";

const Dashboard = () => {
  const [allPosts, setPosts] = useState(Dummy_posts);
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContextApi);
  const token = currentUser?.token;
  // If token is not available, the user is considered not logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);
  return (
    <section className="dashboard">
      {allPosts.length > 0 ? (
        <div className="container dashboard_container">
          {allPosts.map((post) => {
            return (
              <article key={post.id} className="dashboard_post">
                <div className="dashboard_post_info">
                  <div className="dashboard_post_thumbnail">
                    <img src={post.thumbnail} alt={post.title} />
                  </div>
                  <h5>{post.title}</h5>
                </div>
                <div className="dashboard_post_actions">
                  <Link to={`/posts/${post.id}`} className="btn sm">
                    View
                  </Link>
                  <Link
                    to={`/posts/${post.id}/edit`}
                    className="btn sm primary"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/posts/${post.id}/delete`}
                    className="btn sm danger"
                  >
                    Delete
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <h1 className="center">
          No posts found.
          <br />
          <Link to="/"> Home</Link>
        </h1>
      )}
    </section>
  );
};

export default Dashboard;
