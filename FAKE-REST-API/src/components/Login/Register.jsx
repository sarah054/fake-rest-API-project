import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiRequest from '../ApiRequest';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_URL = "http://localhost:3000/users";

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch(`${API_URL}?username=${username}`);
    const data = await response.json();
    // אם המשתמש נמצא
    if (data.length > 0) {
      alert("שם משתמש לא חוקי");
      setUsername = "";
      setVerifyPassword = " ";
      setPassword = " ";
    }
    if (password !== verifyPassword) {
      alert('הסיסמה ואימות הסיסמה אינם תואמים');
      setPassword('');
      setVerifyPassword('');
      return;
    }
    setUserDetails({ username, password });
  };

  const handleSubmitDetails = async (e) => {
    e.preventDefault();

    try {
      const newDetails = {
        name: userDetails.name,
        username: userDetails.username,
        email: userDetails.email,
        address: {
          street: userDetails.street,
          city: userDetails.city,
          zipcode: userDetails.zipcode,
        },
        phone: userDetails.phone,
        website: userDetails.website,
        company: {
          name: userDetails.company,
        },
      };


      const postOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newDetails)
      }
      const result = await apiRequest(API_URL, postOptions);
      if (!result) {
        alert('ההרשמה הצליחה');
        localStorage.setItem('currentUser', JSON.stringify({ name: userDetails.username, id: userDetails.id }));
        navigate(`/home/users/${userDetails.id}`);
      }
      else {
        setError(result);
      }

    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <h1>הרשמה</h1>
      {!userDetails ? (
        <form onSubmit={handleRegister}>
          <div>
            <label htmlFor="username">שם משתמש:</label>
            <input
              type="text"
              id="username"
              placeholder="שם משתמש"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">סיסמה:</label>
            <input
              type="password"
              id="password"
              placeholder="סיסמה"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="verifyPassword">אימות סיסמה:</label>
            <input
              type="password"
              id="verifyPassword"
              placeholder="אימות סיסמה"
              value={verifyPassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">הירשם</button>
        </form>
      ) : (
        <form onSubmit={handleSubmitDetails}>
          <h2>הזן פרטי משתמש נוספים</h2>
          <div>
            <label htmlFor="name">שם מלא:</label>
            <input
              type="text"
              id="name"
              placeholder="שם מלא"
              value={userDetails.name || ''}
              onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="email">אימייל:</label>
            <input
              type="email"
              id="email"
              placeholder="אימייל"
              value={userDetails.email || ''}
              onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="street">רחוב:</label>
            <input
              type="text"
              id="street"
              placeholder="רחוב"
              value={userDetails.street || ''}
              onChange={(e) => setUserDetails({ ...userDetails, street: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="city">עיר:</label>
            <input
              type="text"
              id="city"
              placeholder="עיר"
              value={userDetails.city || ''}
              onChange={(e) => setUserDetails({ ...userDetails, city: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="zipcode">מיקוד:</label>
            <input
              type="text"
              id="zipcode"
              placeholder="מיקוד"
              value={userDetails.zipcode || ''}
              onChange={(e) => setUserDetails({ ...userDetails, zipcode: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="phone">טלפון:</label>
            <input
              type="text"
              id="phone"
              placeholder="טלפון"
              value={userDetails.phone || ''}
              onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="website">אתר:</label>
            <input
              type="text"
              id="website"
              placeholder="אתר"
              value={userDetails.website || ''}
              onChange={(e) => setUserDetails({ ...userDetails, website: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="company">חברה:</label>
            <input
              type="text"
              id="company"
              placeholder="חברה"
              value={userDetails.company || ''}
              onChange={(e) => setUserDetails({ ...userDetails, company: e.target.value })}
              required
            />
          </div>
          <button type="submit">שמור פרטים</button>
        </form>
        
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Register;
