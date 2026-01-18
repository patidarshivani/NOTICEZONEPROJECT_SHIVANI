import React, { useState } from 'react';
import api from '../services/api';

const AddNoticeForm = ({ onNoticeAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [classSection, setClassSection] = useState('A');
  const [visibleToAll, setVisibleToAll] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let pdfUrl = '';

      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        const res = await api.post('/api/files/upload', formData);
        pdfUrl = res.data; // expected to return the file path
      }

      const noticeData = {
        title,
        description,
        classSection,
        visibleToAll,
        pdfUrl,
        department: {
          id: 3,         // 🔧 Change this dynamically if needed
          name: 'ECE'    // 🔧 Can be fetched from context or API
        }
      };

      await api.post('/api/notice/add', noticeData);

      alert('Notice added successfully!');
      onNoticeAdded(); // Refresh the notice list
      // Reset form
      setTitle('');
      setDescription('');
      setFile(null);
      setClassSection('A');
      setVisibleToAll(false);
    } catch (error) {
      console.error("Error adding notice:", error);
      alert("Failed to add notice.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        placeholder="Class Section"
        value={classSection}
        onChange={(e) => setClassSection(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={visibleToAll}
          onChange={(e) => setVisibleToAll(e.target.checked)}
        />
        Visible to All
      </label>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button type="submit">Add Notice</button>
    </form>
  );
};

export default AddNoticeForm;