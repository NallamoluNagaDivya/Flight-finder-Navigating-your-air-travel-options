import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const FlightRequests = () => {
  const [reqs, setReqs] = useState([]);
  useEffect(() => { api.get('/requests').then(r => setReqs(r.data)); }, []);

  return (
    <div>
      <h3>Flight Change / Cancel Requests</h3>
      <table className="table">
        <thead><tr><th>User</th><th>Flight</th><th>Type</th><th>Status</th></tr></thead>
        <tbody>
          {reqs.map(r => (
            <tr key={r._id}>
              <td>{r.userId.name}</td>
              <td>{r.flightId.from} → {r.flightId.to}</td>
              <td>{r.type}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightRequests;
