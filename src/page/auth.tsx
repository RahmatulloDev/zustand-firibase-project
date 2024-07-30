import React, { FormEvent, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAuthStore from "../store/auth.store";

type AuthState = "signup" | "signin";

function Auth() {
  const [authMode, setAuthMode] = useState<AuthState>("signin");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [invalid, setInvalid] = useState<boolean>(false);
  const { signUp, signIn, } = useAuth();
  const { isLoading, user, error } = useAuthStore()
  const toggleAuth = (state: AuthState) => {
    setAuthMode(state);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password.length || !email.length) {
      setInvalid(true);
      return;
    }
    setInvalid(false);
    if (authMode === "signup") {
      signUp(email, password);
    } else {
      signIn(email, password);
    }
  };

  const authLabel = authMode === "signup" ? "Sign Up" : "Sign In";

  return (
    <main className="form-signin container text-center mt-4">
      <form className="m-auto w-50" onSubmit={onSubmit}>
        <img
          className="mb-4"
          src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg"
          alt=""
          width="72"
          height="57"
        />
        <h1 className="h3 mb-3 fw-normal text-start">{authLabel}</h1>

        {error && error.includes("not registered") && (
          <div className="alert alert-warning mt-2">
            This email is not registered. Please sign up if you don't
            have an account.
          </div>
        )}

        <div className="form-floating">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className={`form-control ${invalid && "is-invalid"}`}
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className={`form-control ${invalid && "is-invalid"}`}
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        {error && !error.includes("not registered") && (
          <div className="alert alert-danger mt-2">{error}</div>
        )}

        <button
          className="btn btn-primary w-100 py-2"
          disabled={isLoading}
          type="submit"
        >
          {authLabel}
        </button>

        <p className="mt-2 fw-bold">
          {authMode === "signup"
            ? "Already have an account?"
            : "Don't have an account yet? Please sign up."}
        </p>

        <div className="d-flex justify-content-between mt-3">
          {authMode === "signup" ? (
            <span
              className="fw-normal text-primary"
              onClick={() => toggleAuth("signin")}
              style={{ cursor: "pointer" }}
            >
              Sign in
            </span>
          ) : (
            <span
              className="fw-normal text-primary"
              onClick={() => toggleAuth("signup")}
              style={{ cursor: "pointer" }}
            >
              Sign up now
            </span>
          )}
        </div>
      </form>
    </main>
  );
}

export default Auth;
