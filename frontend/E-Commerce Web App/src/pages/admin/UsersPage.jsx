
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  const fetch = () =>
    axios.get('/api/admin/users', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(res => setUsers(res.data.users))
      .catch(console.error);

  useEffect(fetch, []);

  const toggleRole = (u) => {
    axios.put(`/api/admin/users/${u._id}`, { role: u.role === 'admin' ? 'user' : 'admin' },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(fetch)
      .catch(console.error);
  };

  const removeUser = id =>
    axios.delete(`/api/admin/users/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(fetch)
      .catch(console.error);

  return (
    <div className="p-6">
      <h2>User Management</h2>
      {users.map(u => (
        <div key={u._id} className="border p-4 mb-2 flex justify-between items-center bg-white">
          <span>{u.name} ({u.role})</span>
          <div>
            <button onClick={() => toggleRole(u)}>
              {u.role === 'admin' ? 'Demote' : 'Promote'}
            </button>
            <button onClick={() => removeUser(u._id)} className="ml-2 text-red-500">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersPage;
