import { NavLink, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("user_token") !== null;

  return (
    <nav
      className="navbar"
      role="navigation"
      aria-label="main navigation"
      style={{ backgroundColor: "rgb(34, 78, 60)" }}
    >
      <div className="navbar-menu is-active px-5 py-3">
        <div className="navbar-start">
          <NavLink to="/quiz" className="navbar-item custom-navbar-item">
            Start Quiz
          </NavLink>

          <NavLink to="/myquestions" className="navbar-item custom-navbar-item">
            My Questions
          </NavLink>

          <NavLink to="/myresults" className="navbar-item custom-navbar-item">
            My Results
          </NavLink>
        </div>

        <div className="navbar-end">
          {isLoggedIn ? (
            <div className="navbar-item">
              <button
                className="button is-medium has-text-white"
                style={{
                  backgroundColor: "rgb(34, 78, 60)", // dark green
                  border: "none",
                  transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#275c44")
                } // lighter green on hover
                onMouseOut={(e) => (e.target.style.backgroundColor = "rgb(34, 78, 60)")}
                onClick={() => {
                  localStorage.removeItem("user_token");
                  navigate("/login");
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <NavLink to="/login" className="navbar-item custom-navbar-item">
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="navbar-item custom-navbar-item"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
