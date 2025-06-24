import React, { useEffect, useState } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';

function Home() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setUsername(currentUser.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <div className="main-content">
      <h1>ברוך הבא, {username || 'משתמש לא מזוהה'}</h1>
      <nav className="header">
        <ul>
          <li><Link to="info">Info</Link></li>
          <li><Link to="todos">Todos</Link></li>
          <li><Link to="posts">Posts</Link></li>
          <li><Link to="albums">Albums</Link></li>
        </ul>
      </nav>
      <button onClick={handleLogout} className="primary">Logout</button>
      <Outlet />
    </div>
  );
}

export default Home;
