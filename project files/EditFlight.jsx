import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

const EditFlight = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);

  useEffect(() => { api.get(`/flights/${id}`).then(r => setForm(r.data)); }, [id]);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const save = async (e) => {
    e.preventDefault();
    await api.put(`/flights/${id}`, form);
    alert('Updated!');
  };

  if (!form) return <p className="text-center mt-5">Loading…</p>;

  return (
    <div className="container mt-4">
      <h3>Edit Flight</h3>
      <form className="row g-3" onSubmit={save}>
        {Object.entries(form).map(([k, v]) => (
          k !== '_id' && <div className="col-md-4" key={k}>
            <input className="form-control" name={k} value={v} onChange={handle} />
          </div>
        ))}
        <div className="col-12"><button className="btn btn-success">Save</button></div>
      </form>
    </div>
  );
};

export default EditFlight;
