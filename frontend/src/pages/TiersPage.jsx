import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";

export const TiersPage = () => {
  const API_URL = "http://localhost:8000/api/tier/";
  const [tiers, setTiers] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingTier, setEditingTier] = useState(null);
  const [newTier, setNewTier] = useState({
    name: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    fetchTiers();
  }, []);

  const fetchTiers = async () => {
    try {
      const res = await axios.get(API_URL);
      setTiers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = async () => {
    try {
      const res = await axios.post(API_URL, newTier);
      setTiers([res.data, ...tiers]);
      setNewTier({ name: "", description: "", price: "" });
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (tier) => {
    setEditingTier(tier);
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const { id, name, description, price } = editingTier;
      const res = await axios.put(`${API_URL}${id}/`, {
        name,
        description,
        price,
      });
      setTiers((prev) => prev.map((t) => (t.id === id ? res.data : t)));
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await axios.delete(`${API_URL}${id}/`);
        setTiers((prev) => prev.filter((t) => t.id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const filtered = tiers.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Tiers</h2>
        <button
          className="btn"
          style={{ backgroundColor: "#FDCEDF", fontWeight: "bold" }}
          onClick={() => setShowModal(true)}
        >
          Add Tier
        </button>
      </div>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search tiers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ backgroundColor: "#F9F5F6", borderColor: "#F2BED1" }}
      />

      <div className="row">
        {filtered.map((tier) => (
          <div className="col-md-4 mb-4" key={tier.id}>
            <div
              className="card shadow-sm"
              style={{ backgroundColor: "#F8E8EE", border: "none" }}
            >
              <div className="card-body">
                <h5 className="card-title mb-3">{tier.name}</h5>
                <Button
                  variant="outline-primary"
                  className="me-2"
                  onClick={() => handleEdit(tier)}
                  style={{ borderColor: "#F2BED1", color: "#F2BED1" }}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => handleDelete(tier.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingTier ? "Edit Tier" : "Add Tier"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={editingTier ? editingTier.name : newTier.name}
                onChange={(e) =>
                  editingTier
                    ? setEditingTier({ ...editingTier, name: e.target.value })
                    : setNewTier({ ...newTier, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={
                  editingTier ? editingTier.description : newTier.description
                }
                onChange={(e) =>
                  editingTier
                    ? setEditingTier({
                        ...editingTier,
                        description: e.target.value,
                      })
                    : setNewTier({ ...newTier, description: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={editingTier ? editingTier.price : newTier.price}
                onChange={(e) =>
                  editingTier
                    ? setEditingTier({ ...editingTier, price: e.target.value })
                    : setNewTier({ ...newTier, price: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ backgroundColor: "#FDCEDF", border: "none" }}
            onClick={editingTier ? handleSave : handleAdd}
          >
            {editingTier ? "Save Changes" : "Add Tier"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
