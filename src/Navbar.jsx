import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./css/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ username, setUsername }) => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim() !== "") {
      const currentPath = location.pathname;
      navigate(`${currentPath}?q=${encodeURIComponent(searchText)}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsername("");
    navigate("/home");
  };

  const hideNavbarPaths = ["/order-success"];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);
  if (shouldHideNavbar) return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-whitesmoke sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex " to="/">
          <h3 className="fs-2 fst-italic text-center">Starbucks</h3>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto ms-3 gap-5 nav-links ">
            <li className="nav-item">
              <Link className="nav-link underline-animate" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link underline-animate" to="/gift">
                Gift
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link underline-animate" to="/menu">
                Menu
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link underline-animate" to="/orders">
                Order
              </Link>
            </li>
          </ul>

          <form
            className="d-flex me-4 search-form mb-1"
            onSubmit={handleSearchSubmit}
          >
            <input
              className="me-2 search bg-transparent head1"
              type="search"
              placeholder="Search"
              id="search"
              value={searchText}
              onChange={(e) => {
                const value = e.target.value;
                setSearchText(value);
                if (value.trim() === "") {
                  const currentPath = location.pathname;
                  navigate(`${currentPath}`);
                }
              }}
            />
            <button className="btn1 btn btn-success" type="submit">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>

          <div className="d-flex align-items-center">
            <Link to="/cart" className="btn2 btn btn-success me-3 mb-2 ">
              🛒 <strong>MyCart</strong>
            </Link>

            <div className="dropdown nav-item text-center mb-2">
              <a
                className="nav-link dropdown-toggle fw-bold text-dark"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                <i className="fas fa-user-circle"></i> Account
              </a>
              <ul className="dropdown-menu custom-dropdown">
                {username ? (
                  <>
                    <li className="dropdown-header text-success fw-bold">
                      <i className="fas fa-user me-2"></i> {username}
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button
                        className="dropdown-item underline-animate"
                        onClick={handleLogout}
                      >
                        <i className="fas fa-sign-out-alt me-2"></i> Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        className="dropdown-item underline-animate"
                        to="/login"
                      >
                        <i className="fas fa-sign-in-alt me-2"></i> Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item underline-animate"
                        to="/register"
                      >
                        <i className="fas fa-user-plus me-2"></i> Sign-Up
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
