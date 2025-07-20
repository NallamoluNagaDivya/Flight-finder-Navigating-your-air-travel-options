import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import '../styles/BookFlight.css';

function BookFlight() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);
  const [seatCount, setSeatCount] = useState(1);

  useEffect(() => {
    api.get(`/flights/${id}`).then(res => setFlight(res.data));
  }, [id]);

  const bookFlight = async () => {
    try {
      await api.post('/bookings', { flightId: id, seatCount });
      alert('Booking successful');
      navigate('/bookings');
    } catch (err) {
      alert('Booking failed');
    }
  };

  if (!flight) return <div>Loading...</div>;

  return (
    <div className="book-flight-wrapper">
      <div className="book-flight-overlay">
        <h2>{flight.airline}</h2>
        <p><strong>From:</strong> {flight.from}</p>
        <p><strong>To:</strong> {flight.to}</p>
        <p><strong>Departure:</strong> {new Date(flight.departure).toLocaleString()}</p>
        <p><strong>Price:</strong> ₹{flight.price}</p>

        <p><strong>No. of Seats:</strong></p>
        <input
          type="number"
          min="1"
          max={flight.seatsAvailable}
          value={seatCount}
          onChange={e => setSeatCount(e.target.value)}
        />

        <button onClick={bookFlight}>Book Now</button>
      </div>
    </div>
  );
}

export default BookFlight;
