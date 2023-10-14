import { useState } from "react";
import "./SignUp.css";
import { FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiOutlineFileImage } from "react-icons/ai";
import { registerUser } from "../../api/user";

import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";

const Signup = () => {
  const [data, setData] = useState({});
  const [imagePreview, setImagePreview] = useState();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, username, email, password, rePassword } = data;

    if (!username || !name || !email || !password || !rePassword) {
      toast.error(" Please fill out required fields", {
        autoClose: 2000
      });
      return
    }

    if (password !== rePassword) {
      toast.error("Password does not match", {
        autoClose: 2000
      });
      return
    }

    if (password.length <= 4) {
      toast.warning("Password is too short, please use a strong password", {
        autoClose: 2000
      });
      return
    }

    setLoading(true);
    const form = new FormData();
    form.append("name", data.name);
    form.append("username", data.username);
    form.append("password", data.password);
    form.append("rePassword", data.rePassword);
    form.append("email", data.email);
    registerUser(data).then(() => setLoading(false));
  };

  const disabledButton = () => {
    const { name, username, email, password, rePassword } = data;
    return !username || !name || !email || !password || !rePassword || loading
  }

  return (
    <div className="signup_container">
      {loading && (
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      )}
      <div className="signup_form_container">
        <div className="right">
          <form className="form_container" onSubmit={handleSubmit}>
            <h2>
              JOIN TWITTER TODAY
              <span className="signup-image-preview">
                <FaTwitter />
              </span>
            </h2>

            {imagePreview && (
              <div>
                <img
                  className="signup-image-preview "
                  src={imagePreview && imagePreview}
                  alt=""
                />
              </div>
            )}
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              value={data.firstName}
              className="input"
            />
            <input
              type="text"
              placeholder="User Name"
              name="username"
              onChange={handleChange}
              value={data.lastName}
              className="input"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              className="input"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              className="input"
            />
            <input
              type="password"
              placeholder="Password Confirmation"
              name="rePassword"
              onChange={handleChange}
              value={data.rePassword}
              className="input"
            />
            <div className="signup-photo-input">
              <label htmlFor="upload-photo" className="signup-photo">
                {<AiOutlineFileImage />}Choose Profile Pic
              </label>
              <input
                type="file"
                id="upload-photo"
                className="upload-photo"
                name="prof_pic"
                onChange={(e) => {
                  setData({ ...data, [e.target.name]: e.target.files[0] });
                  setImagePreview(URL.createObjectURL(e.target.files[0]));
                }}
                accept="image/*"
              />
            </div>
            <button type="submit" className={disabledButton() ? "disabled" : "green_btn"} disabled={disabledButton()}>
              Sing Up
            </button>
          </form>
        </div>
      </div>
      <div className="sub-div">
        <p>
          Already have an account?
          <Link to="/login" className="form-link">
            Login now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;