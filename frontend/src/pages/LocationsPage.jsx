import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";

const API_URL = "http://localhost:8000/api/locations/";

const LocationsPage = () => {
  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState("");
  const [newLocation, setNewLocation] = useState({ name: "", address: "" });
  const [editingLocation, setEditingLocation] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    const res = await axios.get(API_URL);
    setLocations(res.data);
  };

  const handleAdd = async () => {
    if (!newLocation.name) return;
    try {
      const res = await axios.post(API_URL, newLocation);
      setLocations([res.data, ...locations]);
      setNewLocation({ name: "", address: "" });
    } catch (err) {
      console.error("Error adding location:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this location?")) {
      await axios.delete(`${API_URL}${id}/`);
      setLocations(locations.filter((l) => l.id !== id));
    }
  };

  const handleEdit = async () => {
    const { id, name, address } = editingLocation;
    try {
      const res = await axios.put(`${API_URL}${id}/`, { name, address });
      setLocations(locations.map((l) => (l.id === id ? res.data : l)));
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = locations.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2 className="fw-bold mb-4">Locations</h2>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          className="form-control w-50"
          placeholder="Search locations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ backgroundColor: "#F9F5F6", borderColor: "#F2BED1" }}
        />
        <button
          className="btn"
          style={{ backgroundColor: "#FDCEDF" }}
          data-bs-toggle="modal"
          data-bs-target="#addLocationModal"
        >
          Add Location
        </button>
      </div>

      <div className="row">
        {filtered.map((loc) => (
          <div className="col-md-4 mb-4" key={loc.id}>
            <div className="card" style={{ backgroundColor: "#F8E8EE" }}>
              <div className="card-body">
                <h5>{loc.name}</h5>
                <p className="text-muted">{loc.address}</p>
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    setEditingLocation(loc);
                    setShowModal(true);
                  }}
                  style={{ borderColor: "#F2BED1", color: "#F2BED1" }}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="outline-danger"
                  onClick={() => handleDelete(loc.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center">No locations found.</p>
        )}
      </div>

      {/* Modal for Add */}
      <div
        className="modal fade"
        id="addLocationModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content" style={{ backgroundColor: "#F9F5F6" }}>
            <div className="modal-header">
              <h5 className="modal-title">Add Location</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={newLocation.name}
                  onChange={(e) =>
                    setNewLocation({ ...newLocation, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  value={newLocation.address}
                  onChange={(e) =>
                    setNewLocation({ ...newLocation, address: e.target.value })
                  }
                />
              </Form.Group>
            </div>
            <div className="modal-footer">
              <Button
                style={{ backgroundColor: "#FDCEDF", fontWeight: "bold" }}
                onClick={handleAdd}
                data-bs-dismiss="modal"
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingLocation && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={editingLocation.name}
                  onChange={(e) =>
                    setEditingLocation({
                      ...editingLocation,
                      name: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  value={editingLocation.address}
                  onChange={(e) =>
                    setEditingLocation({
                      ...editingLocation,
                      address: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleEdit} style={{ backgroundColor: "#FDCEDF" }}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LocationsPage;
