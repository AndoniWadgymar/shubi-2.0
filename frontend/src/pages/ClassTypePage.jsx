import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";

export const ClassTypesPage = () => {
  const API_URL = "http://localhost:8000/api/classtype/";
  const [classTypes, setClassTypes] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingType, setEditingType] = useState(null);
  const [newType, setNewType] = useState({ name: "", price: "" });

  useEffect(() => {
    fetchClassTypes();
  }, []);

  const fetchClassTypes = async () => {
    try {
      const res = await axios.get(API_URL);
      setClassTypes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = async () => {
    try {
      const res = await axios.post(API_URL, newType);
      setClassTypes([res.data, ...classTypes]);
      setNewType({ name: "", price: "" });
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (type) => {
    setEditingType(type);
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const { id, name, price } = editingType;
      const res = await axios.put(`${API_URL}${id}/`, { name, price });
      setClassTypes((prev) => prev.map((t) => (t.id === id ? res.data : t)));
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await axios.delete(`${API_URL}${id}/`);
        setClassTypes((prev) => prev.filter((t) => t.id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const filtered = classTypes.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Class Types</h2>
        <button
          className="btn"
          style={{ backgroundColor: "#FDCEDF", fontWeight: "bold" }}
          onClick={() => setShowModal(true)}
        >
          Add Class Type
        </button>
      </div>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search class types..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ backgroundColor: "#F9F5F6", borderColor: "#F2BED1" }}
      />

      <div className="row">
        {filtered.map((type) => (
          <div className="col-md-4 mb-4" key={type.id}>
            <div
              className="card shadow-sm"
              style={{ backgroundColor: "#F8E8EE", border: "none" }}
            >
              <div className="card-body">
                <h5 className="card-title">{type.name}</h5>
                <p className="card-text fw-bold">${type.price}</p>
                <Button
                  variant="outline-primary"
                  className="me-2"
                  onClick={() => handleEdit(type)}
                  style={{ borderColor: "#F2BED1", color: "#F2BED1" }}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => handleDelete(type.id)}
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
          <Modal.Title>
            {editingType ? "Edit Class Type" : "Add Class Type"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={editingType ? editingType.name : newType.name}
                onChange={(e) =>
                  editingType
                    ? setEditingType({ ...editingType, name: e.target.value })
                    : setNewType({ ...newType, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={editingType ? editingType.price : newType.price}
                onChange={(e) =>
                  editingType
                    ? setEditingType({ ...editingType, price: e.target.value })
                    : setNewType({ ...newType, price: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ backgroundColor: "#FDCEDF", border: "none" }}
            onClick={editingType ? handleSave : handleAdd}
          >
            {editingType ? "Save Changes" : "Add Class Type"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
