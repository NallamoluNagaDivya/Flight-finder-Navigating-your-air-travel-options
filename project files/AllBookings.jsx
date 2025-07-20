import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get('/bookings').then(r => setBookings(r.data));
  }, []);

  return (
    <div>
      <h3>All Bookings</h3>
      <table className="table table-bordered">
        <thead><tr><th>User</th><th>Flight</th><th>Seat</th><th>Status</th></tr></thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b._id}>
              <td>{b.userId.name}</td>
              <td>{b.flightId.airline} ({b.flightId.from} → {b.flightId.to})</td>
              <td>{b.seat}</td>
              <td>{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllBookings;
