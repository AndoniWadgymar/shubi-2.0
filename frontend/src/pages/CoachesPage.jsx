import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/api/coaches/";
const LOCATIONS_API = "http://localhost:8000/api/locations/";

const CoachesPage = () => {
  const [coaches, setCoaches] = useState([]);
  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState("");
  const [editingCoach, setEditingCoach] = useState(null);
  const [newCoach, setNewCoach] = useState({
    first_name: "",
    last_name: "",
    email: "",
    location: "",
  });

  useEffect(() => {
    fetchCoaches();
    fetchLocations();
  }, []);

  const fetchCoaches = async () => {
    try {
      const res = await axios.get(API_URL);
      setCoaches(res.data);
    } catch (err) {
      console.error("Error fetching coaches:", err);
    }
  };

  const fetchLocations = async () => {
    try {
      const res = await axios.get(LOCATIONS_API);
      setLocations(res.data);
    } catch (err) {
      console.error("Error fetching locations:", err);
    }
  };

  const handleAddCoach = async () => {
    const { first_name, last_name, email, location } = newCoach;
    if (!first_name || !last_name || !email || !location) return;
    try {
      const res = await axios.post(API_URL, newCoach);
      setCoaches([res.data, ...coaches]);
      setNewCoach({ first_name: "", last_name: "", email: "", location: "" });
    } catch (err) {
      console.error("Error adding coach:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this coach?")) {
      try {
        await axios.delete(`${API_URL}${id}/`);
        setCoaches((prev) => prev.filter((c) => c.id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleEditClick = (coach) => {
    setEditingCoach(coach);
  };

  const handleSave = async () => {
    try {
      const { id, first_name, last_name, email, location } = editingCoach;
      const res = await axios.put(`${API_URL}${id}/`, {
        first_name,
        last_name,
        email,
        location,
      });
      setCoaches((prev) => prev.map((c) => (c.id === id ? res.data : c)));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredCoaches = coaches.filter((c) =>
    `${c.first_name} ${c.last_name}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const getLocationName = (locationId) => {
    const loc = locations.find((l) => l.id === locationId);
    return loc ? loc.name : "Unknown Location";
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Coaches</h2>
        <button
          className="btn"
          style={{ backgroundColor: "#FDCEDF", fontWeight: "bold" }}
          data-bs-toggle="modal"
          data-bs-target="#addCoachModal"
        >
          Add Coach
        </button>
      </div>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search coaches..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ backgroundColor: "#F9F5F6", borderColor: "#F2BED1" }}
      />

      <div className="row">
        {filteredCoaches.map((coach) => (
          <div className="col-md-4 mb-4" key={coach.id}>
            <div
              className="card shadow-sm"
              style={{ backgroundColor: "#F8E8EE", border: "none" }}
            >
              <div className="card-body">
                <h5 className="card-title">
                  {coach.first_name} {coach.last_name}
                </h5>
                <p className="card-text text-muted">{coach.email}</p>
                <p className="card-text text-muted">
                  {getLocationName(coach.location)}
                </p>
                <button
                  className="btn btn-outline-primary me-2"
                  style={{ borderColor: "#F2BED1", color: "#F2BED1" }}
                  data-bs-toggle="modal"
                  data-bs-target="#editCoachModal"
                  onClick={() => handleEditClick(coach)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDelete(coach.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {filteredCoaches.length === 0 && (
          <p className="text-center">No coaches found.</p>
        )}
      </div>

      {/* Add Coach Modal */}
      <div
        className="modal fade"
        id="addCoachModal"
        tabIndex="-1"
        aria-labelledby="addCoachModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content" style={{ backgroundColor: "#F9F5F6" }}>
            <div className="modal-header">
              <h5 className="modal-title" id="addCoachModalLabel">
                Add New Coach
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={newCoach.first_name}
                  onChange={(e) =>
                    setNewCoach({ ...newCoach, first_name: e.target.value })
                  }
                  style={{ backgroundColor: "#F9F5F6" }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={newCoach.last_name}
                  onChange={(e) =>
                    setNewCoach({ ...newCoach, last_name: e.target.value })
                  }
                  style={{ backgroundColor: "#F9F5F6" }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={newCoach.email}
                  onChange={(e) =>
                    setNewCoach({ ...newCoach, email: e.target.value })
                  }
                  style={{ backgroundColor: "#F9F5F6" }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Location</label>
                <select
                  className="form-select"
                  value={newCoach.location}
                  onChange={(e) =>
                    setNewCoach({ ...newCoach, location: e.target.value })
                  }
                  style={{ backgroundColor: "#F9F5F6" }}
                >
                  <option value="">Select Location</option>
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn"
                style={{ backgroundColor: "#FDCEDF", fontWeight: "bold" }}
                data-bs-dismiss="modal"
                onClick={handleAddCoach}
              >
                Add Coach
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Coach Modal */}
      <div
        className="modal fade"
        id="editCoachModal"
        tabIndex="-1"
        aria-labelledby="editCoachModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content" style={{ backgroundColor: "#F9F5F6" }}>
            <div className="modal-header">
              <h5 className="modal-title" id="editCoachModalLabel">
                Edit Coach
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={editingCoach?.first_name || ""}
                  onChange={(e) =>
                    setEditingCoach({
                      ...editingCoach,
                      first_name: e.target.value,
                    })
                  }
                  style={{ backgroundColor: "#F9F5F6" }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={editingCoach?.last_name || ""}
                  onChange={(e) =>
                    setEditingCoach({
                      ...editingCoach,
                      last_name: e.target.value,
                    })
                  }
                  style={{ backgroundColor: "#F9F5F6" }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={editingCoach?.email || ""}
                  onChange={(e) =>
                    setEditingCoach({
                      ...editingCoach,
                      email: e.target.value,
                    })
                  }
                  style={{ backgroundColor: "#F9F5F6" }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Location</label>
                <select
                  className="form-select"
                  value={editingCoach?.location || ""}
                  onChange={(e) =>
                    setEditingCoach({
                      ...editingCoach,
                      location: e.target.value,
                    })
                  }
                  style={{ backgroundColor: "#F9F5F6" }}
                >
                  <option value="">Select Location</option>
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn"
                style={{ backgroundColor: "#F2BED1", fontWeight: "bold" }}
                data-bs-dismiss="modal"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachesPage;
