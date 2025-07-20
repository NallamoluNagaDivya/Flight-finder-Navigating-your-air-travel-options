// client/src/pages/FlightSearch.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/SearchFlights.css';
import bgImage from '../assets/flight-bg.jpg';

export default function FlightSearch() {
  const [flights, setFlights]   = useState([]);
  const [cities,  setCities]    = useState([]);            // ✅ dynamic city list
  const [filters, setFilters]   = useState({
    from:'', to:'', date:'',
    travelClass:'', airline:'', maxPrice:50000,
  });
  const [filtered, setFiltered] = useState([]);

  const navigate = useNavigate();

  /* fetch flights & build city list */
  useEffect(() => {
    axios.get('http://localhost:5000/api/flights')
      .then(res => {
        const data = res.data;
        setFlights(data);
        setFiltered(data);

        // ✅ collect every city found in 'from' and 'to'
        const setOfCities = new Set();
        data.forEach(f => { setOfCities.add(f.from); setOfCities.add(f.to); });
        setCities([...setOfCities].sort());  // alphabetic
      })
      .catch(console.error);
  }, []);

  /* handlers */
  const onChange = e =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  const search = () => setFiltered(
    flights.filter(f =>
      (!filters.from || f.from === filters.from) &&
      (!filters.to   || f.to   === filters.to) &&
      (!filters.date ||
        new Date(f.departure).toISOString().slice(0,10) === filters.date) &&
      (!filters.travelClass || f.class === filters.travelClass) &&
      (!filters.airline     || f.airline === filters.airline) &&
      f.price <= +filters.maxPrice
    )
  );

  const reset = () => {
    setFilters({ from:'', to:'', date:'', travelClass:'', airline:'', maxPrice:50000 });
    setFiltered(flights);
  };

  const bgStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };

  return (
    <div className="search-wrapper" style={bgStyle}>
      <div className="search-content">
        <div className="search-box">
          <h2>Find Flights</h2>

          {/* ▼ all cities appear here */}
          <select name="from" value={filters.from} onChange={onChange}>
            <option value="">From</option>
            {cities.map(c => <option key={c}>{c}</option>)}
          </select>

          <select name="to" value={filters.to} onChange={onChange}>
            <option value="">To</option>
            {cities.map(c => <option key={c}>{c}</option>)}
          </select>

          <input type="date" name="date" value={filters.date} onChange={onChange} />

          <select name="travelClass" value={filters.travelClass} onChange={onChange}>
            <option value="">Class</option><option>Economy</option><option>Business</option>
          </select>

          <select name="airline" value={filters.airline} onChange={onChange}>
            <option value="">Airline</option>
            <option>Air India</option><option>IndiGo</option>
            <option>Vistara</option><option>SpiceJet</option>
          </select>

          <label>Max Price ₹{filters.maxPrice}</label>
          <input
            type="range" name="maxPrice" min="1000" max="50000" step="500"
            value={filters.maxPrice} onChange={onChange}
          />

          <button onClick={search}>Search</button>
          <button className="reset" onClick={reset}>Reset</button>
        </div>

        <div className="results-box">
          {filtered.length ? (
            filtered.map(f => (
              <div className="flight-card" key={f._id}>
                <h3>{f.airline}</h3>
                <p>{f.from} → {f.to}</p>
                <p>Departure: {new Date(f.departure).toLocaleString()}</p>
                <p>Class: {f.class}</p>
                <p>₹{f.price}</p>
                <button onClick={() => navigate(`/book/${f._id}`)}>Book</button>
              </div>
            ))
          ) : (
            <p className="no-flights">No flights match your filters.</p>
          )}
        </div>
      </div>
    </div>
  );
}
