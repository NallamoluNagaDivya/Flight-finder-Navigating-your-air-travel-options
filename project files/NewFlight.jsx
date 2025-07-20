import React, { useState } from 'react';
import api from '../utils/api';

const NewFlight = () => {
  const [form, setForm] = useState({
    airline: '',
    from: '',
    to: '',
    departure: '',
    arrival: '',
    seatsAvailable: 0,
    price: 0,
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/flights', form);
    alert('Flight added!');
  };

  return (
    <div>
      <h3>Add New Flight</h3>
      <form className="row g-3" onSubmit={handleSubmit}>
        {['airline', 'from', 'to', 'departure', 'arrival', 'seatsAvailable', 'price'].map(field => (
          <div className="col-md-4" key={field}>
            <input
              className="form-control"
              name={field}
              placeholder={field}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <div className="col-12">
          <button className="btn btn-success">Add Flight</button>
        </div>
      </form>
    </div>
  );
};

export default NewFlight;
