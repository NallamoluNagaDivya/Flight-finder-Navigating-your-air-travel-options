import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const Authenticate = () => {
  const nav = useNavigate();

  useEffect(() => {
    api.get('/auth/me')
      .then(({ data }) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        nav('/flights');
      })
      .catch(() => nav('/login'));
  }, [nav]);

  return <p className="text-center mt-5">Authenticating…</p>;
};

export default Authenticate;
