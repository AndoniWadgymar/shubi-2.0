import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("access");

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg px-3 py-2"
      style={{ backgroundColor: "#F8E8EE" }}
    >
      <Link
        className="navbar-brand fw-bold"
        to="/"
        style={{ color: "#D63384" }}
      >
        Shubi ☝🏻🤓
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto align-items-center">
          {!isLoggedIn ? (
            <>
              <li className="nav-item">
                <Link
                  className="nav-link px-3"
                  to="/login"
                  style={{
                    borderRadius: "999px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#F2BED1")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link px-3"
                  to="/signup"
                  style={{
                    borderRadius: "999px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#F2BED1")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  Sign Up
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link
                  className="nav-link px-3"
                  to="/dashboard"
                  style={{
                    borderRadius: "999px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#F2BED1")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link px-3"
                  to="/coaches"
                  style={{
                    borderRadius: "999px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#F2BED1")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  Coaches
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link px-3"
                  to="/locations"
                  style={{
                    borderRadius: "999px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#F2BED1")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  Locations
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link px-3"
                  to="/class-type"
                  style={{
                    borderRadius: "999px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#F2BED1")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  Class Type
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link px-3"
                  to="/tiers"
                  style={{
                    borderRadius: "999px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#F2BED1")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  Tier
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link px-3"
                  to="/upload"
                  style={{
                    borderRadius: "999px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#F2BED1")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  Upload
                </Link>
              </li>
              <li className="nav-item ms-3">
                <button
                  className="btn"
                  style={{
                    backgroundColor: "#FDCEDF",
                    borderRadius: "999px",
                    padding: "6px 16px",
                    border: "none",
                    fontWeight: "500",
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
