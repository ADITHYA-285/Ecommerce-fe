import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./registration.css";
import { API_URL } from "./config/api";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const register = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      const response = await fetch(
        `${API_URL}/auth/register`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {

        setError(
          data.message || "Registration failed"
        );

        return;
      }

      alert("Registration successful!");

      navigate("/login");

    } catch (error) {

      console.error(
        "Registration error:",
        error
      );

      setError(
        "Unable to connect to the server."
      );

    } finally {

      setLoading(false);

    }
  };


  return (

    <div className="register-page">

      <div className="register-card">

        {/* LOGO */}

        <div className="register-logo">
          🛍️
        </div>

        <h1>
          Create an account
        </h1>

        <p className="register-subtitle">
          Join MyStore and start shopping today.
        </p>


        {/* ERROR */}

        {error && (

          <div className="register-error">
            {error}
          </div>

        )}


        {/* FORM */}

        <form onSubmit={register}>

          <div className="register-field">

            <label>
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />

          </div>


          <div className="register-field">

            <label>
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>


          <div className="register-field">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
              minLength={6}
            />

          </div>


          <button
            className="register-button"
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Creating Account..."
              : "Create Account"}

          </button>

        </form>


        {/* LOGIN LINK */}

        <p className="login-link">

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>

  );
}

export default Register;