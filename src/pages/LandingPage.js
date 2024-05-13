import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthProvider";

function LandingPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        data: { user, session },
        error,
      } = await login(username, password);
      if (user && session) navigate("/newpost");
    } catch (error) {
      setErrorMsg("Email or Password Incorrect");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form action="">
        <input
          type="text"
          placeholder="Enter Username"
          name="uname"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      <button type="submit" onClick={handleSubmit}>
        Login
      </button>
    </div>
  );
}

export default LandingPage;
