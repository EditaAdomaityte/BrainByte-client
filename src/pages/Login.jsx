import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((authInfo) => {
        if (authInfo && authInfo.token) {
          localStorage.setItem("user_token", JSON.stringify(authInfo));
          localStorage.setItem("user", JSON.stringify(authInfo.user));
          navigate("/");
        } else {
          setShowModal(true);
        }
      });
  };

  return (
    <main className="hero is-fullheight has-background-light">
      {/* Modal */}
      {showModal && (
        <div className="modal is-active">
          <div className="modal-background" onClick={() => setShowModal(false)}></div>
          <div className="modal-card">
            <header
              className="modal-card-head"
              style={{ backgroundColor: "#800020", color: "#fff" }}
            >
              <p className="modal-card-title">Login Failed</p>
              <button
                className="delete"
                aria-label="close"
                onClick={() => setShowModal(false)}
              ></button>
            </header>
            <section className="modal-card-body">
              <p className="has-text-danger">User does not exist.</p>
            </section>
            <footer className="modal-card-foot">
              <button
                className="button"
                onClick={() => setShowModal(false)}
                style={{ backgroundColor: "rgb(34, 78, 60)", color: "#fff" }}
              >
                Close
              </button>
            </footer>
          </div>
        </div>
      )}

      {/* Login Form */}
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop">
              <div className="box">
                <form onSubmit={handleLogin}>
                  <h1
                    className="title has-text-centered"
                    style={{ color: "rgb(34, 78, 60)" }}
                  >
                    BrainByte
                  </h1>
                  <h2 className="subtitle has-text-centered has-text-grey">
                    Please sign in
                  </h2>

                  <div className="field">
                    <label className="label" htmlFor="inputUsername">
                      Username
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        id="inputUsername"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Your username"
                        required
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label" htmlFor="inputPassword">
                      Password
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        id="inputPassword"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Your password"
                      />
                    </div>
                  </div>

                  <div className="field mt-5">
                    <button
                      type="submit"
                      className="button is-fullwidth"
                      style={{ backgroundColor: "rgb(34, 78, 60)", color: "white" }}
                    >
                      Sign In
                    </button>
                  </div>

                  <p className="has-text-centered mt-4 is-size-7 has-text-grey">
                    Not a member?{" "}
                    <Link to="/register" style={{ color: "rgb(34, 78, 60)" }}>
                      Register here
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
