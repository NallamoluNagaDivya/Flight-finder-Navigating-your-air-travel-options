import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    api.get('/users').then(r => setUsers(r.data));
  }, []);

  return (
    <div>
      <h3>All Users</h3>
      <table className="table table-bordered">
        <thead><tr><th>Name</th><th>Email</th><th>Role</th></tr></thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
