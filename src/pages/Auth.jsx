import { useState } from "react";
import { useForm } from "react-hook-form";

const Auth = () => {
  const [mode, setMode] = useState("signup");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmitFunction = () => {
    alert("Form submitted successfully!!!");
    console.log(errors);
  };
  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          <h1 className="page-title">
            {mode === "signup" ? "Sign Up" : "Login"}
          </h1>
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
