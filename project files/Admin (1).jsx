import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Admin = () => (
  <div className="container mt-4">
    <h2>Admin Dashboard</h2>
    <div className="btn-group mb-3">
      <Link className="btn btn-outline-primary" to="flights">Flights</Link>
      <Link className="btn btn-outline-primary" to="users">Users</Link>
      <Link className="btn btn-outline-primary" to="bookings">Bookings</Link>
      <Link className="btn btn-success" to="new-flight">+ Add Flight</Link>
    </div>
    <Outlet />
  </div>
);

export default Admin;
