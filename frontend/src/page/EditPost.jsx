/* eslint-disable no-unused-vars */
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaEdit } from "react-icons/fa";
import { useContext, useEffect } from "react";
import UserContextApi from "../../context/UserContextApi";
import { useNavigate } from "react-router-dom";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContextApi);
  const token = currentUser?.token;
  // If token is not available, the user is considered not logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["blockquote"],
      ["bold", "italic", "underline", "strike"],
      [{ size: ["small", false, "large", "huge"] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const POST_CATEGORIES = [
    "Uncategorized",
    "Technology",
    "Travel",
    "Food",
    "Fashion",
    "Health",
    "Sports",
    "Education",
    "Entertainment",
    "Business",
    "Science",
    "Art",
    "Music",
    "Fitness",
    "Books",
    "Photography",
  ];

  return (
    <section className="create_post">
      <div className="container">
        <h2>
          Edit your post <FaEdit />
        </h2>

        <marquee className="form_error_message">Update your post </marquee>
        <form action="" className="form create_post_form">
          <input
            type="email"
            placeholder="Add a Title for Your Blog"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />

          <select
            name="category"
            value={category}
            id=""
            onChange={(e) => setCategory(e.target.value)}
          >
            {POST_CATEGORIES.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>

          <ReactQuill
            modules={modules}
            formats={formats}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="file"
            placeholder="Add image for Your Blog"
            onChange={(e) => setThumbnail(e.target.files[0])}
            accept="jpg,png,jpeg"
            value={thumbnail}
          />

          <button type="submit" className="btn primary">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditPost;
