import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/register`, {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((authInfo) => {
        if (authInfo && authInfo.token) {
          localStorage.setItem("user_token", JSON.stringify(authInfo));
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
              style={{ backgroundColor: "rgb(34, 78, 60)", color: "#fff" }}
            >
              <p className="modal-card-title">Registration Failed</p>
              <button
                className="delete"
                aria-label="close"
                onClick={() => setShowModal(false)}
              ></button>
            </header>
            <section className="modal-card-body">
              <p className="has-text-danger">That account may already exist.</p>
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

      {/* Register Form */}
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop">
              <div className="box">
                <form onSubmit={handleRegister}>
                  <h1
                    className="title has-text-centered"
                    style={{ color: "rgb(34, 78, 60)" }}
                  >
                    BrainByte
                  </h1>
                  <h2 className="subtitle has-text-centered has-text-grey">
                    Register new account
                  </h2>

                  <div className="field">
                    <label className="label" htmlFor="firstName">
                      First Name
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label" htmlFor="lastName">
                      Last Name
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label" htmlFor="inputEmail">
                      Email
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type="email"
                        id="inputEmail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label" htmlFor="inputUsername">
                      Username
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        id="inputUsername"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                        type="password"
                        id="inputPassword"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="field mt-5">
                    <button
                      type="submit"
                      className="button is-fullwidth"
                      style={{ backgroundColor: "rgb(34, 78, 60)", color: "white" }}
                    >
                      Register
                    </button>
                  </div>

                  <p className="has-text-centered mt-4 is-size-7 has-text-grey">
                    Already have an account?{" "}
                    <Link to="/login" style={{ color: "rgb(34, 78, 60)" }}>
                      Sign in here
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