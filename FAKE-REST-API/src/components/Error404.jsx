import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Error404() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1 style={{ color: 'red' }}>Error 404</h1>
      <button onClick={goBack} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: 'light-blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        חזור לעמוד קודם
      </button>
    </div>
  );
}
