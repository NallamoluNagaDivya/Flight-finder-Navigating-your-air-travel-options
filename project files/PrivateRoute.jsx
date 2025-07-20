import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
  // if token exists, render child routes; otherwise redirect to login
  return localStorage.getItem('token') 
    ? <Outlet /> 
    : <Navigate to="/login" replace />;
}
