import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });
  const [editId, setEditId] = useState(null);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/posts');
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 입력값 변경
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // create or edit
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/posts/${editId}`, form);
        setEditId(null);
      } else {
        await axios.post('http://localhost:5000/posts', form);
      }
      setForm({ title: '', content: '' });
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  // delete
  const onDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/posts/${id}`);
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  // edit
  const onEdit = (post) => {
    setEditId(post._id);
    setForm({ title: post.title, content: post.content });
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Board</h1>
      <form onSubmit={onSubmit} style={{ marginBottom: 20 }}>
        <input
          name="title"
          placeholder="enter the title"
          value={form.title}
          onChange={onChange}
          required
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        <textarea
          name="content"
          placeholder="enter the content"
          value={form.content}
          onChange={onChange}
          required
          rows={5}
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        <button type="submit">{editId ? 'edit' : 'submit'}</button>
        {editId && <button type="button" onClick={() => { setEditId(null); setForm({ title: '', content: '' }); }}>cancel</button>}
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {posts.map(post => (
          <li key={post._id} style={{ border: '1px solid #ddd', marginBottom: 10, padding: 10 }}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <button onClick={() => onEdit(post)}>edit</button>
            <button onClick={() => onDelete(post._id)} style={{ marginLeft: 10 }}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;