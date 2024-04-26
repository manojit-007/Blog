/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Loader from "./Loader";
import PostItem from "./PostItem";
import axios from "axios";
// import { Dummy_posts } from "../page/Data";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading to true initially

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/posts`
        );
        setPosts(response?.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      setLoading(false); // Set loading to false after fetching
    };
    fetchPosts();
  }, []); 

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="posts">
      {posts && posts.length > 0 ? (
        <div className="container posts_container">
          {posts.map((post) => (
            <PostItem
              key={post._id}
              postId={post._id}
              thumbnail={post.thumbnail}
              description={post.description}
              category={post.category}
              title={post.title}
              creator={post.creator}
              createdAt = {post.createdAt}
            />
          ))}
        </div>
      ) : (
        <h2 className="center">No post found</h2>
      )}
    </section>
  );
};

export default Posts;
