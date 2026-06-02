import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import Home from "./Pages/Home";
import Instructions from "./Pages/Instructions";
import Assessment from "./Pages/Assessment";
import Result from "./Pages/Result";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Navbar from "./Pages/Navbar";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <>
      <Navbar />
      <div className="page-content">
        <Outlet />
      </div>
    </>
  );
};

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/home" replace />; 
  }
  return children;
};

function App() {
  return (
    <>
      <Routes>
        <Route 
          path="/" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path="/signup" 
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          } 
        />

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/result" element={<Result />} />
        </Route>
      </Routes>

      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" 
      />
    </>
  );
}

export default App;