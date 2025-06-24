import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Info() {
  const [userInfo, setUserInfo] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      const { name, password } = currentUser;

      fetch(`http://localhost:3000/users?username=${name}&password=${password}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            setUserInfo(data[0]); 
          } else {
            setError('לא נמצא משתמש עם שם וסיסמה אלו');
          }
        })
        .catch((err) => {
          setError('אירעה שגיאה בשרת');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  if (loading) {
    return <div>טוען...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

 
  return (
    <div className="main-content">
      <h1>פרטי המשתמש</h1>
      <div className="user-info">
        <p><strong>שם משתמש:</strong> {userInfo.username}</p>
        <p><strong>אימייל:</strong> {userInfo.email}</p>
        <p><strong>טלפון:</strong> {userInfo.phone}</p>
        <p><strong>כתובת:</strong> {userInfo.address ? `${userInfo.address.street}, ${userInfo.address.city}, ${userInfo.address.zipcode}` : 'לא זמין'}</p>
        <p><strong>חברה:</strong> {userInfo.company ? userInfo.company.name : 'לא זמין'}</p>
      </div>
    
    </div>
  );
}

export default Info;
