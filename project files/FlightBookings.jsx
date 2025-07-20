import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

const FlightBookings = () => {
  const { id } = useParams();                 // flightId
  const [rows, setRows] = useState([]);

  useEffect(() => {
    api.get(`/flights/${id}/bookings`).then(r => setRows(r.data));
  }, [id]);

  return (
    <div>
      <h3>Bookings for Flight {id}</h3>
      <table className="table table-bordered">
        <thead><tr><th>User</th><th>Seat</th><th>Status</th></tr></thead>
        <tbody>
          {rows.map(b => (
            <tr key={b._id}>
              <td>{b.userId.name}</td>
              <td>{b.seat}</td>
              <td>{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightBookings;
