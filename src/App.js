import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import UserDashboard from './User/UserDashboard';
import TechSupportDashboard from './TechSupport/TechSupportDashboard';
import AdminDashboard from './Admin/AdminDashboard';
import Home from './User/Home';
import Support from './Home/Support';
import TicketForm from './User/CreateTicket';
import RegistrationForm from './Login/RegistrationForm';
import LoginForm from './Login/LoginForm';
import bgImg from './Assets/allImgBg.jpg'
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log('isAuthenticated :', isAuthenticated);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    setIsAuthenticated(user !== 'noUser');
  }, []); // Empty dependency array ensures this effect runs only once after initial render
  
  return (
    // <div style={{ backgroundImage: `url(${bgImg})`  , backgroundSize:'cover'}}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user" element={<UserDashboard />} />
      <Route path="/tech-support" element={<TechSupportDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/support" element={<Support />} />
      <Route path="/createTicket" element={<TicketForm />} />
      <Route path="/register" element={<RegistrationForm />} />
      <Route path={isAuthenticated ? "/user" : "/login"} element={<LoginForm />} />
    </Routes>
    // </div>
  );
}

export default App;
