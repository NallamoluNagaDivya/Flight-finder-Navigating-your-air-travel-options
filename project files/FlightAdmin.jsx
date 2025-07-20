import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const FlightAdmin = () => {
  const [flights, setFlights] = useState([]);
  useEffect(() => { api.get('/flights').then(r => setFlights(r.data)); }, []);

  return (
    <div>
      <h3>Manage Individual Flights</h3>
      <table className="table">
        <thead><tr><th>Airline</th><th>Route</th><th>Actions</th></tr></thead>
        <tbody>
          {flights.map(f => (
            <tr key={f._id}>
              <td>{f.airline}</td>
              <td>{f.from} → {f.to}</td>
              <td>
                <Link className="btn btn-sm btn-info me-2" to={`/admin/flight/${f._id}/bookings`}>Bookings</Link>
                <Link className="btn btn-sm btn-secondary" to={`/admin/edit-flight/${f._id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightAdmin;
