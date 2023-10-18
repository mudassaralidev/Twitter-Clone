import { useState } from "react";
import { FaTwitter } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { logIn, loggedInDetail } from "../../api/user";
import { useDispatch } from "react-redux";

const LogIn = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await logIn(data);
    await loggedInDetail(dispatch);
    res === "success" && navigate("/home");
  };

  return (
    <div className="signup_container">
      <div className="signup_form_container">
        <div className="right">
          <div className="form_container">
            <h2>Capture World's Moments</h2>
          </div>
          <form className="form_container" onSubmit={handleSubmit}>
            <div className="icon">
              <FaTwitter />
            </div>

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

            <button type="submit" className="green_btn">
              Login
            </button>
          </form>
        </div>
      </div>
      <div className="sub-div">
        <p>
          Don't have an account?
          <Link to="/signup" className="form-link">
            Sign up now
          </Link>
        </p>
        <p>
          Forgot Password ?
          <Link to="/reset-password" className="form-link">
            Reset Password
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogIn;

