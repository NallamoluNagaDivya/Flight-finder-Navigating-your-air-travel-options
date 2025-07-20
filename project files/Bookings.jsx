import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import '../styles/Bookings.css';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get('/bookings')
       .then(res => setBookings(res.data))
       .catch(err => console.error(err));
  }, []);

  return (
    <div className="bookings-container">
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Flight</th><th>Route</th><th>Departure</th>
              <th>Seats</th><th>Status</th><th>Booked On</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b._id}>
                <td>{b.flightId.airline}</td>
                <td>{b.flightId.from} → {b.flightId.to}</td>
                <td>{new Date(b.flightId.departure).toLocaleString()}</td>
                <td>{b.seatCount}</td>
                <td>{b.status}</td>
                <td>{new Date(b.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
