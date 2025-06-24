import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const usernameRef = useRef(); 
  const passwordRef = useRef(); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_URL="http://localhost:3000/users";

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const username = usernameRef.current.value; 
    const password = passwordRef.current.value; 
    try {
      // שלח בקשה לשרת עם פרמטרים של שם משתמש וסיסמה
      const response = await fetch(`${API_URL}?username=${username}&website=${password}`);
      const data = await response.json();

      // אם המשתמש נמצא
      if (data.length > 0) {
        localStorage.setItem('currentUser', JSON.stringify({ name: data[0].username, id: data[0].id }));
        alert('ההתחברות הצליחה!');
        navigate(`/home/users/${data[0].id}`);// היכנס למערכת או נווט לדף הבית
      } else {
        alert('שם המשתמש או הסיסמה אינם נכונים');
        navigate('/register');
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <h1>התחברות</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">שם משתמש:</label>
          <input
            type="text"
            id="username"
            ref={usernameRef} 
            placeholder="שם משתמש"
            required
          />
        </div>
        <div>
          <label htmlFor="password">סיסמה:</label>
          <input
            type="password"
            id="password"
            ref={passwordRef} 
            placeholder="סיסמה"
            required
          />
        </div>
        <button type="submit">התחבר</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={() => navigate('/register')}>משתמש חדש</button>
    </div>
  );
}

export default Login;
