import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import Home from './components/Login/Home';
import Info from './components/Info';
import TodoList from './components/Todos/TodoList';
import PostList from './components/Posts/PostList';
import AlbumList from './components/Albums/AlbumList';
import PhotoList from './components/Albums/PhotoList';
import Error404 from './components/Error404';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home/users/:userId" element={<Home />} >
          <Route path="info" element={<Info />} />
          <Route path="todos" element={<TodoList />} />
          <Route path="posts" element={<PostList />} />
          <Route path="albums" element={<AlbumList />} >
            <Route path=":albumId/photos" element={<PhotoList/>} />
          </Route>
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
