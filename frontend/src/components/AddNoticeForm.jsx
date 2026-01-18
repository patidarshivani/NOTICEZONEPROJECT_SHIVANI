import React, { useState } from 'react';
import api from '../services/api';

function AddNoticeForm({ onNoticeAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const noticeData = {
      title,
      description
    };

    try {
      await api.post('/api/notice/add', noticeData);
    
      // reset form
      setTitle('');
      setDescription('');

      // refresh notices
      onNoticeAdded();
      
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data || 
        "Notice addition failed (authorization or department issue)"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input
        type="text"
        placeholder="Notice Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input input-bordered w-full"
        required
      />

      <textarea
        placeholder="Notice Content"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="textarea textarea-bordered w-full"
        required
      />

      <button type="submit" className="btn btn-primary">
        Add Notice
      </button>
    </form>
  );
}

export default AddNoticeForm;


// import React, { useState } from 'react';
// import api from '../services/api';

// function AddNoticeForm({ onNoticeAdded }) {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     // ✅ Payload exactly as backend expects
//     const noticeData = {
//       title: title,
//       content: content
//     };

//     try {
//       await api.post('/api/notice/add', noticeData);

//       // reset form
//       setTitle('');
//       setContent('');

//       onNoticeAdded(); // refresh notices
//     } catch (err) {
//       console.error(err);
//       setError("You are not authorized to add notice");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">

//       {error && (
//         <p className="text-red-500 text-sm">{error}</p>
//       )}

//       <input
//         type="text"
//         placeholder="Notice Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="input input-bordered w-full"
//         required
//       />

//       <textarea
//         placeholder="Notice Content"
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         className="textarea textarea-bordered w-full"
//         required
//       />

//       <button
//         type="submit"
//         className="btn btn-primary w-full"
//       >
//         Add Notice
//       </button>
//     </form>
//   );
// }

// export default AddNoticeForm;


//commented on 9-01-2026


// import React, { useState } from 'react';
// import api from '../services/api';

// function AddNoticeForm({ onNoticeAdded }) {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [file, setFile] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     if (file) formData.append('file', file);

//     const token = localStorage.getItem('token');

    
  
//     try {
//       // await api.post('/api/notices/add', formData);
//       await api.post('/api/notice/add', noticeData, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });


//       onNoticeAdded(); // Callback to update the parent component
//     } catch (err) {
//       alert("notice addition failed due to authorization");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="Notice Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         required
//       />
//       <textarea
//         placeholder="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         required
//       />
//       <input type="file" onChange={handleFileChange} />
//       <button type="submit">Add Notice</button>
//     </form>
//   );
// }

// export default AddNoticeForm;
