import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AddAssignmentNotice = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();  // For editing an existing notice

  // Fetch existing data if editing
  useEffect(() => {
    if (id) {
      axios
        .get(`/api/professor/notices/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          setTitle(res.data.title);
          setDescription(res.data.description);
        })
        .catch((err) => console.error("Error fetching notice", err));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (file) formData.append("file", file);

    try {
      if (id) {
        await axios.put(`/api/professor/notices/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Notice updated!");
      } else {
        await axios.post("/api/professor/notices", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Notice added!");
      }
      navigate("/professor/notices");
    } catch (err) {
      console.error("Error submitting form", err);
    }
  };

  // Preview the selected file (PDF/Image)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="block w-full mb-2 p-2 border"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="block w-full mb-2 p-2 border"
      />
      <input
        type="file"
        onChange={handleFileChange}
        className="block w-full mb-2"
      />
      {preview && (
        <div className="mb-2">
          {file.type === "application/pdf" ? (
            <iframe src={preview} width="100%" height="300px" title="file-preview" />
          ) : (
            <img src={preview} alt="file preview" className="max-w-full h-auto" />
          )}
        </div>
      )}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {id ? "Update" : "Add"} Notice
      </button>
    </form>
  );
};

export default AddAssignmentNotice;

