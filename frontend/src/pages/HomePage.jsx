import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        style={{ backgroundColor: "#FDCEDF" }}
        className="text-dark text-center py-5"
      >
        <div className="container">
          <h1 className="display-4 fw-bold">Welcome to ClassPanel</h1>
          <p className="lead mt-3">
            Manage classes, upload schedules, and track performance with ease.
          </p>
          <div className="mt-4">
            <Link to="/signup" className="btn btn-light btn-lg me-3">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-outline-dark btn-lg">
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ backgroundColor: "#F9F5F6" }} className="py-5">
        <div className="container text-center">
          <h2 className="mb-4 text-dark">Why Use ClassPanel?</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div
                className="p-4 rounded h-100"
                style={{ backgroundColor: "#F8E8EE" }}
              >
                <h5>Upload Excel Reports</h5>
                <p>Import class data directly from Excel sheets.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="p-4 rounded h-100"
                style={{ backgroundColor: "#F8E8EE" }}
              >
                <h5>Coach Management</h5>
                <p>Create, edit, and view coaches and class performance.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="p-4 rounded h-100"
                style={{ backgroundColor: "#F8E8EE" }}
              >
                <h5>Live Charts</h5>
                <p>Visualize attendance and revenue with interactive charts.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section
        style={{ backgroundColor: "#F2BED1" }}
        className="text-center py-5"
      >
        <div className="container">
          <h2 className="fw-bold text-dark">
            Ready to simplify your class reporting?
          </h2>
          <p className="lead">Start by signing up — it's fast and free.</p>
          <Link to="/signup" className="btn btn-dark btn-lg">
            Create Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
