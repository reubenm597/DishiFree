import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Homepage from './pages/Homepage';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import DonorDashboard from './components/donor/DonorDashboard';
import ReceiverDashboard from './components/receiver/ReceiverDashboard';
import Dashboard from './pages/Dashboard'; // Add this import
import './styles/App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} /> {/* Add this route */}
              <Route path="/donor-dashboard" element={<DonorDashboard />} />
              <Route path="/receiver-dashboard" element={<ReceiverDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;