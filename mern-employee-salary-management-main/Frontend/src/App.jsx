
import React, { useState, useEffect } from 'react';
import { Routes, store } from './config';
import { Provider } from 'react-redux';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const preloader = document.getElementById('preloader');
    const timeout = setTimeout(() => {
      if (preloader) {
        preloader.style.display = 'none';
      }
      setLoading(false);
    }, 2000);

    // Cleanup timeout when the component unmounts
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return null; // Keep the preloader active
  }

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
