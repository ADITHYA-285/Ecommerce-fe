import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./login.css";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");

        if (!email || !password) {
            setError("Please enter email and password.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                "http://localhost:3000/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        email: email.trim(),
                        password: password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.message ||
                    "Invalid email or password."
                );

                return;
            }

            // =========================
            // SAVE LOGIN INFORMATION
            // =========================

            localStorage.setItem(
                "token",
                data.access_token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );


            // =========================
            // REDIRECT BASED ON ROLE
            // =========================

            if (data.user.role === "ADMIN") {
                navigate("/admin", {
                    replace: true,
                });
            } else {
                navigate("/main", {
                    replace: true,
                });
            }

        } catch (error) {

            console.error(
                "Login error:",
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
        <div className="login-page">

            <div className="login-card">

                {/* ================= LOGO ================= */}

                <div className="login-header">

                    <h1>
                        🛍️ MyStore
                    </h1>

                    <p>
                        Login to your account
                    </p>

                </div>


                {/* ================= ERROR ================= */}

                {error && (

                    <div className="login-error">

                        {error}

                    </div>

                )}


                {/* ================= FORM ================= */}

                <form onSubmit={handleLogin}>

                    {/* EMAIL */}

                    <div className="form-group">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>


                    {/* PASSWORD */}

                    <div className="form-group">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>


                    {/* LOGIN BUTTON */}

                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >

                        {loading
                            ? "Logging in..."
                            : "Login"}

                    </button>

                </form>


                {/* ================= REGISTER ================= */}

                <div className="register-link">

                    <p>
                        Don't have an account?
                    </p>

                    <Link to="/register">
                        Create an account
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Login;