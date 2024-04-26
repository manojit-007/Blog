/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import profile1 from "../assets/avatar1.jpg";
import profile2 from "../assets/avatar2.jpg";
import profile3 from "../assets/avatar3.jpg";
import profile4 from "../assets/avatar16.jpg";
import profile5 from "../assets/avatar5.jpg";


const authorData = [
  { id: 1, avatar: profile1, name: "Mono", posts: 3 },
  { id: 2, avatar: profile2, name: "Mono", posts: 6 },
  { id: 3, avatar: profile3, name: "Mono", posts: 7 },
  { id: 4, avatar: profile4, name: "Mono", posts: 9 },
  { id: 5, avatar: profile5, name: "Mono", posts: 1 },
];

const Authors = () => {
  const [authors, setAuthorsData] = useState(authorData);
  return (
    <section className="authors">
      {authors.length > 0 ? (
        <div className="container author_container">
          {authors.map((author) => (
            <Link
              key={author.id}
              to={`/posts/users/${author.id}`}
              className="author"
            >
              <div className="author_avatar">
                <img src={author.avatar} alt="" />
              </div>
              <div className="author_info">
                <h4>{author.name}</h4>
                <p>{author.posts}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <h1 className="center">
          No authors/users found.
          <br />
          <Link to="/"> Home</Link>
        </h1>
      )}
    </section>
  );
};

export default Authors;
