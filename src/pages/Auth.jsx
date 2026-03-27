import { useState } from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [mode, setMode] = useState("signup");
  const { signUp, user, logOut, logIn } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmitFunction = (data) => {
    setError(null);
    let result;
    if (mode === "signup") {
      result = signUp(data.email, data.password);
    } else {
      result = logIn(data.email, data.password);
    }
    if (!result.success) {
      setError(result);
    } else {
      navigate("/");
    }
  };
  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          <h1 className="page-title">
            {mode === "signup" ? "Sign Up" : "Login"}
          </h1>
          {error && <div className="error-message">{error.message}</div>}
          <form className="auth-form" onSubmit={handleSubmit(onSubmitFunction)}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-input"
                type="email"
                placeholder="Enter your email"
                id="email"
                {...register("email", { required: "Email is required!!!" })}
              ></input>
              {errors.email && (
                <span className="form-error">{errors.email.message}</span>
              )}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                className="form-input"
                type="password"
                placeholder="Enter your password"
                id="password"
                {...register("password", {
                  required: "Password is required!!!",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                  maxLength: {
                    value: 15,
                    message: "Password must be at most 15 characters long",
                  },
                })}
              ></input>
              {errors.password && (
                <span className="form-error">{errors.password.message}</span>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              {mode === "signup" ? "Sign Up" : "Login"}
            </button>
          </form>

          <div className="auth-switch">
            {mode === "signup" ? (
              <p>
                Already have an account?
                <span
                  onClick={() => {
                    setMode("login");
                  }}
                  className="auth-link"
                >
                  Login
                </span>
              </p>
            ) : (
              <p>
                Don't have an account?
                <span
                  onClick={() => {
                    setMode("signup");
                  }}
                  className="auth-link"
                >
                  Sign Up
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
