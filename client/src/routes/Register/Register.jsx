import "./Register.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";
import HeroImg from "../../assets/images/HeroImg.jpg";
import logo from "../../logo/stu.rental.svg";

function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")
    setIsLoading(true);
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <div className="company">
            <img src={logo} alt="" />
            <h1>Create an Account</h1>
          </div>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoading}>Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <div className='image' style={{ backgroundImage: `url(${HeroImg})` }}>
          <div className="overlay">
            <div className="text">
              <div className="quote">A house is built with with walls and beams; a home is built with love and dreams.</div>
              <div className="author">~ Ralph Waldo Emerson</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;