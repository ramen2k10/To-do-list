import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import LoginPass from './pages/LoginPass';
import TodoList from './pages/TodoList';

export default function App() {
    return (
      <Router>
      <Routes>
        <Route path="/pages/signup" element={<Signup />} />
        <Route path="/pages/login" element={<Login />} />
        <Route path="/pages/loginSuccess" element={<LoginPass />} />
        <Route path="/pages/TodoList" element={<TodoList />} />
      </Routes>
    </Router>
    );
}

