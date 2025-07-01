import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar        from './components/Navbar';
import Login         from './pages/Login';
import Register      from './pages/Register';
import SearchFlights from './pages/SearchFlights';
import Bookings      from './pages/Bookings';
import PrivateRoute  from './RouteProtectors/PrivateRoute';
import BookFlight from './pages/BookFlight';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public */}
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected: only with token */}
        <Route element={<PrivateRoute />}>
          <Route path="/search"   element={<SearchFlights />} />
          <Route path="/bookings" element={<Bookings />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/book/:id" element={<BookFlight />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;