// src/components/Home.js
import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/lobby');
    } else {
      navigate('/auth');
    }
  }, [user, navigate]);

  return null;
};

export default Home;
