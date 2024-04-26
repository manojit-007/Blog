/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import Avatar from "../assets/avatar16.jpg";
import { FaEdit, FaCheck } from "react-icons/fa";
import { useState } from "react";

const UserProfile = () => {
  const [avatar, setAvatar] = useState(Avatar);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  return (
    <section className="profile">
      <div className="container profile_container">
        <Link to={`/myPosts/sd`} className="btn">
          My posts
        </Link>
        <div className="profile_details">
          <div className="avatar_wrapper">
            <div className="profile_avatar">
              <img src={avatar} alt="" />
            </div>

            {/* form */}
            <form action="" className="avatar_form">
              <input
                type="file"
                name="avatar"
                id="avatar"
                accept="jpg,png,jpeg"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
              <label htmlFor="avatar">
                <FaEdit />
              </label>
            </form>
            <button className="profile_avatar_btn">
              <FaCheck />
            </button> 
          </div>
          <h1>Sam Dev</h1>

          {/* form for details  */}

          <form action="" className="form profile_form">
            <marquee className="form_error_message">
              All profile details
            </marquee>

            <input
              type="text"
              placeholder="Full name"
              name=""
              id=""
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              name=""
              id=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Current Password"
              name=""
              id=""
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              name=""
              id=""
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name=""
              id=""
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <button type="submit" className="btn primary">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
