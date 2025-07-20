import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const AllFlights = () => {
  const [flights, setFlights] = useState([]);
  useEffect(() => {
    api.get('/flights').then(r => setFlights(r.data));
  }, []);

  return (
    <div>
      <h3>All Flights</h3>
      <table className="table table-hover">
        <thead><tr><th>Airline</th><th>Route</th><th>Departure</th><th>Seats</th><th>Price</th></tr></thead>
        <tbody>
          {flights.map(f => (
            <tr key={f._id}>
              <td>{f.airline}</td>
              <td>{f.from} → {f.to}</td>
              <td>{new Date(f.departure).toLocaleString()}</td>
              <td>{f.seatsAvailable}</td>
              <td>${f.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllFlights;
