import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css'; // Стили из папки src
import axios from 'axios';

const ServerCheck = () => {
  const [isServerAvailable, setIsServerAvailable] = useState(null);

  useEffect(() => {
    const checkServerAvailability = async () => {
      try {
        await axios.get('/api/health');
        setIsServerAvailable(true);
      } catch (error) {
        console.error('Server is not available:', error);
        setIsServerAvailable(false);
      }
    };
    
    checkServerAvailability();
  }, []);

  if (isServerAvailable === null) {
    return <div>Loading...</div>; // Показываем загрузку, пока идет проверка доступности сервера
  }

  if (isServerAvailable === false) {
    return <div className="error-message">Server is not available. Please try again later.</div>;
  }

  return <App />;
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<ServerCheck />);
