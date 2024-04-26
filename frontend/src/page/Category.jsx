/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Dummy_posts } from "./Data";
import PostItem from "../components/PostItem";

const Category = () => {
  const [posts, setPosts] = useState(Dummy_posts);

  return (
    <section className="category_post">
      {posts.length > 0 ? (
        <div
          className="container posts_container"
        >
          {posts.map((post) => (
            <PostItem
              key={post.id}
              postId={post.id}
              thumbnail={post.thumbnail}
              desc={post.desc}
              category={post.category}
              title={post.title}
              authorID={post.authorID}
            />
          ))}
        </div>
      ) : (
        <h2 className="center">No post found</h2>
      )}
    </section>
  );
};

export default Category;
